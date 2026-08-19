import React from "react";

/* Shared by both page.tsx (Server) and ShowcaseInteractive.tsx (Client) — a
   plain presentational wrapper with no hooks needs no "use client" of its
   own; it just becomes part of whichever bundle imports it. */
export function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 600, letterSpacing: "-0.025em" }}>{title}</h2>
        {subtitle && <p style={{ color: "var(--color-fg-muted)", marginTop: 4, fontSize: "var(--text-sm)" }}>{subtitle}</p>}
      </div>
      <div className="cs-card" style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {children}
      </div>
    </section>
  );
}
