import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // ✅ Adds React support for Vite
  plugins: [react()],

  // ✅ Dev server configuration
  server: {
    proxy: {
      // ✅ Proxy API requests starting with /api to backend server
      "/api": "http://localhost:5000",
    },
  },
});
