/* ═══════════════════════════════════════════════════════════════
   SAPRA.AI — Onboarding Wireframe Interactions
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────
// Screen Navigation
// ───────────────────────────────────────────────────────────────
function showScreen(id) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Show target
  const screen = document.getElementById('screen-' + id);
  if (screen) screen.classList.add('active');

  const navBtn = document.getElementById('nav-' + id);
  if (navBtn) navBtn.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger screen-specific init
  if (id === 'step4-loading') initLoadingAnimation();
}

// ───────────────────────────────────────────────────────────────
// Step 1 — Role card toggle (single select)
// ───────────────────────────────────────────────────────────────
function toggleRole(card) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

// ───────────────────────────────────────────────────────────────
// Step 1 — Tag toggle (multi select)
// ───────────────────────────────────────────────────────────────
function toggleTag(tag) {
  tag.classList.toggle('selected');
}

// ───────────────────────────────────────────────────────────────
// Step 2 — Topic tags with chip management
// ───────────────────────────────────────────────────────────────
const ARTICLES_PER_TOPIC = 45; // approx articles per topic per day

function getSelectedTopicCount() {
  return document.querySelectorAll('#step2-suggestions .tag.selected').length;
}

function updateTopicState() {
  const count = getSelectedTopicCount();
  const counterEl = document.getElementById('topic-counter');
  const articleEl = document.getElementById('article-count');
  const ctaBtn = document.getElementById('step2-cta');
  const hintEl = document.querySelector('.ai-hint-sub');

  // Update counter badge
  counterEl.textContent = count + '/3 min.';
  if (count >= 3) {
    counterEl.className = 'counter counter-ok';
  } else {
    counterEl.className = 'counter counter-warn';
  }

  // Update article count estimate
  const est = Math.round(count * ARTICLES_PER_TOPIC * (0.9 + Math.random() * 0.2));
  articleEl.textContent = `Con ${count} topic monitorerai ~${est} art./giorno.`;

  // Update CTA state
  if (count >= 3) {
    ctaBtn.classList.remove('btn-disabled');
    ctaBtn.onclick = () => showScreen('step3');
    if (hintEl) hintEl.textContent = 'Ottimo! Puoi aggiungere altri topic o procedere.';
  } else {
    ctaBtn.classList.add('btn-disabled');
    ctaBtn.onclick = null;
    if (hintEl) hintEl.textContent = `Aggiungi almeno ${3 - count} altro topic.`;
  }

  // Sync chips
  syncChips();
}

function toggleTopicTag(tag) {
  tag.classList.toggle('selected');
  updateTopicState();
}

function syncChips() {
  const chipContainer = document.getElementById('selected-topics');
  if (!chipContainer) return;

  const selectedTags = document.querySelectorAll('#step2-suggestions .tag.selected');
  chipContainer.innerHTML = '';
  selectedTags.forEach(tag => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `${tag.textContent} <button class="chip-remove" onclick="removeTopicByName('${tag.textContent}')">✕</button>`;
    chipContainer.appendChild(chip);
  });

  if (chipContainer.children.length === 0) {
    chipContainer.innerHTML = '<span style="color:var(--gray-400);font-size:12px">Nessun topic selezionato</span>';
  }
}

function removeTopicByName(name) {
  const tags = document.querySelectorAll('#step2-suggestions .tag');
  tags.forEach(tag => {
    if (tag.textContent.trim() === name.trim()) {
      tag.classList.remove('selected');
    }
  });
  updateTopicState();
}

function removeChip(btn) {
  const chip = btn.parentElement;
  chip.remove();
}

function step2Continue() {
  if (getSelectedTopicCount() >= 3) showScreen('step3');
}

// ───────────────────────────────────────────────────────────────
// Step 3 — Custom source form toggle
// ───────────────────────────────────────────────────────────────
function toggleCustom() {
  const form = document.getElementById('custom-form');
  form.classList.toggle('open');
}

// ───────────────────────────────────────────────────────────────
// Step 4 — Loading animation
// ───────────────────────────────────────────────────────────────
const loadingMessages = [
  'Connessione fonti in corso...',
  'Analisi topic selezionati...',
  'Indexing articoli recenti...',
  'Ranking per rilevanza AI...',
  'Ottimizzazione feed personale...',
  'Feed quasi pronto...',
];

let loadingInterval = null;
let messageInterval = null;

function initLoadingAnimation() {
  // Reset
  if (loadingInterval) clearInterval(loadingInterval);
  if (messageInterval) clearInterval(messageInterval);

  const bar = document.getElementById('progress-bar');
  const pct = document.getElementById('progress-pct');
  const msg = document.getElementById('loading-msg');

  if (!bar) return;

  let progress = 0;
  let msgIdx = 0;

  bar.style.width = '0%';
  pct.textContent = '0%';

  // Progress tick
  loadingInterval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      clearInterval(messageInterval);

      // Auto-advance to done after brief pause
      setTimeout(() => {
        if (document.getElementById('screen-step4-loading').classList.contains('active')) {
          showScreen('step4-done');
        }
      }, 800);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
  }, 300);

  // Message rotation
  messageInterval = setInterval(() => {
    msgIdx = (msgIdx + 1) % loadingMessages.length;
    if (msg) {
      msg.style.opacity = '0';
      setTimeout(() => {
        msg.textContent = loadingMessages[msgIdx];
        msg.style.opacity = '1';
      }, 200);
    }
  }, 1800);
}

function skipToResult() {
  if (loadingInterval) clearInterval(loadingInterval);
  if (messageInterval) clearInterval(messageInterval);
  showScreen('step4-done');
}

// ───────────────────────────────────────────────────────────────
// Step 3 — Live source counter
// ───────────────────────────────────────────────────────────────
function updateSourceStats() {
  const checked = document.querySelectorAll('#screen-step3 .source-check:checked').length;
  const statsText = document.querySelector('#screen-step3 .stats-bar');
  if (statsText) {
    const est = Math.round(checked * 55 * (0.9 + Math.random() * 0.2));
    statsText.innerHTML = `<span class="stats-text">Fonti attive: <strong>${checked}</strong></span>
      <span class="stats-sep">·</span>
      <span class="stats-text">~${est} articoli/giorno</span>`;
  }
}

// ───────────────────────────────────────────────────────────────
// Init
// ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Sync initial topic state (Step 2 starts with 2 selected)
  updateTopicState();

  // Attach live listeners to Step 3 checkboxes
  document.querySelectorAll('#screen-step3 .source-check').forEach(cb => {
    cb.addEventListener('change', updateSourceStats);
  });

  // Smooth transition for loading message opacity
  const msg = document.getElementById('loading-msg');
  if (msg) msg.style.transition = 'opacity .2s ease';
});
