/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Paths Tailwind should scan
  theme: {
    extend: {}, // ✅ Customize theme (colors, fonts, spacing, etc.)
  },
  plugins: [], // ✅ Add Tailwind plugins here (e.g., forms, typography)
};
