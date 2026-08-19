import React from "react";

/**
 * Button — the primary action control. `primary` is the single filled indigo
 * button per view; everything else is secondary/ghost/destructive/link.
 * @startingPoint section="Forms" subtitle="Primary / secondary / ghost / destructive" viewport="700x150"
 */
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
export function Button(props: ButtonProps): JSX.Element;
