// Shared by CreateLinkModal and EditLinkModal — both use the same
// never/7d/30d expiration preset Select and need to turn the chosen preset
// into the ISO string (or null, to clear an existing expiration) the API
// expects, rather than duplicating this date math in two client components.

export const EXPIRATION_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "7d", label: "In 7 days" },
  { value: "30d", label: "In 30 days" },
];

/** "never" -> null (no expiration / clear it), "7d"/"30d" -> a future ISO string. */
export function expirationToIso(choice: string): string | null {
  if (choice !== "7d" && choice !== "30d") return null;
  const days = choice === "7d" ? 7 : 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}
