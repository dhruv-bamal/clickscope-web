import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Download,
  EllipsisVertical,
  ExternalLink,
  Filter,
  Inbox,
  Info,
  Link2,
  Lock,
  Minus,
  Plus,
  QrCode,
  RotateCw,
  Search,
  SearchX,
  ShieldAlert,
  SlidersHorizontal,
  SquarePen,
  Tag,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  X,
  type LucideProps,
} from "lucide-react";

/**
 * Click Scope icon wrapper for the Lucide set (2px stroke, outline, currentColor).
 * Ported from a `window.lucide` CDN wrapper (useEffect + useRef, imperative DOM
 * injection) to a static name -> component lookup over `lucide-react`. This map
 * covers every icon name literally referenced by the 24 design-system components
 * plus the small set introduced by this phase's new patterns (Pagination's
 * arrow-right, EditLinkModal's square-pen trigger). It intentionally does not
 * cover the full ~1500-icon Lucide set — add an entry here when a new name is
 * needed rather than falling back to a dynamic/lazy import, which would
 * reintroduce a client-only boundary this rewrite exists to remove.
 */
const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "bar-chart-3": BarChart3,
  check: Check,
  "chevron-down": ChevronDown,
  "circle-alert": CircleAlert,
  "circle-check": CircleCheck,
  clock: Clock,
  copy: Copy,
  download: Download,
  "ellipsis-vertical": EllipsisVertical,
  "external-link": ExternalLink,
  filter: Filter,
  inbox: Inbox,
  info: Info,
  "link-2": Link2,
  lock: Lock,
  minus: Minus,
  plus: Plus,
  "qr-code": QrCode,
  "rotate-cw": RotateCw,
  search: Search,
  "search-x": SearchX,
  "shield-alert": ShieldAlert,
  "sliders-horizontal": SlidersHorizontal,
  "square-pen": SquarePen,
  tag: Tag,
  "trash-2": Trash2,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  "triangle-alert": TriangleAlert,
  x: X,
};

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

export function Icon({ name, size = 16, strokeWidth = 2, className, style }: IconProps) {
  const Glyph = ICONS[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] "${name}" isn't in the design system's icon map — add it in Icon.tsx.`);
    }
    return null;
  }
  return (
    <Glyph
      aria-hidden="true"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: "inline-flex", flex: "none", ...style }}
    />
  );
}
