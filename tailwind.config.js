/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0b1020',
          card: '#ffffff',
          primary: '#10b981',
          primaryDark: '#059669',
          accent: '#2563eb',
        },
      },
      boxShadow: {
        card: '0 8px 28px rgba(2, 8, 23, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
