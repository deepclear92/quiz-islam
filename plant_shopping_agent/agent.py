"""
Agent IA specialise dans les achats de plantes.

Lit une liste de courses (shopping_list.json), recherche le web pour trouver
les meilleurs sites de jardinerie en ligne francais qui livrent, compare prix
et qualite, puis produit un plan d'achat structure (panier par site).

Usage:
    export ANTHROPIC_API_KEY=...
    python agent.py                       # utilise shopping_list.json
    python agent.py --list ma_liste.json  # liste personnalisee
    python agent.py --output plan.md      # ecrit le rapport dans un fichier

L'agent utilise:
  - Claude Opus 4.6 avec adaptive thinking (raisonnement dynamique)
  - L'outil server-side web_search pour parcourir les boutiques en ligne
  - L'outil server-side web_fetch pour lire les fiches produit en detail
  - Structured outputs pour garantir un plan d'achat parsable

Note: l'API Claude n'execute pas de navigation reelle (pas d'ajout au panier
automatique). L'agent produit des URLs produit prets a etre cliquees, et un
plan de panier par boutique. Pour l'automatisation complete du remplissage
de panier, brancher le JSON de sortie sur un script Playwright.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

import anthropic

MODEL = "claude-opus-4-6"
DEFAULT_LIST = Path(__file__).parent / "shopping_list.json"

SYSTEM_PROMPT = """Tu es un agent expert en achat de plantes en ligne pour des
clients en France. Ta mission: pour une liste de plantes donnee, identifier les
meilleures boutiques en ligne francaises qui livrent, comparer prix et qualite,
et construire un plan d'achat optimise (un panier par boutique).

Criteres de selection des boutiques (par ordre de priorite):
1. Livraison effective vers la France metropolitaine sur tous les articles demandes.
2. Reputation et qualite (Trustpilot, avis Google, garantie de reprise, fraicheur).
3. Disponibilite reelle des especes et conditionnements demandes (taille du pot,
   forme, couleur). Ne pas substituer en silence: si exact introuvable, le signaler.
4. Prix total panier + frais de port (privilegier le meilleur rapport qualite/prix,
   pas forcement le moins cher).
5. Frais de port raisonnables et delais de livraison annonces.

Boutiques francaises serieuses a considerer en priorite (liste non exhaustive):
Bakker, Leaderplant, Promesse de Fleurs, Plantes-pour-tous, Truffaut.com,
Jardiland.com, Willemse, Meilland, Pepiniere de la Baie, Pepiniere du Lavoir,
Plantes-shopping, Gardena, Jardinerie Koeman.

Methode de travail:
1. Pour chaque article de la liste, lance une recherche web ciblee (nom latin +
   conditionnement + 'livraison France'). Compare au moins 3 sources si possible.
2. Pour les fiches produit prometteuses, utilise web_fetch pour verifier le prix,
   le stock, les frais de port et la qualite reelle.
3. Regroupe les achats par boutique pour minimiser les frais de port.
4. Produis un plan final clair, par boutique, avec URL produit, prix unitaire,
   quantite, sous-total, frais de port estimes, et total panier.
5. A la fin, donne un total global et un commentaire sur le rapport qualite/prix.

Format de sortie obligatoire en deux parties:
  PARTIE 1: un rapport markdown lisible avec un panier par boutique et un total.
  PARTIE 2: un bloc JSON dans un fence ```json ... ``` strictement structure ainsi:
{
  "paniers": [
    {
      "boutique": "nom de la boutique",
      "site_url": "https://...",
      "frais_port_estimes_eur": 0.0,
      "delai_livraison_estime": "string",
      "articles": [
        {
          "nom_latin": "string",
          "quantite": 0,
          "conditionnement": "string",
          "url_produit": "https://...",
          "prix_unitaire_eur": 0.0,
          "sous_total_eur": 0.0,
          "qualite_observee": "string",
          "remarques": "string ou null"
        }
      ],
      "total_panier_eur": 0.0
    }
  ],
  "articles_introuvables": [
    {"nom_latin": "string", "raison": "string", "alternatives_possibles": ["..."]}
  ],
  "total_global_eur": 0.0,
  "commentaire_qualite_prix": "string"
}

Regles strictes:
- Toujours travailler en EUR.
- Ne pas inventer de prix ni d'URL: si tu ne trouves pas, mets l'article dans
  articles_introuvables avec une raison claire.
- Les URLs doivent etre des URLs reelles trouvees via web_search/web_fetch.
- Privilegie le regroupement: viser 2 a 4 boutiques maximum si possible.
"""


def load_shopping_list(path: Path) -> dict[str, Any]:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def build_user_prompt(shopping_list: dict[str, Any]) -> str:
    lines = [
        f"Voici la liste d'achats a traiter (livraison: "
        f"{shopping_list.get('pays_livraison', 'France')}, "
        f"projet: {shopping_list.get('nom', 'sans nom')}):",
        "",
        "```json",
        json.dumps(shopping_list, ensure_ascii=False, indent=2),
        "```",
        "",
        "Construis le plan d'achat optimal en suivant la methode et le format "
        "imposes par tes instructions systeme. Commence par lancer les recherches "
        "web necessaires.",
    ]
    return "\n".join(lines)


def run_agent(shopping_list: dict[str, Any]) -> str:
    """Run the agent and return the final assistant text (report + JSON block)."""
    client = anthropic.Anthropic()

    tools = [
        {
            "type": "web_search_20260209",
            "name": "web_search",
            "max_uses": 25,
            "user_location": {
                "type": "approximate",
                "country": "FR",
            },
        },
        {
            "type": "web_fetch_20260209",
            "name": "web_fetch",
            "max_uses": 25,
        },
    ]

    user_prompt = build_user_prompt(shopping_list)

    # Stream because the run can be long (many web searches + fetches + thinking).
    # Streaming avoids HTTP timeouts and lets us print progress.
    final_text_parts: list[str] = []
    with client.messages.stream(
        model=MODEL,
        max_tokens=32000,
        thinking={"type": "adaptive"},
        system=SYSTEM_PROMPT,
        tools=tools,
        messages=[{"role": "user", "content": user_prompt}],
        extra_headers={"anthropic-beta": "web-search-2025-03-05"},
    ) as stream:
        for event in stream:
            if event.type == "content_block_start":
                block = event.content_block
                if block.type == "server_tool_use":
                    name = getattr(block, "name", "tool")
                    print(f"\n[tool] {name} ...", file=sys.stderr, flush=True)
                elif block.type == "thinking":
                    print("\n[reflexion]", file=sys.stderr, flush=True)
                elif block.type == "text":
                    print("\n[reponse]", file=sys.stderr, flush=True)
            elif event.type == "content_block_delta":
                delta = event.delta
                if delta.type == "text_delta":
                    print(delta.text, end="", file=sys.stderr, flush=True)

        final_message = stream.get_final_message()

    for block in final_message.content:
        if block.type == "text":
            final_text_parts.append(block.text)

    print(file=sys.stderr)  # newline after streaming
    return "\n\n".join(final_text_parts)


def extract_json_plan(report_text: str) -> dict[str, Any] | None:
    """Extract the json fenced block from the agent's final text."""
    fence = "```json"
    start = report_text.find(fence)
    if start == -1:
        return None
    start += len(fence)
    end = report_text.find("```", start)
    if end == -1:
        return None
    raw = report_text[start:end].strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"[avertissement] JSON plan illisible: {exc}", file=sys.stderr)
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--list",
        type=Path,
        default=DEFAULT_LIST,
        help="Chemin vers la liste de courses JSON (defaut: shopping_list.json)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Ecrit le rapport markdown dans ce fichier en plus de stdout",
    )
    parser.add_argument(
        "--json-output",
        type=Path,
        default=None,
        help="Ecrit le plan JSON extrait dans ce fichier",
    )
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print(
            "Erreur: la variable d'environnement ANTHROPIC_API_KEY est requise.",
            file=sys.stderr,
        )
        return 2

    if not args.list.exists():
        print(f"Erreur: liste introuvable: {args.list}", file=sys.stderr)
        return 2

    shopping_list = load_shopping_list(args.list)
    print(
        f"Lancement de l'agent sur '{shopping_list.get('nom')}' "
        f"({sum(len(c['items']) for c in shopping_list['categories'])} references)...",
        file=sys.stderr,
    )

    report = run_agent(shopping_list)

    print("\n\n===== RAPPORT FINAL =====\n")
    print(report)

    if args.output:
        args.output.write_text(report, encoding="utf-8")
        print(f"\n[ecrit] {args.output}", file=sys.stderr)

    if args.json_output:
        plan = extract_json_plan(report)
        if plan is None:
            print(
                "[avertissement] aucun plan JSON valide trouve dans le rapport",
                file=sys.stderr,
            )
            return 1
        args.json_output.write_text(
            json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"[ecrit] {args.json_output}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
