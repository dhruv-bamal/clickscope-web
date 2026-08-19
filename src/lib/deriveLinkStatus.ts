import type { Link } from "@/types/link";

/** Matches Badge's and LinkCard's `status` prop exactly (design-system/data-display/Badge.tsx). */
export type LinkStatus = "active" | "expiring" | "expired" | "protected" | "paused";

/** A link counts as "expiring soon" when expiresAt falls within this window. */
const EXPIRING_SOON_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

type StatusInputs = Pick<Link, "isActive" | "expiresAt" | "maxClicks" | "clickCount" | "isPasswordProtected">;

/**
 * Maps the API's five independent domain facts to the design system's
 * mutually-exclusive status enum. One function, not per-screen logic: every
 * consumer (link list rows, the detail header, a future notification) must
 * apply the same precedence, and duplicating it per screen is exactly how
 * "paused" vs. "expired" would silently drift inconsistent between them.
 *
 * Precedence, most severe first — see Notes.md, "Deriving view state from
 * domain facts," for the product reasoning behind each rule:
 *
 * 1. expired   — expiresAt is in the past, OR clickCount >= maxClicks.
 *                Checked before isActive so an expired-but-unswept link
 *                (worker/processors/linkCleanupProcessor.ts only sweeps on
 *                expiresAt, never maxClicks, and runs on a delay) still shows
 *                "expired" rather than the misleading "active"/"paused".
 * 2. paused    — isActive is false and rule 1 didn't already fire. This is
 *                what correctly identifies a genuine manual deactivation
 *                rather than an unswept natural expiry.
 * 3. protected — isPasswordProtected, and expiresAt isn't within the
 *                expiring-soon window.
 * 4. expiring  — expiresAt is within the expiring-soon window. Wins over
 *                "protected" when both are true: time pressure is actionable,
 *                password protection is a static setting the owner already
 *                knows about.
 * 5. active    — none of the above.
 */
export function deriveLinkStatus(link: StatusInputs): LinkStatus {
  const now = Date.now();
  const expiresAt = link.expiresAt ? new Date(link.expiresAt).getTime() : null;

  const isExpired = (expiresAt !== null && expiresAt <= now) || (link.maxClicks !== null && link.clickCount >= link.maxClicks);
  if (isExpired) return "expired";

  if (!link.isActive) return "paused";

  const isExpiringSoon = expiresAt !== null && expiresAt - now <= EXPIRING_SOON_MS;
  if (isExpiringSoon) return "expiring";

  if (link.isPasswordProtected) return "protected";

  return "active";
}
