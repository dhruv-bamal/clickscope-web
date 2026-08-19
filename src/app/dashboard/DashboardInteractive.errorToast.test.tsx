import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "@/test/msw/server";
import { TEST_API_URL } from "@/test/msw/handlers";
import { AuthProvider } from "@/context/AuthContext";
import { DashboardInteractive } from "./DashboardInteractive";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

const STORAGE_KEY = "clickscope.token";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(STORAGE_KEY, "test-token");
});

describe("DashboardInteractive — error Toast", () => {
  it("surfaces both the API error's message and requestId when an edit fails", async () => {
    const user = userEvent.setup();
    server.use(
      http.patch(`${TEST_API_URL}/api/links/:id`, () =>
        HttpResponse.json(
          { error: { code: "BAD_REQUEST", message: "Destination URL is invalid", requestId: "req-edit-400" } },
          { status: 400 },
        ),
      ),
    );

    render(
      <AuthProvider>
        <DashboardInteractive />
      </AuthProvider>,
    );

    await user.click(await screen.findByRole("button", { name: "Edit link" }));
    await user.click(await screen.findByRole("button", { name: "Save changes" }));

    const toast = await screen.findByRole("status");
    expect(toast).toHaveTextContent("Destination URL is invalid");
    expect(toast).toHaveTextContent("ref: req-edit-400");
  });
});
