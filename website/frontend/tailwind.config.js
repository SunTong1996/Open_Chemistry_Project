/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 18列的网格，用于元素周期表
        '18': 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} 