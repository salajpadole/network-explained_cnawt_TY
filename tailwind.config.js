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
        charcoal: {
          950: '#121210',
          900: '#181816',
          850: '#1E1E1C', // Primary Charcoal
          800: '#252522',
          750: '#2D2D29',
          700: '#383833',
          600: '#4A4A44',
          500: '#66665D',
          400: '#8A8A80',
          300: '#B0B0A6',
          200: '#D6D6CF',
          100: '#EDEDE8',
        },
        sand: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DFCE',
          300: '#D8CBB3', // Primary Sand
          400: '#C5B69B',
          500: '#A8997C',
          600: '#87785C',
          700: '#695C45',
          800: '#4F4432',
          900: '#383023',
        },
        electric: {
          300: '#759DFF',
          400: '#5284FF',
          500: '#2F6BFF', // Primary Electric Blue
          600: '#1C53E6',
          700: '#123EB5',
          800: '#0C2C85',
          900: '#071B54',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-electric': '0 0 35px -5px rgba(47, 107, 255, 0.45)',
        'glow-sand': '0 0 35px -5px rgba(216, 203, 179, 0.3)',
        'liquid-glass': 'inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.5), 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(47, 107, 255, 0.25)',
        'metal-plate': 'inset 0 1px 0 rgba(216, 203, 179, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(216, 203, 179, 0.12) 1px, transparent 1px)",
        'dot-matrix': "radial-gradient(rgba(47, 107, 255, 0.18) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
