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

// ESC per chiudere modal/drawer
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeScriverModal();
    closeDrawer();
  }
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
