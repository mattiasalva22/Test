// ═══════════════════════════════════════════════════════════════
// Sapra.AI — Design System Creator (Figma Plugin)
// Target file: W2MC9fSJC5adK2nSNyxhR9
// ═══════════════════════════════════════════════════════════════

figma.showUI(__html__, { width: 340, height: 340 });

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  // Backgrounds
  { name: 'bg/black',   r: 0,         g: 0,         b: 0,         a: 1   },
  { name: 'bg/surface', r: 23/255,    g: 23/255,    b: 23/255,    a: 1   },
  { name: 'bg/overlay', r: 0,         g: 0,         b: 0,         a: 0.6 },
  // Text
  { name: 'text/primary',   r: 234/255,  g: 234/255,  b: 234/255,  a: 1 },
  { name: 'text/secondary', r: 122/255,  g: 122/255,  b: 122/255,  a: 1 },
  { name: 'text/inverse',   r: 0,        g: 0,        b: 0,        a: 1 },
  // Actions
  { name: 'action/cyan',  r: 0,        g: 1,        b: 221/255,  a: 1 },
  { name: 'action/hover', r: 234/255,  g: 234/255,  b: 234/255,  a: 1 },
  // Semantic
  { name: 'semantic/yellow', r: 1,        g: 174/255,  b: 0,        a: 1 },
  { name: 'semantic/green',  r: 0,        g: 172/255,  b: 58/255,   a: 1 },
  { name: 'semantic/red',    r: 241/255,  g: 51/255,   b: 66/255,   a: 1 },
  { name: 'semantic/grey',   r: 122/255,  g: 122/255,  b: 122/255,  a: 1 },
  // Borders
  { name: 'border/default', r: 122/255, g: 122/255, b: 122/255, a: 1 },
  { name: 'border/subtle',  r: 23/255,  g: 23/255,  b: 23/255,  a: 1 },
];

// Hex strings for display
const HEX = {
  'bg/black': '#000000', 'bg/surface': '#171717', 'bg/overlay': '#000000@60%',
  'text/primary': '#EAEAEA', 'text/secondary': '#7A7A7A', 'text/inverse': '#000000',
  'action/cyan': '#00FFDD', 'action/hover': '#EAEAEA',
  'semantic/yellow': '#FFAE00', 'semantic/green': '#00AC3A',
  'semantic/red': '#F13342', 'semantic/grey': '#7A7A7A',
  'border/default': '#7A7A7A', 'border/subtle': '#171717',
};

const TEXT_TOKENS = [
  {
    name: 'Display/H1',
    fontFamily: 'TeX Gyre Bonum', fontStyle: 'Regular',
    fontSize: 40, lineHeight: { unit: 'PERCENT', value: 120 },
    letterSpacing: { unit: 'PIXELS', value: 0.4 }, textCase: 'ORIGINAL',
  },
  {
    name: 'Display/H2',
    fontFamily: 'TeX Gyre Bonum', fontStyle: 'Regular',
    fontSize: 24, lineHeight: { unit: 'PERCENT', value: 120 },
    letterSpacing: { unit: 'PIXELS', value: 0.24 }, textCase: 'ORIGINAL',
  },
  {
    name: 'Body/H3',
    fontFamily: 'Satoshi', fontStyle: 'Medium',
    fontSize: 20, lineHeight: { unit: 'PERCENT', value: 110 },
    letterSpacing: { unit: 'PIXELS', value: 1 }, textCase: 'ORIGINAL',
  },
  {
    name: 'Body/P',
    fontFamily: 'Satoshi', fontStyle: 'Medium',
    fontSize: 14, lineHeight: { unit: 'PERCENT', value: 120 },
    letterSpacing: { unit: 'PIXELS', value: 0.7 }, textCase: 'ORIGINAL',
  },
  {
    name: 'Body/P-Regular',
    fontFamily: 'Satoshi', fontStyle: 'Regular',
    fontSize: 14, lineHeight: { unit: 'PERCENT', value: 130 },
    letterSpacing: { unit: 'PIXELS', value: 0.7 }, textCase: 'ORIGINAL',
  },
  {
    name: 'Body/Small',
    fontFamily: 'Satoshi', fontStyle: 'Medium',
    fontSize: 12, lineHeight: { unit: 'PERCENT', value: 120 },
    letterSpacing: { unit: 'PIXELS', value: 0.5 }, textCase: 'ORIGINAL',
  },
  {
    name: 'UI/Label',
    fontFamily: 'IBM Plex Mono', fontStyle: 'Regular',
    fontSize: 10, lineHeight: { unit: 'PERCENT', value: 100 },
    letterSpacing: { unit: 'PIXELS', value: 1 }, textCase: 'UPPER',
  },
];

// Storage for created style IDs (keyed by token name)
const styleIds = {};
// Loaded fonts cache
const loadedFonts = new Set();

// ─────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────

function colorKey(name) { return 'c:' + name; }
function textKey(name)  { return 't:' + name; }

function getToken(name) {
  return COLOR_TOKENS.find(t => t.name === name) || { r: 1, g: 0, b: 1, a: 1 }; // magenta = bug
}

function solidPaint(token, opacity) {
  const o = opacity !== undefined ? opacity : token.a;
  return [{ type: 'SOLID', color: { r: token.r, g: token.g, b: token.b }, opacity: o }];
}

function setFill(node, tokenName, opacity) {
  const t = getToken(tokenName);
  const sid = styleIds[colorKey(tokenName)];
  if (sid) {
    try { node.fillStyleId = sid; return; } catch (_) {}
  }
  node.fills = solidPaint(t, opacity);
}

function setStroke(node, tokenName, weight) {
  const t = getToken(tokenName);
  node.strokes = [{ type: 'SOLID', color: { r: t.r, g: t.g, b: t.b }, opacity: 1 }];
  node.strokeWeight = weight || 1;
  node.strokeAlign = 'INSIDE';
}

function noFill(node) { node.fills = []; }
function noStroke(node) { node.strokes = []; }

function autoLayout(node, dir, gap, pt, pr, pb, pl) {
  node.layoutMode = dir === 'h' ? 'HORIZONTAL' : 'VERTICAL';
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'AUTO';
  node.itemSpacing = gap || 0;
  node.paddingTop    = pt !== undefined ? pt : 0;
  node.paddingRight  = pr !== undefined ? pr : 0;
  node.paddingBottom = pb !== undefined ? pb : 0;
  node.paddingLeft   = pl !== undefined ? pl : 0;
}

async function ensureFont(family, style) {
  const key = family + '|' + style;
  if (loadedFonts.has(key)) return true;
  try {
    await figma.loadFontAsync({ family, style });
    loadedFonts.add(key);
    return true;
  } catch (_) {
    return false;
  }
}

async function makeText(chars, textTokenName, colorTokenName) {
  const token = TEXT_TOKENS.find(t => t.name === textTokenName);
  const font = token
    ? { family: token.fontFamily, style: token.fontStyle }
    : { family: 'Inter', style: 'Regular' };

  await ensureFont(font.family, font.style);

  const node = figma.createText();
  try { node.fontName = font; } catch (_) {}
  node.characters = chars;

  const tsid = styleIds[textKey(textTokenName)];
  if (tsid) { try { node.textStyleId = tsid; } catch (_) {} }

  if (colorTokenName) setFill(node, colorTokenName);
  return node;
}

function hug(node) {
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'AUTO';
}

function fillParent(node) {
  node.layoutSizingHorizontal = 'FILL';
}

function rect(w, h, colorTokenName, radius) {
  const r = figma.createRectangle();
  r.resize(w, h);
  if (colorTokenName) setFill(r, colorTokenName);
  else noFill(r);
  if (radius) r.cornerRadius = radius;
  return r;
}

// Inline icon placeholder (named rectangle for Phosphor icons)
function icon(iconName, size, colorToken) {
  const r = figma.createRectangle();
  r.name = iconName;
  r.resize(size, size);
  if (colorToken) setFill(r, colorToken);
  else noFill(r);
  return r;
}

// ─────────────────────────────────────────────────────────────
// STYLE CREATION
// ─────────────────────────────────────────────────────────────

async function createColorStyles() {
  ui('log', '  Creating color styles…', 'inf');
  for (const token of COLOR_TOKENS) {
    const style = figma.createPaintStyle();
    style.name = token.name;
    style.paints = [{
      type: 'SOLID',
      color: { r: token.r, g: token.g, b: token.b },
      opacity: token.a,
    }];
    styleIds[colorKey(token.name)] = style.id;
  }
  ui('log', `  ✓ ${COLOR_TOKENS.length} color styles`, 'ok');
}

async function createTextStyles() {
  ui('log', '  Creating text styles…', 'inf');
  let created = 0;
  for (const token of TEXT_TOKENS) {
    const ok = await ensureFont(token.fontFamily, token.fontStyle);
    if (!ok) await ensureFont('Inter', 'Regular'); // fallback

    const style = figma.createTextStyle();
    style.name = token.name;
    try {
      style.fontName = { family: token.fontFamily, style: token.fontStyle };
    } catch (_) {
      style.fontName = { family: 'Inter', style: 'Regular' };
    }
    style.fontSize = token.fontSize;
    style.lineHeight = token.lineHeight;
    style.letterSpacing = token.letterSpacing;
    if (token.textCase) style.textCase = token.textCase;

    styleIds[textKey(token.name)] = style.id;
    created++;
  }
  ui('log', `  ✓ ${created} text styles`, 'ok');
}

// ─────────────────────────────────────────────────────────────
// COMPONENT BUILDERS
// ─────────────────────────────────────────────────────────────

// All components are created at current-page level then repositioned.
// We collect them to arrange into a hidden "Library" frame afterwards.

// ── Divider ──────────────────────────────────────────────────
function buildDivider() {
  const comp = figma.createComponent();
  comp.name = 'Divider';
  comp.description = 'Horizontal separator. 1px height, border/subtle color. Width: fill container.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(360, 1);
  setFill(comp, 'border/subtle');
  noStroke(comp);
  return comp;
}

// ── Tag / Filter ──────────────────────────────────────────────
async function buildTagFilter() {
  async function variant(state) {
    const comp = figma.createComponent();
    comp.name = `State=${state}`;
    autoLayout(comp, 'h', 8, 0, 12, 0, 12);
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(10, 46);
    comp.primaryAxisSizingMode = 'AUTO';
    setFill(comp, 'bg/surface');
    comp.cornerRadius = 5; // radius/sm

    if (state === 'Selected') setStroke(comp, 'border/default', 1);
    else noStroke(comp);

    const lbl = await makeText('Politica', 'Body/P', 'text/primary');
    comp.appendChild(lbl);

    if (state === 'Selected') {
      const check = icon('ph:check-circle', 16, 'text/primary');
      comp.appendChild(check);
    }
    return comp;
  }

  const d = await variant('Default');
  const s = await variant('Selected');
  const set = figma.combineAsVariants([d, s], figma.currentPage);
  set.name = 'Tag/Filter';
  set.description = 'Onboarding topic filter chip. Default / Selected states.';
  return set;
}

// ── Tag / Category ────────────────────────────────────────────
async function buildTagCategory() {
  const comp = figma.createComponent();
  comp.name = 'Tag/Category';
  comp.description = 'Article card category badge. Width is always hugging (auto) — FIX for truncation bug.';
  autoLayout(comp, 'h', 0, 5, 10, 5, 10);
  comp.counterAxisAlignItems = 'CENTER';
  hug(comp);
  setFill(comp, 'bg/black');
  noStroke(comp);
  comp.cornerRadius = 5; // radius/sm — all 4 corners equally (FIX)

  const lbl = await makeText('TECNOLOGIA', 'UI/Label', 'text/primary');
  comp.appendChild(lbl);
  return comp;
}

// ── Badge / Sentiment ─────────────────────────────────────────
async function buildBadgeSentiment() {
  const variants = [
    { tone: 'Neutro',   color: 'semantic/yellow', text: 'SENTIMENT NEUTRO' },
    { tone: 'Positivo', color: 'semantic/green',  text: 'SENTIMENT POSITIVO' },
    { tone: 'Negativo', color: 'semantic/red',    text: 'SENTIMENT NEGATIVO' },
  ];

  const comps = [];
  for (const v of variants) {
    const comp = figma.createComponent();
    comp.name = `Tone=${v.tone}`;
    autoLayout(comp, 'h', 0, 5, 10, 5, 10);
    comp.counterAxisAlignItems = 'CENTER';
    hug(comp);
    setFill(comp, v.color);
    noStroke(comp);
    comp.cornerRadius = 5; // radius/sm

    const lbl = await makeText(v.text, 'UI/Label', 'text/inverse');
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'Badge/Sentiment';
  set.description = 'Sentiment badge. Tone: Neutro / Positivo / Negativo.';
  return set;
}

// ── Checkbox ──────────────────────────────────────────────────
async function buildCheckbox() {
  const comps = [];
  for (const state of ['Checked', 'Unchecked']) {
    const comp = figma.createComponent();
    comp.name = `State=${state}`;
    autoLayout(comp, 'h', 6, 0, 0, 0, 0);
    comp.counterAxisAlignItems = 'CENTER';
    noFill(comp);
    noStroke(comp);
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(10, 25);
    comp.primaryAxisSizingMode = 'AUTO';

    const ic = icon(
      state === 'Checked' ? 'ph:check-square' : 'ph:square',
      16, 'text/primary'
    );
    comp.appendChild(ic);

    const lbl = await makeText('Label', 'Body/P', 'text/primary');
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'Checkbox';
  set.description = 'Checkbox with label. State: Checked / Unchecked.';
  return set;
}

// ── Nav Item ─────────────────────────────────────────────────
async function buildNavItem() {
  const comps = [];
  for (const state of ['Active', 'Default']) {
    const comp = figma.createComponent();
    comp.name = `State=${state}`;
    autoLayout(comp, 'h', 8, 6, 12, 6, 12);
    comp.counterAxisAlignItems = 'CENTER';
    comp.cornerRadius = 5; // radius/sm — ALWAYS 5px (FIX: never 10px)
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'AUTO';
    comp.resize(200, 10);
    comp.counterAxisSizingMode = 'AUTO';

    if (state === 'Active') setFill(comp, 'text/primary');
    else noFill(comp);
    noStroke(comp);

    const ic = icon('ph:house', 16, state === 'Active' ? 'text/inverse' : 'text/primary');
    comp.appendChild(ic);

    const lbl = await makeText('Panoramica', 'Body/P',
      state === 'Active' ? 'text/inverse' : 'text/primary');
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'NavItem';
  set.description = 'Sidebar nav item. State: Active / Default. Radius is ALWAYS 5px (radius/sm).';
  return set;
}

// ── Sidebar Label ─────────────────────────────────────────────
async function buildSidebarLabel() {
  const comp = figma.createComponent();
  comp.name = 'SidebarLabel';
  comp.description = 'Sidebar section header. E.g. "I TUOI TOPICS", "FONTI ATTIVE".';
  autoLayout(comp, 'h', 0, 0, 0, 0, 12);
  comp.counterAxisAlignItems = 'CENTER';
  noFill(comp);
  noStroke(comp);
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(200, 25);

  const lbl = await makeText('I TUOI TOPICS', 'UI/Label', 'text/secondary');
  comp.appendChild(lbl);
  return comp;
}

// ── Button ────────────────────────────────────────────────────
async function buildButtons() {
  const configs = [
    { type: 'Primary',   state: 'Default',  fill: 'bg/surface', text: 'text/inverse', label: 'Continua',          h: 46, px: 48, r: 5 },
    { type: 'Primary',   state: 'Hover',    fill: 'action/hover',text: 'text/inverse', label: 'Continua',          h: 46, px: 48, r: 5 },
    { type: 'Primary',   state: 'Disabled', fill: 'bg/surface', text: 'text/secondary',label: 'Continua',         h: 46, px: 48, r: 5, opacity: 0.4 },
    { type: 'Secondary', state: 'Default',  fill: null,          text: 'text/secondary',label: '← Indietro',       h: 46, px: 0,  r: 10 },
    { type: 'Secondary', state: 'Hover',    fill: null,          text: 'text/primary',  label: '← Indietro',       h: 46, px: 0,  r: 10 },
    { type: 'Ghost',     state: 'Default',  fill: null,          text: 'action/cyan',   label: '+ Aggiungi topic', h: null, px: 0, r: 0 },
    { type: 'Ghost',     state: 'Hover',    fill: null,          text: 'action/hover',  label: '+ Aggiungi topic', h: null, px: 0, r: 0 },
  ];

  const comps = [];
  for (const c of configs) {
    const comp = figma.createComponent();
    comp.name = `Type=${c.type}, State=${c.state}`;
    comp.description = `${c.type} button — ${c.state}`;
    autoLayout(comp, 'h', 8, 0, c.px, 0, c.px);
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'AUTO';

    if (c.fill) setFill(comp, c.fill);
    else noFill(comp);
    noStroke(comp);
    if (c.r) comp.cornerRadius = c.r;
    if (c.opacity) comp.opacity = c.opacity;

    if (c.h) {
      comp.counterAxisSizingMode = 'FIXED';
      comp.resize(10, c.h);
      comp.primaryAxisSizingMode = 'AUTO';
    } else {
      comp.counterAxisSizingMode = 'AUTO';
    }

    const lbl = await makeText(c.label, 'Body/P', c.text);
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'Button';
  set.description = 'Button. Type: Primary / Secondary / Ghost. State: Default / Hover / Disabled.';
  return set;
}

// ── Input ─────────────────────────────────────────────────────
async function buildInputs() {
  const configs = [
    { state: 'Default',     textColor: 'text/primary',   stroke: null },
    { state: 'Placeholder', textColor: 'text/secondary',  stroke: null },
    { state: 'Active',      textColor: 'text/primary',   stroke: 'border/default' },
    { state: 'Error',       textColor: 'text/primary',   stroke: 'semantic/red' },
  ];

  const comps = [];
  for (const c of configs) {
    const comp = figma.createComponent();
    comp.name = `State=${c.state}`;
    comp.description = `Input field — ${c.state}`;
    autoLayout(comp, 'h', 0, 0, 12, 0, 12);
    comp.counterAxisAlignItems = 'CENTER';
    setFill(comp, 'bg/surface');
    comp.cornerRadius = 5; // radius/sm
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(360, 46);

    if (c.stroke) setStroke(comp, c.stroke, 1);
    else noStroke(comp);

    const placeholder = c.state === 'Placeholder' ? 'Cerca…' : 'Testo inserito…';
    const lbl = await makeText(placeholder, 'Body/P', c.textColor);
    lbl.layoutSizingHorizontal = 'FILL';
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'Input';
  set.description = 'Text input. State: Default / Placeholder / Active / Error.';
  return set;
}

// ── Alert Card ────────────────────────────────────────────────
async function buildAlertCards() {
  const configs = [
    {
      type: 'Trending',
      iconName: 'ph:trend-up', labelText: 'TOPIC IN CRESCITA', labelColor: 'semantic/yellow',
      title: 'Intelligenza Artificiale nel giornalismo',
      desc: 'Crescita del 47% nelle menzioni. Opportunità di posizionamento editoriale.',
    },
    {
      type: 'Opportunity',
      iconName: 'ph:lightbulb', labelText: 'OPPORTUNITÀ', labelColor: 'semantic/green',
      title: 'Nuovo report ESG da pubblicare',
      desc: 'Finestra temporale ottimale nelle prossime 48 ore.',
    },
    {
      type: 'Deadline',
      iconName: 'ph:calendar-blank', labelText: 'IN SCADENZA OGGI', labelColor: 'semantic/red',
      title: 'Pubblicare aggiornamento policy privacy',
      desc: 'Deadline entro fine giornata. 3 articoli in coda.',
    },
  ];

  const comps = [];
  for (const c of configs) {
    const comp = figma.createComponent();
    comp.name = `Type=${c.type}`;
    comp.description = `Alert card — ${c.type}`;
    autoLayout(comp, 'v', 24, 24, 24, 24, 24);
    setFill(comp, 'bg/surface');
    noStroke(comp);
    comp.cornerRadius = 10; // radius/md
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(357, 220);

    // Header row: icon + label
    const header = figma.createFrame();
    header.name = 'Header';
    autoLayout(header, 'h', 8, 0, 0, 0, 0);
    header.counterAxisAlignItems = 'CENTER';
    noFill(header); noStroke(header); hug(header);

    const ic = icon(c.iconName, 16, c.labelColor);
    header.appendChild(ic);

    const headerLbl = await makeText(c.labelText, 'UI/Label', c.labelColor);
    header.appendChild(headerLbl);
    comp.appendChild(header);

    // Title
    const title = await makeText(c.title, 'Body/H3', 'text/primary');
    title.layoutSizingHorizontal = 'FILL';
    comp.appendChild(title);

    // Description
    const desc = await makeText(c.desc, 'Body/P', 'text/secondary');
    desc.layoutSizingHorizontal = 'FILL';
    comp.appendChild(desc);

    // Ghost link
    const link = await makeText('Vedi articoli ›', 'Body/P', 'action/cyan');
    comp.appendChild(link);

    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'AlertCard';
  set.description = 'Alert card. Type: Trending / Opportunity / Deadline.';
  return set;
}

// ── Card Articolo ─────────────────────────────────────────────
async function buildCardArticolo() {
  const comp = figma.createComponent();
  comp.name = 'CardArticolo';
  comp.description = 'Article card. Bookmark icon always at top:24 right:24 (FIX). Tag/Category always hugging width (FIX).';
  autoLayout(comp, 'v', 24, 24, 24, 24, 24);
  setFill(comp, 'bg/surface');
  noStroke(comp);
  comp.cornerRadius = 10; // radius/md
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(357, 10);
  comp.counterAxisSizingMode = 'AUTO';

  // Image placeholder
  const img = rect(309, 182, null, 5);
  img.name = 'Image';
  const pt = getToken('text/primary');
  img.fills = [{ type: 'SOLID', color: { r: pt.r, g: pt.g, b: pt.b }, opacity: 0.08 }];
  img.layoutSizingHorizontal = 'FILL';
  comp.appendChild(img);

  // Metadata row
  const metaRow = figma.createFrame();
  metaRow.name = 'Metadata';
  autoLayout(metaRow, 'h', 0, 0, 0, 0, 0);
  metaRow.counterAxisAlignItems = 'CENTER';
  metaRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  noFill(metaRow); noStroke(metaRow);
  metaRow.primaryAxisSizingMode = 'FILL';
  metaRow.counterAxisSizingMode = 'AUTO';
  metaRow.layoutSizingHorizontal = 'FILL';

  const dateT = await makeText('12 Mar 2024', 'UI/Label', 'text/secondary');
  metaRow.appendChild(dateT);
  const sourceT = await makeText('Il Sole 24 Ore', 'UI/Label', 'text/secondary');
  metaRow.appendChild(sourceT);
  comp.appendChild(metaRow);

  // Title
  const title = await makeText('L\'intelligenza artificiale trasforma il giornalismo italiano', 'Body/H3', 'text/primary');
  title.layoutSizingHorizontal = 'FILL';
  comp.appendChild(title);

  // Abstract (fixed height 55px, overflow hidden)
  const abstract = await makeText(
    'Il settore mediatico sta vivendo una trasformazione profonda grazie all\'IA. I redattori sperimentano nuovi workflow…',
    'Body/P', 'text/secondary'
  );
  abstract.layoutSizingHorizontal = 'FILL';
  abstract.textAutoResize = 'NONE';
  abstract.resize(309, 55);
  comp.appendChild(abstract);

  // Divider 1
  const div1 = rect(309, 1, 'border/subtle');
  div1.name = 'Divider';
  div1.layoutSizingHorizontal = 'FILL';
  comp.appendChild(div1);

  // Sentiment row
  const sentRow = figma.createFrame();
  sentRow.name = 'SentimentRow';
  autoLayout(sentRow, 'h', 8, 0, 0, 0, 0);
  sentRow.counterAxisAlignItems = 'CENTER';
  sentRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  noFill(sentRow); noStroke(sentRow);
  sentRow.primaryAxisSizingMode = 'FILL';
  sentRow.counterAxisSizingMode = 'AUTO';
  sentRow.layoutSizingHorizontal = 'FILL';

  // Sentiment badge placeholder
  const sentBadge = figma.createFrame();
  sentBadge.name = 'Badge/Sentiment ↗ instance';
  autoLayout(sentBadge, 'h', 0, 5, 10, 5, 10);
  sentBadge.counterAxisAlignItems = 'CENTER';
  hug(sentBadge);
  setFill(sentBadge, 'semantic/yellow');
  sentBadge.cornerRadius = 5;
  const sentLbl = await makeText('SENTIMENT NEUTRO', 'UI/Label', 'text/inverse');
  sentBadge.appendChild(sentLbl);
  sentRow.appendChild(sentBadge);

  // Relevance score
  const relevRow = figma.createFrame();
  relevRow.name = 'RelevanceScore';
  autoLayout(relevRow, 'h', 4, 0, 0, 0, 0);
  relevRow.counterAxisAlignItems = 'CENTER';
  noFill(relevRow); noStroke(relevRow); hug(relevRow);
  const starIc = icon('ph:star', 16, 'text/primary');
  relevRow.appendChild(starIc);
  const pct = await makeText('87%', 'UI/Label', 'text/primary');
  relevRow.appendChild(pct);
  sentRow.appendChild(relevRow);

  comp.appendChild(sentRow);

  // Divider 2
  const div2 = rect(309, 1, 'border/subtle');
  div2.name = 'Divider';
  div2.layoutSizingHorizontal = 'FILL';
  comp.appendChild(div2);

  // Categories section
  const catsSection = figma.createFrame();
  catsSection.name = 'Categories';
  autoLayout(catsSection, 'v', 8, 0, 0, 0, 0);
  noFill(catsSection); noStroke(catsSection);
  catsSection.primaryAxisSizingMode = 'AUTO';
  catsSection.counterAxisSizingMode = 'FILL';
  catsSection.layoutSizingHorizontal = 'FILL';

  const catsLbl = await makeText('CATEGORIE', 'UI/Label', 'text/secondary');
  catsSection.appendChild(catsLbl);

  const tagsRow = figma.createFrame();
  tagsRow.name = 'Tags';
  autoLayout(tagsRow, 'h', 6, 0, 0, 0, 0);
  noFill(tagsRow); noStroke(tagsRow); hug(tagsRow);

  for (const cat of ['TECNOLOGIA', 'OPEN AI']) {
    const tag = figma.createFrame();
    tag.name = `Tag/Category — ${cat}`;
    autoLayout(tag, 'h', 0, 5, 10, 5, 10);
    tag.counterAxisAlignItems = 'CENTER';
    hug(tag);
    setFill(tag, 'bg/black');
    noStroke(tag);
    tag.cornerRadius = 5; // all 4 corners — FIX for asymmetric radius bug
    const tl = await makeText(cat, 'UI/Label', 'text/primary');
    tag.appendChild(tl);
    tagsRow.appendChild(tag);
  }
  catsSection.appendChild(tagsRow);
  comp.appendChild(catsSection);

  // Bookmark note (absolute position documented in name)
  const bookmarkNote = icon('ph:bookmark-simple', 26, 'text/primary');
  bookmarkNote.name = 'Bookmark — position: top:24 right:24 (absolute, FIX)';
  comp.appendChild(bookmarkNote);

  return comp;
}

// ── Drawer Articolo ───────────────────────────────────────────
async function buildDrawer() {
  const comp = figma.createComponent();
  comp.name = 'DrawerArticolo';
  comp.description = 'Article detail drawer. 720px wide, full height. Body text uses Body/P-Regular (Satoshi Regular 400), NOT Medium.';
  autoLayout(comp, 'v', 48, 48, 64, 64, 64);
  setFill(comp, 'bg/surface');
  noStroke(comp);
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(720, 10);
  comp.counterAxisSizingMode = 'AUTO';

  // Close button
  const closeRow = figma.createFrame();
  closeRow.name = 'Close';
  autoLayout(closeRow, 'h', 8, 0, 0, 0, 0);
  closeRow.counterAxisAlignItems = 'CENTER';
  noFill(closeRow); noStroke(closeRow); hug(closeRow);
  closeRow.appendChild(icon('ph:x', 12, 'text/secondary'));
  const closeLbl = await makeText('Chiudi', 'Body/P', 'text/secondary');
  closeRow.appendChild(closeLbl);
  comp.appendChild(closeRow);

  // Image
  const img = rect(592, 311, null, 10);
  img.name = 'Image';
  const pt = getToken('text/primary');
  img.fills = [{ type: 'SOLID', color: { r: pt.r, g: pt.g, b: pt.b }, opacity: 0.08 }];
  img.layoutSizingHorizontal = 'FILL';
  comp.appendChild(img);

  // Metadata
  const meta = await makeText('12 Mar 2024  ·  Il Sole 24 Ore', 'UI/Label', 'text/secondary');
  comp.appendChild(meta);

  // Title
  const title = await makeText('L\'intelligenza artificiale trasforma il giornalismo italiano', 'Body/H3', 'text/primary');
  title.layoutSizingHorizontal = 'FILL';
  comp.appendChild(title);

  // Article body text — uses Body/P-Regular (FIX!)
  const body = await makeText(
    'Il settore mediatico italiano sta attraversando una trasformazione senza precedenti grazie all\'adozione di strumenti basati sull\'intelligenza artificiale. Dalle redazioni dei grandi quotidiani alle testate digitali indipendenti, i giornalisti stanno sperimentando nuovi workflow che integrano l\'IA nei processi editoriali quotidiani.\n\nQuesto cambiamento non riguarda solo la velocità di produzione dei contenuti, ma investe anche la qualità dell\'analisi, la capacità di identificare notizie rilevanti e la personalizzazione dell\'esperienza di lettura.',
    'Body/P-Regular', 'text/primary'
  );
  body.layoutSizingHorizontal = 'FILL';
  comp.appendChild(body);

  // Badges row
  const badgesRow = figma.createFrame();
  badgesRow.name = 'Badges';
  autoLayout(badgesRow, 'h', 12, 0, 0, 0, 0);
  badgesRow.counterAxisAlignItems = 'CENTER';
  noFill(badgesRow); noStroke(badgesRow); hug(badgesRow);

  const sentBadge = figma.createFrame();
  sentBadge.name = 'Badge/Sentiment ↗ instance';
  autoLayout(sentBadge, 'h', 0, 5, 10, 5, 10);
  sentBadge.counterAxisAlignItems = 'CENTER';
  hug(sentBadge);
  setFill(sentBadge, 'semantic/yellow');
  sentBadge.cornerRadius = 5;
  const sbl = await makeText('SENTIMENT NEUTRO', 'UI/Label', 'text/inverse');
  sentBadge.appendChild(sbl);
  badgesRow.appendChild(sentBadge);

  const relRow = figma.createFrame();
  relRow.name = 'RelevanceScore';
  autoLayout(relRow, 'h', 4, 0, 0, 0, 0);
  relRow.counterAxisAlignItems = 'CENTER';
  noFill(relRow); noStroke(relRow); hug(relRow);
  relRow.appendChild(icon('ph:star', 16, 'text/primary'));
  const rPct = await makeText('87%', 'UI/Label', 'text/primary');
  relRow.appendChild(rPct);
  badgesRow.appendChild(relRow);
  comp.appendChild(badgesRow);

  // Divider + CATEGORIE
  const addSection = async (labelText, items) => {
    const d = rect(592, 1, 'border/subtle');
    d.name = 'Divider';
    d.layoutSizingHorizontal = 'FILL';
    comp.appendChild(d);

    const sectionLbl = await makeText(labelText, 'UI/Label', 'text/secondary');
    comp.appendChild(sectionLbl);

    for (const item of items) {
      comp.appendChild(item);
    }
  };

  // Categories
  const catsRow = figma.createFrame();
  catsRow.name = 'Tags';
  autoLayout(catsRow, 'h', 6, 0, 0, 0, 0);
  noFill(catsRow); noStroke(catsRow); hug(catsRow);
  for (const cat of ['TECNOLOGIA', 'OPEN AI']) {
    const tag = figma.createFrame();
    autoLayout(tag, 'h', 0, 5, 10, 5, 10);
    tag.counterAxisAlignItems = 'CENTER';
    hug(tag);
    setFill(tag, 'bg/black');
    noStroke(tag);
    tag.cornerRadius = 5;
    const tl = await makeText(cat, 'UI/Label', 'text/primary');
    tag.appendChild(tl);
    catsRow.appendChild(tag);
  }
  await addSection('CATEGORIE', [catsRow]);

  // Actions
  const actionItems = [];
  for (const action of [
    { ic: 'ph:copy-simple', label: 'Copia testo' },
    { ic: 'ph:arrow-square-in', label: 'Apri con Scriver.ai' },
  ]) {
    const row = figma.createFrame();
    row.name = action.label;
    autoLayout(row, 'h', 12, 0, 0, 0, 0);
    row.counterAxisAlignItems = 'CENTER';
    noFill(row); noStroke(row); hug(row);
    row.appendChild(icon(action.ic, 16, 'text/primary'));
    // Actions use Body/P-Regular (intentional — confirmed in spec)
    const al = await makeText(action.label, 'Body/P-Regular', 'text/primary');
    row.appendChild(al);
    actionItems.push(row);
  }
  await addSection('AZIONI', actionItems);

  // Share
  const shareItems = [];
  for (const p of ['Whatsapp', 'Facebook', 'Telegram', 'LinkedIn', 'X.com']) {
    const row = figma.createFrame();
    row.name = p;
    autoLayout(row, 'h', 12, 0, 0, 0, 0);
    row.counterAxisAlignItems = 'CENTER';
    noFill(row); noStroke(row); hug(row);
    row.appendChild(icon(`ph:${p.toLowerCase()}-logo`, 16, 'text/primary'));
    const pl = await makeText(p, 'Body/P', 'text/primary');
    row.appendChild(pl);
    shareItems.push(row);
  }
  await addSection('CONDIVIDI', shareItems);

  // Related articles
  const relD = rect(592, 1, 'border/subtle');
  relD.name = 'Divider';
  relD.layoutSizingHorizontal = 'FILL';
  comp.appendChild(relD);

  const relTitle = await makeText('Articoli correlati', 'Body/H3', 'text/primary');
  comp.appendChild(relTitle);

  for (let i = 0; i < 2; i++) {
    const relMeta = await makeText('12 Mar 2024  ·  Repubblica', 'UI/Label', 'text/secondary');
    comp.appendChild(relMeta);
    const relT = await makeText('Titolo articolo correlato numero ' + (i + 1), 'Body/P', 'text/primary');
    relT.layoutSizingHorizontal = 'FILL';
    comp.appendChild(relT);
    const relSentRow = figma.createFrame();
    autoLayout(relSentRow, 'h', 0, 5, 10, 5, 10);
    relSentRow.counterAxisAlignItems = 'CENTER';
    hug(relSentRow);
    setFill(relSentRow, 'semantic/green');
    relSentRow.cornerRadius = 5;
    const rsl = await makeText('SENTIMENT POSITIVO', 'UI/Label', 'text/inverse');
    relSentRow.appendChild(rsl);
    comp.appendChild(relSentRow);
    if (i < 1) {
      const relDd = rect(592, 1, 'border/subtle');
      relDd.layoutSizingHorizontal = 'FILL';
      comp.appendChild(relDd);
    }
  }

  return comp;
}

// ── Header ────────────────────────────────────────────────────
async function buildHeader() {
  const comps = [];
  for (const type of ['Onboarding', 'Dashboard']) {
    const comp = figma.createComponent();
    comp.name = `Type=${type}`;
    comp.description = `App header — ${type}`;
    autoLayout(comp, 'h', 0, 18, 24, 18, 24);
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
    setFill(comp, 'bg/surface');
    noStroke(comp);
    comp.cornerRadius = 10; // radius/md
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'AUTO';
    comp.resize(800, 10);
    comp.counterAxisSizingMode = 'AUTO';

    // Logo area
    const logoArea = figma.createFrame();
    logoArea.name = 'Logo';
    autoLayout(logoArea, 'h', 12, 0, 0, 0, 0);
    logoArea.counterAxisAlignItems = 'CENTER';
    noFill(logoArea); noStroke(logoArea); hug(logoArea);
    const logoIc = icon('logo-icon', 25, 'text/primary');
    logoIc.resize(25, 25);
    logoArea.appendChild(logoIc);
    const logoWm = icon('logo-wordmark', 80, 'text/primary');
    logoWm.resize(80, 20);
    logoArea.appendChild(logoWm);
    comp.appendChild(logoArea);

    if (type === 'Dashboard') {
      const userArea = figma.createFrame();
      userArea.name = 'UserInfo';
      autoLayout(userArea, 'h', 8, 0, 0, 0, 0);
      userArea.counterAxisAlignItems = 'CENTER';
      noFill(userArea); noStroke(userArea); hug(userArea);

      const avatar = rect(21, 20, 'text/secondary', 10);
      avatar.name = 'avatar';
      userArea.appendChild(avatar);

      const name = await makeText('Donatella', 'Body/P', 'text/primary');
      userArea.appendChild(name);

      const caret = await makeText('›', 'Body/P', 'text/primary');
      userArea.appendChild(caret);

      comp.appendChild(userArea);
    }

    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'Header';
  set.description = 'App header. Type: Onboarding / Dashboard.';
  return set;
}

// ── Social Share Item ─────────────────────────────────────────
async function buildSocialShare() {
  const platforms = [
    { name: 'Whatsapp',  icon: 'ph:whatsapp-logo' },
    { name: 'Facebook',  icon: 'ph:facebook-logo' },
    { name: 'Telegram',  icon: 'ph:telegram-logo' },
    { name: 'LinkedIn',  icon: 'ph:linkedin-logo' },
    { name: 'X',         icon: 'ph:x-logo' },
  ];

  const comps = [];
  for (const p of platforms) {
    const comp = figma.createComponent();
    comp.name = `Platform=${p.name}`;
    comp.description = `Social share — ${p.name}`;
    autoLayout(comp, 'h', 12, 0, 0, 0, 0);
    comp.counterAxisAlignItems = 'CENTER';
    noFill(comp); noStroke(comp); hug(comp);

    comp.appendChild(icon(p.icon, 16, 'text/primary'));
    const lbl = await makeText(`Condividi su ${p.name}`, 'Body/P', 'text/primary');
    comp.appendChild(lbl);
    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'SocialShare';
  set.description = 'Social share item. Platform: Whatsapp / Facebook / Telegram / LinkedIn / X.';
  return set;
}

// ─────────────────────────────────────────────────────────────
// DS PAGE LAYOUT
// ─────────────────────────────────────────────────────────────

const SECTION_W = 1280;
const SECTION_GAP = 80;

async function makeSection(page, name, items, height, sectionX) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(SECTION_W, height);
  frame.x = sectionX;
  frame.y = 0;
  setFill(frame, 'bg/black');
  noStroke(frame);
  frame.cornerRadius = 10;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 40;
  frame.paddingLeft = 40;
  frame.paddingRight = 40;
  frame.paddingBottom = 40;
  frame.itemSpacing = 24;
  page.appendChild(frame);

  const titleNode = figma.createText();
  await ensureFont('Inter', 'Bold');
  titleNode.fontName = { family: 'Inter', style: 'Bold' };
  titleNode.characters = name;
  const tsid = styleIds[textKey('Display/H2')];
  if (tsid) { try { titleNode.textStyleId = tsid; } catch (_) {} }
  const pc = getToken('text/primary');
  titleNode.fills = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b } }];
  frame.appendChild(titleNode);

  const contentRow = figma.createFrame();
  contentRow.name = 'Content';
  contentRow.layoutMode = 'HORIZONTAL';
  contentRow.primaryAxisSizingMode = 'FILL';
  contentRow.counterAxisSizingMode = 'AUTO';
  contentRow.itemSpacing = 24;
  contentRow.paddingBottom = 0;
  noFill(contentRow); noStroke(contentRow);
  contentRow.counterAxisAlignItems = 'MIN';
  frame.appendChild(contentRow);

  for (const item of items) {
    if (!item) continue;
    if (item.type === 'COMPONENT' || item.type === 'COMPONENT_SET') {
      // For component sets, show all children instances
      if (item.type === 'COMPONENT_SET') {
        for (const child of item.children) {
          try {
            const inst = child.createInstance();
            contentRow.appendChild(inst);
          } catch (e) {}
        }
      } else {
        try {
          const inst = item.createInstance();
          contentRow.appendChild(inst);
        } catch (e) {}
      }
    }
  }

  return frame;
}

async function buildColorSection(page, sectionX) {
  const frame = figma.createFrame();
  frame.name = '01 — Colors';
  frame.resize(SECTION_W, 560);
  frame.x = sectionX;
  frame.y = 0;
  setFill(frame, 'bg/black');
  noStroke(frame);
  frame.cornerRadius = 10;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 40;
  frame.paddingLeft = 40;
  frame.paddingRight = 40;
  frame.paddingBottom = 40;
  frame.itemSpacing = 24;
  page.appendChild(frame);

  await ensureFont('Inter', 'Bold');
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.characters = '01 — Colors';
  const pc = getToken('text/primary');
  title.fills = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b } }];
  frame.appendChild(title);

  const groups = [
    { label: 'Backgrounds', tokens: COLOR_TOKENS.filter(t => t.name.startsWith('bg/')) },
    { label: 'Text',        tokens: COLOR_TOKENS.filter(t => t.name.startsWith('text/')) },
    { label: 'Actions',     tokens: COLOR_TOKENS.filter(t => t.name.startsWith('action/')) },
    { label: 'Semantic',    tokens: COLOR_TOKENS.filter(t => t.name.startsWith('semantic/')) },
    { label: 'Borders',     tokens: COLOR_TOKENS.filter(t => t.name.startsWith('border/')) },
  ];

  await ensureFont('Inter', 'Regular');

  for (const group of groups) {
    const groupRow = figma.createFrame();
    groupRow.name = group.label;
    groupRow.layoutMode = 'HORIZONTAL';
    groupRow.primaryAxisSizingMode = 'AUTO';
    groupRow.counterAxisSizingMode = 'AUTO';
    groupRow.counterAxisAlignItems = 'CENTER';
    groupRow.itemSpacing = 16;
    noFill(groupRow); noStroke(groupRow);
    frame.appendChild(groupRow);

    const grpLbl = figma.createText();
    grpLbl.fontName = { family: 'Inter', style: 'Regular' };
    grpLbl.characters = group.label;
    grpLbl.fontSize = 11;
    const sc = getToken('text/secondary');
    grpLbl.fills = [{ type: 'SOLID', color: { r: sc.r, g: sc.g, b: sc.b } }];
    grpLbl.resize(90, grpLbl.height);
    groupRow.appendChild(grpLbl);

    for (const token of group.tokens) {
      const swatchCol = figma.createFrame();
      swatchCol.name = token.name;
      swatchCol.layoutMode = 'VERTICAL';
      swatchCol.primaryAxisSizingMode = 'AUTO';
      swatchCol.counterAxisSizingMode = 'AUTO';
      swatchCol.itemSpacing = 6;
      noFill(swatchCol); noStroke(swatchCol);
      groupRow.appendChild(swatchCol);

      const swatch = figma.createRectangle();
      swatch.resize(60, 60);
      swatch.fills = [{ type: 'SOLID', color: { r: token.r, g: token.g, b: token.b }, opacity: token.a }];
      swatch.cornerRadius = 5;
      if (token.r === 0 && token.g === 0 && token.b === 0 && token.a === 1) {
        swatch.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
        swatch.strokeWeight = 1;
      }
      swatchCol.appendChild(swatch);

      const lbl = figma.createText();
      lbl.fontName = { family: 'Inter', style: 'Regular' };
      lbl.fontSize = 9;
      lbl.characters = token.name + '\n' + (HEX[token.name] || '');
      lbl.fills = [{ type: 'SOLID', color: { r: sc.r, g: sc.g, b: sc.b } }];
      swatchCol.appendChild(lbl);
    }
  }
}

async function buildTypoSection(page, sectionX) {
  const frame = figma.createFrame();
  frame.name = '02 — Typography';
  frame.resize(SECTION_W, 680);
  frame.x = sectionX;
  frame.y = 0;
  setFill(frame, 'bg/black');
  noStroke(frame);
  frame.cornerRadius = 10;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 40;
  frame.paddingLeft = 40;
  frame.paddingRight = 40;
  frame.paddingBottom = 40;
  frame.itemSpacing = 20;
  page.appendChild(frame);

  await ensureFont('Inter', 'Bold');
  await ensureFont('Inter', 'Regular');
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.characters = '02 — Typography';
  const pc = getToken('text/primary');
  title.fills = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b } }];
  frame.appendChild(title);

  for (const token of TEXT_TOKENS) {
    const row = figma.createFrame();
    row.name = token.name;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FILL';
    row.counterAxisSizingMode = 'AUTO';
    row.counterAxisAlignItems = 'CENTER';
    row.itemSpacing = 40;
    noFill(row); noStroke(row);
    row.layoutSizingHorizontal = 'FILL';
    frame.appendChild(row);

    // Sample text using the style
    const sample = figma.createText();
    const loaded = await ensureFont(token.fontFamily, token.fontStyle);
    if (loaded) {
      sample.fontName = { family: token.fontFamily, style: token.fontStyle };
    } else {
      sample.fontName = { family: 'Inter', style: 'Regular' };
    }
    sample.fontSize = token.fontSize;
    try { sample.letterSpacing = token.letterSpacing; } catch (_) {}
    sample.characters = `Aa — ${token.name}`;
    sample.fills = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b } }];
    sample.resize(400, sample.height);
    row.appendChild(sample);

    // Metadata
    const sc = getToken('text/secondary');
    const meta = figma.createText();
    meta.fontName = { family: 'Inter', style: 'Regular' };
    meta.fontSize = 11;
    meta.characters = `${token.fontFamily} ${token.fontStyle}  ·  ${token.fontSize}px  ·  LH ${token.lineHeight.value}%  ·  LS ${token.letterSpacing.value}px${token.textCase === 'UPPER' ? '  · UPPERCASE' : ''}`;
    meta.fills = [{ type: 'SOLID', color: { r: sc.r, g: sc.g, b: sc.b } }];
    row.appendChild(meta);
  }
}

async function buildSpacingSection(page, sectionX) {
  const frame = figma.createFrame();
  frame.name = '03 — Spacing & Radius';
  frame.resize(SECTION_W, 380);
  frame.x = sectionX;
  frame.y = 0;
  setFill(frame, 'bg/black');
  noStroke(frame);
  frame.cornerRadius = 10;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 40;
  frame.paddingLeft = 40;
  frame.paddingRight = 40;
  frame.paddingBottom = 40;
  frame.itemSpacing = 32;
  page.appendChild(frame);

  await ensureFont('Inter', 'Bold');
  await ensureFont('Inter', 'Regular');
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.characters = '03 — Spacing & Radius';
  const pc = getToken('text/primary');
  title.fills = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b } }];
  frame.appendChild(title);

  // Spacing scale
  const spacingRow = figma.createFrame();
  spacingRow.name = 'Spacing Scale';
  spacingRow.layoutMode = 'HORIZONTAL';
  spacingRow.primaryAxisSizingMode = 'AUTO';
  spacingRow.counterAxisSizingMode = 'AUTO';
  spacingRow.counterAxisAlignItems = 'MAX';
  spacingRow.itemSpacing = 16;
  noFill(spacingRow); noStroke(spacingRow);
  frame.appendChild(spacingRow);

  const sc = getToken('text/secondary');
  const sf = getToken('bg/surface');

  for (const size of [6, 12, 18, 24, 48, 64]) {
    const col = figma.createFrame();
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'AUTO';
    col.counterAxisAlignItems = 'CENTER';
    col.itemSpacing = 8;
    noFill(col); noStroke(col);
    spacingRow.appendChild(col);

    const block = figma.createRectangle();
    block.resize(size, size);
    block.fills = [{ type: 'SOLID', color: { r: sf.r, g: sf.g, b: sf.b } }];
    block.strokes = [{ type: 'SOLID', color: { r: pc.r, g: pc.g, b: pc.b }, opacity: 0.3 }];
    block.strokeWeight = 1;
    col.appendChild(block);

    const lbl = figma.createText();
    lbl.fontName = { family: 'Inter', style: 'Regular' };
    lbl.fontSize = 10;
    lbl.characters = size + 'px';
    lbl.fills = [{ type: 'SOLID', color: { r: sc.r, g: sc.g, b: sc.b } }];
    col.appendChild(lbl);
  }

  // Radius scale
  const radiusRow = figma.createFrame();
  radiusRow.name = 'Radius Scale';
  radiusRow.layoutMode = 'HORIZONTAL';
  radiusRow.primaryAxisSizingMode = 'AUTO';
  radiusRow.counterAxisSizingMode = 'AUTO';
  radiusRow.itemSpacing = 32;
  noFill(radiusRow); noStroke(radiusRow);
  frame.appendChild(radiusRow);

  for (const r of [{ name: 'radius/sm', value: 5, usage: 'input, button, tag, badge, nav' }, { name: 'radius/md', value: 10, usage: 'card, header, sidebar, drawer' }]) {
    const col = figma.createFrame();
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'AUTO';
    col.itemSpacing = 8;
    noFill(col); noStroke(col);
    radiusRow.appendChild(col);

    const block = figma.createRectangle();
    block.resize(80, 80);
    block.fills = [{ type: 'SOLID', color: { r: sf.r, g: sf.g, b: sf.b } }];
    block.cornerRadius = r.value;
    col.appendChild(block);

    const lbl = figma.createText();
    lbl.fontName = { family: 'Inter', style: 'Regular' };
    lbl.fontSize = 11;
    lbl.characters = `${r.name}\n${r.value}px\n${r.usage}`;
    lbl.fills = [{ type: 'SOLID', color: { r: sc.r, g: sc.g, b: sc.b } }];
    col.appendChild(lbl);
  }
}

// ─────────────────────────────────────────────────────────────
// MESSAGING HELPERS
// ─────────────────────────────────────────────────────────────

function ui(type, text, level) {
  figma.ui.postMessage({ type, text, level });
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

async function main() {
  ui('log', '1/6 Loading fonts…', 'inf');

  const fontsNeeded = [
    { family: 'TeX Gyre Bonum', style: 'Regular' },
    { family: 'Satoshi',        style: 'Medium'  },
    { family: 'Satoshi',        style: 'Regular' },
    { family: 'IBM Plex Mono',  style: 'Regular' },
    { family: 'Inter',          style: 'Regular' },
    { family: 'Inter',          style: 'Bold'    },
  ];
  for (const f of fontsNeeded) await ensureFont(f.family, f.style);

  // ── 1. Get or create Design System page ──────────────────
  ui('log', '2/6 Setting up "Design System" page…', 'inf');
  let dsPage = figma.root.children.find(p => p.name === 'Design System');
  if (!dsPage) {
    dsPage = figma.createPage();
    dsPage.name = 'Design System';
  }
  await figma.setCurrentPageAsync(dsPage);

  // Remove old content if re-running
  for (const child of [...dsPage.children]) child.remove();

  // ── 2. Create color and text styles ──────────────────────
  ui('log', '3/6 Creating styles…', 'inf');
  await createColorStyles();
  await createTextStyles();

  // ── 3. Create components ─────────────────────────────────
  ui('log', '4/6 Building components…', 'inf');

  const divider      = buildDivider();             ui('log', '  ✓ Divider', 'ok');
  const tagFilter    = await buildTagFilter();      ui('log', '  ✓ Tag/Filter', 'ok');
  const tagCategory  = await buildTagCategory();    ui('log', '  ✓ Tag/Category', 'ok');
  const badge        = await buildBadgeSentiment(); ui('log', '  ✓ Badge/Sentiment', 'ok');
  const checkbox     = await buildCheckbox();       ui('log', '  ✓ Checkbox', 'ok');
  const navItem      = await buildNavItem();        ui('log', '  ✓ NavItem', 'ok');
  const sidebarLabel = await buildSidebarLabel();   ui('log', '  ✓ SidebarLabel', 'ok');
  const buttons      = await buildButtons();        ui('log', '  ✓ Button', 'ok');
  const inputs       = await buildInputs();         ui('log', '  ✓ Input', 'ok');
  const alertCards   = await buildAlertCards();     ui('log', '  ✓ AlertCard', 'ok');
  const cardArticolo = await buildCardArticolo();   ui('log', '  ✓ CardArticolo', 'ok');
  const drawer       = await buildDrawer();         ui('log', '  ✓ DrawerArticolo', 'ok');
  const header       = await buildHeader();         ui('log', '  ✓ Header', 'ok');
  const socialShare  = await buildSocialShare();    ui('log', '  ✓ SocialShare', 'ok');

  // Move all raw components to a library area off-canvas (Y=2000)
  let libX = 0;
  const libY = 2000;
  for (const comp of [divider, tagFilter, tagCategory, badge, checkbox, navItem,
                       sidebarLabel, buttons, inputs, alertCards, cardArticolo,
                       drawer, header, socialShare]) {
    if (!comp) continue;
    comp.x = libX;
    comp.y = libY;
    libX += (comp.width || 400) + 40;
  }

  // ── 4. Build DS page sections ─────────────────────────────
  ui('log', '5/6 Laying out Design System page…', 'inf');

  let sx = 0;

  await buildColorSection(dsPage, sx);
  sx += SECTION_W + SECTION_GAP;

  await buildTypoSection(dsPage, sx);
  sx += SECTION_W + SECTION_GAP;

  await buildSpacingSection(dsPage, sx);
  sx += SECTION_W + SECTION_GAP;

  await makeSection(dsPage, '04 — Buttons',          [buttons],                    320,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '05 — Inputs',           [inputs],                     260,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '06 — Tags & Badges',    [tagFilter, tagCategory, badge], 280, sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '07 — Checkbox & Nav',   [checkbox, navItem, sidebarLabel], 260, sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '08 — Alert Cards',      [alertCards],                 400,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '09 — Card Articolo',    [cardArticolo],               700,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '10 — Drawer Articolo',  [drawer],                     900,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '11 — Header',           [header],                     260,  sx); sx += SECTION_W + SECTION_GAP;
  await makeSection(dsPage, '12 — Utilities',        [divider, socialShare],        380,  sx);

  // Zoom to fit
  figma.viewport.scrollAndZoomIntoView(dsPage.children.filter(c => c.y === 0));

  ui('log', '6/6 Done!', 'ok');
  ui('done', 'Design System creato con successo! Apri la pagina "Design System".', 'ok');
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'run') {
    try {
      await main();
    } catch (err) {
      ui('error', err.message || String(err));
    }
  }
};
