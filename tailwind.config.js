/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
        cursive: ["'Dancing Script'", "cursive"],
      },
      colors: {
        dark: { 900: "#111", 800: "#161616", 700: "#1a1a1a", 600: "#1f1f1f", 500: "#252525", 400: "#2a2a2a" },
        accent: { DEFAULT: "#4fc3f7", deep: "#2979ff", purple: "#aa00ff", green: "#00e676" },
      },
    },
  },
  plugins: [],
};
