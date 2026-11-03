import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

/** Helper: colour token driven by a CSS variable (RGB channels) so themes can swap at runtime. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

/**
 * SolTele design system.
 * Colours, glows, radii and motion are all derived from the logo:
 * deep forest green structuring the UI, neon green reserved for actions.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    /* Brand rule: tight radii only (2px to 5px). Circles stay available for dots and rings. */
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '2px',
      DEFAULT: '4px',
      md: '5px',
      lg: '5px',
      xl: '5px',
      '2xl': '5px',
      '3xl': '5px',
      full: '9999px',
    },
    extend: {
      screens: { xs: '390px', '3xl': '1680px' },
      colors: {
        brand: {
          neon: '#39d94a',
          green: '#22c55e',
          deep: '#063d2d',
          mid: '#0b5a44',
          forest: '#0a3d24',
          ink: '#041b12',
          night: '#020f0a',
          mist: '#f7faf8',
          anthracite: '#374151',
        },
        bg: token('bg'),
        surface: token('surface'),
        card: token('card'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-strong': token('accent-strong'),
        line: token('line'),
        forest: token('forest'),
        'forest-2': token('forest-2'),
      },
      fontFamily: {
        display: ['"Sora Variable"', 'Sora', ...defaultTheme.fontFamily.sans],
        sans: ['"Inter Variable"', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: { tightest: '-0.045em', eyebrow: '0.28em' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #063d2d 0%, #0b5a44 45%, #39d94a 100%)',
        'brand-text': 'linear-gradient(100deg, #15803d 0%, #22c55e 45%, #39d94a 100%)',
        'brand-text-dark': 'linear-gradient(100deg, #22c55e 0%, #39d94a 50%, #86efac 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(57,217,74,.35), 0 10px 32px -8px rgba(57,217,74,.55)',
        'glow-sm': '0 0 0 1px rgba(57,217,74,.25), 0 6px 18px -6px rgba(57,217,74,.45)',
        'glow-lg': '0 0 0 1px rgba(57,217,74,.2), 0 24px 70px -18px rgba(57,217,74,.45)',
        soft: '0 1px 2px rgba(4,27,18,.05), 0 18px 40px -18px rgba(4,27,18,.25)',
        lift: '0 2px 4px rgba(4,27,18,.06), 0 30px 60px -24px rgba(4,27,18,.35)',
        'inner-hl': 'inset 0 1px 0 rgba(255,255,255,.08)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.55)', opacity: '0' },
          '25%': { opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        flow: { to: { strokeDashoffset: '-240' } },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        'marquee-rev': { from: { transform: 'translate3d(-50%,0,0)' }, to: { transform: 'translate3d(0,0,0)' } },
        scan: {
          '0%': { transform: 'translate3d(0,-110%,0)' },
          '100%': { transform: 'translate3d(0,110%,0)' },
        },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
        shimmer: { from: { transform: 'translate3d(-100%,0,0)' }, to: { transform: 'translate3d(100%,0,0)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        pan: {
          '0%, 100%': { transform: 'rotate(-18deg)' },
          '50%': { transform: 'rotate(18deg)' },
        },
        wave: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        eq: { '0%, 100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        'pulse-ring': 'pulse-ring 4.5s cubic-bezier(.2,.6,.3,1) infinite',
        flow: 'flow 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee-rev 42s linear infinite',
        scan: 'scan 2.8s ease-in-out infinite alternate',
        blink: 'blink 2.4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        pan: 'pan 6s ease-in-out infinite',
        wave: 'wave 14s linear infinite',
        eq: 'eq 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

