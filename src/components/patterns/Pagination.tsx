import React from "react";
import { IconButton } from "@/components/design-system";

/**
 * Pagination — Prev/Next controls + a tabular-nums range indicator, for a link
 * list backed by the API's offset/limit/hasMore shape (GET /api/links returns
 * `{ links, pagination: { total, limit, offset, hasMore } }` — no cursor, and
 * no page-number math needed beyond this). Not part of the handoff bundle —
 * DataTable and FilterBar don't cover pagination at all — so this composes
 * only IconButton + the existing cs-tnum tabular-nums convention, no new
 * visual language.
 */
export interface PaginationProps {
  /** Total row count across all pages. */
  total: number;
  /** Rows per page. */
  limit: number;
  /** Zero-based offset of the current page's first row. */
  offset: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Pagination({ total, limit, offset, onPrev, onNext }: PaginationProps) {
  if (total === 0) return null;
  const from = offset + 1;
  const to = Math.min(offset + limit, total);
  const hasPrev = offset > 0;
  const hasNext = to < total;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)" }}>
      <IconButton icon="arrow-left" label="Previous page" variant="secondary" onClick={onPrev} disabled={!hasPrev} />
      <span className="cs-tnum" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>
        {from}–{to} of {total.toLocaleString()}
      </span>
      <IconButton icon="arrow-right" label="Next page" variant="secondary" onClick={onNext} disabled={!hasNext} />
    </div>
  );
}
