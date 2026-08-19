import React from "react";

/* Data table — link list (md+) and analytics breakdown tables. Columns are
   declarative; overline headers, compact rows, hover + selected states. */
export interface DataTableColumn<Row = unknown> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right";
  /** Render the cell in the mono face (short links, codes). */
  mono?: boolean;
  width?: string | number;
  /** Custom cell renderer; defaults to row[key]. */
  render?: (row: Row) => React.ReactNode;
}
export interface DataTableProps<Row = unknown> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey?: (row: Row, index: number) => string | number;
  selectedKeys?: (string | number)[];
  onRowClick?: (row: Row) => void;
}

export function DataTable<Row = unknown>({ columns, rows, getRowKey, selectedKeys = [], onRowClick }: DataTableProps<Row>) {
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
                      {c.render ? c.render(row) : (row as Record<string, React.ReactNode>)[c.key]}
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

/** Inline horizontal share bar for analytics breakdown rows. */
export interface TableBarProps {
  /** Share 0–100. */
  pct: number;
}

export function TableBar({ pct }: TableBarProps) {
  return <div className="cs-table__bar" style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} />;
}
