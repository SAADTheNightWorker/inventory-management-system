/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007bff", // Your primary color
      },
      animation: {
        shake: "bell-shake 0.9s ease-in-out infinite",
      },
      keyframes: {
        "bell-shake": {
          "0%": { transform: "rotate(0deg)", transformOrigin: "top center" },
          "10%": { transform: "rotate(14deg)", transformOrigin: "top center" },
          "20%": { transform: "rotate(-12deg)", transformOrigin: "top center" },
          "30%": { transform: "rotate(10deg)", transformOrigin: "top center" },
          "40%": { transform: "rotate(-8deg)", transformOrigin: "top center" },
          "50%": { transform: "rotate(6deg)", transformOrigin: "top center" },
          "60%": { transform: "rotate(-4deg)", transformOrigin: "top center" },
          "70%": { transform: "rotate(3deg)", transformOrigin: "top center" },
          "80%": { transform: "rotate(-2deg)", transformOrigin: "top center" },
          "90%": { transform: "rotate(1deg)", transformOrigin: "top center" },
          "100%": { transform: "rotate(0deg)", transformOrigin: "top center" },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('./public/logo-png/1.png')", // Custom background image
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
