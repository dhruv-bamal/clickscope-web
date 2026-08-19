import React, { useId } from "react";

/* Analytics area chart (v2 §9.14) — single-series line + low-opacity fill for
   clicks-over-time. Uses --color-accent (sky), never primary. Hover/focus a point
   for a tooltip. Empty (no data) renders nothing — callers show the empty state.
   Loading renders a pulsing plot-area block with the axis labels kept as text. */
export function AnalyticsChart({ data = [], labels, height = 240, loading = false, valueFormat }) {
  const gid = useId().replace(/[:]/g, "");
  const [hover, setHover] = React.useState(null);
  const w = 760, pad = 10, axis = 22;
  const plotH = height - pad * 2 - axis;
  const fmt = valueFormat || ((v) => v.toLocaleString());

  if (loading) {
    return (
      <div>
        <div className="cs-skeleton" style={{ height: plotH, borderRadius: "var(--radius-md)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "var(--text-xs)", color: "var(--color-fg-subtle)" }}>
          <span>start</span><span>mid</span><span>now</span>
        </div>
      </div>
    );
  }
  if (!data.length) return null;

  const max = Math.max(...data), min = Math.min(...data);
  const nx = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const ny = (v) => pad + (1 - (v - min) / (max - min || 1)) * plotH;
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${nx(i).toFixed(1)},${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L${nx(data.length - 1).toFixed(1)},${pad + plotH} L${nx(0).toFixed(1)},${pad + plotH} Z`;
  const ticks = labels || [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]].map(() => "");

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} style={{ display: "block", overflow: "visible" }}
        onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map((t) => (
          <line key={t} x1={pad} x2={w - pad} y1={pad + t * plotH} y2={pad + t * plotH} stroke="var(--color-border)" strokeWidth="1" opacity="0.7" />
        ))}
        <path d={area} fill={`url(#fill-${gid})`} />
        <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {hover != null && (
          <line x1={nx(hover)} x2={nx(hover)} y1={pad} y2={pad + plotH} stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
        )}
        {hover != null && (
          <circle cx={nx(hover)} cy={ny(data[hover])} r="4" fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth="2" />
        )}
        {data.map((v, i) => (
          <rect key={i} x={nx(i) - (w / data.length) / 2} y={0} width={w / data.length} height={height} fill="transparent"
            onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0} style={{ outline: "none" }} />
        ))}
        <text x={pad} y={height - 4} fontSize="11" fill="var(--color-fg-subtle)">{ticks[0]}</text>
        <text x={w / 2} y={height - 4} fontSize="11" textAnchor="middle" fill="var(--color-fg-subtle)">{ticks[Math.floor(ticks.length / 2)]}</text>
        <text x={w - pad} y={height - 4} fontSize="11" textAnchor="end" fill="var(--color-fg-subtle)">{ticks[ticks.length - 1]}</text>
      </svg>
      {hover != null && (
        <div style={{ position: "absolute", left: `${(nx(hover) / w) * 100}%`, top: (ny(data[hover]) / height) * 100 + "%", transform: "translate(-50%, calc(-100% - 10px))", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", padding: "6px 8px", fontSize: "var(--text-xs)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <div style={{ fontWeight: 600 }} className="cs-tnum">{fmt(data[hover])}</div>
          {labels && <div style={{ color: "var(--color-fg-muted)" }}>{labels[hover]}</div>}
        </div>
      )}
    </div>
  );
}
