import React from "react";
import { Icon } from "../icon/Icon";

/* Tag chip — a rounded-full label used for the dismissible active-filter pills
   in FilterBar. `onRemove` adds a trailing x. (Not used for link tags — the
   API has no tags field; see Notes.md, "What the bundle gave and didn't".) */
export interface TagProps {
  children: React.ReactNode;
  tone?: "neutral" | "primary";
  /** When provided, renders a trailing × that calls this. */
  onRemove?: () => void;
  className?: string;
}

const TONES = {
  neutral: { bg: "var(--color-surface-subtle)", fg: "var(--color-fg-muted)" },
  primary: { bg: "var(--color-primary-tint)", fg: "var(--color-primary-tint-fg)" },
} as const;

export function Tag({ children, tone = "neutral", onRemove, className = "" }: TagProps) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: onRemove ? "2px 4px 2px 10px" : "2px 10px",
        borderRadius: "var(--radius-full)",
        background: t.bg,
        color: t.fg,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "1rem",
        whiteSpace: "nowrap",
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 16,
            height: 16,
            borderRadius: "var(--radius-full)",
            border: 0,
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            opacity: 0.7,
          }}
        >
          <Icon name="x" size={12} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}
