import React from "react";
import { EmptyState } from "./EmptyState";

/** Page-level error (§9.15) — the 401 / 403 / 404 distinction. Shares the
 * EmptyState layout; each code has its own icon + headline + copy. None use danger
 * red (routine navigation friction, not an alarming error). Provide the recovery `action`:
 * 401 → primary "Sign in"; 403/404 → secondary "Back to dashboard".
 */
const CASES = {
  401: { icon: "lock", title: "Sign in to continue", body: "You need to be signed in to view this page." },
  403: { icon: "shield-alert", title: "You don't have access to this", body: "Your account doesn't have permission to view this page." },
  404: { icon: "search-x", title: "We couldn't find that", body: "The page you're looking for doesn't exist or has moved." },
} as const;

export interface PageErrorProps {
  code?: 401 | 403 | 404;
  /** Override the default headline. */
  title?: React.ReactNode;
  /** Override the default body copy. */
  body?: React.ReactNode;
  /** Recovery action (a Button). */
  action?: React.ReactNode;
}

export function PageError({ code = 404, title, body, action }: PageErrorProps) {
  const c = CASES[code] || CASES[404];
  return <EmptyState icon={c.icon} title={title || c.title} description={body || c.body} action={action} />;
}
