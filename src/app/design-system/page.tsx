// A Server Component on purpose, not just by default: QrCodePopover is an
// async Server Component (it awaits qrcode's SVG renderer), and React
// disallows async Client Components outright — rendering it from inside a
// "use client" ancestor fails at runtime with "Only Server Components can be
// async." Everything that needs local demo state lives in the client child
// <ShowcaseInteractive />; this file renders that plus the Icon grid and the
// QR section directly, so the one genuinely async component in the library
// stays in a context where being async is actually legal.

import { Icon, QrCodePopover } from "@/components/design-system";
import { Section } from "./Section";
import { ShowcaseInteractive } from "./ShowcaseInteractive";

const ICON_NAMES = ["link-2", "qr-code", "lock", "clock", "bar-chart-3", "copy", "trash-2", "filter", "search"];

export default function DesignSystemShowcasePage() {
  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "var(--space-8) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Design system showcase</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6 }}>
          One instance of every component with mock data — Phase 12a, before any API exists.
        </p>
      </div>

      <Section title="Icon" subtitle="lucide-react, resolved through the static name map in Icon.tsx">
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          {ICON_NAMES.map((name) => (
            <span key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--color-fg-muted)" }}>
              <Icon name={name} size={20} />
              {name}
            </span>
          ))}
        </div>
      </Section>

      <ShowcaseInteractive />

      <Section title="Feedback — QR code" subtitle="Rendered server-side: QrCodePopover awaits qrcode's real SVG renderer and can't run as a Client Component.">
        <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-3)", width: 232 }}>
          <QrCodePopover shortUrl="short.link/launch" />
        </div>
      </Section>
    </div>
  );
}
