import React from "react";

/** Bulk-action toolbar (§9.12) — replaces the filter bar in place when rows are
 * selected (lg+ only). Count + Clear selection on the left, action buttons right.
 * The Delete action must route through the destructive confirm modal naming the count.
 * @startingPoint section="Navigation" subtitle="Selected-rows action bar" viewport="700x90"
 */
export interface BulkAction {
  label: React.ReactNode;
  icon?: string;
  variant?: "secondary" | "ghost" | "destructive";
  onClick?: () => void;
}
export interface BulkActionToolbarProps {
  count: number;
  onClear?: () => void;
  actions?: BulkAction[];
}
export function BulkActionToolbar(props: BulkActionToolbarProps): JSX.Element;
