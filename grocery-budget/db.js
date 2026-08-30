/* ===== DATABASE LAYER - Dexie.js (IndexedDB) ===== */

const db = new Dexie('GroceryBudgetDB');

db.version(1).stores({
    products: '++id, name, category, unit, defaultPrice',
    shoppingLists: '++id, year, month, pass, status, createdAt',
    listItems: '++id, listId, productId, quantity, quantityLabel, estimatedPrice, realPrice, checked',
    monthlyBudgets: '++id, &[year+month], budget, totalSpent',
    priceHistory: '++id, productId, price, date, source',
    receipts: '++id, listId, imageData, ocrText, scannedAt'
});

/* ===== HELPER: Format currency ===== */
function formatEUR(amount) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
}

/* ===== HELPER: Current month key ===== */
function monthKey(year, month) {
    return `${year}-${String(month).padStart(2, '0')}`;
}

/* ===== PRODUCTS CRUD ===== */
const ProductsDB = {
    async getAll() {
        return db.products.toArray();
    },
    async getByCategory(category) {
        return db.products.where('category').equals(category).toArray();
    },
    async getById(id) {
        return db.products.get(id);
    },
    async add(product) {
        return db.products.add(product);
    },
    async update(id, data) {
        return db.products.update(id, data);
    },
    async remove(id) {
        return db.products.delete(id);
    },
    async search(term) {
        const lower = term.toLowerCase();
        const all = await db.products.toArray();
        return all.filter(p => p.name.toLowerCase().includes(lower));
    },
    async getCategories() {
        const all = await db.products.toArray();
        return [...new Set(all.map(p => p.category))].sort();
    }
};

/* ===== SHOPPING LISTS CRUD ===== */
const ListsDB = {
    async getForMonth(year, month) {
        return db.shoppingLists
            .where('[year+month]')
            .equals([year, month])
            .toArray()
            .catch(() => {
                // Fallback for compound index issues
                return db.shoppingLists.filter(l => l.year === year && l.month === month).toArray();
            });
    },
    async getOrCreate(year, month, pass) {
        let lists = await db.shoppingLists
            .filter(l => l.year === year && l.month === month && l.pass === pass)
            .toArray();
        if (lists.length > 0) return lists[0];
        const id = await db.shoppingLists.add({
            year, month, pass,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        return db.shoppingLists.get(id);
    },
    async updateStatus(id, status) {
        return db.shoppingLists.update(id, { status });
    },
    async getAll() {
        return db.shoppingLists.toArray();
    }
};

/* ===== LIST ITEMS CRUD ===== */
const ListItemsDB = {
    async getForList(listId) {
        return db.listItems.where('listId').equals(listId).toArray();
    },
    async add(item) {
        return db.listItems.add(item);
    },
    async update(id, data) {
        return db.listItems.update(id, data);
    },
    async remove(id) {
        return db.listItems.delete(id);
    },
    async removeForList(listId) {
        const items = await db.listItems.where('listId').equals(listId).toArray();
        return db.listItems.bulkDelete(items.map(i => i.id));
    },
    async getWithProducts(listId) {
        const items = await db.listItems.where('listId').equals(listId).toArray();
        const enriched = [];
        for (const item of items) {
            const product = await db.products.get(item.productId);
            enriched.push({ ...item, product: product || { name: 'Inconnu', category: 'Autre' } });
        }
        return enriched;
    }
};

/* ===== MONTHLY BUDGETS ===== */
const BudgetsDB = {
    async getForMonth(year, month) {
        const all = await db.monthlyBudgets.toArray();
        return all.find(b => b.year === year && b.month === month);
    },
    async setForMonth(year, month, budget) {
        const existing = await this.getForMonth(year, month);
        if (existing) {
            return db.monthlyBudgets.update(existing.id, { budget });
        }
        return db.monthlyBudgets.add({ year, month, budget, totalSpent: 0 });
    },
    async updateSpent(year, month, totalSpent) {
        const existing = await this.getForMonth(year, month);
        if (existing) {
            return db.monthlyBudgets.update(existing.id, { totalSpent });
        }
        return db.monthlyBudgets.add({ year, month, budget: 900, totalSpent });
    },
    async getAll() {
        return db.monthlyBudgets.toArray();
    }
};

/* ===== PRICE HISTORY ===== */
const PriceHistoryDB = {
    async add(productId, price, source = 'manual') {
        return db.priceHistory.add({
            productId,
            price,
            date: new Date().toISOString(),
            source
        });
    },
    async getForProduct(productId) {
        return db.priceHistory.where('productId').equals(productId).toArray();
    },
    async getAll() {
        return db.priceHistory.toArray();
    }
};

/* ===== RECEIPTS ===== */
const ReceiptsDB = {
    async add(receipt) {
        return db.receipts.add(receipt);
    },
    async getForList(listId) {
        return db.receipts.where('listId').equals(listId).toArray();
    }
};

/* ===== STATISTICS HELPERS ===== */
const StatsDB = {
    async getMonthlySpending(months = 12) {
        const budgets = await db.monthlyBudgets.toArray();
        budgets.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });
        return budgets.slice(-months);
    },

    async getCategoryBreakdown(year, month) {
        const lists = await ListsDB.getForMonth(year, month);
        const breakdown = {};
        for (const list of lists) {
            const items = await ListItemsDB.getWithProducts(list.id);
            for (const item of items) {
                const cat = item.product.category;
                const price = item.realPrice || item.estimatedPrice || 0;
                breakdown[cat] = (breakdown[cat] || 0) + price;
            }
        }
        return breakdown;
    },

    async getTopProducts(year, month, limit = 10) {
        const lists = await ListsDB.getForMonth(year, month);
        const totals = {};
        for (const list of lists) {
            const items = await ListItemsDB.getWithProducts(list.id);
            for (const item of items) {
                const name = item.product.name;
                const price = item.realPrice || item.estimatedPrice || 0;
                totals[name] = (totals[name] || 0) + price;
            }
        }
        return Object.entries(totals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
    },

    async getEstimateVsReal(year, month) {
        const lists = await ListsDB.getForMonth(year, month);
        let totalEstimated = 0;
        let totalReal = 0;
        for (const list of lists) {
            const items = await ListItemsDB.getForList(list.id);
            for (const item of items) {
                totalEstimated += item.estimatedPrice || 0;
                totalReal += item.realPrice || item.estimatedPrice || 0;
            }
        }
        return { estimated: totalEstimated, real: totalReal };
    },

    async recalcMonthlySpent(year, month) {
        const lists = await ListsDB.getForMonth(year, month);
        let total = 0;
        for (const list of lists) {
            const items = await ListItemsDB.getForList(list.id);
            for (const item of items) {
                total += item.realPrice || item.estimatedPrice || 0;
            }
        }
        await BudgetsDB.updateSpent(year, month, total);
        return total;
    }
};

/* ===== INIT: Seed data if empty ===== */
async function initDatabase() {
    const count = await db.products.count();
    if (count === 0) {
        await seedDefaultProducts();
    }
}
