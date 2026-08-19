// Links list screen with bulk-select + row menu. Exposes LinksScreen.
function LinksScreen({ openDetail, onNew, toast }) {
  const NS = window.ClickScopeDesignSystem_0a7fd7;
  const { DataTable, Badge, IconButton, Button, Checkbox, Icon, DropdownMenu, FilterBar, BulkActionToolbar, Tag, EmptyState } = NS;
  const d = window.CSData;
  const [selected, setSelected] = React.useState([]);
  const [menuFor, setMenuFor] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [copiedId, setCopiedId] = React.useState(null);

  let rows = d.links;
  if (filter !== "all") rows = rows.filter((l) => l.status === filter);
  if (query) rows = rows.filter((l) => (l.short + l.dest).toLowerCase().includes(query.toLowerCase()));

  const allChecked = rows.length > 0 && selected.length === rows.length;
  const toggleAll = () => setSelected(allChecked ? [] : rows.map((r) => r.id));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const copy = (l) => { setCopiedId(l.id); toast({ variant: "success", title: "Copied to clipboard", detail: l.short }); setTimeout(() => setCopiedId(null), 1500); };

  const columns = [
    { key: "sel", header: <Checkbox checked={allChecked} indeterminate={selected.length > 0 && !allChecked} onChange={toggleAll} />, width: 40,
      render: (r) => <span onClick={(e) => e.stopPropagation()}><Checkbox checked={selected.includes(r.id)} onChange={() => toggleOne(r.id)} /></span> },
    { key: "short", header: "Short link", mono: true, render: (r) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 500 }}>{r.short}</span>
        <span onClick={(e) => e.stopPropagation()}>
          <IconButton icon={copiedId === r.id ? "check" : "copy"} label="Copy" onClick={() => copy(r)} style={copiedId === r.id ? { color: "var(--color-success)" } : undefined} />
        </span>
      </div>
    ) },
    { key: "dest", header: "Destination", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-fg-muted)", maxWidth: 260, overflow: "hidden" }}>
        <Icon name="external-link" size={13} /><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.dest.replace(/^https?:\/\//, "")}</span>
      </span>
    ) },
    { key: "status", header: "Status", render: (r) => <Badge status={r.status} /> },
    { key: "tags", header: "Tags", render: (r) => (
      <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>{r.tags && r.tags.length ? r.tags.map((t) => <Tag key={t}>{t}</Tag>) : <span style={{ color: "var(--color-fg-subtle)" }}>—</span>}</span>
    ) },
    { key: "clicks", header: "Clicks", align: "right", render: (r) => <span className="cs-tnum" style={{ fontWeight: 500 }}>{r.clicks.toLocaleString()}</span> },
    { key: "created", header: "Created", render: (r) => <span style={{ color: "var(--color-fg-muted)" }}>{r.created}</span> },
    { key: "menu", header: "", width: 44, render: (r) => (
      <span onClick={(e) => e.stopPropagation()} style={{ position: "relative", display: "inline-block" }}>
        <IconButton icon="ellipsis-vertical" label="Actions" onClick={() => setMenuFor(menuFor === r.id ? null : r.id)} />
        {menuFor === r.id && (
          <span style={{ position: "absolute", right: 0, top: 38, zIndex: 30 }}>
            <DropdownMenu items={[
              { icon: "square-pen", label: "Edit", onClick: () => { setMenuFor(null); openDetail(r); } },
              { icon: "qr-code", label: "QR code", onClick: () => setMenuFor(null) },
              { icon: "copy", label: "Copy link", onClick: () => { setMenuFor(null); copy(r); } },
              { divider: true },
              { icon: "trash-2", label: "Delete", danger: true, onClick: () => setMenuFor(null) },
            ]} />
          </span>
        )}
      </span>
    ) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} onClick={() => menuFor && setMenuFor(null)}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Links</h1>
          <p style={{ color: "var(--color-fg-muted)", marginTop: 4 }}>{d.links.length} links · 142 active</p>
        </div>
        <Button variant="primary" icon="plus" onClick={onNew}>Create link</Button>
      </div>

      <div style={{ minHeight: 40 }}>
        {selected.length > 0 ? (
          <BulkActionToolbar
            count={selected.length}
            onClear={() => setSelected([])}
            actions={[
              { label: "Add tag", icon: "tag" },
              { label: "Pause", icon: "pause" },
              { label: "Delete", icon: "trash-2", variant: "destructive", onClick: () => toast({ variant: "success", title: `Deleted ${selected.length} links`, detail: "Undo available for 10s" }) },
            ]}
          />
        ) : (
          <FilterBar
            query={query}
            onQuery={setQuery}
            status={filter}
            onStatus={setFilter}
            pills={filter !== "all" ? [{ label: "Status: " + filter, onRemove: () => setFilter("all") }] : []}
            onClear={() => { setQuery(""); setFilter("all"); }}
          />
        )}
      </div>

      {rows.length === 0 ? (
        <div className="cs-card"><EmptyState icon="search-x" title="No links match" description="Try a different search or clear the status filter." action={<Button variant="secondary" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters</Button>} /></div>
      ) : (
        <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} selectedKeys={selected} onRowClick={openDetail} />
      )}
    </div>
  );
}

Object.assign(window, { LinksScreen });
