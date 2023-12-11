/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "red",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
  },
  plugins: [],
};
