const { boxShadow } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  purge: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './components/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      spacing: {
        '2/3': '66.66666667%',
        '1/2': '50%',
        '1/3': '33.33333333%',
      },
      animation: {
        enter: 'enter 200ms ease-out',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
    container: {
      padding: '1rem',
      center: true,
    },
    boxShadow: {
      ...boxShadow,
      xs: '0 2px 2px rgba(0,0,0,0.02)',
      sm: '0 4px 4px rgba(0,0,0,0.02)',
    },
  },
}
