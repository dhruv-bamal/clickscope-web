import React, { useId } from "react";
import { Icon } from "../icon/Icon.jsx";

/* Text input with label-above / helper-below. Set `mono` for alias/URL fields,
   `prefix` to fuse a domain (short.link/) to the left edge, and `error`/`success`
   for validation display (message + icon). */
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
}) {
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
