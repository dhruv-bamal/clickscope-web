import React from "react";
import { Icon } from "../icon/Icon.jsx";
import { IconButton } from "../forms/IconButton.jsx";

const ICONS = { success: "circle-check", danger: "circle-alert", info: "info", warning: "triangle-alert" };

/* Toast — transient confirmation, bottom-right. Semantic left border + icon,
   short title, optional detail + single action. Success/info auto-dismiss;
   errors persist. Announced to assistive tech via the app's live region. */
export function Toast({ variant = "success", title, detail, action, onDismiss }) {
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
