/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A5FA8",
          terracotta: "#C8694A",
          ink: "#111827"
        }
      }
    }
  },
  plugins: []
};
