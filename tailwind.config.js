/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#60a5fa",
          dark: "#1d4ed8",
        },
        dark: "#0f172a",
        accent: "#4F46E5",
      },
    },
  },
  plugins: [],
}
