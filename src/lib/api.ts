// The ONE place that knows clickscope-api's base URL and attaches the
// Bearer token — no other file constructs a URL or reads
// NEXT_PUBLIC_API_URL directly. See .env.local.example and Notes.md for why
// that env var is prefixed NEXT_PUBLIC_ (a security boundary, not a naming
// convention) and what happens if it's missing.

import type {
  AuthResponse,
  MeResponse,
  LoginRequest,
  SignupRequest,
  CreateLinkRequest,
  UpdateLinkRequest,
  LinkResponse,
  ListLinksResponse,
  LinkStatsResponse,
  ApiErrorBody,
  ApiErrorCode,
} from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL && typeof window !== "undefined") {
  // Fails loudly in the browser console rather than every fetch() silently
  // resolving a relative URL against the Next.js dev server's own origin
  // and 404ing against Next's router instead of clickscope-api.
  console.error("NEXT_PUBLIC_API_URL is not set — copy .env.local.example to .env.local and restart the dev server.");
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly requestId: string;
  readonly details: unknown;
  /** Only set on a 429 — seconds until the client should retry. */
  readonly retryAfterSeconds?: number;

  constructor(status: number, body: ApiErrorBody["error"], retryAfterSeconds?: number) {
    super(body.message);
    this.name = "ApiError";
    this.status = status;
    this.code = body.code;
    this.requestId = body.requestId;
    this.details = body.details;
    if (retryAfterSeconds !== undefined) this.retryAfterSeconds = retryAfterSeconds;
  }
}

interface RequestOptions {
  token?: string | null;
  signal?: AbortSignal;
}

async function request<T>(path: string, init: RequestInit & RequestOptions = {}): Promise<T> {
  const { token, signal, headers, ...rest } = init;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    signal,
    headers: {
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  // 204 (DELETE /api/links/:id) has no body — calling res.json() on it
  // throws a SyntaxError, not an ApiError, so it's special-cased before any
  // json() call runs.
  if (res.status === 204) {
    return undefined as T;
  }

  if (!res.ok) {
    const body = (await res.json()) as ApiErrorBody;
    if (res.status === 429) {
      const headerValue = res.headers.get("Retry-After");
      const retryAfterSeconds =
        (body.error.details as { retryAfterSeconds?: number } | undefined)?.retryAfterSeconds ??
        (headerValue ? Number(headerValue) : undefined);
      throw new ApiError(res.status, body.error, retryAfterSeconds);
    }
    throw new ApiError(res.status, body.error);
  }

  return (await res.json()) as T;
}

// ---- Auth -----------------------------------------------------------------

export function signup(body: SignupRequest, signal?: AbortSignal) {
  return request<AuthResponse>("/api/auth/signup", { method: "POST", body: JSON.stringify(body), signal });
}

export function login(body: LoginRequest, signal?: AbortSignal) {
  return request<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify(body), signal });
}

export function getMe(token: string, signal?: AbortSignal) {
  return request<MeResponse>("/api/auth/me", { token, signal });
}

/** Not a fetch — GET /api/auth/google is a browser redirect target reached via
 * a real navigation (window.location.href = googleAuthUrl()), never fetch(). */
export function googleAuthUrl(): string {
  return `${BASE_URL}/api/auth/google`;
}

// ---- Links ------------------------------------------------------------

export function createLink(token: string, body: CreateLinkRequest, signal?: AbortSignal) {
  return request<LinkResponse>("/api/links", { method: "POST", token, body: JSON.stringify(body), signal });
}

export function listLinks(token: string, params: { limit: number; offset: number }, signal?: AbortSignal) {
  const qs = new URLSearchParams({ limit: String(params.limit), offset: String(params.offset) });
  return request<ListLinksResponse>(`/api/links?${qs}`, { token, signal });
}

export function getLink(token: string, id: string, signal?: AbortSignal) {
  return request<LinkResponse>(`/api/links/${id}`, { token, signal });
}

export function getLinkStats(token: string, id: string, days: number, signal?: AbortSignal) {
  return request<LinkStatsResponse>(`/api/links/${id}/stats?days=${days}`, { token, signal });
}

export function updateLink(token: string, id: string, body: UpdateLinkRequest, signal?: AbortSignal) {
  return request<LinkResponse>(`/api/links/${id}`, { method: "PATCH", token, body: JSON.stringify(body), signal });
}

export function deleteLink(token: string, id: string, signal?: AbortSignal) {
  return request<void>(`/api/links/${id}`, { method: "DELETE", token, signal });
}
