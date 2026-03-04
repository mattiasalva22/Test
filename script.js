/* ═══════════════════════════════════════════════════════════════
   SAPRA.AI — Prototipo Interattivo · Script Interazioni
   ═══════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// DATI ARTICOLI per il DRAWER
// ─────────────────────────────────────────────
const ARTICLES = [
  {
    id: 0,
    img: 'linear-gradient(135deg, #1e3a5f 0%, #2a4a7f 100%)',
    imgEmoji: '📰',
    source: 'Corriere della Sera',
    date: '03/03/2024 · 10:45',
    title: 'Consiglio Comunale: approvato il bilancio 2024 con tagli ai servizi sociali',
    score: 96,
    scoreText: 'Alta rilevanza per "Politica locale" e "Bilancio". Articolo trending nelle ultime 2 ore con 8 menzioni.',
    sentiment: 'NEUTRO',
    sentimentClass: 'badge-neutro',
    correlations: [
      { title: 'Bilancio 2023: le promesse non mantenute della giunta', source: 'La Repubblica' },
      { title: 'AMA SpA: il piano industriale sotto la lente', source: 'Il Fatto Quotidiano' },
      { title: 'Roma: rating stabile secondo Moody\'s', source: 'Il Sole 24 Ore' }
    ],
    chart: [30, 50, 40, 65, 55, 80, 96]
  },
  {
    id: 1,
    img: 'linear-gradient(135deg, #1a3a2a 0%, #2a5a3a 100%)',
    imgEmoji: '🏛️',
    source: 'Gazzetta Ufficiale',
    date: '03/03/2024 · 08:20',
    title: 'ANAC: nuove linee guida sugli appalti pubblici nel settore digitale',
    score: 91,
    scoreText: 'Molto rilevante per "ANAC" e "Normativa". Prima pubblicazione su Gazzetta Ufficiale.',
    sentiment: 'POSITIVO',
    sentimentClass: 'badge-positivo',
    correlations: [
      { title: 'Digitalizzazione PA: i ritardi italiani nel confronto europeo', source: 'Il Sole 24 Ore' },
      { title: 'ANAC: il bilancio delle attività 2023', source: 'Corriere della Sera' },
      { title: 'Appalti digitali: le best practice europee', source: 'La Stampa' }
    ],
    chart: [45, 60, 55, 70, 65, 75, 91]
  },
  {
    id: 2,
    img: 'linear-gradient(135deg, #3a1a1a 0%, #5a2a2a 100%)',
    imgEmoji: '📊',
    source: 'Repubblica',
    date: '02/03/2024 · 18:30',
    title: 'Deficit comunale: il sindaco annuncia revisione straordinaria del piano pluriennale',
    score: 88,
    scoreText: 'Rilevante per "Bilancio" e "Politica locale". Forte impatto sull\'opinione pubblica locale.',
    sentiment: 'NEGATIVO',
    sentimentClass: 'badge-negativo',
    correlations: [
      { title: 'Il sindaco sotto pressione: cosa succede in giunta', source: 'Corriere della Sera' },
      { title: 'I comuni in difficoltà finanziaria nel 2024', source: 'Il Sole 24 Ore' },
      { title: 'Corte dei Conti: indagini sui bilanci comunali', source: 'La Stampa' }
    ],
    chart: [20, 35, 30, 45, 55, 70, 88]
  },
  {
    id: 3,
    img: 'linear-gradient(135deg, #1a1a3a 0%, #2a2a5a 100%)',
    imgEmoji: '🔒',
    source: 'Il Sole 24 Ore',
    date: '02/03/2024 · 15:10',
    title: 'Garante Privacy: sanzionata azienda sanitaria per gestione illecita dei dati pazienti',
    score: 85,
    scoreText: 'Rilevante per "Garante Privacy" e "Sanità". Seconda sanzione del mese nel settore sanitario.',
    sentiment: 'NEGATIVO',
    sentimentClass: 'badge-negativo',
    correlations: [
      { title: 'GDPR: le sanzioni più alte nel settore sanitario 2023', source: 'Corriere della Sera' },
      { title: 'Privacy dei dati sanitari: le lacune normative italiane', source: 'Repubblica' },
      { title: 'Garante Privacy: il piano di vigilanza 2024', source: 'La Stampa' }
    ],
    chart: [55, 40, 50, 60, 45, 65, 85]
  },
  {
    id: 4,
    img: 'linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%)',
    imgEmoji: '🗳️',
    source: 'La Stampa',
    date: '01/03/2024 · 22:15',
    title: 'Elezioni regionali Lazio: affluenza record, centrodestra avanti nei sondaggi',
    score: 82,
    scoreText: 'Rilevante per "Elezioni" e "Politica locale". Ampia copertura su tutte le principali testate.',
    sentiment: 'NEUTRO',
    sentimentClass: 'badge-neutro',
    correlations: [
      { title: 'Elezioni Lazio 2020: confronto con i dati attuali', source: 'Repubblica' },
      { title: 'Il centrodestra consolida le regioni del Centro Italia', source: 'Corriere della Sera' },
      { title: 'Il sistema elettorale regionale e le sue distorsioni', source: 'Il Fatto Quotidiano' }
    ],
    chart: [40, 45, 55, 50, 60, 70, 82]
  },
  {
    id: 5,
    img: 'linear-gradient(135deg, #2a1a3a 0%, #3a2a5a 100%)',
    imgEmoji: '💰',
    source: 'Corriere della Sera',
    date: '01/03/2024 · 09:00',
    title: 'PNRR: avanzamento lento sui fondi per la digitalizzazione della PA locale',
    score: 79,
    scoreText: 'Rilevante per "PNRR" e "Bilancio". Tema di lungo corso con ampia copertura istituzionale.',
    sentiment: 'NEGATIVO',
    sentimentClass: 'badge-negativo',
    correlations: [
      { title: 'PNRR: l\'Italia in ritardo rispetto agli altri Paesi UE', source: 'Il Sole 24 Ore' },
      { title: 'Digitalizzazione PA: i migliori Comuni d\'Italia', source: 'Repubblica' },
      { title: 'Ministero dell\'Economia: le misure correttive sul PNRR', source: 'La Stampa' }
    ],
    chart: [60, 55, 65, 50, 45, 60, 79]
  }
];

// ─────────────────────────────────────────────
// DATI CATEGORIE per Step 2
// ─────────────────────────────────────────────
const CATEGORY_TOPICS = {
  politica: ['Governo', 'Parlamento', 'Regioni', 'Comuni', 'Giustizia'],
  economia: ['Mercati', 'Inflazione', 'Lavoro', 'Banche', 'Export'],
  societa:  ['Immigrazione', 'Scuola', 'Università', 'Welfare', 'Cultura']
};

// Mappa articoli per topic (stima)
const TOPIC_ARTICLES_MAP = {
  default: 40
};

// ─────────────────────────────────────────────
// STATO APPLICAZIONE
// ─────────────────────────────────────────────
let selectedTopics = new Set(['Politica locale', 'Bilancio comunale']);
let loadingInterval = null;

// ─────────────────────────────────────────────
// NAVIGAZIONE TRA SCHERMATE
// ─────────────────────────────────────────────
function showScreen(screenId) {
  // Nascondi tutte le schermate
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Aggiorna proto-nav
  document.querySelectorAll('.proto-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });

  // Mostra la schermata target
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
  }

  // Azioni specifiche per schermata
  if (screenId === 'step4-loading') {
    startLoadingAnimation();
  }
  if (screenId === 'ricerca')        initSearchScreen();
  if (screenId === 'gestisci-fonti') initFontiScreen();
  if (screenId === 'impostazioni')   initImpostazioniScreen();

  // Chiudi drawer se aperto
  closeDrawer();

  // Reinizializza icone Lucide
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ─────────────────────────────────────────────
// EVENT DELEGATION — navigazione data-goto e data-screen
// ─────────────────────────────────────────────
document.addEventListener('click', function(e) {
  // Proto-nav buttons
  const protoBtn = e.target.closest('.proto-btn');
  if (protoBtn) {
    showScreen(protoBtn.dataset.screen);
    return;
  }

  // data-goto links/buttons (dentro le schermate)
  const gotoEl = e.target.closest('[data-goto]');
  if (gotoEl) {
    e.preventDefault();
    // Imposta sezione impostazioni se specificata
    if (gotoEl.dataset.settingsSection) {
      settingsActiveSection = gotoEl.dataset.settingsSection;
    }
    showScreen(gotoEl.dataset.goto);
    return;
  }

  // Click su article card (dashboard) -> apri drawer
  const card = e.target.closest('.article-card[data-article]');
  if (card) {
    const idx = parseInt(card.dataset.article);
    openDrawer(idx);
    return;
  }

  // Chiudi drawer cliccando overlay
  if (e.target.id === 'drawer-overlay') {
    closeDrawer();
    return;
  }

  // Chiudi drawer con X
  if (e.target.id === 'drawer-close') {
    closeDrawer();
    return;
  }

  // Apri modale SCRIVER
  if (e.target.closest('.open-scriver-modal')) {
    openScriverModal();
    return;
  }

  // Chiudi modale SCRIVER (overlay o pulsanti)
  if (e.target.id === 'scriver-modal-overlay') {
    closeScriverModal();
    return;
  }
  if (e.target.id === 'modal-close' || e.target.id === 'modal-cancel') {
    closeScriverModal();
    return;
  }

  // Chiudi banner wizard skip
  if (e.target.id === 'banner-close') {
    const banner = document.getElementById('onboarding-banner');
    if (banner) banner.classList.add('hidden');
    return;
  }

  // Sidebar scriver
  if (e.target.id === 'sidebar-scriver-btn') {
    openScriverModal();
    return;
  }
});

// ─────────────────────────────────────────────
// WIZARD STEP 1 — SELEZIONE RUOLO & CHIP AMBITO
// ─────────────────────────────────────────────

// Role cards
document.querySelectorAll('.role-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// Chip ambito (Step 1)
const ambitoChips = document.getElementById('ambito-chips');
if (ambitoChips) {
  ambitoChips.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) chip.classList.toggle('selected');
  });
}

// ─────────────────────────────────────────────
// WIZARD STEP 2 — TOPIC MANAGEMENT
// ─────────────────────────────────────────────

function updateTopicFeedback() {
  const count = selectedTopics.size;
  const countEl = document.getElementById('topic-count');
  const feedbackEl = document.getElementById('topic-ai-text');
  const continueBtn = document.getElementById('step2-continue');
  const feedbackBox = document.getElementById('topic-ai-feedback');

  if (countEl) countEl.textContent = count;

  const articlesPerTopic = 40;
  const estimated = count * articlesPerTopic;

  if (feedbackEl) {
    if (count === 0) {
      feedbackEl.textContent = 'Seleziona almeno 3 topic per procedere.';
    } else if (count < 3) {
      feedbackEl.textContent = `Con ${count} topic monitorerai ~${estimated} articoli al giorno. Aggiungi almeno ${3 - count} altro topic.`;
      if (feedbackBox) {
        feedbackBox.classList.remove('ready');
      }
    } else {
      feedbackEl.textContent = `✅ Con ${count} topic monitorerai ~${estimated} articoli al giorno. Ottima configurazione!`;
      if (feedbackBox) {
        feedbackBox.classList.add('ready');
      }
    }
  }

  if (continueBtn) {
    continueBtn.disabled = count < 3;
  }
}

function addTopic(topicName) {
  if (selectedTopics.has(topicName)) return;
  selectedTopics.add(topicName);
  renderSelectedTopics();
  updateTopicFeedback();
}

function removeTopic(topicName) {
  selectedTopics.delete(topicName);
  // Deselect anche il chip nei suggeriti e nelle categorie
  document.querySelectorAll(`[data-topic="${topicName}"]`).forEach(chip => {
    chip.classList.remove('selected');
  });
  renderSelectedTopics();
  updateTopicFeedback();
}

function renderSelectedTopics() {
  const container = document.getElementById('selected-topics-chips');
  if (!container) return;

  container.innerHTML = '';

  if (selectedTopics.size === 0) {
    container.innerHTML = '<span style="font-size:12px;color:var(--text-secondary)">Nessun topic selezionato</span>';
    return;
  }

  selectedTopics.forEach(topic => {
    const chip = document.createElement('span');
    chip.className = 'chip chip-removable selected';
    chip.dataset.remove = topic;
    chip.innerHTML = `<span class="chip-remove-x">✕</span> ${topic}`;
    chip.querySelector('.chip-remove-x').addEventListener('click', () => removeTopic(topic));
    container.appendChild(chip);
  });
}

// Click sui chip suggeriti (Step 2)
const suggestedChips = document.getElementById('topic-suggested-chips');
if (suggestedChips) {
  suggestedChips.addEventListener('click', e => {
    const chip = e.target.closest('[data-topic]');
    if (!chip) return;
    const topic = chip.dataset.topic;
    if (chip.classList.contains('selected')) {
      removeTopic(topic);
      chip.classList.remove('selected');
    } else {
      addTopic(topic);
      chip.classList.add('selected');
    }
  });
}

// Click sui chip categorie (Step 2)
const categoryTopicsEl = document.getElementById('category-topics');
if (categoryTopicsEl) {
  categoryTopicsEl.addEventListener('click', e => {
    const chip = e.target.closest('[data-topic]');
    if (!chip) return;
    const topic = chip.dataset.topic;
    if (chip.classList.contains('selected')) {
      removeTopic(topic);
      chip.classList.remove('selected');
    } else {
      addTopic(topic);
      chip.classList.add('selected');
    }
  });
}

// Tab categorie (Step 2)
const categoryTabs = document.getElementById('category-tabs');
if (categoryTabs) {
  categoryTabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('#category-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    const topics = CATEGORY_TOPICS[cat] || [];
    const container = document.getElementById('category-topics');
    if (!container) return;

    container.innerHTML = '';
    topics.forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (selectedTopics.has(t) ? ' selected' : '');
      chip.dataset.topic = t;
      chip.textContent = t;
      container.appendChild(chip);
    });
  });
}

// Search topic (Step 2) — filtra chip suggeriti
const topicSearch = document.getElementById('topic-search');
if (topicSearch) {
  topicSearch.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#topic-suggested-chips [data-topic]').forEach(chip => {
      chip.style.display = chip.dataset.topic.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ─────────────────────────────────────────────
// WIZARD STEP 3 — COUNTER FONTI
// ─────────────────────────────────────────────
function updateSourcesCounter() {
  const checks = document.querySelectorAll('#screen-step3 .source-check');
  let activeCount = 0;
  let totalArticles = 0;

  checks.forEach(cb => {
    if (cb.checked) {
      activeCount++;
      totalArticles += parseInt(cb.dataset.articles) || 0;
    }
  });

  const srcEl = document.getElementById('active-sources-count');
  const artEl = document.getElementById('active-articles-count');
  if (srcEl) srcEl.textContent = activeCount;
  if (artEl) artEl.textContent = totalArticles;
}

document.querySelectorAll('#screen-step3 .source-check').forEach(cb => {
  cb.addEventListener('change', updateSourcesCounter);
});

// ─────────────────────────────────────────────
// WIZARD STEP 4 — LOADING ANIMATION
// ─────────────────────────────────────────────
function startLoadingAnimation() {
  const bar = document.getElementById('loading-bar');
  const percentEl = document.getElementById('loading-percent');

  if (!bar) return;

  // Reset
  bar.style.width = '0%';
  if (percentEl) percentEl.textContent = '0%';

  // Reset step stati
  ['lstep-1', 'lstep-2', 'lstep-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('done', 'loading');
    }
  });

  let progress = 0;
  const duration = 3000;
  const interval = 50;
  const step = (100 / (duration / interval));

  if (loadingInterval) clearInterval(loadingInterval);

  // Step 1 e 2 già done
  setTimeout(() => {
    const s1 = document.getElementById('lstep-1');
    if (s1) s1.classList.add('done');
  }, 200);
  setTimeout(() => {
    const s2 = document.getElementById('lstep-2');
    if (s2) s2.classList.add('done');
  }, 600);
  setTimeout(() => {
    const s3 = document.getElementById('lstep-3');
    if (s3) s3.classList.add('loading');
  }, 600);

  loadingInterval = setInterval(() => {
    progress = Math.min(progress + step, 100);
    bar.style.width = progress + '%';
    if (percentEl) percentEl.textContent = Math.round(progress) + '%';

    if (progress >= 100) {
      clearInterval(loadingInterval);
      loadingInterval = null;
      const s3 = document.getElementById('lstep-3');
      if (s3) {
        s3.classList.remove('loading');
        s3.classList.add('done');
        const iconEl = s3.querySelector('.lstep-icon');
        if (iconEl) {
          iconEl.classList.remove('spin');
          iconEl.textContent = '✓';
        }
        const textEl = s3.querySelector('span:last-child');
        if (textEl) textEl.textContent = 'Analisi AI completata';
      }
      // Transizione automatica a step4-feed dopo 600ms
      setTimeout(() => {
        showScreen('step4-feed');
      }, 600);
    }
  }, interval);
}

// ─────────────────────────────────────────────
// DASHBOARD — DRAWER LATERALE
// ─────────────────────────────────────────────
function openDrawer(articleIdx) {
  const data = ARTICLES[articleIdx];
  if (!data) return;

  const drawer = document.getElementById('article-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!drawer || !overlay) return;

  // Popola dati
  const imgEl = document.getElementById('drawer-img');
  if (imgEl) {
    imgEl.style.background = data.img;
    imgEl.textContent = data.imgEmoji;
    imgEl.style.fontSize = '48px';
    imgEl.style.display = 'flex';
    imgEl.style.alignItems = 'center';
    imgEl.style.justifyContent = 'center';
  }

  const srcDateEl = document.getElementById('drawer-source-date');
  if (srcDateEl) srcDateEl.textContent = `${data.source} · ${data.date}`;

  const titleEl = document.getElementById('drawer-title');
  if (titleEl) titleEl.textContent = data.title;

  const scoreFill = document.getElementById('drawer-score-fill');
  if (scoreFill) scoreFill.style.width = data.score + '%';

  const scoreVal = document.getElementById('drawer-score-val');
  if (scoreVal) scoreVal.textContent = data.score + '%';

  const scoreText = document.getElementById('drawer-score-text');
  if (scoreText) scoreText.textContent = data.scoreText;

  const sentimentEl = document.getElementById('drawer-sentiment');
  if (sentimentEl) {
    sentimentEl.textContent = data.sentiment;
    sentimentEl.className = 'badge ' + data.sentimentClass;
  }

  // Correlazioni
  const correlEl = document.getElementById('drawer-correlations');
  if (correlEl) {
    correlEl.innerHTML = '<span class="insight-label" style="display:block;margin-bottom:8px">Correlazioni</span>';
    data.correlations.forEach(c => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'correlation-link';
      a.textContent = c.title;
      a.style.display = 'block';
      a.style.marginBottom = '4px';
      a.style.fontSize = '12px';
      const src = document.createElement('span');
      src.className = 'correlation-source';
      src.textContent = c.source;
      correlEl.appendChild(a);
      correlEl.appendChild(src);
    });
  }

  // Mini chart
  const chartEl = document.getElementById('drawer-chart');
  if (chartEl) {
    chartEl.innerHTML = '';
    const maxVal = Math.max(...data.chart);
    data.chart.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'mini-chart-bar' + (i === data.chart.length - 1 ? ' active' : '');
      bar.style.height = Math.round((val / maxVal) * 100) + '%';
      chartEl.appendChild(bar);
    });
  }

  drawer.classList.add('open');
  overlay.classList.add('visible');
}

function closeDrawer() {
  const drawer = document.getElementById('article-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}

// ─────────────────────────────────────────────
// DASHBOARD — FILTRI TOPIC
// ─────────────────────────────────────────────
document.querySelectorAll('#screen-dashboard .filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#screen-dashboard .filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    const cards = document.querySelectorAll('#dashboard-articles-grid .article-card');

    cards.forEach(card => {
      if (filter === 'tutti' || filter === 'more') {
        card.style.display = '';
      } else {
        card.style.display = card.dataset.filterCat === filter ? '' : 'none';
      }
    });
  });
});

// ─────────────────────────────────────────────
// MODAL SCRIVER
// ─────────────────────────────────────────────
function openScriverModal() {
  const overlay = document.getElementById('scriver-modal-overlay');
  if (overlay) overlay.classList.add('open');
}

function closeScriverModal() {
  const overlay = document.getElementById('scriver-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ESC per chiudere modal/drawer/overlay
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeScriverModal();
    closeDrawer();
    closeFonteModal();
    closeDeleteModal();
    // Chiudi avatar dropdown
    document.querySelectorAll('.avatar-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ═══════════════════════════════════════════════════════════════
// === NUOVA SCHERMATA: RICERCA GLOBALE ===
// ═══════════════════════════════════════════════════════════════

// Dati tag per il cloud di ricerca
const SEARCH_TAGS_ALL = [
  { name: 'Tecnologia',              count: 13423, type: 'categoria' },
  { name: 'Intelligenza Artificiale',count: 12134, type: 'concetto' },
  { name: 'Italia',                  count: 11098, type: 'location' },
  { name: 'Google',                  count: 11001, type: 'organizzazione' },
  { name: 'Donald Trump',            count: 10349, type: 'persona' },
  { name: 'Economia',                count: 10278, type: 'categoria' },
  { name: 'OpenAI',                  count:  9668, type: 'organizzazione' },
  { name: 'Amazon',                  count:  9221, type: 'organizzazione' },
  { name: 'Politica',                count:  8976, type: 'categoria' },
  { name: 'Elon Musk',               count:  8832, type: 'persona' },
  { name: 'Tom Philips',             count:  8600, type: 'persona' },
  { name: 'Sam Altman',              count:  8321, type: 'persona' },
  { name: 'Salute',                  count:  7034, type: 'categoria' },
  { name: 'Videogiochi',             count:  6549, type: 'categoria' },
  { name: 'Roma',                    count:  6213, type: 'location' },
  { name: 'Milano',                  count:  6100, type: 'location' },
  { name: 'StartUp',                 count:  5987, type: 'concetto' },
  { name: 'Meta',                    count:  5432, type: 'organizzazione' },
  { name: 'Europa',                  count:  5100, type: 'location' },
  { name: 'Innovazione',             count:  4876, type: 'concetto' },
  { name: 'Apple',                   count:  4654, type: 'organizzazione' },
  { name: 'Nintendo',                count:  4321, type: 'organizzazione' },
  { name: 'Mark Zuckerberg',         count:  4100, type: 'persona' },
  { name: 'Sostenibilità',           count:  3987, type: 'concetto' },
  { name: 'Stati Uniti',             count:  3800, type: 'location' },
  { name: 'Vikki Blake',             count:  3654, type: 'persona' },
  { name: 'Finanza',                 count:  3400, type: 'categoria' },
  { name: 'Ambiente',                count:  3210, type: 'categoria' },
  { name: 'Cultura',                 count:  2987, type: 'categoria' },
  { name: 'Sport',                   count:  2765, type: 'categoria' },
  { name: 'Burocrazia',              count:  2543, type: 'concetto' },
  { name: 'Hong Kong',               count:  2100, type: 'location' },
  { name: 'Giappone',                count:  1987, type: 'location' },
  { name: 'IGN',                     count:  1876, type: 'organizzazione' },
];

// Compatibilità dei tag: quando un tag è attivo, solo questi restano nel cloud
const SEARCH_COMPAT_MAP = {
  'Tecnologia':               ['Intelligenza Artificiale','StartUp','Innovazione','Google','OpenAI','Amazon','Meta','Apple','Nintendo','IGN','Elon Musk','Sam Altman','Mark Zuckerberg','Tom Philips','Vikki Blake','Stati Uniti','Italia'],
  'Intelligenza Artificiale': ['Tecnologia','OpenAI','Google','Meta','Amazon','Sam Altman','Elon Musk','Mark Zuckerberg','StartUp','Innovazione','Italia','Europa'],
  'Italia':                   ['Politica','Economia','Tecnologia','Roma','Milano','Europa','Salute','Ambiente','Cultura','Finanza'],
  'Politica':                 ['Italia','Economia','Donald Trump','Europa','Roma','Milano','Burocrazia'],
  'Economia':                 ['Italia','Politica','Finanza','StartUp','Europa','Stati Uniti','Ambiente'],
  'OpenAI':                   ['Tecnologia','Intelligenza Artificiale','Sam Altman','StartUp','Google','Meta'],
  'Google':                   ['Tecnologia','Intelligenza Artificiale','OpenAI','Amazon','Meta','Apple'],
  'Meta':                     ['Tecnologia','Intelligenza Artificiale','Mark Zuckerberg','Google','Amazon','OpenAI'],
};

// Risultati di ricerca (simulati)
const SEARCH_RESULTS = [
  { img:'🤖', imgBg:'linear-gradient(135deg,#1a2a3a,#2a3a5a)', title:'Dieci anni di OpenAI: successi, sfide e il futuro dell\'intelligenza artificiale', source:'Repubblica', time:'2h fa', score:94, sentiment:'NEUTRO', sentimentClass:'badge-neutro', tags:['Tecnologia','OpenAI','Intelligenza Artificiale'] },
  { img:'💡', imgBg:'linear-gradient(135deg,#1a3a1a,#2a5a2a)', title:'Mirelo raccoglie 41 milioni di euro per l\'AI applicata alla produzione video', source:'TechCrunch Italia', time:'5h fa', score:87, sentiment:'POSITIVO', sentimentClass:'badge-positivo', tags:['Tecnologia','StartUp','Intelligenza Artificiale'] },
  { img:'🌐', imgBg:'linear-gradient(135deg,#2a1a3a,#3a2a5a)', title:'Meta annuncia nuovi modelli AI multimodali previsti per il 2026', source:'Il Sole 24 Ore', time:'1g fa', score:71, sentiment:'NEUTRO', sentimentClass:'badge-neutro', tags:['Tecnologia','Meta','Intelligenza Artificiale'] },
  { img:'🍎', imgBg:'linear-gradient(135deg,#3a1a1a,#5a2a1a)', title:'Apple Intelligence: disponibile in Italia da marzo 2024, le prime impressioni', source:'Corriere della Sera', time:'3h fa', score:89, sentiment:'POSITIVO', sentimentClass:'badge-positivo', tags:['Tecnologia','Apple','Innovazione'] },
  { img:'🔬', imgBg:'linear-gradient(135deg,#1a3a3a,#2a5a5a)', title:'Google DeepMind: nuovi progressi nel protein folding con AlphaFold 3', source:'Wired Italia', time:'6h fa', score:82, sentiment:'POSITIVO', sentimentClass:'badge-positivo', tags:['Tecnologia','Google','Innovazione'] },
  { img:'📊', imgBg:'linear-gradient(135deg,#3a2a1a,#5a3a2a)', title:'StartUp italiane: raccolta fondi record nel settore AI nel primo trimestre 2024', source:'La Stampa', time:'8h fa', score:76, sentiment:'POSITIVO', sentimentClass:'badge-positivo', tags:['Tecnologia','StartUp','Italia'] },
];

// Stato ricerca
let searchActiveFilters  = new Set();
let searchCategoryFilter = 'all';

function initSearchScreen() {
  searchActiveFilters.clear();
  searchCategoryFilter = 'all';
  const catSelect = document.getElementById('search-category-select');
  if (catSelect) catSelect.value = 'all';
  const input = document.getElementById('search-global-input');
  if (input) input.value = '';
  renderSearchTagCloud();
  renderSearchActiveFilters();
  renderSearchResults();
}

function renderSearchTagCloud() {
  const container = document.getElementById('search-tag-cloud');
  if (!container) return;

  let tags = [...SEARCH_TAGS_ALL];

  // Filtra per categoria dropdown
  if (searchCategoryFilter !== 'all') {
    tags = tags.filter(t => t.type === searchCategoryFilter);
  }

  // Se ci sono filtri attivi, riduci il cloud ai tag compatibili
  if (searchActiveFilters.size > 0) {
    const activeArr = Array.from(searchActiveFilters);
    let compatible = null;
    activeArr.forEach(f => {
      const compat = SEARCH_COMPAT_MAP[f] || [];
      compatible = compatible === null
        ? new Set(compat)
        : new Set([...compatible].filter(c => compat.includes(c)));
    });
    if (compatible) {
      tags = tags
        .filter(t => compatible.has(t.name) && !searchActiveFilters.has(t.name))
        .map(t => ({ ...t, count: Math.max(10, Math.round(t.count * (0.05 + Math.random() * 0.15))) }));
    }
  }

  // Filtra per testo
  const q = (document.getElementById('search-global-input') || {}).value || '';
  if (q) tags = tags.filter(t => t.name.toLowerCase().includes(q.toLowerCase()));

  container.innerHTML = '';
  if (tags.length === 0) {
    container.innerHTML = '<span style="font-size:12px;color:var(--text-secondary)">Nessun tag trovato</span>';
    return;
  }

  const visible = tags.slice(0, 22);
  visible.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'search-tag' + (searchActiveFilters.has(tag.name) ? ' active' : '');
    span.dataset.tagName = tag.name;
    span.innerHTML = `${tag.name}<sup class="tag-count">${tag.count.toLocaleString('it')}</sup>`;
    container.appendChild(span);
  });

  if (tags.length > 22) {
    const more = document.createElement('span');
    more.className = 'search-tag-more';
    more.textContent = `... Load more (${tags.length - 22})`;
    more.addEventListener('click', () => {
      tags.slice(22).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'search-tag' + (searchActiveFilters.has(tag.name) ? ' active' : '');
        span.dataset.tagName = tag.name;
        span.innerHTML = `${tag.name}<sup class="tag-count">${tag.count.toLocaleString('it')}</sup>`;
        container.insertBefore(span, more);
      });
      more.remove();
    });
    container.appendChild(more);
  }
}

function renderSearchActiveFilters() {
  const container = document.getElementById('search-active-filters');
  const statusEl  = document.getElementById('search-status');
  if (!container) return;
  container.innerHTML = '';
  if (searchActiveFilters.size === 0) {
    if (statusEl) statusEl.textContent = 'Nessun filtro attivo';
    return;
  }
  if (statusEl) statusEl.textContent = '';
  searchActiveFilters.forEach(f => {
    const count = SEARCH_RESULTS.filter(r => r.tags.includes(f)).length;
    const chip  = document.createElement('span');
    chip.className = 'search-filter-chip';
    chip.innerHTML = `✕ ${f} <span class="filter-chip-count">${count}</span>`;
    chip.addEventListener('click', () => {
      searchActiveFilters.delete(f);
      renderSearchTagCloud(); renderSearchActiveFilters(); renderSearchResults();
    });
    container.appendChild(chip);
  });
}

function renderSearchResults() {
  const container = document.getElementById('search-results');
  const headerEl  = document.getElementById('search-results-header');
  if (!container) return;
  const q = (document.getElementById('search-global-input') || {}).value || '';
  if (searchActiveFilters.size === 0 && !q) {
    container.innerHTML = '';
    if (headerEl) headerEl.style.display = 'none';
    return;
  }
  let results = [...SEARCH_RESULTS];
  if (searchActiveFilters.size > 0) {
    results = results.filter(r => Array.from(searchActiveFilters).some(f => r.tags.includes(f)));
  }
  if (q) {
    results = results.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(q.toLowerCase())));
  }
  if (headerEl) {
    headerEl.style.display = results.length ? 'block' : 'none';
    const countEl = headerEl.querySelector('.result-count');
    if (countEl) countEl.textContent = results.length;
  }
  container.innerHTML = '';
  results.forEach(r => {
    const row = document.createElement('div');
    row.className = 'search-result-row';
    row.innerHTML = `
      <div class="search-result-img" style="background:${r.imgBg}">${r.img}</div>
      <div class="search-result-info">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-meta">
          <span>${r.source}</span><span>·</span><span>${r.time}</span><span>·</span>
          <span class="search-result-score">★ ${r.score}%</span><span>·</span>
          <span class="badge ${r.sentimentClass}" style="font-size:10px;padding:2px 6px">${r.sentiment}</span>
        </div>
        <div class="search-result-tags">${r.tags.map(t => `<span class="tag tag-cat">${t}</span>`).join('')}</div>
      </div>`;
    row.addEventListener('click', () => showScreen('article-detail'));
    container.appendChild(row);
  });
}

// Click sui tag del cloud di ricerca
document.addEventListener('click', e => {
  const tag = e.target.closest('.search-tag[data-tag-name]');
  if (!tag) return;
  const name = tag.dataset.tagName;
  searchActiveFilters.has(name) ? searchActiveFilters.delete(name) : searchActiveFilters.add(name);
  renderSearchTagCloud(); renderSearchActiveFilters(); renderSearchResults();
});

// Dropdown categoria ricerca
document.addEventListener('change', e => {
  if (e.target.id === 'search-category-select') {
    searchCategoryFilter = e.target.value;
    renderSearchTagCloud();
  }
});

// Input di ricerca globale
document.addEventListener('input', e => {
  if (e.target.id === 'search-global-input') {
    renderSearchTagCloud(); renderSearchResults();
  }
  if (e.target.id === 'fonti-search-input') renderFontiList();
});

// Apri schermata Ricerca cliccando la search bar della dashboard
document.addEventListener('click', e => {
  const dashInput = e.target.closest('.dash-search-input');
  if (!dashInput) return;
  const activeScreen = document.querySelector('.screen.active');
  if (activeScreen && (activeScreen.id === 'screen-dashboard' || activeScreen.id === 'screen-dashboard-skip')) {
    showScreen('ricerca');
  }
});

// Avatar dropdown (apri/chiudi)
document.addEventListener('click', e => {
  const avatarBtn = e.target.closest('.avatar-btn');
  if (avatarBtn) {
    const wrap = avatarBtn.closest('.avatar-wrapper');
    const dropdown = wrap ? wrap.querySelector('.avatar-dropdown') : null;
    if (dropdown) {
      dropdown.classList.toggle('open');
      e.stopPropagation();
      return;
    }
  }
  // Chiudi se click fuori
  if (!e.target.closest('.avatar-wrapper')) {
    document.querySelectorAll('.avatar-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ═══════════════════════════════════════════════════════════════
// === NUOVA SCHERMATA: GESTISCI FONTI ===
// ═══════════════════════════════════════════════════════════════

let FONTI_STATE = [
  { id:'gazzetta',  group:'istituzionali', icon:'🏛️', name:'Gazzetta Ufficiale',       url:'rss.gazzettaufficiale.it', status:'active',  lastSync:'10 min fa', articles:340, error:null },
  { id:'senato',    group:'istituzionali', icon:'🏛️', name:'Senato della Repubblica',   url:'senato.it/rss',            status:'active',  lastSync:'1h fa',     articles:120, error:null },
  { id:'anac',      group:'istituzionali', icon:'🔒', name:'ANAC',                       url:'anac.it/feed',             status:'active',  lastSync:'30 min fa', articles:80,  error:null },
  { id:'camera',    group:'istituzionali', icon:'⚠️', name:'Camera dei Deputati',        url:'camera.it/RSS',            status:'error',   lastSync:'2 giorni fa',articles:0,  error:'Impossibile raggiungere il feed RSS' },
  { id:'corriere',  group:'nazionali',     icon:'📰', name:'Corriere della Sera',        url:'corriere.it/rss',          status:'active',  lastSync:'5 min fa',  articles:890, error:null },
  { id:'repubblica',group:'nazionali',     icon:'📰', name:'Repubblica',                 url:'repubblica.it/rss',        status:'active',  lastSync:'5 min fa',  articles:760, error:null },
  { id:'custom1',   group:'custom',        icon:'🔗', name:'Feed personalizzato',        url:'miosito.it/feed',          status:'active',  lastSync:'1h fa',     articles:45,  error:null },
];

let collapsedGroups = new Set();
let editingFonteId  = null;

function initFontiScreen() { renderFontiList(); }

function renderFontiList() {
  const searchQ = (document.getElementById('fonti-search-input') || {}).value || '';
  const groups = [
    { id:'istituzionali', label:'Istituzionali' },
    { id:'nazionali',     label:'Testate Nazionali' },
    { id:'custom',        label:'Custom' },
  ];
  groups.forEach(g => {
    const container = document.getElementById(`fonti-group-${g.id}`);
    const countEl   = document.getElementById(`fonti-group-count-${g.id}`);
    if (!container) return;
    let sources = FONTI_STATE.filter(f => f.group === g.id && f.status !== 'removed');
    if (searchQ) sources = sources.filter(f => f.name.toLowerCase().includes(searchQ.toLowerCase()) || f.url.toLowerCase().includes(searchQ.toLowerCase()));
    if (countEl) countEl.textContent = sources.filter(s => s.status === 'active' || s.status === 'retrying').length + ' attive';
    const listEl = container.querySelector('.fonti-group-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    if (sources.length === 0) {
      listEl.innerHTML = '<p class="fonti-empty">Nessuna fonte in questo gruppo</p>';
      return;
    }
    sources.forEach(fonte => {
      const isError    = fonte.status === 'error';
      const isRetrying = fonte.status === 'retrying';
      const row = document.createElement('div');
      row.className = `fonte-row${isError ? ' fonte-row-error' : ''}`;
      row.dataset.fonteId = fonte.id;
      row.innerHTML = `
        <div class="fonte-row-inner">
          <span class="fonte-icon">${isError ? '⚠️' : fonte.icon}</span>
          <div class="fonte-info">
            <span class="fonte-name">${fonte.name}</span>
            <span class="fonte-url">${fonte.url}</span>
            <div class="fonte-status-row">
              <span class="fonte-status-dot ${isError ? 'dot-error' : 'dot-active'}"></span>
              <span class="fonte-status-label ${isError ? 'label-error' : ''}">
                ${isError ? `Errore · Ultima sincronizzazione: ${fonte.lastSync}` : `Attiva · Ultima sincronizzazione: ${fonte.lastSync}`}
              </span>
            </div>
            ${isError ? `<span class="fonte-error-text">${fonte.error}</span>` : `<span class="fonte-articles-count">~${fonte.articles} articoli/mese</span>`}
          </div>
          <div class="fonte-actions">
            ${isRetrying
              ? '<span class="fonte-retrying-label">⟳ Riconnessione...</span>'
              : isError
                ? `<button class="btn btn-sm btn-outline fonte-retry-btn" data-id="${fonte.id}">Riprova</button>`
                : `<button class="btn btn-sm btn-ghost fonte-edit-btn" data-id="${fonte.id}">Modifica</button>`}
            <button class="btn btn-sm btn-ghost fonte-remove-trigger" data-id="${fonte.id}" style="color:var(--sentiment-neg)">✕</button>
          </div>
        </div>
        <div class="fonte-confirm-remove hidden" id="confirm-remove-${fonte.id}">
          <span class="fonte-confirm-text">Rimuovere questa fonte?</span>
          <button class="btn btn-sm fonte-confirm-yes" style="background:var(--sentiment-neg);color:#fff;border:none" data-id="${fonte.id}">Sì, rimuovi</button>
          <button class="btn btn-sm btn-ghost fonte-confirm-no" data-id="${fonte.id}">Annulla</button>
        </div>`;
      listEl.appendChild(row);
    });
  });
}

// Gestione eventi Gestisci Fonti
document.addEventListener('click', e => {
  // Mostra conferma rimozione
  const removeTrigger = e.target.closest('.fonte-remove-trigger');
  if (removeTrigger) {
    const id = removeTrigger.dataset.id;
    document.querySelectorAll('.fonte-confirm-remove').forEach(el => el.classList.add('hidden'));
    const conf = document.getElementById(`confirm-remove-${id}`);
    if (conf) conf.classList.remove('hidden');
    return;
  }
  // Conferma rimozione
  const confirmYes = e.target.closest('.fonte-confirm-yes');
  if (confirmYes) {
    const f = FONTI_STATE.find(x => x.id === confirmYes.dataset.id);
    if (f) f.status = 'removed';
    renderFontiList();
    return;
  }
  // Annulla rimozione
  const confirmNo = e.target.closest('.fonte-confirm-no');
  if (confirmNo) {
    const conf = document.getElementById(`confirm-remove-${confirmNo.dataset.id}`);
    if (conf) conf.classList.add('hidden');
    return;
  }
  // Riprova fonte in errore
  const retryBtn = e.target.closest('.fonte-retry-btn');
  if (retryBtn) {
    const f = FONTI_STATE.find(x => x.id === retryBtn.dataset.id);
    if (!f) return;
    f.status = 'retrying';
    renderFontiList();
    setTimeout(() => { f.status = 'active'; f.icon = '🏛️'; f.lastSync = '1 min fa'; f.articles = 95; f.error = null; renderFontiList(); }, 2000);
    return;
  }
  // Modifica fonte
  const editBtn = e.target.closest('.fonte-edit-btn');
  if (editBtn) { openFonteModal(editBtn.dataset.id); return; }
  // Chiudi modal fonte
  if (e.target.id === 'fonte-modal-overlay' || e.target.id === 'fonte-modal-close' || e.target.id === 'fonte-modal-cancel') { closeFonteModal(); return; }
  // Salva modal fonte
  if (e.target.id === 'fonte-modal-save') { saveFonteModal(); return; }
  // Toggle gruppo collassabile
  const groupHeader = e.target.closest('.fonti-group-header');
  if (groupHeader && groupHeader.closest('#screen-gestisci-fonti')) {
    const gid = groupHeader.dataset.group;
    const listEl = groupHeader.nextElementSibling;
    const toggle = groupHeader.querySelector('.fonti-group-toggle');
    if (collapsedGroups.has(gid)) {
      collapsedGroups.delete(gid);
      if (listEl) listEl.style.display = '';
      if (toggle) toggle.textContent = '▾';
      groupHeader.classList.remove('collapsed');
    } else {
      collapsedGroups.add(gid);
      if (listEl) listEl.style.display = 'none';
      if (toggle) toggle.textContent = '▸';
      groupHeader.classList.add('collapsed');
    }
    return;
  }
  // Aggiungi fonte custom
  if (e.target.id === 'add-fonte-btn') {
    const input = document.getElementById('add-fonte-url');
    const url = input ? input.value.trim() : '';
    if (!url) return;
    FONTI_STATE.push({ id:'custom-'+Date.now(), group:'custom', icon:'🔗', name:url.split('/')[0] || 'Feed custom', url, status:'active', lastSync:'appena ora', articles:0, error:null });
    if (input) input.value = '';
    renderFontiList();
    return;
  }
});

function openFonteModal(id) {
  const fonte = FONTI_STATE.find(f => f.id === id);
  if (!fonte) return;
  editingFonteId = id;
  const overlay = document.getElementById('fonte-modal-overlay');
  if (!overlay) return;
  const nameEl = document.getElementById('fonte-modal-name');
  const urlEl  = document.getElementById('fonte-modal-url');
  if (nameEl) nameEl.value = fonte.name;
  if (urlEl)  urlEl.value  = fonte.url;
  overlay.classList.add('open');
}

function closeFonteModal() {
  const overlay = document.getElementById('fonte-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  editingFonteId = null;
}

function saveFonteModal() {
  const fonte = FONTI_STATE.find(f => f.id === editingFonteId);
  if (!fonte) return;
  const nameEl = document.getElementById('fonte-modal-name');
  const urlEl  = document.getElementById('fonte-modal-url');
  if (nameEl) fonte.name = nameEl.value;
  if (urlEl)  fonte.url  = urlEl.value;
  closeFonteModal();
  renderFontiList();
}

// ═══════════════════════════════════════════════════════════════
// === NUOVA SCHERMATA: IMPOSTAZIONI ===
// ═══════════════════════════════════════════════════════════════

let settingsActiveSection = 'profilo';
let settingsSliderValue   = 70;

function initImpostazioniScreen() {
  showSettingsSection(settingsActiveSection);
  initSettingsSlider();
}

function showSettingsSection(section) {
  settingsActiveSection = section;
  document.querySelectorAll('#screen-impostazioni .settings-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === section);
  });
  document.querySelectorAll('#screen-impostazioni .settings-section').forEach(sec => {
    sec.style.display = sec.dataset.section === section ? 'block' : 'none';
  });
}

function initSettingsSlider() {
  const slider  = document.getElementById('relevance-slider');
  const valueEl = document.getElementById('relevance-value');
  if (!slider || !valueEl) return;
  slider.value = settingsSliderValue;
  valueEl.textContent = settingsSliderValue + '%';
  // Rimuovi vecchi listener clonando il nodo
  const newSlider = slider.cloneNode(true);
  slider.parentNode.replaceChild(newSlider, slider);
  newSlider.addEventListener('input', () => {
    settingsSliderValue = newSlider.value;
    valueEl.textContent = newSlider.value + '%';
  });
}

// Menu sezioni impostazioni
document.addEventListener('click', e => {
  const navItem = e.target.closest('.settings-nav-item');
  if (navItem && navItem.closest('#screen-impostazioni')) {
    showSettingsSection(navItem.dataset.section);
  }
});

// Bottoni "Salva modifiche" → feedback ✓
document.addEventListener('click', e => {
  const saveBtn = e.target.closest('.settings-save-btn');
  if (!saveBtn) return;
  const orig = saveBtn.textContent;
  saveBtn.textContent = '✓ Salvato';
  saveBtn.style.background = 'var(--sentiment-pos)';
  saveBtn.disabled = true;
  setTimeout(() => { saveBtn.textContent = orig; saveBtn.style.background = ''; saveBtn.disabled = false; }, 2000);
});

// Toggle switches
document.addEventListener('click', e => {
  const tog = e.target.closest('.toggle-switch');
  if (tog) tog.classList.toggle('on');
});

// Rimozione chip topic in impostazioni
document.addEventListener('click', e => {
  const rx = e.target.closest('.settings-topic-chip .chip-remove-x');
  if (rx) rx.closest('.settings-topic-chip')?.remove();
});

// Modal "Elimina account"
document.addEventListener('click', e => {
  if (e.target.id === 'delete-account-btn') {
    const m = document.getElementById('delete-account-modal');
    if (m) m.classList.add('open');
    return;
  }
  if (e.target.id === 'delete-confirm-cancel' || e.target.id === 'delete-modal-overlay') {
    closeDeleteModal(); return;
  }
  if (e.target.id === 'delete-confirm-yes') {
    closeDeleteModal(); showScreen('welcome'); return;
  }
});

function closeDeleteModal() {
  const m = document.getElementById('delete-account-modal');
  if (m) m.classList.remove('open');
}

// Chip selezionabili generici (incluso sezione Profilo/AI impostazioni)
document.addEventListener('click', e => {
  const chip = e.target.closest('#screen-impostazioni .chip:not(.settings-topic-chip)');
  if (chip) chip.classList.toggle('selected');
});

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
function init() {
  // Inizializza icone Lucide
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Init topic counter
  updateTopicFeedback();

  // Init sources counter
  updateSourcesCounter();

  // Mostra schermata welcome
  showScreen('welcome');
}

// Avvio
document.addEventListener('DOMContentLoaded', init);
