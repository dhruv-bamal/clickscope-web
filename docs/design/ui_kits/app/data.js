// Shared fake data + helpers for the Click Scope app UI kit.
window.CSData = (function () {
  const links = [
    { id: "l1", alias: "launch", short: "short.link/launch", dest: "https://acme.com/2026/spring-launch-campaign", status: "active", clicks: 12840, created: "Mar 4", createdFull: "Mar 4, 2026", tags: ["campaign", "q2"] },
    { id: "l2", alias: "pricing", short: "short.link/pricing", dest: "https://acme.com/pricing?ref=email", status: "active", clicks: 8421, created: "Mar 2", createdFull: "Mar 2, 2026", tags: ["email"] },
    { id: "l3", alias: "webinar", short: "short.link/webinar", dest: "https://acme.com/events/q2-product-webinar-registration", status: "protected", clicks: 3190, created: "Feb 28", createdFull: "Feb 28, 2026", tags: ["events"] },
    { id: "l4", alias: "beta", short: "short.link/beta", dest: "https://acme.com/beta-access", status: "expiring", clicks: 1567, created: "Feb 24", createdFull: "Feb 24, 2026", tags: ["product"] },
    { id: "l5", alias: "promo24", short: "short.link/promo24", dest: "https://acme.com/holiday-2024", status: "expired", clicks: 24190, created: "Dec 1", createdFull: "Dec 1, 2025", tags: ["campaign"] },
    { id: "l6", alias: "docs", short: "short.link/docs", dest: "https://docs.acme.com/getting-started", status: "paused", clicks: 642, created: "Feb 20", createdFull: "Feb 20, 2026", tags: [] },
  ];
  const referrers = [
    { ref: "google.com", pct: 42, clicks: 5384 },
    { ref: "twitter.com / x.com", pct: 24, clicks: 3081 },
    { ref: "Email newsletter", pct: 18, clicks: 2311 },
    { ref: "Direct", pct: 11, clicks: 1412 },
    { ref: "linkedin.com", pct: 5, clicks: 652 },
  ];
  const countries = [
    { ref: "United States", pct: 51, clicks: 6548 },
    { ref: "United Kingdom", pct: 17, clicks: 2183 },
    { ref: "Germany", pct: 12, clicks: 1541 },
    { ref: "Canada", pct: 9, clicks: 1155 },
    { ref: "Australia", pct: 6, clicks: 770 },
  ];
  const devices = [
    { ref: "Mobile", pct: 58, clicks: 7448 },
    { ref: "Desktop", pct: 36, clicks: 4622 },
    { ref: "Tablet", pct: 6, clicks: 770 },
  ];
  // 30-day daily clicks for the trend chart
  const trend = [280,310,290,340,420,390,360,410,480,520,470,510,560,540,610,590,640,700,680,650,720,760,740,810,790,850,880,860,910,980];
  return { links, referrers, countries, devices, trend };
})();
