import React from "react";
import { Icon } from "../icon/Icon.jsx";

/* Dropdown menu — floating list for row kebab menus, the account menu, and
   split actions. Items take a leading icon, an optional shortcut hint, and a
   `danger` flag. Render inside a positioned wrapper anchored to the trigger. */
export function DropdownMenu({ items, style }) {
  return (
    <div className="cs-menu" role="menu" style={style}>
      {items.map((it, i) =>
        it.divider ? (
          <div key={`d${i}`} className="cs-menu__divider" />
        ) : (
          <button
            key={it.label}
            type="button"
            role="menuitem"
            className={["cs-menu__item", it.danger ? "cs-menu__item--danger" : ""].filter(Boolean).join(" ")}
            onClick={it.onClick}
          >
            {it.icon && <Icon name={it.icon} size={16} />}
            <span>{it.label}</span>
            {it.hint && <span className="cs-menu__item__hint">{it.hint}</span>}
          </button>
        )
      )}
    </div>
  );
}
