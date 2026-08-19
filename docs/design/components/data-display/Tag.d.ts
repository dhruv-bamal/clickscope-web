import React from "react";

/** Tag chip — rounded-full label for link tags and dismissible active-filter
 * pills. `neutral` on the subtle surface; `primary` (indigo tint) for filter pills. */
export interface TagProps {
  children: React.ReactNode;
  tone?: "neutral" | "primary";
  /** When provided, renders a trailing × that calls this. */
  onRemove?: () => void;
  className?: string;
}
export function Tag(props: TagProps): JSX.Element;
