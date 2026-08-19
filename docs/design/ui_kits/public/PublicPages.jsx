// Public recipient pages. Exposes PublicPages (a switcher) + individual screens.
function PublicShell({ children }) {
  const { Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--color-canvas)", color: "var(--color-fg)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: "var(--width-form)", display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {children}
      </div>
      <div style={{ position: "absolute", bottom: 20, display: "flex", alignItems: "center", gap: 6, color: "var(--color-fg-subtle)", fontSize: "var(--text-xs)" }}>
        <Icon name="link-2" size={12} /> Powered by Click Scope
      </div>
    </div>
  );
}

function PasswordGate({ go }) {
  const { Input, Button, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  const [val, setVal] = React.useState("");
  const [err, setErr] = React.useState(false);
  const submit = () => { if (val === "letmein") go("redirect"); else setErr(true); };
  return (
    <PublicShell>
      <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-surface-subtle)", color: "var(--color-fg-muted)", alignItems: "center", justifyContent: "center" }}><Icon name="lock" size={22} /></span>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>This link is password protected</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6, fontSize: "var(--text-sm)" }}>Enter the password to continue to your destination.</p>
      </div>
      <div className="cs-card" style={{ padding: 20, width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
        <Input label="Password" type="password" value={val} onChange={(e) => { setVal(e.target.value); setErr(false); }} error={err ? "Incorrect password" : undefined} placeholder="Enter password" autoFocus />
        <Button variant="primary" block icon="arrow-right" onClick={submit}>Unlock</Button>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-subtle)", textAlign: "center" }}>Hint for this demo: <span className="cs-mono">letmein</span></p>
      </div>
    </PublicShell>
  );
}

function RedirectPage({ go }) {
  const { Spinner, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <PublicShell>
      <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-primary-tint)", color: "var(--color-primary)", alignItems: "center", justifyContent: "center" }}><Icon name="link-2" size={22} /></span>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>Taking you there…</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Spinner size={14} /> Redirecting to <span className="cs-mono">acme.com</span>
        </p>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ fontSize: "var(--text-sm)" }}>Continue now</a>
    </PublicShell>
  );
}

function ExpiredPage({ go }) {
  const { Icon, Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <PublicShell>
      <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-danger-tint)", color: "var(--color-danger)", alignItems: "center", justifyContent: "center" }}><Icon name="calendar-x" size={22} /></span>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>This link has expired</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6, fontSize: "var(--text-sm)" }}>The owner set this link to expire and it's no longer active. If you think this is a mistake, contact whoever shared it with you.</p>
      </div>
      <Button variant="secondary" icon="link-2" onClick={() => go("landing")}>Create your own short link</Button>
    </PublicShell>
  );
}

function NotFoundPage({ go }) {
  const { Icon, Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <PublicShell>
      <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-fg-subtle)", fontFamily: "var(--font-mono)" }}>404</span>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>Link not found</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6, fontSize: "var(--text-sm)" }}>We couldn't find <span className="cs-mono">short.link/unknown</span>. It may have been deleted or never existed.</p>
      </div>
      <Button variant="secondary" icon="arrow-left" onClick={() => go("landing")}>Go to Click Scope</Button>
    </PublicShell>
  );
}

function ForbiddenPage({ go }) {
  const { Icon, Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <PublicShell>
      <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-surface-subtle)", color: "var(--color-fg-muted)", alignItems: "center", justifyContent: "center" }}><Icon name="shield-alert" size={22} /></span>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>This link is no longer available</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 6, fontSize: "var(--text-sm)" }}>The owner has removed this link. If you think this is a mistake, contact whoever shared it with you.</p>
      </div>
      <Button variant="secondary" icon="arrow-left" onClick={() => go("landing")}>Go to Click Scope</Button>
    </PublicShell>
  );
}

function PublicPages() {
  const { SegmentedControl } = window.ClickScopeDesignSystem_0a7fd7;
  const [page, setPage] = React.useState("password");
  const go = (p) => setPage(p === "landing" ? "notfound" : p);
  let screen;
  if (page === "password") screen = <PasswordGate go={go} />;
  else if (page === "redirect") screen = <RedirectPage go={go} />;
  else if (page === "expired") screen = <ExpiredPage go={go} />;
  else if (page === "forbidden") screen = <ForbiddenPage go={go} />;
  else screen = <NotFoundPage go={go} />;
  return (
    <div style={{ position: "relative", height: "100%" }}>
      {screen}
      <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 40 }}>
        <SegmentedControl value={page} onChange={setPage} options={[
          { value: "password", label: "Password" },
          { value: "redirect", label: "Redirect" },
          { value: "expired", label: "Expired" },
          { value: "forbidden", label: "403" },
          { value: "notfound", label: "404" },
        ]} aria-label="Preview page" />
      </div>
    </div>
  );
}

Object.assign(window, { PublicPages });
