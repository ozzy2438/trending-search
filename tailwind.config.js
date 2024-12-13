/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e1e3e6',
          200: '#c2c5cb',
          300: '#9ca1ab',
          400: '#767d8a',
          500: '#5c6370',
          600: '#434a57',
          700: '#333a45',
          800: '#232831',
          900: '#1a1f27',
          950: '#0f1218',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
