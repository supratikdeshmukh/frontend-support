/** @type {import('tailwindcss').Config} */
export default {
  // ✅ Files Tailwind should scan for class names
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {}, // ✅ Reserved for future customizations (optional)
  },

  plugins: [], // ✅ Add official Tailwind plugins here if needed
};
