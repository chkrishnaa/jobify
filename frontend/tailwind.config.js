/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Override Tailwind colors with hex values to avoid oklch issue
        green: {
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        blue: {
          100: "#dbeafe",
          900: "#1e3a8a",
        },
        purple: {
          200: "#e9d5ff",
          950: "#1e0b44",
        },
      },
    },
  },
  plugins: [],
};
