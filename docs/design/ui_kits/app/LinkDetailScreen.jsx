// Link detail screen. Exposes LinkDetailScreen.
function DetailRow({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid var(--color-border)" }}>
      <span style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>
    </div>
  );
}

function QrGlyph({ size = 116 }) {
  // Deterministic pseudo-QR from a fixed bit pattern (visual only, not scannable).
  const n = 11;
  const bits = "11111110101000101110111010111010001010111011101000101011100000001010111110101010101110001110101000111011101010001110111110101010";
  const cell = size / n;
  const cells = [];
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n), c = i % n;
    const corner = (r < 3 && c < 3) || (r < 3 && c > n - 4) || (r > n - 4 && c < 3);
    const on = corner ? ((r === 0 || r === 2 || c === 0 || c === 2) || (r === n - 1 || r === n - 3 || c === n - 1 || c === n - 3) ? true : (r === 1 && c === 1) || (r === 1 && c === n - 2) || (r === n - 2 && c === 1)) : bits[i % bits.length] === "1";
    if (on) cells.push(<rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} rx={cell * 0.15} />);
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", fill: "var(--color-fg)" }}>{cells}</svg>;
}

function LinkDetailScreen({ link, back, toast }) {
  const { Button, IconButton, Badge, Icon, Toggle, StatCard, DataTable, TableBar, AnalyticsChart, QrCodePopover } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  const [active, setActive] = React.useState(link.status !== "paused");
  const [copied, setCopied] = React.useState(false);
  const copy = () => { setCopied(true); toast({ variant: "success", title: "Copied to clipboard", detail: link.short }); setTimeout(() => setCopied(false), 1500); };

  return (
    <div style={{ maxWidth: "var(--width-detail)", margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
      <button onClick={back} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: 0, cursor: "pointer", color: "var(--color-fg-muted)", fontSize: "var(--text-sm)", padding: 0, width: "fit-content" }}>
        <Icon name="arrow-left" size={16} /> Back to links
      </button>

      <div className="cs-card" style={{ padding: 22, display: "flex", gap: 22, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="cs-mono" style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>{link.short}</span>
            <Badge status={active ? (link.status === "paused" ? "active" : link.status) : "paused"} />
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>
            <Icon name="external-link" size={14} /> {link.dest}
          </a>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <Button variant="secondary" icon={copied ? "check" : "copy"} onClick={copy}>{copied ? "Copied" : "Copy link"}</Button>
            <Button variant="secondary" icon="square-pen">Edit</Button>
            <IconButton icon="trash-2" label="Delete" variant="secondary" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 12, border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", flex: "none" }}>
          <QrCodePopover shortUrl={link.short} onDownload={() => toast({ variant: "success", title: "QR downloaded", detail: link.short + ".png" })} onCopy={() => toast({ variant: "success", title: "QR copied to clipboard" })} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <StatCard label="Total clicks" value={link.clicks.toLocaleString()} delta="+9% vs last week" direction="up" />
        <StatCard label="Unique" value={Math.round(link.clicks * 0.78).toLocaleString()} />
        <StatCard label="QR scans" value={Math.round(link.clicks * 0.12).toLocaleString()} delta="+15%" direction="up" />
      </div>

      <div className="cs-card" style={{ padding: 20 }}>
        <div className="cs-statcard__eyebrow" style={{ marginBottom: 14 }}>Clicks — last 30 days</div>
        <AnalyticsChart data={d.trend} labels={dayLabels} height={180} />
      </div>

      <div className="cs-card" style={{ padding: "6px 20px 14px" }}>
        <DetailRow label="Status"><Toggle on={active} onChange={setActive} label={active ? "Active" : "Paused"} /></DetailRow>
        <DetailRow label="Destination"><span className="cs-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", maxWidth: 340, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.dest}</span></DetailRow>
        <DetailRow label="Password protection">{link.status === "protected" ? <Badge status="protected" /> : <span style={{ color: "var(--color-fg-subtle)", fontSize: "var(--text-sm)" }}>Off</span>}</DetailRow>
        <DetailRow label="Expiration">{link.status === "expiring" ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-warning-fg)" }}><Icon name="clock" size={14} /> In 5 days</span> : <span style={{ color: "var(--color-fg-subtle)", fontSize: "var(--text-sm)" }}>Never</span>}</DetailRow>
        <DetailRow label="Created"><span style={{ fontSize: "var(--text-sm)" }}>{link.createdFull}</span></DetailRow>
      </div>
    </div>
  );
}

Object.assign(window, { LinkDetailScreen });
