"use client";
// useId() — see the note in Input.tsx.

import React, { useId } from "react";

/** Multi-line text input; same box treatment as Input, vertically resizable. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  help?: string;
  error?: string;
}

export function Textarea({ label, help, error, id, className = "", ...rest }: TextareaProps) {
  const auto = useId();
  const taId = id || auto;
  const cls = ["cs-textarea", error ? "cs-input--error" : "", className].filter(Boolean).join(" ");
  return (
    <div className="cs-field">
      {label && (
        <label className="cs-label" htmlFor={taId}>
          {label}
        </label>
      )}
      <textarea id={taId} className={cls} {...rest} />
      {error ? (
        <span className="cs-help cs-help--error">{error}</span>
      ) : (
        help && <span className="cs-help">{help}</span>
      )}
    </div>
  );
}
