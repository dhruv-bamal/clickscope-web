import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateLinkModal } from "./CreateLinkModal";

describe("CreateLinkModal", () => {
  it("renders a custom alias field", () => {
    render(<CreateLinkModal onClose={vi.fn()} onCreate={vi.fn()} />);
    expect(screen.getByLabelText("Custom alias")).toBeInTheDocument();
  });

  it("updates the destination URL input as the user types, via real keystrokes", async () => {
    const user = userEvent.setup();
    render(<CreateLinkModal onClose={vi.fn()} onCreate={vi.fn()} />);

    const dest = screen.getByLabelText("Destination URL");
    await user.type(dest, "https://acme.test/path");

    expect(dest).toHaveValue("https://acme.test/path");
  });

  it("disables the Save button while onCreate's promise is pending", async () => {
    const user = userEvent.setup();
    let resolveCreate!: () => void;
    const onCreate = vi.fn(() => new Promise<void>((resolve) => (resolveCreate = resolve)));

    render(<CreateLinkModal onClose={vi.fn()} onCreate={onCreate} />);

    await user.type(screen.getByLabelText("Destination URL"), "https://acme.test");
    const saveButton = screen.getByRole("button", { name: "Create link" });

    await user.click(saveButton);
    expect(saveButton).toBeDisabled();

    resolveCreate();
    await waitFor(() => expect(saveButton).not.toBeDisabled());
  });
});
