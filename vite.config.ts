import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

const BASE_URL = "/quiz-concorso/";

// https://vite.dev/config/
export default defineConfig({
  base: BASE_URL,
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
