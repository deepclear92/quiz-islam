/* ===== RECEIPT SCANNER MODULE ===== */

const ReceiptScanner = {
    worker: null,
    isProcessing: false,

    /* Parse OCR text to extract product lines with prices */
    parseReceiptText(text) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
        const items = [];

        // Common receipt patterns:
        // "PRODUCT NAME    1,99"  or  "PRODUCT NAME    1.99 €"  or "1 x PRODUCT  3,50"
        const pricePattern = /(\d+[.,]\d{2})\s*(?:€|EUR|e)?$/;
        const qtyPricePattern = /^(\d+)\s*[xX]\s+(.+?)\s+(\d+[.,]\d{2})/;
        const lineItemPattern = /^(.+?)\s{2,}(\d+[.,]\d{2})\s*(?:€|EUR|e)?$/;

        for (const line of lines) {
            // Skip typical receipt headers/footers
            if (this.isNonProductLine(line)) continue;

            let match;

            // Try "QTY x PRODUCT PRICE" pattern
            match = line.match(qtyPricePattern);
            if (match) {
                items.push({
                    rawText: line,
                    name: this.cleanProductName(match[2]),
                    price: this.parsePrice(match[3]),
                    quantity: parseInt(match[1])
                });
                continue;
            }

            // Try "PRODUCT    PRICE" pattern
            match = line.match(lineItemPattern);
            if (match) {
                items.push({
                    rawText: line,
                    name: this.cleanProductName(match[1]),
                    price: this.parsePrice(match[2]),
                    quantity: 1
                });
                continue;
            }

            // Try any line ending with a price
            match = line.match(pricePattern);
            if (match) {
                const pricePart = match[1];
                const namePart = line.substring(0, line.lastIndexOf(pricePart)).trim();
                if (namePart.length > 1) {
                    items.push({
                        rawText: line,
                        name: this.cleanProductName(namePart),
                        price: this.parsePrice(pricePart),
                        quantity: 1
                    });
                }
            }
        }

        return items;
    },

    isNonProductLine(line) {
        const skipPatterns = [
            /^(TOTAL|SOUS.?TOTAL|TVA|CB|CARTE|ESPECE|RENDU|MONNAIE|MERCI|TICKET|CAISSE)/i,
            /^(DATE|HEURE|N°|NO\.|FACTURE|RECU|BON)/i,
            /^\*+$/,
            /^-+$/,
            /^=+$/,
            /^\d{2}[\/.-]\d{2}[\/.-]\d{2,4}/,
            /^TEL|^FAX|^SIRET|^APE|^TVA\s*:/i,
            /^(MAGASIN|SUPERMARCHE|CARREFOUR|LECLERC|AUCHAN|LIDL|INTERMARCHE|CASINO)/i
        ];
        return skipPatterns.some(p => p.test(line));
    },

    cleanProductName(name) {
        return name
            .replace(/[*#@]+/g, '')
            .replace(/\s+/g, ' ')
            .replace(/^\d+\s*[xX]\s*/, '')
            .trim();
    },

    parsePrice(priceStr) {
        return parseFloat(priceStr.replace(',', '.'));
    },

    /* Match scanned items to existing products using fuzzy matching */
    async matchToProducts(scannedItems) {
        const products = await ProductsDB.getAll();
        const matched = [];

        for (const item of scannedItems) {
            const bestMatch = this.findBestMatch(item.name, products);
            matched.push({
                ...item,
                matchedProduct: bestMatch ? bestMatch.product : null,
                matchScore: bestMatch ? bestMatch.score : 0,
                productId: bestMatch ? bestMatch.product.id : null
            });
        }

        return matched;
    },

    findBestMatch(scannedName, products) {
        const scannedLower = scannedName.toLowerCase();
        let bestScore = 0;
        let bestProduct = null;

        for (const product of products) {
            const prodLower = product.name.toLowerCase();
            const score = this.similarityScore(scannedLower, prodLower);

            if (score > bestScore && score > 0.3) {
                bestScore = score;
                bestProduct = product;
            }
        }

        return bestProduct ? { product: bestProduct, score: bestScore } : null;
    },

    /* Simple similarity based on common words */
    similarityScore(a, b) {
        const wordsA = a.split(/\s+/).filter(w => w.length > 2);
        const wordsB = b.split(/\s+/).filter(w => w.length > 2);

        if (wordsA.length === 0 || wordsB.length === 0) return 0;

        let matches = 0;
        for (const wa of wordsA) {
            for (const wb of wordsB) {
                if (wb.includes(wa) || wa.includes(wb)) {
                    matches++;
                    break;
                }
            }
        }

        return matches / Math.max(wordsA.length, wordsB.length);
    },

    /* Process image with Tesseract.js OCR */
    async processImage(imageSource, onProgress) {
        this.isProcessing = true;

        try {
            const result = await Tesseract.recognize(imageSource, 'fra', {
                logger: m => {
                    if (m.status === 'recognizing text' && onProgress) {
                        onProgress(Math.round(m.progress * 100));
                    }
                }
            });

            const text = result.data.text;
            const scannedItems = this.parseReceiptText(text);
            const matchedItems = await this.matchToProducts(scannedItems);

            this.isProcessing = false;
            return {
                rawText: text,
                items: matchedItems,
                confidence: result.data.confidence
            };
        } catch (error) {
            this.isProcessing = false;
            throw error;
        }
    },

    /* Sync scanned items into a shopping list */
    async syncWithList(listId, matchedItems) {
        const listItems = await ListItemsDB.getForList(listId);
        let synced = 0;

        for (const scanned of matchedItems) {
            if (!scanned.productId) continue;

            // Find matching item in the list
            const existing = listItems.find(li => li.productId === scanned.productId);
            if (existing) {
                // Update real price
                await ListItemsDB.update(existing.id, {
                    realPrice: scanned.price,
                    checked: true
                });

                // Add to price history
                await PriceHistoryDB.add(scanned.productId, scanned.price, 'receipt');
                synced++;
            }
        }

        return synced;
    }
};
