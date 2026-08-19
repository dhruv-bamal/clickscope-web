import { delay, http, HttpResponse } from "msw";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "@/test/msw/server";
import { TEST_API_URL, makeUser } from "@/test/msw/handlers";
import { renderWithAuth } from "@/test/authHarness";

const STORAGE_KEY = "clickscope.token";

beforeEach(() => {
  localStorage.clear();
  window.history.pushState(null, "", "/");
});

describe("AuthContext — mount-time token restore", () => {
  it("captures a #token= fragment, stores it, and strips the fragment from the URL", async () => {
    const replaceStateSpy = vi.spyOn(window.history, "replaceState");
    window.history.pushState(null, "", "/dashboard?x=1#token=fragment-token");

    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("token")).toHaveTextContent("fragment-token"));
    expect(localStorage.getItem(STORAGE_KEY)).toBe("fragment-token");
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "/dashboard?x=1");
    expect(window.location.hash).toBe("");
  });

  it("restores a token already in localStorage when there is no fragment", async () => {
    localStorage.setItem(STORAGE_KEY, "stored-token");

    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("token")).toHaveTextContent("stored-token"));
  });

  it("leaves the token null when neither a fragment nor a stored token is present", async () => {
    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("loading")).toHaveTextContent("false"));
    expect(screen.getByTestId("token")).toHaveTextContent("null");
  });
});

describe("AuthContext — the /me fetch keyed on token", () => {
  it("sets user on a successful /me response", async () => {
    localStorage.setItem(STORAGE_KEY, "stored-token");
    server.use(http.get(`${TEST_API_URL}/api/auth/me`, () => HttpResponse.json({ user: makeUser({ email: "resolved@example.com" }) })));

    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("user-email")).toHaveTextContent("resolved@example.com"));
  });

  it("clears the token, user, and localStorage on a 401 from /me", async () => {
    localStorage.setItem(STORAGE_KEY, "stale-token");
    server.use(
      http.get(`${TEST_API_URL}/api/auth/me`, () =>
        HttpResponse.json({ error: { code: "UNAUTHORIZED", message: "Invalid token", requestId: "req-1" } }, { status: 401 }),
      ),
    );

    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("token")).toHaveTextContent("null"));
    expect(screen.getByTestId("user-email")).toHaveTextContent("null");
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("does not clear the token when its /me request is aborted by a newer token superseding it", async () => {
    // Seeds a slow first request (via localStorage restore), then swaps to a
    // second token before it resolves — the effect's cleanup aborts the
    // first request. The AbortError guard in AuthContext's .catch is what
    // stops that aborted rejection from wiping out the second token that
    // has, by then, already taken its place.
    localStorage.setItem(STORAGE_KEY, "first-token");
    server.use(
      http.get(`${TEST_API_URL}/api/auth/me`, async ({ request }) => {
        if (request.headers.get("authorization") === "Bearer first-token") {
          await delay(200);
          return HttpResponse.json({ user: makeUser({ email: "first@example.com" }) });
        }
        return HttpResponse.json({ user: makeUser({ email: "second@example.com" }) });
      }),
    );

    renderWithAuth();
    await waitFor(() => expect(screen.getByTestId("token")).toHaveTextContent("first-token"));

    fireEvent.click(screen.getByText("setToken")); // -> "manual-token", aborts the in-flight first request

    await waitFor(() => expect(screen.getByTestId("user-email")).toHaveTextContent("second@example.com"));
    expect(screen.getByTestId("token")).toHaveTextContent("manual-token");
  });
});

describe("AuthContext — logout", () => {
  it("clears token, user, and localStorage", async () => {
    localStorage.setItem(STORAGE_KEY, "stored-token");
    renderWithAuth();

    await waitFor(() => expect(screen.getByTestId("user-email")).not.toHaveTextContent("null"));

    fireEvent.click(screen.getByText("logout"));

    await waitFor(() => expect(screen.getByTestId("token")).toHaveTextContent("null"));
    expect(screen.getByTestId("user-email")).toHaveTextContent("null");
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
