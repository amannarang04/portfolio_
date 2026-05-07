/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--text-primary) / <alpha-value>)',
        black: 'rgb(var(--bg-primary) / <alpha-value>)',
        gray: {
          300: 'rgb(var(--text-secondary) / <alpha-value>)',
          400: 'rgb(var(--text-secondary) / <alpha-value>)',
          500: 'rgb(var(--text-secondary) / <alpha-value>)',
          600: 'rgb(var(--text-secondary) / <alpha-value>)',
          700: 'rgb(var(--border-color) / <alpha-value>)',
          800: 'rgb(var(--border-color) / <alpha-value>)',
          900: 'rgb(var(--bg-secondary) / <alpha-value>)',
        },
        cyber: {
          dark: 'rgb(var(--bg-primary) / <alpha-value>)',
          darker: 'rgb(var(--bg-secondary) / <alpha-value>)',
          cyan: '#00ffff',
          purple: '#a855f7',
          green: '#39ff14',
          pink: '#ff006e',
        }
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
