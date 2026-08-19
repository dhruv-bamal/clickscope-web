import React from "react";
import { Icon } from "../icon/Icon";
import { IconButton } from "../forms/IconButton";

const ICONS = { success: "circle-check", danger: "circle-alert", info: "info", warning: "triangle-alert" } as const;

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

export function Toast({ variant = "success", title, detail, action, onDismiss }: ToastProps) {
  return (
    <div className={`cs-toast cs-toast--${variant}`} role="status">
      <span className={`cs-toast__icon--${variant}`} style={{ flex: "none", marginTop: 1 }}>
        <Icon name={ICONS[variant]} size={18} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="cs-toast__title">{title}</div>
        {detail && <div className="cs-toast__detail">{detail}</div>}
        {action && (
          <button type="button" className="cs-btn cs-btn--link" style={{ marginTop: 6 }} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && <IconButton icon="x" label="Dismiss" onClick={onDismiss} />}
    </div>
  );
}
