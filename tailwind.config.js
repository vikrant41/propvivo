/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      screens: {
        'xl': '1200px',
      },
      container: {
        center: true,
        padding: "15px",
      },
      fontFamily: {
        outfit: ["Outfit", "system-ui"],
        karla: ["Karla", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
      screens: {
        mxl: "992px",
      },
      fontSize: {
        "7xl": "60px",
        "6xl": "50px",
        48: "48px",
        "5xl": "40px",
        "4xl": "36px",
        32: "32px",
        xxl: "30px",
        "3xl": "28px",
        22: "22px",
        15: "15px",
        17: "17px",
      },
      borderRadius: {
        lg: "10px",
      },
      colors: {
        pvBlack: "#1B1B1B",
        accent: "#21263C",
        accent1: "#4790CD",
        accent2: "#7A7D9C",
        lightGreen: "#98CA3C",
        pvOrange: "#F38928",
        pvLightBlue: "#F6F9FF",
        btnDarkBlue: "#4790CD",
        associationBlack: "#1B1B1B",
        associationGreen : "#98CA3C",
        associationLightGreen: "#F8FFEA",
        associationGray : "#7A7D9C",
        associationLightBlue : "#F6F9FF",
        associationLightgray: "#DADADA",
        "gray-o": {
          600: "#CCCCCC",
          500: "#4E4F50",
          70: "#DADADA",
          60: "#CECECE",
          50: "#E8E8E8",
          40: "#A8B9DF",
          30: "#FFFFFF80",
          20: "#FFFFFF52",
          10: "#FFFFFF33",
        },
        "blue-o": {
          700: "#4058A6",
          600: "#4058A6",
          500: "#005EFF",
          400: "#2E94EA",
          200: "#415AA833",
          150: "#005EFF33",
          100: "#4058A6E5",
        },
        "yellow-o": {
          400: "#F8A95D",
        },
      },
      spacing: {
        22: "88px",
      },
      borderRadius: {
        "3xl": "20px",
        "5xl": "50px",
      },
      gap: {
        '15': '3.75rem',
      },
      boxShadow: {
        blueShadow: "0px 4px 10px 0px #4790CD66",
        menuShadow: "0px 4px 6px 0px #00000024",
        slideShadow: "0px 4px 50px 0px #00000014",
        imageshadow: "0px 0px 15px 0px #0000001A",
        testimonialShadow: "0px 0px 30px 0px #0000000F",
        newsletterShadow: "0px 4px 10px 0px #0F67EA66",
        imgShadow: "0px 0px 100px 0px #00000014",
      },
      backdropBlur: {
        "2.5xl": "50px",
      },
    },
  },
};
