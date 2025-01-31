/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: "#1476ff",
        secondary: "#f3f5ff",
        light: "#f9faff",
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-in",
        "bounce-slow": "bounce 3s linear infinite",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};