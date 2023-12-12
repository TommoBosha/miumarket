/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: '#3ACCE9'
      },
      backgroundColor: {
        primary: '#3ACCE9',
        secondary:'#FFCD05',
        gradient: 'linear-gradient(180deg, rgba(180, 180, 180, 0.00) 20.31%, #333 100%)',
      },
      screens:{
        'xxl': '1440px',
      },
      
    },
  },
  plugins: [],
}

