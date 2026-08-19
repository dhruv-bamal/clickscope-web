import { http, HttpResponse } from "msw";
import type { ApiUser } from "@/types/api";
import type { Link } from "@/types/link";

// Must match vitest.config.ts's test.env.NEXT_PUBLIC_API_URL exactly — MSW
// matches on full URLs, so a mismatch here means "onUnhandledRequest: error"
// fails every test with a confusing network error instead of the assertion
// the test actually cares about.
export const TEST_API_URL = "http://localhost:3000";

export function makeUser(overrides: Partial<ApiUser> = {}): ApiUser {
  return {
    id: "user-1",
    email: "test@example.com",
    emailVerified: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

export function makeLink(overrides: Partial<Link> = {}): Link {
  return {
    id: "link-1",
    userId: "user-1",
    shortCode: "abc123",
    destinationUrl: "https://example.com",
    expiresAt: null,
    maxClicks: null,
    clickCount: 0,
    isActive: true,
    isPasswordProtected: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

export const handlers = [
  http.post(`${TEST_API_URL}/api/auth/signup`, async () => {
    return HttpResponse.json({ user: makeUser(), token: "signup-token" }, { status: 201 });
  }),

  http.post(`${TEST_API_URL}/api/auth/login`, async () => {
    return HttpResponse.json({ user: makeUser(), token: "login-token" }, { status: 200 });
  }),

  http.get(`${TEST_API_URL}/api/auth/me`, async () => {
    return HttpResponse.json({ user: makeUser() }, { status: 200 });
  }),

  http.post(`${TEST_API_URL}/api/links`, async () => {
    return HttpResponse.json({ link: makeLink() }, { status: 201 });
  }),

  http.get(`${TEST_API_URL}/api/links`, async () => {
    return HttpResponse.json(
      { links: [makeLink()], pagination: { total: 1, limit: 20, offset: 0, hasMore: false } },
      { status: 200 },
    );
  }),

  http.get(`${TEST_API_URL}/api/links/:id`, async ({ params }) => {
    return HttpResponse.json({ link: makeLink({ id: params.id as string }) }, { status: 200 });
  }),

  http.get(`${TEST_API_URL}/api/links/:id/stats`, async ({ params, request }) => {
    const days = Number(new URL(request.url).searchParams.get("days") ?? "7");
    return HttpResponse.json({ linkId: params.id as string, days, stats: [] }, { status: 200 });
  }),

  http.patch(`${TEST_API_URL}/api/links/:id`, async ({ params }) => {
    return HttpResponse.json({ link: makeLink({ id: params.id as string }) }, { status: 200 });
  }),

  http.delete(`${TEST_API_URL}/api/links/:id`, async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
