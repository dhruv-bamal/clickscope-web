import React from "react";
import { Button } from "../forms/Button.jsx";

/* Bulk-action toolbar (v2 §9.12) — appears in the filter bar's slot the moment
   1+ table rows are selected (lg+ only). Indigo-tint bar: count + Clear on the
   left, action buttons on the right. Delete always routes through a confirm modal. */
export function BulkActionToolbar({ count, onClear, actions = [] }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
      padding: "var(--space-3) var(--space-4)", borderRadius: "var(--radius-lg)",
      background: "var(--color-primary-tint)", border: "1px solid var(--color-primary)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-primary-tint-fg)" }}>
          {count} selected
        </span>
        <button type="button" className="cs-btn cs-btn--link cs-btn--sm" onClick={onClear}>Clear selection</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {actions.map((a, i) => (
          <Button key={i} variant={a.variant || "secondary"} size="sm" icon={a.icon} onClick={a.onClick}>{a.label}</Button>
        ))}
      </div>
    </div>
  );
}
