import React from "react";

/** Skeleton — placeholder block for known-shape content that is arriving.
 * Use for initial page/region load; never for a button press (use Spinner). */
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}
export function Skeleton(props: SkeletonProps): JSX.Element;
