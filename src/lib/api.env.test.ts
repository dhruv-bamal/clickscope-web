import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Isolated in its own file: BASE_URL is a top-level `const` in api.ts,
// captured once at module-import time. Testing "what happens when the env
// var is missing" requires vi.resetModules() + a fresh dynamic import, and
// doing that inside api.test.ts would risk leaving a stale/reset module
// instance behind for that file's other cases.
describe("api.ts — missing NEXT_PUBLIC_API_URL", () => {
  const original = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = original;
    vi.resetModules();
  });

  it("fails loudly via console.error instead of silently resolving a wrong URL", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await import("./api");

    expect(errorSpy).toHaveBeenCalledWith(
      "NEXT_PUBLIC_API_URL is not set — copy .env.local.example to .env.local and restart the dev server.",
    );
  });
});
