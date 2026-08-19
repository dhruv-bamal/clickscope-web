import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* The one filled indigo button is `primary` — never two per view.
   Variants: primary | secondary | ghost | destructive | link. Sizes sm|md|lg. */
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
}) {
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
