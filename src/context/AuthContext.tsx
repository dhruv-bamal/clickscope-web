"use client";
// Context requires a Client Component — React context has no representation
// in the RSC payload, so this can't be a Server Component regardless of the
// Icon-style fix that made most of the design system server-safe (Notes.md's
// "use client is a boundary, not a file marker" entry). This file is also
// where clickscope-api's OAuth redirect is caught: FRONTEND_URL has no path
// segment, so `#token=...` always lands at the frontend root, whatever page
// that resolves to — AuthProvider is the only thing guaranteed to mount on
// every route including root, so a dedicated /auth/callback route would
// simply never be hit by that redirect. See Notes.md.

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getMe, login as apiLogin } from "@/lib/api";
import type { ApiUser } from "@/types/api";

const STORAGE_KEY = "clickscope.token";

interface AuthContextValue {
  token: string | null;
  user: ApiUser | null;
  /** True until the mount-time localStorage/fragment restore (and the /me
   * call it triggers) finishes. Route guards must wait on this — otherwise a
   * real logged-in user gets bounced to /login for one render while restore
   * is still in flight. */
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  /** Stores a token already obtained elsewhere (signup, OAuth fragment)
   * without re-hitting /login. */
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setToken = useCallback((next: string) => {
    localStorage.setItem(STORAGE_KEY, next);
    setTokenState(next);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTokenState(null);
    setUser(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await apiLogin({ email, password });
    localStorage.setItem(STORAGE_KEY, token);
    setTokenState(token);
    setUser(user);
  }, []);

  // Mount-time restore: (a) an OAuth fragment token, checked first since it
  // represents a fresher, just-completed login than anything already in
  // localStorage, then (b) localStorage from a previous session. [] deps is
  // correct here — this is one-time initialization, not data fetching keyed
  // on a changing value (contrast with the /me effect below).
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#token=")) {
      const fragmentToken = decodeURIComponent(hash.slice("#token=".length));
      localStorage.setItem(STORAGE_KEY, fragmentToken);
      setTokenState(fragmentToken);
      // Scrub immediately. The fragment never reached any server — that's
      // the whole reason clickscope-api puts the token there instead of a
      // query param — but it's still visible in browser history, in a
      // screen share, and readable by any other script already running on
      // the page via location.href; replaceState swaps the current history
      // entry in place (no new entry, no navigation, no reload) so it
      // doesn't linger or get reprocessed on back/forward.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTokenState(stored);
    else setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve the restored token into a real user via GET /api/auth/me. Keyed
  // on [token], NOT [] — this must re-run whenever token changes (login,
  // OAuth capture, logout->null), or a second user signing in after the
  // first logs out in the same tab would keep seeing the first user's data.
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    const controller = new AbortController();
    setIsLoading(true);
    getMe(token, controller.signal)
      .then(({ user }) => setUser(user))
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        // Stored/fragment token is stale or invalid — drop it rather than
        // looping forever on a 401.
        localStorage.removeItem(STORAGE_KEY);
        setTokenState(null);
        setUser(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [token]);

  return <AuthContext.Provider value={{ token, user, isLoading, login, setToken, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
