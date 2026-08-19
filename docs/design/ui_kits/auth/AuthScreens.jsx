// Auth flow screens (v2 §10.1, §10.2). Exposes AuthFlow. Reuses the centered
// auth-card template. SignInScreen lives in ../app/Overlays.jsx.
function AuthCard({ icon, iconTone, title, subtitle, children, footer }) {
  const { Icon } = window.ClickScopeDesignSystem_0a7fd7;
  const tone = iconTone || { bg: "var(--color-primary)", fg: "#fff" };
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--color-canvas)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: "var(--width-form)", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ display: "inline-flex", width: 44, height: 44, borderRadius: "var(--radius-lg)", background: tone.bg, color: tone.fg, alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={22} /></span>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>{title}</h1>
            {subtitle && <p style={{ color: "var(--color-fg-muted)", marginTop: 6, textWrap: "pretty" }}>{subtitle}</p>}
          </div>
        </div>
        <div className="cs-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
        {footer && <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>{footer}</p>}
      </div>
    </div>
  );
}

function ForgotPassword({ go }) {
  const { Input, Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <AuthCard icon="key-round" title="Reset your password" subtitle="Enter your account email and we'll send a reset link."
      footer={<>Remembered it? <a href="#" onClick={(e) => { e.preventDefault(); go("signin"); }}>Back to sign in</a></>}>
      <Input label="Email" type="email" placeholder="you@company.com" defaultValue="ada@acme.com" autoFocus />
      <Button variant="primary" block onClick={() => go("forgot-sent")}>Send reset link</Button>
    </AuthCard>
  );
}

function ForgotSent({ go }) {
  return (
    <AuthCard icon="circle-check" iconTone={{ bg: "var(--color-success-bg-subtle)", fg: "var(--color-success-fg)" }}
      title="Check your email" subtitle="If an account exists for that address, we've sent a reset link. It expires in 30 minutes."
      footer={<a href="#" onClick={(e) => { e.preventDefault(); go("signin"); }}>Back to sign in</a>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="cs-alert cs-alert--info"><div className="cs-alert__body"><div className="cs-alert__detail">Didn't get it? Check spam, or try a different email.</div></div></div>
        {(() => { const { Button } = window.ClickScopeDesignSystem_0a7fd7; return <Button variant="secondary" block onClick={() => go("reset")}>Open reset link (demo)</Button>; })()}
      </div>
    </AuthCard>
  );
}

function ResetPassword({ go }) {
  const { Input, Button } = window.ClickScopeDesignSystem_0a7fd7;
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const mismatch = confirm.length > 0 && pw !== confirm;
  return (
    <AuthCard icon="lock" title="Set a new password" subtitle="Choose a strong password you don't use elsewhere.">
      <Input label="New password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} help="At least 8 characters." autoFocus />
      <Input label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={mismatch ? "Passwords don't match" : undefined} />
      <Button variant="primary" block disabled={!pw || mismatch || !confirm} onClick={() => go("reset-done")}>Reset password</Button>
    </AuthCard>
  );
}

function ResetDone({ go }) {
  const { Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <AuthCard icon="circle-check" iconTone={{ bg: "var(--color-success-bg-subtle)", fg: "var(--color-success-fg)" }}
      title="Password updated" subtitle="You can now sign in with your new password.">
      <Button variant="primary" block onClick={() => go("signin")}>Sign in</Button>
    </AuthCard>
  );
}

function AccountLinkConflict({ go }) {
  const { Button } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <AuthCard icon="info" iconTone={{ bg: "var(--color-info-bg-subtle)", fg: "var(--color-info-fg)" }}
      title="An account already exists for this email"
      subtitle="ada@acme.com is already registered with a password. Sign in with your password to link Google, or use a different Google account.">
      <Button variant="primary" block onClick={() => go("signin")}>Sign in with password</Button>
      <Button variant="ghost" block onClick={() => go("signin")}>Use a different Google account</Button>
    </AuthCard>
  );
}

function AuthFlow() {
  const { SegmentedControl } = window.ClickScopeDesignSystem_0a7fd7;
  const [page, setPage] = React.useState("signin");
  const go = (p) => setPage(p);
  let screen;
  if (page === "signin") screen = <SignInScreen onSignIn={() => go("forgot")} />;
  else if (page === "forgot") screen = <ForgotPassword go={go} />;
  else if (page === "forgot-sent") screen = <ForgotSent go={go} />;
  else if (page === "reset") screen = <ResetPassword go={go} />;
  else if (page === "reset-done") screen = <ResetDone go={go} />;
  else screen = <AccountLinkConflict go={go} />;
  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      {screen}
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 40 }}>
        <SegmentedControl value={page} onChange={go} options={[
          { value: "signin", label: "Sign in" },
          { value: "forgot", label: "Forgot" },
          { value: "forgot-sent", label: "Sent" },
          { value: "reset", label: "Reset" },
          { value: "reset-done", label: "Done" },
          { value: "conflict", label: "Link conflict" },
        ]} aria-label="Auth screen" />
      </div>
    </div>
  );
}

Object.assign(window, { AuthFlow });
