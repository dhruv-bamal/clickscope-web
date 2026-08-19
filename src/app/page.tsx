import Link from "next/link";
import { Icon } from "@/components/design-system";

/* No dashboard/link-list app shell yet — that's 12b, once there's an API to
   fetch from. This landing page just gets a real destination in front of the
   design-system showcase and the new signup screen. */
export default function Home() {
  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-6)",
        padding: 24,
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          width: 44,
          height: 44,
          borderRadius: "var(--radius-lg)",
          background: "var(--color-primary)",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="link-2" size={22} />
      </span>
      <div>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>
          Click<span style={{ color: "var(--color-primary)" }}>Scope</span>
        </h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6 }}>Phase 12a — design system integration, no API wiring yet.</p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Link href="/design-system" className="cs-btn cs-btn--primary cs-btn--md">
          Component showcase
        </Link>
        <Link href="/signup" className="cs-btn cs-btn--secondary cs-btn--md">
          Create account
        </Link>
      </div>
    </div>
  );
}
