/** @type {import('tailwindcss').Config} */
const { join } = require("path");
module.exports = {
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
  // content: [
  //   join(__dirname, "src/pages/**/*.{js,ts,jsx,tsx}"),
  //   join(__dirname, "src/components/**/*.{js,ts,jsx,tsx)"),
  // ],
  content: [
    "./src/pages/**/*.js",
    "./src/pages/*.js",
    "./src/components/**/*.js",
    "./src/components/*.js",
    "/src/helpers/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: "'Kanit', sans-serif",
        Montserrat: "'Montserrat', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        primary: "#3f51b5",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/typography"),
  ],
};
