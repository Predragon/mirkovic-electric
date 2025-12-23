/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f8f8',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b9b9b9',
          400: '#a2a2a2',
          500: '#1a1a1a',
          600: '#151515',
          700: '#0f0f0f',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
          },
        },
      },
    },
  },
  plugins: [],
}
