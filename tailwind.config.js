const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      // noteBlack: '#000000',
      // noteWhite: '#ffffff',
      notePink: '#c13188',
      notePurple: '#6d2acf',
      noteLemonGreen: '#b8c34b',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat-Regular'],
      },
    },
  },
  plugins: [],
};
