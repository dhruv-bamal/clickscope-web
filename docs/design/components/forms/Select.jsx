import React, { useId } from "react";
import { Icon } from "../icon/Icon.jsx";

/* Native-feeling single select with a trailing chevron. Pass options as
   [{value,label}] or use children <option>s. Label above, helper below. */
export function Select({ label, help, options, id, className = "", children, ...rest }) {
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
