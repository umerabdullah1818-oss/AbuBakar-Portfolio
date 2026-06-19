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
        light: {
          50: "#ffffff",
          100: "#f8f9fc",
          200: "#f0f2f7",
          300: "#e4e7ef",
          400: "#ccd1de",
          500: "#9ba3b8",
        },
        accent: {
          DEFAULT: "#6366f1",
          deep: "#4f46e5",
          teal: "#14b8a6",
          rose: "#f43f5e",
          amber: "#f59e0b",
          sky: "#0ea5e9",
        },
      },
    },
  },
  plugins: [],
};
