import React from "react";

/* Data table — the link list (md+) and analytics breakdown tables share this skin:
   overline headers on a subtle surface, compact py-3 cells, hover rows, and an
   optional inline share-bar (analytics). Columns declare align / mono / render. */
export function DataTable({ columns, rows, getRowKey, selectedKeys = [], onRowClick }) {
  return (
    <div className="cs-table-wrap">
      <table className="cs-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align === "right" ? "right" : "left", width: c.width }}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const key = getRowKey ? getRowKey(row, i) : i;
            const selected = selectedKeys.includes(key);
            return (
              <tr
                key={key}
                data-selected={String(selected)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: "pointer" } : undefined}
              >
                {columns.map((c) => {
                  const cls = [c.align === "right" ? "cs-table__num" : "", c.mono ? "cs-mono" : ""]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <td key={c.key} className={cls || undefined}>
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* Inline share bar for analytics breakdown rows (referrers/countries/devices). */
export function TableBar({ pct }) {
  return <div className="cs-table__bar" style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} />;
}
