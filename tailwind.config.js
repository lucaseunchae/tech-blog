/* eslint-disable */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            ':not(pre) > code.language-text': {
              padding: '0.2em 0.4em !important',
              color: `#fa1c1c !important`,
              background: `rgba(135,131,120,.15) !important`,
              fontSize: '0.9em',
              fontWeight: '500',
            },
          },
        },
      }),
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}
