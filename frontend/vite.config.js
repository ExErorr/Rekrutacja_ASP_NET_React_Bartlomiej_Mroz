import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ⬅️ Required for Docker to expose Vite
    port: 5173, // ⬅️ Optional: can change if needed
    strictPort: true, // Optional: if 5173 is taken, fail loudly
  },
});
