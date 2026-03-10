/**
 * Sapra.AI — Typography Tokens
 * Extracted from style.css
 *
 * Font families:
 *   Serif  → Playfair Display (display titles, section headings)
 *   Sans   → Satoshi (body, UI text, buttons)
 *   Mono   → IBM Plex Mono (labels, badges, meta, code)
 */

export const fontFamily = {
  serif: ["'Playfair Display'", 'Georgia', 'serif'],
  sans:  ["'Satoshi'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  mono:  ["'IBM Plex Mono'", "'Courier New'", 'monospace'],
} as const;

/**
 * Type scale extracted from the wireframe.
 *
 * Each entry: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textTransform? }
 *
 * Scale mapping:
 *  display   → welcome h1 (serif 26/1.3)
 *  h1        → (not distinct from display in this design; kept for completeness)
 *  h2        → wizard step heading (serif 22/1.35)
 *  h3        → feed section title (serif 18/1.4)
 *  h4        → loading/success title (serif 20/1.35)
 *  body-lg   → main body copy (sans 14/1.55)
 *  body      → standard UI text (sans 13/1.6)
 *  body-sm   → small UI text (sans 12/1.5)
 *  label     → uppercase mono labels (mono 10/1 uppercase)
 *  label-sm  → smaller uppercase labels (mono 9/1 uppercase)
 *  caption   → meta text, timestamps (mono 10/1)
 *  caption-sm→ smallest mono text (mono 9/1)
 */
export const typeScale = {
  display: {
    fontFamily: 'serif' as const,
    fontSize:   '26px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  h1: {
    fontFamily: 'serif' as const,
    fontSize:   '26px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  h2: {
    fontFamily: 'serif' as const,
    fontSize:   '22px',
    fontWeight: '400',
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: 'serif' as const,
    fontSize:   '18px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: 'serif' as const,
    fontSize:   '20px',
    fontWeight: '400',
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
  },
  'body-lg': {
    fontFamily: 'sans' as const,
    fontSize:   '14px',
    fontWeight: '400',
    lineHeight: '1.55',
    letterSpacing: '0',
  },
  body: {
    fontFamily: 'sans' as const,
    fontSize:   '13px',
    fontWeight: '400',
    lineHeight: '1.6',
    letterSpacing: '0',
  },
  'body-sm': {
    fontFamily: 'sans' as const,
    fontSize:   '12px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  label: {
    fontFamily: 'mono' as const,
    fontSize:   '10px',
    fontWeight: '500',
    lineHeight: '1',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  'label-sm': {
    fontFamily: 'mono' as const,
    fontSize:   '9px',
    fontWeight: '500',
    lineHeight: '1',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: 'mono' as const,
    fontSize:   '10px',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.04em',
  },
  'caption-sm': {
    fontFamily: 'mono' as const,
    fontSize:   '9px',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.06em',
  },
} as const;

export type TypeScaleKey = keyof typeof typeScale;
