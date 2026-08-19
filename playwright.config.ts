import { defineConfig, devices } from "@playwright/test";

// Requires the real stack running alongside this: clickscope-api's Postgres
// + Redis (`docker compose up -d`), its API (`npm run dev`), and its worker
// (`npm run worker:dev`) — see Notes.md, "Phase 13b," for why the click
// count this test polls for is written by that worker asynchronously, not
// by the redirect request itself. No CI wires any of this up yet (Phase 15).
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
