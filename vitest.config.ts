import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Hand-declared to mirror tsconfig.json's "@/*": ["./src/*"] — Vitest's
      // Vite-based resolver doesn't read tsconfig paths on its own, and one
      // alias isn't worth an extra vite-tsconfig-paths dependency.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/e2e/**"],
    env: {
      // Must match src/test/msw/handlers.ts's base URL exactly, or MSW's
      // path matching never intercepts the URLs lib/api.ts builds.
      NEXT_PUBLIC_API_URL: "http://localhost:3000",
    },
  },
});
