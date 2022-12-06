module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'csp-blue': "#00487C",
        'csp-white': "#EDF6F9",
      }
    },
  },
  variants: {
    extend: {
      'opacity': 'disabled',
    },
  },
  plugins: [],
}
