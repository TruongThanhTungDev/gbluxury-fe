/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#00274c",
        gray: "#474242",
      },
      backgroundColor: {
        primary: "#00274c",
      },
      borderColor: {
        primary: "#00274c",
      },
    },
  },
  plugins: [],
};
