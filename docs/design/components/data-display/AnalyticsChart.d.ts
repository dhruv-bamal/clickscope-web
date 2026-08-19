import React from "react";

/** Analytics area chart (§9.14) — single-series line + low-opacity fill for
 * clicks-over-time. Fill/line use --color-accent (sky), never primary. Hovering
 * or focusing a point shows a value+date tooltip. Empty data renders nothing —
 * the caller shows the "no analytics yet" empty state instead of a flat-line chart.
 * @startingPoint section="Data display" subtitle="Clicks-over-time area chart" viewport="760x260"
 */
export interface AnalyticsChartProps {
  /** Series values. Empty array renders nothing. */
  data: number[];
  /** Per-point labels (dates) for the tooltip + axis ticks. */
  labels?: string[];
  height?: number;
  /** Show the pulsing plot-area skeleton with static axis labels. */
  loading?: boolean;
  /** Formats the tooltip value; default toLocaleString. */
  valueFormat?: (value: number) => string;
}
export function AnalyticsChart(props: AnalyticsChartProps): JSX.Element;
