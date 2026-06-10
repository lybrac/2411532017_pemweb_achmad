/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold:     '#c5a572',
        navy:     '#0a192f',
        platinum: '#e5e4e2',
      },
    },
  },
  plugins: [],
}
