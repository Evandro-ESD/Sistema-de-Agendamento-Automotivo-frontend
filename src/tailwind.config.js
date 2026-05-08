/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c9ff00",
        dark: "#111111",
        light: "#f5f5f5",
        border: "#d4d4d4",
      },
    },
  },
  plugins: [],
}
