import React from "react";
import { Icon } from "../icon/Icon.jsx";
import { Select } from "../forms/Select.jsx";
import { Tag } from "../data-display/Tag.jsx";

/* Filter bar (v2 §9.11) — inline row above the link table (md+): search input,
   status filter, an optional slot for more controls, dismissible active-filter
   pills, and a Clear action once any non-search filter is active. Presentational;
   filtering logic lives in the app. Mobile collapses to a Filters button (see prop). */
export function FilterBar({
  query = "",
  onQuery,
  status = "all",
  onStatus,
  statusOptions,
  pills = [],
  onClear,
  extra,
  mobile = false,
  activeCount = 0,
  onOpenFilters,
}) {
  if (mobile) {
    return (
      <button
        type="button"
        className="cs-btn cs-btn--ghost cs-btn--md"
        onClick={onOpenFilters}
        style={{ border: "1px solid var(--color-border-strong)" }}
      >
        <Icon name="filter" size={16} />
        Filters{activeCount ? ` (${activeCount})` : ""}
      </button>
    );
  }
  const opts = statusOptions || [
    { value: "all", label: "All statuses" },
    { value: "active", label: "Active" },
    { value: "expiring", label: "Expiring soon" },
    { value: "expired", label: "Expired" },
    { value: "protected", label: "Password" },
    { value: "paused", label: "Paused" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)" }}>
      <div style={{ position: "relative", width: 256 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-fg-subtle)", pointerEvents: "none" }}>
          <Icon name="search" size={16} />
        </span>
        <input className="cs-input" placeholder="Search links…" value={query} onChange={(e) => onQuery && onQuery(e.target.value)} style={{ paddingLeft: 34 }} />
      </div>
      <div style={{ width: 180 }}>
        <Select value={status} onChange={(e) => onStatus && onStatus(e.target.value)} options={opts} />
      </div>
      {extra}
      {pills.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1_5)", flexWrap: "wrap" }}>
          {pills.map((p, i) => (
            <Tag key={i} tone="primary" onRemove={p.onRemove}>{p.label}</Tag>
          ))}
        </div>
      )}
      {pills.length > 0 && (
        <button type="button" className="cs-btn cs-btn--link cs-btn--sm" onClick={onClear} style={{ marginLeft: "auto" }}>
          Clear filters
        </button>
      )}
    </div>
  );
}
