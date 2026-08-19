import React from "react";

/* Status badge — a semantic tint + dot + text label (never color alone).
   Domain statuses map via `status`: active→success, expiring→warning,
   expired→danger, protected→info, paused→neutral. Or set `variant` directly. */
const STATUS = {
  active: { variant: "success", label: "Active" },
  expiring: { variant: "warning", label: "Expiring soon" },
  expired: { variant: "danger", label: "Expired" },
  protected: { variant: "info", label: "Password" },
  paused: { variant: "neutral", label: "Paused" },
};

export function Badge({ status, variant, dot = true, children, className = "" }) {
  const s = status ? STATUS[status] : null;
  const v = variant || (s && s.variant) || "neutral";
  const label = children || (s && s.label);
  return (
    <span className={["cs-badge", `cs-badge--${v}`, className].filter(Boolean).join(" ")}>
      {dot && <span className="cs-badge__dot" />}
      {label}
    </span>
  );
}
