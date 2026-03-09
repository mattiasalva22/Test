#!/usr/bin/env node
/**
 * Figma REST API Script
 * File Key : W2MC9fSJC5adK2nSNyxhR9
 *
 * Cosa fa questo script via REST API:
 *   1. Verifica accesso al file e mostra info
 *   2. Legge le pagine esistenti
 *   3. Legge gli stili già presenti (dopo aver eseguito il plugin)
 *
 * NOTA: La Figma REST API v1 è principalmente in lettura per il contenuto
 * dei design (nodi, frame, componenti, stili). Per CREARE nodi e stili,
 * usa il Plugin Figma incluso in questo progetto (manifest.json + code.js).
 *
 * Esegui con: node rest-api.js
 * Dipendenze: node built-in (fetch disponibile da Node 18+)
 */

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'W2MC9fSJC5adK2nSNyxhR9';
const TOKEN    = process.env.FIGMA_TOKEN;
const BASE     = 'https://api.figma.com/v1';

if (!TOKEN) {
  console.error('❌ Variabile d\'ambiente FIGMA_TOKEN non impostata.');
  console.error('   Esegui: export FIGMA_TOKEN=figd_... && node rest-api.js');
  process.exit(1);
}

const headers = {
  'X-Figma-Token': TOKEN,
  'Content-Type': 'application/json',
};

// ── Utility ──────────────────────────────────────────────────────────────────

async function api(path, opts = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { headers, ...opts });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${body}`);
  }
  return res.json();
}

function rgb255(r, g, b) {
  return `#${[r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log(' Figma Design System — REST API Inspector  ');
  console.log('═══════════════════════════════════════════\n');

  // 1. Get file info
  console.log('📄 Recupero info file…');
  const file = await api(`/files/${FILE_KEY}?depth=1`);
  console.log(`   Nome file  : ${file.name}`);
  console.log(`   Ultimo edit: ${file.lastModified}`);
  console.log(`   Version    : ${file.version}\n`);

  // 2. List pages
  console.log('📑 Pagine nel file:');
  const pages = file.document.children;
  for (const page of pages) {
    console.log(`   • [${page.id}] ${page.name}`);
  }
  console.log();

  const dsPage = pages.find(p => p.name === 'Design System');
  if (dsPage) {
    console.log(`✅ Pagina "Design System" trovata (id: ${dsPage.id})\n`);
  } else {
    console.log('⚠️  Pagina "Design System" NON trovata.');
    console.log('   → Esegui il plugin Figma per creare la pagina e tutti gli elementi.\n');
  }

  // 3. Read local styles (populated after plugin runs)
  console.log('🎨 Stili locali nel file:');
  try {
    const stylesData = await api(`/files/${FILE_KEY}/styles`);
    const styles = stylesData.meta?.styles || [];
    if (styles.length === 0) {
      console.log('   Nessuno stile trovato (esegui prima il plugin).');
    } else {
      const colorStyles = styles.filter(s => s.style_type === 'FILL');
      const textStyles  = styles.filter(s => s.style_type === 'TEXT');

      console.log(`\n   Color Styles (${colorStyles.length}):`);
      for (const s of colorStyles) console.log(`   • ${s.name}`);

      console.log(`\n   Text Styles (${textStyles.length}):`);
      for (const s of textStyles)  console.log(`   • ${s.name}`);
    }
  } catch (e) {
    console.log(`   Errore lettura stili: ${e.message}`);
  }

  // 4. If DS page exists, list its top-level children
  if (dsPage) {
    console.log('\n📐 Frame nella pagina "Design System":');
    try {
      const nodeData = await api(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(dsPage.id)}`);
      const node = nodeData.nodes[dsPage.id]?.document;
      const children = node?.children || [];
      if (children.length === 0) {
        console.log('   Nessun frame (esegui il plugin per crearli).');
      } else {
        for (const child of children) {
          console.log(`   • [${child.type}] "${child.name}"  x:${child.absoluteBoundingBox?.x ?? '-'} y:${child.absoluteBoundingBox?.y ?? '-'}`);
        }
      }
    } catch (e) {
      console.log(`   Errore: ${e.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(' Per CREARE i contenuti usa il Plugin Figma ');
  console.log(' (manifest.json + code.js in questa cartella)');
  console.log('═══════════════════════════════════════════\n');
  console.log('ISTRUZIONI PLUGIN:');
  console.log('1. Apri Figma Desktop');
  console.log('2. Plugins → Development → Import plugin from manifest…');
  console.log('3. Seleziona questo file: figma-design-system/manifest.json');
  console.log('4. Apri il file W2MC9fSJC5adK2nSNyxhR9');
  console.log('5. Esegui il plugin "Design System Builder"');
  console.log('6. Il plugin creerà automaticamente tutti gli elementi\n');
}

main().catch(err => {
  console.error('❌ Errore fatale:', err.message);
  process.exit(1);
});
