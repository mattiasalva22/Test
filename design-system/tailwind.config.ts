import type { Config } from 'tailwindcss';

/**
 * Sapra.AI — Tailwind CSS Configuration
 * Extends Tailwind with Sapra design tokens.
 * Zero third-party plugin dependencies.
 */
const config: Config = {
  content: [
    './design-system/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── Colors ─────────────────────────────────────────────
      colors: {
        // Background surfaces
        bg:        '#000000',
        surface: {
          1:     '#0E0E0E',
          2:     '#1A1A1A',
          3:     '#242424',
          hover: '#2E2E2E',
        },
        // Border shades (CSS var references for alpha values)
        border: {
          faint:    'rgba(255,255,255,0.06)',
          subtle:   'rgba(255,255,255,0.10)',
          default:  'rgba(255,255,255,0.18)',
          strong:   'rgba(255,255,255,0.45)',
          selected: 'rgba(255,255,255,0.88)',
        },
        // Text
        text: {
          primary:   '#FFFFFF',
          secondary: '#8A8A8A',
          muted:     '#4A4A4A',
          amber:     '#D4890A',
        },
        // Primary CTA
        primary: {
          DEFAULT: '#F0F0F0',
          hover:   '#FFFFFF',
          text:    '#0A0A0A',
        },
        // Semantic
        success: {
          DEFAULT: '#4ADE80',
          bg:      'rgba(74,222,128,0.08)',
          border:  'rgba(74,222,128,0.20)',
        },
        error: {
          DEFAULT: '#F87171',
          bg:      'rgba(248,113,113,0.08)',
          border:  'rgba(248,113,113,0.20)',
        },
        warning: {
          DEFAULT: '#FBBF24',
          bg:      'rgba(251,191,36,0.08)',
          border:  'rgba(251,191,36,0.20)',
        },
        amber: {
          DEFAULT:    '#D4890A',
          bg:         'rgba(212,137,10,0.06)',
          'bg-md':    'rgba(212,137,10,0.08)',
          'bg-strong':'rgba(212,137,10,0.15)',
          border:     'rgba(212,137,10,0.18)',
          'border-md':'rgba(212,137,10,0.25)',
          text:       'rgba(212,137,10,0.80)',
        },
        info: {
          DEFAULT: '#93C5FD',
          bg:      'rgba(147,197,253,0.08)',
          border:  'rgba(147,197,253,0.20)',
        },
      },

      // ─── Font Families ────────────────────────────────────────
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
        sans:  ["'Satoshi'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:  ["'IBM Plex Mono'", "'Courier New'", 'monospace'],
      },

      // ─── Font Sizes (with line-height pairs) ──────────────────
      fontSize: {
        'display': ['26px', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'h1':      ['26px', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'h2':      ['22px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'h3':      ['18px', { lineHeight: '1.4',  letterSpacing: '-0.01em' }],
        'h4':      ['20px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body-lg': ['14px', { lineHeight: '1.55' }],
        'body':    ['13px', { lineHeight: '1.6'  }],
        'body-sm': ['12px', { lineHeight: '1.5'  }],
        'label':   ['10px', { lineHeight: '1',   letterSpacing: '0.08em' }],
        'label-sm':['9px',  { lineHeight: '1',   letterSpacing: '0.08em' }],
        'caption': ['10px', { lineHeight: '1',   letterSpacing: '0.04em' }],
        'caption-sm':['9px',{ lineHeight: '1',   letterSpacing: '0.06em' }],
      },

      // ─── Spacing ──────────────────────────────────────────────
      spacing: {
        '0.5': '2px',
        '1':   '4px',
        '1.5': '6px',
        '2':   '8px',
        '2.5': '10px',
        '3':   '12px',
        '3.5': '14px',
        '4':   '16px',
        '4.5': '18px',
        '5':   '20px',
        '5.5': '22px',
        '6':   '24px',
        '7':   '28px',
        '8':   '32px',
        '10':  '40px',
        '12':  '48px',
        '15':  '60px',
      },

      // ─── Border Radius ────────────────────────────────────────
      borderRadius: {
        'none': '0px',
        'xs':   '4px',
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '18px',
        '2xl':  '24px',
        'full': '9999px',
      },

      // ─── Box Shadows ──────────────────────────────────────────
      boxShadow: {
        'tooltip': '0 16px 48px rgba(0,0,0,0.60)',
        'card':    '0 4px 24px rgba(0,0,0,0.40)',
        'modal':   '0 24px 80px rgba(0,0,0,0.70)',
      },

      // ─── Z-Index ──────────────────────────────────────────────
      zIndex: {
        'raised':  '10',
        'tooltip': '100',
        'nav':     '1000',
        'modal':   '2000',
      },

      // ─── Keyframes ────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 220ms ease both',
        'fade-in': 'fadeIn 200ms ease both',
      },
    },
  },
  plugins: [],
};

export default config;
