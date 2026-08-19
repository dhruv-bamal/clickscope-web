import Link from "next/link";
import { Icon } from "@/components/design-system";

/* The dashboard/link-list app shell now lives at /dashboard (12b) — this
   landing page just gets a real destination in front of it, the
   design-system showcase, and auth. If an OAuth redirect lands here with a
   #token= fragment, AuthContext (mounted app-wide via app/providers.tsx)
   captures and scrubs it before this page ever reads location.hash itself. */
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
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6 }}>Prosumer URL shortening — custom aliases, QR codes, expiration, and analytics.</p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Link href="/signup" className="cs-btn cs-btn--primary cs-btn--md">
          Create account
        </Link>
        <Link href="/login" className="cs-btn cs-btn--secondary cs-btn--md">
          Sign in
        </Link>
        <Link href="/design-system" className="cs-btn cs-btn--ghost cs-btn--md">
          Component showcase
        </Link>
      </div>
    </div>
  );
}
