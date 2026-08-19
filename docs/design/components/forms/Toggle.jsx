import React from "react";

/* Switch for instant on/off settings (link active/paused, "require password").
   Track + sliding knob; use a Checkbox when the choice only applies on submit. */
export function Toggle({ on = false, onChange, label, disabled = false, id, ...rest }) {
  return (
    <label className="cs-toggle" data-on={String(on)} style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : undefined}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange && onChange(!on)}
        className="cs-toggle__track"
        style={{ padding: 0, cursor: disabled ? "not-allowed" : "pointer" }}
        {...rest}
      >
        <span className="cs-toggle__knob" />
      </button>
      {label && <span style={{ fontSize: "var(--text-sm)" }}>{label}</span>}
    </label>
  );
}
