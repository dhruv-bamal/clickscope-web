import React from "react";

/**
 * Text input with persistent label above and helper/validation below.
 * Every input has a visible label; placeholder is never the only label.
 * @startingPoint section="Forms" subtitle="Label, helper, mono, prefix, error/success" viewport="700x150"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Persistent visible label above the field. */
  label?: string;
  /** Caption below the field (hidden when error/success is set). */
  help?: string;
  /** Error message; sets red border + alert icon. */
  error?: string;
  /** Success message (e.g. "Alias available"); sets green border + check. */
  success?: string;
  /** Monospace value — use for alias / short-code / URL fields. */
  mono?: boolean;
  /** Fused left prefix, e.g. "short.link/". */
  prefix?: React.ReactNode;
}
export function Input(props: InputProps): JSX.Element;
