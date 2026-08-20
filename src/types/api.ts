// This file is NOT itself generated, but declares no hand-written object
// shapes. Every export below is a type alias derived from
// src/types/generated/api.ts (regenerate via `npm run types:generate`,
// which reads ../clickscope-api/openapi.json). If clickscope-api's spec
// changes shape, these aliases fail to compile — that's the point: the type
// checker is now the drift detector Phase 12b asked for, instead of the two
// repos silently disagreeing until a field is missing or a 400 shows up at
// runtime. See Notes.md, "Phase 14b: Generated Types", for the full diff
// against the previous hand-written version of this file.
//
// The spec has no reusable $ref schemas for these response/request wrapper
// shapes (they're defined inline per-path) and no operationIds, so aliases
// below index into `paths[...]` directly rather than a friendlier
// `operations["name"]` map.

import type { components, paths } from "./generated/api";

// ---- Auth -------------------------------------------------------------

export type ApiUser = components["schemas"]["AuthUser"];

export type SignupRequest = NonNullable<
  paths["/api/auth/signup"]["post"]["requestBody"]
>["content"]["application/json"];

export type LoginRequest = NonNullable<
  paths["/api/auth/login"]["post"]["requestBody"]
>["content"]["application/json"];

/** Shared by POST /api/auth/signup (201) and POST /api/auth/login (200) — same inline shape in the spec. */
export type AuthResponse =
  paths["/api/auth/signup"]["post"]["responses"]["201"]["content"]["application/json"];

/** GET /api/auth/me (200). */
export type MeResponse =
  paths["/api/auth/me"]["get"]["responses"]["200"]["content"]["application/json"];

// ---- Links --------------------------------------------------------------

export type CreateLinkRequest = NonNullable<
  paths["/api/links"]["post"]["requestBody"]
>["content"]["application/json"];

/** POST /api/links (201) and GET/PATCH /api/links/:id (200) all wrap one Link — same inline shape in the spec. */
export type LinkResponse =
  paths["/api/links"]["post"]["responses"]["201"]["content"]["application/json"];

/** GET /api/links?limit&offset (200). */
export type ListLinksResponse =
  paths["/api/links"]["get"]["responses"]["200"]["content"]["application/json"];

/**
 * PATCH /api/links/:id body. NEVER include `customAlias` or `shortCode` — the
 * spec has `additionalProperties: false` and no such fields, short codes
 * being immutable by design. Only include a key here when its value actually
 * needs to change.
 */
export type UpdateLinkRequest = NonNullable<
  paths["/api/links/{id}"]["patch"]["requestBody"]
>["content"]["application/json"];

/** GET /api/links/:id/stats?days (200). */
export type LinkStatsResponse =
  paths["/api/links/{id}/stats"]["get"]["responses"]["200"]["content"]["application/json"];

// ---- Error envelope -----------------------------------------------------

/**
 * Intentionally hand-declared, NOT derived from the spec. clickscope-api's
 * OpenAPI spec types `ErrorEnvelope.error.code` as a bare `string` with no
 * `enum` constraint — the Zod schema (or its OpenAPI registration) never
 * captured this closed set. This union is a real, stable contract the spec
 * under-specifies, not a hand-written mistake; see Notes.md, "Phase 14b:
 * Generated Types" for the full finding. Keep in sync by hand with
 * clickscope-api's error codes.
 */
export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "GONE"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR";

/**
 * The `{ error: {...} }` body on every non-2xx response. Overrides the
 * generated `error.code: string` with the narrower `ApiErrorCode` above —
 * see that type's comment for why the spec can't supply this itself.
 */
export type ApiErrorBody = Omit<components["schemas"]["ErrorEnvelope"], "error"> & {
  error: Omit<components["schemas"]["ErrorEnvelope"]["error"], "code"> & {
    code: ApiErrorCode;
  };
};
