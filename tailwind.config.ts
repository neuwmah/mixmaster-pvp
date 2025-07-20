import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      spacing: {
        '64': '64px' // no effect
                     // should turn h-64 class in height: 64 pixels style
                     // doesn't work, h-64 height was set by globals.css
      },
      colors: {

      },
      fontFamily: {

      },
    },
  },
  plugins: [],
};

export default config;