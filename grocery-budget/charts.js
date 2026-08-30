/* ===== CHARTS & STATISTICS MODULE ===== */

const Charts = {
    instances: {},

    /* Destroy a chart before re-creating it */
    destroy(key) {
        if (this.instances[key]) {
            this.instances[key].destroy();
            delete this.instances[key];
        }
    },

    destroyAll() {
        Object.keys(this.instances).forEach(k => this.destroy(k));
    },

    /* ===== Dashboard Pie Chart ===== */
    async renderDashboardPie(year, month) {
        this.destroy('dashPie');
        const canvas = document.getElementById('dash-pie-chart');
        if (!canvas) return;

        const breakdown = await StatsDB.getCategoryBreakdown(year, month);
        const labels = [];
        const data = [];
        const colors = [];

        for (const [cat, amount] of Object.entries(breakdown)) {
            const catInfo = CATEGORIES[cat] || { label: cat, color: '#95a5a6' };
            labels.push(catInfo.label);
            data.push(Math.round(amount * 100) / 100);
            colors.push(catInfo.color);
        }

        if (data.length === 0) {
            labels.push('Aucune donnee');
            data.push(1);
            colors.push('#ecf0f1');
        }

        this.instances['dashPie'] = new Chart(canvas, {
            type: 'doughnut',
            data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2 }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.label}: ${formatEUR(ctx.parsed)}`
                        }
                    }
                }
            }
        });
    },

    /* ===== Monthly Spending Line Chart ===== */
    async renderMonthlyChart() {
        this.destroy('monthly');
        const canvas = document.getElementById('monthly-chart');
        if (!canvas) return;

        const data = await StatsDB.getMonthlySpending(12);
        const labels = data.map(d => `${MONTH_NAMES[d.month - 1]} ${d.year}`);
        const budgets = data.map(d => d.budget);
        const spent = data.map(d => d.totalSpent);

        this.instances['monthly'] = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Budget',
                        data: budgets,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52,152,219,0.1)',
                        fill: true,
                        tension: 0.3,
                        borderWidth: 2
                    },
                    {
                        label: 'Depenses',
                        data: spent,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231,76,60,0.1)',
                        fill: true,
                        tension: 0.3,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${formatEUR(ctx.parsed.y)}` } }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: v => formatEUR(v) } }
                }
            }
        });
    },

    /* ===== Category Breakdown Bar Chart ===== */
    async renderCategoryChart(year, month) {
        this.destroy('category');
        const canvas = document.getElementById('category-chart');
        if (!canvas) return;

        const breakdown = await StatsDB.getCategoryBreakdown(year, month);
        const labels = [];
        const data = [];
        const colors = [];

        for (const [cat, amount] of Object.entries(breakdown)) {
            const catInfo = CATEGORIES[cat] || { label: cat, color: '#95a5a6' };
            labels.push(catInfo.label);
            data.push(Math.round(amount * 100) / 100);
            colors.push(catInfo.color);
        }

        this.instances['category'] = new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{ label: 'Montant', data, backgroundColor: colors, borderRadius: 6 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => formatEUR(ctx.parsed.x) } }
                },
                scales: {
                    x: { beginAtZero: true, ticks: { callback: v => formatEUR(v) } }
                }
            }
        });
    },

    /* ===== Top Products Bar Chart ===== */
    async renderTopProductsChart(year, month) {
        this.destroy('topProducts');
        const canvas = document.getElementById('top-products-chart');
        if (!canvas) return;

        const topProducts = await StatsDB.getTopProducts(year, month, 10);
        const labels = topProducts.map(([name]) => name.length > 20 ? name.substring(0, 20) + '...' : name);
        const data = topProducts.map(([, amount]) => Math.round(amount * 100) / 100);

        this.instances['topProducts'] = new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Montant',
                    data,
                    backgroundColor: '#e67e22',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => formatEUR(ctx.parsed.x) } }
                },
                scales: {
                    x: { beginAtZero: true, ticks: { callback: v => formatEUR(v) } }
                }
            }
        });
    },

    /* ===== Price Evolution Line Chart ===== */
    async renderPriceEvolutionChart(productIds) {
        this.destroy('priceEvolution');
        const canvas = document.getElementById('price-evolution-chart');
        if (!canvas) return;

        if (!productIds || productIds.length === 0) {
            this.instances['priceEvolution'] = new Chart(canvas, {
                type: 'line',
                data: { labels: [], datasets: [] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: 'Selectionnez des produits ci-dessus' }
                    }
                }
            });
            return;
        }

        const colors = ['#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
        const datasets = [];

        for (let i = 0; i < productIds.length; i++) {
            const pid = parseInt(productIds[i]);
            const product = await ProductsDB.getById(pid);
            const history = await PriceHistoryDB.getForProduct(pid);

            if (history.length === 0) continue;

            history.sort((a, b) => new Date(a.date) - new Date(b.date));

            datasets.push({
                label: product ? product.name : `Produit ${pid}`,
                data: history.map(h => ({ x: h.date.substring(0, 10), y: h.price })),
                borderColor: colors[i % colors.length],
                tension: 0.3,
                borderWidth: 2,
                fill: false
            });
        }

        // Collect all dates for labels
        const allDates = [...new Set(datasets.flatMap(ds => ds.data.map(d => d.x)))].sort();

        this.instances['priceEvolution'] = new Chart(canvas, {
            type: 'line',
            data: { labels: allDates, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${formatEUR(ctx.parsed.y)}` } }
                },
                scales: {
                    y: { beginAtZero: false, ticks: { callback: v => formatEUR(v) } }
                }
            }
        });
    },

    /* ===== Estimate vs Real Chart ===== */
    async renderEstimateVsRealChart(year, month) {
        this.destroy('estimateVsReal');
        const canvas = document.getElementById('estimate-vs-real-chart');
        if (!canvas) return;

        // Get last 6 months data
        const months = [];
        let y = year, m = month;
        for (let i = 0; i < 6; i++) {
            months.unshift({ year: y, month: m });
            m--;
            if (m < 1) { m = 12; y--; }
        }

        const labels = [];
        const estimated = [];
        const real = [];

        for (const mo of months) {
            labels.push(`${MONTH_NAMES[mo.month - 1].substring(0, 3)} ${mo.year}`);
            const data = await StatsDB.getEstimateVsReal(mo.year, mo.month);
            estimated.push(Math.round(data.estimated * 100) / 100);
            real.push(Math.round(data.real * 100) / 100);
        }

        this.instances['estimateVsReal'] = new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    { label: 'Estime', data: estimated, backgroundColor: 'rgba(52,152,219,0.7)', borderRadius: 4 },
                    { label: 'Reel', data: real, backgroundColor: 'rgba(231,76,60,0.7)', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${formatEUR(ctx.parsed.y)}` } }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: v => formatEUR(v) } }
                }
            }
        });
    },

    /* ===== History Table ===== */
    async renderHistoryTable() {
        const tbody = document.getElementById('history-tbody');
        if (!tbody) return;

        const budgets = await BudgetsDB.getAll();
        budgets.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });

        tbody.innerHTML = budgets.map(b => {
            const diff = b.budget - b.totalSpent;
            const cls = diff >= 0 ? 'text-success' : 'text-danger';
            return `<tr>
                <td>${MONTH_NAMES[b.month - 1]} ${b.year}</td>
                <td>${formatEUR(b.budget)}</td>
                <td>${formatEUR(b.totalSpent)}</td>
                <td class="${cls}">${diff >= 0 ? '+' : ''}${formatEUR(diff)}</td>
            </tr>`;
        }).join('');
    },

    /* ===== Populate price tracking product selector ===== */
    async populatePriceTrackSelector() {
        const select = document.getElementById('price-track-product');
        if (!select) return;

        const products = await ProductsDB.getAll();
        select.innerHTML = products.map(p =>
            `<option value="${p.id}">${p.name} (${p.category})</option>`
        ).join('');
    },

    /* ===== Render all stats ===== */
    async renderAll(year, month) {
        await Promise.all([
            this.renderMonthlyChart(),
            this.renderCategoryChart(year, month),
            this.renderTopProductsChart(year, month),
            this.renderEstimateVsRealChart(year, month),
            this.renderHistoryTable(),
            this.populatePriceTrackSelector()
        ]);
        await this.renderPriceEvolutionChart([]);
    }
};
