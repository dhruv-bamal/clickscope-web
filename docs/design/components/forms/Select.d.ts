import React from "react";

/** Single-choice select with the same box as Input plus a trailing chevron.
 * For rich options (expiration presets with descriptions) use a DropdownMenu popover instead. */
export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  help?: string;
  /** Convenience array; alternatively pass <option> children. */
  options?: SelectOption[];
}
export function Select(props: SelectProps): JSX.Element;
