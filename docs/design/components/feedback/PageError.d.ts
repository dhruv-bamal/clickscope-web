import React from "react";

/** Page-level error (§9.15) — the 401 / 403 / 404 distinction. Shares the
 * EmptyState layout; each code has its own icon + headline + copy. None use danger
 * red (routine navigation friction, not an alarming error). Provide the recovery `action`:
 * 401 → primary "Sign in"; 403/404 → secondary "Back to dashboard".
 * @startingPoint section="Feedback" subtitle="401 / 403 / 404 page error" viewport="700x320"
 */
export interface PageErrorProps {
  code?: 401 | 403 | 404;
  /** Override the default headline. */
  title?: React.ReactNode;
  /** Override the default body copy. */
  body?: React.ReactNode;
  /** Recovery action (a Button). */
  action?: React.ReactNode;
}
export function PageError(props: PageErrorProps): JSX.Element;
