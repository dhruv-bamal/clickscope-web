// Marketing landing surfaces. Exposes MarketingLanding.
function MktHeader({ onSignIn }) {
  const { Button, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "color-mix(in oklch, var(--color-surface) 85%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-marketing)", margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 600, fontSize: "var(--text-lg)", letterSpacing: "-0.02em" }}>
          <span style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", alignItems: "center", justifyContent: "center" }}><Icon name="link-2" size={17} /></span>
          Click<span style={{ color: "var(--color-primary)" }}>Scope</span>
        </span>
        <nav style={{ display: "flex", gap: 22, marginLeft: 8 }}>
          {["Product", "Analytics", "Pricing", "Docs"].map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--color-fg-muted)", fontSize: "var(--text-sm)", fontWeight: 500 }}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <Button variant="ghost" onClick={onSignIn}>Sign in</Button>
          <Button variant="primary" onClick={onSignIn}>Get started</Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onSignIn }) {
  const { Button, Icon, Badge } = window.ClickScopeDesignSystem_0a7fd7;
  const [shortened, setShortened] = React.useState(false);
  return (
    <section style={{ maxWidth: "var(--width-marketing)", margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
      <span className="cs-badge cs-badge--info" style={{ marginBottom: 20 }}><span className="cs-badge__dot" /> New — QR codes for every link</span>
      <h1 style={{ fontSize: "var(--text-6xl)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.02, maxWidth: 780, margin: "0 auto" }}>
        Short links, real <span style={{ color: "var(--color-primary)" }}>insight</span>.
      </h1>
      <p style={{ fontSize: "var(--text-xl)", color: "var(--color-fg-muted)", maxWidth: 560, margin: "20px auto 0", lineHeight: 1.5 }}>
        Shorten any URL, add a custom alias, protect it with a password, and watch every click in real time.
      </p>
      <div style={{ maxWidth: 560, margin: "36px auto 0", display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><input className="cs-input" placeholder="Paste a long URL…" defaultValue="https://acme.com/2026/spring-launch-campaign" style={{ height: 46, fontSize: "var(--text-base)" }} /></div>
        <Button variant="primary" size="lg" icon="link-2" onClick={() => setShortened(true)}>Shorten</Button>
      </div>
      {shortened && (
        <div style={{ maxWidth: 560, margin: "14px auto 0", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--color-surface)", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
          <span className="cs-mono" style={{ fontWeight: 600, color: "var(--color-primary)" }}>short.link/launch</span>
          <Badge status="active" />
          <span style={{ marginLeft: "auto" }}><Button variant="secondary" size="sm" icon="copy">Copy</Button></span>
        </div>
      )}
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-subtle)", marginTop: 18 }}>Free forever for your first 50 links. No card required.</p>
    </section>
  );
}

function FeatureGrid() {
  const { Icon } = window.ClickScopeDesignSystem_0a7fd7;
  const feats = [
    { icon: "sparkles", title: "Custom aliases", body: "Turn short.link/x8Fa2 into short.link/launch. Every link, on brand." },
    { icon: "bar-chart-3", title: "Real-time analytics", body: "Clicks, referrers, countries, and devices — updated as they happen." },
    { icon: "qr-code", title: "QR codes", body: "Every link ships with a downloadable QR code for print and packaging." },
    { icon: "lock", title: "Password protection", body: "Gate sensitive links behind a password without extra tooling." },
    { icon: "calendar-clock", title: "Expiration rules", body: "Set links to expire on a date so campaigns clean up after themselves." },
    { icon: "users", title: "Team workspaces", body: "Share a link library and analytics with your whole team." },
  ];
  return (
    <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-marketing)", margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 700, letterSpacing: "-0.03em" }}>Everything a link should do</h2>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--color-fg-muted)", marginTop: 12 }}>One tool for shortening, sharing, protecting, and measuring.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {feats.map((f) => (
            <div key={f.title} className="cs-card" style={{ padding: 24 }}>
              <span style={{ display: "inline-flex", width: 42, height: 42, borderRadius: "var(--radius-lg)", background: "var(--color-primary-tint)", color: "var(--color-primary-tint-fg)", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Icon name={f.icon} size={20} /></span>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.5 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFooter({ onSignIn }) {
  const { Button, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <>
      <section style={{ maxWidth: "var(--width-marketing)", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 700, letterSpacing: "-0.03em" }}>Start shortening in seconds</h2>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--color-fg-muted)", margin: "12px 0 28px" }}>Free for your first 50 links. Upgrade when your team grows.</p>
        <Button variant="primary" size="lg" onClick={onSignIn}>Get started free</Button>
      </section>
      <footer style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
        <div style={{ maxWidth: "var(--width-marketing)", margin: "0 auto", padding: "28px 24px", display: "flex", alignItems: "center", gap: 12, color: "var(--color-fg-muted)", fontSize: "var(--text-sm)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "var(--color-fg)" }}><Icon name="link-2" size={16} /> Click Scope</span>
          <span style={{ marginLeft: "auto" }}>© 2026 Click Scope. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

function MarketingLanding({ onSignIn }) {
  return (
    <div style={{ background: "var(--color-canvas)", color: "var(--color-fg)", minHeight: "100%" }}>
      <MktHeader onSignIn={onSignIn} />
      <Hero onSignIn={onSignIn} />
      <FeatureGrid />
      <CtaFooter onSignIn={onSignIn} />
    </div>
  );
}

Object.assign(window, { MarketingLanding });
