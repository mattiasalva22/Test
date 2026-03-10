/**
 * Sapra.AI — Effects Tokens
 * Border radius, shadows, z-index, transitions, animations
 */

// ─── Border Radius ────────────────────────────────────────────
export const borderRadius = {
  none: '0px',
  xs:   '4px',   // --r-xs: small badges, inner checkboxes
  sm:   '6px',   // --r-sm: hint boxes, small elements
  md:   '10px',  // --r-md: sidebar items, stats bar, ai-hint
  lg:   '14px',  // --r-lg: role cards, inputs, buttons
  xl:   '18px',  // --r-xl: primary buttons (lg), article lists
  '2xl': '24px', // --r-2xl: illustration box (reserved)
  full: '9999px',// for pills, tags, counters
} as const;

// ─── Box Shadows ─────────────────────────────────────────────
export const shadows = {
  /** No shadow */
  none: 'none',
  /** Tooltip shadow — heavy dark drop */
  tooltip: '0 16px 48px rgba(0,0,0,0.60)',
  /** Card elevation — subtle lift */
  card:    '0 4px 24px rgba(0,0,0,0.40)',
  /** Modal overlay */
  modal:   '0 24px 80px rgba(0,0,0,0.70)',
} as const;

// ─── Z-Index ─────────────────────────────────────────────────
export const zIndex = {
  base:    0,
  raised:  10,   // wizard header sticky
  tooltip: 100,  // contextual tooltips
  nav:     1000, // screen nav bar (top fixed)
  modal:   2000, // modals and overlays
} as const;

// ─── Transitions ─────────────────────────────────────────────
export const transitions = {
  /** Default UI transition */
  default: 'all 150ms ease',
  /** Fast color-only transition */
  color:   'color 150ms ease',
  /** Background transitions */
  bg:      'background 120ms ease',
  /** Slow for page-level animations */
  slow:    'all 220ms ease',
  /** Progress bar */
  progress: 'width 300ms ease',
  /** Loading message fade */
  fade:    'opacity 200ms ease',
} as const;

// ─── Animation keyframe names (reference) ────────────────────
export const animations = {
  /** Screen entry animation (fadeUp) */
  fadeUp: 'fadeUp 220ms ease',
  /** Spinner for loading states */
  spin:   'spin 1s linear infinite',
} as const;

export type BorderRadiusToken = typeof borderRadius;
export type ShadowToken       = typeof shadows;
export type ZIndexToken       = typeof zIndex;
