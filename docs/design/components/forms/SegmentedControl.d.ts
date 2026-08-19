import React from "react";

/** Equal-width segmented track for a small set of exclusive options
 * (theme light/dark/system, analytics range 24h/7d/30d). */
export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}
export interface SegmentedControlProps {
  /** Strings or {value,label} objects. */
  options: (string | SegmentedOption)[];
  value: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
