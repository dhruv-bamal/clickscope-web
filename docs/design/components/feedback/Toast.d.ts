import React from "react";

/** Toast — transient confirmation (link created, copied, deleted-with-undo).
 * Never for blocking errors that need a decision — those are inline or a modal. */
export interface ToastAction {
  label: string;
  onClick: () => void;
}
export interface ToastProps {
  variant?: "success" | "danger" | "info" | "warning";
  title: React.ReactNode;
  detail?: React.ReactNode;
  /** Single link-style action, e.g. Undo. */
  action?: ToastAction;
  onDismiss?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
