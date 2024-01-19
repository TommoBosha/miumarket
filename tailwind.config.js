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
        primary: "#3ACCE9",
        secondary: "#999",
        form: "#A0A0A0",
        accent: "#D7D7D7",
        cart: '#C8C8C8',
      },
      backgroundColor: {
        primary: "#3ACCE9",
        secondary: "#FFCD05",
        graybg: "#D7D7D7",
        counter: '#ECECEC',
        buttonSecondary: '#999',
        gradient:
          "linear-gradient(180deg, rgba(180, 180, 180, 0.00) 20.31%, #333 100%)",
      },
      screens: {
        sm: "425px",
        xxl: "1440px",
      },
      gridTemplateColumns: {
        footermobile: "148px minmax(0px, 1fr)",
        footer: "216px minmax(0px, 1fr)",
        footerxl: "382px minmax(0px, 1fr)",
        category: "132px minmax(0px, 1fr)",
        categoryxl: "150px minmax(0px, 1fr)",
        cart: '86px minmax(0px, 1fr)',
        cartXl: '119px minmax(0px, 1fr)',
        cartContainer: '389px minmax(0px, 1fr)',
        cartContainerXl: '637px minmax(0px, 1fr)',
        placeorderContainerXl: '518px minmax(0px, 1fr)',
        productContainerXl: '840px minmax(0px, 1fr)',
        productContainer: '698px minmax(0px, 1fr)'
        
      },
      gridAutoRows: {
        catalog: "176px",
        catalogxl: "198px",
        catalogxxl: "238px",
      },
      borderColor: {
        secondary: "#999",
        primary: "#D7D7D7",
        accent: "#3ACCE9",
      },
      stroke: {
        primary: "#3ACCE9",
      },
      maxWidth: {
        xxl: '836px'
      }
    },
  },
  plugins: [],
};
