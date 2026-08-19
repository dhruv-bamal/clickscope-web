import React from "react";
import { Icon } from "../icon/Icon";

/* The one filled indigo button is `primary` — never two per view.
   Variants: primary | secondary | ghost | destructive | link. Sizes sm|md|lg. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name shown left of the label. */
  icon?: string;
  /** Lucide icon name shown right of the label. */
  iconRight?: string;
  /** Shows an inline spinner and disables the button while keeping its width. */
  loading?: boolean;
  /** Full-width (mobile primary / marketing CTA). */
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  block = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "cs-btn",
    `cs-btn--${variant}`,
    `cs-btn--${size}`,
    block ? "cs-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const iconSize = size === "lg" ? 18 : 16;
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="cs-spinner" aria-hidden="true" />
      ) : (
        icon && <Icon name={icon} size={iconSize} />
      )}
      {children && <span>{children}</span>}
      {iconRight && !loading && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
}
