import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Vite Configuration for React App
export default defineConfig({
  // ✅ Set the base path for deployment (e.g., if hosted under a subfolder)
  base: "./",

  // ✅ Add React plugin to support JSX and fast refresh
  plugins: [react()],
});
