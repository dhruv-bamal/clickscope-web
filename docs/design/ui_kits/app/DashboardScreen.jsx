// Dashboard screen. Exposes DashboardScreen.
function SectionHead({ title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 600 }}>{title}</h2>
      {action}
    </div>
  );
}

function DashboardScreen({ setRoute, openDetail }) {
  const { StatCard, Button, Badge, Icon, SegmentedControl, AnalyticsChart } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const [range, setRange] = React.useState("30d");
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  const top = d.links.filter((l) => l.status !== "expired").slice(0, 4);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Dashboard</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 4 }}>Your links at a glance — last 30 days.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="Total clicks" value="51,860" delta="+12.4% vs last period" direction="up" />
        <StatCard label="Active links" value="142" delta="+8 this month" direction="up" />
        <StatCard label="Avg. CTR" value="4.7%" delta="-0.3% vs last period" direction="down" />
        <StatCard label="QR scans" value="9,214" delta="+21% vs last period" direction="up" />
      </div>
      <div className="cs-card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div className="cs-statcard__eyebrow">Clicks over time</div>
            <div style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }} className="cs-tnum">51,860</div>
          </div>
          <SegmentedControl value={range} onChange={setRange} options={["24h", "7d", "30d"]} aria-label="Range" />
        </div>
        <AnalyticsChart data={d.trend} labels={dayLabels} />
      </div>
      <div className="cs-card" style={{ padding: 20 }}>
        <SectionHead title="Top links" action={<Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => setRoute("links")}>View all</Button>} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {top.map((l, i) => (
            <button key={l.id} onClick={() => openDetail(l)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 8px", background: "transparent", border: 0, borderTop: i ? "1px solid var(--color-border)" : 0, cursor: "pointer", textAlign: "left", width: "100%" }}>
              <span style={{ color: "var(--color-icon)" }}><Icon name="link-2" size={16} /></span>
              <span className="cs-mono" style={{ fontWeight: 500, fontSize: "var(--text-sm)" }}>{l.short}</span>
              <span style={{ color: "var(--color-fg-muted)", fontSize: "var(--text-xs)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{l.dest}</span>
              <Badge status={l.status} />
              <span className="cs-tnum" style={{ fontWeight: 600, width: 72, textAlign: "right" }}>{l.clicks.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
