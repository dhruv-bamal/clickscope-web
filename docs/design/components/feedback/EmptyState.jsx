import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Empty state — centered icon-in-circle, headline, one-line explanation, single
   action. Distinguish "nothing exists yet" (offer creation) from "nothing
   matched" (offer to clear filters). Reused with danger coloring for page errors. */
export function EmptyState({ icon = "inbox", title, description, action }) {
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
