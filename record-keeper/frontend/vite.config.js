import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Vite configuration
export default defineConfig({
  base: "/projects/record-keeper/", // ✅ **Set your hosting base for folder/subfolder deployment not this**
  plugins: [react()], // ✅ Enable React + JSX support
});
