import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Square icon-only control (copy, QR, kebab, close). Ghost by default,
   `secondary` for a bordered skin. `label` is the mandatory accessible name. */
export function IconButton({ icon, label, variant = "ghost", size = "md", className = "", ...rest }) {
  const cls = [
    "cs-icon-btn",
    variant === "secondary" ? "cs-icon-btn--secondary" : "",
    size === "lg" ? "cs-icon-btn--lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={20} />
    </button>
  );
}
