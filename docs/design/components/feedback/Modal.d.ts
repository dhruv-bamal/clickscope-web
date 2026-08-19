import React from "react";

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
export function Modal(props: ModalProps): JSX.Element;
