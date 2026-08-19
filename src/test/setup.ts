import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw/server";

// "error" rather than "warn"/"bypass": an unmocked request is a test bug (a
// handler was missed, or a URL doesn't match TEST_API_URL), not something to
// silently let through to a real network call.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
