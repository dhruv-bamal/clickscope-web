import React from "react";
import { Modal, Button } from "@/components/design-system";

/**
 * DeleteConfirmModal — a concrete instance of the pattern Modal.prompt.md
 * documents (destructive confirm: title "Delete link?", secondary Cancel +
 * destructive primary in the footer, one line of permanence copy) but that
 * the handoff bundle never actually ships anywhere. Parameterized so the same
 * component serves both a single-row delete and BulkActionToolbar's
 * count-aware bulk delete ("The Delete action must route through the
 * destructive confirm modal naming the count" — BulkActionToolbar.d.ts).
 */
export type DeleteConfirmTarget = { kind: "single"; shortUrl: string } | { kind: "bulk"; count: number };

export interface DeleteConfirmModalProps {
  open?: boolean;
  target: DeleteConfirmTarget;
  onCancel: () => void;
  onConfirm: () => void;
  /** True while the caller's DELETE request is in flight — disables both
   * buttons and shows a spinner on Confirm, so a double click can't fire two
   * requests. */
  saving?: boolean;
}

export function DeleteConfirmModal({ open = true, target, onCancel, onConfirm, saving = false }: DeleteConfirmModalProps) {
  const title = target.kind === "single" ? "Delete link?" : `Delete ${target.count} links?`;
  const body =
    target.kind === "single" ? (
      <>
        This permanently deletes <span className="cs-mono">{target.shortUrl}</span>. It can&apos;t be undone.
      </>
    ) : (
      <>This permanently deletes {target.count} links. It can&apos;t be undone.</>
    );
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} loading={saving}>
            {target.kind === "single" ? "Delete link" : "Delete links"}
          </Button>
        </>
      }
    >
      {body}
    </Modal>
  );
}
