/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        imperial: {
          DEFAULT: '#C8102E',
          red: '#C8102E',
          hover: '#A60D25',
          light: '#FDF2F4',
        },
        jade: {
          DEFAULT: '#00A86B',
          green: '#00A86B',
          hover: '#008F5A',
          light: '#E6F6F0',
        },
        ming: {
          DEFAULT: '#0047AB',
          blue: '#0047AB',
          hover: '#003B91',
          light: '#E6EDF7',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          dark: '#1A1A1A',
          medium: '#4A4A4A',
          light: '#7A7A7A',
        },
        chinese: {
          white: '#FFFFFF',
          offwhite: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
