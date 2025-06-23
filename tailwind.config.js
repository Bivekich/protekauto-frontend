/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ['Onest', 'sans-serif'],
      },
      colors: {
        red: {
          600: '#EC1C24',
          700: '#DC1C24',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        white: '#fff',
        'red-600': '#EC1C24',
        'red-700': '#DC1C24',
      },
    },
  },
  plugins: [],
} 