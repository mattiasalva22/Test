// ============================================================
// FIGMA DESIGN SYSTEM BUILDER - Plugin Code
// File: W2MC9fSJC5adK2nSNyxhR9
// ============================================================

figma.showUI(__html__, { width: 450, height: 500 });

// ---------- HELPERS ----------

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16) / 255,
    g: parseInt(clean.slice(2, 4), 16) / 255,
    b: parseInt(clean.slice(4, 6), 16) / 255,
  };
}

function solidPaint(hex, opacity = 1) {
  return [{ type: 'SOLID', color: hexToRgb(hex), opacity }];
}

function noFill() {
  return [];
}

async function loadFont(family, style) {
  try {
    await figma.loadFontAsync({ family, style });
    return true;
  } catch (e) {
    console.warn(`Font not found: ${family} ${style}, falling back to Inter Regular`);
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    return false;
  }
}

function send(msg) {
  figma.ui.postMessage(msg);
}

// ---------- FONT CATALOGUE ----------

const FONTS = {
  texGyreBonumRegular: { family: 'TeX Gyre Bonum', style: 'Regular' },
  satoshiMedium:       { family: 'Satoshi', style: 'Medium' },
  satoshiRegular:      { family: 'Satoshi', style: 'Regular' },
  ibmPlexMonoRegular:  { family: 'IBM Plex Mono', style: 'Regular' },
  inter:               { family: 'Inter', style: 'Regular' },
};

// Fallbacks when custom fonts are unavailable
const FALLBACK = { family: 'Inter', style: 'Regular' };
const FALLBACK_MONO = { family: 'Roboto Mono', style: 'Regular' };

// ---------- COLOURS ----------

const C = {
  black:   '#000000',
  surface: '#171717',
  primary: '#EAEAEA',
  secondary:'#7A7A7A',
  inverse: '#000000',
  cyan:    '#00FFDD',
  yellow:  '#FFAE00',
  green:   '#00AC3A',
  red:     '#F13342',
  border:  '#7A7A7A',
  borderSubtle: '#171717',
};

// ---------- MAIN ----------

async function main() {
  send({ type: 'status', text: '🚀 Avvio creazione Design System...' });

  // ── Pre-load all fonts ──────────────────────────────────────
  send({ type: 'status', text: '📦 Caricamento font...' });

  const fontResults = {};
  for (const [key, font] of Object.entries(FONTS)) {
    fontResults[key] = await loadFont(font.family, font.style);
  }

  function getFont(key) {
    return fontResults[key] ? FONTS[key] : FALLBACK;
  }

  // ── Create or find "Design System" page ─────────────────────
  send({ type: 'status', text: '📄 Creazione pagina "Design System"...' });

  let dsPage = figma.root.children.find(p => p.name === 'Design System');
  if (!dsPage) {
    dsPage = figma.createPage();
    dsPage.name = 'Design System';
  }
  figma.currentPage = dsPage;

  // ── Color Styles ─────────────────────────────────────────────
  send({ type: 'status', text: '🎨 Creazione Color Styles...' });

  const colorDefs = [
    { name: 'bg/black',        hex: C.black },
    { name: 'bg/surface',      hex: C.surface },
    { name: 'text/primary',    hex: C.primary },
    { name: 'text/secondary',  hex: C.secondary },
    { name: 'text/inverse',    hex: C.inverse },
    { name: 'action/cyan',     hex: C.cyan },
    { name: 'semantic/yellow', hex: C.yellow },
    { name: 'semantic/green',  hex: C.green },
    { name: 'semantic/red',    hex: C.red },
    { name: 'border/default',  hex: C.border },
    { name: 'border/subtle',   hex: C.borderSubtle },
  ];

  const createdStyles = { colors: [], text: [] };

  for (const def of colorDefs) {
    const style = figma.createPaintStyle();
    style.name = def.name;
    style.paints = solidPaint(def.hex);
    createdStyles.colors.push(def.name);
  }

  // ── Text Styles ───────────────────────────────────────────────
  send({ type: 'status', text: '✍️ Creazione Text Styles...' });

  const textDefs = [
    {
      name: 'Display/H1',
      font: getFont('texGyreBonumRegular'),
      size: 40, lhMultiplier: 1.2, ls: 0.4, textCase: 'ORIGINAL',
    },
    {
      name: 'Display/H2',
      font: getFont('texGyreBonumRegular'),
      size: 24, lhMultiplier: 1.2, ls: 0.24, textCase: 'ORIGINAL',
    },
    {
      name: 'Body/H3',
      font: getFont('satoshiMedium'),
      size: 20, lhMultiplier: 1.1, ls: 1, textCase: 'ORIGINAL',
    },
    {
      name: 'Body/P',
      font: getFont('satoshiMedium'),
      size: 14, lhMultiplier: 1.2, ls: 0.7, textCase: 'ORIGINAL',
    },
    {
      name: 'Body/P-Regular',
      font: getFont('satoshiRegular'),
      size: 14, lhMultiplier: 1.3, ls: 0.7, textCase: 'ORIGINAL',
    },
    {
      name: 'Body/Small',
      font: getFont('satoshiMedium'),
      size: 12, lhMultiplier: 1.2, ls: 0.5, textCase: 'ORIGINAL',
    },
    {
      name: 'UI/Label',
      font: getFont('ibmPlexMonoRegular'),
      size: 10, lhMultiplier: 1.0, ls: 1, textCase: 'UPPER',
    },
  ];

  for (const def of textDefs) {
    const style = figma.createTextStyle();
    style.name = def.name;
    style.fontName = def.font;
    style.fontSize = def.size;
    style.lineHeight = { unit: 'PERCENT', value: def.lhMultiplier * 100 };
    style.letterSpacing = { unit: 'PIXELS', value: def.ls };
    if (def.textCase === 'UPPER') style.textCase = 'UPPER';
    createdStyles.text.push(def.name);
  }

  // ── Helper: add title text to a frame ────────────────────────
  async function addTitle(parent, text, x, y) {
    const t = figma.createText();
    parent.appendChild(t);
    t.fontName = getFont('texGyreBonumRegular');
    t.characters = text;
    t.fontSize = 32;
    t.fills = solidPaint(C.primary);
    t.x = x;
    t.y = y;
    return t;
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 1 — COLORS  (1400 × 400, y: 0)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '🎨 Sezione Colors...' });

  const colorsFrame = figma.createFrame();
  colorsFrame.name = 'Colors';
  colorsFrame.resize(1400, 400);
  colorsFrame.x = 0;
  colorsFrame.y = 0;
  colorsFrame.fills = solidPaint(C.black);
  colorsFrame.clipsContent = false;
  dsPage.appendChild(colorsFrame);

  await addTitle(colorsFrame, 'Colors', 60, 40);

  const swatchColors = [
    { name: 'bg/black',        hex: C.black,   border: true },
    { name: 'bg/surface',      hex: C.surface },
    { name: 'text/primary',    hex: C.primary },
    { name: 'text/secondary',  hex: C.secondary },
    { name: 'action/cyan',     hex: C.cyan },
    { name: 'semantic/yellow', hex: C.yellow },
    { name: 'semantic/green',  hex: C.green },
    { name: 'semantic/red',    hex: C.red },
    { name: 'border/default',  hex: C.border },
    { name: 'border/subtle',   hex: C.borderSubtle },
    { name: 'text/inverse',    hex: C.inverse, border: true },
  ];

  const swatchW = 80, swatchH = 80;
  const swatchStartX = 60, swatchStartY = 120;
  const swatchGap = 30;

  for (let i = 0; i < swatchColors.length; i++) {
    const sc = swatchColors[i];
    const sx = swatchStartX + i * (swatchW + swatchGap);

    // Swatch rect
    const rect = figma.createRectangle();
    colorsFrame.appendChild(rect);
    rect.resize(swatchW, swatchH);
    rect.x = sx;
    rect.y = swatchStartY;
    rect.fills = solidPaint(sc.hex);
    rect.cornerRadius = 6;
    if (sc.border) {
      rect.strokes = solidPaint(C.secondary);
      rect.strokeWeight = 1;
    }

    // Name label
    const nameT = figma.createText();
    colorsFrame.appendChild(nameT);
    nameT.fontName = getFont('ibmPlexMonoRegular');
    nameT.fontSize = 9;
    nameT.fills = solidPaint(C.secondary);
    nameT.characters = sc.name;
    nameT.x = sx;
    nameT.y = swatchStartY + swatchH + 8;

    // Hex label
    const hexT = figma.createText();
    colorsFrame.appendChild(hexT);
    hexT.fontName = getFont('ibmPlexMonoRegular');
    hexT.fontSize = 9;
    hexT.fills = solidPaint(C.secondary);
    hexT.characters = sc.hex;
    hexT.x = sx;
    hexT.y = swatchStartY + swatchH + 22;
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 2 — TYPOGRAPHY  (1400 × 600, y: 500)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '✍️ Sezione Typography...' });

  const typoFrame = figma.createFrame();
  typoFrame.name = 'Typography';
  typoFrame.resize(1400, 600);
  typoFrame.x = 0;
  typoFrame.y = 500;
  typoFrame.fills = solidPaint(C.black);
  typoFrame.clipsContent = false;
  dsPage.appendChild(typoFrame);

  await addTitle(typoFrame, 'Typography', 60, 40);

  const typoRows = [
    { label: 'Display/H1',    font: getFont('texGyreBonumRegular'), size: 40, ls: 0.4 },
    { label: 'Display/H2',    font: getFont('texGyreBonumRegular'), size: 24, ls: 0.24 },
    { label: 'Body/H3',       font: getFont('satoshiMedium'),       size: 20, ls: 1 },
    { label: 'Body/P',        font: getFont('satoshiMedium'),       size: 14, ls: 0.7 },
    { label: 'Body/P-Regular',font: getFont('satoshiRegular'),      size: 14, ls: 0.7 },
    { label: 'Body/Small',    font: getFont('satoshiMedium'),       size: 12, ls: 0.5 },
    { label: 'UI/Label',      font: getFont('ibmPlexMonoRegular'),  size: 10, ls: 1,  upper: true },
  ];

  let rowY = 110;
  for (const row of typoRows) {
    const sample = figma.createText();
    typoFrame.appendChild(sample);
    sample.fontName = row.font;
    sample.fontSize = row.size;
    sample.letterSpacing = { unit: 'PIXELS', value: row.ls };
    sample.fills = solidPaint(C.primary);
    sample.characters = row.upper
      ? `AA — ${row.label.toUpperCase()}`
      : `Aa — ${row.label}`;
    if (row.upper) sample.textCase = 'UPPER';
    sample.x = 60;
    sample.y = rowY;

    // Style label on right
    const lbl = figma.createText();
    typoFrame.appendChild(lbl);
    lbl.fontName = getFont('ibmPlexMonoRegular');
    lbl.fontSize = 9;
    lbl.fills = solidPaint(C.secondary);
    lbl.characters = `${row.size}px`;
    lbl.x = 700;
    lbl.y = rowY + (row.size - 9) / 2;

    rowY += row.size + 32;
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 3 — BUTTONS  (1400 × 300, y: 1200)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '🔘 Sezione Buttons...' });

  const btnsFrame = figma.createFrame();
  btnsFrame.name = 'Buttons';
  btnsFrame.resize(1400, 300);
  btnsFrame.x = 0;
  btnsFrame.y = 1200;
  btnsFrame.fills = solidPaint(C.black);
  btnsFrame.clipsContent = false;
  dsPage.appendChild(btnsFrame);

  await addTitle(btnsFrame, 'Buttons', 60, 40);

  // Helper: create a component button
  async function createButton(parent, name, bgHex, textStr, textColor, borderColor, startX, startY) {
    const comp = figma.createComponent();
    parent.appendChild(comp);
    comp.name = name;
    comp.x = startX;
    comp.y = startY;

    const paddingH = name.includes('Primary') ? 48 : 24;
    const font = getFont('satoshiMedium');

    // Create text first to measure
    const txt = figma.createText();
    comp.appendChild(txt);
    txt.fontName = font;
    txt.fontSize = 14;
    txt.letterSpacing = { unit: 'PIXELS', value: 0.7 };
    txt.fills = solidPaint(textColor);
    txt.characters = textStr;
    txt.x = paddingH;
    txt.y = (46 - 14 * 1.2) / 2;

    const totalW = txt.width + paddingH * 2;
    comp.resize(totalW, 46);

    if (bgHex) {
      comp.fills = solidPaint(bgHex);
    } else {
      comp.fills = noFill();
    }
    comp.cornerRadius = 5;

    if (borderColor) {
      comp.strokes = solidPaint(borderColor);
      comp.strokeWeight = 1;
      comp.strokeAlign = 'INSIDE';
    }

    return comp;
  }

  // Button/Primary
  await createButton(btnsFrame, 'Button/Primary', C.primary, 'Continua', C.black, null, 60, 110);
  // Button/Secondary
  await createButton(btnsFrame, 'Button/Secondary', null, '← Indietro', C.secondary, null, 300, 110);
  // Button/Ghost
  await createButton(btnsFrame, 'Button/Ghost', null, '+ Aggiungi topic', C.cyan, null, 520, 110);

  // ══════════════════════════════════════════════════════════════
  // SECTION 4 — TAGS & BADGES  (1400 × 300, y: 1600)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '🏷️ Sezione Tags & Badges...' });

  const tagsFrame = figma.createFrame();
  tagsFrame.name = 'Tags & Badges';
  tagsFrame.resize(1400, 300);
  tagsFrame.x = 0;
  tagsFrame.y = 1600;
  tagsFrame.fills = solidPaint(C.black);
  tagsFrame.clipsContent = false;
  dsPage.appendChild(tagsFrame);

  await addTitle(tagsFrame, 'Tags & Badges', 60, 40);

  async function createTag(parent, name, bgHex, textStr, textColor, font, fontSize, borderColor, startX, startY, paddingH, paddingV) {
    const comp = figma.createComponent();
    parent.appendChild(comp);
    comp.name = name;

    const txt = figma.createText();
    comp.appendChild(txt);
    txt.fontName = font;
    txt.fontSize = fontSize;
    txt.fills = solidPaint(textColor);
    txt.characters = textStr;
    txt.textCase = fontSize <= 10 ? 'UPPER' : 'ORIGINAL';
    txt.x = paddingH;
    txt.y = paddingV;

    const h = fontSize * 1.2 + paddingV * 2;
    const w = txt.width + paddingH * 2;
    comp.resize(w, h);
    comp.x = startX;
    comp.y = startY;
    comp.cornerRadius = 5;
    comp.fills = bgHex ? solidPaint(bgHex) : noFill();

    if (borderColor) {
      comp.strokes = solidPaint(borderColor);
      comp.strokeWeight = 1;
    }
    return comp;
  }

  const satM = getFont('satoshiMedium');
  const ibmR = getFont('ibmPlexMonoRegular');

  let tagX = 60;
  const tagY = 110;

  // Tag/Filter
  const tf = await createTag(tagsFrame, 'Tag/Filter', C.surface, 'Politica', C.primary, satM, 14, null, tagX, tagY, 12, 13);
  tagX += tf.width + 24;

  // Tag/Category
  const tc = await createTag(tagsFrame, 'Tag/Category', C.black, 'TECNOLOGIA', C.primary, ibmR, 10, C.secondary, tagX, tagY, 10, 5);
  tagX += tc.width + 24;

  // Badge/Sentiment-Neutro
  const bn = await createTag(tagsFrame, 'Badge/Sentiment-Neutro', C.yellow, 'SENTIMENT NEUTRO', C.black, ibmR, 10, null, tagX, tagY, 10, 5);
  tagX += bn.width + 24;

  // Badge/Sentiment-Positivo
  const bp = await createTag(tagsFrame, 'Badge/Sentiment-Positivo', C.green, 'SENTIMENT POSITIVO', C.black, ibmR, 10, null, tagX, tagY, 10, 5);
  tagX += bp.width + 24;

  // Badge/Sentiment-Negativo
  await createTag(tagsFrame, 'Badge/Sentiment-Negativo', C.red, 'SENTIMENT NEGATIVO', C.black, ibmR, 10, null, tagX, tagY, 10, 5);

  // ══════════════════════════════════════════════════════════════
  // SECTION 5 — NAV ITEMS  (1400 × 200, y: 2000)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '🧭 Sezione Nav Items...' });

  const navFrame = figma.createFrame();
  navFrame.name = 'Nav Items';
  navFrame.resize(1400, 200);
  navFrame.x = 0;
  navFrame.y = 2000;
  navFrame.fills = solidPaint(C.black);
  navFrame.clipsContent = false;
  dsPage.appendChild(navFrame);

  await addTitle(navFrame, 'Nav Items', 60, 40);

  async function createNavItem(parent, name, bgHex, textStr, textColor, startX, startY) {
    const comp = figma.createComponent();
    parent.appendChild(comp);
    comp.name = name;

    const txt = figma.createText();
    comp.appendChild(txt);
    txt.fontName = getFont('satoshiMedium');
    txt.fontSize = 14;
    txt.fills = solidPaint(textColor);
    txt.characters = textStr;
    txt.x = 12;
    txt.y = 6;

    const w = txt.width + 24;
    const h = 14 * 1.2 + 12;
    comp.resize(w, h);
    comp.x = startX;
    comp.y = startY;
    comp.cornerRadius = 5;
    comp.fills = bgHex ? solidPaint(bgHex) : noFill();
    return comp;
  }

  const navActiveComp = await createNavItem(navFrame, 'NavItem/Active', C.primary, 'Feed', C.black, 60, 110);
  await createNavItem(navFrame, 'NavItem/Default', null, 'Search', C.primary, 60 + navActiveComp.width + 24, 110);

  // ══════════════════════════════════════════════════════════════
  // SECTION 6 — CARD ARTICOLO  (1400 × 700, y: 2300)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '📰 Sezione Card Articolo...' });

  const cardFrame = figma.createFrame();
  cardFrame.name = 'Card Articolo';
  cardFrame.resize(1400, 700);
  cardFrame.x = 0;
  cardFrame.y = 2300;
  cardFrame.fills = solidPaint(C.black);
  cardFrame.clipsContent = false;
  dsPage.appendChild(cardFrame);

  await addTitle(cardFrame, 'Card Articolo', 60, 40);

  // Card outer frame
  const card = figma.createComponent();
  cardFrame.appendChild(card);
  card.name = 'ArticleCard';
  card.resize(357, 580);
  card.x = 60;
  card.y = 100;
  card.fills = solidPaint(C.surface);
  card.cornerRadius = 10;
  card.clipsContent = true;

  let cardY = 24;
  const cardInnerW = 357 - 48; // 24px padding each side

  // Image placeholder
  const imgPlaceholder = figma.createRectangle();
  card.appendChild(imgPlaceholder);
  imgPlaceholder.resize(cardInnerW, 182);
  imgPlaceholder.x = 24;
  imgPlaceholder.y = cardY;
  imgPlaceholder.fills = solidPaint(C.primary);
  imgPlaceholder.cornerRadius = 4;
  cardY += 182 + 16;

  // Metadata
  const metaT = figma.createText();
  card.appendChild(metaT);
  metaT.fontName = ibmR;
  metaT.fontSize = 10;
  metaT.fills = solidPaint(C.secondary);
  metaT.characters = '15/12/2025 — CORRIERE DELLA SERA';
  metaT.textCase = 'UPPER';
  metaT.x = 24;
  metaT.y = cardY;
  cardY += 16 + 10;

  // Title
  const titleT = figma.createText();
  card.appendChild(titleT);
  titleT.fontName = satM;
  titleT.fontSize = 20;
  titleT.fills = solidPaint(C.primary);
  titleT.characters = 'Dieci anni di OpenAI: successi e sfide';
  titleT.x = 24;
  titleT.y = cardY;
  titleT.resize(cardInnerW, 52);
  titleT.textAutoResize = 'HEIGHT';
  cardY += titleT.height + 10;

  // Abstract
  const abstractT = figma.createText();
  card.appendChild(abstractT);
  abstractT.fontName = satM;
  abstractT.fontSize = 14;
  abstractT.fills = solidPaint(C.secondary);
  abstractT.characters = 'Da GPT-1 a GPT-4, il percorso di OpenAI attraverso sfide tecniche, etiche e commerciali che hanno ridefinito l\'intelligenza artificiale globale.';
  abstractT.x = 24;
  abstractT.y = cardY;
  abstractT.resize(cardInnerW, 55);
  abstractT.textTruncation = 'ENDING';
  cardY += 55 + 16;

  // Divider 1
  const div1 = figma.createLine();
  card.appendChild(div1);
  div1.x = 24;
  div1.y = cardY;
  div1.resize(cardInnerW, 0);
  div1.strokes = solidPaint(C.borderSubtle);
  div1.strokeWeight = 1;
  cardY += 16;

  // Badge sentiment
  const badgeRect = figma.createRectangle();
  card.appendChild(badgeRect);
  badgeRect.fills = solidPaint(C.yellow);
  badgeRect.cornerRadius = 5;
  badgeRect.x = 24;
  badgeRect.y = cardY;
  const badgeT = figma.createText();
  card.appendChild(badgeT);
  badgeT.fontName = ibmR;
  badgeT.fontSize = 10;
  badgeT.fills = solidPaint(C.black);
  badgeT.characters = 'SENTIMENT NEUTRO';
  badgeT.textCase = 'UPPER';
  badgeT.x = 24 + 10;
  badgeT.y = cardY + 5;
  badgeRect.resize(badgeT.width + 20, badgeT.height + 10);
  cardY += badgeRect.height + 16;

  // Divider 2
  const div2 = figma.createLine();
  card.appendChild(div2);
  div2.x = 24;
  div2.y = cardY;
  div2.resize(cardInnerW, 0);
  div2.strokes = solidPaint(C.borderSubtle);
  div2.strokeWeight = 1;
  cardY += 16;

  // Categories label
  const catLabel = figma.createText();
  card.appendChild(catLabel);
  catLabel.fontName = ibmR;
  catLabel.fontSize = 10;
  catLabel.fills = solidPaint(C.secondary);
  catLabel.characters = 'CATEGORIE';
  catLabel.textCase = 'UPPER';
  catLabel.x = 24;
  catLabel.y = cardY;
  cardY += catLabel.height + 8;

  // Tags row
  const tagDefs = ['TECNOLOGIA', 'INTELLIGENZA ARTIFICIALE'];
  let tagRowX = 24;
  for (const tagText of tagDefs) {
    const tagR = figma.createRectangle();
    card.appendChild(tagR);
    tagR.fills = solidPaint(C.black);
    tagR.cornerRadius = 5;
    tagR.x = tagRowX;
    tagR.y = cardY;
    const tagTxt = figma.createText();
    card.appendChild(tagTxt);
    tagTxt.fontName = ibmR;
    tagTxt.fontSize = 10;
    tagTxt.fills = solidPaint(C.primary);
    tagTxt.characters = tagText;
    tagTxt.textCase = 'UPPER';
    tagTxt.x = tagRowX + 10;
    tagTxt.y = cardY + 5;
    tagR.resize(tagTxt.width + 20, tagTxt.height + 10);
    tagRowX += tagR.width + 8;
  }

  // Resize card to fit content
  cardY += 30;
  card.resize(357, cardY);

  // ══════════════════════════════════════════════════════════════
  // SECTION 7 — DIVIDER  (1400 × 100, y: 3100)
  // ══════════════════════════════════════════════════════════════
  send({ type: 'status', text: '➖ Sezione Divider...' });

  const divFrame = figma.createFrame();
  divFrame.name = 'Divider';
  divFrame.resize(1400, 100);
  divFrame.x = 0;
  divFrame.y = 3100;
  divFrame.fills = solidPaint(C.black);
  divFrame.clipsContent = false;
  dsPage.appendChild(divFrame);

  await addTitle(divFrame, 'Divider', 60, 20);

  const mainDivLine = figma.createLine();
  divFrame.appendChild(mainDivLine);
  mainDivLine.x = 60;
  mainDivLine.y = 70;
  mainDivLine.resize(360, 0);
  mainDivLine.strokes = solidPaint(C.borderSubtle);
  mainDivLine.strokeWeight = 1;

  // ── Done ─────────────────────────────────────────────────────
  send({
    type: 'done',
    colorStyles: createdStyles.colors,
    textStyles: createdStyles.text,
    sections: [
      'Colors (1400×400, y:0)',
      'Typography (1400×600, y:500)',
      'Buttons (1400×300, y:1200)',
      'Tags & Badges (1400×300, y:1600)',
      'Nav Items (1400×200, y:2000)',
      'Card Articolo (1400×700, y:2300)',
      'Divider (1400×100, y:3100)',
    ],
  });

  figma.viewport.scrollAndZoomIntoView(dsPage.children);
}

main().catch(err => {
  console.error(err);
  send({ type: 'error', message: String(err) });
});

figma.ui.onmessage = msg => {
  if (msg.type === 'close') figma.closePlugin();
};
