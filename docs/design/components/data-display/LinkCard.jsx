import React from "react";
import { Icon } from "../icon/Icon.jsx";
import { IconButton } from "../forms/IconButton.jsx";
import { Badge } from "./Badge.jsx";

/* Link card — the mobile link-list item and the hero result after creating a link.
   Row 1: short URL (mono) + copy + status badge. Row 2: destination. Row 3: meta. */
export function LinkCard({
  shortUrl,
  destination,
  status = "active",
  clicks = 0,
  created,
  selected = false,
  copied = false,
  onCopy,
  onMenu,
  onQr,
}) {
  return (
    <div className="cs-card cs-linkcard" data-selected={String(selected)}>
      <div className="cs-linkcard__row">
        <span className="cs-linkcard__short">{shortUrl}</span>
        <IconButton
          icon={copied ? "check" : "copy"}
          label={copied ? "Copied" : "Copy link"}
          onClick={onCopy}
          style={copied ? { color: "var(--color-success)" } : undefined}
        />
        <span style={{ marginLeft: "auto" }}>
          <Badge status={status} />
        </span>
      </div>
      <div className="cs-linkcard__dest">
        <Icon name="external-link" size={12} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{destination}</span>
      </div>
      <div className="cs-linkcard__meta">
        <span className="cs-tnum" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Icon name="bar-chart-3" size={13} /> {clicks.toLocaleString()} clicks
        </span>
        {created && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={13} /> {created}
          </span>
        )}
        <span style={{ marginLeft: "auto", display: "inline-flex", gap: 2 }}>
          {onQr && <IconButton icon="qr-code" label="Show QR code" onClick={onQr} />}
          <IconButton icon="ellipsis-vertical" label="Link actions" onClick={onMenu} />
        </span>
      </div>
    </div>
  );
}
