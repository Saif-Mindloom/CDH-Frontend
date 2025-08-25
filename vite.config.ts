import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: 'localhost',
    allowedHosts: true,
    // port: 3090,
    // strictPort: false,
    proxy: {
      "/graphql": {
        target: "https://cdh-be.mindloom.in",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
