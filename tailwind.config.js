/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#09223b',
          950: '#041324',
        },
        cyan: {
          primary: '#00bcd4',
          deep: '#00838f',
          light: '#e0f7fa',
          ultralight: '#f2fbfc',
          border: '#b2ebf2'
        },
        sand: {
          gold: '#f59e0b',
          soft: '#fffbeb',
          border: '#fde68a'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 188, 212, 0.08)',
        'card-hover': '0 16px 40px rgba(0, 188, 212, 0.18)',
        'pass': '0 20px 50px rgba(0, 188, 212, 0.25)',
      }
    },
  },
  plugins: [],
}

