import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EditLinkModal, type EditLinkValues } from "./EditLinkModal";

const initialValues: EditLinkValues = {
  destinationUrl: "https://example.com",
  expiresAt: null,
  maxClicks: null,
  isPasswordProtected: false,
};

describe("EditLinkModal — regression guard: aliases are immutable after creation", () => {
  it("does not render a custom alias field", () => {
    render(<EditLinkModal shortCode="abc123" initialValues={initialValues} onClose={vi.fn()} onSave={vi.fn()} />);

    // queryBy, not getBy — this must resolve to null, not throw, for the
    // assertion below to be the thing that fails if a future change adds
    // the field (CreateLinkModal has one; this guards Edit from gaining it).
    expect(screen.queryByLabelText("Custom alias")).toBeNull();
  });

  it("shows the short link as a disabled, non-editable field instead", () => {
    render(<EditLinkModal shortCode="abc123" initialValues={initialValues} onClose={vi.fn()} onSave={vi.fn()} />);

    const shortLink = screen.getByLabelText("Short link");
    expect(shortLink).toBeDisabled();
    expect(shortLink).toHaveValue("abc123");
  });
});

describe("EditLinkModal — saving prop", () => {
  it("disables the Save button when the caller's PATCH request is in flight", () => {
    render(<EditLinkModal shortCode="abc123" initialValues={initialValues} onClose={vi.fn()} onSave={vi.fn()} saving />);

    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });

  it("leaves the Save button enabled when nothing is in flight", () => {
    render(<EditLinkModal shortCode="abc123" initialValues={initialValues} onClose={vi.fn()} onSave={vi.fn()} saving={false} />);

    expect(screen.getByRole("button", { name: "Save changes" })).not.toBeDisabled();
  });
});
