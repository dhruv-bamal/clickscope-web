/* @ds-bundle: {"format":4,"namespace":"ClickScopeDesignSystem_0a7fd7","components":[{"name":"AnalyticsChart","sourcePath":"components/data-display/AnalyticsChart.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"DataTable","sourcePath":"components/data-display/DataTable.jsx"},{"name":"TableBar","sourcePath":"components/data-display/DataTable.jsx"},{"name":"LinkCard","sourcePath":"components/data-display/LinkCard.jsx"},{"name":"StatCard","sourcePath":"components/data-display/StatCard.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"DropdownMenu","sourcePath":"components/feedback/DropdownMenu.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"PageError","sourcePath":"components/feedback/PageError.jsx"},{"name":"QrCodePopover","sourcePath":"components/feedback/QrCodePopover.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"BulkActionToolbar","sourcePath":"components/navigation/BulkActionToolbar.jsx"},{"name":"FilterBar","sourcePath":"components/navigation/FilterBar.jsx"}],"sourceHashes":{"components/data-display/AnalyticsChart.jsx":"1c61a51214ae","components/data-display/Badge.jsx":"b0859f46eb80","components/data-display/DataTable.jsx":"b99a5170b819","components/data-display/LinkCard.jsx":"bb640b9cd31e","components/data-display/StatCard.jsx":"109149eef637","components/data-display/Tag.jsx":"4bfddb660979","components/feedback/DropdownMenu.jsx":"ab6aa8765682","components/feedback/EmptyState.jsx":"2e3b9c73a9fa","components/feedback/Modal.jsx":"ab6a0b8254f6","components/feedback/PageError.jsx":"667e46a7a95c","components/feedback/QrCodePopover.jsx":"1077c8b96ea4","components/feedback/Skeleton.jsx":"16679e34825c","components/feedback/Spinner.jsx":"f45601bb0fcf","components/feedback/Toast.jsx":"57d0ffaa89c9","components/forms/Button.jsx":"32c4097c612e","components/forms/Checkbox.jsx":"b3c2c53744e8","components/forms/IconButton.jsx":"057af916107d","components/forms/Input.jsx":"f992fbf1f49a","components/forms/SegmentedControl.jsx":"85c7c75a9282","components/forms/Select.jsx":"1709c86f6c38","components/forms/Textarea.jsx":"24b3e10684f1","components/forms/Toggle.jsx":"f4c54bb31938","components/icon/Icon.jsx":"d7e364110032","components/navigation/BulkActionToolbar.jsx":"0e0e4a0d6121","components/navigation/FilterBar.jsx":"69b9c27947c7","ui_kits/app/AnalyticsScreen.jsx":"9d01ff5589d9","ui_kits/app/AppShell.jsx":"955affaab5e1","ui_kits/app/Charts.jsx":"e736b168a843","ui_kits/app/DashboardScreen.jsx":"f7417ee97e4c","ui_kits/app/LinkDetailScreen.jsx":"f3933f39ef21","ui_kits/app/LinksScreen.jsx":"23c2a041b624","ui_kits/app/Overlays.jsx":"e12923b9cae4","ui_kits/app/SettingsScreen.jsx":"e80e73f36be6","ui_kits/app/data.js":"d4cbcae7a01a","ui_kits/auth/AuthScreens.jsx":"66ceaffbd172","ui_kits/marketing/MarketingLanding.jsx":"679daa487c07","ui_kits/public/PublicPages.jsx":"9bd1f59c3d07"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ClickScopeDesignSystem_0a7fd7 = window.ClickScopeDesignSystem_0a7fd7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/AnalyticsChart.jsx
try { (() => {
const {
  useId
} = React;
/* Analytics area chart (v2 §9.14) — single-series line + low-opacity fill for
   clicks-over-time. Uses --color-accent (sky), never primary. Hover/focus a point
   for a tooltip. Empty (no data) renders nothing — callers show the empty state.
   Loading renders a pulsing plot-area block with the axis labels kept as text. */
function AnalyticsChart({
  data = [],
  labels,
  height = 240,
  loading = false,
  valueFormat
}) {
  const gid = useId().replace(/[:]/g, "");
  const [hover, setHover] = React.useState(null);
  const w = 760,
    pad = 10,
    axis = 22;
  const plotH = height - pad * 2 - axis;
  const fmt = valueFormat || (v => v.toLocaleString());
  if (loading) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "cs-skeleton",
      style: {
        height: plotH,
        borderRadius: "var(--radius-md)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 8,
        fontSize: "var(--text-xs)",
        color: "var(--color-fg-subtle)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "start"), /*#__PURE__*/React.createElement("span", null, "mid"), /*#__PURE__*/React.createElement("span", null, "now")));
  }
  if (!data.length) return null;
  const max = Math.max(...data),
    min = Math.min(...data);
  const nx = i => pad + i / (data.length - 1) * (w - pad * 2);
  const ny = v => pad + (1 - (v - min) / (max - min || 1)) * plotH;
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${nx(i).toFixed(1)},${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L${nx(data.length - 1).toFixed(1)},${pad + plotH} L${nx(0).toFixed(1)},${pad + plotH} Z`;
  const ticks = labels || [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]].map(() => "");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${height}`,
    width: "100%",
    height: height,
    style: {
      display: "block",
      overflow: "visible"
    },
    onMouseLeave: () => setHover(null)
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `fill-${gid}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--color-accent)",
    stopOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--color-accent)",
    stopOpacity: "0"
  }))), [0, 0.5, 1].map(t => /*#__PURE__*/React.createElement("line", {
    key: t,
    x1: pad,
    x2: w - pad,
    y1: pad + t * plotH,
    y2: pad + t * plotH,
    stroke: "var(--color-border)",
    strokeWidth: "1",
    opacity: "0.7"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#fill-${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "var(--color-accent)",
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), hover != null && /*#__PURE__*/React.createElement("line", {
    x1: nx(hover),
    x2: nx(hover),
    y1: pad,
    y2: pad + plotH,
    stroke: "var(--color-accent)",
    strokeWidth: "1",
    opacity: "0.4"
  }), hover != null && /*#__PURE__*/React.createElement("circle", {
    cx: nx(hover),
    cy: ny(data[hover]),
    r: "4",
    fill: "var(--color-accent)",
    stroke: "var(--color-surface)",
    strokeWidth: "2"
  }), data.map((v, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: nx(i) - w / data.length / 2,
    y: 0,
    width: w / data.length,
    height: height,
    fill: "transparent",
    onMouseEnter: () => setHover(i),
    onFocus: () => setHover(i),
    tabIndex: 0,
    style: {
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("text", {
    x: pad,
    y: height - 4,
    fontSize: "11",
    fill: "var(--color-fg-subtle)"
  }, ticks[0]), /*#__PURE__*/React.createElement("text", {
    x: w / 2,
    y: height - 4,
    fontSize: "11",
    textAnchor: "middle",
    fill: "var(--color-fg-subtle)"
  }, ticks[Math.floor(ticks.length / 2)]), /*#__PURE__*/React.createElement("text", {
    x: w - pad,
    y: height - 4,
    fontSize: "11",
    textAnchor: "end",
    fill: "var(--color-fg-subtle)"
  }, ticks[ticks.length - 1])), hover != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: `${nx(hover) / w * 100}%`,
      top: ny(data[hover]) / height * 100 + "%",
      transform: "translate(-50%, calc(-100% - 10px))",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      padding: "6px 8px",
      fontSize: "var(--text-xs)",
      whiteSpace: "nowrap",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    },
    className: "cs-tnum"
  }, fmt(data[hover])), labels && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--color-fg-muted)"
    }
  }, labels[hover])));
}
Object.assign(__ds_scope, { AnalyticsChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/AnalyticsChart.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
/* Status badge — a semantic tint + dot + text label (never color alone).
   Domain statuses map via `status`: active→success, expiring→warning,
   expired→danger, protected→info, paused→neutral. Or set `variant` directly. */
const STATUS = {
  active: {
    variant: "success",
    label: "Active"
  },
  expiring: {
    variant: "warning",
    label: "Expiring soon"
  },
  expired: {
    variant: "danger",
    label: "Expired"
  },
  protected: {
    variant: "info",
    label: "Password"
  },
  paused: {
    variant: "neutral",
    label: "Paused"
  }
};
function Badge({
  status,
  variant,
  dot = true,
  children,
  className = ""
}) {
  const s = status ? STATUS[status] : null;
  const v = variant || s && s.variant || "neutral";
  const label = children || s && s.label;
  return /*#__PURE__*/React.createElement("span", {
    className: ["cs-badge", `cs-badge--${v}`, className].filter(Boolean).join(" ")
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: "cs-badge__dot"
  }), label);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/DataTable.jsx
try { (() => {
/* Data table — the link list (md+) and analytics breakdown tables share this skin:
   overline headers on a subtle surface, compact py-3 cells, hover rows, and an
   optional inline share-bar (analytics). Columns declare align / mono / render. */
function DataTable({
  columns,
  rows,
  getRowKey,
  selectedKeys = [],
  onRowClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "cs-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align === "right" ? "right" : "left",
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => {
    const key = getRowKey ? getRowKey(row, i) : i;
    const selected = selectedKeys.includes(key);
    return /*#__PURE__*/React.createElement("tr", {
      key: key,
      "data-selected": String(selected),
      onClick: onRowClick ? () => onRowClick(row) : undefined,
      style: onRowClick ? {
        cursor: "pointer"
      } : undefined
    }, columns.map(c => {
      const cls = [c.align === "right" ? "cs-table__num" : "", c.mono ? "cs-mono" : ""].filter(Boolean).join(" ");
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        className: cls || undefined
      }, c.render ? c.render(row) : row[c.key]);
    }));
  }))));
}

/* Inline share bar for analytics breakdown rows (referrers/countries/devices). */
function TableBar({
  pct
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-table__bar",
    style: {
      width: `${Math.max(2, Math.min(100, pct))}%`
    }
  });
}
Object.assign(__ds_scope, { DataTable, TableBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
/* Skeleton — known-shape content that is arriving (stat cards, tables, charts,
   detail page). Match the real layout's boxes so there's no shift on load. */
function Skeleton({
  width = "100%",
  height = 16,
  radius,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["cs-skeleton", className].filter(Boolean).join(" "),
    style: {
      display: "block",
      width,
      height,
      borderRadius: radius,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
/* Spinner — action in progress with no predictable content (button loading,
   alias check, copy/QR generation). Inherits currentColor; 16px default. */
function Spinner({
  size = 16,
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["cs-spinner", className].filter(Boolean).join(" "),
    role: "status",
    "aria-label": "Loading",
    style: {
      width: size,
      height: size,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/* Equal-width segmented track (theme light/dark/system, analytics range 24h/7d/30d).
   The active segment lifts onto a surface; arrow keys move between options. */
function SegmentedControl({
  options,
  value,
  onChange,
  "aria-label": ariaLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-segmented",
    role: "tablist",
    "aria-label": ariaLabel
  }, options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      type: "button",
      role: "tab",
      "aria-selected": active,
      "data-active": String(active),
      className: "cs-segmented__opt",
      onClick: () => onChange && onChange(val)
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/* Multi-line text input. Same box treatment as Input; label above, helper below. */
function Textarea({
  label,
  help,
  error,
  id,
  className = "",
  ...rest
}) {
  const auto = useId();
  const taId = id || auto;
  const cls = ["cs-textarea", error ? "cs-input--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cs-label",
    htmlFor: taId
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    className: cls
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "cs-help cs-help--error"
  }, error) : help && /*#__PURE__*/React.createElement("span", {
    className: "cs-help"
  }, help));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Switch for instant on/off settings (link active/paused, "require password").
   Track + sliding knob; use a Checkbox when the choice only applies on submit. */
function Toggle({
  on = false,
  onChange,
  label,
  disabled = false,
  id,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "cs-toggle",
    "data-on": String(on),
    style: disabled ? {
      opacity: 0.5,
      cursor: "not-allowed"
    } : undefined
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    "aria-label": label,
    disabled: disabled,
    onClick: () => onChange && onChange(!on),
    className: "cs-toggle__track",
    style: {
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cs-toggle__knob"
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)"
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
/* Lucide icon wrapper. Renders a Lucide glyph by name at the brand's default
   sizes (16 inline, 20 standalone, 24 empty-state). Color inherits currentColor.
   Requires the Lucide browser script on the page (window.lucide); the component
   hydrates its own <i data-lucide> node on mount / name change. */
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  className = "",
  style = {},
  ...rest
}) {
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
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth
        },
        nameAttr: "data-lucide"
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    className: className,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flex: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatCard.jsx
try { (() => {
/* Stat card — a dashboard KPI. Eyebrow → big tabular value → delta line.
   The number stays neutral; color lives only in the up/down delta. */
function StatCard({
  label,
  value,
  delta,
  direction
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-card cs-statcard"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-statcard__eyebrow"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "cs-statcard__value"
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    className: `cs-statcard__delta cs-statcard__delta--${direction === "down" ? "down" : "up"}`
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: direction === "down" ? "trending-down" : "trending-up",
    size: 14
  }), delta));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
/* Tag chip — a rounded-full label on links (list, card, detail) and the
   dismissible active-filter pills in the filter bar. `onRemove` adds an x. */
function Tag({
  children,
  tone = "neutral",
  onRemove,
  className = ""
}) {
  const tones = {
    neutral: {
      bg: "var(--color-surface-subtle)",
      fg: "var(--color-fg-muted)"
    },
    primary: {
      bg: "var(--color-primary-tint)",
      fg: "var(--color-primary-tint-fg)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      padding: onRemove ? "2px 4px 2px 10px" : "2px 10px",
      borderRadius: "var(--radius-full)",
      background: t.bg,
      color: t.fg,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: "1rem",
      whiteSpace: "nowrap"
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 16,
      height: 16,
      borderRadius: "var(--radius-full)",
      border: 0,
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 12,
    strokeWidth: 2.5
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DropdownMenu.jsx
try { (() => {
/* Dropdown menu — floating list for row kebab menus, the account menu, and
   split actions. Items take a leading icon, an optional shortcut hint, and a
   `danger` flag. Render inside a positioned wrapper anchored to the trigger. */
function DropdownMenu({
  items,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-menu",
    role: "menu",
    style: style
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: `d${i}`,
    className: "cs-menu__divider"
  }) : /*#__PURE__*/React.createElement("button", {
    key: it.label,
    type: "button",
    role: "menuitem",
    className: ["cs-menu__item", it.danger ? "cs-menu__item--danger" : ""].filter(Boolean).join(" "),
    onClick: it.onClick
  }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, it.label), it.hint && /*#__PURE__*/React.createElement("span", {
    className: "cs-menu__item__hint"
  }, it.hint))));
}
Object.assign(__ds_scope, { DropdownMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/* Empty state — centered icon-in-circle, headline, one-line explanation, single
   action. Distinguish "nothing exists yet" (offer creation) from "nothing
   matched" (offer to clear filters). Reused with danger coloring for page errors. */
function EmptyState({
  icon = "inbox",
  title,
  description,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-empty"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-empty__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cs-empty__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "cs-empty__body"
  }, description)), action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/PageError.jsx
try { (() => {
/* Page-level error (v2 §9.15) — 401 / 403 / 404 share the empty-state layout with
   distinct icon + copy. None use danger red: an auth/existence mismatch is routine
   navigation friction, not an alarming error. `action` is supplied by the caller. */
const CASES = {
  401: {
    icon: "lock",
    title: "Sign in to continue",
    body: "You need to be signed in to view this page."
  },
  403: {
    icon: "shield-alert",
    title: "You don't have access to this",
    body: "Your account doesn't have permission to view this page."
  },
  404: {
    icon: "search-x",
    title: "We couldn't find that",
    body: "The page you're looking for doesn't exist or has moved."
  }
};
function PageError({
  code = 404,
  title,
  body,
  action
}) {
  const c = CASES[code] || CASES[404];
  return /*#__PURE__*/React.createElement(__ds_scope.EmptyState, {
    icon: c.icon,
    title: title || c.title,
    description: body || c.body,
    action: action
  });
}
Object.assign(__ds_scope, { PageError });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/PageError.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The one filled indigo button is `primary` — never two per view.
   Variants: primary | secondary | ghost | destructive | link. Sizes sm|md|lg. */
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  block = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["cs-btn", `cs-btn--${variant}`, `cs-btn--${size}`, block ? "cs-btn--block" : "", className].filter(Boolean).join(" ");
  const iconSize = size === "lg" ? 18 : 16;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled || loading
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    className: "cs-spinner",
    "aria-hidden": "true"
  }) : icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && !loading && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: iconSize
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/QrCodePopover.jsx
try { (() => {
/* Deterministic visual QR glyph (NOT scannable) — stand-in art for the kit. */
function QrGlyph({
  size = 168
}) {
  const n = 21;
  const cells = [];
  const finder = (br, bc) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      const edge = r === 0 || r === 6 || c === 0 || c === 6;
      const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      if (edge || core) cells.push([br + r, bc + c]);
    }
  };
  finder(0, 0);
  finder(0, n - 7);
  finder(n - 7, 0);
  let seed = 7;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const inFinder = r < 8 && c < 8 || r < 8 && c > n - 9 || r > n - 9 && c < 8;
    if (inFinder) continue;
    seed = seed * 1103515245 + 12345 & 0x7fffffff;
    if ((seed >> 16) % 100 < 46) cells.push([r, c]);
  }
  const u = size / n;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${n} ${n}`,
    shapeRendering: "crispEdges",
    style: {
      display: "block"
    }
  }, cells.map(([r, c], i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: c,
    y: r,
    width: 1,
    height: 1,
    fill: "#0b1220"
  })));
}

/* QR code popover/modal body (v2 §9.13). State: default | loading | error.
   The QR frame is always plain white (scanner quiet-zone), regardless of theme. */
function QrCodePopover({
  shortUrl,
  state = "default",
  onDownload,
  onCopy,
  onRetry
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-3)",
      width: 232
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)",
      padding: "var(--space-3)",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      aspectRatio: "1 / 1"
    }
  }, state === "loading" && /*#__PURE__*/React.createElement(__ds_scope.Skeleton, {
    width: 168,
    height: 168,
    radius: 8
  }), state === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-2)",
      color: "var(--color-danger)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-danger-fg)"
    }
  }, "Couldn't generate QR code")), state === "default" && /*#__PURE__*/React.createElement(QrGlyph, null)), shortUrl && /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-muted)"
    }
  }, shortUrl), state === "error" ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    icon: "rotate-cw",
    onClick: onRetry
  }, "Retry") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    icon: "download",
    block: true,
    onClick: onDownload,
    disabled: state === "loading"
  }, "Download PNG"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    icon: "copy",
    onClick: onCopy,
    disabled: state === "loading"
  })));
}
Object.assign(__ds_scope, { QrCodePopover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/QrCodePopover.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Checkbox with label to the right. Supports indeterminate ("select all" partial).
   Use for choices that take effect on form submit (vs Toggle for instant on/off). */
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "cs-checkbox",
    "data-checked": String(checked),
    "data-indeterminate": String(indeterminate),
    style: disabled ? {
      opacity: 0.5,
      cursor: "not-allowed"
    } : undefined
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cs-checkbox__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: indeterminate ? "minus" : "check",
    size: 12,
    strokeWidth: 3
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Square icon-only control (copy, QR, kebab, close). Ghost by default,
   `secondary` for a bordered skin. `label` is the mandatory accessible name. */
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  className = "",
  ...rest
}) {
  const cls = ["cs-icon-btn", variant === "secondary" ? "cs-icon-btn--secondary" : "", size === "lg" ? "cs-icon-btn--lg" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/LinkCard.jsx
try { (() => {
/* Link card — the mobile link-list item and the hero result after creating a link.
   Row 1: short URL (mono) + copy + status badge. Row 2: destination. Row 3: meta. */
function LinkCard({
  shortUrl,
  destination,
  status = "active",
  clicks = 0,
  created,
  selected = false,
  copied = false,
  onCopy,
  onMenu,
  onQr
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-card cs-linkcard",
    "data-selected": String(selected)
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-linkcard__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-linkcard__short"
  }, shortUrl), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: copied ? "check" : "copy",
    label: copied ? "Copied" : "Copy link",
    onClick: onCopy,
    style: copied ? {
      color: "var(--color-success)"
    } : undefined
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    status: status
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cs-linkcard__dest"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "external-link",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, destination)), /*#__PURE__*/React.createElement("div", {
    className: "cs-linkcard__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-tnum",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bar-chart-3",
    size: 13
  }), " ", clicks.toLocaleString(), " clicks"), created && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 13
  }), " ", created), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "inline-flex",
      gap: 2
    }
  }, onQr && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "qr-code",
    label: "Show QR code",
    onClick: onQr
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "ellipsis-vertical",
    label: "Link actions",
    onClick: onMenu
  }))));
}
Object.assign(__ds_scope, { LinkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/LinkCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
const {
  useEffect
} = React;
/* Modal (dialog) — centered surface over a blurred scrim for focused decisions
   and short forms. Title + optional close, body, right-aligned footer actions.
   Esc closes; click on the scrim closes. Focus-trap wiring is the app's job. */
function Modal({
  open = true,
  title,
  onClose,
  footer,
  size = "md",
  children
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const maxWidth = size === "lg" ? "32rem" : "var(--width-form)";
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-scrim",
    onClick: () => onClose && onClose()
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      maxWidth
    },
    onClick: e => e.stopPropagation()
  }, (title || onClose) && /*#__PURE__*/React.createElement("div", {
    className: "cs-modal__head"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "cs-modal__title"
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", null, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "cs-modal__footer"
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const ICONS = {
  success: "circle-check",
  danger: "circle-alert",
  info: "info",
  warning: "triangle-alert"
};

/* Toast — transient confirmation, bottom-right. Semantic left border + icon,
   short title, optional detail + single action. Success/info auto-dismiss;
   errors persist. Announced to assistive tech via the app's live region. */
function Toast({
  variant = "success",
  title,
  detail,
  action,
  onDismiss
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `cs-toast cs-toast--${variant}`,
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: `cs-toast__icon--${variant}`,
    style: {
      flex: "none",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[variant],
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-toast__title"
  }, title), detail && /*#__PURE__*/React.createElement("div", {
    className: "cs-toast__detail"
  }, detail), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-btn cs-btn--link",
    style: {
      marginTop: 6
    },
    onClick: action.onClick
  }, action.label)), onDismiss && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Dismiss",
    onClick: onDismiss
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/* Text input with label-above / helper-below. Set `mono` for alias/URL fields,
   `prefix` to fuse a domain (short.link/) to the left edge, and `error`/`success`
   for validation display (message + icon). */
function Input({
  label,
  help,
  error,
  success,
  mono = false,
  prefix,
  id,
  className = "",
  ...rest
}) {
  const auto = useId();
  const inputId = id || auto;
  const state = error ? "error" : success ? "success" : null;
  const inputCls = ["cs-input", mono ? "cs-input--mono" : "", state ? `cs-input--${state}` : "", className].filter(Boolean).join(" ");
  const input = prefix ? /*#__PURE__*/React.createElement("div", {
    className: "cs-inputgroup"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-inputgroup__prefix"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: inputCls
  }, rest))) : /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: inputCls
  }, rest));
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cs-label",
    htmlFor: inputId
  }, label), input, error && /*#__PURE__*/React.createElement("span", {
    className: "cs-help cs-help--error"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 13
  }), " ", error), success && /*#__PURE__*/React.createElement("span", {
    className: "cs-help cs-help--success"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13
  }), " ", success), help && !error && !success && /*#__PURE__*/React.createElement("span", {
    className: "cs-help"
  }, help));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useId
} = React;
/* Native-feeling single select with a trailing chevron. Pass options as
   [{value,label}] or use children <option>s. Label above, helper below. */
function Select({
  label,
  help,
  options,
  id,
  className = "",
  children,
  ...rest
}) {
  const auto = useId();
  const selId = id || auto;
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cs-label",
    htmlFor: selId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "cs-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: ["cs-select", className].filter(Boolean).join(" ")
  }, rest), options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    className: "cs-select-wrap__chevron"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))), help && /*#__PURE__*/React.createElement("span", {
    className: "cs-help"
  }, help));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BulkActionToolbar.jsx
try { (() => {
/* Bulk-action toolbar (v2 §9.12) — appears in the filter bar's slot the moment
   1+ table rows are selected (lg+ only). Indigo-tint bar: count + Clear on the
   left, action buttons on the right. Delete always routes through a confirm modal. */
function BulkActionToolbar({
  count,
  onClear,
  actions = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-3) var(--space-4)",
      borderRadius: "var(--radius-lg)",
      background: "var(--color-primary-tint)",
      border: "1px solid var(--color-primary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--color-primary-tint-fg)"
    }
  }, count, " selected"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-btn cs-btn--link cs-btn--sm",
    onClick: onClear
  }, "Clear selection")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, actions.map((a, i) => /*#__PURE__*/React.createElement(__ds_scope.Button, {
    key: i,
    variant: a.variant || "secondary",
    size: "sm",
    icon: a.icon,
    onClick: a.onClick
  }, a.label))));
}
Object.assign(__ds_scope, { BulkActionToolbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BulkActionToolbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FilterBar.jsx
try { (() => {
/* Filter bar (v2 §9.11) — inline row above the link table (md+): search input,
   status filter, an optional slot for more controls, dismissible active-filter
   pills, and a Clear action once any non-search filter is active. Presentational;
   filtering logic lives in the app. Mobile collapses to a Filters button (see prop). */
function FilterBar({
  query = "",
  onQuery,
  status = "all",
  onStatus,
  statusOptions,
  pills = [],
  onClear,
  extra,
  mobile = false,
  activeCount = 0,
  onOpenFilters
}) {
  if (mobile) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "cs-btn cs-btn--ghost cs-btn--md",
      onClick: onOpenFilters,
      style: {
        border: "1px solid var(--color-border-strong)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "filter",
      size: 16
    }), "Filters", activeCount ? ` (${activeCount})` : "");
  }
  const opts = statusOptions || [{
    value: "all",
    label: "All statuses"
  }, {
    value: "active",
    label: "Active"
  }, {
    value: "expiring",
    label: "Expiring soon"
  }, {
    value: "expired",
    label: "Expired"
  }, {
    value: "protected",
    label: "Password"
  }, {
    value: "paused",
    label: "Paused"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 256
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--color-fg-subtle)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    className: "cs-input",
    placeholder: "Search links\u2026",
    value: query,
    onChange: e => onQuery && onQuery(e.target.value),
    style: {
      paddingLeft: 34
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    value: status,
    onChange: e => onStatus && onStatus(e.target.value),
    options: opts
  })), extra, pills.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1_5)",
      flexWrap: "wrap"
    }
  }, pills.map((p, i) => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: i,
    tone: "primary",
    onRemove: p.onRemove
  }, p.label))), pills.length > 0 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-btn cs-btn--link cs-btn--sm",
    onClick: onClear,
    style: {
      marginLeft: "auto"
    }
  }, "Clear filters"));
}
Object.assign(__ds_scope, { FilterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FilterBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AnalyticsScreen.jsx
try { (() => {
// Analytics screen: trend + breakdown tables. Exposes AnalyticsScreen.
function BreakdownTable({
  title,
  icon,
  rows
}) {
  const {
    DataTable,
    TableBar,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-icon)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600
    }
  }, title)), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: "ref",
      header: title
    }, {
      key: "bar",
      header: "Share",
      width: "38%",
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(TableBar, {
        pct: r.pct
      })), /*#__PURE__*/React.createElement("span", {
        className: "cs-tnum",
        style: {
          fontSize: "var(--text-xs)",
          color: "var(--color-fg-muted)",
          width: 32,
          textAlign: "right"
        }
      }, r.pct, "%"))
    }, {
      key: "clicks",
      header: "Clicks",
      align: "right",
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "cs-tnum"
      }, r.clicks.toLocaleString())
    }],
    rows: rows,
    getRowKey: r => r.ref
  }));
}
function AnalyticsScreen() {
  const {
    StatCard,
    SegmentedControl,
    Select,
    Icon,
    AnalyticsChart
  } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const [range, setRange] = React.useState("30d");
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "Analytics"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 4
    }
  }, "All links \xB7 aggregated performance")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: [{
      value: "all",
      label: "All links"
    }, {
      value: "launch",
      label: "short.link/launch"
    }]
  })), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: range,
    onChange: setRange,
    options: ["24h", "7d", "30d"],
    "aria-label": "Range"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total clicks",
    value: "12,930",
    delta: "+18% vs last period",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Unique visitors",
    value: "9,847",
    delta: "+14% vs last period",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "QR scans",
    value: "2,104",
    delta: "+31% vs last period",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Click-through rate",
    value: "6.2%",
    delta: "-0.4% vs last period",
    direction: "down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-statcard__eyebrow",
    style: {
      marginBottom: 14
    }
  }, "Clicks over time"), /*#__PURE__*/React.createElement(AnalyticsChart, {
    data: d.trend,
    labels: dayLabels,
    height: 240
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BreakdownTable, {
    title: "Referrer",
    icon: "globe",
    rows: d.referrers
  }), /*#__PURE__*/React.createElement(BreakdownTable, {
    title: "Country",
    icon: "map-pin",
    rows: d.countries
  })), /*#__PURE__*/React.createElement(BreakdownTable, {
    title: "Device",
    icon: "monitor-smartphone",
    rows: d.devices
  }));
}
Object.assign(window, {
  AnalyticsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AnalyticsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// App chrome: sidebar + topbar. Exposes AppShell to window.
function NavItem({
  icon,
  label,
  active,
  collapsed,
  onClick
}) {
  const {
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      padding: collapsed ? "10px" : "8px 12px",
      justifyContent: collapsed ? "center" : "flex-start",
      borderRadius: "var(--radius-md)",
      border: 0,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: active ? 600 : 500,
      background: active ? "var(--color-primary-tint)" : "transparent",
      color: active ? "var(--color-primary-tint-fg)" : "var(--color-fg-muted)",
      transition: "background-color 150ms var(--ease-out), color 150ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  }), !collapsed && /*#__PURE__*/React.createElement("span", null, label));
}
function Sidebar({
  route,
  setRoute,
  collapsed
}) {
  const {
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  const items = [{
    id: "dashboard",
    icon: "layout-dashboard",
    label: "Dashboard"
  }, {
    id: "links",
    icon: "link-2",
    label: "Links"
  }, {
    id: "analytics",
    icon: "bar-chart-3",
    label: "Analytics"
  }, {
    id: "settings",
    icon: "settings",
    label: "Settings"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: collapsed ? "var(--size-sidebar-collapsed)" : "var(--size-sidebar)",
      flex: "none",
      borderRight: "1px solid var(--color-border)",
      background: "var(--color-surface)",
      display: "flex",
      flexDirection: "column",
      padding: "16px 12px",
      gap: 4,
      transition: "width 200ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: collapsed ? "4px 0" : "4px 8px",
      marginBottom: 12,
      justifyContent: collapsed ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 30,
      height: 30,
      borderRadius: "var(--radius-md)",
      background: "var(--color-primary)",
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 17
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: "var(--text-base)",
      letterSpacing: "-0.02em"
    }
  }, "Click", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-primary)"
    }
  }, "Scope"))), items.map(it => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: it.id
  }, it, {
    active: route === it.id,
    collapsed: collapsed,
    onClick: () => setRoute(it.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "life-buoy",
    label: "Help & docs",
    collapsed: collapsed,
    onClick: () => {}
  })));
}
function Topbar({
  onNew,
  onToggleSidebar,
  onToggleTheme,
  dark,
  onAvatar,
  menuOpen,
  onSignOut
}) {
  const {
    Icon,
    Button,
    IconButton,
    DropdownMenu
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 60,
      flex: "none",
      borderBottom: "1px solid var(--color-border)",
      background: "var(--color-surface)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "0 20px",
      position: "sticky",
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "panel-left",
    label: "Toggle sidebar",
    onClick: onToggleSidebar
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--color-fg-subtle)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    className: "cs-input",
    placeholder: "Search links\u2026",
    style: {
      paddingLeft: 34
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: dark ? "sun" : "moon",
    label: "Toggle theme",
    onClick: onToggleTheme
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus",
    onClick: onNew
  }, "Create link"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAvatar,
    "aria-label": "Account",
    style: {
      width: 34,
      height: 34,
      borderRadius: "var(--radius-full)",
      background: "var(--color-indigo-100)",
      color: "var(--color-indigo-700)",
      border: 0,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13
    }
  }, "AC"), menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 42,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(DropdownMenu, {
    items: [{
      icon: "user",
      label: "Ada Chen"
    }, {
      icon: "settings",
      label: "Account settings"
    }, {
      divider: true
    }, {
      icon: "log-out",
      label: "Sign out",
      onClick: onSignOut
    }]
  })))));
}
function AppShell({
  route,
  setRoute,
  children,
  onNew,
  dark,
  onToggleTheme,
  onSignOut
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      background: "var(--color-canvas)",
      color: "var(--color-fg)"
    },
    onClick: () => menuOpen && setMenuOpen(false)
  }, /*#__PURE__*/React.createElement(Sidebar, {
    route: route,
    setRoute: setRoute,
    collapsed: collapsed
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    onNew: onNew,
    dark: dark,
    onToggleTheme: onToggleTheme,
    onToggleSidebar: () => setCollapsed(c => !c),
    onAvatar: e => {
      e.stopPropagation();
      setMenuOpen(m => !m);
    },
    menuOpen: menuOpen,
    onSignOut: onSignOut
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-app)",
      margin: "0 auto",
      padding: "28px 32px"
    }
  }, children))));
}
Object.assign(window, {
  AppShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Charts.jsx
try { (() => {
// Minimal inline SVG charts for the analytics screens. Exposes LineChart, BarMini.
function LineChart({
  data,
  height = 220,
  accent = "var(--color-accent)"
}) {
  const w = 720,
    h = height,
    pad = 8;
  const max = Math.max(...data),
    min = Math.min(...data);
  const nx = i => pad + i / (data.length - 1) * (w - pad * 2);
  const ny = v => pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2 - 18);
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${nx(i).toFixed(1)},${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L${nx(data.length - 1).toFixed(1)},${h - pad - 18} L${nx(0).toFixed(1)},${h - pad - 18} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    width: "100%",
    height: h,
    preserveAspectRatio: "none",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "csfill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: accent,
    stopOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: accent,
    stopOpacity: "0"
  }))), [0, 0.5, 1].map(t => /*#__PURE__*/React.createElement("line", {
    key: t,
    x1: pad,
    x2: w - pad,
    y1: pad + t * (h - pad * 2 - 18),
    y2: pad + t * (h - pad * 2 - 18),
    stroke: "var(--color-border)",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#csfill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: accent,
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }));
}
function BarMini({
  data,
  accent = "var(--color-accent)"
}) {
  const max = Math.max(...data);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      height: 44
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${v / max * 100}%`,
      background: accent,
      opacity: 0.25 + 0.75 * (v / max),
      borderRadius: 2
    }
  })));
}
Object.assign(window, {
  LineChart,
  BarMini
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DashboardScreen.jsx
try { (() => {
// Dashboard screen. Exposes DashboardScreen.
function SectionHead({
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      fontWeight: 600
    }
  }, title), action);
}
function DashboardScreen({
  setRoute,
  openDetail
}) {
  const {
    StatCard,
    Button,
    Badge,
    Icon,
    SegmentedControl,
    AnalyticsChart
  } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const [range, setRange] = React.useState("30d");
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  const top = d.links.filter(l => l.status !== "expired").slice(0, 4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "Dashboard"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 4
    }
  }, "Your links at a glance \u2014 last 30 days.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total clicks",
    value: "51,860",
    delta: "+12.4% vs last period",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Active links",
    value: "142",
    delta: "+8 this month",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Avg. CTR",
    value: "4.7%",
    delta: "-0.3% vs last period",
    direction: "down"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "QR scans",
    value: "9,214",
    delta: "+21% vs last period",
    direction: "up"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-statcard__eyebrow"
  }, "Clicks over time"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      marginTop: 4
    },
    className: "cs-tnum"
  }, "51,860")), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: range,
    onChange: setRange,
    options: ["24h", "7d", "30d"],
    "aria-label": "Range"
  })), /*#__PURE__*/React.createElement(AnalyticsChart, {
    data: d.trend,
    labels: dayLabels
  })), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: "Top links",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: "arrow-right",
      onClick: () => setRoute("links")
    }, "View all")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, top.map((l, i) => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => openDetail(l),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 8px",
      background: "transparent",
      border: 0,
      borderTop: i ? "1px solid var(--color-border)" : 0,
      cursor: "pointer",
      textAlign: "left",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-icon)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      fontWeight: 500,
      fontSize: "var(--text-sm)"
    }
  }, l.short), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-fg-muted)",
      fontSize: "var(--text-xs)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: 1
    }
  }, l.dest), /*#__PURE__*/React.createElement(Badge, {
    status: l.status
  }), /*#__PURE__*/React.createElement("span", {
    className: "cs-tnum",
    style: {
      fontWeight: 600,
      width: 72,
      textAlign: "right"
    }
  }, l.clicks.toLocaleString()))))));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LinkDetailScreen.jsx
try { (() => {
// Link detail screen. Exposes LinkDetailScreen.
function DetailRow({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderTop: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--color-fg-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, children));
}
function QrGlyph({
  size = 116
}) {
  // Deterministic pseudo-QR from a fixed bit pattern (visual only, not scannable).
  const n = 11;
  const bits = "11111110101000101110111010111010001010111011101000101011100000001010111110101010101110001110101000111011101010001110111110101010";
  const cell = size / n;
  const cells = [];
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n),
      c = i % n;
    const corner = r < 3 && c < 3 || r < 3 && c > n - 4 || r > n - 4 && c < 3;
    const on = corner ? r === 0 || r === 2 || c === 0 || c === 2 || r === n - 1 || r === n - 3 || c === n - 1 || c === n - 3 ? true : r === 1 && c === 1 || r === 1 && c === n - 2 || r === n - 2 && c === 1 : bits[i % bits.length] === "1";
    if (on) cells.push(/*#__PURE__*/React.createElement("rect", {
      key: i,
      x: c * cell,
      y: r * cell,
      width: cell,
      height: cell,
      rx: cell * 0.15
    }));
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      display: "block",
      fill: "var(--color-fg)"
    }
  }, cells);
}
function LinkDetailScreen({
  link,
  back,
  toast
}) {
  const {
    Button,
    IconButton,
    Badge,
    Icon,
    Toggle,
    StatCard,
    DataTable,
    TableBar,
    AnalyticsChart,
    QrCodePopover
  } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  const [active, setActive] = React.useState(link.status !== "paused");
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    setCopied(true);
    toast({
      variant: "success",
      title: "Copied to clipboard",
      detail: link.short
    });
    setTimeout(() => setCopied(false), 1500);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-detail)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "transparent",
      border: 0,
      cursor: "pointer",
      color: "var(--color-fg-muted)",
      fontSize: "var(--text-sm)",
      padding: 0,
      width: "fit-content"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 16
  }), " Back to links"), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 22,
      display: "flex",
      gap: 22,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, link.short), /*#__PURE__*/React.createElement(Badge, {
    status: active ? link.status === "paused" ? "active" : link.status : "paused"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
      fontSize: "var(--text-sm)",
      color: "var(--color-fg-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 14
  }), " ", link.dest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: copied ? "check" : "copy",
    onClick: copy
  }, copied ? "Copied" : "Copy link"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "square-pen"
  }, "Edit"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "trash-2",
    label: "Delete",
    variant: "secondary"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: 12,
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-lg)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(QrCodePopover, {
    shortUrl: link.short,
    onDownload: () => toast({
      variant: "success",
      title: "QR downloaded",
      detail: link.short + ".png"
    }),
    onCopy: () => toast({
      variant: "success",
      title: "QR copied to clipboard"
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total clicks",
    value: link.clicks.toLocaleString(),
    delta: "+9% vs last week",
    direction: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Unique",
    value: Math.round(link.clicks * 0.78).toLocaleString()
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "QR scans",
    value: Math.round(link.clicks * 0.12).toLocaleString(),
    delta: "+15%",
    direction: "up"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-statcard__eyebrow",
    style: {
      marginBottom: 14
    }
  }, "Clicks \u2014 last 30 days"), /*#__PURE__*/React.createElement(AnalyticsChart, {
    data: d.trend,
    labels: dayLabels,
    height: 180
  })), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: "6px 20px 14px"
    }
  }, /*#__PURE__*/React.createElement(DetailRow, {
    label: "Status"
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: active,
    onChange: setActive,
    label: active ? "Active" : "Paused"
  })), /*#__PURE__*/React.createElement(DetailRow, {
    label: "Destination"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-muted)",
      maxWidth: 340,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, link.dest)), /*#__PURE__*/React.createElement(DetailRow, {
    label: "Password protection"
  }, link.status === "protected" ? /*#__PURE__*/React.createElement(Badge, {
    status: "protected"
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-fg-subtle)",
      fontSize: "var(--text-sm)"
    }
  }, "Off")), /*#__PURE__*/React.createElement(DetailRow, {
    label: "Expiration"
  }, link.status === "expiring" ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--color-warning-fg)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " In 5 days") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-fg-subtle)",
      fontSize: "var(--text-sm)"
    }
  }, "Never")), /*#__PURE__*/React.createElement(DetailRow, {
    label: "Created"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)"
    }
  }, link.createdFull))));
}
Object.assign(window, {
  LinkDetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LinkDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LinksScreen.jsx
try { (() => {
// Links list screen with bulk-select + row menu. Exposes LinksScreen.
function LinksScreen({
  openDetail,
  onNew,
  toast
}) {
  const NS = window.ClickScopeDesignSystem_0a7fd7;
  const {
    DataTable,
    Badge,
    IconButton,
    Button,
    Checkbox,
    Icon,
    DropdownMenu,
    FilterBar,
    BulkActionToolbar,
    Tag,
    EmptyState
  } = NS;
  const d = window.CSData;
  const [selected, setSelected] = React.useState([]);
  const [menuFor, setMenuFor] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [copiedId, setCopiedId] = React.useState(null);
  let rows = d.links;
  if (filter !== "all") rows = rows.filter(l => l.status === filter);
  if (query) rows = rows.filter(l => (l.short + l.dest).toLowerCase().includes(query.toLowerCase()));
  const allChecked = rows.length > 0 && selected.length === rows.length;
  const toggleAll = () => setSelected(allChecked ? [] : rows.map(r => r.id));
  const toggleOne = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const copy = l => {
    setCopiedId(l.id);
    toast({
      variant: "success",
      title: "Copied to clipboard",
      detail: l.short
    });
    setTimeout(() => setCopiedId(null), 1500);
  };
  const columns = [{
    key: "sel",
    header: /*#__PURE__*/React.createElement(Checkbox, {
      checked: allChecked,
      indeterminate: selected.length > 0 && !allChecked,
      onChange: toggleAll
    }),
    width: 40,
    render: r => /*#__PURE__*/React.createElement("span", {
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Checkbox, {
      checked: selected.includes(r.id),
      onChange: () => toggleOne(r.id)
    }))
  }, {
    key: "short",
    header: "Short link",
    mono: true,
    render: r => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500
      }
    }, r.short), /*#__PURE__*/React.createElement("span", {
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: copiedId === r.id ? "check" : "copy",
      label: "Copy",
      onClick: () => copy(r),
      style: copiedId === r.id ? {
        color: "var(--color-success)"
      } : undefined
    })))
  }, {
    key: "dest",
    header: "Destination",
    render: r => /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "var(--color-fg-muted)",
        maxWidth: 260,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, r.dest.replace(/^https?:\/\//, "")))
  }, {
    key: "status",
    header: "Status",
    render: r => /*#__PURE__*/React.createElement(Badge, {
      status: r.status
    })
  }, {
    key: "tags",
    header: "Tags",
    render: r => /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 4,
        flexWrap: "wrap"
      }
    }, r.tags && r.tags.length ? r.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t
    }, t)) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-fg-subtle)"
      }
    }, "\u2014"))
  }, {
    key: "clicks",
    header: "Clicks",
    align: "right",
    render: r => /*#__PURE__*/React.createElement("span", {
      className: "cs-tnum",
      style: {
        fontWeight: 500
      }
    }, r.clicks.toLocaleString())
  }, {
    key: "created",
    header: "Created",
    render: r => /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--color-fg-muted)"
      }
    }, r.created)
  }, {
    key: "menu",
    header: "",
    width: 44,
    render: r => /*#__PURE__*/React.createElement("span", {
      onClick: e => e.stopPropagation(),
      style: {
        position: "relative",
        display: "inline-block"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "ellipsis-vertical",
      label: "Actions",
      onClick: () => setMenuFor(menuFor === r.id ? null : r.id)
    }), menuFor === r.id && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        right: 0,
        top: 38,
        zIndex: 30
      }
    }, /*#__PURE__*/React.createElement(DropdownMenu, {
      items: [{
        icon: "square-pen",
        label: "Edit",
        onClick: () => {
          setMenuFor(null);
          openDetail(r);
        }
      }, {
        icon: "qr-code",
        label: "QR code",
        onClick: () => setMenuFor(null)
      }, {
        icon: "copy",
        label: "Copy link",
        onClick: () => {
          setMenuFor(null);
          copy(r);
        }
      }, {
        divider: true
      }, {
        icon: "trash-2",
        label: "Delete",
        danger: true,
        onClick: () => setMenuFor(null)
      }]
    })))
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    },
    onClick: () => menuFor && setMenuFor(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "Links"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 4
    }
  }, d.links.length, " links \xB7 142 active")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus",
    onClick: onNew
  }, "Create link")), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 40
    }
  }, selected.length > 0 ? /*#__PURE__*/React.createElement(BulkActionToolbar, {
    count: selected.length,
    onClear: () => setSelected([]),
    actions: [{
      label: "Add tag",
      icon: "tag"
    }, {
      label: "Pause",
      icon: "pause"
    }, {
      label: "Delete",
      icon: "trash-2",
      variant: "destructive",
      onClick: () => toast({
        variant: "success",
        title: `Deleted ${selected.length} links`,
        detail: "Undo available for 10s"
      })
    }]
  }) : /*#__PURE__*/React.createElement(FilterBar, {
    query: query,
    onQuery: setQuery,
    status: filter,
    onStatus: setFilter,
    pills: filter !== "all" ? [{
      label: "Status: " + filter,
      onRemove: () => setFilter("all")
    }] : [],
    onClear: () => {
      setQuery("");
      setFilter("all");
    }
  })), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "cs-card"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search-x",
    title: "No links match",
    description: "Try a different search or clear the status filter.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => {
        setQuery("");
        setFilter("all");
      }
    }, "Clear filters")
  })) : /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: rows,
    getRowKey: r => r.id,
    selectedKeys: selected,
    onRowClick: openDetail
  }));
}
Object.assign(window, {
  LinksScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LinksScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Overlays.jsx
try { (() => {
// Create-link modal + sign-in screen. Exposes CreateLinkModal, SignInScreen.
function CreateLinkModal({
  open,
  onClose,
  onCreate
}) {
  const {
    Modal,
    Input,
    Button,
    Toggle,
    Select,
    Checkbox
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [dest, setDest] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [pw, setPw] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setDest("");
      setAlias("");
      setPw(false);
    }
  }, [open]);
  if (!open) return null;
  const create = () => onCreate({
    dest: dest || "https://acme.com/new-page",
    alias: alias || "new" + Math.floor(Math.random() * 900 + 100)
  });
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Create link",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "link-2",
      onClick: create
    }, "Create link"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Destination URL",
    placeholder: "https://example.com/very/long/path",
    value: dest,
    onChange: e => setDest(e.target.value),
    autoFocus: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Custom alias",
    mono: true,
    prefix: "short.link/",
    placeholder: "my-link",
    value: alias,
    onChange: e => setAlias(e.target.value),
    help: "Leave blank to auto-generate a short code."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Expiration",
    options: [{
      value: "never",
      label: "Never"
    }, {
      value: "7d",
      label: "In 7 days"
    }, {
      value: "30d",
      label: "In 30 days"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: pw,
    onChange: setPw,
    label: "Password protect"
  })))));
}
function SignInScreen({
  onSignIn
}) {
  const {
    Input,
    Button,
    Icon,
    Checkbox
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-canvas)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--width-form)",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 40,
      height: 40,
      borderRadius: "var(--radius-lg)",
      background: "var(--color-primary)",
      color: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "Sign in to Click", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-primary)"
    }
  }, "Scope")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6
    }
  }, "Welcome back. Manage your links and analytics."))), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    icon: "chrome",
    onClick: onSignIn
  }, "Continue with Google"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--color-fg-subtle)",
      fontSize: "var(--text-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--color-border)"
    }
  }), " OR ", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--color-border)"
    }
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    defaultValue: "ada@acme.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: remember,
    onChange: e => setRemember(e.target.checked),
    label: "Remember me"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: "var(--text-sm)"
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: onSignIn
  }, "Sign in")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: "var(--text-sm)",
      color: "var(--color-fg-muted)"
    }
  }, "New to Click Scope? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Create an account"))));
}
Object.assign(window, {
  CreateLinkModal,
  SignInScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Overlays.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SettingsScreen.jsx
try { (() => {
// Settings screen. Exposes SettingsScreen.
function SettingsRow({
  title,
  desc,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      padding: "16px 0",
      borderTop: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 500
    }
  }, title), desc && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-muted)",
      marginTop: 3
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none"
    }
  }, children));
}
function SettingsCard({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: "6px 22px 16px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-base)",
      fontWeight: 600,
      padding: "16px 0 4px"
    }
  }, title), children);
}

// Connected accounts (v2 §10.3)
function ConnectedAccounts() {
  const {
    Button,
    Icon,
    Modal
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [confirm, setConfirm] = React.useState(false);
  const [hasPassword] = React.useState(true); // guard: false ⇒ can't disconnect only provider
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      padding: "16px 0",
      borderTop: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 36,
      height: 36,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--color-border)",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-fg-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chrome",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 500
    }
  }, "Google"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-muted)"
    }
  }, "ada@acme.com"))), hasPassword ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setConfirm(true)
  }, "Disconnect") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    disabled: true
  }, "Disconnect")), !hasPassword && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-muted)",
      paddingBottom: 12
    }
  }, "Set a password before disconnecting your only sign-in method. ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Set password")), confirm && /*#__PURE__*/React.createElement(Modal, {
    title: "Disconnect Google?",
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => setConfirm(false)
    }, "Disconnect"))
  }, "You'll no longer be able to sign in with Google. You can still sign in with your email and password."));
}
function SettingsScreen({
  dark,
  onToggleTheme
}) {
  const {
    Input,
    Toggle,
    Button,
    SegmentedControl,
    Badge,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [pwProtect, setPwProtect] = React.useState(true);
  const [notif, setNotif] = React.useState(false);
  const themeVal = dark ? "dark" : "light";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-detail)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 4
    }
  }, "Workspace, defaults, and account.")), /*#__PURE__*/React.createElement(SettingsCard, {
    title: "Profile"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Name"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Ada Chen"
  }))), /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Email"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "ada@acme.com",
    type: "email"
  }))), /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Workspace",
    desc: "Shown on public link pages."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "Acme Inc."
  })))), /*#__PURE__*/React.createElement(SettingsCard, {
    title: "Link defaults"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Default domain",
    desc: "Applied to new links unless overridden."
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: "var(--text-sm)"
    }
  }, "short.link ", /*#__PURE__*/React.createElement(Badge, {
    variant: "info",
    dot: false
  }, "Verified"))), /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Require password on new links",
    desc: "New links start with password protection enabled."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: pwProtect,
    onChange: setPwProtect
  })), /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Default expiration"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, (() => {
    const {
      Select
    } = window.ClickScopeDesignSystem_0a7fd7;
    return /*#__PURE__*/React.createElement(Select, {
      options: [{
        value: "never",
        label: "Never"
      }, {
        value: "30d",
        label: "30 days"
      }, {
        value: "90d",
        label: "90 days"
      }]
    });
  })()))), /*#__PURE__*/React.createElement(SettingsCard, {
    title: "Appearance"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Theme",
    desc: "Match the system or pick a mode."
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: themeVal,
    onChange: v => {
      if (v === "dark" !== dark) onToggleTheme();
    },
    options: [{
      value: "light",
      label: "Light"
    }, {
      value: "dark",
      label: "Dark"
    }],
    "aria-label": "Theme"
  })), /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Weekly summary email",
    desc: "A Monday digest of clicks and top links."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: notif,
    onChange: setNotif
  }))), /*#__PURE__*/React.createElement(SettingsCard, {
    title: "Connected accounts"
  }, /*#__PURE__*/React.createElement(ConnectedAccounts, null)), /*#__PURE__*/React.createElement(SettingsCard, {
    title: "Danger zone"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    title: "Delete account",
    desc: "Permanently remove your workspace and all links. This can't be undone."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    icon: "trash-2"
  }, "Delete account"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Save changes")));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
// Shared fake data + helpers for the Click Scope app UI kit.
window.CSData = function () {
  const links = [{
    id: "l1",
    alias: "launch",
    short: "short.link/launch",
    dest: "https://acme.com/2026/spring-launch-campaign",
    status: "active",
    clicks: 12840,
    created: "Mar 4",
    createdFull: "Mar 4, 2026",
    tags: ["campaign", "q2"]
  }, {
    id: "l2",
    alias: "pricing",
    short: "short.link/pricing",
    dest: "https://acme.com/pricing?ref=email",
    status: "active",
    clicks: 8421,
    created: "Mar 2",
    createdFull: "Mar 2, 2026",
    tags: ["email"]
  }, {
    id: "l3",
    alias: "webinar",
    short: "short.link/webinar",
    dest: "https://acme.com/events/q2-product-webinar-registration",
    status: "protected",
    clicks: 3190,
    created: "Feb 28",
    createdFull: "Feb 28, 2026",
    tags: ["events"]
  }, {
    id: "l4",
    alias: "beta",
    short: "short.link/beta",
    dest: "https://acme.com/beta-access",
    status: "expiring",
    clicks: 1567,
    created: "Feb 24",
    createdFull: "Feb 24, 2026",
    tags: ["product"]
  }, {
    id: "l5",
    alias: "promo24",
    short: "short.link/promo24",
    dest: "https://acme.com/holiday-2024",
    status: "expired",
    clicks: 24190,
    created: "Dec 1",
    createdFull: "Dec 1, 2025",
    tags: ["campaign"]
  }, {
    id: "l6",
    alias: "docs",
    short: "short.link/docs",
    dest: "https://docs.acme.com/getting-started",
    status: "paused",
    clicks: 642,
    created: "Feb 20",
    createdFull: "Feb 20, 2026",
    tags: []
  }];
  const referrers = [{
    ref: "google.com",
    pct: 42,
    clicks: 5384
  }, {
    ref: "twitter.com / x.com",
    pct: 24,
    clicks: 3081
  }, {
    ref: "Email newsletter",
    pct: 18,
    clicks: 2311
  }, {
    ref: "Direct",
    pct: 11,
    clicks: 1412
  }, {
    ref: "linkedin.com",
    pct: 5,
    clicks: 652
  }];
  const countries = [{
    ref: "United States",
    pct: 51,
    clicks: 6548
  }, {
    ref: "United Kingdom",
    pct: 17,
    clicks: 2183
  }, {
    ref: "Germany",
    pct: 12,
    clicks: 1541
  }, {
    ref: "Canada",
    pct: 9,
    clicks: 1155
  }, {
    ref: "Australia",
    pct: 6,
    clicks: 770
  }];
  const devices = [{
    ref: "Mobile",
    pct: 58,
    clicks: 7448
  }, {
    ref: "Desktop",
    pct: 36,
    clicks: 4622
  }, {
    ref: "Tablet",
    pct: 6,
    clicks: 770
  }];
  // 30-day daily clicks for the trend chart
  const trend = [280, 310, 290, 340, 420, 390, 360, 410, 480, 520, 470, 510, 560, 540, 610, 590, 640, 700, 680, 650, 720, 760, 740, 810, 790, 850, 880, 860, 910, 980];
  return {
    links,
    referrers,
    countries,
    devices,
    trend
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/auth/AuthScreens.jsx
try { (() => {
// Auth flow screens (v2 §10.1, §10.2). Exposes AuthFlow. Reuses the centered
// auth-card template. SignInScreen lives in ../app/Overlays.jsx.
function AuthCard({
  icon,
  iconTone,
  title,
  subtitle,
  children,
  footer
}) {
  const {
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  const tone = iconTone || {
    bg: "var(--color-primary)",
    fg: "#fff"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-canvas)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--width-form)",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 44,
      height: 44,
      borderRadius: "var(--radius-lg)",
      background: tone.bg,
      color: tone.fg,
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: 600,
      letterSpacing: "-0.025em"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      textWrap: "pretty"
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, children), footer && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: "var(--text-sm)",
      color: "var(--color-fg-muted)"
    }
  }, footer)));
}
function ForgotPassword({
  go
}) {
  const {
    Input,
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(AuthCard, {
    icon: "key-round",
    title: "Reset your password",
    subtitle: "Enter your account email and we'll send a reset link.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, "Remembered it? ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go("signin");
      }
    }, "Back to sign in"))
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    defaultValue: "ada@acme.com",
    autoFocus: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: () => go("forgot-sent")
  }, "Send reset link"));
}
function ForgotSent({
  go
}) {
  return /*#__PURE__*/React.createElement(AuthCard, {
    icon: "circle-check",
    iconTone: {
      bg: "var(--color-success-bg-subtle)",
      fg: "var(--color-success-fg)"
    },
    title: "Check your email",
    subtitle: "If an account exists for that address, we've sent a reset link. It expires in 30 minutes.",
    footer: /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go("signin");
      }
    }, "Back to sign in")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-alert cs-alert--info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-alert__detail"
  }, "Didn't get it? Check spam, or try a different email."))), (() => {
    const {
      Button
    } = window.ClickScopeDesignSystem_0a7fd7;
    return /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      block: true,
      onClick: () => go("reset")
    }, "Open reset link (demo)");
  })()));
}
function ResetPassword({
  go
}) {
  const {
    Input,
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const mismatch = confirm.length > 0 && pw !== confirm;
  return /*#__PURE__*/React.createElement(AuthCard, {
    icon: "lock",
    title: "Set a new password",
    subtitle: "Choose a strong password you don't use elsewhere."
  }, /*#__PURE__*/React.createElement(Input, {
    label: "New password",
    type: "password",
    value: pw,
    onChange: e => setPw(e.target.value),
    help: "At least 8 characters.",
    autoFocus: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Confirm password",
    type: "password",
    value: confirm,
    onChange: e => setConfirm(e.target.value),
    error: mismatch ? "Passwords don't match" : undefined
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    disabled: !pw || mismatch || !confirm,
    onClick: () => go("reset-done")
  }, "Reset password"));
}
function ResetDone({
  go
}) {
  const {
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(AuthCard, {
    icon: "circle-check",
    iconTone: {
      bg: "var(--color-success-bg-subtle)",
      fg: "var(--color-success-fg)"
    },
    title: "Password updated",
    subtitle: "You can now sign in with your new password."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: () => go("signin")
  }, "Sign in"));
}
function AccountLinkConflict({
  go
}) {
  const {
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(AuthCard, {
    icon: "info",
    iconTone: {
      bg: "var(--color-info-bg-subtle)",
      fg: "var(--color-info-fg)"
    },
    title: "An account already exists for this email",
    subtitle: "ada@acme.com is already registered with a password. Sign in with your password to link Google, or use a different Google account."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: () => go("signin")
  }, "Sign in with password"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    onClick: () => go("signin")
  }, "Use a different Google account"));
}
function AuthFlow() {
  const {
    SegmentedControl
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [page, setPage] = React.useState("signin");
  const go = p => setPage(p);
  let screen;
  if (page === "signin") screen = /*#__PURE__*/React.createElement(SignInScreen, {
    onSignIn: () => go("forgot")
  });else if (page === "forgot") screen = /*#__PURE__*/React.createElement(ForgotPassword, {
    go: go
  });else if (page === "forgot-sent") screen = /*#__PURE__*/React.createElement(ForgotSent, {
    go: go
  });else if (page === "reset") screen = /*#__PURE__*/React.createElement(ResetPassword, {
    go: go
  });else if (page === "reset-done") screen = /*#__PURE__*/React.createElement(ResetDone, {
    go: go
  });else screen = /*#__PURE__*/React.createElement(AccountLinkConflict, {
    go: go
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: "100%"
    }
  }, screen, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 16,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: page,
    onChange: go,
    options: [{
      value: "signin",
      label: "Sign in"
    }, {
      value: "forgot",
      label: "Forgot"
    }, {
      value: "forgot-sent",
      label: "Sent"
    }, {
      value: "reset",
      label: "Reset"
    }, {
      value: "reset-done",
      label: "Done"
    }, {
      value: "conflict",
      label: "Link conflict"
    }],
    "aria-label": "Auth screen"
  })));
}
Object.assign(window, {
  AuthFlow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/auth/AuthScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingLanding.jsx
try { (() => {
// Marketing landing surfaces. Exposes MarketingLanding.
function MktHeader({
  onSignIn
}) {
  const {
    Button,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "color-mix(in oklch, var(--color-surface) 85%, transparent)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-marketing)",
      margin: "0 auto",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontWeight: 600,
      fontSize: "var(--text-lg)",
      letterSpacing: "-0.02em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 30,
      height: 30,
      borderRadius: "var(--radius-md)",
      background: "var(--color-primary)",
      color: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 17
  })), "Click", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-primary)"
    }
  }, "Scope")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 22,
      marginLeft: 8
    }
  }, ["Product", "Analytics", "Pricing", "Docs"].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--color-fg-muted)",
      fontSize: "var(--text-sm)",
      fontWeight: 500
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onSignIn
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onSignIn
  }, "Get started"))));
}
function Hero({
  onSignIn
}) {
  const {
    Button,
    Icon,
    Badge
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [shortened, setShortened] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--width-marketing)",
      margin: "0 auto",
      padding: "80px 24px 64px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-badge cs-badge--info",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-badge__dot"
  }), " New \u2014 QR codes for every link"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-6xl)",
      fontWeight: 700,
      letterSpacing: "-0.035em",
      lineHeight: 1.02,
      maxWidth: 780,
      margin: "0 auto"
    }
  }, "Short links, real ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-primary)"
    }
  }, "insight"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-xl)",
      color: "var(--color-fg-muted)",
      maxWidth: 560,
      margin: "20px auto 0",
      lineHeight: 1.5
    }
  }, "Shorten any URL, add a custom alias, protect it with a password, and watch every click in real time."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: "36px auto 0",
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "cs-input",
    placeholder: "Paste a long URL\u2026",
    defaultValue: "https://acme.com/2026/spring-launch-campaign",
    style: {
      height: 46,
      fontSize: "var(--text-base)"
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "link-2",
    onClick: () => setShortened(true)
  }, "Shorten")), shortened && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: "14px auto 0",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      background: "var(--color-surface)",
      border: "1px solid var(--color-primary)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-mono",
    style: {
      fontWeight: 600,
      color: "var(--color-primary)"
    }
  }, "short.link/launch"), /*#__PURE__*/React.createElement(Badge, {
    status: "active"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "copy"
  }, "Copy"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--color-fg-subtle)",
      marginTop: 18
    }
  }, "Free forever for your first 50 links. No card required."));
}
function FeatureGrid() {
  const {
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  const feats = [{
    icon: "sparkles",
    title: "Custom aliases",
    body: "Turn short.link/x8Fa2 into short.link/launch. Every link, on brand."
  }, {
    icon: "bar-chart-3",
    title: "Real-time analytics",
    body: "Clicks, referrers, countries, and devices — updated as they happen."
  }, {
    icon: "qr-code",
    title: "QR codes",
    body: "Every link ships with a downloadable QR code for print and packaging."
  }, {
    icon: "lock",
    title: "Password protection",
    body: "Gate sensitive links behind a password without extra tooling."
  }, {
    icon: "calendar-clock",
    title: "Expiration rules",
    body: "Set links to expire on a date so campaigns clean up after themselves."
  }, {
    icon: "users",
    title: "Team workspaces",
    body: "Share a link library and analytics with your whole team."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-surface)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-marketing)",
      margin: "0 auto",
      padding: "72px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-4xl)",
      fontWeight: 700,
      letterSpacing: "-0.03em"
    }
  }, "Everything a link should do"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--color-fg-muted)",
      marginTop: 12
    }
  }, "One tool for shortening, sharing, protecting, and measuring.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20
    }
  }, feats.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title,
    className: "cs-card",
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 42,
      height: 42,
      borderRadius: "var(--radius-lg)",
      background: "var(--color-primary-tint)",
      color: "var(--color-primary-tint-fg)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-lg)",
      fontWeight: 600,
      marginBottom: 6
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      lineHeight: 1.5
    }
  }, f.body))))));
}
function CtaFooter({
  onSignIn
}) {
  const {
    Button,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--width-marketing)",
      margin: "0 auto",
      padding: "80px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-4xl)",
      fontWeight: 700,
      letterSpacing: "-0.03em"
    }
  }, "Start shortening in seconds"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--color-fg-muted)",
      margin: "12px 0 28px"
    }
  }, "Free for your first 50 links. Upgrade when your team grows."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onSignIn
  }, "Get started free")), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--color-border)",
      background: "var(--color-surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--width-marketing)",
      margin: "0 auto",
      padding: "28px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      color: "var(--color-fg-muted)",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600,
      color: "var(--color-fg)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 16
  }), " Click Scope"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, "\xA9 2026 Click Scope. All rights reserved."))));
}
function MarketingLanding({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--color-canvas)",
      color: "var(--color-fg)",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement(MktHeader, {
    onSignIn: onSignIn
  }), /*#__PURE__*/React.createElement(Hero, {
    onSignIn: onSignIn
  }), /*#__PURE__*/React.createElement(FeatureGrid, null), /*#__PURE__*/React.createElement(CtaFooter, {
    onSignIn: onSignIn
  }));
}
Object.assign(window, {
  MarketingLanding
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingLanding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/PublicPages.jsx
try { (() => {
// Public recipient pages. Exposes PublicPages (a switcher) + individual screens.
function PublicShell({
  children
}) {
  const {
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-canvas)",
      color: "var(--color-fg)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--width-form)",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "var(--color-fg-subtle)",
      fontSize: "var(--text-xs)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 12
  }), " Powered by Click Scope"));
}
function PasswordGate({
  go
}) {
  const {
    Input,
    Button,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [val, setVal] = React.useState("");
  const [err, setErr] = React.useState(false);
  const submit = () => {
    if (val === "letmein") go("redirect");else setErr(true);
  };
  return /*#__PURE__*/React.createElement(PublicShell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 48,
      height: 48,
      borderRadius: "var(--radius-full)",
      background: "var(--color-surface-subtle)",
      color: "var(--color-fg-muted)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, "This link is password protected"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      fontSize: "var(--text-sm)"
    }
  }, "Enter the password to continue to your destination.")), /*#__PURE__*/React.createElement("div", {
    className: "cs-card",
    style: {
      padding: 20,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    value: val,
    onChange: e => {
      setVal(e.target.value);
      setErr(false);
    },
    error: err ? "Incorrect password" : undefined,
    placeholder: "Enter password",
    autoFocus: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "arrow-right",
    onClick: submit
  }, "Unlock"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--color-fg-subtle)",
      textAlign: "center"
    }
  }, "Hint for this demo: ", /*#__PURE__*/React.createElement("span", {
    className: "cs-mono"
  }, "letmein"))));
}
function RedirectPage({
  go
}) {
  const {
    Spinner,
    Icon
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(PublicShell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 48,
      height: 48,
      borderRadius: "var(--radius-full)",
      background: "var(--color-primary-tint)",
      color: "var(--color-primary)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link-2",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, "Taking you there\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      fontSize: "var(--text-sm)",
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: 14
  }), " Redirecting to ", /*#__PURE__*/React.createElement("span", {
    className: "cs-mono"
  }, "acme.com"))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
    },
    style: {
      fontSize: "var(--text-sm)"
    }
  }, "Continue now"));
}
function ExpiredPage({
  go
}) {
  const {
    Icon,
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(PublicShell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 48,
      height: 48,
      borderRadius: "var(--radius-full)",
      background: "var(--color-danger-tint)",
      color: "var(--color-danger)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-x",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, "This link has expired"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      fontSize: "var(--text-sm)"
    }
  }, "The owner set this link to expire and it's no longer active. If you think this is a mistake, contact whoever shared it with you.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "link-2",
    onClick: () => go("landing")
  }, "Create your own short link"));
}
function NotFoundPage({
  go
}) {
  const {
    Icon,
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(PublicShell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 56,
      fontWeight: 700,
      letterSpacing: "-0.04em",
      color: "var(--color-fg-subtle)",
      fontFamily: "var(--font-mono)"
    }
  }, "404"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, "Link not found"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      fontSize: "var(--text-sm)"
    }
  }, "We couldn't find ", /*#__PURE__*/React.createElement("span", {
    className: "cs-mono"
  }, "short.link/unknown"), ". It may have been deleted or never existed.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "arrow-left",
    onClick: () => go("landing")
  }, "Go to Click Scope"));
}
function ForbiddenPage({
  go
}) {
  const {
    Icon,
    Button
  } = window.ClickScopeDesignSystem_0a7fd7;
  return /*#__PURE__*/React.createElement(PublicShell, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 48,
      height: 48,
      borderRadius: "var(--radius-full)",
      background: "var(--color-surface-subtle)",
      color: "var(--color-fg-muted)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-alert",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, "This link is no longer available"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--color-fg-muted)",
      marginTop: 6,
      fontSize: "var(--text-sm)"
    }
  }, "The owner has removed this link. If you think this is a mistake, contact whoever shared it with you.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "arrow-left",
    onClick: () => go("landing")
  }, "Go to Click Scope"));
}
function PublicPages() {
  const {
    SegmentedControl
  } = window.ClickScopeDesignSystem_0a7fd7;
  const [page, setPage] = React.useState("password");
  const go = p => setPage(p === "landing" ? "notfound" : p);
  let screen;
  if (page === "password") screen = /*#__PURE__*/React.createElement(PasswordGate, {
    go: go
  });else if (page === "redirect") screen = /*#__PURE__*/React.createElement(RedirectPage, {
    go: go
  });else if (page === "expired") screen = /*#__PURE__*/React.createElement(ExpiredPage, {
    go: go
  });else if (page === "forbidden") screen = /*#__PURE__*/React.createElement(ForbiddenPage, {
    go: go
  });else screen = /*#__PURE__*/React.createElement(NotFoundPage, {
    go: go
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%"
    }
  }, screen, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: page,
    onChange: setPage,
    options: [{
      value: "password",
      label: "Password"
    }, {
      value: "redirect",
      label: "Redirect"
    }, {
      value: "expired",
      label: "Expired"
    }, {
      value: "forbidden",
      label: "403"
    }, {
      value: "notfound",
      label: "404"
    }],
    "aria-label": "Preview page"
  })));
}
Object.assign(window, {
  PublicPages
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/PublicPages.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AnalyticsChart = __ds_scope.AnalyticsChart;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.TableBar = __ds_scope.TableBar;

__ds_ns.LinkCard = __ds_scope.LinkCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.PageError = __ds_scope.PageError;

__ds_ns.QrCodePopover = __ds_scope.QrCodePopover;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.BulkActionToolbar = __ds_scope.BulkActionToolbar;

__ds_ns.FilterBar = __ds_scope.FilterBar;

})();
