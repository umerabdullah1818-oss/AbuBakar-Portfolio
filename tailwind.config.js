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
        dark: {
          50: "#0A0A0A",
          100: "#111111",
          200: "#161616",
          300: "#1a1a1a",
          400: "#222222",
          500: "#2a2a2a",
        },
        accent: {
          DEFAULT: "#00F0FF",
          deep: "#0055FF",
          purple: "#7F00FF",
          cyan: "#00F0FF",
          blue: "#0055FF",
        },
      },
    },
  },
  plugins: [],
};
