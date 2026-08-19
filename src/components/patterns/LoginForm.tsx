"use client";
// Mirrors SignupForm.tsx's AuthCard layout exactly (icon-in-circle header,
// OAuth button + divider, cs-card body) — no new layout invented, matching
// the same convention SignupForm itself was built from. New in 12b: the
// source bundle never shipped a login screen at all, only the signup one.

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon, Input, Button } from "@/components/design-system";
import { useAuth } from "@/context/AuthContext";
import { googleAuthUrl, ApiError } from "@/lib/api";

export function LoginForm() {
  const { token, isLoading, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in (e.g. session restored from localStorage) — this is a
  // UX redirect, not a security boundary; see Notes.md.
  useEffect(() => {
    if (!isLoading && token) router.replace("/dashboard");
  }, [isLoading, token, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
              Sign in to Click<span style={{ color: "var(--color-primary)" }}>Scope</span>
            </h1>
          </div>
        </div>
        <form onSubmit={submit} className="cs-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Button type="button" variant="secondary" block onClick={() => (window.location.href = googleAuthUrl())}>
            Continue with Google
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--color-fg-subtle)", fontSize: "var(--text-xs)" }}>
            <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} /> OR{" "}
            <span style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && (
            <span className="cs-help cs-help--error">
              <Icon name="circle-alert" size={13} /> {error}
            </span>
          )}
          <Button type="submit" variant="primary" block loading={submitting} disabled={!email || !password}>
            Sign in
          </Button>
        </form>
        <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>
          Don&apos;t have an account? <Link href="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
