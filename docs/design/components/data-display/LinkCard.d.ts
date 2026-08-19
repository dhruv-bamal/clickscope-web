import React from "react";

/** Link card — the mobile link-list item and the hero result after creating a
 * link. Short URL (mono) + copy + status, destination, and a meta row.
 * @startingPoint section="Data display" subtitle="Link list item / create-link result" viewport="700x180"
 */
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
export function LinkCard(props: LinkCardProps): JSX.Element;
