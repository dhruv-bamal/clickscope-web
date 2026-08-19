"use client";
// useId() is a hook — unavailable in Server Components regardless of the Icon
// fix. Every consumer of Input will also be wiring a real onChange in 12b, so
// this boundary is drawn at the primitive rather than pushed onto every caller.

import React, { useId } from "react";
import { Icon } from "../icon/Icon";

/**
 * Text input with persistent label above and helper/validation below.
 * Every input has a visible label; placeholder is never the only label.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
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
  /** Fused left prefix, e.g. "short.link/". Shadows the native RDFa `prefix`
   * HTML attribute (React.InputHTMLAttributes) — that global attribute has no
   * use on an <input> in this app, and the design system's own prop wins. */
  prefix?: React.ReactNode;
}

export function Input({
  label,
  help,
  error,
  success,
  mono = false,
  prefix,
  id,
  className = "",
  ...rest
}: InputProps) {
  const auto = useId();
  const inputId = id || auto;
  const state = error ? "error" : success ? "success" : null;
  const inputCls = ["cs-input", mono ? "cs-input--mono" : "", state ? `cs-input--${state}` : "", className]
    .filter(Boolean)
    .join(" ");
  const input = prefix ? (
    <div className="cs-inputgroup">
      <span className="cs-inputgroup__prefix">{prefix}</span>
      <input id={inputId} className={inputCls} {...rest} />
    </div>
  ) : (
    <input id={inputId} className={inputCls} {...rest} />
  );
  return (
    <div className="cs-field">
      {label && (
        <label className="cs-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      {input}
      {error && (
        <span className="cs-help cs-help--error">
          <Icon name="circle-alert" size={13} /> {error}
        </span>
      )}
      {success && (
        <span className="cs-help cs-help--success">
          <Icon name="check" size={13} /> {success}
        </span>
      )}
      {help && !error && !success && <span className="cs-help">{help}</span>}
    </div>
  );
}
