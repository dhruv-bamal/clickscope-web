import React from "react";

/** Empty state — centered icon-in-circle, headline, one-line explanation, single
 * action. Also the layout for page-level errors (with danger coloring).
 * @startingPoint section="Feedback" subtitle="First-run / no-results / page error" viewport="700x300"
 */
export interface EmptyStateProps {
  /** Lucide icon name shown in the circle. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** A single primary action (or clear-filters ghost for no-results). */
  action?: React.ReactNode;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
