/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#faf7ff",
      secondary: "#34205b",
      secondary50: "#34205b80",
      secondary70: "#34205bb3",
      secondaryHover: "#34205bd0",
      darkGray: "#1C1C1C",
      darkGray20: "#1c1c1c33",
      darkGray60: "#1c1c1c99",
      gray: "#454545",
      lightGray: "#ebebeb",
      yellow: "#FFCE31",
      black50: "#00000080",
      black70: "#000000b3",
      white: "#fff",
      black: "#000",
      tarquoise: "#5178e7",
      tarquoiseHover: "#89a8ff",
      red: "#ff0000",
      green: "#008000",
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      mulish: ["Mulish", "sans-serif"],
      dancing: ["Dancing Script", "cursive"],
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      sm: "344px",
      md: "768px",
      lg: "1025px",
      xl: "1440px",
      "2xl": "1920px",
      "3xl": "2300px",
    },

    extend: {
      backgroundImage: {
        hero: "url(./src/assets/bg/hero.webp)",
        home: "url(./src/assets/bg/home hero.webp)",
        rooms: "url(./src/assets/bg/Hotel rooms bg.webp)",
        explore: "url(./src/assets/bg/explore hero.webp)",
      },
      boxShadow: {
        imageShadow: "30px -30px #34205b",
        mediumShadow: "20px -20px #34205b",
        smallShadow: "10px -10px #34205b",
      },
      lineClamp: {
        8: "8",
        11: "11",
        12: "12",
      },
      aspectRatio: {
        roomCard: "1 / 0.94",
      },
      borderWidth: {
        0.5: "0.5px",
        1: "1px",
      },
    },
  },
};
