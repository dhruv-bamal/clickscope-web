// Minimal inline SVG charts for the analytics screens. Exposes LineChart, BarMini.
function LineChart({ data, height = 220, accent = "var(--color-accent)" }) {
  const w = 720, h = height, pad = 8;
  const max = Math.max(...data), min = Math.min(...data);
  const nx = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const ny = (v) => pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2 - 18);
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${nx(i).toFixed(1)},${ny(v).toFixed(1)}`).join(" ");
  const area = `${line} L${nx(data.length - 1).toFixed(1)},${h - pad - 18} L${nx(0).toFixed(1)},${h - pad - 18} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="csfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((t) => (
        <line key={t} x1={pad} x2={w - pad} y1={pad + t * (h - pad * 2 - 18)} y2={pad + t * (h - pad * 2 - 18)} stroke="var(--color-border)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#csfill)" />
      <path d={line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function BarMini({ data, accent = "var(--color-accent)" }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: accent, opacity: 0.25 + 0.75 * (v / max), borderRadius: 2 }} />
      ))}
    </div>
  );
}

Object.assign(window, { LineChart, BarMini });
