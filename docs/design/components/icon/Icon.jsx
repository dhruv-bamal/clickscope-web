import React, { useEffect, useRef } from "react";

/* Lucide icon wrapper. Renders a Lucide glyph by name at the brand's default
   sizes (16 inline, 20 standalone, 24 empty-state). Color inherits currentColor.
   Requires the Lucide browser script on the page (window.lucide); the component
   hydrates its own <i data-lucide> node on mount / name change. */
export function Icon({ name, size = 16, strokeWidth = 2, className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && window.lucide && window.lucide.createIcons) {
      // clear any previously-hydrated svg, then re-hydrate this node
      el.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      el.appendChild(i);
      window.lucide.createIcons({
        attrs: { width: size, height: size, "stroke-width": strokeWidth },
        nameAttr: "data-lucide",
      });
    }
  }, [name, size, strokeWidth]);
  return (
    <span
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ display: "inline-flex", width: size, height: size, flex: "none", ...style }}
      {...rest}
    />
  );
}
