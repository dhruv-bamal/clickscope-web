import React, { useEffect } from "react";
import { IconButton } from "../forms/IconButton.jsx";

/* Modal (dialog) — centered surface over a blurred scrim for focused decisions
   and short forms. Title + optional close, body, right-aligned footer actions.
   Esc closes; click on the scrim closes. Focus-trap wiring is the app's job. */
export function Modal({ open = true, title, onClose, footer, size = "md", children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const maxWidth = size === "lg" ? "32rem" : "var(--width-form)";
  return (
    <div className="cs-scrim" onClick={() => onClose && onClose()}>
      <div className="cs-modal" role="dialog" aria-modal="true" aria-label={title} style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
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
