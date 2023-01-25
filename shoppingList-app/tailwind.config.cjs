
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#ec645b",
        "primary-light":"#fbc1bb",
      },
      screens: {
        xs: '480px',
        sm: '500px',
        md: '1024px',
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}