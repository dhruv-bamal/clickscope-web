import React from "react";
import { Icon } from "../icon/Icon";
import { IconButton } from "../forms/IconButton";
import { Badge } from "./Badge";

/* Link card — the mobile link-list item and the hero result after creating a link.
   Row 1: short URL (mono) + copy + status badge. Row 2: destination. Row 3: meta. */
export interface LinkCardProps {
  /** Short URL, rendered mono, e.g. "short.link/launch". */
  shortUrl: string;
  /** Destination URL (truncates). */
  destination: string;
  status?: "active" | "expiring" | "expired" | "protected" | "paused";
  clicks?: number;
  /** Created-date label, e.g. "Mar 4". */
  created?: string;
  /** Bulk-select highlight. */
  selected?: boolean;
  /** Swap the copy icon to a check for ~1.5s. */
  copied?: boolean;
  onCopy?: () => void;
  onMenu?: () => void;
  /** Show a QR icon button when provided. */
  onQr?: () => void;
}

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
}: LinkCardProps) {
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
