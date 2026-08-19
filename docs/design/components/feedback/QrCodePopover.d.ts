import React from "react";

/** QR code popover/modal body (§9.13). The QR frame is always plain white
 * (scanner quiet-zone) regardless of theme. States: default (QR + Download/Copy),
 * loading (skeleton in the frame, never a spinner), error (alert + Retry, stays open).
 * The rendered QR glyph is stand-in art, not a scannable code.
 */
export interface QrCodePopoverProps {
  /** Short URL shown beneath the code, in mono. */
  shortUrl?: string;
  state?: "default" | "loading" | "error";
  onDownload?: () => void;
  onCopy?: () => void;
  onRetry?: () => void;
}
export function QrCodePopover(props: QrCodePopoverProps): JSX.Element;
