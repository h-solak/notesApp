const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      notePink: '#c13188',
      notePurple: '#6d2acf',
      noteLemonGreen: '#b8c34b',
      noteRed: '#eb4d4b',
      grey05: 'rgba(255,255,255,0.5)',
      noteGrey: {
        300: '#929292',
        500: '#6d6d6d',
        900: '#222222',
      },

      //defaults
      transparent: 'transparent',
      current: 'currentColor' /* ??? */,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      fontFamily: {
        // sans: ['Montserrat-Bold'],
      },
    },
  },
  plugins: [],
};
