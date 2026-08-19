// Settings screen. Exposes SettingsScreen.
function SettingsRow({ title, desc, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "16px 0", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 460 }}>
        <div style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>{title}</div>
        {desc && <div style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", marginTop: 3 }}>{desc}</div>}
      </div>
      <div style={{ flex: "none" }}>{children}</div>
    </div>
  );
}

function SettingsCard({ title, children }) {
  return (
    <div className="cs-card" style={{ padding: "6px 22px 16px" }}>
      <h2 style={{ fontSize: "var(--text-base)", fontWeight: 600, padding: "16px 0 4px" }}>{title}</h2>
      {children}
    </div>
  );
}

 // Connected accounts (v2 §10.3)
function ConnectedAccounts() {
  const { Button, Icon, Modal } = window.ClickScopeDesignSystem_0a7fd7;
  const [confirm, setConfirm] = React.useState(false);
  const [hasPassword] = React.useState(true); // guard: false ⇒ can't disconnect only provider
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "16px 0", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", alignItems: "center", justifyContent: "center", color: "var(--color-fg-muted)" }}><Icon name="chrome" size={18} /></span>
          <div>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>Google</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)" }}>ada@acme.com</div>
          </div>
        </div>
        {hasPassword ? (
          <Button variant="secondary" size="sm" onClick={() => setConfirm(true)}>Disconnect</Button>
        ) : (
          <Button variant="secondary" size="sm" disabled>Disconnect</Button>
        )}
      </div>
      {!hasPassword && (
        <div style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", paddingBottom: 12 }}>
          Set a password before disconnecting your only sign-in method. <a href="#" onClick={(e) => e.preventDefault()}>Set password</a>
        </div>
      )}
      {confirm && (
        <Modal title="Disconnect Google?" onClose={() => setConfirm(false)}
          footer={<>
            <Button variant="secondary" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setConfirm(false)}>Disconnect</Button>
          </>}>
          You'll no longer be able to sign in with Google. You can still sign in with your email and password.
        </Modal>
      )}
    </>
  );
}

function SettingsScreen({ dark, onToggleTheme }) {
  const { Input, Toggle, Button, SegmentedControl, Badge, Icon } = window.ClickScopeDesignSystem_0a7fd7;
  const [pwProtect, setPwProtect] = React.useState(true);
  const [notif, setNotif] = React.useState(false);
  const themeVal = dark ? "dark" : "light";
  return (
    <div style={{ maxWidth: "var(--width-detail)", margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>Settings</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: 4 }}>Workspace, defaults, and account.</p>
      </div>

      <SettingsCard title="Profile">
        <SettingsRow title="Name"><div style={{ width: 240 }}><Input defaultValue="Ada Chen" /></div></SettingsRow>
        <SettingsRow title="Email"><div style={{ width: 240 }}><Input defaultValue="ada@acme.com" type="email" /></div></SettingsRow>
        <SettingsRow title="Workspace" desc="Shown on public link pages."><div style={{ width: 240 }}><Input defaultValue="Acme Inc." /></div></SettingsRow>
      </SettingsCard>

      <SettingsCard title="Link defaults">
        <SettingsRow title="Default domain" desc="Applied to new links unless overridden.">
          <span className="cs-mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-sm)" }}>short.link <Badge variant="info" dot={false}>Verified</Badge></span>
        </SettingsRow>
        <SettingsRow title="Require password on new links" desc="New links start with password protection enabled.">
          <Toggle on={pwProtect} onChange={setPwProtect} />
        </SettingsRow>
        <SettingsRow title="Default expiration">
          <div style={{ width: 200 }}>
            {(() => { const { Select } = window.ClickScopeDesignSystem_0a7fd7; return <Select options={[{ value: "never", label: "Never" }, { value: "30d", label: "30 days" }, { value: "90d", label: "90 days" }]} />; })()}
          </div>
        </SettingsRow>
      </SettingsCard>

      <SettingsCard title="Appearance">
        <SettingsRow title="Theme" desc="Match the system or pick a mode.">
          <SegmentedControl value={themeVal} onChange={(v) => { if ((v === "dark") !== dark) onToggleTheme(); }} options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} aria-label="Theme" />
        </SettingsRow>
        <SettingsRow title="Weekly summary email" desc="A Monday digest of clicks and top links.">
          <Toggle on={notif} onChange={setNotif} />
        </SettingsRow>
      </SettingsCard>

      <SettingsCard title="Connected accounts">
        <ConnectedAccounts />
      </SettingsCard>

      <SettingsCard title="Danger zone">
        <SettingsRow title="Delete account" desc="Permanently remove your workspace and all links. This can't be undone.">
          <Button variant="destructive" icon="trash-2">Delete account</Button>
        </SettingsRow>
      </SettingsCard>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen });
