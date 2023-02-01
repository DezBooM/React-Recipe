/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        passion: ['"Passions Conflict"'],
      },
    },
  },
  plugins: [require("tailwindcss-current")],
}
