/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#edb798",
          dark: "#e5b195",
        },
      },
    },
    screens: {
      tablet: "668px",
    },
  },
  plugins: [],
  darkMode: "class",
};
