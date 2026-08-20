// Derived from generated/api.ts (regenerate via `npm run types:generate`), not
// hand-declared — see Notes.md, "Phase 14b: Generated Types". Confirmed an
// exact structural match against clickscope-api's OpenAPI spec before this
// migration, including the nullable-but-always-present expiresAt/maxClicks
// and the absence of a `tags` field (the API schema has no tags column; see
// Notes.md, "What the bundle gave and didn't give").
import type { components } from "./generated/api";

export type Link = components["schemas"]["Link"];
