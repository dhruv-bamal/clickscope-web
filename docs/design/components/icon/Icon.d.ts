/**
 * Click Scope icon wrapper for the Lucide set (2px stroke, outline, currentColor).
 * @startingPoint section="Foundations" subtitle="Lucide icon glyph" viewport="700x150"
 */
export interface IconProps {
  /** Lucide icon name, e.g. "link-2", "qr-code", "lock", "copy". */
  name: string;
  /** Pixel size. 16 inline (default), 20 standalone icon buttons, 24 empty-state art. */
  size?: number;
  /** Stroke width; Lucide default is 2. */
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
