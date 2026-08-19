import React from "react";

/** Spinner — actions in progress with no predictable content. Never a full-page
 * spinner for a data screen (use Skeleton). Inherits currentColor. */
export interface SpinnerProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}
export function Spinner(props: SpinnerProps): JSX.Element;
