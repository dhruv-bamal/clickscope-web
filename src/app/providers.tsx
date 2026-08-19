"use client";
// The one seam between the Server Component root layout and any context
// provider. Kept as its own thin file — rather than importing AuthProvider
// directly into layout.tsx — so layout.tsx itself never needs "use client"
// and a future second provider has a seat here without touching layout.tsx
// again. See Notes.md for why layout.tsx staying a Server Component matters:
// marking it "use client" would pull every route, including /design-system,
// inside that boundary — and /design-system relies on staying server-rendered
// so QrCodePopover (an async Server Component) can render at all.

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
