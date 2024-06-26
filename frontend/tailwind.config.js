/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        'custom': '80vh'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: []
  }
}

