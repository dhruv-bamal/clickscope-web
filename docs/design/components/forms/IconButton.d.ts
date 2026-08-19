import React from "react";

/**
 * IconButton — square icon-only control (copy, QR, kebab, close). Requires an
 * accessible `label`. Ghost or secondary skin, centered 20px Lucide icon.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** Mandatory accessible name (sets aria-label + title). */
  label: string;
  variant?: "ghost" | "secondary";
  size?: "md" | "lg";
}
export function IconButton(props: IconButtonProps): JSX.Element;
