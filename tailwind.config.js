/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: "'Kanit', sans-serif",
        Montserrat: "'Montserrat', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};
