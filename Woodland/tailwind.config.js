/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bellRing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '1%, 3%': { transform: 'rotate(30deg)' },
          '2%, 4%': { transform: 'rotate(-28deg)' },
          '5%': { transform: 'rotate(34deg)' },
          '6%': { transform: 'rotate(-32deg)' },
          '7%': { transform: 'rotate(30deg)' },
          '8%': { transform: 'rotate(-28deg)' },
          '9%': { transform: 'rotate(26deg)' },
          '10%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        bellRing: 'bellRing 0.9s ease-in-out',
      },
    },
  },
  plugins: [],
}
