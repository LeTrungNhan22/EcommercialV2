/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "false",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
