/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        flex: {
          dark: "#072b26",
          accent: "#1fb59a",
          muted: "#6b7280",
          card: "#ffffff"
        }
      },
      boxShadow: {
        card: "0 6px 18px rgba(15,23,42,0.06)",
      },
      borderRadius: {
        lg2: "12px"
      }
    }
  },
  plugins: [],
}