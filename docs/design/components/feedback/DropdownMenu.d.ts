import React from "react";

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
export function DropdownMenu(props: DropdownMenuProps): JSX.Element;
