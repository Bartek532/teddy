const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: {
        100: "#F7f1f3",
      },
      white: {
        100: "#ffffff",
        200: "#f0f6fc",
      },
      gray: {
        100: "#ece8eb",
        200: "#ece8eb",
        300: "#b5b8b9",
        400: "#fcfcfc",
        500: "#ece8eb",
      },
    },
    fontFamily: {
      sans: ["var(--font-walsheim)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-league-mono)", ...defaultTheme.fontFamily.mono],
      serif: ["var(--font-kenfolg)", ...defaultTheme.fontFamily.serif],
    },
    extend: {},
  },
  plugins: [],
};
