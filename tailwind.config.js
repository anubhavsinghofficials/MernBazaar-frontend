/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    screens: {
      'xxs': '320px',
      'xs': '470px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        hoverWaveLR: {
          '0%, 100%': {
            transform: 'translateX(-10%)',
            'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.99)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0.45, 0.03, 0.35, 0.93)',
          },
        },
        hoverWaveTB: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.99)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0.45, 0.03, 0.35, 0.93)',
          },
        },
        lineLoader: {
          '0%':{
            width: '0%',
            transform: 'translateX(-105%)'
          },
          '20%':{
            width:'0%'
          },
          '60%':{
            width:'60%'
          },
          '100%':{
            width: '50%',
            transform: 'translateX(200%)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        hoverWaveLR : "hoverWaveLR 1s ease infinite",
        hoverWaveTB : "hoverWaveTB 1s ease infinite",
        lineLoader: "lineLoader 2s ease-in-out infinite"
      },
      fontFamily: {
        Roboto: ['Roboto'],
        BebasNeue: ['Bebas Neue']
      }
    },
  },
  plugins: [require("tailwindcss-animate"),
  require("tailwindcss-animation-delay")],
}