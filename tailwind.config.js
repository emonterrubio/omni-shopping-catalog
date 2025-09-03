/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heritageBlue: '#255AF6',
        deepBlue: '#00071F',
        darkBlue: '#131357',
        skyBlue: '#AACCFF',
        steelGrey: '#B5C3D0',
        frostGrey: '#E0E7F1',
        white: '#FFFFFF',
        ultraviolet: '#614EDD',
        hyperCrimson: '#FF3F3F',
        circuitSurge: '#62FF85',
        solarVolt: '#EAFF69',
      },
      fontFamily: {
        'sans': ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'ea-text': ['ea-text', 'ui-sans-serif', 'system-ui'],
        'ea-display': ['ea-display', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}; 