import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

/** Exercises AuthContext only through its real public API (useAuth), the
 * same way a real consumer would — data-testid spans (not raw text) so
 * `waitFor`/`findByTestId` can poll cleanly through the mount-effect and
 * /me-fetch-effect's async transitions without ambiguous text matches. */
function Harness() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="token">{auth.token ?? "null"}</span>
      <span data-testid="user-email">{auth.user?.email ?? "null"}</span>
      <span data-testid="loading">{String(auth.isLoading)}</span>
      <button onClick={() => auth.logout()}>logout</button>
      <button onClick={() => auth.setToken("manual-token")}>setToken</button>
    </div>
  );
}

export function renderWithAuth() {
  return render(
    <AuthProvider>
      <Harness />
    </AuthProvider>,
  );
}
