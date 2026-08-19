import { delay, http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/msw/server";
import { TEST_API_URL } from "@/test/msw/handlers";
import { createLink, deleteLink, getLink, getLinkStats, getMe, listLinks, login, signup, updateLink } from "./api";

describe("api.ts — error envelope parsing", () => {
  it("preserves code, message, and requestId from a non-2xx JSON body", async () => {
    server.use(
      http.get(`${TEST_API_URL}/api/links/:id`, () =>
        HttpResponse.json({ error: { code: "NOT_FOUND", message: "Link not found", requestId: "req-abc-123" } }, { status: 404 }),
      ),
    );

    await expect(getLink("token", "missing-id")).rejects.toMatchObject({
      status: 404,
      code: "NOT_FOUND",
      message: "Link not found",
      requestId: "req-abc-123",
    });
  });
});

describe("api.ts — 204 handling", () => {
  it("resolves to undefined without attempting to parse a body", async () => {
    // The default handler already returns a bodyless 204 — if request() ever
    // called res.json() on it, that call throws a SyntaxError (not an
    // ApiError), which would surface here as a rejected promise instead of
    // this resolving cleanly.
    await expect(deleteLink("token", "link-1")).resolves.toBeUndefined();
  });
});

describe("api.ts — 429 handling", () => {
  it("populates retryAfterSeconds from the error body's details", async () => {
    server.use(
      http.post(`${TEST_API_URL}/api/links`, () =>
        HttpResponse.json(
          {
            error: {
              code: "TOO_MANY_REQUESTS",
              message: "Slow down",
              requestId: "req-429-1",
              details: { retryAfterSeconds: 42 },
            },
          },
          { status: 429 },
        ),
      ),
    );

    await expect(createLink("token", { destinationUrl: "https://example.com" })).rejects.toMatchObject({
      status: 429,
      retryAfterSeconds: 42,
    });
  });

  it("falls back to the Retry-After header when the body has no details", async () => {
    server.use(
      http.post(`${TEST_API_URL}/api/links`, () =>
        HttpResponse.json(
          { error: { code: "TOO_MANY_REQUESTS", message: "Slow down", requestId: "req-429-2" } },
          { status: 429, headers: { "Retry-After": "17" } },
        ),
      ),
    );

    await expect(createLink("token", { destinationUrl: "https://example.com" })).rejects.toMatchObject({
      status: 429,
      retryAfterSeconds: 17,
    });
  });
});

describe("api.ts — aborted requests", () => {
  const cases: Array<[string, (signal: AbortSignal) => Promise<unknown>]> = [
    ["signup", (signal) => signup({ email: "a@b.com", password: "password123" }, signal)],
    ["login", (signal) => login({ email: "a@b.com", password: "password123" }, signal)],
    ["getMe", (signal) => getMe("token", signal)],
    ["createLink", (signal) => createLink("token", { destinationUrl: "https://example.com" }, signal)],
    ["listLinks", (signal) => listLinks("token", { limit: 20, offset: 0 }, signal)],
    ["getLink", (signal) => getLink("token", "link-1", signal)],
    ["getLinkStats", (signal) => getLinkStats("token", "link-1", 7, signal)],
    ["updateLink", (signal) => updateLink("token", "link-1", {}, signal)],
    ["deleteLink", (signal) => deleteLink("token", "link-1", signal)],
  ];

  it.each(cases)("%s rejects with AbortError when its signal is aborted before the response arrives", async (_name, call) => {
    server.use(
      http.all("*", async () => {
        await delay(50);
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    const controller = new AbortController();
    const promise = call(controller.signal);
    controller.abort();
    await expect(promise).rejects.toMatchObject({ name: "AbortError" });
  });
});
