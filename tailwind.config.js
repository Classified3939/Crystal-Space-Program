const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'csp-black': "#222831",
        'csp-gray': "#393E46",
        'csp-teal': "#00ADB5",
        'csp-white': "#EEEEEE",
        'csp-grass': "#009432",
        'csp-blue': "#00487C",
        'csp-orange': "#F3722C"
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
