import React, { useId } from "react";

/* Multi-line text input. Same box treatment as Input; label above, helper below. */
export function Textarea({ label, help, error, id, className = "", ...rest }) {
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
