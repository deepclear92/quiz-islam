# Agent IA — Achat de plantes

Agent autonome qui transforme une liste de plantes en plan d'achat optimise sur les
boutiques de jardinerie en ligne francaises.

## Ce qu'il fait

1. Lit une liste de plantes (`shopping_list.json`).
2. Cherche les boutiques en ligne francaises qui livrent (Bakker, Leaderplant,
   Promesse de Fleurs, Truffaut, Jardiland, Willemse, etc.).
3. Pour chaque article: compare prix, qualite, frais de port, disponibilite.
4. Regroupe les achats par boutique pour minimiser les frais de livraison.
5. Produit un rapport markdown lisible **et** un plan JSON structure.

Sous le capot:

- **Claude Opus 4.6** avec _adaptive thinking_ pour le raisonnement multi-criteres.
- Outils server-side **`web_search`** + **`web_fetch`** (geolocalisation FR).
- Streaming SSE pour eviter les timeouts (les recherches peuvent etre longues).

## Installation

```bash
cd plant_shopping_agent
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...
```

## Utilisation

Avec la liste fournie (`shopping_list.json` — Massif a etages, 50 plants):

```bash
python agent.py
```

Avec une liste personnalisee et export du plan:

```bash
python agent.py \
  --list ma_liste.json \
  --output rapport.md \
  --json-output plan.json
```

L'agent affiche en temps reel sur stderr ses recherches web et sa reflexion, puis
ecrit le rapport final sur stdout.

## Format de la liste de courses

Voir `shopping_list.json` pour un exemple complet. Chaque article doit contenir:

```json
{
  "nom_latin": "Lavandula angustifolia",
  "nom_commun": "Lavande vraie",
  "quantite": 3,
  "conditionnement": "pot 2-3 L",
  "taille": null,
  "notes": null
}
```

Le `nom_latin` est important: l'agent l'utilise pour les recherches afin d'eviter
les confusions entre cultivars.

## Format du plan de sortie

Le rapport contient deux parties:

1. **Rapport markdown** lisible — un panier par boutique, avec sous-totaux.
2. **Bloc JSON** dans un fence ```` ```json ... ``` ```` parsable, structure:

```json
{
  "paniers": [
    {
      "boutique": "Promesse de Fleurs",
      "site_url": "https://www.promessedefleurs.com",
      "frais_port_estimes_eur": 9.95,
      "delai_livraison_estime": "3-5 jours",
      "articles": [
        {
          "nom_latin": "Thuja occidentalis 'Smaragd'",
          "quantite": 5,
          "conditionnement": "pot 3 L",
          "url_produit": "https://...",
          "prix_unitaire_eur": 12.5,
          "sous_total_eur": 62.5,
          "qualite_observee": "Plants 80-100 cm garantis reprise",
          "remarques": null
        }
      ],
      "total_panier_eur": 72.45
    }
  ],
  "articles_introuvables": [],
  "total_global_eur": 250.0,
  "commentaire_qualite_prix": "..."
}
```

## Limites et automatisation du panier

L'API Claude n'execute pas de navigation reelle: l'agent ne **clique** pas sur
"Ajouter au panier". Il produit:

- Les **URLs produit** verifiees (cliquables).
- Le **plan de panier** par boutique, pret a etre rempli manuellement.
- Un **JSON structure** qui peut alimenter un script Playwright pour automatiser
  le remplissage des paniers (chaque boutique a son propre flux DOM, donc le
  remplissage automatique est par essence specifique a chaque site).

Pour automatiser le remplissage de panier de bout en bout, brancher
`plan.json` sur un script Playwright dedie par boutique. C'est volontairement
hors-perimetre: le risque de blocage anti-bot et la fragilite des selecteurs
DOM rendent cette etape difficile a generaliser.

## Couts indicatifs

Une execution complete sur la liste fournie (10 references, ~25 web_search +
web_fetch combines, raisonnement adaptatif) consomme typiquement entre
50 000 et 150 000 tokens d'entree (avec cache) et 5 000 a 15 000 tokens de
sortie. A 5 $ / 25 $ par million de tokens, compter ~0,30 a 1,00 $ par run.
