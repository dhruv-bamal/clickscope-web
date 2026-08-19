// App chrome: sidebar + topbar. Exposes AppShell to window.
function NavItem({ icon, label, active, collapsed, onClick }) {
  const { Icon } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%",
        padding: collapsed ? "10px" : "8px 12px", justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: "var(--radius-md)", border: 0, cursor: "pointer",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: active ? 600 : 500,
        background: active ? "var(--color-primary-tint)" : "transparent",
        color: active ? "var(--color-primary-tint-fg)" : "var(--color-fg-muted)",
        transition: "background-color 150ms var(--ease-out), color 150ms var(--ease-out)",
      }}
    >
      <Icon name={icon} size={18} />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

function Sidebar({ route, setRoute, collapsed }) {
  const { Icon } = window.ClickScopeDesignSystem_0a7fd7;
  const items = [
    { id: "dashboard", icon: "layout-dashboard", label: "Dashboard" },
    { id: "links", icon: "link-2", label: "Links" },
    { id: "analytics", icon: "bar-chart-3", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <aside style={{
      width: collapsed ? "var(--size-sidebar-collapsed)" : "var(--size-sidebar)", flex: "none",
      borderRight: "1px solid var(--color-border)", background: "var(--color-surface)",
      display: "flex", flexDirection: "column", padding: "16px 12px", gap: 4,
      transition: "width 200ms var(--ease-out)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "4px 0" : "4px 8px", marginBottom: 12, justifyContent: collapsed ? "center" : "flex-start" }}>
        <span style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <Icon name="link-2" size={17} />
        </span>
        {!collapsed && <span style={{ fontWeight: 600, fontSize: "var(--text-base)", letterSpacing: "-0.02em" }}>Click<span style={{ color: "var(--color-primary)" }}>Scope</span></span>}
      </div>
      {items.map((it) => (
        <NavItem key={it.id} {...it} active={route === it.id} collapsed={collapsed} onClick={() => setRoute(it.id)} />
      ))}
      <div style={{ marginTop: "auto" }}>
        <NavItem icon="life-buoy" label="Help & docs" collapsed={collapsed} onClick={() => {}} />
      </div>
    </aside>
  );
}

function Topbar({ onNew, onToggleSidebar, onToggleTheme, dark, onAvatar, menuOpen, onSignOut }) {
  const { Icon, Button, IconButton, DropdownMenu } = window.ClickScopeDesignSystem_0a7fd7;
  return (
    <header style={{
      height: 60, flex: "none", borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)",
      display: "flex", alignItems: "center", gap: 12, padding: "0 20px", position: "sticky", top: 0, zIndex: 20,
    }}>
      <IconButton icon="panel-left" label="Toggle sidebar" onClick={onToggleSidebar} />
      <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-fg-subtle)", pointerEvents: "none" }}><Icon name="search" size={16} /></span>
        <input className="cs-input" placeholder="Search links…" style={{ paddingLeft: 34 }} />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <IconButton icon={dark ? "sun" : "moon"} label="Toggle theme" onClick={onToggleTheme} />
        <Button variant="primary" icon="plus" onClick={onNew}>Create link</Button>
        <div style={{ position: "relative" }}>
          <button onClick={onAvatar} aria-label="Account" style={{ width: 34, height: 34, borderRadius: "var(--radius-full)", background: "var(--color-indigo-100)", color: "var(--color-indigo-700)", border: 0, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>AC</button>
          {menuOpen && (
            <div style={{ position: "absolute", right: 0, top: 42, zIndex: 30 }}>
              <DropdownMenu items={[
                { icon: "user", label: "Ada Chen" },
                { icon: "settings", label: "Account settings" },
                { divider: true },
                { icon: "log-out", label: "Sign out", onClick: onSignOut },
              ]} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function AppShell({ route, setRoute, children, onNew, dark, onToggleTheme, onSignOut }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", height: "100%", background: "var(--color-canvas)", color: "var(--color-fg)" }} onClick={() => menuOpen && setMenuOpen(false)}>
      <Sidebar route={route} setRoute={setRoute} collapsed={collapsed} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Topbar
          onNew={onNew}
          dark={dark}
          onToggleTheme={onToggleTheme}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          onAvatar={(e) => { e.stopPropagation(); setMenuOpen((m) => !m); }}
          menuOpen={menuOpen}
          onSignOut={onSignOut}
        />
        <main style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ maxWidth: "var(--width-app)", margin: "0 auto", padding: "28px 32px" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { AppShell });
