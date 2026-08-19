import React from "react";

/** Filter bar (§9.11) — the inline control row above the link table: search,
 * status filter, an `extra` slot, dismissible active-filter pills, and Clear.
 * Presentational — filtering logic is the app's. Sorting is separate (table headers).
 * @startingPoint section="Navigation" subtitle="Link-list search + status + filter pills" viewport="700x120"
 */
export interface FilterPill {
  label: React.ReactNode;
  onRemove?: () => void;
}
export interface FilterBarProps {
  query?: string;
  onQuery?: (value: string) => void;
  status?: string;
  onStatus?: (value: string) => void;
  /** Overrides the default status option list. */
  statusOptions?: { value: string; label: string }[];
  /** Dismissible active-filter pills shown after the controls. */
  pills?: FilterPill[];
  onClear?: () => void;
  /** Extra controls (date range, tag filter) rendered between status and pills. */
  extra?: React.ReactNode;
  /** Render the mobile collapsed "Filters" button instead of the inline bar. */
  mobile?: boolean;
  /** Count shown on the mobile button, e.g. Filters (2). */
  activeCount?: number;
  onOpenFilters?: () => void;
}
export function FilterBar(props: FilterBarProps): JSX.Element;
