/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fingerPrint: ['FingerPrint'],
        topSecret: ['TopSecret'],
        raleway: ['Raleway'],
        bebas: ['Bebas'],
      },
    },
  },
  plugins: [],
}
