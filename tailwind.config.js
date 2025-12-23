/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Navy blue (from mockup)
        navy: {
          50: '#e6eaf0',
          100: '#c2ccd9',
          200: '#9badc2',
          300: '#748eab',
          400: '#567699',
          500: '#1e3a5f',
          600: '#1a3354',
          700: '#152a47',
          800: '#10213a',
          900: '#0a1628',
        },
        // Orange accent (from mockup)
        accent: {
          50: '#fef3ee',
          100: '#fde3d4',
          200: '#fbc5a8',
          300: '#f9a071',
          400: '#f67b3e',
          500: '#e86c2a',
          600: '#d45a1f',
          700: '#b04718',
          800: '#8c3914',
          900: '#6a2d11',
        },
        // Keep brand for text/neutrals
        brand: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#6c757d',
          500: '#495057',
          600: '#343a40',
          700: '#212529',
        },
      },
    },
  },
  plugins: [],
}
