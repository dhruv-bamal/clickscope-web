Indigo-tint bar shown in the filter bar's slot when table rows are selected (lg+).

```jsx
<BulkActionToolbar
  count={selected.length}
  onClear={() => setSelected([])}
  actions={[
    { label: "Add tag", icon: "tag" },
    { label: "Pause", icon: "pause" },
    { label: "Delete", icon: "trash-2", variant: "destructive", onClick: confirmBulkDelete },
  ]}
/>
```

Delete always opens the destructive confirm modal naming the count ("Delete 3 links?") — never a silent bulk delete.
