/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/sections/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, 
      padding: {
        DEFAULT: "20px", 
        lg: "80px", 
      },
    },
    screens: {
      sm: "375px", 
      md: "768px", 
      lg: "1200px", 
    },
    extend: {
      colors: {
      },
    },
  },
  plugins: [],
};
