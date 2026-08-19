import React from "react";

/** Dashboard KPI card — overline label, big tabular value, colored delta line.
 * One accent per card; the value itself stays neutral.
 * @startingPoint section="Data display" subtitle="Dashboard KPI stat card" viewport="700x150"
 */
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
export function StatCard(props: StatCardProps): JSX.Element;
