/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wood: {
          lightest: '#FBF6EF',
          light:    '#F2E8D8',
          mid:      '#E2CBA8',
          warm:     '#C9A87C',
          deep:     '#A67C52',
          dark:     '#7A5230',
          darkest:  '#4A2E14',
        },
        sage: {
          light: '#D6E5D0',
          DEFAULT: '#8FA882',
          dark:  '#4A6B40',
        },
        dusty: {
          light: '#C8D8E8',
          DEFAULT: '#7A9AB8',
          dark:  '#3A5A78',
        },
        peach: {
          light: '#F0DBC8',
          DEFAULT: '#D4956A',
          dark:  '#8B4A20',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}