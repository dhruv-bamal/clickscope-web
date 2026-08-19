"use client";
// useId() — see the note in Input.tsx.

import React, { useId } from "react";
import { Icon } from "../icon/Icon";

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

export function Select({ label, help, options, id, className = "", children, ...rest }: SelectProps) {
  const auto = useId();
  const selId = id || auto;
  return (
    <div className="cs-field">
      {label && (
        <label className="cs-label" htmlFor={selId}>
          {label}
        </label>
      )}
      <div className="cs-select-wrap">
        <select id={selId} className={["cs-select", className].filter(Boolean).join(" ")} {...rest}>
          {options
            ? options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <span className="cs-select-wrap__chevron">
          <Icon name="chevron-down" size={16} />
        </span>
      </div>
      {help && <span className="cs-help">{help}</span>}
    </div>
  );
}
