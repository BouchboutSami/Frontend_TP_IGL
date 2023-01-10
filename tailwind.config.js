/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        IGLorange: "#FF9505",
        IGLnoir: "#1B1B1B",
        IGLblanc: "#FFFBFB",
        IGLgris: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
