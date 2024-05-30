/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: { //adding custom colors
        brightRed: 'hsl(12, 88%, 59%)'
      }
    },
  },
  plugins: [],
};
