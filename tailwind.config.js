/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#faf9fa",
        nav: "#7a6eaa"
      },
      boxShadow: {
        input: [
          "rgb(118 69 217) 0px 0px 0px 1px",
          "rgb(118 69 217 / 60%) 0px 0px 0px 4px;"
        ]
      },
      outline: {
        input: "2px solid #0000ff"
      },
      borderColor: {
        header: "#e7e3eb"
      },
      fontFamily: {
        display: "Kanit"
      }
    }
  },
  plugins: []
};
