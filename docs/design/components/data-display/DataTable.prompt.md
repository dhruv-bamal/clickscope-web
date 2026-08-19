Declarative table for the link list (md+) and analytics breakdown tables. Numbers are right-aligned + tabular; short links use `mono`.

```jsx
<DataTable
  columns={[
    { key: "short", header: "Short link", mono: true },
    { key: "dest", header: "Destination" },
    { key: "status", header: "Status", render: r => <Badge status={r.status} /> },
    { key: "clicks", header: "Clicks", align: "right" },
  ]}
  rows={links}
  getRowKey={r => r.id}
  onRowClick={openDetail}
/>
```

For analytics rows, add a bar column: `render: r => <TableBar pct={r.share} />`.
