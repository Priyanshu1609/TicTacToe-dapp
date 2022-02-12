module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFCF40",
        },
        dark: {
          DEFAULT: "#4B4D50",
          300: "#717376",
        },
        blackblue: {
          DEFAULT: '#0c1014',
        }

      },

    },
  },
  plugins: [],
}