/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F4F1',
        warmSurface: '#FAF8F0',
        darkCharcoal: '#171717',
        charcoalLight: '#292929',
        coopGreen: '#07945B',
        coopDark: '#065F46',
        coopSoft: '#E5F4EC',
        coopMuted: '#ECFDF3',
        yellowAccent: '#F5D45A',
        yellowSoft: '#FFF5C9',
        yellowGlow: '#FFF9E5',
        mutedText: '#858585',
        hairline: '#E5E5E0',
        alertCoral: '#F04438',
        alertCoralSoft: '#FEF3F2',
        aiIndigo: '#5B4FE8',
        aiSoft: '#EEF2FF',
        aiBorder: '#C7D2FE',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        subtle: '0 2px 8px -2px rgba(23, 23, 23, 0.04), 0 1px 4px -1px rgba(23, 23, 23, 0.02)',
        card: '0 12px 32px -8px rgba(23, 23, 23, 0.05), 0 2px 6px -1px rgba(23, 23, 23, 0.02)',
        elevated: '0 20px 48px -12px rgba(23, 23, 23, 0.08)',
        pill: '0 4px 16px -2px rgba(23, 23, 23, 0.12)',
      }
    },
  },
  plugins: [],
}
