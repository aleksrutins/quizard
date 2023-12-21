import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Geist Sans', 'system-ui', 'sans-serif']
      },
      borderColor(utils) {
        return {
          'default': utils.colors.stone['500']
        }
      }
    },
  },
  plugins: [],
} satisfies Config

