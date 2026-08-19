import React from "react";

/** Data table — link list (md+) and analytics breakdown tables. Columns are
 * declarative; overline headers, compact rows, hover + selected states.
 * @startingPoint section="Data display" subtitle="Link list / analytics breakdown table" viewport="700x260"
 */
export interface DataTableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right";
  /** Render the cell in the mono face (short links, codes). */
  mono?: boolean;
  width?: string | number;
  /** Custom cell renderer; defaults to row[key]. */
  render?: (row: Row) => React.ReactNode;
}
export interface DataTableProps<Row = any> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey?: (row: Row, index: number) => string | number;
  selectedKeys?: (string | number)[];
  onRowClick?: (row: Row) => void;
}
export function DataTable<Row = any>(props: DataTableProps<Row>): JSX.Element;

/** Inline horizontal share bar for analytics breakdown rows. */
export interface TableBarProps {
  /** Share 0–100. */
  pct: number;
}
export function TableBar(props: TableBarProps): JSX.Element;
