import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5001,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
