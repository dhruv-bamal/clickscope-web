// Hand-written to match clickscope-api's serialized Link shape
// (src/services/linkService.ts). The two repos share no types package or
// OpenAPI spec, so this is the single place that shape gets asserted on the
// frontend — keep it in sync by hand when the API's Link interface changes.
//
// No `tags` field: the API schema has no tags column. The design kit models a
// Tag chip and an ad-hoc tags column in its reference screens, but there's
// nothing on the wire to back it — see Notes.md, "What the bundle gave and
// didn't give."
export interface Link {
  id: string;
  userId: string;
  shortCode: string;
  destinationUrl: string;
  expiresAt: string | null;
  maxClicks: number | null;
  clickCount: number;
  isActive: boolean;
  isPasswordProtected: boolean;
  createdAt: string;
  updatedAt: string;
}
