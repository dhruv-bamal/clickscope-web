import React from "react";

/* Spinner — action in progress with no predictable content (button loading,
   alias check, copy/QR generation). Inherits currentColor; 16px default. */
export function Spinner({ size = 16, className = "", style = {} }) {
  return (
    <span
      className={["cs-spinner", className].filter(Boolean).join(" ")}
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size, ...style }}
    />
  );
}
