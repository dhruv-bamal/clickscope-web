import React from "react";
import { Icon } from "../icon/Icon";

/** Empty state — centered icon-in-circle, headline, one-line explanation, single
 * action. Also the layout for page-level errors (with danger coloring).
 */
export interface EmptyStateProps {
  /** Lucide icon name shown in the circle. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** A single primary action (or clear-filters ghost for no-results). */
  action?: React.ReactNode;
}

export function EmptyState({ icon = "inbox", title, description, action }: EmptyStateProps) {
  return (
    <div className="cs-empty">
      <span className="cs-empty__icon">
        <Icon name={icon} size={24} />
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h2 className="cs-empty__title">{title}</h2>
        {description && <p className="cs-empty__body">{description}</p>}
      </div>
      {action}
    </div>
  );
}
