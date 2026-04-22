/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syncopate', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        ink: {
          black: '#0a0a0a',
          dark: '#121212',
          green: '#22c55e',
          accent: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
