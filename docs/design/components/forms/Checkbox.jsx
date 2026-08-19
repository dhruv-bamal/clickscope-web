import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Checkbox with label to the right. Supports indeterminate ("select all" partial).
   Use for choices that take effect on form submit (vs Toggle for instant on/off). */
export function Checkbox({ checked = false, indeterminate = false, onChange, label, disabled = false, ...rest }) {
  return (
    <label className="cs-checkbox" data-checked={String(checked)} data-indeterminate={String(indeterminate)} style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : undefined}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span className="cs-checkbox__box">
        <Icon name={indeterminate ? "minus" : "check"} size={12} strokeWidth={3} />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
