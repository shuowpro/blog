module.exports = {
  future: 'all',
  experimental: 'all',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      aspectRatio: {
        '5/2': '5 / 2'
      }
    }
  }
};
