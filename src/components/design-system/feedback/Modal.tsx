"use client";
// Own useEffect + window.addEventListener (Escape-key handling) — a browser
// API, unavailable to Server Components regardless of the Icon fix.

import React, { useEffect } from "react";
import { IconButton } from "../forms/IconButton";

/** Modal (dialog) — centered surface over a blurred scrim for focused decisions
 * and short forms (delete confirm, set password, QR display, create-link on mobile).
 * The destructive confirm's primary button IS the destructive variant. */
export interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  /** Called on Esc, scrim click, or the close button. Omit to hide the close button. */
  onClose?: () => void;
  /** Right-aligned footer action row (secondary + primary). */
  footer?: React.ReactNode;
  size?: "md" | "lg";
  children?: React.ReactNode;
}

export function Modal({ open = true, title, onClose, footer, size = "md", children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const maxWidth = size === "lg" ? "32rem" : "var(--width-form)";
  return (
    <div className="cs-scrim" onClick={() => onClose && onClose()}>
      <div
        className="cs-modal"
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="cs-modal__head">
            {title && <h2 className="cs-modal__title">{title}</h2>}
            {onClose && <IconButton icon="x" label="Close" onClick={onClose} />}
          </div>
        )}
        <div>{children}</div>
        {footer && <div className="cs-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
