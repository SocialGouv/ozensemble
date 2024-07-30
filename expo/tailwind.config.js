/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        ...Object.fromEntries(Array.from({ length: 41 }, (_, i) => [i * 0.5, `${i * 0.5 * 4}px`])),
      },
      lineHeight: {
        ...Object.fromEntries(Array.from({ length: 41 }, (_, i) => [i * 0.5, `${i * 0.5 * 4}px`])),
      },
    },
  },
  plugins: [],
};
