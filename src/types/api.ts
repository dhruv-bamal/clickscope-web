// Hand-written to match clickscope-api's actual response shapes (confirmed by
// reading its route/service source directly, the same way src/types/link.ts
// was). The two repos share no OpenAPI spec or types package, so nothing here
// is checked against the running API — this file only reflects the contract
// as of whenever someone last read the API source, and a field added to
// linkService.ts's serializer next sprint would drift silently, with
// TypeScript having no way to know. Phase 14's planned OpenAPI spec should
// *generate* this file instead: a generated client turns the type checker
// itself into the drift detector (generation fails or diffs the moment the
// two repos disagree) rather than the disagreement only surfacing at runtime
// as a missing field or an unexpected 400. See Notes.md.

import type { Link } from "@/types/link";

// ---- Auth -------------------------------------------------------------

export interface ApiUser {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/** Shared by POST /api/auth/signup (201) and POST /api/auth/login (200). */
export interface AuthResponse {
  user: ApiUser;
  token: string;
}

/** GET /api/auth/me */
export interface MeResponse {
  user: ApiUser;
}

// ---- Links --------------------------------------------------------------

export interface CreateLinkRequest {
  destinationUrl: string;
  customAlias?: string;
  /** ISO string; the API requires it to be in the future. */
  expiresAt?: string;
  maxClicks?: number;
  password?: string;
}

/** POST /api/links (201) and GET/PATCH /api/links/:id (200) all wrap one Link. */
export interface LinkResponse {
  link: Link;
}

/** GET /api/links?limit&offset (200). */
export interface ListLinksResponse {
  links: Link[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * PATCH /api/links/:id body. NEVER include `customAlias` or `shortCode` — the
 * API's update schema is strict and 400s on any unrecognized key, short codes
 * being immutable by design. Only include a key here when its value actually
 * needs to change.
 */
export interface UpdateLinkRequest {
  destinationUrl?: string;
  expiresAt?: string | null;
  maxClicks?: number | null;
  isActive?: boolean;
  password?: string | null;
}

/** GET /api/links/:id/stats?days (200). */
export interface LinkStatsResponse {
  linkId: string;
  days: number;
  stats: Array<{ day: string; clicks: number }>;
}

// ---- Error envelope -----------------------------------------------------

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "GONE"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR";

/** The `{ error: {...} }` body on every non-2xx response. */
export interface ApiErrorBody {
  error: {
    code: ApiErrorCode;
    message: string;
    requestId: string;
    /** Present on some errors, e.g. 429 carries { retryAfterSeconds }. */
    details?: unknown;
  };
}
