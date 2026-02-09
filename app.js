// === STATE ===
let players = [];
let currentPlayerIndex = 0;
let currentCategory = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let scores = {};
let questionAnswered = false;

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    loadImportedData();
    loadPlayers();
    loadScores();
    renderPlayers();
    renderCategories();
    renderAvailableCategories();
    renderImportedInfo();
    setupDragDrop();
});

// === SCREEN NAVIGATION ===
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'scores-screen') renderScores();
    if (screenId === 'category-screen') renderCategories();
}

// === PLAYER MANAGEMENT ===
function addPlayer() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();
    if (!name || players.length >= 6) return;
    if (players.includes(name)) return;
    players.push(name);
    input.value = '';
    savePlayers();
    renderPlayers();
}

function removePlayer(index) {
    players.splice(index, 1);
    savePlayers();
    renderPlayers();
}

function renderPlayers() {
    const list = document.getElementById('players-list');
    if (players.length === 0) {
        list.innerHTML = '<p style="color:#999;font-size:0.9rem;">Ajoute des joueurs pour jouer en famille !</p>';
        return;
    }
    list.innerHTML = players.map((p, i) =>
        `<span class="player-tag">
            ${p}
            <span class="remove-player" onclick="removePlayer(${i})">&times;</span>
        </span>`
    ).join('');
}

function savePlayers() {
    localStorage.setItem('quizIslam_players', JSON.stringify(players));
}

function loadPlayers() {
    const saved = localStorage.getItem('quizIslam_players');
    if (saved) players = JSON.parse(saved);
}

// === CATEGORIES ===
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    for (const [key, cat] of Object.entries(CATEGORIES)) {
        const count = (allQuestions[key] || []).length;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => startQuiz(key);
        card.innerHTML = `
            <span class="cat-icon">${cat.icon}</span>
            <div class="cat-name">${cat.name}</div>
            <div class="cat-count">${count} question${count > 1 ? 's' : ''}</div>
        `;
        grid.appendChild(card);
    }
    // Ajouter carte "Toutes les catégories"
    const totalCount = Object.values(allQuestions).reduce((sum, q) => sum + q.length, 0);
    const allCard = document.createElement('div');
    allCard.className = 'category-card';
    allCard.style.border = '3px solid var(--gold)';
    allCard.onclick = () => startQuiz('all');
    allCard.innerHTML = `
        <span class="cat-icon">\u{1F31F}</span>
        <div class="cat-name">Toutes les cat\u00e9gories</div>
        <div class="cat-count">${totalCount} questions</div>
    `;
    grid.appendChild(allCard);
}

// === QUIZ ENGINE ===
function startQuiz(categoryKey) {
    currentCategory = categoryKey;
    currentQuestionIndex = 0;
    questionAnswered = false;

    if (categoryKey === 'all') {
        currentQuestions = [];
        for (const q of Object.values(allQuestions)) {
            currentQuestions.push(...q);
        }
    } else {
        currentQuestions = [...(allQuestions[categoryKey] || [])];
    }

    // Mélanger les questions
    shuffleArray(currentQuestions);

    // Limiter à 15 questions max pour garder le jeu fun
    if (currentQuestions.length > 15) {
        currentQuestions = currentQuestions.slice(0, 15);
    }

    if (currentQuestions.length === 0) {
        alert('Aucune question dans cette cat\u00e9gorie !');
        return;
    }

    // Init scores pour cette partie
    if (players.length > 0) {
        currentPlayerIndex = 0;
    }
    scores = {};
    players.forEach(p => scores[p] = 0);
    if (players.length === 0) scores['Joueur'] = 0;

    const catName = categoryKey === 'all' ? 'Toutes les cat\u00e9gories' : CATEGORIES[categoryKey].name;
    document.getElementById('quiz-category-name').textContent = catName;

    showScreen('quiz-screen');
    showQuestion();
}

function showQuestion() {
    questionAnswered = false;
    const q = currentQuestions[currentQuestionIndex];
    const total = currentQuestions.length;

    document.getElementById('quiz-counter').textContent =
        `Question ${currentQuestionIndex + 1}/${total}`;

    // Barre de progression
    const pct = ((currentQuestionIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';

    // Afficher le joueur actuel
    updateScoreDisplay();

    // Image / Emoji
    const imgDiv = document.getElementById('question-image');
    if (q.image) {
        if (q.image.startsWith('http')) {
            imgDiv.innerHTML = `<img src="${q.image}" alt="" style="max-width:120px;max-height:120px;border-radius:12px;">`;
        } else {
            imgDiv.innerHTML = q.image;
        }
    } else {
        imgDiv.innerHTML = '\u2753';
    }

    // Question
    document.getElementById('question-text').textContent = q.question;

    // Réponses mélangées (garder le suivi du correct)
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    const answerIndices = q.answers.map((a, i) => i);
    shuffleArray(answerIndices);

    answerIndices.forEach((origIndex, displayIndex) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `
            <span class="answer-letter">${letters[displayIndex]}</span>
            <span>${q.answers[origIndex]}</span>
        `;
        btn.onclick = () => selectAnswer(btn, origIndex, q.correct);
        answersContainer.appendChild(btn);
    });

    // Cacher l'explication
    document.getElementById('explanation-box').classList.add('hidden');
}

function selectAnswer(btn, selectedIndex, correctIndex) {
    if (questionAnswered) return;
    questionAnswered = true;

    const allBtns = document.querySelectorAll('.answer-btn');
    const isCorrect = selectedIndex === correctIndex;
    const q = currentQuestions[currentQuestionIndex];

    // Marquer les réponses
    allBtns.forEach(b => {
        b.classList.add('disabled');
    });

    // Trouver et marquer la bonne réponse
    allBtns.forEach(b => {
        const answerText = b.querySelector('span:last-child').textContent;
        if (answerText === q.answers[correctIndex]) {
            b.classList.add('correct');
        }
    });

    if (!isCorrect) {
        btn.classList.add('wrong');
    }

    // Score
    const currentPlayer = players.length > 0 ? players[currentPlayerIndex] : 'Joueur';
    if (isCorrect) {
        scores[currentPlayer] = (scores[currentPlayer] || 0) + 1;
    }

    updateScoreDisplay();

    // Explication
    const expBox = document.getElementById('explanation-box');
    const expIcon = document.getElementById('explanation-icon');
    const expText = document.getElementById('explanation-text');

    expIcon.textContent = isCorrect ? '\u2705' : '\u274C';
    expText.textContent = (isCorrect ? 'Bravo ! ' : 'Pas tout \u00e0 fait... ') + q.explanation;
    expBox.classList.remove('hidden');
    expBox.style.borderLeftColor = isCorrect ? 'var(--correct)' : 'var(--wrong)';

    // Passer au joueur suivant (mode multi)
    if (players.length > 1) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
}

function updateScoreDisplay() {
    const display = document.getElementById('quiz-score-display');
    if (players.length <= 1) {
        const name = players.length === 1 ? players[0] : 'Joueur';
        display.textContent = `${name} : ${scores[name] || 0} pts`;
    } else {
        const current = players[currentPlayerIndex];
        display.innerHTML = players.map(p =>
            `<span style="${p === current ? 'text-decoration:underline;' : ''}">${p}: ${scores[p] || 0}</span>`
        ).join(' | ');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    document.getElementById('progress-fill').style.width = '100%';

    const total = currentQuestions.length;
    const content = document.getElementById('results-content');

    let html = '';

    if (players.length <= 1) {
        const name = players.length === 1 ? players[0] : 'Joueur';
        const score = scores[name] || 0;
        const pct = Math.round((score / total) * 100);
        let emoji, message;

        if (pct === 100) { emoji = '\u{1F3C6}'; message = 'Parfait ! MachAllah !'; }
        else if (pct >= 80) { emoji = '\u{1F31F}'; message = 'Excellent ! BarakAllahou fik !'; }
        else if (pct >= 60) { emoji = '\u{1F44D}'; message = 'Bien jou\u00e9 ! Continue d\'apprendre !'; }
        else if (pct >= 40) { emoji = '\u{1F4AA}'; message = 'Pas mal ! R\u00e9vise encore un peu !'; }
        else { emoji = '\u{1F4DA}'; message = 'Continue d\'apprendre, tu vas progresser !'; }

        html = `
            <div class="results-emoji">${emoji}</div>
            <div class="results-score">${score}/${total} (${pct}%)</div>
            <div class="results-message">${message}</div>
        `;

        saveScore(name, score, total);
    } else {
        // Multi-joueur : classement
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const medals = ['\u{1F947}', '\u{1F948}', '\u{1F949}'];

        html = `<div class="results-emoji">\u{1F3C6}</div><h2>R\u00e9sultats</h2><br>`;
        sorted.forEach(([name, score], i) => {
            const medal = medals[i] || '';
            html += `<div class="score-entry">
                <span class="score-name">${medal} ${name}</span>
                <span class="score-value">${score}/${total}</span>
            </div>`;
            saveScore(name, score, total);
        });

        const winner = sorted[0][0];
        html += `<br><div class="results-message">Bravo ${winner} ! MachAllah !</div>`;
    }

    html += `
        <div class="results-buttons">
            <button class="btn btn-primary" onclick="startQuiz('${currentCategory}')">
                \u{1F504} Rejouer cette cat\u00e9gorie
            </button>
            <button class="btn btn-secondary" onclick="showScreen('category-screen')">
                \u{1F4DA} Choisir une autre cat\u00e9gorie
            </button>
            <button class="btn btn-info" onclick="showScreen('home-screen')">
                \u{1F3E0} Accueil
            </button>
        </div>
    `;

    content.innerHTML = html;
    showScreen('results-screen');
}

function confirmQuit() {
    if (confirm('Voulez-vous vraiment quitter le quiz ?')) {
        showScreen('category-screen');
    }
}

// === SCORES ===
function saveScore(name, score, total) {
    const allScores = JSON.parse(localStorage.getItem('quizIslam_scores') || '[]');
    allScores.push({
        name,
        score,
        total,
        category: currentCategory === 'all' ? 'Toutes' : (CATEGORIES[currentCategory]?.name || currentCategory),
        date: new Date().toLocaleDateString('fr-FR')
    });
    // Garder les 50 derniers
    if (allScores.length > 50) allScores.splice(0, allScores.length - 50);
    localStorage.setItem('quizIslam_scores', JSON.stringify(allScores));
}

function loadScores() {
    return JSON.parse(localStorage.getItem('quizIslam_scores') || '[]');
}

function renderScores() {
    const allScores = loadScores();
    const content = document.getElementById('scores-content');

    if (allScores.length === 0) {
        content.innerHTML = '<p style="text-align:center;padding:20px;color:#999;">Aucun score enregistr\u00e9. Jouez pour voir vos r\u00e9sultats !</p>';
        return;
    }

    content.innerHTML = allScores.reverse().map(s =>
        `<div class="score-entry">
            <div>
                <span class="score-name">${s.name}</span>
                <br><span class="score-date">${s.category} - ${s.date}</span>
            </div>
            <span class="score-value">${s.score}/${s.total}</span>
        </div>`
    ).join('');
}

function clearScores() {
    if (confirm('Effacer tous les scores ?')) {
        localStorage.removeItem('quizIslam_scores');
        renderScores();
    }
}

// === EXCEL IMPORT ===
function renderAvailableCategories() {
    const container = document.getElementById('available-categories');
    container.innerHTML = Object.entries(CATEGORIES).map(([key, cat]) =>
        `<span>${key} (${cat.name})</span>`
    ).join('');
}

function setupDragDrop() {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    });
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (file) processFile(file);
}

function processFile(file) {
    const resultDiv = document.getElementById('import-result');
    resultDiv.classList.remove('hidden', 'import-success', 'import-error');

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);

            if (rows.length === 0) {
                resultDiv.classList.add('import-error');
                resultDiv.innerHTML = '\u274C Le fichier est vide.';
                return;
            }

            let imported = 0;
            let errors = [];

            let newCategories = [];

            rows.forEach((row, i) => {
                const cat = (row.categorie || '').toString().trim().toLowerCase().replace(/\s+/g, '_');
                const question = (row.question || '').toString().trim();
                const r1 = (row.reponse1 || '').toString().trim();
                const r2 = (row.reponse2 || '').toString().trim();
                const r3 = (row.reponse3 || '').toString().trim();
                const r4 = (row.reponse4 || '').toString().trim();
                const correct = parseInt(row.bonne_reponse) - 1;
                const explanation = (row.explication || '').toString().trim();
                const image = (row.image || '').toString().trim();

                // Validation minimale : catégorie, question, au moins 2 réponses, bonne_reponse
                if (!cat || !question) {
                    errors.push(`Ligne ${i + 2}: cat\u00e9gorie ou question manquante`);
                    return;
                }

                // Construire le tableau de réponses (2 minimum)
                const answers = [];
                if (r1) answers.push(r1);
                if (r2) answers.push(r2);
                if (r3) answers.push(r3);
                if (r4) answers.push(r4);

                if (answers.length < 2) {
                    errors.push(`Ligne ${i + 2}: il faut au moins 2 r\u00e9ponses`);
                    return;
                }

                if (isNaN(correct) || correct < 0 || correct >= answers.length) {
                    errors.push(`Ligne ${i + 2}: bonne_reponse invalide (doit \u00eatre entre 1 et ${answers.length})`);
                    return;
                }

                // Créer dynamiquement la catégorie si elle n'existe pas
                if (!CATEGORIES[cat]) {
                    const catName = (row.categorie || cat).toString().trim();
                    const icons = ['\u{1F4DA}', '\u{1F31F}', '\u{1F4D6}', '\u2728', '\u{1F30D}', '\u{1F54C}', '\u{1F4DC}', '\u{1F3C6}'];
                    const colors = ['#3498db', '#e67e22', '#9b59b6', '#1abc9c', '#e74c3c', '#2ecc71', '#f39c12', '#607d8b'];
                    const idx = Object.keys(CATEGORIES).length;
                    CATEGORIES[cat] = {
                        name: catName.charAt(0).toUpperCase() + catName.slice(1),
                        icon: icons[idx % icons.length],
                        color: colors[idx % colors.length]
                    };
                    newCategories.push(CATEGORIES[cat].name);
                }

                // Vérifier doublon
                if (!allQuestions[cat]) allQuestions[cat] = [];
                const exists = allQuestions[cat].some(q => q.question === question);
                if (exists) {
                    errors.push(`Ligne ${i + 2}: question d\u00e9j\u00e0 existante (ignor\u00e9e)`);
                    return;
                }

                allQuestions[cat].push({
                    question,
                    answers,
                    correct,
                    explanation: explanation || 'Pas d\'explication fournie.',
                    image: image || '\u2753'
                });
                imported++;
            });

            resultDiv.classList.add('import-success');
            let html = `<h3>\u2705 Import termin\u00e9</h3>
                <p><strong>${imported}</strong> question(s) charg\u00e9e(s) en m\u00e9moire avec succ\u00e8s !</p>`;

            if (newCategories.length > 0) {
                html += `<p style="color:var(--primary);font-weight:600;">\u{1F195} ${newCategories.length} nouvelle(s) cat\u00e9gorie(s) cr\u00e9\u00e9e(s) : ${newCategories.join(', ')}</p>`;
            }

            if (errors.length > 0) {
                html += `<p style="color:var(--wrong);">${errors.length} avertissement(s) :</p>
                    <ul style="text-align:left;font-size:0.85rem;">
                        ${errors.map(e => `<li>${e}</li>`).join('')}
                    </ul>`;
            }

            html += `<div style="background:#fff8e1;border-radius:8px;padding:12px;margin-top:12px;">
                <p style="font-weight:600;">\u{1F4BE} Pour conserver ces questions :</p>
                <p style="font-size:0.9rem;">Cliquez sur <strong>\"Sauvegarder fichier JS\"</strong> ci-dessous, puis placez le fichier <code>imported_questions.js</code> t\u00e9l\u00e9charg\u00e9 dans le dossier du quiz (en rempla\u00e7ant l'ancien). Les questions seront disponibles sur tous les navigateurs.</p>
            </div>`;

            resultDiv.innerHTML = html;
            renderCategories();
            renderAvailableCategories();
            renderImportedInfo();

        } catch (err) {
            resultDiv.classList.add('import-error');
            resultDiv.innerHTML = `\u274C Erreur de lecture : ${err.message}`;
        }
    };

    reader.readAsArrayBuffer(file);
}

function downloadTemplate() {
    const templateData = [
        {
            categorie: 'purification',
            question: 'Exemple avec 4 r\u00e9ponses ?',
            reponse1: 'R\u00e9ponse A',
            reponse2: 'R\u00e9ponse B',
            reponse3: 'R\u00e9ponse C',
            reponse4: 'R\u00e9ponse D',
            bonne_reponse: 2,
            explication: 'Explication simple ici',
            image: '\u{1F4A7}'
        },
        {
            categorie: 'priere',
            question: 'Exemple avec 3 r\u00e9ponses ?',
            reponse1: 'Choix 1',
            reponse2: 'Choix 2',
            reponse3: 'Choix 3',
            reponse4: '',
            bonne_reponse: 1,
            explication: 'Explication ici',
            image: '\u{1F54C}'
        },
        {
            categorie: 'Ma nouvelle cat\u00e9gorie',
            question: 'Exemple avec 2 r\u00e9ponses (vrai/faux) ?',
            reponse1: 'Vrai',
            reponse2: 'Faux',
            reponse3: '',
            reponse4: '',
            bonne_reponse: 1,
            explication: 'Cat\u00e9gorie cr\u00e9\u00e9e automatiquement !',
            image: ''
        }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questions');

    // Ajuster la largeur des colonnes
    ws['!cols'] = [
        { width: 15 }, { width: 40 }, { width: 20 },
        { width: 20 }, { width: 20 }, { width: 20 },
        { width: 15 }, { width: 40 }, { width: 10 }
    ];

    XLSX.writeFile(wb, 'modele_quiz_islam.xlsx');
}

// === PERSISTENCE DES IMPORTS (fichier imported_questions.js) ===

// Liste des catégories de base (celles de questions.js)
const BASE_CATEGORIES = [
    'purification','priere','jeune','pelerinage','sacrifice',
    'alimentaire','noms_divins','attributs_dieu','messagers',
    'anges','livres','jugement','peches_langue','respect',
    'comportement','figures_islam','prophetes'
];

function loadImportedData() {
    // Snapshot du nombre de questions d'origine AVANT merge
    window._originalQuestionCounts = {};
    for (const [cat, questions] of Object.entries(allQuestions)) {
        window._originalQuestionCounts[cat] = questions.length;
    }

    // Charger depuis imported_questions.js (déjà chargé via <script>)
    if (typeof IMPORTED_CATEGORIES !== 'undefined') {
        for (const [key, val] of Object.entries(IMPORTED_CATEGORIES)) {
            if (!CATEGORIES[key]) {
                CATEGORIES[key] = val;
            }
        }
    }

    if (typeof IMPORTED_QUESTIONS !== 'undefined') {
        for (const [cat, questions] of Object.entries(IMPORTED_QUESTIONS)) {
            if (!allQuestions[cat]) allQuestions[cat] = [];
            questions.forEach(q => {
                const exists = allQuestions[cat].some(existing => existing.question === q.question);
                if (!exists) {
                    allQuestions[cat].push(q);
                }
            });
        }
    }
}

function buildImportedSnapshot() {
    // Construit l'objet des questions importées et catégories custom actuelles
    const customCategories = {};
    for (const [key, val] of Object.entries(CATEGORIES)) {
        if (!BASE_CATEGORIES.includes(key)) {
            customCategories[key] = val;
        }
    }

    const importedQuestions = {};
    for (const [cat, questions] of Object.entries(allQuestions)) {
        if (!BASE_CATEGORIES.includes(cat)) {
            // Catégorie entièrement custom
            importedQuestions[cat] = questions;
        } else {
            // Catégorie de base : ne garder que les questions ajoutées
            const originalCount = (window._originalQuestionCounts && window._originalQuestionCounts[cat]) || 0;
            if (questions.length > originalCount) {
                importedQuestions[cat] = questions.slice(originalCount);
            }
        }
    }

    return { customCategories, importedQuestions };
}

function generateImportedFileContent() {
    const { customCategories, importedQuestions } = buildImportedSnapshot();
    const content = `// === QUESTIONS & CATEGORIES IMPORTEES ===
// Ce fichier est g\u00e9n\u00e9r\u00e9 automatiquement par l'import Excel.
// Derni\u00e8re mise \u00e0 jour : ${new Date().toLocaleString('fr-FR')}
// Ne pas modifier manuellement.

var IMPORTED_CATEGORIES = ${JSON.stringify(customCategories, null, 2)};

var IMPORTED_QUESTIONS = ${JSON.stringify(importedQuestions, null, 2)};
`;
    return content;
}

function saveImportedData() {
    // Générer le fichier et le télécharger automatiquement
    const content = generateImportedFileContent();
    const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imported_questions.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportImportedAsExcel() {
    const { customCategories, importedQuestions } = buildImportedSnapshot();
    const rows = [];

    for (const [cat, questions] of Object.entries(importedQuestions)) {
        const catName = CATEGORIES[cat] ? CATEGORIES[cat].name : cat;
        questions.forEach(q => {
            rows.push({
                categorie: catName,
                question: q.question,
                reponse1: q.answers[0] || '',
                reponse2: q.answers[1] || '',
                reponse3: q.answers[2] || '',
                reponse4: q.answers[3] || '',
                bonne_reponse: q.correct + 1,
                explication: q.explanation || '',
                image: q.image || ''
            });
        });
    }

    if (rows.length === 0) {
        alert('Aucune question import\u00e9e \u00e0 exporter.');
        return;
    }

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questions');
    ws['!cols'] = [
        { width: 20 }, { width: 50 }, { width: 25 },
        { width: 25 }, { width: 25 }, { width: 25 },
        { width: 15 }, { width: 50 }, { width: 10 }
    ];
    XLSX.writeFile(wb, 'mes_questions_importees.xlsx');
}

function getImportedStats() {
    let totalQ = 0;
    let totalCats = 0;

    if (typeof IMPORTED_QUESTIONS !== 'undefined') {
        for (const questions of Object.values(IMPORTED_QUESTIONS)) {
            totalQ += questions.length;
        }
    }
    // Aussi compter les questions importées en mémoire pas encore sauvées
    const { importedQuestions, customCategories } = buildImportedSnapshot();
    let memQ = 0;
    for (const questions of Object.values(importedQuestions)) {
        memQ += questions.length;
    }
    totalCats = Object.keys(customCategories).length;

    return { questions: Math.max(totalQ, memQ), categories: totalCats };
}

function renderImportedInfo() {
    const container = document.getElementById('import-stored-info');
    if (!container) return;
    const stats = getImportedStats();
    if (stats.questions === 0) {
        container.classList.add('empty');
        container.innerHTML = '';
        return;
    }
    container.classList.remove('empty');
    container.innerHTML = `
        <div>
            <p>\u{1F4BE} <strong>${stats.questions}</strong> question(s) import\u00e9e(s)${stats.categories > 0 ? ` + <strong>${stats.categories}</strong> cat\u00e9gorie(s) personnalis\u00e9e(s)` : ''}</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-small" onclick="saveImportedData()" title="T\u00e9l\u00e9charger le fichier imported_questions.js">\u{1F4BE} Sauvegarder fichier JS</button>
            <button class="btn btn-small" style="background:var(--gold);color:#333;" onclick="exportImportedAsExcel()" title="Exporter en Excel">\u{1F4E5} Exporter Excel</button>
            <button class="btn btn-small" style="background:var(--wrong);" onclick="clearImportedData()">\u{1F5D1}\uFE0F R\u00e9initialiser</button>
        </div>
    `;
}

function clearImportedData() {
    if (!confirm('Supprimer toutes les questions import\u00e9es ?\n\nLes questions d\'origine seront conserv\u00e9es.\nUn fichier imported_questions.js vide sera t\u00e9l\u00e9charg\u00e9.')) return;

    // Vider les globales
    if (typeof IMPORTED_CATEGORIES !== 'undefined') {
        for (const key of Object.keys(IMPORTED_CATEGORIES)) delete IMPORTED_CATEGORIES[key];
    }
    if (typeof IMPORTED_QUESTIONS !== 'undefined') {
        for (const key of Object.keys(IMPORTED_QUESTIONS)) delete IMPORTED_QUESTIONS[key];
    }

    // Télécharger un fichier vide
    const content = `// === QUESTIONS & CATEGORIES IMPORTEES ===\n// Ce fichier est g\u00e9n\u00e9r\u00e9 automatiquement par l'import Excel.\n// Ne pas modifier manuellement.\n\nvar IMPORTED_CATEGORIES = {};\nvar IMPORTED_QUESTIONS = {};\n`;
    const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imported_questions.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Fichier t\u00e9l\u00e9charg\u00e9 ! Placez-le dans le dossier du quiz puis rechargez la page.');
    location.reload();
}

// === UTILS ===
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Enter pour ajouter un joueur
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.id === 'player-name-input') {
        addPlayer();
    }
});
