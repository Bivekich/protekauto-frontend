/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D336C',
        secondary: '#EC1C24',
        gray: {
          400: '#8893A1',
        },
      },
      fontFamily: {
        onest: ['Onest', 'sans-serif'],
        golosText: ['Golos Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
