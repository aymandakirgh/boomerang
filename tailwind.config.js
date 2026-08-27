/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['P22 Mackinac W01 Book', 'Georgia', 'serif'],
      },
      spacing: {
        // sm:pt-26 in the hero; not part of Tailwind's default scale
        26: '6.5rem',
      },
    },
  },
  plugins: [],
}
