# Design System — Link Shortener (v2, expanded)

A design specification for a Bitly-style URL-shortening web application: link creation, custom aliases, QR codes, password-protected links, expiration rules, an analytics dashboard, and email/password + Google OAuth sign-in.

**Audience for this document**

- **Google Stitch** — to generate UI mockups from these visual and interaction rules.
- **A human developer** — who will hand-write all component logic, state, and data fetching. This document specifies _appearance and behavior only_; it does not prescribe implementation.

**Framework baseline**

- **Tailwind CSS v4**, utility-first, CSS-first configuration (`@theme` block, no parallel design-token layer to translate later).
- Every value below is stated as a real Tailwind primitive: a default spacing step, a default palette shade, a default breakpoint, or a utility class. If a rule can't be expressed in Tailwind's own vocabulary, it isn't in this system.
- Colors reference Tailwind v4's default oklch palette (`--color-slate-600`, `--color-indigo-500`, etc.). Semantic tokens are thin aliases over those families.

> **Scope guardrails.** No component code, no framework, no state or data-fetching. Where a decision is genuinely implementation-level (how a component knows which row is selected, how the theme preference is persisted, how a form validates), this document says so and stops. Those are the developer's calls.

> **v2 changelog (read this first).** This revision (a) resolves four internal inconsistencies found in v1 — the canonical spacing scale, the incomplete semantic token set, the fixed focus-ring offset color, and a mismatched button/control padding spec — and (b) adds coverage for screens, components, and states the original spec omitted: account-linking conflicts, password reset, rate-limit feedback, session expiry, tags, filters, bulk actions, chart detail, toast limits, QR states, and a 401/403/404 distinction. Amendments are marked inline with **[v2]**.

---

## 1. Design principles

**Philosophy: utilitarian first, approachable second.**
This is a working tool. People come to create a link fast, or to read numbers off a dashboard. Density, scannability, and predictability beat delight. The product should feel like a well-built developer tool that a non-developer is still comfortable in — competent, quiet, never toy-like, never enterprise-gray-drab.

Concretely, this means:

- **Information density is a feature on authenticated screens.** The dashboard, link list, and analytics tables are meant to show a lot at once. Default to compact spacing (`p-3`/`p-4`, `gap-3`/`gap-4`) inside data regions; reserve generous spacing (`p-6`+, `gap-6`+) for marketing and empty/first-run states.
- **Low chrome, high signal.** Borders and subtle background shifts do most of the structural work; heavy shadows and gradients are avoided. Elevation is earned only by things that float (menus, modals, toasts).
- **One primary action per view.** Everything else is secondary or tertiary. The eye should always find the single filled indigo button.
- **Monospace for machine text.** URLs, short-codes, custom aliases, API-ish values, and QR payloads render in a mono face. This is both a legibility aid (distinguishing `l`/`1`/`I`, `0`/`O`) and a tone signal that this is a precise tool.

**How this maps to Tailwind's utility-first approach specifically:**

- **The scale is the system.** Consistency comes from disciplined reuse of a _small subset_ of Tailwind's default scales, not from bespoke values. Sections 5 and 13 name the canonical subset. Arbitrary values (`p-[13px]`, `text-[15px]`) are a smell — they mean the scale needs a documented exception, not a one-off.
- **Semantics live in `@theme`, not in markup.** Utilities in markup should read as intent (`bg-primary`, `text-danger`) resolved through theme aliases, so a palette change is a single-file edit. Raw palette utilities (`bg-indigo-600`) are acceptable in one-off marketing decoration but discouraged in product components.
- **Variants express state, not JavaScript.** `hover:`, `focus-visible:`, `disabled:`, `aria-*`, `data-*`, and `dark:` carry the interaction and theme logic that would otherwise leak into code. The visual states in Section 9 are defined entirely in these variants.
- **Mobile-first, always.** Base utilities describe the phone; `sm:`/`md:`/`lg:` layer on larger layouts. Never the reverse.

---

## 2. Brand identity

**Positioning:** a prosumer link platform. Trustworthy enough for a marketing team's campaign links, precise enough that a developer doesn't roll their eyes. The voice in the UI is plain and confident: "Create link", "Copy", "This link is expired", never "Oops!" or "Awesome!".

**Primary color — Indigo.**
`indigo` (Tailwind family) is the brand and the single action color. It reads as digital, dependable, and neutral across industries (not tied to a mood the way green/red/orange are). Filled primary buttons, active nav, selected states, links, focus rings, and key data accents all draw from indigo. Restraint is the rule: indigo means "act here" or "this is live/selected", so it must stay rare enough to keep that meaning.

**Accent — Sky (used sparingly).**
`sky` is a cool secondary used only in data visualization and the occasional informational highlight, so charts and info states don't overload the single indigo signal. It is _not_ an alternate button color.

**Neutral ramp — Slate.**
All text, surfaces, borders, and structure come from `slate`. Cool-gray reads as technical and pairs cleanly with indigo. This is the workhorse family; the vast majority of any screen is slate.

**Semantic families** (detail in Section 3): success `emerald`, danger `red`, warning `amber`, info `sky`.

**Iconography — Lucide.**
Lucide is the icon set: open, consistent 24×24 grid, 2px stroke, outline style that matches a utilitarian tool better than filled/duotone sets.

- Default render: `size-4` (16px) inline with text, `size-5` (20px) for standalone icon buttons, `size-6` (24px) only in empty-state art.
- Stroke color inherits `currentColor` — icons take the text color of their context; never hard-code an icon color.
- Icons _support_ labels; they rarely replace them. Icon-only controls (copy, QR, kebab menu, close) must carry an accessible name (Section 8).
- Consistent metaphors: `link-2` for links, `qr-code` for QR, `lock` for password protection, `clock`/`calendar-clock` for expiration, `bar-chart-3` for analytics, `copy`/`check` for the copy interaction, `external-link` for outbound, `trash-2` destructive, `ellipsis`/`ellipsis-vertical` for row menus, `tag` for tags **[v2]**, `filter` for the filter control **[v2]**, `shield-alert` for permission-denied states **[v2]**.

**Logo usage** (placeholder guidance): the wordmark sits in slate-900 (light) / slate-50 (dark) with the mark in indigo-600. Never recolor the mark into a semantic hue.

---

## 3. Color system

All colors are Tailwind v4 default palette entries (oklch). Product code should consume the **semantic aliases**, which are defined once in the `@theme` block and reused everywhere. Light and dark values are both defined so the `dark:` variant resolves automatically.

### 3.1 Palette families in play

Only five families are canonical. Anything outside this list needs a documented reason.

| Role                     | Family    | Notes                                                               |
| ------------------------ | --------- | ------------------------------------------------------------------- |
| Neutral / structure      | `slate`   | Text, surfaces, borders, dividers. The bulk of every screen.        |
| Primary / brand / action | `indigo`  | The one action color. Buttons, links, focus, selection, active nav. |
| Success                  | `emerald` | Confirmations, healthy metrics, "active" link status.               |
| Danger / destructive     | `red`     | Errors, delete, expired, failed.                                    |
| Warning                  | `amber`   | Expiring-soon, quota nearing, non-blocking caution.                 |
| Info / accent            | `sky`     | Chart accent, informational (non-alarming) highlights.              |

### 3.2 Neutral (slate) usage by shade

Shades are chosen so that light mode reads off the low end and dark mode mirrors off the high end.

| Purpose                                   | Light       | Dark        |
| ----------------------------------------- | ----------- | ----------- |
| App background                            | `slate-50`  | `slate-950` |
| Raised surface (cards, panels, inputs)    | `white`     | `slate-900` |
| Surface, subtle (table header, hover row) | `slate-100` | `slate-800` |
| Border / divider                          | `slate-200` | `slate-800` |
| Border, strong (input outline)            | `slate-300` | `slate-700` |
| Text, primary                             | `slate-900` | `slate-50`  |
| Text, secondary                           | `slate-600` | `slate-400` |
| Text, muted / placeholder                 | `slate-400` | `slate-500` |
| Icon, default                             | `slate-500` | `slate-400` |

### 3.3 Primary (indigo) usage by shade

| Purpose                                       | Light                              | Dark                                |
| --------------------------------------------- | ---------------------------------- | ----------------------------------- |
| Primary button fill                           | `indigo-600`                       | `indigo-500`                        |
| Primary button hover                          | `indigo-700`                       | `indigo-400`                        |
| Primary button active/pressed                 | `indigo-800`                       | `indigo-600`                        |
| Link text                                     | `indigo-600`                       | `indigo-400`                        |
| Focus ring                                    | `indigo-500`                       | `indigo-400`                        |
| Selected/active tint (nav item, selected row) | `indigo-50` bg / `indigo-700` text | `indigo-950` bg / `indigo-300` text |
| Subtle brand surface                          | `indigo-50`                        | `indigo-950`                        |

### 3.4 Semantic tokens **[v2 — completed]**

Each semantic color exposes a **full, consistent** set of four roles: `fg` (text/icon on a neutral surface), `bg-subtle` (tinted container, e.g. an alert banner or toast), `border` (1px borders on tinted containers), and `solid` (filled emphasis, e.g. a status dot, badge, or destructive button). v1 only defined the `solid` role in the `@theme` block and left the other three to be improvised ad hoc (e.g. Section 9.9's form-error banner). All four are now defined once, per semantic family, so every component pulls from the same source instead of reinventing "danger surface" per screen.

```css
/* app.css — the single source of truth for tokens */
@theme {
  /* Brand */
  --color-primary: var(--color-indigo-600);
  --color-primary-hover: var(--color-indigo-700);
  --color-primary-fg: var(--color-white); /* text/icon on a primary fill */

  /* Accent (data + info) */
  --color-accent: var(--color-sky-500);

  /* Semantic — success */
  --color-success: var(--color-emerald-600); /* solid */
  --color-success-fg: var(
    --color-emerald-700
  ); /* text/icon on neutral surface */
  --color-success-bg-subtle: var(--color-emerald-50); /* tinted container bg */
  --color-success-border: var(
    --color-emerald-200
  ); /* tinted container border */

  /* Semantic — danger */
  --color-danger: var(--color-red-600);
  --color-danger-fg: var(--color-red-700);
  --color-danger-bg-subtle: var(--color-red-50);
  --color-danger-border: var(--color-red-200);

  /* Semantic — warning */
  --color-warning: var(--color-amber-500);
  --color-warning-fg: var(--color-amber-700);
  --color-warning-bg-subtle: var(--color-amber-50);
  --color-warning-border: var(--color-amber-200);

  /* Semantic — info */
  --color-info: var(--color-sky-600);
  --color-info-fg: var(--color-sky-700);
  --color-info-bg-subtle: var(--color-sky-50);
  --color-info-border: var(--color-sky-200);

  /* Surfaces & text (light defaults) */
  --color-canvas: var(--color-slate-50);
  --color-surface: var(--color-white);
  --color-surface-subtle: var(--color-slate-100);
  --color-border: var(--color-slate-200);
  --color-border-strong: var(--color-slate-300);
  --color-fg: var(--color-slate-900);
  --color-fg-muted: var(--color-slate-600);
  --color-fg-subtle: var(--color-slate-400);
}
```

Dark theme re-points the _surface, text, and semantic_ tokens (semantics shift up one step for contrast on dark surfaces):

```css
.dark {
  --color-canvas: var(--color-slate-950);
  --color-surface: var(--color-slate-900);
  --color-surface-subtle: var(--color-slate-800);
  --color-border: var(--color-slate-800);
  --color-border-strong: var(--color-slate-700);
  --color-fg: var(--color-slate-50);
  --color-fg-muted: var(--color-slate-400);
  --color-fg-subtle: var(--color-slate-500);

  --color-primary: var(--color-indigo-500);
  --color-primary-hover: var(--color-indigo-400);

  --color-success: var(--color-emerald-500);
  --color-success-fg: var(--color-emerald-300);
  --color-success-bg-subtle: var(--color-emerald-950);
  --color-success-border: var(--color-emerald-800);

  --color-danger: var(--color-red-500);
  --color-danger-fg: var(--color-red-300);
  --color-danger-bg-subtle: var(--color-red-950);
  --color-danger-border: var(--color-red-800);

  --color-warning: var(--color-amber-400);
  --color-warning-fg: var(--color-amber-300);
  --color-warning-bg-subtle: var(--color-amber-950);
  --color-warning-border: var(--color-amber-800);

  --color-info: var(--color-sky-500);
  --color-info-fg: var(--color-sky-300);
  --color-info-bg-subtle: var(--color-sky-950);
  --color-info-border: var(--color-sky-800);
}
```

This makes `bg-primary`, `text-danger`, `bg-danger-bg-subtle`, `border-danger-border`, `border-border`, `bg-surface`, and their `dark:`-aware counterparts available as utilities with no per-element dark overrides needed for color. **Any component that needs a tinted alert/banner/badge surface (Sections 9.6, 9.9, 10.1, 10.3) pulls its three colors — bg, border, fg — from one semantic family, never mixed across families.**

### 3.5 Status color mapping (domain-specific)

Link and analytics status uses the semantic solids consistently everywhere they appear (badge, dot, table cell):

| Status             | Color              | Use                                                |
| ------------------ | ------------------ | -------------------------------------------------- |
| Active             | `success`          | Link is live and resolving.                        |
| Expiring soon      | `warning`          | Within its expiration window.                      |
| Expired            | `danger`           | Past expiration; no longer resolves.               |
| Password-protected | `info`             | Gated by a password (informational, not an error). |
| Draft / paused     | `fg-muted` (slate) | Not currently resolving by choice.                 |

---

## 4. Typography

**Families**

- **Sans — Geist Sans** (fallback: `ui-sans-serif, system-ui, sans-serif`). Neutral, modern product face; excellent at small sizes in dense tables. Set as the default `font-sans` in `@theme`.
- **Mono — Geist Mono** (fallback: `ui-monospace, SFMono-Regular, "JetBrains Mono", monospace`). Used for all machine text: short URLs, custom aliases, short-codes, QR payload strings, API keys, and numeric IDs. Mapped to `font-mono`.

```css
@theme {
  --font-sans: "Geist Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
}
```

Only these two families. No display/serif face.

**Type scale** — expressed as the exact Tailwind utility combination for each role. Line-height is baked in via the `text-*` step; weight and tracking are explicit.

| Role                          | Utilities                                                     | Notes                                                       |
| ----------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Display (marketing hero)      | `text-5xl md:text-6xl font-semibold tracking-tight`           | Landing page only.                                          |
| H1 (page title)               | `text-3xl font-semibold tracking-tight`                       | One per authenticated page.                                 |
| H2 (section)                  | `text-xl font-semibold tracking-tight`                        | Card group headers, modal titles.                           |
| H3 (subsection)               | `text-base font-semibold`                                     | Within cards, settings groups.                              |
| Body                          | `text-sm font-normal leading-6`                               | **Default UI body size.** Dense but comfortable.            |
| Body, large                   | `text-base font-normal leading-7`                             | Marketing paragraphs, empty-state descriptions.             |
| Label (form + column headers) | `text-sm font-medium`                                         | Field labels.                                               |
| Caption / meta                | `text-xs font-normal text-fg-muted`                           | Timestamps, helper text, row metadata.                      |
| Overline / eyebrow            | `text-xs font-semibold uppercase tracking-wide text-fg-muted` | Table column headers, section eyebrows.                     |
| Button label                  | `text-sm font-medium`                                         | Matches body; see Section 9.                                |
| Stat value (KPI)              | `text-3xl font-semibold tracking-tight tabular-nums`          | Big numbers on stat cards.                                  |
| Mono / code                   | `font-mono text-sm`                                           | Short URLs, aliases, codes. `text-xs` in dense table cells. |

**Rules**

- **`text-sm` is the product default**, not `text-base`. The authenticated app is dense; `text-base` is reserved for marketing and long-form empty states.
- **`tabular-nums` on all metrics and any number that updates or aligns in a column** (analytics, click counts, dates in tables) so digits don't shift.
- Headings use `tracking-tight`; body uses default tracking; only the overline uses `tracking-wide`.
- Max line length for reading text: cap with `max-w-prose` (marketing) or `max-w-md`/`max-w-lg` (dialog/help copy). Data content is not width-capped.
- Truncation: long URLs truncate with `truncate` and reveal fully on hover/focus (native `title` or popover — see Section 9); never wrap a URL across three lines in a table cell.

---

## 5. Spacing, sizing, radius, shadow, elevation

The entire system lives inside a **named subset** of Tailwind's default scales. Using a value outside the canonical set is the signal to reconsider.

### 5.1 Spacing (padding, margin, gap) **[v2 — canonical set corrected]**

Canonical steps: **`1, 1.5, 2, 2.5, 3, 4, 6, 8, 12, 16, 24`** (= 0.25rem … 6rem). v1 declared the set as `1, 2, 3, 4, 6, 8, 12, 16, 24` but then used `gap-1.5` and `py-2.5` within the same section and `py-1.5`/`py-3` in Section 9.1 — a direct contradiction. Rather than strip those working values (control padding genuinely needs the half-steps to hit correct control heights), the canonical set is widened here to explicitly include `1.5` and `2.5`. Skip all other in-between steps (`5, 7, 9, 10, 11, 14, 20`) unless a documented exception applies — see the toggle-track exception in 9.2.

| Context                               | Value                                     | Rule                                                                                                                                                                                                                                            |
| ------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Icon ↔ label gap, chip padding        | `gap-1.5` / `gap-2`                       | Tight pairing.                                                                                                                                                                                                                                  |
| Control inner padding (button, input) | `px-3 py-1.5` (sm) · `px-4 py-2.5` (md)   | **[v2 — corrected]** v1 had 5.1 and 9.1 disagreeing on the "sm" value (`py-2` vs `py-1.5`). `py-1.5` is now the single source of truth for small controls at both places this table is referenced; 9.1 no longer restates a conflicting number. |
| Card / panel padding                  | `p-4` (dense) · `p-6` (comfortable)       | Data cards `p-4`; marketing/empty `p-6`.                                                                                                                                                                                                        |
| Stack gap inside a card               | `gap-3` / `space-y-3`                     | Between fields, list items.                                                                                                                                                                                                                     |
| Gap between cards / grid              | `gap-4` (dashboard) · `gap-6` (marketing) |                                                                                                                                                                                                                                                 |
| Section vertical rhythm (page)        | `space-y-6` / `space-y-8`                 | Between major page sections.                                                                                                                                                                                                                    |
| Page gutter                           | `px-4 sm:px-6 lg:px-8`                    | Standard responsive gutter everywhere.                                                                                                                                                                                                          |
| Section vertical padding (marketing)  | `py-16 md:py-24`                          |                                                                                                                                                                                                                                                 |

### 5.2 Sizing

- **Content max width:** dashboard content `max-w-7xl mx-auto`; forms/auth `max-w-md`; link-detail column `max-w-3xl`; marketing sections `max-w-6xl`.
- **Control heights** (via padding + line-height, not fixed `h-*` unless icon-only): small `~32px` (`py-1.5`), medium `~40px` (`py-2.5`), large `~44px` (`py-3`, primary CTAs and mobile targets). See Section 8 for the 44px hit-target floor.
- **Icon-only button:** `size-9` (md) with a centered `size-5` icon; `size-11` on touch-primary contexts.
- **Avatar:** `size-8` in nav, `size-10` in menus.
- **Sidebar width:** `w-60` expanded, `w-16` collapsed (icon-only).

### 5.3 Radius

Radius encodes hierarchy — bigger surface, bigger radius. Canonical: **`rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`**.

| Element                                            | Radius                                         |
| -------------------------------------------------- | ---------------------------------------------- |
| Button, input, select, badge                       | `rounded-md`                                   |
| Checkbox                                           | `rounded` (small); toggle track `rounded-full` |
| Card, panel, stat card, link card                  | `rounded-lg`                                   |
| Modal, drawer, large surface                       | `rounded-xl`                                   |
| Popover, dropdown menu, tooltip                    | `rounded-lg`                                   |
| Avatar, status dot, pill filter, tag chip **[v2]** | `rounded-full`                                 |
| QR code image container                            | `rounded-lg`                                   |

Never mix radii on nested corners that touch (e.g. a `rounded-md` input inside a `rounded-lg` card is fine; a `rounded-xl` button inside a `rounded-md` card is not).

### 5.4 Shadow & elevation

Shadows are minimal and reserved for genuinely floating things. Flat surfaces use borders, not shadows. Canonical: **`shadow-none`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`**.

| Elevation       | Utility                                | What sits here                                                    |
| --------------- | -------------------------------------- | ----------------------------------------------------------------- |
| 0 — flush       | `shadow-none` + `border border-border` | Cards, panels, inputs, table containers. Structure is the border. |
| 1 — subtle lift | `shadow-xs`                            | Sticky header on scroll, raised stat cards if desired.            |
| 2 — hover lift  | `shadow-sm`                            | Card/row on hover (paired with border color shift).               |
| 3 — floating    | `shadow-md`                            | Dropdowns, popovers, tooltips.                                    |
| 4 — overlay     | `shadow-lg`                            | Modals, drawers, toasts.                                          |

**Dark mode:** shadows read weakly on dark surfaces — elevation in dark theme is carried primarily by a lighter surface (`slate-900` on `slate-950`) plus a `ring-1 ring-white/10`, not by shadow. Keep the shadow utility present for consistency but do not rely on it.

---

## 6. Breakpoints & responsive strategy

Mobile-first. Base styles target the phone; each breakpoint adds capability. Tailwind defaults, unchanged:

| Token  | Min width | Primary role here                                                  |
| ------ | --------- | ------------------------------------------------------------------ |
| (base) | 0         | Phone. Single column, stacked.                                     |
| `sm`   | 640px     | Large phone / small tablet. Minor two-up groupings.                |
| `md`   | 768px     | Tablet. Two-column forms, table returns to columns.                |
| `lg`   | 1024px    | Laptop. **Persistent sidebar appears.** Multi-column dashboard.    |
| `xl`   | 1280px    | Desktop. Wider content max, more chart real estate.                |
| `2xl`  | 1536px    | Large desktop. Content caps at `max-w-7xl`; extra space is margin. |

### 6.1 Dashboard

- **Base:** single column. Top bar with hamburger; sidebar becomes an off-canvas drawer. Stat cards stack full-width (`grid-cols-1`). Primary "Create link" is a full-width button or a floating action affordance.
- **`sm`:** stat cards go `grid-cols-2`.
- **`lg`:** persistent sidebar (`w-60`) docks; content shifts right. Stat cards `grid-cols-4`. Create-link moves into the header as a standard button.
- **`xl`+:** content `max-w-7xl`; analytics summary can sit beside the link list rather than above it.

### 6.2 Link list

- **Base:** the table is _not_ a table — each link renders as a **link card** (Section 9): short URL + destination, status badge, click count, and a kebab menu. Vertical list, `space-y-3`. The filter control (Section 9.11 **[v2]**) collapses to a single "Filters" button opening a bottom-sheet-style drawer rather than an inline bar.
- **`md`:** switch to a true table with columns (short link, destination, clicks, status, created, actions). Column headers use the overline style. Filter bar becomes inline, sitting above the table.
- **`lg`+:** add secondary columns that were hidden on `md` (e.g. last-click, tags). Bulk-select checkboxes column appears; selecting any row surfaces the bulk-action toolbar (Section 9.12 **[v2]**).
- Row density stays compact (`py-3` cells) at every size.

### 6.3 Public redirect / interstitial pages

These are seen by _recipients_, not account holders — unknown device, must be fast and centered.

- **All breakpoints:** single centered column, `max-w-md`, vertically centered in the viewport, generous `p-6`/`p-8`. No app chrome, no sidebar. This applies to: the countdown/redirect interstitial, the password-protected gate (Section 9.10), the expired-link page, and the not-found/forbidden pages **[v2]**.
- Scale up only the whitespace and (on the interstitial) the QR/brand mark; the content column width stays fixed for focus.
- These pages must render legibly with zero JS layout dependency and honor system dark mode.

---

## 7. Light / dark theme tokens

**Model:** a single `dark` class on the root element flips a set of CSS variables; every color utility resolves through the semantic aliases from Section 3.4, so nothing in markup needs a hand-written `dark:` color override for standard surfaces and text.

- **Token layer:** `@theme` defines the light values; a `.dark { … }` block re-points the surface/text/semantic variables (Section 3.4). Tailwind's `dark:` variant is configured to key off the `.dark` class (`@variant dark (&:where(.dark, .dark *))`).
- **What flips automatically:** `bg-canvas`, `bg-surface`, `bg-surface-subtle`, `text-fg`, `text-fg-muted`, `border-border`, and every semantic (`bg-primary`, `text-danger`, `bg-danger-bg-subtle`, …). Components authored against these aliases are theme-correct with no extra classes.
- **When to still write `dark:` in markup:** only for the handful of _non-color_ or _shade-specific_ adjustments the tokens can't express — e.g. adding `dark:ring-1 dark:ring-white/10` to carry elevation on dark surfaces, or reducing an image/illustration opacity (`dark:opacity-90`). These are the exception, not the pattern.
- **Public pages** honor the recipient's OS preference by default (the redirect/interstitial/password/error pages read system preference); authenticated app theme follows the user's chosen setting.

**Out of scope (implementation).** How the choice is stored, how it's read on first paint to avoid a flash, and how the toggle control wires up are the developer's decisions. This document specifies only: (a) the token structure above, (b) that a `light` / `dark` / `system` three-way choice should be _offered_ in account settings, and (c) the visual spec of the toggle control itself (Section 9, segmented control).

---

## 8. Accessibility

Target: **WCAG 2.2 AA**.

### 8.1 Contrast — verified semantic pairings

All pairings below meet AA (≥4.5:1 for normal text, ≥3:1 for large text / UI boundaries). Use these approved combinations; do not invent new fg/bg pairs.

| Pairing                                                                      | Context                                  | Meets                                                              |
| ---------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `slate-900` on `white`                                                       | Primary text, light                      | AA (normal)                                                        |
| `slate-600` on `white`                                                       | Secondary text, light                    | AA (normal)                                                        |
| `slate-400` on `white`                                                       | Muted text — **large/UI only**, not body | AA (large/UI)                                                      |
| `slate-50` on `slate-950`                                                    | Primary text, dark                       | AA (normal)                                                        |
| `slate-400` on `slate-950`                                                   | Secondary text, dark                     | AA (normal)                                                        |
| `white` on `indigo-600`                                                      | Primary button, light                    | AA (normal)                                                        |
| `white` on `red-600`                                                         | Destructive button                       | AA (normal)                                                        |
| `white` on `emerald-600`                                                     | Success solid                            | AA (normal)                                                        |
| `slate-900` on `amber-400`                                                   | Warning solid — **dark text required**   | AA (normal)                                                        |
| `indigo-700` on `indigo-50`                                                  | Selected/active tint, light              | AA (normal)                                                        |
| `indigo-300` on `indigo-950`                                                 | Selected/active tint, dark               | AA (normal)                                                        |
| `emerald-700`/`red-700`/`amber-700`/`sky-700` on their own `-50` bg **[v2]** | Alert banners, tinted badges, toasts     | AA (normal) — verify at implementation time per exact pairing used |

Rules:

- **Never** put white text on `amber` — warning fills always take `slate-900` text.
- Muted `slate-400` text is only permissible for large text (≥18.66px bold / 24px) or non-essential metadata; body and labels use `slate-600`+ / `slate-400`+ (dark).
- Status conveyed by color is always **also** conveyed by an icon and/or text label (never color alone) — colorblind-safe.
- Placeholder text is never the only label; every input has a persistent visible label.

### 8.2 Focus **[v2 — offset color corrected]**

- **Focus is always visible and uses `focus-visible:`**, never bare `focus:` (so mouse clicks don't ring).
- Canonical focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
- **Ring-offset color is context-aware, not fixed.** v1 hardcoded `ring-offset-canvas` universally, which produces a visibly mismatched halo around any focused control that sits on `bg-surface` (the overwhelming majority of controls — inputs, buttons inside cards, modal footer buttons, table row actions). The rule is: **ring-offset color matches the immediate background the control sits on** — `ring-offset-canvas` only for controls placed directly on the page background (e.g. the sidebar nav, the top-level "Create link" header button), and `ring-offset-surface` for anything inside a card, modal, drawer, popover, or table row. Both tokens flip correctly in dark mode automatically since they're aliases.
- Focus ring color is indigo everywhere for consistency — including on destructive controls (the ring signals _focus_, the fill signals _danger_).
- Never remove focus outlines without replacing them. `outline-none` must always be paired with a `ring` treatment.

### 8.3 Keyboard & interaction expectations

Behavioral spec (not implementation):

- All interactive elements are reachable and operable by keyboard in a logical order; nothing is mouse-only.
- **Modals & drawers:** focus moves into the surface on open, is trapped while open, returns to the trigger on close; `Esc` closes; the backdrop is inert to tab order.
- **Dropdowns / popovers / selects:** open with `Enter`/`Space`, arrow-key move between items, `Enter` selects, `Esc` closes and returns focus to the trigger, `Home`/`End` jump to ends.
- **Tables:** column headers are real headers; sortable headers are buttons announcing sort state; row actions are reachable without a hover (the kebab menu is a focusable button, actions aren't hidden behind hover-only reveals).
- **Toasts:** announced to assistive tech (polite live region); an action inside a toast is keyboard-reachable while the toast is visible; auto-dismiss pauses on hover/focus.
- **Copy-to-clipboard** buttons announce success ("Copied") via the same live-region mechanism, not color alone.
- **Touch targets** are ≥44×44px (`size-11` / `py-3`) on primary and mobile controls; dense desktop table controls may relax to ~32px but keep ≥24px spacing between adjacent targets.
- Icon-only controls (copy, QR, close, kebab) carry an accessible name; decorative icons are hidden from assistive tech.

### 8.4 Reduced motion & contrast preferences **[v2]**

- `prefers-reduced-motion` is honored via the `motion-reduce:` variant (detailed in Section 12) — this was already specified there but is cross-referenced here as an accessibility requirement, not just a motion nicety.
- `prefers-contrast: more` is **not** given a distinct token set in this version — the semantic pairings in 8.1 are chosen conservatively enough to hold up without a separate high-contrast theme. If a genuine need emerges (developer discretion), it would re-point border and text-muted tokens one step darker/lighter rather than introducing a new palette family.

---

## 9. Component library

Each component is specified as **appearance + states + usage rules**. No code. "State" means the visual treatment for: default, hover, active/pressed, focus (per Section 8.2), disabled, and — where applicable — loading, error, and selected. How a component _knows_ its state (selected row, loading flag, validation result) is deliberately left to the developer.

### 9.1 Buttons **[v2 — sizing reconciled with 5.1]**

**Variants**

- **Primary** — `bg-primary text-primary-fg`, `rounded-md`, `text-sm font-medium`, `px-4 py-2.5`. The one filled indigo button; one per view. Use for the single most important action (Create link, Save, Sign in).
- **Secondary** — `bg-surface text-fg border border-border-strong`. Neutral alternative actions (Cancel where not destructive, secondary CTAs).
- **Ghost** — transparent, `text-fg-muted`, hover `bg-surface-subtle`. Toolbar and low-emphasis actions (filters, table row actions).
- **Destructive** — `bg-danger text-white`. Delete link, delete account. Always paired with a confirm step for irreversible actions.
- **Link-style** — `text-primary` underline-on-hover, no padding. Inline text actions.
- **Icon button** — square (`size-9`), ghost or secondary skin, centered `size-5` Lucide icon, mandatory accessible name.

**Sizes:** sm (`px-3 py-1.5` — matches the corrected 5.1 control-padding table exactly, no divergence), md (default `px-4 py-2.5`), lg (`px-5 py-3`, marketing + mobile-primary).

**States**
| State | Treatment |
|---|---|
| Hover | Fill shifts one step (primary → `primary-hover`); ghost gains `bg-surface-subtle`. `transition-colors duration-150`. |
| Active/pressed | Fill one step darker again; optional `active:scale-[0.98]`. |
| Focus | Section 8.2 ring — `ring-offset-surface` for buttons inside cards/modals, `ring-offset-canvas` for header/sidebar-level buttons. |
| Disabled | `opacity-50 cursor-not-allowed`, no hover response. Do not also gray the text separately. |
| Loading | Label stays (or is replaced by "…"), a `size-4` spinner appears left of the label, button is non-interactive but keeps its width to avoid layout shift. Only one button loads at a time per form. |

**Rules:** primary and destructive are mutually exclusive in a single button group's emphasis — a destructive confirm dialog's confirm button _is_ the primary of that dialog. Never two filled indigo buttons side by side.

### 9.2 Inputs & selects

**Text input / textarea**

- `bg-surface border border-border-strong rounded-md px-3 py-2 text-sm`, label above (`text-sm font-medium`), helper/caption below (`text-xs text-fg-muted`).
- **Mono inputs** for alias/short-code/URL fields: `font-mono`, often with a prefix affordance showing the domain (`short.link/` in `text-fg-muted`) fused to the input's left edge.
- States: hover `border-border-strong`→ slightly darker; focus per Section 8.2 (ring + `border-primary`); disabled `bg-surface-subtle opacity-70`; **error** `border-danger` + error message in `text-danger text-xs` below + a `circle-alert` icon; **success** (e.g. alias available) `border-success` + `check` icon + confirming caption.
- Validation _display_ is specified here; _when_ validation fires is the developer's call.

**Select / dropdown field**

- Same box treatment as text input with a trailing `chevron-down` (`size-4 text-fg-muted`). Open state shows a `shadow-md rounded-lg` menu (Section 9.5). Selected item marked with a `check`.
- Use a native-feeling select for simple single choice; use the popover menu pattern for rich options (e.g. expiration presets with descriptions).

**Checkbox**

- `size-4 rounded border border-border-strong`. Checked: `bg-primary` with white `check`. Focus ring per Section 8.2. Indeterminate (table "select all" partial): `bg-primary` with a `minus` glyph. Label sits right, `text-sm`.

**Toggle (switch)**

- Track `rounded-full` `w-9 h-5`; knob `rounded-full size-4`. **[v2]** `w-9`/`h-5` are a documented exception to the canonical spacing subset (5.1) — a switch's track/knob proportions are a fixed, widely-recognized UI convention, not a spacing decision, so they're pinned exactly rather than approximated to the nearest canonical step. Off: track `bg-surface-subtle`, knob `bg-white`. On: track `bg-primary`, knob slides right. `transition-colors`/`transition-transform duration-200`. Use for instant on/off settings (link active/paused, "require password"). Use a checkbox instead when the choice only takes effect on form submit.

**Segmented control** (theme light/dark/system, analytics range 24h/7d/30d)

- A `bg-surface-subtle rounded-md` track holding equal-width options; the active segment gets `bg-surface shadow-xs text-fg`, inactive `text-fg-muted`. Keyboard: arrow keys move between segments.

### 9.3 Cards

**Link card** (mobile link list, and the hero result after creating a link)

- `bg-surface border border-border rounded-lg p-4`.
- Row 1: the short URL in `font-mono text-sm font-medium text-fg` + a copy icon button + status badge (right-aligned).
- Row 2: destination URL, `text-xs text-fg-muted truncate` with `external-link` icon.
- Row 3 (meta): click count (`tabular-nums`), created date, tag chips if present **[v2 — see 9.11]**, and a kebab menu for actions (edit, QR, copy, delete).
- Hover: `hover:border-border-strong hover:shadow-sm transition`. Selected (bulk mode): `ring-2 ring-primary` + `bg-primary`-tinted (`indigo-50`/`indigo-950`).
- Optional QR affordance: a small `qr-code` icon button that opens the QR popover/modal (states in Section 9.13 **[v2]**).

**Stat card** (dashboard KPIs: total clicks, total links, top link, CTR)

- `bg-surface border border-border rounded-lg p-4 sm:p-6`.
- Eyebrow label (overline style) → stat value (`text-3xl font-semibold tabular-nums`) → delta line (`text-xs`) with `trending-up`/`trending-down` icon colored `success`/`danger`.
- Never more than one accent color per stat card; the number itself stays `text-fg` — color lives only in the delta.

### 9.4 Tables

**Link list table** (`md`+)

- Container `bg-surface border border-border rounded-lg overflow-hidden`. Header row `bg-surface-subtle`, headers in overline style, `text-left`.
- Cells `px-4 py-3 text-sm`, `border-b border-border` between rows, last row borderless.
- Columns: (select checkbox) · Short link (mono, + copy) · Destination (truncate) · Status (badge) · Tags (chips, `lg`+ only) **[v2]** · Clicks (`tabular-nums`, right-aligned) · Created · Actions (kebab).
- Row states: hover `bg-surface-subtle`; selected `bg-primary`-tint + left `border-l-2 border-primary`; the whole row is a link to the detail page except for interactive cells.
- Sortable headers: clickable, show `chevron-up`/`chevron-down` for active sort. Sort _logic_ is out of scope; only the indicator visual is specified.

**Click-analytics table** (referrers, countries, devices on the analytics view)

- Same skin. Each row pairs a label with a count (`tabular-nums`, right-aligned) and an inline horizontal bar (`bg-accent`/`sky` at low opacity) whose width encodes share — a lightweight in-table bar chart. Top row emphasized.

**Empty / loading / long lists:** see 9.7–9.8. Pagination or "load more" _presentation_ uses a secondary button or numbered controls at the table foot; the paging mechanism is the developer's choice.

### 9.5 Modals, drawers, popovers, dropdowns

**Modal (dialog)**

- Centered, `bg-surface rounded-xl shadow-lg`, `max-w-md`/`max-w-lg`, `p-6`. Backdrop `bg-slate-950/50 backdrop-blur-sm`.
- Structure: title (H2) + optional `x` close button top-right → body → footer action row (right-aligned, secondary + primary). Destructive confirm: body states the irreversible consequence in plain language; primary button is the destructive variant.
- Behavior per Section 8.3 (focus trap, `Esc`, return focus). Enter/exit motion per Section 12.
- **Use for:** focused decisions and short forms (delete confirm, "Set password", QR code display, "Create link" on small screens).

**Drawer (side sheet)**

- Slides from the right, `bg-surface shadow-lg`, `w-full sm:max-w-md`, full height, `p-6`. Same backdrop and focus behavior as modal.
- **Use for:** longer contextual editing without leaving the current list — e.g. quick-edit a link's settings, or a filters panel (Section 9.11 **[v2]**, mobile). On mobile, several modal-scale interactions become full-height drawers instead.

**Popover**

- `bg-surface border border-border rounded-lg shadow-md p-4`, anchored to a trigger with a small offset. Non-modal (doesn't trap focus, closes on outside click / `Esc`).
- **Use for:** QR preview + download, copy-with-options, an inline date/expiration picker, truncated-URL full reveal.

**Dropdown menu**

- `bg-surface border border-border rounded-lg shadow-md py-1`, items `px-3 py-2 text-sm`, hover `bg-surface-subtle`, destructive items `text-danger`, section dividers `border-border`. Leading Lucide icon per item (`size-4`), optional trailing shortcut hint in `text-fg-subtle`.
- **Use for:** row kebab menus, the account/avatar menu, "Create" split actions (single link vs. bulk import, if the latter ever ships — currently only single-link creation is in scope **[v2 clarification]**).

### 9.6 Toasts / notifications **[v2 — stacking limit added]**

- Appear bottom-right (desktop) / bottom-full-width (mobile), stacked, `bg-surface border border-border rounded-lg shadow-lg p-4 max-w-sm`.
- Leading semantic icon + color: success `check-circle`/`success`, error `circle-alert`/`danger`, info `info`/`info`, warning `triangle-alert`/`warning`. A left `border-l-4` in the semantic color, or a colored icon — pick one, applied consistently.
- Contents: short title + optional one-line detail + optional single action (link-style button) + `x` dismiss.
- Auto-dismiss ~5s (success/info); errors persist until dismissed. Pause on hover/focus. Announced to assistive tech (Section 8.3).
- **Stacking limit:** a maximum of **3 toasts visible at once**; a 4th arrival collapses the stack into a single summary toast ("3 more notifications") rather than growing indefinitely down the screen. Errors are exempt from collapsing — an error toast always gets its own visible slot, pushing a success/info toast into the collapsed summary first.
- **Use for:** transient confirmations ("Link created", "Copied", "Link deleted — Undo"). Never for blocking errors that need a decision — those are inline or a modal.

### 9.7 Empty states

- Centered in the content region, `max-w-md`, `p-8`, `gap-4`: a `size-6`–scale Lucide icon in a `bg-surface-subtle rounded-full` circle → H2 headline → one-line `text-fg-muted` explanation → a single primary action.
- **Context-specific copy:**
  - No links yet: "Create your first short link" + Create button (this is the first-run hero moment; make it inviting, still no confetti).
  - No analytics data yet: explain data appears after the first click.
  - Empty search/filter: "No links match" + a clear-filters ghost action (distinct from the no-data-at-all state).
- Distinguish "nothing exists yet" (offer creation) from "nothing matched" (offer to clear filters) — never show the first-run CTA when a filter is simply too narrow.

### 9.8 Loading states — skeletons vs. spinners

Decision rule:

- **Skeletons** for _known-shape content that is arriving_: dashboard stat cards, the link list/table, analytics charts and tables, the link-detail page. Skeleton = `bg-surface-subtle rounded animate-pulse` blocks matching the real layout's boxes (so there's no layout shift on load). Use for initial page/region load.
- **Spinners** for _actions in progress with no predictable content_: button loading (inline `size-4` spinner, Section 9.1), inline "checking alias availability", copy/QR generation. Use when the wait is short and tied to a specific control.
- **Never** a full-page spinner for a data screen (use skeletons); **never** a skeleton for a button press (use a spinner).
- Charts loading: skeleton the plot area, keep axes/labels as placeholders **[v2 — see 9.14 for full chart spec]**.

### 9.9 Error & success states **[v2 — form-error banner now token-consistent]**

- **Field-level error:** Section 9.2 (red border, icon, message below). Preferred for form validation.
- **Form-level / section error:** an inline alert banner at the top of the form — `bg-danger-bg-subtle border border-danger-border text-danger-fg`, `circle-alert` icon, plain-language message and, when possible, how to fix it. **[v2]** This now pulls directly from the three-role token set defined in Section 3.4 instead of the informal `red-50`/`red-950` shorthand v1 used — same visual result, but now one documented source instead of a one-off. Not a toast.
- **Success (persistent):** after creating a link, the result surfaces as a prominent **link card** (9.3) with the short URL, copy, and QR — not merely a toast. Transient successes (copied, saved) use toasts.
- **Destructive success with undo:** "Link deleted" toast with an Undo action (the undo _window/behavior_ is the developer's concern; the affordance is specified here).
- **Page-level errors** (link failed to load, permission denied): centered message with an icon, plain explanation, and a recovery action (retry / back to dashboard). Reuse the empty-state layout with danger coloring. **[v2 — see 9.15 for the 401/403/404 distinction this was missing.]**

### 9.10 Password-protected-link interstitial (public)

The screen a _recipient_ sees when they open a password-gated short link. This is a first-class, standalone public page (Section 6.3 layout).

- **Layout:** centered single column, `max-w-md`, vertically centered, `bg-canvas`, honors system dark mode. Minimal branding (small wordmark top-center), no app chrome.
- **Card:** `bg-surface border border-border rounded-xl shadow-sm p-6 sm:p-8`, `gap-6`.
- **Contents, in order:**
  1. A `lock` icon in a `bg-surface-subtle rounded-full` circle (`size-6` icon), centered.
  2. H2: "This link is protected".
  3. One-line `text-fg-muted` explanation: a password is required to continue.
  4. A single password input (`type=password`) with a show/hide (`eye`/`eye-off`) toggle button, label "Password", `font-mono` value.
  5. Primary full-width button (`lg`, `py-3`): "Unlock".
  6. Below: subtle helper text; the _destination is never revealed_ before unlock.
- **States:**
  - Default: neutral.
  - Error (wrong password): input goes `border-danger`, a `text-danger text-xs` message ("Incorrect password") appears; button returns from loading to default. No lockout messaging unless one applies.
  - Loading: button spinner while the password is being checked.
  - **Rate-limited (too many attempts) [v2]:** input and button both go `disabled` (Section 9.1/9.2 disabled treatment); the error message is replaced with a `text-warning` (not `danger` — this isn't the visitor's fault in tone) message: "Too many attempts. Try again in [time]." No countdown-timer animation is specified — a static, periodically-updated string is sufficient; live-updating countdowns are a developer implementation choice.
  - Success: transitions to the normal redirect/interstitial (or navigates onward) — behavior only; not specified how.
- **Explicitly out of scope:** how the password is verified, attempt limiting/rate-limit logic, and how success proceeds to the destination. Those are implementation. This spec covers only the screen's appearance and its default/error/loading/rate-limited visuals.

**Related public screens** (same centered layout, swap icon + copy + color):

- **Redirect/interstitial:** brand mark, "Redirecting you…", a subtle progress/spinner, and a manual "Continue" link. Optionally the destination shown for transparency.
- **Expired link:** `clock`/`calendar-x` icon in `danger`, "This link has expired", no action or a "Create your own" CTA to the marketing site.
- **Not found (404):** neutral, "This link doesn't exist", link to home.
- **Forbidden / removed (403) [v2]:** `shield-alert` icon in `fg-muted` (deliberately _not_ danger-red — this isn't an error the visitor caused), "This link is no longer available", link to home. Distinguished from 404 in copy only ("doesn't exist" vs. "no longer available") since recipients should never be told _why_ a link was taken down (owner-deleted vs. moderation vs. other).

### 9.11 Filter bar (link list) **[v2 — new]**

Addresses the gap where global search was specified (Section 11.1) but no way to narrow the link list by attribute existed, despite an "empty search/filter" state already being named in 9.7.

- **Desktop (`md`+):** an inline bar directly above the table — `flex items-center gap-2`, sitting in the same row as the table's top edge or immediately above it. Contains: a search input (icon-prefixed, `w-64`), a status filter (segmented control or dropdown: All / Active / Expiring soon / Expired / Paused), a date-range popover trigger ("Created: any time"), and a tag filter (multi-select dropdown, Section 9.2's popover-menu pattern). Each active filter beyond search renders as a small dismissible pill (`rounded-full bg-primary`-tint, `text-xs`, with an `x`) to the right of the controls, so active filters are always visibly scannable, not hidden inside open dropdowns.
- **Mobile (base–`sm`):** collapses to a single `ghost` "Filters" button with a `filter` icon and a count badge (e.g. "Filters (2)") if any are active. Tapping it opens a **drawer** (9.5) containing the same controls stacked vertically, with "Clear all" and "Apply" actions in the footer.
- **Clearing:** a single "Clear filters" link-style action appears once any filter (not counting an empty search box) is active, positioned at the end of the filter bar (desktop) or in the drawer footer (mobile).
- This is distinct from **sorting** (9.4, header-driven) — filtering narrows the row set, sorting reorders it. Both can be active simultaneously.

### 9.12 Bulk-action toolbar **[v2 — new]**

Addresses the gap where bulk-select checkboxes were specified (6.2, 9.4) with no defined UI for what happens once rows are selected.

- **Trigger:** the moment 1+ row checkboxes are checked (table, `lg`+ only — bulk mode is not offered on the card-based mobile/tablet list).
- **Placement:** replaces the table's filter bar (9.11) in place, rather than appearing as a second bar — same vertical slot, so the layout doesn't jump. `bg-primary`-tint background (`indigo-50`/`indigo-950`), `rounded-lg`, `px-4 py-3`, `flex items-center justify-between`.
- **Contents:** left side — a count ("3 selected") + a "Clear selection" link-style action. Right side — action buttons: `secondary` "Add tag", `secondary` "Pause", `destructive` "Delete". Delete always opens the standard destructive confirm modal (9.5, 9.9) naming the count ("Delete 3 links? This can't be undone.") — never a silent bulk delete.
- **Select-all:** the header checkbox selects all rows on the _current page_ only; if a "select all N matching filters" affordance is offered, it appears as a link-style prompt beneath the toolbar ("Select all 47 links matching these filters") — this is a judgment call the developer can skip entirely for a v1 without it being a spec violation, since the per-page bulk toolbar alone satisfies the feature.

### 9.13 QR code component states **[v2 — new]**

The QR affordance was named in 9.3 and 11.5 without its own state spec.

- **Trigger:** the `qr-code` icon button on a link card, table row, or link-detail page opens a **popover** (9.5) anchored to the trigger, or a **modal** on mobile.
- **Default:** the QR image renders at a fixed `size-40`–`size-48` inside a `bg-white rounded-lg border border-border p-3` frame (QR codes need a plain white quiet-zone regardless of app theme — this is one of the rare places `bg-white` is used unconditionally instead of `bg-surface`, since a dark-mode-tinted background can break scanner contrast). Below it: the destination short URL in `font-mono text-xs text-fg-muted`, and two actions — `secondary` "Download PNG" and a `ghost` "Copy image" (if supported).
- **Loading:** while the QR is being generated, a `size-40`/`size-48` skeleton block (9.8) sits in the same frame — never a spinner here, since the shape is fully predictable.
- **Error:** if generation fails, the frame shows a `circle-alert` icon in `danger`, "Couldn't generate QR code", and a `ghost` "Retry" button — the popover/modal stays open rather than closing on failure.

### 9.14 Analytics chart component **[v2 — new]**

The time-series chart (11.6) and in-table bar charts (9.4) were named without a shared visual spec.

- **Primary chart type:** a single-series **area chart** (line + low-opacity fill beneath) for the clicks-over-time view — an area fill reads more quickly as "volume over time" than a bare line at a glance, which fits the density-first philosophy (Section 1).
- **Color:** the line/fill uses `--color-accent` (`sky`), never `primary` (`indigo`) — reserving indigo for actions/selection per Section 2's restraint rule.
- **Axes:** `text-xs text-fg-muted`, gridlines `stroke-border` at low opacity, no chart border/frame (the card border is the frame).
- **Tooltip:** on hover/focus of a data point, a small `bg-surface border border-border rounded-md shadow-md p-2 text-xs` tooltip shows the exact value + date, positioned above the point with a small pointer/caret.
- **Legend:** only shown if a chart ever has 2+ series (not currently in scope for this app's single-metric time series) — omit entirely for the single-series case to reduce chrome.
- **Loading:** skeleton the plot area as a flat `bg-surface-subtle animate-pulse rounded` block sized to the chart's aspect ratio, with the axis labels rendered as their real (static) placeholder text rather than also skeletonized — per 9.8's existing rule, now made concrete for this component specifically.
- **Empty (no clicks yet):** replace the chart entirely with the empty-state pattern (9.7)'s "no analytics data yet" variant — never render an empty/flat-line chart, since a flat line at zero can misread as "the metric is zero and stable" rather than "no data exists."

### 9.15 Page-level error distinction: 401 / 403 / 404 **[v2 — new]**

v1's "page-level errors" rule (9.9) funneled every non-2xx page failure into one generic pattern. These three need distinct copy and icon (structure and layout stay identical — this is a content/icon change, not a new layout):

| Case                               | Icon/color                                                                   | Headline                        | Recovery action                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| 401 — not authenticated            | `lock` / `fg-muted`                                                          | "Sign in to continue"           | Primary button → sign-in page (preserving intended destination is a developer concern) |
| 403 — authenticated, not permitted | `shield-alert` / `fg-muted` (not danger — the user didn't do anything wrong) | "You don't have access to this" | Secondary button → back to dashboard                                                   |
| 404 — doesn't exist                | `search-x` / `fg-muted`                                                      | "We couldn't find that"         | Secondary button → back to dashboard                                                   |

None of these three use `danger` (red) coloring — red is reserved for states that are genuinely alarming or destructive (Section 3.5); an access or existence mismatch is routine navigation friction, not an error the interface should visually escalate.

---

## 10. Navigation & information architecture

Sitemap-level structure only. No routing/URL scheme is prescribed here (that's the developer's), only the _screens_ and how they relate.

**Public (unauthenticated, recipient-facing)**

- Redirect / interstitial
- Password-protected gate (Section 9.10)
- Expired-link page
- Not-found page
- Forbidden/removed page **[v2 — see 9.15]**

**Marketing (unauthenticated, visitor-facing)**

- Landing / home
- (Pricing, features, etc. — same marketing template; not enumerated)

**Auth**

- Sign in — email/password **and** "Continue with Google" (OAuth). Google button is a secondary/neutral button with the Google mark and clear separation ("or") from the email form.
- Sign up — same pattern.
- Forgot / reset password **[v2 — now specified, see 10.1]**
- Account-linking conflict **[v2 — new, see 10.2]**
- (OAuth callback is a transient loading screen — spinner + brand, no chrome)

**Authenticated app** (behind the sidebar)

- **Dashboard** — overview: KPI stat cards + recent links + quick "Create link".
- **Links** — the full link list/table; the primary working surface. Create-link entry point (opens modal on mobile / inline or drawer on desktop). Includes the filter bar (9.11) and bulk-action toolbar (9.12).
- **Link detail / edit** — a single link: its short URL + QR, destination, settings (custom alias, password, expiration, active/paused, tags), and a focused analytics summary for that link.
- **Analytics** — cross-link analytics: time-series clicks, and breakdown tables (referrers, countries, devices, top links).
- **Account / settings** — profile, theme preference (light/dark/system), connected accounts (Google) with disconnect flow **[v2 — see 10.3]**, and destructive account actions.

**Primary navigation:** the sidebar (Section 11) holds Dashboard, Links, Analytics, Settings. The avatar menu (top-right) holds account, theme, sign-out. Create-link is a persistent primary button in the app header, not a nav item.

**Depth rule:** the app is intentionally shallow — no more than two levels deep from the dashboard (list → detail). Analytics is reachable both globally (nav) and scoped (from a link's detail).

### 10.1 Password reset flow **[v2 — new]**

Three sequential screens, each using the standard auth-page template (11.3):

1. **Request reset** — a single email input + primary "Send reset link" button. On submit, regardless of whether the email exists (a security convention, not a design one — the visual is identical either way), transitions to a confirmation state: a `check-circle`/`success` icon, "Check your email", "If an account exists for that address, we've sent a reset link" — deliberately non-committal copy so the screen can't be used to enumerate registered emails.
2. **Set new password** (reached via emailed link) — one password input + one confirm-password input, both following the standard input error states (9.2), primary "Reset password" button.
3. **Confirmation** — `check-circle`/`success` icon, "Password updated", primary button "Sign in".

An expired/invalid reset link reuses the expired-link public-page pattern (9.10's "related public screens") with copy adjusted to "This reset link has expired or was already used" + a link back to step 1.

### 10.2 Account-linking conflict screen **[v2 — new]**

Addresses the gap in dual-auth handling: what a user sees if they attempt Google sign-in with an email that already has a password-based account (or vice versa).

- **Layout:** standard auth-page template (11.3), not a modal — this is a full navigation stop, since it requires a decision, not a quick dismissal.
- **Contents:** an `info` (not danger — this isn't an error, it's a routine collision) icon, H2 "An account already exists for this email", one-line explanation ("[email] is already registered with a password. Sign in with your password to link Google to this account, or use a different Google account.") Two actions: primary "Sign in with password" (routes to standard sign-in, email pre-filled) and a `ghost`/link-style "Use a different Google account".
- **Explicitly out of scope:** the actual linking logic (does signing in with the password then automatically attach the Google identity to the same row, or does it require a separate explicit "link accounts" confirmation afterward) — that's a backend/auth-flow decision, not a screen the design system can dictate. The screen above assumes linking happens automatically after password sign-in; if the developer instead requires an explicit post-signin confirmation step, that's one additional small confirmation dialog (9.5 pattern), not a new screen type.

### 10.3 Disconnect OAuth provider (Settings) **[v2 — new]**

- In Account Settings, a "Connected accounts" section lists each linked provider as a row: provider icon + name + connected email, right-aligned `secondary` "Disconnect" button.
- Disconnecting always opens the standard destructive-adjacent confirm modal (9.5) — even though disconnecting isn't data-destroying, it can lock the user out, so it gets the same friction as a destructive action, just without the `destructive` red button variant (the confirm button here stays `primary`, not `danger`, since nothing is being deleted).
- **Guard case:** if the account has _no_ password set (pure OAuth signup) and this is their only connected provider, the "Disconnect" button is `disabled` with an inline `text-xs text-fg-muted` note beneath the row: "Set a password before disconnecting your only sign-in method" + a link-style "Set password" action — preventing a user from locking themselves out entirely.

---

## 11. Page layouts / templates

Each template is described as **layout regions** and how they recompose across breakpoints (Section 6).

### 11.1 App shell (all authenticated pages)

- **Regions:** left **sidebar** (nav) · top **header** (page title / breadcrumb, global search, Create-link button, avatar menu) · **content** · no persistent footer.
- **`lg`+:** sidebar docked (`w-60`), header sticky (`shadow-xs` on scroll), content `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Below `lg`:** sidebar collapses to an off-canvas drawer opened by a hamburger in the header; header stays; Create-link may collapse to an icon button.
- **Initial app load [v2]:** while the authenticated shell is first determining session validity (before the dashboard or any page content is known to be reachable), show the sidebar/header chrome immediately (it's static) with the content region skeletoned (9.8) — never a full-page blank/spinner, since the shell itself is never in doubt, only the data within it.

### 11.2 Landing / marketing

- **Regions:** top nav (logo left, links center/right, "Sign in" + "Get started" CTAs) · hero (display headline + subhead + primary CTA + a "shorten a link" demo input) · feature sections · footer (multi-column links, legal).
- Uses the comfortable spacing scale (`py-16 md:py-24`, `gap-6`), `text-base` body, `max-w-6xl` sections. Single-column stack on mobile → multi-column feature grids at `md`/`lg`.

### 11.3 Auth pages

- **Regions:** centered card (`max-w-md`) on `bg-canvas`, optional brand mark above. Card holds the form; email/password fields + primary submit, an "or" divider, and the Google OAuth button.
- Same centered treatment at all breakpoints; only whitespace grows. No app shell.
- Also used for: forgot/reset password (10.1) and the account-linking conflict screen (10.2) — same template, different body content.

### 11.4 Dashboard

- **Regions (within the app shell content):** page title row (H1 + Create-link) → KPI stat-card grid → recent-links section (link list preview) → optional analytics summary.
- Stat grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-4`. Sections `space-y-6`/`space-y-8`.

### 11.5 Link detail / edit

- **Regions:** back link + title (the short URL, mono) → a two-column layout at `lg` (left: settings form — destination, alias, password toggle, expiration, active/paused, tags; right: the QR code card + share/copy actions and a link-scoped stat summary). Stacks to one column below `lg`, QR card first.
- Content capped at `max-w-3xl` (single column) / wider when two-column.

### 11.6 Analytics view

- **Regions:** header with a time-range **segmented control** (24h/7d/30d/custom) → a full-width time-series chart card (9.14) → a responsive grid of breakdown tables (referrers, countries, devices) using the in-table bar pattern (9.4).
- Chart card full-width at all sizes; breakdown grid `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`, `gap-4`.

---

## 12. Interaction & motion

Motion is functional: it explains a change of state or location, and it's fast. Nothing bounces, nothing decorates.

**Duration & easing (Tailwind utilities)**

- **Micro / color feedback** (hover, focus, toggle): `transition-colors duration-150 ease-out`. This is the default for buttons, links, rows, inputs.
- **Small transforms** (toggle knob, chevron rotate, checkbox check): `transition-transform duration-200 ease-out`.
- **Overlays** (modal, drawer, popover, dropdown enter/exit): `duration-200` in, `duration-150` out, `ease-out`. Modals fade + scale slightly (`from opacity-0 scale-95` → `opacity-100 scale-100`); drawers slide (`translate-x-full` → `translate-x-0`); dropdowns/popovers fade + small `translate-y`/`scale`.
- **Toasts:** enter slide-up + fade (`duration-200`), exit fade + slight slide (`duration-150`).
- **Skeletons:** `animate-pulse` only.
- Nothing in the product uses a duration above `300ms`. Marketing hero may use gentle scroll-reveal at `duration-300`–`500`; the app does not.

**Where micro-interactions belong**

- **Hover:** buttons/links/rows shift background or border (color transition only); cards gain `shadow-sm` + border-color. Cursor communicates affordance.
- **Active/pressed:** optional `active:scale-[0.98]` on buttons; immediate, no easing lag.
- **Copy interaction:** the copy icon swaps to `check` (success color) for ~1.5s then reverts — the primary success signal, backed by a toast.
- **Open/close:** modals, drawers, dropdowns, popovers animate per above; focus movement (Section 8.3) is instantaneous, not animated.
- **Loading:** spinners (`animate-spin`) and skeletons (`animate-pulse`) per Section 9.8.

**Reduced motion:** honor `prefers-reduced-motion` via the `motion-reduce:` variant — `motion-reduce:transition-none` and `motion-reduce:animate-none` on animated elements; overlays still change state (opacity swap), just without transform/slide.

**Not specified (implementation):** what _triggers_ a transition (when the modal opens, when the toast appears) and any orchestration/sequencing logic — those are the developer's, as is whether a library or CSS drives them.

---

## 13. Naming conventions

Keep the system legible as new screens are added.

**Tailwind config (`@theme`) extensions**

- **Colors:** only the semantic aliases in Section 3.4 are added (`--color-primary`, `--color-fg`, `--color-danger`, `--color-danger-bg-subtle`, …). Do **not** rename or fork Tailwind's default palette (`indigo`, `slate` stay as-is and remain usable). Semantic names describe _role_, never appearance — use `--color-danger`, never `--color-red-button`.
- **Fonts:** `--font-sans`, `--font-mono` only (Section 4).
- **No other extensions by default.** Spacing, radius, shadow, and breakpoints use Tailwind defaults verbatim (Sections 5–6), with the toggle-track exception noted in 9.2. If a genuinely product-specific value is unavoidable, add it as a _named_ theme extension (e.g. `--spacing-sidebar: … ; --width-sidebar: …`) with a comment stating why the default scale didn't suffice — never an inline arbitrary value scattered across components.
- **The `@theme` file is the single source of truth.** A palette or type change happens there and propagates through the semantic utilities.

**Component & screen naming** (for organizing mockups and, later, the developer's components)

- **PascalCase** for components, named by _role_ not appearance: `LinkCard`, `StatCard`, `LinkTable`, `PasswordGate`, `CreateLinkModal`, `AnalyticsRangeControl`, `EmptyState`, `Toast`, `FilterBar`, `BulkActionToolbar`, `QrCodePopover` **[v2 additions]**.
- **Variant suffixes** describe purpose, not style: `Button` with variants `primary` / `secondary` / `ghost` / `destructive` (not `BlueButton`).
- **State via variant, not name:** there is no `LinkCardHover` — hover is a state of `LinkCard`. Names describe _what a thing is_, styling describes _how it looks in a state_.
- **Screens** mirror the IA (Section 10): `Dashboard`, `LinksList`, `LinkDetail`, `Analytics`, `SignIn`, `SignUp`, `ForgotPassword`, `ResetPassword`, `AccountLinkConflict`, `RedirectInterstitial`, `PasswordGate`, `ExpiredLink`, `NotFound`, `Forbidden`, `Settings`, `Landing` **[v2 additions in italics-equivalent: the four new screen names]**.
- **Icons** are referenced by their Lucide name (`link-2`, `qr-code`, `lock`) so there's one unambiguous mapping.

**Consistency rule of thumb:** before adding a new color, size, or radius, check whether an existing semantic token or canonical scale step already expresses the intent. New primitives are added only when a real need can't be named with the existing system — and when they are, they're added to `@theme` with a comment, not improvised in markup.

---

### Appendix — quick reference

- **Fonts:** Geist Sans (UI) · Geist Mono (URLs, codes, aliases, QR data).
- **Palette:** slate (neutral) · indigo (primary) · emerald (success) · red (danger) · amber (warning) · sky (info/accent).
- **Body default:** `text-sm`. **Page title:** `text-3xl font-semibold tracking-tight`. **Stat value:** `text-3xl font-semibold tabular-nums`.
- **Spacing subset:** `1 1.5 2 2.5 3 4 6 8 12 16 24` **[v2 — widened]**. **Gutter:** `px-4 sm:px-6 lg:px-8`.
- **Radius:** control `rounded-md` · card `rounded-lg` · modal `rounded-xl` · pill/tag `rounded-full`.
- **Elevation:** flat = border, float = `shadow-md`, overlay = `shadow-lg`.
- **Focus:** `focus-visible:ring-2 ring-primary ring-offset-2`, offset color matches immediate background (`canvas` or `surface`) **[v2]**.
- **Motion:** `transition-colors duration-150` default; overlays `duration-200` in / `150` out; nothing over `300ms`.
- **Sidebar appears at `lg`.** Public pages: centered `max-w-md`, system dark mode.
- **New in v2:** filter bar (9.11), bulk-action toolbar (9.12), QR states (9.13), chart spec (9.14), 401/403/404 distinction (9.15), password-reset flow (10.1), account-link conflict (10.2), OAuth disconnect guard (10.3).
