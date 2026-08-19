import React from "react";

/** Switch for instant on/off settings (link active/paused, require password). */
export interface ToggleProps {
  on?: boolean;
  onChange?: (next: boolean) => void;
  /** Accessible name + optional visible label. */
  label?: string;
  disabled?: boolean;
  id?: string;
}
export function Toggle(props: ToggleProps): JSX.Element;
