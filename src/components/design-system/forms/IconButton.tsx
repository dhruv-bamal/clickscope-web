import React from "react";
import { Icon } from "../icon/Icon";

/* Square icon-only control (copy, QR, kebab, close). Ghost by default,
   `secondary` for a bordered skin. `label` is the mandatory accessible name. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** Mandatory accessible name (sets aria-label + title). */
  label: string;
  variant?: "ghost" | "secondary";
  size?: "md" | "lg";
}

export function IconButton({ icon, label, variant = "ghost", size = "md", className = "", ...rest }: IconButtonProps) {
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
