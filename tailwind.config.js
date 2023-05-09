const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "rgba(0, 0, 0, 0.08) 0px 1px 4px;",
        200: "0px -26px 23px -1px rgba(247, 241, 243, 1)",
        300: "0px 26px 23px -1px rgba(247, 241, 243, 1)",
      },
      colors: {
        background: {
          100: "#F7f1f3",
        },
        white: {
          100: "#ffffff",
          200: "#f0f6fc",
        },
        yellow: {
          100: "#fcd53b",
        },
        gray: {
          100: "#ece8eb",
          200: "#ece8eb",
          300: "#b5b8b9",
          400: "#fcfcfc",
          500: "#ece8eb",
        },
        blue: {
          100: "#94ccff",
          200: "#4432ff",
          300: "#e2e9fa",
        },
        red: {
          100: "#EF476F",
        },
        green: {
          100: "#59cbc0",
        },
        syntax: {
          color: "#dd4a68",
          background: "#EEEEEE",
        },
        scrollbar: {
          thumb: "#919191",
          "thumb-hover": "#b7b7b7",
        },
        selection: {
          background: "#4432ff",
          color: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-walsheim)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-league-mono)", ...defaultTheme.fontFamily.mono],
        serif: ["var(--font-kenfolg)", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
