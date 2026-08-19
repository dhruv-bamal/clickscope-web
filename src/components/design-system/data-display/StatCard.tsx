import React from "react";
import { Icon } from "../icon/Icon";

/* Stat card — a dashboard KPI. Eyebrow → big tabular value → delta line.
   The number stays neutral; color lives only in the up/down delta. */
export interface StatCardProps {
  /** Overline label, e.g. "Total clicks". */
  label: string;
  /** The big number (already formatted), e.g. "24,819". */
  value: React.ReactNode;
  /** Delta text, e.g. "+12.4% vs last week". */
  delta?: React.ReactNode;
  /** Colors the delta + arrow: up=success, down=danger. */
  direction?: "up" | "down";
}

export function StatCard({ label, value, delta, direction }: StatCardProps) {
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
