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
    fontFamily: {
      sans: [
        'PingFangSC',
        'Open Sans',
        'Helvetica Neue',
        'Arial',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        'WenQuanYi Micro Hei',
        'sans-serif'
      ]
    },
    extend: {
      aspectRatio: {
        '5/2': '5 / 2'
      }
    }
  }
};
