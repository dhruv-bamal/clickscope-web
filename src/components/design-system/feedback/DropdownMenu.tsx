import React from "react";
import { Icon } from "../icon/Icon";

/** Dropdown menu — floating item list for kebab menus, the account/avatar menu,
 * and split "Create" actions. Non-modal; closes on outside click / Esc (app-wired). */
export interface DropdownMenuItem {
  label?: React.ReactNode;
  /** Leading Lucide icon name. */
  icon?: string;
  /** Trailing shortcut hint, e.g. "⌘C". */
  hint?: string;
  /** Renders the item in danger color. */
  danger?: boolean;
  /** Renders a divider instead of an item. */
  divider?: boolean;
  onClick?: () => void;
}
export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  style?: React.CSSProperties;
}

export function DropdownMenu({ items, style }: DropdownMenuProps) {
  return (
    <div className="cs-menu" role="menu" style={style}>
      {items.map((it, i) =>
        it.divider ? (
          <div key={`d${i}`} className="cs-menu__divider" />
        ) : (
          <button
            key={String(it.label)}
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
