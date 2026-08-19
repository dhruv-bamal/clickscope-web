"use client";
// Owns the confirm-password mismatch check the same way the reference
// ResetPassword screen does (ui_kits/auth/AuthScreens.jsx) — real local form
// state, not a consequence of anything else in the library.

import React, { useState } from "react";
import Link from "next/link";
import { Icon, Input, Button } from "@/components/design-system";

/**
 * SignupForm — the screen the bundle never shipped. The only pointer to one is
 * a dead stub in the reference SignInScreen ("Create an account", href="#",
 * preventDefault). Built by mirroring that same screen's established layout
 * convention exactly (AuthCard: centered card, icon-in-circle header, OAuth
 * button + divider, cs-card body) rather than inventing new structure.
 *
 * Fields: email + password + confirm password only — clickscope-api's `users`
 * table has no name column (migrations/20260810111606772_create-users-table.ts),
 * so there's nothing to collect beyond credentials. No "Continue with Google"
 * icon: lucide-react dropped its brand icons (Chrome/Google) a while back and
 * the design kit's readme never names a canonical replacement, so the button
 * ships without one rather than inventing a substitute glyph.
 *
 * Static only — no submit wiring. That's 12b.
 */
export function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = confirm.length > 0 && password !== confirm;

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-canvas)",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: "var(--width-form)", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span
            style={{
              display: "inline-flex",
              width: 40,
              height: 40,
              borderRadius: "var(--radius-lg)",
              background: "var(--color-primary)",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="link-2" size={22} />
          </span>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>
              Create your Click<span style={{ color: "var(--color-primary)" }}>Scope</span> account
            </h1>
            <p style={{ color: "var(--color-fg-muted)", marginTop: 6 }}>Start shortening, tracking, and protecting your links.</p>
          </div>
        </div>
        <div className="cs-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Button variant="secondary" block>
            Continue with Google
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--color-fg-subtle)", fontSize: "var(--text-xs)" }}>
            <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} /> OR{" "}
            <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          </div>
          <Input label="Email" type="email" placeholder="you@company.com" autoFocus />
          <Input label="Password" type="password" help="At least 8 characters." value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={mismatch ? "Passwords don't match" : undefined}
          />
          <Button variant="primary" block disabled={!password || !confirm || mismatch}>
            Create account
          </Button>
        </div>
        <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
