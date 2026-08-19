import React from "react";
import QRCode from "qrcode";
import { Icon } from "../icon/Icon";
import { Button } from "../forms/Button";
import { Skeleton } from "./Skeleton";

/* Real QR glyph — replaces the source bundle's deterministic pseudo-random grid
   (explicitly commented "NOT scannable" — see docs/design/components/feedback/
   QrCodePopover.jsx). `qrcode`'s toString(text, { type: "svg" }) is pure,
   synchronous-cost computation with no client JS and no hooks, so this stays an
   async Server Component: the SVG is generated once on the server and streamed
   down as markup, never regenerated in the browser. Chosen over qrcode.react
   specifically because that package renders via a canvas/svg React component
   that needs to run on the client — this one doesn't need to. */
async function QrGlyph({ shortUrl, size = 168 }: { shortUrl: string; size?: number }) {
  const svg = await QRCode.toString(shortUrl, {
    type: "svg",
    margin: 0,
    color: { dark: "#0b1220", light: "#0000" },
  });
  // Safe despite dangerouslySetInnerHTML: `svg` is qrcode's own <path>-only
  // renderer output. shortUrl is QR-encoded into the module grid, never
  // interpolated into markup/attributes — there's no injection surface here.
  return <div style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: svg }} />;
}

/** QR code popover/modal body (§9.13). The QR frame is always plain white
 * (scanner quiet-zone) regardless of theme. States: default (QR + Download/Copy),
 * loading (skeleton in the frame, never a spinner), error (alert + Retry, stays open).
 */
export interface QrCodePopoverProps {
  /** Short URL shown beneath the code, in mono, and encoded into the QR payload. */
  shortUrl?: string;
  state?: "default" | "loading" | "error";
  onDownload?: () => void;
  onCopy?: () => void;
  onRetry?: () => void;
}

export async function QrCodePopover({ shortUrl, state = "default", onDownload, onCopy, onRetry }: QrCodePopoverProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)", width: 232 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-3)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: "1 / 1",
        }}
      >
        {state === "loading" && <Skeleton width={168} height={168} radius={8} />}
        {state === "error" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-2)",
              color: "var(--color-danger)",
              textAlign: "center",
            }}
          >
            <Icon name="circle-alert" size={28} />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-danger-fg)" }}>Couldn&apos;t generate QR code</span>
          </div>
        )}
        {state === "default" && shortUrl && <QrGlyph shortUrl={shortUrl} />}
      </div>
      {shortUrl && (
        <span className="cs-mono" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)" }}>
          {shortUrl}
        </span>
      )}
      {state === "error" ? (
        <Button variant="ghost" size="sm" icon="rotate-cw" onClick={onRetry}>
          Retry
        </Button>
      ) : (
        <div style={{ display: "flex", gap: "var(--space-2)", width: "100%" }}>
          <Button variant="secondary" size="sm" icon="download" block onClick={onDownload} disabled={state === "loading"}>
            Download PNG
          </Button>
          <Button variant="ghost" size="sm" icon="copy" onClick={onCopy} disabled={state === "loading"} />
        </div>
      )}
    </div>
  );
}
