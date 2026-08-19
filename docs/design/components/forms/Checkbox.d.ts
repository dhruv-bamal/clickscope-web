import React from "react";

/** Checkbox with right-hand label; supports an indeterminate "select all" state.
 * Use when the choice takes effect on form submit (use Toggle for instant on/off). */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  /** Partial "select all" glyph (minus). */
  indeterminate?: boolean;
  label?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
