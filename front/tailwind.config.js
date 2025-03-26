/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        spinClockwise: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinCounterClockwise: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
        spinClockwise: 'spinClockwise 0.5s ease-in-out',
        spinCounterClockwise: 'spinCounterClockwise 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
