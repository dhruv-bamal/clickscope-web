import { expect, test } from "@playwright/test";

// Requires the real stack running: clickscope-api's Postgres + Redis
// (`docker compose up -d`), the API itself (`npm run dev`), and its worker
// (`npm run worker:dev`) — this test hits real HTTP endpoints, no MSW.
// This app's own dev server is started by playwright.config.ts's webServer.
// No CI wires this up yet; see Notes.md, "Phase 13b," for the Phase 15 gap.
const API_URL = "http://localhost:3000";
const STORAGE_KEY = "clickscope.token";

test("signup, create a link, click it, and see the count land on the dashboard and the stats endpoint", async ({ page, browser }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "correct horse battery staple";

  await page.goto("/signup");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL("**/dashboard");

  await page.getByRole("button", { name: "Create link" }).first().click();
  await page.getByLabel("Destination URL").fill("https://example.com/e2e-target");

  const createResponsePromise = page.waitForResponse((res) => res.url().endsWith("/api/links") && res.request().method() === "POST");
  await page.getByRole("dialog").getByRole("button", { name: "Create link" }).click();
  const createResponse = await createResponsePromise;
  const { link } = (await createResponse.json()) as { link: { id: string; shortCode: string } };

  const token = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(token).toBeTruthy();

  // A real click, from a fresh browser context (no shared cookies/session
  // with the dashboard tab). The redirect enqueues a BullMQ job (Phase 9)
  // instead of writing the click row synchronously — a separate worker
  // process performs that write, asynchronously.
  const visitorContext = await browser.newContext();
  const visitorPage = await visitorContext.newPage();
  await visitorPage.goto(`${API_URL}/${link.shortCode}`);
  await visitorContext.close();

  // Polls instead of a fixed sleep: the gap between "redirect happened" and
  // "the click row exists" is variable (queue latency + worker throughput),
  // so no fixed delay is both fast and reliable. toPass re-runs the reload
  // + assertion until it passes or times out, converging on the real
  // completion time in either direction.
  await expect(async () => {
    await page.reload();
    const clicksCell = page.locator("tbody tr").first().locator("td").nth(2);
    await expect(clicksCell).toHaveText("1");
  }).toPass({ timeout: 20_000, intervals: [500, 1000, 2000] });

  // Independently corroborate via the stats endpoint, not just the
  // dashboard's own rendering of the same data.
  const statsResponse = await page.request.get(`${API_URL}/api/links/${link.id}/stats?days=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(statsResponse.ok()).toBe(true);
  const { stats } = (await statsResponse.json()) as { stats: Array<{ day: string; clicks: number }> };
  const totalClicks = stats.reduce((sum, s) => sum + s.clicks, 0);
  expect(totalClicks).toBe(1);
});
