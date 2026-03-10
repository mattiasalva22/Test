/**
 * Sapra.AI — Spacing Tokens
 *
 * The wireframe uses a mixed 4px / 2px base.
 * After normalising, the dominant rhythm is 4px with occasional 2px micro-steps.
 * Values extracted from padding, gap and margin values in style.css.
 */

export const spacing = {
  0:  '0px',
  px: '1px',
  0.5: '2px',
  1:  '4px',
  1.5: '6px',
  2:  '8px',
  2.5: '10px',
  3:  '12px',
  3.5: '14px',
  4:  '16px',
  4.5: '18px',
  5:  '20px',
  5.5: '22px',
  6:  '24px',
  7:  '28px',
  8:  '32px',
  10: '40px',
  12: '48px',
  15: '60px',
} as const;

/**
 * Named semantic spacings for common UI patterns.
 * Maps to the values above.
 */
export const semanticSpacing = {
  /** Micro gap: icon inside badge, close button padding */
  micro:   spacing[0.5],   // 2px
  /** Tight gap: dot-lines, small inline gaps */
  tight:   spacing[1],     // 4px
  /** Small gap: tag gaps, chip gaps, icon+text in buttons */
  small:   spacing[2],     // 8px
  /** Default gap: between form fields, source rows */
  default: spacing[2.5],   // 10px
  /** Medium gap: wizard body sections, card internal padding */
  medium:  spacing[3],     // 12px
  /** Large gap: between cards, wizard sections */
  large:   spacing[4],     // 16px
  /** XL gap: wizard body top padding, loading body spacing */
  xl:      spacing[7],     // 28px
  /** Page padding: outer screen padding */
  page:    spacing[10],    // 40px
  /** Section padding: large card padding top/bottom */
  section: spacing[12],    // 48px
} as const;

export type SpacingToken = typeof spacing;
