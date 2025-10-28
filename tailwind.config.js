/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          background: "var(--color-background)",
          surface: "var(--color-surface)",
          "primary-text": "var(--color-primary-text)",
          "secondary-text": "var(--color-secondary-text)",
          border: "var(--color-border)",
          "price-up": "var(--color-price-up)",
          "price-down": "var(--color-price-down)",
          accent: "var(--color-accent)",
          "button-dark": "var(--color-button-dark)",
          "button-dark-hover": "var(--color-button-dark-hover)",
          "error-bg": "var(--color-error-bg)",
          "error-text": "var(--color-error-text)",
        },
      },
    },
  },
  plugins: [],
};
