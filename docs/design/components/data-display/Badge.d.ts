import React from "react";

/** Status badge — semantic tint + dot + label. Status is always conveyed by
 * text/icon, never color alone (colorblind-safe).
 * @startingPoint section="Data display" subtitle="Link + analytics status badges" viewport="700x150"
 */
export interface BadgeProps {
  /** Domain status shortcut; sets variant + default label. */
  status?: "active" | "expiring" | "expired" | "protected" | "paused";
  /** Explicit semantic variant (overrides status's variant). */
  variant?: "success" | "danger" | "warning" | "info" | "neutral";
  /** Show the leading status dot. */
  dot?: boolean;
  /** Custom label; defaults to the status's label. */
  children?: React.ReactNode;
  className?: string;
}
export function Badge(props: BadgeProps): JSX.Element;
