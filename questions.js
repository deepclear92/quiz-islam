// === CATEGORIES ===
const CATEGORIES = {
    purification: { name: "Purification", icon: "\u{1F4A7}", color: "#3498db" },
    priere: { name: "Pri\u00e8re (Salat)", icon: "\u{1F54C}", color: "#1a7a4c" },
    jeune: { name: "Je\u00fbne (Siyam)", icon: "\u{1F319}", color: "#8e44ad" },
    pelerinage: { name: "P\u00e8lerinage (Hajj)", icon: "\u{1F54B}", color: "#e67e22" },
    sacrifice: { name: "Sacrifice", icon: "\u{1F411}", color: "#c0392b" },
    alimentaire: { name: "Interdits alimentaires", icon: "\u{1F357}", color: "#d35400" },
    noms_divins: { name: "Noms divins (Acharite)", icon: "\u2728", color: "#f39c12" },
    attributs_dieu: { name: "Attributs de Dieu", icon: "\u{1F31F}", color: "#2980b9" },
    messagers: { name: "Les Messagers", icon: "\u{1F4DC}", color: "#16a085" },
    anges: { name: "Les Anges", icon: "\u{1F31F}", color: "#9b59b6" },
    livres: { name: "Livres sacr\u00e9s", icon: "\u{1F4D6}", color: "#1abc9c" },
    jugement: { name: "Jour du Jugement", icon: "\u2696\uFE0F", color: "#34495e" },
    peches_langue: { name: "P\u00e9ch\u00e9s de la langue", icon: "\u{1F5E3}\uFE0F", color: "#e74c3c" },
    respect: { name: "Respect & Famille", icon: "\u2764\uFE0F", color: "#e91e63" },
    comportement: { name: "Bon comportement", icon: "\u{1F31E}", color: "#ff9800" },
    figures_islam: { name: "Figures de l'Islam", icon: "\u{1F451}", color: "#795548" },
    prophetes: { name: "Les Proph\u00e8tes", icon: "\u{1F30D}", color: "#607d8b" }
};

// === QUESTIONS ===
let allQuestions = {

// ========== PURIFICATION ==========
purification: [
    {
        question: "Avec quoi fait-on les ablutions (woudou) ?",
        answers: ["Avec du lait", "Avec de l'eau pure", "Avec du jus", "Avec du th\u00e9"],
        correct: 1,
        explanation: "Les ablutions se font avec de l'eau pure (tahour). C'est une condition indispensable pour que les ablutions soient valides selon le rite malikite.",
        image: "\u{1F4A7}"
    },
    {
        question: "Combien de fois faut-il se laver les mains au d\u00e9but des ablutions ?",
        answers: ["1 fois", "2 fois", "3 fois", "4 fois"],
        correct: 2,
        explanation: "Selon le rite malikite, il est recommand\u00e9 (sunna) de se laver les mains 3 fois au d\u00e9but des ablutions.",
        image: "\u{1F590}\uFE0F"
    },
    {
        question: "Quel est le premier geste obligatoire des ablutions dans le rite malikite ?",
        answers: ["Se laver les pieds", "Se laver le visage", "L'intention (niyya)", "Se laver les oreilles"],
        correct: 2,
        explanation: "L'intention (niyya) est un acte du c\u0153ur. Selon l'imam Malik, le premier geste physique obligatoire est le lavage du visage.",
        image: "\u{1F600}"
    },
    {
        question: "Que doit-on faire si on ne trouve pas d'eau pour les ablutions ?",
        answers: ["On ne prie pas", "On fait le tayammum (ablutions s\u00e8ches)", "On attend le lendemain", "On se lave avec du savon"],
        correct: 1,
        explanation: "Le tayammum (ablutions s\u00e8ches avec de la terre pure) est permis quand on ne trouve pas d'eau ou qu'on est malade. Allah a facilit\u00e9 la religion !",
        image: "\u{1F3DC}\uFE0F"
    },
    {
        question: "Qu'est-ce qui annule les ablutions ?",
        answers: ["Boire de l'eau", "Manger du pain", "Aller aux toilettes", "Se peigner les cheveux"],
        correct: 2,
        explanation: "Parmi les choses qui annulent les ablutions : aller aux toilettes, le sommeil profond, et la perte de connaissance.",
        image: "\u{1F6BB}"
    },
    {
        question: "Dans les ablutions malikites, faut-il passer les mains mouill\u00e9es sur toute la t\u00eate ?",
        answers: ["Oui, c'est obligatoire", "Non, juste le devant", "Non, juste le dessus", "Ce n'est pas n\u00e9cessaire"],
        correct: 0,
        explanation: "Dans le rite malikite, il est obligatoire de passer les mains mouill\u00e9es sur toute la t\u00eate, d'avant en arri\u00e8re puis d'arri\u00e8re en avant.",
        image: "\u{1F9D2}"
    },
    {
        question: "Le ghousl (grande ablution) est obligatoire apr\u00e8s quoi ?",
        answers: ["Apr\u00e8s chaque pri\u00e8re", "Apr\u00e8s les r\u00e8gles et la janaba", "Apr\u00e8s chaque repas", "Apr\u00e8s le sport"],
        correct: 1,
        explanation: "Le ghousl (bain rituel) est obligatoire apr\u00e8s l'\u00e9tat de grande impuret\u00e9 (janaba), apr\u00e8s les r\u00e8gles et apr\u00e8s l'accouchement.",
        image: "\u{1F6BF}"
    },
    {
        question: "Combien y a-t-il d'obligations (fara\u00ef'd) dans les ablutions selon le rite malikite ?",
        answers: ["4", "6", "7", "5"],
        correct: 2,
        explanation: "Selon le rite malikite, il y a 7 obligations : l'intention, le lavage du visage, le lavage des mains jusqu'aux coudes, le passage sur la t\u00eate, le lavage des pieds, l'ordre (tartib) et l'encha\u00eenement (mouwalat).",
        image: "\u{1F522}"
    }
],

// ========== PRIERE ==========
priere: [
    {
        question: "Combien de pri\u00e8res obligatoires le musulman doit-il faire chaque jour ?",
        answers: ["3", "4", "5", "7"],
        correct: 2,
        explanation: "Le musulman doit accomplir 5 pri\u00e8res par jour : Sobh (l'aube), Dhohr (midi), Asr (apr\u00e8s-midi), Maghrib (coucher du soleil) et Icha (la nuit).",
        image: "\u{1F54C}"
    },
    {
        question: "Que dit-on pour commencer la pri\u00e8re ?",
        answers: ["Bismillah", "Allahou Akbar", "Salam Alaykoum", "Alhamdoulillah"],
        correct: 1,
        explanation: "On commence la pri\u00e8re par le takbir : dire 'Allahou Akbar' (Dieu est le plus Grand) en levant les mains, c'est le takbirat al-ihram.",
        image: "\u{1F64C}"
    },
    {
        question: "Combien de rak'at (unit\u00e9s) contient la pri\u00e8re du Sobh (l'aube) ?",
        answers: ["2 rak'at", "3 rak'at", "4 rak'at", "1 rak'a"],
        correct: 0,
        explanation: "La pri\u00e8re du Sobh (Fajr) contient 2 rak'at. C'est la plus courte des pri\u00e8res obligatoires.",
        image: "\u{1F305}"
    },
    {
        question: "Quelle sourate doit-on r\u00e9citer dans chaque rak'a de la pri\u00e8re ?",
        answers: ["Sourate Al-Ikhlas", "Sourate Al-Fatiha", "Sourate Al-Falaq", "Sourate An-Nas"],
        correct: 1,
        explanation: "La r\u00e9citation de la Fatiha est obligatoire dans chaque rak'a de la pri\u00e8re. Le Proph\u00e8te (paix sur lui) a dit : 'Pas de pri\u00e8re sans la Fatiha.'",
        image: "\u{1F4D6}"
    },
    {
        question: "Combien de rak'at contient la pri\u00e8re du Maghrib ?",
        answers: ["2 rak'at", "3 rak'at", "4 rak'at", "1 rak'a"],
        correct: 1,
        explanation: "La pri\u00e8re du Maghrib (coucher du soleil) contient 3 rak'at. C'est la seule pri\u00e8re obligatoire avec un nombre impair.",
        image: "\u{1F307}"
    },
    {
        question: "Vers quelle direction se tournent les musulmans pour prier ?",
        answers: ["Vers J\u00e9rusalem", "Vers La Mecque (Qibla)", "Vers M\u00e9dine", "Vers le nord"],
        correct: 1,
        explanation: "Les musulmans se tournent vers la Kaaba \u00e0 La Mecque. Cette direction s'appelle la Qibla.",
        image: "\u{1F54B}"
    },
    {
        question: "Comment s'appelle l'appel \u00e0 la pri\u00e8re ?",
        answers: ["Le takbir", "L'adhan", "Le tasbih", "Le douaa"],
        correct: 1,
        explanation: "L'adhan est l'appel \u00e0 la pri\u00e8re prononc\u00e9 par le muezzin pour informer les musulmans que l'heure de la pri\u00e8re est arriv\u00e9e.",
        image: "\u{1F4E2}"
    },
    {
        question: "Que dit-on \u00e0 la fin de la pri\u00e8re pour la terminer ?",
        answers: ["Allahou Akbar", "Alhamdoulillah", "Assalamou alaykoum wa rahmatoullah", "Sobhanallah"],
        correct: 2,
        explanation: "On termine la pri\u00e8re par le salam : on tourne la t\u00eate \u00e0 droite en disant 'Assalamou alaykoum wa rahmatoullah'.",
        image: "\u270B"
    }
],

// ========== JEUNE ==========
jeune: [
    {
        question: "Pendant quel mois les musulmans je\u00fbnent-ils ?",
        answers: ["Chaabane", "Ramadan", "Mouharram", "Rajab"],
        correct: 1,
        explanation: "Le je\u00fbne du mois de Ramadan est le 4\u00e8me pilier de l'Islam. C'est le mois o\u00f9 le Coran a \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9.",
        image: "\u{1F319}"
    },
    {
        question: "De quoi doit-on s'abstenir pendant le je\u00fbne ?",
        answers: ["De dormir", "De parler", "De manger, boire et relations intimes", "De marcher"],
        correct: 2,
        explanation: "Pendant le je\u00fbne, on s'abstient de manger, boire et avoir des relations intimes du lever du soleil (fajr) jusqu'au coucher du soleil (maghrib).",
        image: "\u{1F372}"
    },
    {
        question: "Comment s'appelle le repas pris avant l'aube pendant le Ramadan ?",
        answers: ["Le ftour", "Le souhour", "Le d\u00e9jeuner", "Le gouter"],
        correct: 1,
        explanation: "Le souhour (repas avant l'aube) est fortement recommand\u00e9. Le Proph\u00e8te (paix sur lui) a dit : 'Prenez le souhour car il y a b\u00e9n\u00e9diction dans ce repas.'",
        image: "\u{1F375}"
    },
    {
        question: "Qui est dispens\u00e9 du je\u00fbne ?",
        answers: ["Les riches", "Les malades et les voyageurs", "Les hommes", "Personne"],
        correct: 1,
        explanation: "Les malades, les voyageurs, les femmes enceintes ou qui allaitent, et les personnes \u00e2g\u00e9es faibles peuvent ne pas je\u00fbner. Ils devront rattraper ou compenser.",
        image: "\u{1F3E5}"
    },
    {
        question: "Comment s'appelle la pri\u00e8re sp\u00e9ciale faite la nuit pendant le Ramadan ?",
        answers: ["Salat ad-Doha", "Salat at-Tarawih", "Salat al-Istikhara", "Salat al-Janaza"],
        correct: 1,
        explanation: "Les Tarawih sont des pri\u00e8res surr\u00e9rogatoires accomplies apr\u00e8s la pri\u00e8re de Icha pendant tout le mois de Ramadan.",
        image: "\u{1F54C}"
    },
    {
        question: "Comment s'appelle la f\u00eate qui marque la fin du Ramadan ?",
        answers: ["A\u00efd al-Adha", "A\u00efd al-Fitr", "Mawlid", "Achoura"],
        correct: 1,
        explanation: "L'A\u00efd al-Fitr (la f\u00eate de la rupture du je\u00fbne) est c\u00e9l\u00e9br\u00e9 le 1er Chawwal, apr\u00e8s le mois de Ramadan.",
        image: "\u{1F389}"
    },
    {
        question: "Qu'est-ce qui n'annule PAS le je\u00fbne ?",
        answers: ["Manger volontairement", "Se rincer la bouche sans avaler", "Boire de l'eau", "Vomir volontairement"],
        correct: 1,
        explanation: "Se rincer la bouche pendant les ablutions n'annule pas le je\u00fbne tant qu'on n'avale pas l'eau. C'est une facilit\u00e9 d'Allah.",
        image: "\u2705"
    }
],

// ========== PELERINAGE ==========
pelerinage: [
    {
        question: "Quel est le nom du p\u00e8lerinage obligatoire en Islam ?",
        answers: ["La Omra", "Le Hajj", "Le Jihad", "Le Zakat"],
        correct: 1,
        explanation: "Le Hajj est le 5\u00e8me pilier de l'Islam. Il est obligatoire une fois dans la vie pour celui qui en a la capacit\u00e9 physique et financi\u00e8re.",
        image: "\u{1F54B}"
    },
    {
        question: "Dans quelle ville se d\u00e9roule le Hajj ?",
        answers: ["\u00c0 M\u00e9dine", "\u00c0 J\u00e9rusalem", "\u00c0 La Mecque", "\u00c0 Damas"],
        correct: 2,
        explanation: "Le Hajj a lieu \u00e0 La Mecque (Makkah) en Arabie Saoudite, autour de la Kaaba, la Maison sacr\u00e9e d'Allah.",
        image: "\u{1F54B}"
    },
    {
        question: "Comment s'appelle le v\u00eatement blanc port\u00e9 pendant le Hajj ?",
        answers: ["Le kamis", "L'ihram", "Le burnous", "Le djellaba"],
        correct: 1,
        explanation: "L'ihram est un v\u00eatement blanc simple port\u00e9 par les hommes durant le Hajj. Il symbolise l'\u00e9galit\u00e9 de tous devant Allah.",
        image: "\u{1F455}"
    },
    {
        question: "Combien de tours fait-on autour de la Kaaba (tawaf) ?",
        answers: ["3 tours", "5 tours", "7 tours", "10 tours"],
        correct: 2,
        explanation: "Le tawaf consiste \u00e0 faire 7 tours autour de la Kaaba dans le sens inverse des aiguilles d'une montre.",
        image: "\u{1F504}"
    },
    {
        question: "Quel jour du Hajj les p\u00e8lerins se rassemblent-ils \u00e0 Arafat ?",
        answers: ["Le 8 Dhoul-Hijja", "Le 9 Dhoul-Hijja", "Le 10 Dhoul-Hijja", "Le 12 Dhoul-Hijja"],
        correct: 1,
        explanation: "Le jour d'Arafat (9 Dhoul-Hijja) est le moment le plus important du Hajj. Le Proph\u00e8te a dit : 'Le Hajj, c'est Arafat.'",
        image: "\u26F0\uFE0F"
    },
    {
        question: "Qu'est-ce que la Omra ?",
        answers: ["Une pri\u00e8re sp\u00e9ciale", "Le petit p\u00e8lerinage", "Un type de je\u00fbne", "Une aum\u00f4ne"],
        correct: 1,
        explanation: "La Omra est le 'petit p\u00e8lerinage'. Contrairement au Hajj, elle peut \u00eatre accomplie \u00e0 tout moment de l'ann\u00e9e.",
        image: "\u{1F6EB}"
    }
],

// ========== SACRIFICE ==========
sacrifice: [
    {
        question: "Comment s'appelle la f\u00eate du sacrifice en Islam ?",
        answers: ["A\u00efd al-Fitr", "A\u00efd al-Adha", "Mawlid", "Laylat al-Qadr"],
        correct: 1,
        explanation: "L'A\u00efd al-Adha (f\u00eate du sacrifice) comm\u00e9more le sacrifice d'Ibrahim (paix sur lui) qui \u00e9tait pr\u00eat \u00e0 sacrifier son fils Ismail par ob\u00e9issance \u00e0 Allah.",
        image: "\u{1F411}"
    },
    {
        question: "Quel proph\u00e8te est li\u00e9 \u00e0 l'histoire du sacrifice ?",
        answers: ["Moussa", "Issa", "Ibrahim", "Nouh"],
        correct: 2,
        explanation: "Le proph\u00e8te Ibrahim (Abraham, paix sur lui) a re\u00e7u l'ordre en r\u00eave de sacrifier son fils Ismail. Allah l'a remplac\u00e9 par un b\u00e9lier.",
        image: "\u{1F474}"
    },
    {
        question: "Quels animaux peut-on sacrifier selon le rite malikite ?",
        answers: ["Uniquement un mouton", "Mouton, ch\u00e8vre, vache ou chameau", "N'importe quel animal", "Seulement un b\u0153uf"],
        correct: 1,
        explanation: "Selon le rite malikite, on peut sacrifier un mouton, une ch\u00e8vre, une vache ou un chameau. L'animal doit avoir l'\u00e2ge requis et \u00eatre en bonne sant\u00e9.",
        image: "\u{1F404}"
    },
    {
        question: "En combien de parts doit-on id\u00e9alement partager la viande du sacrifice ?",
        answers: ["2 parts", "3 parts", "4 parts", "On ne partage pas"],
        correct: 1,
        explanation: "Il est recommand\u00e9 de partager la viande en 3 parts : un tiers pour la famille, un tiers pour les proches/voisins, et un tiers pour les pauvres.",
        image: "\u{1F356}"
    },
    {
        question: "Quand doit-on faire le sacrifice de l'A\u00efd ?",
        answers: ["Avant la pri\u00e8re de l'A\u00efd", "Apr\u00e8s la pri\u00e8re de l'A\u00efd", "La veille de l'A\u00efd", "N'importe quand"],
        correct: 1,
        explanation: "Le sacrifice doit \u00eatre fait apr\u00e8s la pri\u00e8re de l'A\u00efd al-Adha. Sacrifier avant la pri\u00e8re n'est pas valide.",
        image: "\u{1F54C}"
    }
],

// ========== INTERDITS ALIMENTAIRES ==========
alimentaire: [
    {
        question: "Comment appelle-t-on ce qui est permis en Islam ?",
        answers: ["Haram", "Halal", "Makrouh", "Moubah"],
        correct: 1,
        explanation: "Halal signifie 'permis' ou 'licite'. \u00c0 l'oppos\u00e9, Haram signifie 'interdit'. Le musulman doit manger halal.",
        image: "\u2705"
    },
    {
        question: "Quelle viande est interdite (haram) en Islam ?",
        answers: ["Le poulet", "L'agneau", "Le porc", "Le poisson"],
        correct: 2,
        explanation: "La viande de porc est formellement interdite en Islam. C'est mentionn\u00e9 clairement dans le Coran (sourate Al-Baqara, verset 173).",
        image: "\u274C"
    },
    {
        question: "Les boissons alcoolis\u00e9es sont-elles permises en Islam ?",
        answers: ["Oui, un peu", "Non, elles sont haram", "Seulement le vendredi", "Seulement en \u00e9t\u00e9"],
        correct: 1,
        explanation: "L'alcool est strictement interdit en Islam, m\u00eame en petite quantit\u00e9. Le Proph\u00e8te (paix sur lui) a dit que ce qui enivre en grande quantit\u00e9 est interdit m\u00eame en petite quantit\u00e9.",
        image: "\u{1F6AB}"
    },
    {
        question: "Que doit-on dire avant de manger ?",
        answers: ["Alhamdoulillah", "Bismillah", "Allahou Akbar", "SubhanAllah"],
        correct: 1,
        explanation: "On dit 'Bismillah' (Au nom d'Allah) avant de manger. Et 'Alhamdoulillah' (Louange \u00e0 Allah) apr\u00e8s avoir termin\u00e9.",
        image: "\u{1F372}"
    },
    {
        question: "Le poisson a-t-il besoin d'\u00eatre \u00e9gorg\u00e9 rituellement (dhab\u00ee7a) ?",
        answers: ["Oui, toujours", "Non, il est halal sans \u00e9gorgement", "Seulement les gros poissons", "Seulement en mer"],
        correct: 1,
        explanation: "Le poisson et les fruits de mer sont halal sans n\u00e9cessit\u00e9 d'\u00e9gorgement rituel. Le Proph\u00e8te (paix sur lui) a dit \u00e0 propos de la mer : 'Son eau est purificatrice et ses morts sont licites.'",
        image: "\u{1F41F}"
    },
    {
        question: "Selon le rite malikite, avec quelle main doit-on manger ?",
        answers: ["La main gauche", "La main droite", "Les deux mains", "Peu importe"],
        correct: 1,
        explanation: "La Sunna est de manger avec la main droite. Le Proph\u00e8te (paix sur lui) a dit : 'Mangez avec votre main droite.'",
        image: "\u270B"
    }
],

// ========== NOMS DIVINS (ACHARITE) ==========
noms_divins: [
    {
        question: "Combien de noms (attributs) Allah a-t-il selon la tradition ?",
        answers: ["10 noms", "50 noms", "99 noms", "1000 noms"],
        correct: 2,
        explanation: "Allah a 99 noms (Asma' al-Housna = les plus beaux noms). Le Proph\u00e8te (paix sur lui) a dit : 'Celui qui les apprend par c\u0153ur entrera au Paradis.'",
        image: "\u2728"
    },
    {
        question: "Que signifie 'Ar-Rahman' ?",
        answers: ["Le Roi", "Le Tr\u00e8s Mis\u00e9ricordieux", "Le Tout-Puissant", "Le Sage"],
        correct: 1,
        explanation: "Ar-Rahman signifie 'Le Tr\u00e8s Mis\u00e9ricordieux'. C'est un attribut de Dieu qui englobe toute la cr\u00e9ation. Sa mis\u00e9ricorde embrasse toute chose.",
        image: "\u{1F49A}"
    },
    {
        question: "Que signifie 'Al-Alim' ?",
        answers: ["Le Puissant", "Le Cr\u00e9ateur", "L'Omniscient (Celui qui sait tout)", "Le Pardonneur"],
        correct: 2,
        explanation: "Al-Alim signifie 'L'Omniscient'. Allah sait tout : le pass\u00e9, le pr\u00e9sent et le futur. Rien ne Lui \u00e9chappe.",
        image: "\u{1F4A1}"
    },
    {
        question: "Que signifie 'Al-Khaliq' ?",
        answers: ["Le Mis\u00e9ricordieux", "Le Cr\u00e9ateur", "Le Juge", "Le Protecteur"],
        correct: 1,
        explanation: "Al-Khaliq signifie 'Le Cr\u00e9ateur'. Allah a cr\u00e9\u00e9 l'univers et tout ce qu'il contient \u00e0 partir de rien.",
        image: "\u{1F30D}"
    },
    {
        question: "Que signifie 'As-Sami' ?",
        answers: ["Celui qui voit tout", "Celui qui entend tout", "Celui qui sait tout", "Celui qui pardonne"],
        correct: 1,
        explanation: "As-Sami\u2018 signifie 'L'Audient', Celui qui entend tout. Allah entend toutes les paroles, m\u00eame les pens\u00e9es secr\u00e8tes.",
        image: "\u{1F442}"
    },
    {
        question: "Que signifie 'Al-Basir' ?",
        answers: ["Le Voyant (qui voit tout)", "Le Pardonneur", "Le Puissant", "Le G\u00e9n\u00e9reux"],
        correct: 0,
        explanation: "Al-Basir signifie 'Le Voyant', Celui qui voit tout. Rien n'\u00e9chappe au regard d'Allah, ni dans les cieux ni sur la terre.",
        image: "\u{1F441}\uFE0F"
    },
    {
        question: "Selon la doctrine Acharite, les attributs de Dieu sont-ils semblables \u00e0 ceux des cr\u00e9atures ?",
        answers: ["Oui, ils sont pareils", "Non, rien ne Lui ressemble", "Parfois oui, parfois non", "On ne sait pas"],
        correct: 1,
        explanation: "Selon l'\u00e9cole Acharite, Allah n'a aucune ressemblance avec Ses cr\u00e9atures. Comme dit le Coran : 'Il n'y a rien qui Lui soit semblable' (Sourate Ash-Shura, v.11).",
        image: "\u{1F31F}"
    }
],

// ========== ATTRIBUTS DE DIEU ==========
attributs_dieu: [
    {
        question: "Est-il possible qu'Allah ait un d\u00e9but ou une fin ?",
        answers: ["Oui", "Non, Il est \u00e9ternel sans d\u00e9but ni fin", "Seulement un d\u00e9but", "On ne sait pas"],
        correct: 1,
        explanation: "Allah est Al-Awwal (Le Premier sans d\u00e9but) et Al-Akhir (Le Dernier sans fin). Il est \u00e9ternel (Qadim) et \u00e9ternellement existant (Baqi).",
        image: "\u267E\uFE0F"
    },
    {
        question: "Allah a-t-Il besoin de manger, dormir ou se reposer ?",
        answers: ["Oui, comme nous", "Non, Il n'a besoin de rien", "Seulement dormir", "Parfois"],
        correct: 1,
        explanation: "Allah est auto-suffisant (Al-Ghani). Il n'a besoin de rien ni de personne. C'est nous qui avons besoin de Lui.",
        image: "\u{1F4AA}"
    },
    {
        question: "Est-il possible qu'il y ait deux dieux ?",
        answers: ["Oui", "Non, Allah est Un et Unique", "Peut-\u00eatre", "Selon les religions"],
        correct: 1,
        explanation: "Le Tawhid (l'unicit\u00e9 d'Allah) est le fondement de l'Islam. Allah dit : 'Dis : Il est Allah, Unique' (Sourate Al-Ikhlas). Il n'y a qu'un seul Dieu.",
        image: "\u261D\uFE0F"
    },
    {
        question: "Allah a-t-Il un corps ou une forme comme les humains ?",
        answers: ["Oui, il ressemble \u00e0 un humain", "Non, Il est sans forme ni corps", "Il a un corps de lumi\u00e8re", "On ne peut pas savoir"],
        correct: 1,
        explanation: "Selon la doctrine Acharite, Allah n'a ni corps, ni forme, ni lieu. Il ne ressemble en rien \u00e0 Sa cr\u00e9ation. 'Rien ne Lui est semblable.'",
        image: "\u{1F31F}"
    },
    {
        question: "Est-ce qu'Allah peut tout faire ?",
        answers: ["Non, il y a des limites", "Oui, Il est Tout-Puissant (Al-Qadir)", "Seulement les bonnes choses", "Seulement dans le ciel"],
        correct: 1,
        explanation: "Allah est Al-Qadir, le Tout-Puissant. Il a le pouvoir absolu sur toute chose. Quand Il veut une chose, Il dit 'Sois' et elle est.",
        image: "\u{1F4AA}"
    },
    {
        question: "Qu'est-ce qui est IMPOSSIBLE pour Allah selon l'Acharisme ?",
        answers: ["Cr\u00e9er l'univers", "L'ignorance, la faiblesse, la ressemblance aux cr\u00e9atures", "Pardonner", "Entendre les invocations"],
        correct: 1,
        explanation: "Il est impossible qu'Allah ait des d\u00e9fauts : l'ignorance, la faiblesse, l'injustice, le mensonge. Ces choses sont impossibles pour Lui car elles contredisent Sa perfection.",
        image: "\u{1F6AB}"
    }
],

// ========== MESSAGERS ==========
messagers: [
    {
        question: "Quelle est la diff\u00e9rence entre un proph\u00e8te (nabi) et un messager (rassoul) ?",
        answers: ["Aucune diff\u00e9rence", "Le messager re\u00e7oit un Livre ou une nouvelle l\u00e9gislation", "Le proph\u00e8te est plus important", "Le messager est un ange"],
        correct: 1,
        explanation: "Un messager (rassoul) re\u00e7oit une nouvelle l\u00e9gislation \u00e0 transmettre, tandis qu'un proph\u00e8te (nabi) suit la l\u00e9gislation du messager avant lui. Tout messager est proph\u00e8te, mais pas l'inverse.",
        image: "\u{1F4DC}"
    },
    {
        question: "Qu'est-ce qui est OBLIGATOIRE pour tous les messagers ?",
        answers: ["\u00catre riche", "La v\u00e9racit\u00e9 (sidq), la fid\u00e9lit\u00e9 (amana) et la transmission (tabligh)", "\u00catre roi", "Vivre longtemps"],
        correct: 1,
        explanation: "Les messagers sont n\u00e9cessairement v\u00e9ridiques (sidq), dignes de confiance (amana), intelligents (fatana) et charg\u00e9s de transmettre le message (tabligh).",
        image: "\u2705"
    },
    {
        question: "Qu'est-ce qui est IMPOSSIBLE pour les messagers ?",
        answers: ["Manger et boire", "\u00catre humains", "Le mensonge, la trahison et cacher le message", "Avoir des enfants"],
        correct: 2,
        explanation: "Il est impossible que les messagers mentent, trahissent ou cachent quoi que ce soit du message divin. Ils sont prot\u00e9g\u00e9s par Allah.",
        image: "\u{1F6AB}"
    },
    {
        question: "Qui est le dernier messager envoy\u00e9 par Allah ?",
        answers: ["Moussa (Mo\u00efse)", "Issa (J\u00e9sus)", "Mouhammad (paix sur lui)", "Ibrahim (Abraham)"],
        correct: 2,
        explanation: "Le proph\u00e8te Mouhammad (paix et salut sur lui) est le dernier des messagers, le 'sceau des proph\u00e8tes' (Khatam an-Nabiyyin).",
        image: "\u{1F31F}"
    },
    {
        question: "Combien de messagers sont mentionn\u00e9s dans le Coran ?",
        answers: ["10", "15", "25", "100"],
        correct: 2,
        explanation: "25 proph\u00e8tes et messagers sont mentionn\u00e9s par leur nom dans le Coran, mais il y en a eu beaucoup d'autres.",
        image: "\u{1F4D6}"
    },
    {
        question: "Les messagers peuvent-ils \u00eatre malades ou mourir ?",
        answers: ["Non, jamais", "Oui, ce sont des \u00eatres humains", "Seulement les petits proph\u00e8tes", "Seulement de vieillesse"],
        correct: 1,
        explanation: "Les messagers sont des \u00eatres humains. Ils peuvent \u00eatre malades, ressentir la faim, la fatigue et ils meurent. Mais ils sont prot\u00e9g\u00e9s dans la transmission du message.",
        image: "\u{1F64B}"
    }
],

// ========== LES ANGES ==========
anges: [
    {
        question: "De quoi les anges ont-ils \u00e9t\u00e9 cr\u00e9\u00e9s ?",
        answers: ["De terre", "De feu", "De lumi\u00e8re (nour)", "D'eau"],
        correct: 2,
        explanation: "Les anges ont \u00e9t\u00e9 cr\u00e9\u00e9s de lumi\u00e8re (nour), les djinns de feu, et les humains de terre (argile).",
        image: "\u{1F31F}"
    },
    {
        question: "Quel ange est charg\u00e9 de transmettre la r\u00e9v\u00e9lation aux proph\u00e8tes ?",
        answers: ["Mikail", "Israfil", "Jibril (Gabriel)", "Azrail"],
        correct: 2,
        explanation: "Jibril (Gabriel, paix sur lui) est l'ange charg\u00e9 de transmettre la r\u00e9v\u00e9lation divine aux proph\u00e8tes. Il a transmis le Coran au Proph\u00e8te Mouhammad.",
        image: "\u{1F4DC}"
    },
    {
        question: "Quel ange est charg\u00e9 de la pluie et de la subsistance ?",
        answers: ["Jibril", "Mikail (Micha\u00ebl)", "Israfil", "Malik"],
        correct: 1,
        explanation: "Mikail (Micha\u00ebl, paix sur lui) est charg\u00e9 de la pluie et de la subsistance des cr\u00e9atures, par la permission d'Allah.",
        image: "\u{1F327}\uFE0F"
    },
    {
        question: "Les anges d\u00e9sob\u00e9issent-ils \u00e0 Allah ?",
        answers: ["Oui, parfois", "Non, jamais", "Seulement les petits anges", "On ne sait pas"],
        correct: 1,
        explanation: "Les anges ne d\u00e9sob\u00e9issent jamais \u00e0 Allah. Le Coran dit : 'Ils ne d\u00e9sob\u00e9issent jamais \u00e0 Allah en ce qu'Il leur commande, et font strictement ce qu'on leur ordonne.' (Sourate At-Tahrim, v.6)",
        image: "\u{1F607}"
    },
    {
        question: "Quel ange soufflera dans la trompette le Jour du Jugement ?",
        answers: ["Jibril", "Mikail", "Israfil", "Ridwan"],
        correct: 2,
        explanation: "Israfil est l'ange charg\u00e9 de souffler dans la Trompe (As-Sour) le Jour de la R\u00e9surrection.",
        image: "\u{1F3BA}"
    },
    {
        question: "Comment s'appellent les deux anges qui notent nos actes ?",
        answers: ["Harout et Marout", "Raqib et Atid", "Nakir et Mounkar", "Ridwan et Malik"],
        correct: 1,
        explanation: "Raqib et Atid sont les deux anges qui accompagnent chaque personne : l'un note les bonnes actions, l'autre les mauvaises.",
        image: "\u{1F4DD}"
    },
    {
        question: "Les anges mangent-ils et boivent-ils ?",
        answers: ["Oui, comme nous", "Non, ils n'en ont pas besoin", "Seulement de l'eau", "Seulement au paradis"],
        correct: 1,
        explanation: "Les anges ne mangent pas, ne boivent pas et ne dorment pas. Ils adorent Allah sans cesse, sans fatigue.",
        image: "\u{1F31F}"
    }
],

// ========== LIVRES SACRES ==========
livres: [
    {
        question: "Combien de Livres sacr\u00e9s principaux sont mentionn\u00e9s en Islam ?",
        answers: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Les 4 Livres sacr\u00e9s principaux sont : la Torah (Tawrat) donn\u00e9e \u00e0 Moussa, les Psaumes (Zabour) \u00e0 Daoud, l'\u00c9vangile (Injil) \u00e0 Issa, et le Coran \u00e0 Mouhammad.",
        image: "\u{1F4DA}"
    },
    {
        question: "\u00c0 quel proph\u00e8te la Torah (Tawrat) a-t-elle \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9e ?",
        answers: ["Ibrahim", "Moussa (Mo\u00efse)", "Issa (J\u00e9sus)", "Daoud (David)"],
        correct: 1,
        explanation: "La Torah (Tawrat) a \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9e au proph\u00e8te Moussa (Mo\u00efse, paix sur lui).",
        image: "\u{1F4DC}"
    },
    {
        question: "\u00c0 quel proph\u00e8te les Psaumes (Zabour) ont-ils \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9s ?",
        answers: ["Moussa", "Suleyman", "Daoud (David)", "Issa"],
        correct: 2,
        explanation: "Les Psaumes (Zabour) ont \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9s au proph\u00e8te Daoud (David, paix sur lui).",
        image: "\u{1F3B6}"
    },
    {
        question: "Quel est le dernier Livre sacr\u00e9 r\u00e9v\u00e9l\u00e9 par Allah ?",
        answers: ["La Torah", "L'\u00c9vangile", "Le Coran", "Les Psaumes"],
        correct: 2,
        explanation: "Le Coran est le dernier Livre r\u00e9v\u00e9l\u00e9 par Allah, au proph\u00e8te Mouhammad (paix sur lui). Il est prot\u00e9g\u00e9 de toute falsification par Allah.",
        image: "\u{1F4D6}"
    },
    {
        question: "En quelle langue le Coran a-t-il \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9 ?",
        answers: ["En h\u00e9breu", "En fran\u00e7ais", "En arabe", "En aram\u00e9en"],
        correct: 2,
        explanation: "Le Coran a \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9 en arabe. Allah dit : 'Nous l'avons fait descendre, un Coran en arabe.' (Sourate Youssouf, v.2)",
        image: "\u{1F1F8}\u{1F1E6}"
    },
    {
        question: "Combien de sourates contient le Coran ?",
        answers: ["100", "114", "120", "99"],
        correct: 1,
        explanation: "Le Coran contient 114 sourates (chapitres), de la Fatiha (l'Ouverture) \u00e0 An-Nas (les Hommes).",
        image: "\u{1F4D6}"
    }
],

// ========== JOUR DU JUGEMENT ==========
jugement: [
    {
        question: "Comment s'appelle le Jour du Jugement en arabe ?",
        answers: ["Yawm al-Jumu'a", "Yawm al-Qiyama", "Yawm al-Ithnayn", "Yawm al-Arba'a"],
        correct: 1,
        explanation: "Yawm al-Qiyama signifie 'Le Jour de la R\u00e9surrection'. C'est le jour o\u00f9 tous les \u00eatres seront ressuscit\u00e9s pour rendre des comptes devant Allah.",
        image: "\u2696\uFE0F"
    },
    {
        question: "Que se passera-t-il ce Jour-l\u00e0 pour chaque personne ?",
        answers: ["Rien", "Chacun sera jug\u00e9 pour ses actes", "Seuls les m\u00e9chants seront jug\u00e9s", "On oubliera tout"],
        correct: 1,
        explanation: "Chaque personne sera jug\u00e9e pour ses actes, bons et mauvais. Rien ne sera oubli\u00e9. 'Quiconque fait un bien du poids d'un atome le verra.' (Sourate Az-Zalzala)",
        image: "\u{1F4D6}"
    },
    {
        question: "Comment s'appelle la balance qui p\u00e8sera les actes ?",
        answers: ["As-Sirat", "Al-Mizan", "Al-Hawdh", "Al-Jannah"],
        correct: 1,
        explanation: "Al-Mizan est la Balance divine qui p\u00e8sera les bonnes et les mauvaises actions de chaque personne le Jour du Jugement.",
        image: "\u2696\uFE0F"
    },
    {
        question: "Comment s'appelle le pont que tout le monde devra traverser ?",
        answers: ["Al-Mizan", "As-Sirat", "Al-Kawthar", "Al-Hawd"],
        correct: 1,
        explanation: "As-Sirat est le pont dress\u00e9 au-dessus de l'Enfer que tout le monde devra traverser. Les croyants le traverseront selon leurs actes.",
        image: "\u{1F309}"
    },
    {
        question: "Croire au Jour du Jugement est-il obligatoire ?",
        answers: ["Non, c'est un choix", "Oui, c'est un pilier de la foi", "Seulement pour les savants", "C'est recommand\u00e9"],
        correct: 1,
        explanation: "Croire au Jour du Jugement est l'un des 6 piliers de la foi (iman). Celui qui ne croit pas au Jour Dernier n'est pas croyant.",
        image: "\u2764\uFE0F"
    },
    {
        question: "Qui conna\u00eet la date du Jour du Jugement ?",
        answers: ["Les savants", "Les anges", "Seul Allah", "Le Proph\u00e8te Mouhammad"],
        correct: 2,
        explanation: "Seul Allah conna\u00eet la date du Jour du Jugement. M\u00eame les anges et les proph\u00e8tes ne la connaissent pas. C'est un secret qu'Allah a gard\u00e9 pour Lui.",
        image: "\u{1F510}"
    }
],

// ========== PECHES DE LA LANGUE ==========
peches_langue: [
    {
        question: "Qu'est-ce que la m\u00e9disance (ghiba) ?",
        answers: ["Dire du bien de quelqu'un", "Parler en mal d'une personne absente m\u00eame si c'est vrai", "Raconter des histoires dr\u00f4les", "Chanter fort"],
        correct: 1,
        explanation: "La m\u00e9disance (ghiba) c'est parler en mal d'une personne absente, m\u00eame si c'est vrai. Le Proph\u00e8te (paix sur lui) a compar\u00e9 cela \u00e0 manger la chair de son fr\u00e8re mort.",
        image: "\u{1F5E3}\uFE0F"
    },
    {
        question: "Qu'est-ce que la calomnie (bouhtan) ?",
        answers: ["Dire la v\u00e9rit\u00e9", "Mentir sur quelqu'un", "Complimenter quelqu'un", "Rester silencieux"],
        correct: 1,
        explanation: "La calomnie (bouhtan) c'est attribuer \u00e0 quelqu'un ce qui est faux. C'est encore plus grave que la m\u00e9disance car on ajoute le mensonge.",
        image: "\u274C"
    },
    {
        question: "Est-ce un p\u00e9ch\u00e9 de se moquer des autres ?",
        answers: ["Non, c'est juste pour rire", "Oui, c'est un p\u00e9ch\u00e9", "Seulement si la personne pleure", "Seulement entre amis"],
        correct: 1,
        explanation: "Se moquer des autres est un p\u00e9ch\u00e9. Allah dit : 'Que les uns ne se moquent pas des autres, car il se peut qu'ils soient meilleurs qu'eux.' (Sourate Al-Houjourat, v.11)",
        image: "\u{1F6AB}"
    },
    {
        question: "Qu'est-ce que la namima (rapporter des paroles pour semer la discorde) ?",
        answers: ["Donner des conseils", "Rapporter les paroles des gens pour les brouiller", "Enseigner le Coran", "Raconter une bonne nouvelle"],
        correct: 1,
        explanation: "La namima c'est colporter des paroles entre les gens pour semer la discorde. Le Proph\u00e8te (paix sur lui) a dit que le 'namam' n'entrera pas au Paradis.",
        image: "\u{1F5E3}\uFE0F"
    },
    {
        question: "Le mensonge est-il permis en Islam ?",
        answers: ["Oui, si c'est une petite blague", "Non, le mensonge est interdit", "Seulement le vendredi", "Seulement aux enfants"],
        correct: 1,
        explanation: "Le mensonge est interdit en Islam sauf dans des cas tr\u00e8s limit\u00e9s (r\u00e9concilier entre les gens, en temps de guerre). Le Proph\u00e8te a dit : 'Le mensonge m\u00e8ne \u00e0 la perdition.'",
        image: "\u{1F6AB}"
    },
    {
        question: "Quelle est la meilleure chose \u00e0 faire avec sa langue ?",
        answers: ["Parler beaucoup", "Faire le dhikr (rappel d'Allah) et dire du bien", "Rester toujours silencieux", "Crier fort"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'Que celui qui croit en Allah et au Jour Dernier dise du bien ou qu'il se taise.' Le dhikr est la meilleure utilisation de la langue.",
        image: "\u{1F31F}"
    }
],

// ========== RESPECT & FAMILLE ==========
respect: [
    {
        question: "Apr\u00e8s l'adoration d'Allah, quel est le commandement le plus important dans le Coran ?",
        answers: ["Gagner de l'argent", "La bienveillance envers les parents", "Voyager", "Manger halal"],
        correct: 1,
        explanation: "Allah dit : 'Ton Seigneur a d\u00e9cr\u00e9t\u00e9 que vous n'adoriez que Lui et la bienveillance envers les parents.' (Sourate Al-Isra, v.23). Le respect des parents vient juste apr\u00e8s l'adoration d'Allah.",
        image: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"
    },
    {
        question: "Peut-on dire 'ouf' \u00e0 ses parents selon le Coran ?",
        answers: ["Oui, c'est normal", "Non, m\u00eame 'ouf' est interdit", "Seulement si on est fatigu\u00e9", "Seulement en chuchotant"],
        correct: 1,
        explanation: "Allah dit : 'Ne leur dis m\u00eame pas ouf !' (Sourate Al-Isra, v.23). M\u00eame cette petite marque d'agacement est interdite envers les parents.",
        image: "\u{1F645}"
    },
    {
        question: "Comment doit-on traiter les personnes \u00e2g\u00e9es ?",
        answers: ["Les ignorer", "Avec respect, douceur et bienveillance", "Comme tout le monde", "On n'est pas oblig\u00e9"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'N'est pas des n\u00f4tres celui qui ne respecte pas nos a\u00een\u00e9s et n'est pas mis\u00e9ricordieux envers nos jeunes.'",
        image: "\u{1F475}"
    },
    {
        question: "Comment doit-on traiter les plus jeunes que soi ?",
        answers: ["Les commander", "Avec mis\u00e9ricorde et gentillesse", "Les ignorer", "Avec s\u00e9v\u00e9rit\u00e9"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) \u00e9tait tr\u00e8s doux avec les enfants. Il les saluait, jouait avec eux et les portait. La mis\u00e9ricorde envers les petits est un signe de foi.",
        image: "\u{1F9D2}"
    },
    {
        question: "Le Proph\u00e8te (paix sur lui) a dit : 'Le Paradis se trouve sous les pieds...' de qui ?",
        answers: ["Du p\u00e8re", "Des m\u00e8res", "Des savants", "Des rois"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'Le Paradis se trouve sous les pieds des m\u00e8res.' Cela montre l'immense statut de la m\u00e8re en Islam.",
        image: "\u{1F49A}"
    },
    {
        question: "Doit-on bien traiter ses voisins en Islam ?",
        answers: ["Non, ce n'est pas important", "Oui, c'est une obligation", "Seulement les voisins musulmans", "Seulement le vendredi"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'Jibril n'a cess\u00e9 de me recommander le voisin au point que j'ai cru qu'il allait en faire un h\u00e9ritier.'",
        image: "\u{1F3E0}"
    }
],

// ========== BON COMPORTEMENT ==========
comportement: [
    {
        question: "Quelle est la premi\u00e8re chose \u00e0 dire quand on rencontre un musulman ?",
        answers: ["Bonjour", "Comment \u00e7a va ?", "Assalamou alaykoum", "Quoi de neuf ?"],
        correct: 2,
        explanation: "Le salam (Assalamou alaykoum = Que la paix soit sur vous) est la salutation islamique. R\u00e9pondre au salam est obligatoire.",
        image: "\u{1F91D}"
    },
    {
        question: "Le Proph\u00e8te (paix sur lui) a dit : 'Le meilleur d'entre vous est...' ?",
        answers: ["Le plus riche", "Celui qui a le meilleur comportement", "Le plus fort", "Le plus intelligent"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'Le meilleur d'entre vous est celui qui a le meilleur comportement.' Le bon caract\u00e8re est essentiel en Islam.",
        image: "\u{1F31E}"
    },
    {
        question: "Que doit-on faire quand quelqu'un \u00e9ternue et dit 'Alhamdoulillah' ?",
        answers: ["Rien", "Lui dire 'Yarhamoukoullah' (Qu'Allah te fasse mis\u00e9ricorde)", "Se moquer", "S'\u00e9loigner"],
        correct: 1,
        explanation: "Quand quelqu'un \u00e9ternue et dit 'Alhamdoulillah', on lui r\u00e9pond 'Yarhamoukoullah' (Qu'Allah te fasse mis\u00e9ricorde). C'est une sunna.",
        image: "\u{1F927}"
    },
    {
        question: "Le sourire est-il consid\u00e9r\u00e9 comme une bonne action en Islam ?",
        answers: ["Non, c'est sans importance", "Oui, c'est une sadaqa (aum\u00f4ne)", "Seulement pour les enfants", "Seulement \u00e0 la mosqu\u00e9e"],
        correct: 1,
        explanation: "Le Proph\u00e8te (paix sur lui) a dit : 'Ton sourire \u00e0 ton fr\u00e8re est une aum\u00f4ne (sadaqa).' M\u00eame un petit geste de gentillesse est r\u00e9compens\u00e9.",
        image: "\u{1F60A}"
    },
    {
        question: "Comment le Proph\u00e8te (paix sur lui) mangeait-il ?",
        answers: ["Debout en marchant", "Assis, avec la main droite, sans exc\u00e8s", "Couch\u00e9", "Tr\u00e8s vite"],
        correct: 1,
        explanation: "Le Proph\u00e8te mangeait assis, avec sa main droite, disait Bismillah, et ne mangeait jamais \u00e0 l'exc\u00e8s. Il a dit : 'Le fils d'Adam ne remplit pas de r\u00e9cipient pire que son ventre.'",
        image: "\u{1F372}"
    },
    {
        question: "Qu'est-ce que la patience (sabr) en Islam ?",
        answers: ["Attendre le bus", "Endurer les \u00e9preuves en restant fid\u00e8le \u00e0 Allah", "Ne rien faire", "Se mettre en col\u00e8re"],
        correct: 1,
        explanation: "La patience (sabr) c'est rester fid\u00e8le \u00e0 Allah face aux \u00e9preuves. Allah dit : 'Allah est avec les patients.' (Sourate Al-Baqara, v.153)",
        image: "\u{1F4AA}"
    }
],

// ========== FIGURES DE L'ISLAM ==========
figures_islam: [
    {
        question: "Qui \u00e9tait Khadija (qu'Allah l'agr\u00e9e) ?",
        answers: ["La fille du Proph\u00e8te", "La premi\u00e8re \u00e9pouse du Proph\u00e8te et la premi\u00e8re musulmane", "Une savante du Maroc", "Une reine d'Arabie"],
        correct: 1,
        explanation: "Khadija bint Khouwaylid est la premi\u00e8re \u00e9pouse du Proph\u00e8te (paix sur lui) et la premi\u00e8re personne \u00e0 croire en sa mission. Elle l'a soutenu avec amour et force.",
        image: "\u{1F451}"
    },
    {
        question: "Qui \u00e9tait Abou Bakr As-Siddiq ?",
        answers: ["Un g\u00e9n\u00e9ral romain", "Le premier calife et meilleur ami du Proph\u00e8te", "Un roi de Perse", "Un marchand de M\u00e9dine"],
        correct: 1,
        explanation: "Abou Bakr As-Siddiq fut le premier homme libre \u00e0 embrasser l'Islam, le meilleur ami du Proph\u00e8te et le premier calife apr\u00e8s sa mort.",
        image: "\u{1F31F}"
    },
    {
        question: "Qui est l'imam Malik ibn Anas ?",
        answers: ["Un homme politique", "Le fondateur du rite malikite", "Un po\u00e8te", "Un g\u00e9n\u00e9ral"],
        correct: 1,
        explanation: "L'imam Malik ibn Anas (93-179 H) est le fondateur du rite malikite. Il est l'auteur du 'Mouwatta', l'un des premiers recueils de hadiths. Il a v\u00e9cu \u00e0 M\u00e9dine.",
        image: "\u{1F4DA}"
    },
    {
        question: "Qui \u00e9tait Omar ibn al-Khattab ?",
        answers: ["Le 2\u00e8me calife, connu pour sa justice", "Un roi d'Egypte", "Un marchand", "Un po\u00e8te"],
        correct: 0,
        explanation: "Omar ibn al-Khattab, deuxi\u00e8me calife de l'Islam, \u00e9tait connu pour sa justice exemplaire. Le Proph\u00e8te l'a surnomm\u00e9 'Al-Farouq' (celui qui distingue le vrai du faux).",
        image: "\u2696\uFE0F"
    },
    {
        question: "Qui est Bilal ibn Rabah ?",
        answers: ["Un roi", "Le premier muezzin de l'Islam", "Un g\u00e9n\u00e9ral", "Un m\u00e9decin"],
        correct: 1,
        explanation: "Bilal ibn Rabah fut un esclave lib\u00e9r\u00e9 qui devint le premier muezzin de l'Islam. Sa voix belle appelait les gens \u00e0 la pri\u00e8re. Il a endur\u00e9 de terribles tortures pour sa foi.",
        image: "\u{1F4E2}"
    },
    {
        question: "Qui \u00e9tait Fatima Az-Zahra ?",
        answers: ["Une savante du Maroc", "La fille bien-aim\u00e9e du Proph\u00e8te", "Une reine", "Une po\u00e9tesse"],
        correct: 1,
        explanation: "Fatima Az-Zahra est la fille du Proph\u00e8te Mouhammad et de Khadija. Le Proph\u00e8te l'aimait beaucoup et l'a d\u00e9crite comme la ma\u00eetresse des femmes du Paradis.",
        image: "\u{1F339}"
    }
],

// ========== LES PROPHETES ==========
prophetes: [
    {
        question: "Qui est le premier proph\u00e8te envoy\u00e9 par Allah ?",
        answers: ["Mouhammad", "Nouh (No\u00e9)", "Adam", "Ibrahim"],
        correct: 2,
        explanation: "Adam (paix sur lui) est le premier proph\u00e8te et le premier \u00eatre humain cr\u00e9\u00e9 par Allah. Il est le p\u00e8re de l'humanit\u00e9.",
        image: "\u{1F30D}"
    },
    {
        question: "Quel proph\u00e8te a construit l'arche (le bateau) pour survivre au d\u00e9luge ?",
        answers: ["Moussa", "Nouh (No\u00e9)", "Suleyman", "Younouss"],
        correct: 1,
        explanation: "Nouh (No\u00e9, paix sur lui) a construit l'arche sur ordre d'Allah pour sauver les croyants et les animaux du grand d\u00e9luge.",
        image: "\u{1F6A2}"
    },
    {
        question: "Quel proph\u00e8te a \u00e9t\u00e9 jet\u00e9 dans le feu mais n'a pas br\u00fbl\u00e9 ?",
        answers: ["Moussa", "Issa", "Ibrahim", "Youssouf"],
        correct: 2,
        explanation: "Ibrahim (Abraham, paix sur lui) a \u00e9t\u00e9 jet\u00e9 dans un grand feu par son peuple, mais Allah a ordonn\u00e9 au feu : 'Sois fra\u00eecheur et paix pour Ibrahim.'",
        image: "\u{1F525}"
    },
    {
        question: "Quel proph\u00e8te a \u00e9t\u00e9 aval\u00e9 par une baleine ?",
        answers: ["Nouh", "Moussa", "Younouss (Jonas)", "Ayoub"],
        correct: 2,
        explanation: "Younouss (Jonas, paix sur lui) a \u00e9t\u00e9 aval\u00e9 par un grand poisson. Dans son ventre, il a invoqu\u00e9 Allah qui l'a sauv\u00e9.",
        image: "\u{1F40B}"
    },
    {
        question: "Quel proph\u00e8te pouvait parler aux animaux et commander aux djinns ?",
        answers: ["Daoud", "Suleyman (Salomon)", "Moussa", "Adam"],
        correct: 1,
        explanation: "Suleyman (Salomon, paix sur lui) avait le pouvoir de comprendre le langage des animaux et de commander aux djinns. C'\u00e9tait un roi proph\u00e8te.",
        image: "\u{1F426}"
    },
    {
        question: "Quel proph\u00e8te a \u00e9t\u00e9 \u00e9lev\u00e9 au ciel vivant selon l'Islam ?",
        answers: ["Moussa", "Ibrahim", "Issa (J\u00e9sus)", "Idriss"],
        correct: 2,
        explanation: "Issa (J\u00e9sus, paix sur lui) a \u00e9t\u00e9 \u00e9lev\u00e9 au ciel par Allah. Il n'a pas \u00e9t\u00e9 tu\u00e9 ni crucifi\u00e9. Il reviendra avant la fin des temps.",
        image: "\u2601\uFE0F"
    },
    {
        question: "Quel proph\u00e8te \u00e9tait c\u00e9l\u00e8bre pour sa patience face \u00e0 la maladie ?",
        answers: ["Shuayb", "Ayoub (Job)", "Lout", "Houd"],
        correct: 1,
        explanation: "Ayoub (Job, paix sur lui) est c\u00e9l\u00e8bre pour son immense patience. Il a endur\u00e9 la maladie pendant des ann\u00e9es sans jamais se plaindre d'Allah.",
        image: "\u{1F4AA}"
    },
    {
        question: "Quel miracle Allah a-t-Il donn\u00e9 \u00e0 Moussa (Mo\u00efse) ?",
        answers: ["Voler dans le ciel", "Son b\u00e2ton se transformait en serpent et la mer s'est fendue", "Parler aux animaux", "Devenir invisible"],
        correct: 1,
        explanation: "Moussa (paix sur lui) avait un b\u00e2ton qui se transformait en serpent et, par la permission d'Allah, il a fendu la mer Rouge pour sauver les Fils d'Isra\u00ebl.",
        image: "\u{1F30A}"
    }
]

};
