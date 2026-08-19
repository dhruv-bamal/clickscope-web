import React from "react";

/* Skeleton — known-shape content that is arriving (stat cards, tables, charts,
   detail page). Match the real layout's boxes so there's no shift on load. */
export function Skeleton({ width = "100%", height = 16, radius, className = "", style = {} }) {
  return (
    <span
      className={["cs-skeleton", className].filter(Boolean).join(" ")}
      style={{ display: "block", width, height, borderRadius: radius, ...style }}
    />
  );
}
