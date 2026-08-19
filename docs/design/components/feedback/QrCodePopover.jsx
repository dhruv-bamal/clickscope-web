import React from "react";
import { Icon } from "../icon/Icon.jsx";
import { Button } from "../forms/Button.jsx";
import { Skeleton } from "../feedback/Skeleton.jsx";

/* Deterministic visual QR glyph (NOT scannable) — stand-in art for the kit. */
function QrGlyph({ size = 168 }) {
  const n = 21;
  const cells = [];
  const finder = (br, bc) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      const edge = r === 0 || r === 6 || c === 0 || c === 6;
      const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      if (edge || core) cells.push([br + r, bc + c]);
    }
  };
  finder(0, 0); finder(0, n - 7); finder(n - 7, 0);
  let seed = 7;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const inFinder = (r < 8 && c < 8) || (r < 8 && c > n - 9) || (r > n - 9 && c < 8);
    if (inFinder) continue;
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    if ((seed >> 16) % 100 < 46) cells.push([r, c]);
  }
  const u = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" style={{ display: "block" }}>
      {cells.map(([r, c], i) => <rect key={i} x={c} y={r} width={1} height={1} fill="#0b1220" />)}
    </svg>
  );
}

/* QR code popover/modal body (v2 §9.13). State: default | loading | error.
   The QR frame is always plain white (scanner quiet-zone), regardless of theme. */
export function QrCodePopover({ shortUrl, state = "default", onDownload, onCopy, onRetry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", width: 232 }}>
      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "var(--space-3)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1 / 1" }}>
        {state === "loading" && <Skeleton width={168} height={168} radius={8} />}
        {state === "error" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", color: "var(--color-danger)", textAlign: "center" }}>
            <Icon name="circle-alert" size={28} />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-danger-fg)" }}>Couldn't generate QR code</span>
          </div>
        )}
        {state === "default" && <QrGlyph />}
      </div>
      {shortUrl && <span className="cs-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)" }}>{shortUrl}</span>}
      {state === "error" ? (
        <Button variant="ghost" size="sm" icon="rotate-cw" onClick={onRetry}>Retry</Button>
      ) : (
        <div style={{ display: "flex", gap: "var(--space-2)", width: "100%" }}>
          <Button variant="secondary" size="sm" icon="download" block onClick={onDownload} disabled={state === "loading"}>Download PNG</Button>
          <Button variant="ghost" size="sm" icon="copy" onClick={onCopy} disabled={state === "loading"} />
        </div>
      )}
    </div>
  );
}
