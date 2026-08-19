import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Tag chip — a rounded-full label on links (list, card, detail) and the
   dismissible active-filter pills in the filter bar. `onRemove` adds an x. */
export function Tag({ children, tone = "neutral", onRemove, className = "" }) {
  const tones = {
    neutral: { bg: "var(--color-surface-subtle)", fg: "var(--color-fg-muted)" },
    primary: { bg: "var(--color-primary-tint)", fg: "var(--color-primary-tint-fg)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
        padding: onRemove ? "2px 4px 2px 10px" : "2px 10px",
        borderRadius: "var(--radius-full)", background: t.bg, color: t.fg,
        fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)", lineHeight: "1rem", whiteSpace: "nowrap",
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "var(--radius-full)", border: 0, background: "transparent", color: "inherit", cursor: "pointer", opacity: 0.7 }}
        >
          <Icon name="x" size={12} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}
