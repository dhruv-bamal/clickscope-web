// Create-link modal + sign-in screen. Exposes CreateLinkModal, SignInScreen.
function CreateLinkModal({ open, onClose, onCreate }) {
  const { Modal, Input, Button, Toggle, Select, Checkbox } = window.ClickScopeDesignSystem_0a7fd7;
  const [dest, setDest] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [pw, setPw] = React.useState(false);
  React.useEffect(() => { if (open) { setDest(""); setAlias(""); setPw(false); } }, [open]);
  if (!open) return null;
  const create = () => onCreate({ dest: dest || "https://acme.com/new-page", alias: alias || "new" + Math.floor(Math.random() * 900 + 100) });
  return (
    <Modal
      title="Create link"
      onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" icon="link-2" onClick={create}>Create link</Button>
      </>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="Destination URL" placeholder="https://example.com/very/long/path" value={dest} onChange={(e) => setDest(e.target.value)} autoFocus />
        <Input label="Custom alias" mono prefix="short.link/" placeholder="my-link" value={alias} onChange={(e) => setAlias(e.target.value)} help="Leave blank to auto-generate a short code." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Select label="Expiration" options={[{ value: "never", label: "Never" }, { value: "7d", label: "In 7 days" }, { value: "30d", label: "In 30 days" }]} />
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 8 }}>
            <Toggle on={pw} onChange={setPw} label="Password protect" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function SignInScreen({ onSignIn }) {
  const { Input, Button, Icon, Checkbox } = window.ClickScopeDesignSystem_0a7fd7;
  const [remember, setRemember] = React.useState(true);
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--color-canvas)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: "var(--width-form)", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: "var(--radius-lg)", background: "var(--color-primary)", color: "#fff", alignItems: "center", justifyContent: "center" }}><Icon name="link-2" size={22} /></span>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Sign in to Click<span style={{ color: "var(--color-primary)" }}>Scope</span></h1>
            <p style={{ color: "var(--color-fg-muted)", marginTop: 6 }}>Welcome back. Manage your links and analytics.</p>
          </div>
        </div>
        <div className="cs-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Button variant="secondary" block icon="chrome" onClick={onSignIn}>Continue with Google</Button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--color-fg-subtle)", fontSize: "var(--text-xs)" }}>
            <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} /> OR <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          </div>
          <Input label="Email" type="email" placeholder="you@company.com" defaultValue="ada@acme.com" />
          <Input label="Password" type="password" defaultValue="••••••••" />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} label="Remember me" />
            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: "var(--text-sm)" }}>Forgot password?</a>
          </div>
          <Button variant="primary" block onClick={onSignIn}>Sign in</Button>
        </div>
        <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>New to Click Scope? <a href="#" onClick={(e) => e.preventDefault()}>Create an account</a></p>
      </div>
    </div>
  );
}

Object.assign(window, { CreateLinkModal, SignInScreen });
