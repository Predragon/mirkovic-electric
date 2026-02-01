/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
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
        // Orange accent (adjusted for WCAG AA contrast)
        accent: {
          50: '#fef3ee',
          100: '#fde3d4',
          200: '#fbc5a8',
          300: '#f9a071',
          400: '#e86c2a',
          500: '#b54f19',  // Darkened for 4.5:1+ contrast with white
          600: '#9a4316',
          700: '#7f3712',
          800: '#642b0e',
          900: '#4a200a',
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
