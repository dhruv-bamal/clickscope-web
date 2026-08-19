import React from "react";
import { EmptyState } from "./EmptyState.jsx";

/* Page-level error (v2 §9.15) — 401 / 403 / 404 share the empty-state layout with
   distinct icon + copy. None use danger red: an auth/existence mismatch is routine
   navigation friction, not an alarming error. `action` is supplied by the caller. */
const CASES = {
  401: { icon: "lock", title: "Sign in to continue", body: "You need to be signed in to view this page." },
  403: { icon: "shield-alert", title: "You don't have access to this", body: "Your account doesn't have permission to view this page." },
  404: { icon: "search-x", title: "We couldn't find that", body: "The page you're looking for doesn't exist or has moved." },
};

export function PageError({ code = 404, title, body, action }) {
  const c = CASES[code] || CASES[404];
  return (
    <EmptyState
      icon={c.icon}
      title={title || c.title}
      description={body || c.body}
      action={action}
    />
  );
}
