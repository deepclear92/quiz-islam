/* ===== DEFAULT PRODUCTS & TEMPLATE DATA ===== */

const CATEGORIES = {
    'boucherie': { label: 'Boucherie & Poissonnerie', icon: '\uD83E\uDD69', color: '#e74c3c' },
    'surgeles': { label: 'Surgeles & Pret-a-cuire', icon: '\uD83E\uDD66', color: '#3498db' },
    'epicerie': { label: 'Epicerie Seche', icon: '\uD83E\uDD6B', color: '#e67e22' },
    'hygiene': { label: 'Hygiene, Entretien & Boissons', icon: '\uD83E\uDDFB', color: '#9b59b6' },
    'frais': { label: 'Frais & Primeur', icon: '\uD83E\uDD5A', color: '#27ae60' }
};

const DEFAULT_PRODUCTS = [
    // Boucherie & Poissonnerie
    { name: 'Viande hachee (15% MG)', category: 'boucherie', unit: 'kg', defaultPrice: 12.00 },
    { name: 'Blanc de poulet', category: 'boucherie', unit: 'kg', defaultPrice: 10.00 },
    { name: 'Steak de veau', category: 'boucherie', unit: 'kg', defaultPrice: 20.00 },
    { name: 'Merguez', category: 'boucherie', unit: 'kg', defaultPrice: 14.00 },
    { name: 'Filets de poisson blanc (surgeles)', category: 'boucherie', unit: 'kg', defaultPrice: 10.00 },
    { name: 'Paves de saumon (surgeles)', category: 'boucherie', unit: 'kg', defaultPrice: 22.00 },
    { name: 'Epaule de veau (Tajine)', category: 'boucherie', unit: 'kg', defaultPrice: 16.00 },
    { name: 'Boeuf bourguignon', category: 'boucherie', unit: 'kg', defaultPrice: 14.00 },
    { name: 'Poisson entier frais (Dorade)', category: 'boucherie', unit: 'kg', defaultPrice: 15.00 },

    // Surgeles & Pret-a-cuire
    { name: 'Legumes surgeles (Melanges/Verts)', category: 'surgeles', unit: 'kg', defaultPrice: 3.00 },
    { name: 'Pizzas (Surgelees)', category: 'surgeles', unit: 'unite', defaultPrice: 4.00 },
    { name: 'Pates brisees (Frigo)', category: 'surgeles', unit: 'unite', defaultPrice: 1.50 },

    // Epicerie Seche
    { name: 'Pates (Variees)', category: 'epicerie', unit: 'kg', defaultPrice: 2.00 },
    { name: 'Riz (Basmati/Long)', category: 'epicerie', unit: 'kg', defaultPrice: 2.00 },
    { name: 'Farine (T55)', category: 'epicerie', unit: 'kg', defaultPrice: 1.00 },
    { name: 'Sucre en poudre', category: 'epicerie', unit: 'kg', defaultPrice: 1.50 },
    { name: 'Avoine (Flocons)', category: 'epicerie', unit: 'kg', defaultPrice: 2.00 },
    { name: 'Thon en conserve', category: 'epicerie', unit: 'boite', defaultPrice: 1.33 },
    { name: 'Tomate concassee (Conserve)', category: 'epicerie', unit: 'boite', defaultPrice: 1.17 },
    { name: 'Lait de coco', category: 'epicerie', unit: 'brique', defaultPrice: 1.67 },
    { name: 'Olives vertes', category: 'epicerie', unit: 'bocal', defaultPrice: 1.25 },
    { name: 'Cafe (Moulu)', category: 'epicerie', unit: 'kg', defaultPrice: 15.00 },
    { name: 'The (100 sachets)', category: 'epicerie', unit: 'boite', defaultPrice: 5.00 },
    { name: 'Biscuits / Cereales enfants', category: 'epicerie', unit: 'lot', defaultPrice: 15.00 },
    { name: 'Huile d\'olive', category: 'epicerie', unit: 'L', defaultPrice: 6.00 },
    { name: 'Huile de tournesol', category: 'epicerie', unit: 'L', defaultPrice: 4.00 },
    { name: 'Sel, Poivre, Epices', category: 'epicerie', unit: 'lot', defaultPrice: 5.00 },

    // Hygiene, Entretien & Boissons
    { name: 'Eau Chifa (pack 6x1.5L)', category: 'hygiene', unit: 'pack', defaultPrice: 2.50 },
    { name: 'Lait UHT (Demi-ecreme)', category: 'hygiene', unit: 'L', defaultPrice: 1.00 },
    { name: 'Papier toilette (72r)', category: 'hygiene', unit: 'pack', defaultPrice: 22.00 },
    { name: 'Lessive bebe', category: 'hygiene', unit: 'bidon', defaultPrice: 8.00 },
    { name: 'Pastilles Lave-vaisselle (100)', category: 'hygiene', unit: 'boite', defaultPrice: 18.00 },
    { name: 'Savon main', category: 'hygiene', unit: 'unite', defaultPrice: 3.00 },
    { name: 'Liquide Vaisselle', category: 'hygiene', unit: 'unite', defaultPrice: 3.50 },
    { name: 'Liquide Rincage', category: 'hygiene', unit: 'unite', defaultPrice: 6.00 },
    { name: 'Sopalin (12r)', category: 'hygiene', unit: 'pack', defaultPrice: 10.00 },
    { name: 'Mouchoirs (10 boites)', category: 'hygiene', unit: 'lot', defaultPrice: 5.00 },
    { name: 'Sacs poubelle', category: 'hygiene', unit: 'rouleau', defaultPrice: 4.00 },
    { name: 'Sacs congelation', category: 'hygiene', unit: 'boite', defaultPrice: 3.00 },
    { name: 'Film alimentaire', category: 'hygiene', unit: 'rouleau', defaultPrice: 2.50 },
    { name: 'Papier cuisson', category: 'hygiene', unit: 'rouleau', defaultPrice: 2.00 },

    // Frais & Primeur
    { name: 'Oeufs', category: 'frais', unit: 'plaque (30)', defaultPrice: 7.00 },
    { name: 'Beurre', category: 'frais', unit: 'plaquette', defaultPrice: 2.67 },
    { name: 'Fromage rape', category: 'frais', unit: 'kg', defaultPrice: 9.00 },
    { name: 'Yaourts & Desserts', category: 'frais', unit: 'lot (48)', defaultPrice: 15.00 },
    { name: 'Pommes de terre', category: 'frais', unit: 'kg', defaultPrice: 0.90 },
    { name: 'Carottes', category: 'frais', unit: 'kg', defaultPrice: 2.00 },
    { name: 'Tomates', category: 'frais', unit: 'kg', defaultPrice: 2.50 },
    { name: 'Courgettes', category: 'frais', unit: 'kg', defaultPrice: 2.50 },
    { name: 'Oignons', category: 'frais', unit: 'kg', defaultPrice: 1.50 },
    { name: 'Poivrons', category: 'frais', unit: 'kg', defaultPrice: 3.50 },
    { name: 'Courge', category: 'frais', unit: 'kg', defaultPrice: 2.50 },
    { name: 'Concombre', category: 'frais', unit: 'kg', defaultPrice: 2.00 },
    { name: 'Salade', category: 'frais', unit: 'unite', defaultPrice: 1.50 },
    { name: 'Fruits de saison', category: 'frais', unit: 'kg', defaultPrice: 3.57 },
    { name: 'Persil & Coriandre', category: 'frais', unit: 'botte', defaultPrice: 1.00 }
];

/* ===== TEMPLATE: Passage 1 - Grand Plein ===== */
const TEMPLATE_PASS1 = [
    // Boucherie (15 jours)
    { productName: 'Viande hachee (15% MG)', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 30.00 },
    { productName: 'Blanc de poulet', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 25.00 },
    { productName: 'Steak de veau', quantity: 0.75, quantityLabel: '750 g (5-6 pces)', estimatedPrice: 15.00 },
    { productName: 'Merguez', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 14.00 },
    { productName: 'Filets de poisson blanc (surgeles)', quantity: 1.5, quantityLabel: '1,5 kg', estimatedPrice: 15.00 },
    { productName: 'Paves de saumon (surgeles)', quantity: 0.5, quantityLabel: '500 g (3-4 pces)', estimatedPrice: 11.00 },

    // Surgeles (15 jours)
    { productName: 'Legumes surgeles (Melanges/Verts)', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 7.50 },
    { productName: 'Pizzas (Surgelees)', quantity: 3, quantityLabel: '3 unites', estimatedPrice: 12.00 },
    { productName: 'Pates brisees (Frigo)', quantity: 2, quantityLabel: '2 unites', estimatedPrice: 3.00 },

    // Epicerie Seche (Stock MOIS COMPLET)
    { productName: 'Pates (Variees)', quantity: 5, quantityLabel: '5 kg', estimatedPrice: 10.00 },
    { productName: 'Riz (Basmati/Long)', quantity: 3, quantityLabel: '3 kg', estimatedPrice: 6.00 },
    { productName: 'Farine (T55)', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 2.00 },
    { productName: 'Sucre en poudre', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 3.00 },
    { productName: 'Avoine (Flocons)', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 4.00 },
    { productName: 'Thon en conserve', quantity: 15, quantityLabel: '15 boites', estimatedPrice: 20.00 },
    { productName: 'Tomate concassee (Conserve)', quantity: 12, quantityLabel: '12 boites', estimatedPrice: 14.00 },
    { productName: 'Lait de coco', quantity: 6, quantityLabel: '6 briques', estimatedPrice: 10.00 },
    { productName: 'Olives vertes', quantity: 4, quantityLabel: '4 grands bocaux', estimatedPrice: 5.00 },
    { productName: 'Cafe (Moulu)', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 15.00 },
    { productName: 'The (100 sachets)', quantity: 1, quantityLabel: '1 boite', estimatedPrice: 5.00 },
    { productName: 'Biscuits / Cereales enfants', quantity: 1, quantityLabel: 'Lot familial', estimatedPrice: 15.00 },
    { productName: 'Huile d\'olive', quantity: 1, quantityLabel: '1 L', estimatedPrice: 6.00 },
    { productName: 'Huile de tournesol', quantity: 1, quantityLabel: '1 L', estimatedPrice: 4.00 },
    { productName: 'Sel, Poivre, Epices', quantity: 1, quantityLabel: 'Reassort', estimatedPrice: 5.00 },

    // Hygiene, Entretien & Boissons (MOIS COMPLET)
    { productName: 'Eau Chifa (pack 6x1.5L)', quantity: 20, quantityLabel: '20 packs de 6x1,5L', estimatedPrice: 50.00 },
    { productName: 'Lait UHT (Demi-ecreme)', quantity: 18, quantityLabel: '18 Litres', estimatedPrice: 18.00 },
    { productName: 'Papier toilette (72r)', quantity: 1, quantityLabel: '1 pack (72r)', estimatedPrice: 22.00 },
    { productName: 'Lessive bebe', quantity: 2, quantityLabel: '2 bidons', estimatedPrice: 16.00 },
    { productName: 'Pastilles Lave-vaisselle (100)', quantity: 1, quantityLabel: '1 boite (100)', estimatedPrice: 18.00 },
    { productName: 'Savon main', quantity: 1, quantityLabel: '1', estimatedPrice: 3.00 },
    { productName: 'Liquide Vaisselle', quantity: 1, quantityLabel: '1', estimatedPrice: 3.50 },
    { productName: 'Liquide Rincage', quantity: 1, quantityLabel: '1', estimatedPrice: 6.00 },
    { productName: 'Sopalin (12r)', quantity: 1, quantityLabel: '1 pack (12r)', estimatedPrice: 10.00 },
    { productName: 'Mouchoirs (10 boites)', quantity: 1, quantityLabel: '10 boites', estimatedPrice: 5.00 },
    { productName: 'Sacs poubelle', quantity: 1, quantityLabel: '1', estimatedPrice: 4.00 },
    { productName: 'Sacs congelation', quantity: 1, quantityLabel: '1', estimatedPrice: 3.00 },
    { productName: 'Film alimentaire', quantity: 1, quantityLabel: '1', estimatedPrice: 2.50 },
    { productName: 'Papier cuisson', quantity: 1, quantityLabel: '1', estimatedPrice: 2.00 },

    // Frais & Primeur (15 jours)
    { productName: 'Oeufs', quantity: 2, quantityLabel: '60 (2 plaques)', estimatedPrice: 14.00 },
    { productName: 'Beurre', quantity: 3, quantityLabel: '3 plaquettes', estimatedPrice: 8.00 },
    { productName: 'Fromage rape', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 9.00 },
    { productName: 'Yaourts & Desserts', quantity: 1, quantityLabel: '48 pots', estimatedPrice: 15.00 },
    { productName: 'Pommes de terre', quantity: 10, quantityLabel: '10 kg', estimatedPrice: 9.00 },
    { productName: 'Carottes', quantity: 3, quantityLabel: '3 kg', estimatedPrice: 6.00 },
    { productName: 'Tomates', quantity: 3, quantityLabel: '3 kg', estimatedPrice: 7.50 },
    { productName: 'Courgettes', quantity: 3, quantityLabel: '3 kg', estimatedPrice: 7.50 },
    { productName: 'Oignons', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 3.00 },
    { productName: 'Poivrons', quantity: 1.5, quantityLabel: '1,5 kg', estimatedPrice: 5.25 },
    { productName: 'Courge', quantity: 1.5, quantityLabel: '1,5 kg', estimatedPrice: 5.75 },
    { productName: 'Fruits de saison', quantity: 7, quantityLabel: '7 kg', estimatedPrice: 25.00 },
    { productName: 'Persil & Coriandre', quantity: 2, quantityLabel: '2 bottes', estimatedPrice: 2.00 }
];

/* ===== TEMPLATE: Passage 2 - Reassort Frais ===== */
const TEMPLATE_PASS2 = [
    // Boucherie (2eme moitie)
    { productName: 'Viande hachee (15% MG)', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 30.00 },
    { productName: 'Blanc de poulet', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 25.00 },
    { productName: 'Epaule de veau (Tajine)', quantity: 1.5, quantityLabel: '1,5 kg', estimatedPrice: 24.00 },
    { productName: 'Boeuf bourguignon', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 28.00 },
    { productName: 'Poisson entier frais (Dorade)', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 15.00 },

    // Surgeles & Frais (2eme moitie)
    { productName: 'Legumes surgeles (Melanges/Verts)', quantity: 2.5, quantityLabel: '2,5 kg', estimatedPrice: 7.50 },
    { productName: 'Pizzas (Surgelees)', quantity: 3, quantityLabel: '3 unites', estimatedPrice: 12.00 },
    { productName: 'Pates brisees (Frigo)', quantity: 2, quantityLabel: '2 unites', estimatedPrice: 3.00 },

    // Frais
    { productName: 'Oeufs', quantity: 2, quantityLabel: '60 (2 plaques)', estimatedPrice: 14.00 },
    { productName: 'Beurre', quantity: 3, quantityLabel: '3 plaquettes', estimatedPrice: 8.00 },
    { productName: 'Fromage rape', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 9.00 },
    { productName: 'Yaourts & Desserts', quantity: 1, quantityLabel: '48 pots', estimatedPrice: 15.00 },
    { productName: 'Tomates', quantity: 3, quantityLabel: '3 kg', estimatedPrice: 7.50 },
    { productName: 'Courgettes', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 5.00 },
    { productName: 'Poivrons', quantity: 1, quantityLabel: '1 kg', estimatedPrice: 3.50 },
    { productName: 'Concombre', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 4.00 },
    { productName: 'Salade', quantity: 2, quantityLabel: '2', estimatedPrice: 3.00 },
    { productName: 'Carottes', quantity: 2, quantityLabel: '2 kg', estimatedPrice: 4.00 },
    { productName: 'Fruits de saison', quantity: 7, quantityLabel: '7 kg', estimatedPrice: 25.00 },
    { productName: 'Persil & Coriandre', quantity: 2, quantityLabel: '2 bottes', estimatedPrice: 2.00 }
];

/* ===== SEED FUNCTION ===== */
async function seedDefaultProducts() {
    const productIds = {};
    for (const p of DEFAULT_PRODUCTS) {
        const id = await db.products.add({ ...p });
        productIds[p.name] = id;
    }
    return productIds;
}

/* ===== LOAD TEMPLATE INTO A LIST ===== */
async function loadTemplateIntoList(listId, pass) {
    const template = pass === 1 ? TEMPLATE_PASS1 : TEMPLATE_PASS2;
    const allProducts = await db.products.toArray();

    // Remove existing items for this list
    await ListItemsDB.removeForList(listId);

    for (const tpl of template) {
        const product = allProducts.find(p => p.name === tpl.productName);
        if (product) {
            await db.listItems.add({
                listId,
                productId: product.id,
                quantity: tpl.quantity,
                quantityLabel: tpl.quantityLabel,
                estimatedPrice: tpl.estimatedPrice,
                realPrice: null,
                checked: false
            });
        }
    }
}

/* ===== MONTH NAMES ===== */
const MONTH_NAMES = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
];
