The inline control row above the link table — search, status filter, active-filter pills, and Clear.

```jsx
<FilterBar
  query={q} onQuery={setQ}
  status={status} onStatus={setStatus}
  pills={status !== "all" ? [{ label: "Status: " + status, onRemove: () => setStatus("all") }] : []}
  onClear={() => { setQ(""); setStatus("all"); }}
/>
```

Mobile: `<FilterBar mobile activeCount={2} onOpenFilters={openDrawer} />` renders a "Filters (2)" button that opens a drawer with the same controls. Presentational only; narrowing rows is the app's job. Sorting (table headers) is separate.
