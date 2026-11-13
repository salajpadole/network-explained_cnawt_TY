/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        monograph: {
          950: '#06080D',
          900: '#0B0F17',
          850: '#101622',
          800: '#161E2E',
          750: '#1D273B',
          700: '#26334B',
          600: '#3D4F6F',
          500: '#5E7399',
          400: '#8FA2C2',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        ink: {
          primary: '#F8FAFC',
          muted: '#94A3B8',
          faint: '#475569',
          border: '#1E293B',
          subtle: '#0F172A',
        },
        phosphor: {
          cyan: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          violet: '#8B5CF6',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.3)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.3)',
        'glow-amber': '0 0 35px -5px rgba(245, 158, 11, 0.3)',
        'glow-rose': '0 0 35px -5px rgba(244, 63, 94, 0.3)',
        'subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px)",
        'dot-matrix': "radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
