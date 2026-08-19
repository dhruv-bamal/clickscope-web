import { describe, expect, it } from "vitest";
import { deriveLinkStatus } from "./deriveLinkStatus";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const base = {
  isActive: true,
  expiresAt: null as string | null,
  maxClicks: null as number | null,
  clickCount: 0,
  isPasswordProtected: false,
};

describe("deriveLinkStatus — the five branches", () => {
  it("returns active when none of the other conditions hold", () => {
    expect(deriveLinkStatus({ ...base })).toBe("active");
  });

  it("returns expired when expiresAt is in the past", () => {
    expect(deriveLinkStatus({ ...base, expiresAt: new Date(Date.now() - HOUR).toISOString() })).toBe("expired");
  });

  it("returns expired when clickCount has reached maxClicks", () => {
    expect(deriveLinkStatus({ ...base, maxClicks: 10, clickCount: 10 })).toBe("expired");
  });

  it("returns paused when isActive is false and the link isn't otherwise expired", () => {
    expect(deriveLinkStatus({ ...base, isActive: false })).toBe("paused");
  });

  it("returns expiring when expiresAt falls within the 3-day window", () => {
    expect(deriveLinkStatus({ ...base, expiresAt: new Date(Date.now() + DAY).toISOString() })).toBe("expiring");
  });

  it("returns protected when isPasswordProtected is true and the link isn't expiring soon", () => {
    expect(deriveLinkStatus({ ...base, isPasswordProtected: true })).toBe("protected");
  });
});

describe("deriveLinkStatus — precedence rules", () => {
  it("expired via date beats paused", () => {
    const status = deriveLinkStatus({
      ...base,
      isActive: false,
      expiresAt: new Date(Date.now() - HOUR).toISOString(),
    });
    expect(status).toBe("expired");
  });

  it("expired via click-cap beats paused", () => {
    const status = deriveLinkStatus({
      ...base,
      isActive: false,
      maxClicks: 5,
      clickCount: 5,
    });
    expect(status).toBe("expired");
  });

  it("paused is distinguished from expired via isActive when neither expiry condition holds", () => {
    // Same isActive: false as the two tests above, but with a click count
    // still under the cap and no expiresAt — the only variable is isActive,
    // so this pins that paused is reachable at all, not just that expired
    // wins when both are true.
    const status = deriveLinkStatus({
      ...base,
      isActive: false,
      maxClicks: 5,
      clickCount: 1,
    });
    expect(status).toBe("paused");
  });

  it("expiring beats protected", () => {
    const status = deriveLinkStatus({
      ...base,
      isPasswordProtected: true,
      expiresAt: new Date(Date.now() + DAY).toISOString(),
    });
    expect(status).toBe("expiring");
  });
});
