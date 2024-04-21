/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      mobile: { max: '639px' }, // Thêm breakpoint mới cho mobile
    },
    extend: {
      fontFamily: {
        pizza: 'Roboto Mono, monospace',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
