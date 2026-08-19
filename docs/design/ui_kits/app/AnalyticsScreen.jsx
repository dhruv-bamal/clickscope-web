// Analytics screen: trend + breakdown tables. Exposes AnalyticsScreen.
function BreakdownTable({ title, icon, rows }) {
  const { DataTable, TableBar, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <div className="cs-card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ color: "var(--color-icon)" }}><Icon name={icon} size={16} /></span>
        <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{title}</h3>
      </div>
      <DataTable
        columns={[
          { key: "ref", header: title },
          { key: "bar", header: "Share", width: "38%", render: (r) => (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}><TableBar pct={r.pct} /></div>
              <span className="cs-tnum" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", width: 32, textAlign: "right" }}>{r.pct}%</span>
            </div>
          ) },
          { key: "clicks", header: "Clicks", align: "right", render: (r) => <span className="cs-tnum">{r.clicks.toLocaleString()}</span> },
        ]}
        rows={rows}
        getRowKey={(r) => r.ref}
      />
    </div>
  );
}

function AnalyticsScreen() {
  const { StatCard, SegmentedControl, Select, Icon, AnalyticsChart } = window.ClickScopeDesignSystem_0a7fd7;
  const d = window.CSData;
  const [range, setRange] = React.useState("30d");
  const dayLabels = d.trend.map((_, i) => `Mar ${i + 1}`);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Analytics</h1>
          <p style={{ color: "var(--color-fg-muted)", marginTop: 4 }}>All links · aggregated performance</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 180 }}>
            <Select options={[{ value: "all", label: "All links" }, { value: "launch", label: "short.link/launch" }]} />
          </div>
          <SegmentedControl value={range} onChange={setRange} options={["24h", "7d", "30d"]} aria-label="Range" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="Total clicks" value="12,930" delta="+18% vs last period" direction="up" />
        <StatCard label="Unique visitors" value="9,847" delta="+14% vs last period" direction="up" />
        <StatCard label="QR scans" value="2,104" delta="+31% vs last period" direction="up" />
        <StatCard label="Click-through rate" value="6.2%" delta="-0.4% vs last period" direction="down" />
      </div>

      <div className="cs-card" style={{ padding: 20 }}>
        <div className="cs-statcard__eyebrow" style={{ marginBottom: 14 }}>Clicks over time</div>
        <AnalyticsChart data={d.trend} labels={dayLabels} height={240} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <BreakdownTable title="Referrer" icon="globe" rows={d.referrers} />
        <BreakdownTable title="Country" icon="map-pin" rows={d.countries} />
      </div>
      <BreakdownTable title="Device" icon="monitor-smartphone" rows={d.devices} />
    </div>
  );
}

Object.assign(window, { AnalyticsScreen });
