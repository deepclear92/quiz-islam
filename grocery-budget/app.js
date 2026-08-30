/* ===== MAIN APPLICATION LOGIC ===== */

const App = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentPass: 1,
    currentTab: 'dashboard',

    /* ===== INITIALIZATION ===== */
    async init() {
        await initDatabase();
        this.bindNavigation();
        this.bindMonthSelector();
        this.bindPassTabs();
        this.bindListActions();
        this.bindProductActions();
        this.bindScannerActions();
        this.bindStatsActions();
        this.bindBudgetActions();
        await this.refresh();
    },

    /* ===== NAVIGATION ===== */
    bindNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                document.getElementById(`tab-${this.currentTab}`).classList.add('active');
                this.refreshTab();
            });
        });
    },

    bindMonthSelector() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 1) { this.currentMonth = 12; this.currentYear--; }
            this.refresh();
        });
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 12) { this.currentMonth = 1; this.currentYear++; }
            this.refresh();
        });
    },

    updateMonthLabel() {
        document.getElementById('current-month-label').textContent =
            `${MONTH_NAMES[this.currentMonth - 1]} ${this.currentYear}`;
    },

    /* ===== PASS TABS ===== */
    bindPassTabs() {
        document.querySelectorAll('.pass-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pass-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPass = parseInt(btn.dataset.pass);
                this.renderShoppingList();
            });
        });
    },

    /* ===== BUDGET ACTIONS ===== */
    bindBudgetActions() {
        document.getElementById('save-budget-btn').addEventListener('click', async () => {
            const val = parseFloat(document.getElementById('monthly-budget-input').value);
            if (!isNaN(val) && val > 0) {
                await BudgetsDB.setForMonth(this.currentYear, this.currentMonth, val);
                await this.refreshDashboard();
            }
        });
    },

    /* ===== REFRESH ===== */
    async refresh() {
        this.updateMonthLabel();
        await this.refreshTab();
    },

    async refreshTab() {
        switch (this.currentTab) {
            case 'dashboard': await this.refreshDashboard(); break;
            case 'lists': await this.renderShoppingList(); break;
            case 'products': await this.renderProducts(); break;
            case 'stats': await this.refreshStats(); break;
        }
    },

    /* ===== DASHBOARD ===== */
    async refreshDashboard() {
        const budget = await BudgetsDB.getForMonth(this.currentYear, this.currentMonth);
        const budgetAmount = budget ? budget.budget : 900;
        const totalSpent = await StatsDB.recalcMonthlySpent(this.currentYear, this.currentMonth);

        document.getElementById('monthly-budget-input').value = budgetAmount;
        document.getElementById('dash-budget').textContent = formatEUR(budgetAmount);
        document.getElementById('dash-spent').textContent = formatEUR(totalSpent);
        document.getElementById('dash-remaining').textContent = formatEUR(budgetAmount - totalSpent);

        const pct = budgetAmount > 0 ? Math.min((totalSpent / budgetAmount) * 100, 100) : 0;
        const bar = document.getElementById('dash-budget-bar');
        bar.style.width = pct + '%';
        bar.className = 'budget-bar' + (pct > 90 ? ' danger' : pct > 70 ? ' warning' : '');

        // Pass 1 & 2 info
        for (const pass of [1, 2]) {
            const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, pass);
            const items = await ListItemsDB.getForList(list.id);
            const total = items.reduce((s, i) => s + (i.realPrice || i.estimatedPrice || 0), 0);
            const count = items.length;

            document.getElementById(`dash-pass${pass}`).textContent = formatEUR(total);
            document.getElementById(`dash-pass${pass}-items`).textContent = `${count} articles`;

            const statusEl = document.getElementById(`dash-pass${pass}-status`);
            if (list.status === 'done') {
                statusEl.textContent = 'Termine';
                statusEl.className = 'card-status done';
            } else {
                statusEl.textContent = 'En cours';
                statusEl.className = 'card-status pending';
            }
        }

        // Budget init if needed
        if (!budget) {
            await BudgetsDB.setForMonth(this.currentYear, this.currentMonth, 900);
        }

        await Charts.renderDashboardPie(this.currentYear, this.currentMonth);
    },

    /* ===== SHOPPING LIST ===== */
    bindListActions() {
        document.getElementById('add-item-btn').addEventListener('click', () => this.showAddItemModal());
        document.getElementById('mark-done-btn').addEventListener('click', () => this.markPassDone());
        document.getElementById('load-template-btn').addEventListener('click', () => this.loadTemplate());
    },

    async renderShoppingList() {
        const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, this.currentPass);
        const items = await ListItemsDB.getWithProducts(list.id);

        // Group by category
        const groups = {};
        for (const item of items) {
            const cat = item.product.category;
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        }

        const container = document.getElementById('shopping-list-container');
        container.innerHTML = '';

        const catOrder = ['boucherie', 'surgeles', 'epicerie', 'hygiene', 'frais'];
        const sortedCats = Object.keys(groups).sort((a, b) => {
            return (catOrder.indexOf(a) === -1 ? 99 : catOrder.indexOf(a)) -
                   (catOrder.indexOf(b) === -1 ? 99 : catOrder.indexOf(b));
        });

        let totalEstimated = 0;
        let totalReal = 0;

        for (const cat of sortedCats) {
            const catInfo = CATEGORIES[cat] || { label: cat, icon: '', color: '#95a5a6' };
            const catItems = groups[cat];
            const catTotal = catItems.reduce((s, i) => s + (i.realPrice || i.estimatedPrice || 0), 0);

            const groupDiv = document.createElement('div');
            groupDiv.className = 'category-group';

            const header = document.createElement('div');
            header.className = 'category-header';
            header.style.background = catInfo.color;
            header.innerHTML = `
                <span class="cat-icon">${catInfo.icon}</span>
                <span>${catInfo.label}</span>
                <span class="cat-total">${formatEUR(catTotal)}</span>
            `;
            groupDiv.appendChild(header);

            for (const item of catItems) {
                totalEstimated += item.estimatedPrice || 0;
                totalReal += item.realPrice || item.estimatedPrice || 0;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'list-item' + (item.checked ? ' checked' : '');
                itemDiv.innerHTML = `
                    <input type="checkbox" ${item.checked ? 'checked' : ''} data-id="${item.id}">
                    <span class="item-name">${item.product.name}</span>
                    <span class="item-qty">${item.quantityLabel || item.quantity}</span>
                    <span class="item-price">${formatEUR(item.estimatedPrice || 0)}</span>
                    <span class="item-real-price">
                        <input type="number" step="0.01" placeholder="Reel"
                               value="${item.realPrice || ''}"
                               data-id="${item.id}" class="real-price-input">
                    </span>
                    <span class="item-actions">
                        <button class="edit-item-btn" data-id="${item.id}" title="Modifier">&#9998;</button>
                        <button class="delete-btn delete-item-btn" data-id="${item.id}" title="Supprimer">&#128465;</button>
                    </span>
                `;
                groupDiv.appendChild(itemDiv);
            }

            container.appendChild(groupDiv);
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div class="card text-center" style="padding:3rem;text-align:center">
                    <p style="font-size:1.1rem;color:var(--text-light)">Aucun article dans cette liste.</p>
                    <p style="margin-top:0.5rem">
                        <button class="btn btn-primary" onclick="App.loadTemplate()">Charger le modele type</button>
                        ou
                        <button class="btn" onclick="App.showAddItemModal()">Ajouter manuellement</button>
                    </p>
                </div>
            `;
        }

        document.getElementById('list-total-amount').textContent = formatEUR(totalEstimated);
        document.getElementById('list-real-amount').textContent = formatEUR(totalReal);

        // Bind events
        this.bindListItemEvents();
    },

    bindListItemEvents() {
        // Checkboxes
        document.querySelectorAll('#shopping-list-container input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', async (e) => {
                await ListItemsDB.update(parseInt(e.target.dataset.id), { checked: e.target.checked });
                e.target.closest('.list-item').classList.toggle('checked', e.target.checked);
            });
        });

        // Real price inputs
        document.querySelectorAll('.real-price-input').forEach(input => {
            input.addEventListener('change', async (e) => {
                const val = parseFloat(e.target.value);
                const itemId = parseInt(e.target.dataset.id);
                if (!isNaN(val)) {
                    await ListItemsDB.update(itemId, { realPrice: val });
                    // Also update price history
                    const item = await db.listItems.get(itemId);
                    if (item) {
                        await PriceHistoryDB.add(item.productId, val, 'manual');
                    }
                } else {
                    await ListItemsDB.update(itemId, { realPrice: null });
                }
                await StatsDB.recalcMonthlySpent(this.currentYear, this.currentMonth);
            });
        });

        // Edit item buttons
        document.querySelectorAll('.edit-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showEditItemModal(parseInt(e.target.dataset.id));
            });
        });

        // Delete item buttons
        document.querySelectorAll('.delete-item-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (confirm('Supprimer cet article de la liste ?')) {
                    await ListItemsDB.remove(parseInt(e.target.dataset.id));
                    await this.renderShoppingList();
                }
            });
        });
    },

    async loadTemplate() {
        const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, this.currentPass);
        const existing = await ListItemsDB.getForList(list.id);

        if (existing.length > 0) {
            if (!confirm('La liste contient deja des articles. Voulez-vous la remplacer par le modele type ?')) {
                return;
            }
        }

        await loadTemplateIntoList(list.id, this.currentPass);
        await StatsDB.recalcMonthlySpent(this.currentYear, this.currentMonth);
        await this.renderShoppingList();
    },

    async markPassDone() {
        const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, this.currentPass);
        const newStatus = list.status === 'done' ? 'pending' : 'done';
        await ListsDB.updateStatus(list.id, newStatus);
        await StatsDB.recalcMonthlySpent(this.currentYear, this.currentMonth);
        alert(newStatus === 'done' ? 'Passage marque comme termine !' : 'Passage remis en cours.');
        await this.renderShoppingList();
    },

    /* ===== MODALS ===== */
    showModal(title, bodyHTML, footerHTML) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = bodyHTML;
        document.getElementById('modal-footer').innerHTML = footerHTML;
        document.getElementById('modal-overlay').classList.remove('hidden');
    },

    hideModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
    },

    /* Add item to current list */
    async showAddItemModal() {
        const products = await ProductsDB.getAll();
        const options = products.map(p =>
            `<option value="${p.id}" data-price="${p.defaultPrice}">${p.name} (${formatEUR(p.defaultPrice)})</option>`
        ).join('');

        this.showModal('Ajouter un article', `
            <div class="form-group">
                <label>Produit</label>
                <select id="modal-product-select">${options}</select>
            </div>
            <div class="form-group">
                <label>Quantite (label)</label>
                <input type="text" id="modal-qty-label" placeholder="ex: 2,5 kg">
            </div>
            <div class="form-group">
                <label>Quantite (nombre)</label>
                <input type="number" id="modal-qty" step="0.1" value="1" min="0">
            </div>
            <div class="form-group">
                <label>Prix estime</label>
                <input type="number" id="modal-est-price" step="0.01" min="0">
            </div>
        `, `
            <button class="btn" onclick="App.hideModal()">Annuler</button>
            <button class="btn btn-primary" id="modal-save-add-item">Ajouter</button>
        `);

        // Auto-fill price when product changes
        const select = document.getElementById('modal-product-select');
        const priceInput = document.getElementById('modal-est-price');
        select.addEventListener('change', () => {
            const opt = select.options[select.selectedIndex];
            priceInput.value = opt.dataset.price;
        });
        // Trigger initial fill
        if (select.options.length > 0) {
            priceInput.value = select.options[0].dataset.price;
        }

        document.getElementById('modal-save-add-item').addEventListener('click', async () => {
            const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, this.currentPass);
            const productId = parseInt(select.value);
            const qty = parseFloat(document.getElementById('modal-qty').value) || 1;
            const qtyLabel = document.getElementById('modal-qty-label').value || String(qty);
            const estPrice = parseFloat(priceInput.value) || 0;

            await ListItemsDB.add({
                listId: list.id,
                productId,
                quantity: qty,
                quantityLabel: qtyLabel,
                estimatedPrice: estPrice,
                realPrice: null,
                checked: false
            });

            this.hideModal();
            await this.renderShoppingList();
        });
    },

    async showEditItemModal(itemId) {
        const item = await db.listItems.get(itemId);
        if (!item) return;
        const product = await ProductsDB.getById(item.productId);

        this.showModal('Modifier l\'article', `
            <div class="form-group">
                <label>Produit</label>
                <input type="text" value="${product ? product.name : 'Inconnu'}" disabled>
            </div>
            <div class="form-group">
                <label>Quantite (label)</label>
                <input type="text" id="modal-edit-qty-label" value="${item.quantityLabel || ''}">
            </div>
            <div class="form-group">
                <label>Quantite (nombre)</label>
                <input type="number" id="modal-edit-qty" step="0.1" value="${item.quantity}" min="0">
            </div>
            <div class="form-group">
                <label>Prix estime</label>
                <input type="number" id="modal-edit-est-price" step="0.01" value="${item.estimatedPrice || 0}" min="0">
            </div>
            <div class="form-group">
                <label>Prix reel</label>
                <input type="number" id="modal-edit-real-price" step="0.01" value="${item.realPrice || ''}" min="0">
            </div>
        `, `
            <button class="btn" onclick="App.hideModal()">Annuler</button>
            <button class="btn btn-primary" id="modal-save-edit-item">Enregistrer</button>
        `);

        document.getElementById('modal-save-edit-item').addEventListener('click', async () => {
            await ListItemsDB.update(itemId, {
                quantity: parseFloat(document.getElementById('modal-edit-qty').value) || 1,
                quantityLabel: document.getElementById('modal-edit-qty-label').value,
                estimatedPrice: parseFloat(document.getElementById('modal-edit-est-price').value) || 0,
                realPrice: parseFloat(document.getElementById('modal-edit-real-price').value) || null
            });
            this.hideModal();
            await this.renderShoppingList();
        });
    },

    /* ===== PRODUCTS CATALOG ===== */
    bindProductActions() {
        document.getElementById('add-product-btn').addEventListener('click', () => this.showAddProductModal());
        document.getElementById('product-search').addEventListener('input', () => this.renderProducts());
        document.getElementById('product-category-filter').addEventListener('change', () => this.renderProducts());
    },

    async renderProducts() {
        const search = document.getElementById('product-search').value.toLowerCase();
        const catFilter = document.getElementById('product-category-filter').value;

        let products = await ProductsDB.getAll();

        if (search) {
            products = products.filter(p => p.name.toLowerCase().includes(search));
        }
        if (catFilter) {
            products = products.filter(p => p.category === catFilter);
        }

        // Populate category filter
        const categories = await ProductsDB.getCategories();
        const filterSelect = document.getElementById('product-category-filter');
        const currentFilterVal = filterSelect.value;
        filterSelect.innerHTML = '<option value="">Toutes categories</option>' +
            categories.map(c => {
                const catInfo = CATEGORIES[c] || { label: c };
                return `<option value="${c}" ${c === currentFilterVal ? 'selected' : ''}>${catInfo.icon || ''} ${catInfo.label}</option>`;
            }).join('');

        const tbody = document.getElementById('products-tbody');
        tbody.innerHTML = products.map(p => {
            const catInfo = CATEGORIES[p.category] || { label: p.category };
            return `<tr>
                <td><strong>${p.name}</strong></td>
                <td>${catInfo.icon || ''} ${catInfo.label}</td>
                <td>${formatEUR(p.defaultPrice)}</td>
                <td>${p.unit}</td>
                <td>
                    <button class="btn btn-sm edit-product-btn" data-id="${p.id}">Modifier</button>
                    <button class="btn btn-sm btn-danger delete-product-btn" data-id="${p.id}">&#128465;</button>
                </td>
            </tr>`;
        }).join('');

        // Bind edit/delete
        tbody.querySelectorAll('.edit-product-btn').forEach(btn => {
            btn.addEventListener('click', () => this.showEditProductModal(parseInt(btn.dataset.id)));
        });
        tbody.querySelectorAll('.delete-product-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Supprimer ce produit ?')) {
                    await ProductsDB.remove(parseInt(btn.dataset.id));
                    await this.renderProducts();
                }
            });
        });
    },

    showAddProductModal() {
        const catOptions = Object.entries(CATEGORIES).map(([key, val]) =>
            `<option value="${key}">${val.icon} ${val.label}</option>`
        ).join('');

        this.showModal('Nouveau produit', `
            <div class="form-group">
                <label>Nom</label>
                <input type="text" id="modal-prod-name" placeholder="Nom du produit">
            </div>
            <div class="form-group">
                <label>Categorie</label>
                <select id="modal-prod-cat">${catOptions}</select>
            </div>
            <div class="form-group">
                <label>Prix unitaire par defaut</label>
                <input type="number" id="modal-prod-price" step="0.01" min="0" value="0">
            </div>
            <div class="form-group">
                <label>Unite</label>
                <input type="text" id="modal-prod-unit" placeholder="kg, L, unite, boite..." value="unite">
            </div>
        `, `
            <button class="btn" onclick="App.hideModal()">Annuler</button>
            <button class="btn btn-primary" id="modal-save-product">Creer</button>
        `);

        document.getElementById('modal-save-product').addEventListener('click', async () => {
            const name = document.getElementById('modal-prod-name').value.trim();
            if (!name) { alert('Le nom est obligatoire.'); return; }

            await ProductsDB.add({
                name,
                category: document.getElementById('modal-prod-cat').value,
                defaultPrice: parseFloat(document.getElementById('modal-prod-price').value) || 0,
                unit: document.getElementById('modal-prod-unit').value.trim() || 'unite'
            });

            this.hideModal();
            await this.renderProducts();
        });
    },

    async showEditProductModal(productId) {
        const product = await ProductsDB.getById(productId);
        if (!product) return;

        const catOptions = Object.entries(CATEGORIES).map(([key, val]) =>
            `<option value="${key}" ${key === product.category ? 'selected' : ''}>${val.icon} ${val.label}</option>`
        ).join('');

        this.showModal('Modifier le produit', `
            <div class="form-group">
                <label>Nom</label>
                <input type="text" id="modal-prod-name" value="${product.name}">
            </div>
            <div class="form-group">
                <label>Categorie</label>
                <select id="modal-prod-cat">${catOptions}</select>
            </div>
            <div class="form-group">
                <label>Prix unitaire par defaut</label>
                <input type="number" id="modal-prod-price" step="0.01" min="0" value="${product.defaultPrice}">
            </div>
            <div class="form-group">
                <label>Unite</label>
                <input type="text" id="modal-prod-unit" value="${product.unit}">
            </div>
        `, `
            <button class="btn" onclick="App.hideModal()">Annuler</button>
            <button class="btn btn-primary" id="modal-save-edit-product">Enregistrer</button>
        `);

        document.getElementById('modal-save-edit-product').addEventListener('click', async () => {
            const name = document.getElementById('modal-prod-name').value.trim();
            if (!name) { alert('Le nom est obligatoire.'); return; }

            await ProductsDB.update(productId, {
                name,
                category: document.getElementById('modal-prod-cat').value,
                defaultPrice: parseFloat(document.getElementById('modal-prod-price').value) || 0,
                unit: document.getElementById('modal-prod-unit').value.trim() || 'unite'
            });

            this.hideModal();
            await this.renderProducts();
        });
    },

    /* ===== SCANNER ===== */
    bindScannerActions() {
        const fileInput = document.getElementById('receipt-input');
        const uploadArea = document.getElementById('upload-area');

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                this.processReceipt(e.target.files[0]);
            }
        });

        // Drag & drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-light)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                this.processReceipt(e.dataTransfer.files[0]);
            }
        });

        document.getElementById('sync-scanned-btn').addEventListener('click', () => this.syncScannedItems());
        document.getElementById('clear-scan-btn').addEventListener('click', () => this.clearScan());
    },

    async processReceipt(file) {
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('receipt-preview').src = e.target.result;
            document.getElementById('scanner-preview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);

        // Show progress
        document.getElementById('scanner-progress').classList.remove('hidden');
        document.getElementById('scanner-results').classList.add('hidden');

        try {
            const result = await ReceiptScanner.processImage(file, (progress) => {
                document.getElementById('ocr-progress').style.width = progress + '%';
                document.getElementById('ocr-status').textContent = `Analyse en cours... ${progress}%`;
            });

            document.getElementById('ocr-status').textContent =
                `Analyse terminee - ${result.items.length} produits detectes (confiance: ${Math.round(result.confidence)}%)`;

            this.lastScanResult = result;
            this.renderScannedItems(result.items);
        } catch (error) {
            document.getElementById('ocr-status').textContent = 'Erreur lors de l\'analyse : ' + error.message;
        }
    },

    async renderScannedItems(items) {
        const products = await ProductsDB.getAll();
        const tbody = document.getElementById('scanned-items-tbody');

        const productOptions = products.map(p =>
            `<option value="${p.id}">${p.name}</option>`
        ).join('');

        tbody.innerHTML = items.map((item, idx) => `
            <tr>
                <td>${item.name}</td>
                <td>${formatEUR(item.price)}</td>
                <td>
                    <select class="scanned-match" data-idx="${idx}">
                        <option value="">-- Ignorer --</option>
                        ${productOptions}
                    </select>
                </td>
                <td>
                    ${item.matchScore > 0.5 ? '<span class="text-success">Auto</span>' : '<span class="text-warning">Manuel</span>'}
                </td>
            </tr>
        `).join('');

        // Pre-select matched products
        items.forEach((item, idx) => {
            if (item.productId && item.matchScore > 0.3) {
                const select = tbody.querySelector(`select[data-idx="${idx}"]`);
                if (select) select.value = item.productId;
            }
        });

        document.getElementById('scanner-results').classList.remove('hidden');
    },

    async syncScannedItems() {
        if (!this.lastScanResult) return;

        const list = await ListsDB.getOrCreate(this.currentYear, this.currentMonth, this.currentPass);
        const tbody = document.getElementById('scanned-items-tbody');
        const selects = tbody.querySelectorAll('.scanned-match');

        let synced = 0;
        for (let i = 0; i < selects.length; i++) {
            const select = selects[i];
            const idx = parseInt(select.dataset.idx);
            const productId = parseInt(select.value);
            if (!productId) continue;

            const scannedItem = this.lastScanResult.items[idx];
            if (!scannedItem) continue;

            // Find matching list item or create one
            const listItems = await ListItemsDB.getForList(list.id);
            const existing = listItems.find(li => li.productId === productId);

            if (existing) {
                await ListItemsDB.update(existing.id, {
                    realPrice: scannedItem.price,
                    checked: true
                });
            } else {
                await ListItemsDB.add({
                    listId: list.id,
                    productId,
                    quantity: scannedItem.quantity || 1,
                    quantityLabel: String(scannedItem.quantity || 1),
                    estimatedPrice: scannedItem.price,
                    realPrice: scannedItem.price,
                    checked: true
                });
            }

            await PriceHistoryDB.add(productId, scannedItem.price, 'receipt');
            synced++;
        }

        // Save receipt record
        await ReceiptsDB.add({
            listId: list.id,
            imageData: document.getElementById('receipt-preview').src,
            ocrText: this.lastScanResult.rawText,
            scannedAt: new Date().toISOString()
        });

        await StatsDB.recalcMonthlySpent(this.currentYear, this.currentMonth);
        alert(`${synced} produit(s) synchronise(s) avec la liste !`);
    },

    clearScan() {
        document.getElementById('scanner-preview').classList.add('hidden');
        document.getElementById('scanner-progress').classList.add('hidden');
        document.getElementById('scanner-results').classList.add('hidden');
        document.getElementById('receipt-input').value = '';
        this.lastScanResult = null;
    },

    /* ===== STATISTICS ===== */
    bindStatsActions() {
        document.getElementById('price-track-product').addEventListener('change', (e) => {
            const selected = Array.from(e.target.selectedOptions).map(o => o.value);
            Charts.renderPriceEvolutionChart(selected);
        });
    },

    async refreshStats() {
        await Charts.renderAll(this.currentYear, this.currentMonth);
    }
};

/* ===== MODAL CLOSE HANDLERS ===== */
document.getElementById('modal-close').addEventListener('click', () => App.hideModal());
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) App.hideModal();
});

/* ===== START APP ===== */
document.addEventListener('DOMContentLoaded', () => App.init());
