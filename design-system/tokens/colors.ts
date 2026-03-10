/**
 * Sapra.AI — Color Tokens
 * Extracted from the onboarding wireframe (style.css)
 * Dark-first design system
 */

export const colors = {
  // ─── Base backgrounds ────────────────────────────────────────
  background: {
    DEFAULT: '#000000',       // --bg: page background
    surface1: '#0E0E0E',      // --surface-1: cards, panels
    surface2: '#1A1A1A',      // --surface-2: elevated surfaces, inputs
    surface3: '#242424',      // --surface-3: highest elevation, tooltips
    hover: '#2E2E2E',         // --surface-hover: interactive hover
  },

  // ─── Borders (alpha on white) ─────────────────────────────────
  border: {
    faint:    'rgba(255,255,255,0.06)',  // --border-faint: dividers, subtle
    subtle:   'rgba(255,255,255,0.10)',  // --border-subtle: default border
    default:  'rgba(255,255,255,0.18)',  // --border-default: focus, hover
    strong:   'rgba(255,255,255,0.45)',  // --border-strong: chips
    selected: 'rgba(255,255,255,0.88)', // --border-selected: selected state
  },

  // ─── Text ─────────────────────────────────────────────────────
  text: {
    primary:   '#FFFFFF',    // --text-primary: main content
    secondary: '#8A8A8A',    // --text-secondary: supporting text
    muted:     '#4A4A4A',    // --text-muted: placeholders, disabled
    amber:     '#D4890A',    // --text-amber: AI hints, warnings
  },

  // ─── Primary CTA ──────────────────────────────────────────────
  primary: {
    DEFAULT: '#F0F0F0',  // --btn-bg: main CTA button background
    hover:   '#FFFFFF',  // --btn-hover: CTA hover
    text:    '#0A0A0A',  // --btn-text: text on primary button
  },

  // ─── Semantic: Success / Positive ─────────────────────────────
  success: {
    DEFAULT:    '#4ADE80',                    // --pos-text: green
    background: 'rgba(74,222,128,0.08)',      // --pos-bg
    border:     'rgba(74,222,128,0.20)',
  },

  // ─── Semantic: Error / Negative ───────────────────────────────
  error: {
    DEFAULT:    '#F87171',                    // --neg-text: red
    background: 'rgba(248,113,113,0.08)',     // --neg-bg
    border:     'rgba(248,113,113,0.20)',
  },

  // ─── Semantic: Warning / Neutral ──────────────────────────────
  warning: {
    DEFAULT:    '#FBBF24',                    // --neu-text: yellow
    background: 'rgba(251,191,36,0.08)',      // --neu-bg
    border:     'rgba(251,191,36,0.20)',
  },

  // ─── Semantic: Amber (AI context / info) ──────────────────────
  amber: {
    DEFAULT:    '#D4890A',
    background: 'rgba(212,137,10,0.06)',
    backgroundMd: 'rgba(212,137,10,0.08)',
    backgroundStrong: 'rgba(212,137,10,0.15)',
    border:     'rgba(212,137,10,0.18)',
    borderMd:   'rgba(212,137,10,0.25)',
    borderStrong: 'rgba(212,137,10,0.30)',
    text:       'rgba(212,137,10,0.80)',
    textFull:   '#D4890A',
  },

  // ─── Semantic: Info / Blue ────────────────────────────────────
  info: {
    DEFAULT:    '#93C5FD',                    // score-mid: blue
    background: 'rgba(147,197,253,0.08)',
    border:     'rgba(147,197,253,0.20)',
  },
} as const;

export type ColorToken = typeof colors;
