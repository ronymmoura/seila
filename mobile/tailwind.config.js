/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        body: "Poppins_400Regular",
        title: "Poppins_700Bold",
      },
      colors: {
        purple: {
          50: "#f3eefc",
          100: "#d8cbf7",
          200: "#c6b2f3",
          300: "#ab8eee",
          400: "#9b79ea",
          500: "#8257e5",
          600: "#764fd0",
          700: "#5c3ea3",
          800: "#48307e",
          900: "#372560",
        },
      },
    },
  },
  plugins: [],
};
