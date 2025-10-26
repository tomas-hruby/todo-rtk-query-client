/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          background: "#121212",
          surface: "#1e1e1e",
          header: "#0d1117",
          "primary-text": "#e0e0e0",
          "secondary-text": "#a0a0a0",
          border: "#333333",
          "price-up": "#4caf50",
          "price-down": "#f44336",
          accent: "#2196f3",
          "button-dark": "#2a2a2a",
          "button-dark-hover": "#363636",
          "error-bg": "#ff3d3d",
          "error-text": "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
