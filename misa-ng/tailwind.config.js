
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        ink: "#120B07",
        navy: "#0F172A",
        snow: "#F8FAFC",
        brand: "#FFB52A",
        gold: "#D99416",
        line: "#2A211C",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },

  plugins: [],
};