import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Stat card — a dashboard KPI. Eyebrow → big tabular value → delta line.
   The number stays neutral; color lives only in the up/down delta. */
export function StatCard({ label, value, delta, direction }) {
  return (
    <div className="cs-card cs-statcard">
      <span className="cs-statcard__eyebrow">{label}</span>
      <span className="cs-statcard__value">{value}</span>
      {delta != null && (
        <span className={`cs-statcard__delta cs-statcard__delta--${direction === "down" ? "down" : "up"}`}>
          <Icon name={direction === "down" ? "trending-down" : "trending-up"} size={14} />
          {delta}
        </span>
      )}
    </div>
  );
}
