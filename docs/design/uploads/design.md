# Design System — Click Scope (Link Shortener)

A design specification for a Bitly-style URL-shortening web application: link creation, custom aliases, QR codes, password-protected links, expiration rules, an analytics dashboard, and email/password + Google OAuth sign-in.

**Audience for this document**

- **Google Stitch** — to generate UI mockups from these visual and interaction rules.
- **A human developer** — who will hand-write all component logic, state, and data fetching. This document specifies _appearance and behavior only_; it does not prescribe implementation.

**Framework baseline**

- **Tailwind CSS v4**, utility-first, CSS-first configuration (`@theme` block, no parallel design-token layer to translate later).
- Every value below is stated as a real Tailwind primitive: a default spacing step, a default palette shade, a default breakpoint, or a utility class. If a rule can't be expressed in Tailwind's own vocabulary, it isn't in this system.
- Colors reference Tailwind v4's default oklch palette (`--color-slate-600`, `--color-indigo-500`, etc.). Semantic tokens are thin aliases over those families.

> **Scope guardrails.** No component code, no framework, no state or data-fetching. Where a decision is genuinely implementation-level (how a component knows which row is selected, how the theme preference is persisted, how a form validates), this document says so and stops. Those are the developer's calls.

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
- Consistent metaphors: `link-2` for links, `qr-code` for QR, `lock` for password protection, `clock`/`calendar-clock` for expiration, `bar-chart-3` for analytics, `copy`/`check` for the copy interaction, `external-link` for outbound, `trash-2` destructive, `ellipsis`/`ellipsis-vertical` for row menus.

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

### 3.4 Semantic tokens

Each semantic color exposes a small, consistent set of roles: `fg` (text/icon on a neutral surface), `bg-subtle` (tinted container), `border`, and `solid` (filled emphasis, e.g. a status dot or destructive button). Defined once as aliases:

```css
/* app.css — the single source of truth for tokens */
@theme {
  /* Brand */
  --color-primary: var(--color-indigo-600);
  --color-primary-hover: var(--color-indigo-700);
  --color-primary-fg: var(--color-white); /* text/icon on a primary fill */

  /* Accent (data + info) */
  --color-accent: var(--color-sky-500);

  /* Semantic — solids */
  --color-success: var(--color-emerald-600);
  --color-danger: var(--color-red-600);
  --color-warning: var(--color-amber-500);
  --color-info: var(--color-sky-600);

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

Dark theme re-points the _surface and text_ tokens (semantics shift up one step for contrast on dark surfaces):

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
  --color-danger: var(--color-red-500);
  --color-warning: var(--color-amber-400);
  --color-info: var(--color-sky-500);
}
```

This makes `bg-primary`, `text-danger`, `border-border`, `bg-surface`, and their `dark:`-aware counterparts available as utilities with no per-element dark overrides needed for color.

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

### 5.1 Spacing (padding, margin, gap)

Canonical steps: **`1, 2, 3, 4, 6, 8, 12, 16, 24`** (= 0.25rem … 6rem). Skip the in-between steps (`5, 7, 9, 10, 11, 14, 20`) unless a documented exception applies.

| Context                               | Value                                     | Rule                                                 |
| ------------------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Icon ↔ label gap, chip padding        | `gap-1.5` / `gap-2`                       | Tight pairing.                                       |
| Control inner padding (button, input) | `px-3 py-2` (sm) · `px-4 py-2.5` (md)     | Consistent across all form controls at a given size. |
| Card / panel padding                  | `p-4` (dense) · `p-6` (comfortable)       | Data cards `p-4`; marketing/empty `p-6`.             |
| Stack gap inside a card               | `gap-3` / `space-y-3`                     | Between fields, list items.                          |
| Gap between cards / grid              | `gap-4` (dashboard) · `gap-6` (marketing) |                                                      |
| Section vertical rhythm (page)        | `space-y-6` / `space-y-8`                 | Between major page sections.                         |
| Page gutter                           | `px-4 sm:px-6 lg:px-8`                    | Standard responsive gutter everywhere.               |
| Section vertical padding (marketing)  | `py-16 md:py-24`                          |                                                      |

### 5.2 Sizing

- **Content max width:** dashboard content `max-w-7xl mx-auto`; forms/auth `max-w-md`; link-detail column `max-w-3xl`; marketing sections `max-w-6xl`.
- **Control heights** (via padding + line-height, not fixed `h-*` unless icon-only): small `~32px` (`py-1.5`), medium `~40px` (`py-2.5`), large `~44px` (`py-3`, primary CTAs and mobile targets). See Section 8 for the 44px hit-target floor.
- **Icon-only button:** `size-9` (md) with a centered `size-5` icon; `size-11` on touch-primary contexts.
- **Avatar:** `size-8` in nav, `size-10` in menus.
- **Sidebar width:** `w-60` expanded, `w-16` collapsed (icon-only).

### 5.3 Radius

Radius encodes hierarchy — bigger surface, bigger radius. Canonical: **`rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`**.

| Element                           | Radius                                         |
| --------------------------------- | ---------------------------------------------- |
| Button, input, select, badge      | `rounded-md`                                   |
| Checkbox                          | `rounded` (small); toggle track `rounded-full` |
| Card, panel, stat card, link card | `rounded-lg`                                   |
| Modal, drawer, large surface      | `rounded-xl`                                   |
| Popover, dropdown menu, tooltip   | `rounded-lg`                                   |
| Avatar, status dot, pill filter   | `rounded-full`                                 |
| QR code image container           | `rounded-lg`                                   |

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

- **Base:** the table is _not_ a table — each link renders as a **link card** (Section 9): short URL + destination, status badge, click count, and a kebab menu. Vertical list, `space-y-3`.
- **`md`:** switch to a true table with columns (short link, destination, clicks, status, created, actions). Column headers use the overline style.
- **`lg`+:** add secondary columns that were hidden on `md` (e.g. last-click, tags). Bulk-select checkboxes column appears.
- Row density stays compact (`py-3` cells) at every size.

### 6.3 Public redirect / interstitial pages

These are seen by _recipients_, not account holders — unknown device, must be fast and centered.

- **All breakpoints:** single centered column, `max-w-md`, vertically centered in the viewport, generous `p-6`/`p-8`. No app chrome, no sidebar. This applies to: the countdown/redirect interstitial, the password-protected gate (Section 9), the expired-link page, and the not-found page.
- Scale up only the whitespace and (on the interstitial) the QR/brand mark; the content column width stays fixed for focus.
- These pages must render legibly with zero JS layout dependency and honor system dark mode.

---

## 7. Light / dark theme tokens

**Model:** a single `dark` class on the root element flips a set of CSS variables; every color utility resolves through the semantic aliases from Section 3.4, so nothing in markup needs a hand-written `dark:` color override for standard surfaces and text.

- **Token layer:** `@theme` defines the light values; a `.dark { … }` block re-points the surface/text/semantic variables (Section 3.4). Tailwind's `dark:` variant is configured to key off the `.dark` class (`@variant dark (&:where(.dark, .dark *))`).
- **What flips automatically:** `bg-canvas`, `bg-surface`, `bg-surface-subtle`, `text-fg`, `text-fg-muted`, `border-border`, and every semantic (`bg-primary`, `text-danger`, …). Components authored against these aliases are theme-correct with no extra classes.
- **When to still write `dark:` in markup:** only for the handful of _non-color_ or _shade-specific_ adjustments the tokens can't express — e.g. adding `dark:ring-1 dark:ring-white/10` to carry elevation on dark surfaces, or reducing an image/illustration opacity (`dark:opacity-90`). These are the exception, not the pattern.
- **Public pages** honor the recipient's OS preference by default (the redirect/interstitial/password pages read system preference); authenticated app theme follows the user's chosen setting.

**Out of scope (implementation).** How the choice is stored, how it's read on first paint to avoid a flash, and how the toggle control wires up are the developer's decisions. This document specifies only: (a) the token structure above, (b) that a `light` / `dark` / `system` three-way choice should be _offered_ in account settings, and (c) the visual spec of the toggle control itself (Section 9, segmented control).

---

## 8. Accessibility

Target: **WCAG 2.2 AA**.

### 8.1 Contrast — verified semantic pairings

All pairings below meet AA (≥4.5:1 for normal text, ≥3:1 for large text / UI boundaries). Use these approved combinations; do not invent new fg/bg pairs.

| Pairing                      | Context                                  | Meets         |
| ---------------------------- | ---------------------------------------- | ------------- |
| `slate-900` on `white`       | Primary text, light                      | AA (normal)   |
| `slate-600` on `white`       | Secondary text, light                    | AA (normal)   |
| `slate-400` on `white`       | Muted text — **large/UI only**, not body | AA (large/UI) |
| `slate-50` on `slate-950`    | Primary text, dark                       | AA (normal)   |
| `slate-400` on `slate-950`   | Secondary text, dark                     | AA (normal)   |
| `white` on `indigo-600`      | Primary button, light                    | AA (normal)   |
| `white` on `red-600`         | Destructive button                       | AA (normal)   |
| `white` on `emerald-600`     | Success solid                            | AA (normal)   |
| `slate-900` on `amber-400`   | Warning solid — **dark text required**   | AA (normal)   |
| `indigo-700` on `indigo-50`  | Selected/active tint, light              | AA (normal)   |
| `indigo-300` on `indigo-950` | Selected/active tint, dark               | AA (normal)   |

Rules:

- **Never** put white text on `amber` — warning fills always take `slate-900` text.
- Muted `slate-400` text is only permissible for large text (≥18.66px bold / 24px) or non-essential metadata; body and labels use `slate-600`+ / `slate-400`+ (dark).
- Status conveyed by color is always **also** conveyed by an icon and/or text label (never color alone) — colorblind-safe.
- Placeholder text is never the only label; every input has a persistent visible label.

### 8.2 Focus

- **Focus is always visible and uses `focus-visible:`**, never bare `focus:` (so mouse clicks don't ring).
- Canonical focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`.
- On dark: ring offset resolves to `canvas` (`slate-950`) automatically via the token, so the ring reads on both themes.
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

---

## 9. Component library

Each component is specified as **appearance + states + usage rules**. No code. "State" means the visual treatment for: default, hover, active/pressed, focus (per Section 8.2), disabled, and — where applicable — loading, error, and selected. How a component _knows_ its state (selected row, loading flag, validation result) is deliberately left to the developer.

### 9.1 Buttons

**Variants**

- **Primary** — `bg-primary text-primary-fg`, `rounded-md`, `text-sm font-medium`, `px-4 py-2.5`. The one filled indigo button; one per view. Use for the single most important action (Create link, Save, Sign in).
- **Secondary** — `bg-surface text-fg border border-border-strong`. Neutral alternative actions (Cancel where not destructive, secondary CTAs).
- **Ghost** — transparent, `text-fg-muted`, hover `bg-surface-subtle`. Toolbar and low-emphasis actions (filters, table row actions).
- **Destructive** — `bg-danger text-white`. Delete link, delete account. Always paired with a confirm step for irreversible actions.
- **Link-style** — `text-primary` underline-on-hover, no padding. Inline text actions.
- **Icon button** — square (`size-9`), ghost or secondary skin, centered `size-5` Lucide icon, mandatory accessible name.

**Sizes:** sm (`px-3 py-1.5`), md (default `px-4 py-2.5`), lg (`px-5 py-3`, marketing + mobile-primary).

**States**
| State | Treatment |
|---|---|
| Hover | Fill shifts one step (primary → `primary-hover`); ghost gains `bg-surface-subtle`. `transition-colors duration-150`. |
| Active/pressed | Fill one step darker again; optional `active:scale-[0.98]`. |
| Focus | Section 8.2 ring. |
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

- Track `rounded-full` `w-9 h-5`; knob `rounded-full size-4`. Off: track `bg-surface-subtle`, knob `bg-white`. On: track `bg-primary`, knob slides right. `transition-colors`/`transition-transform duration-200`. Use for instant on/off settings (link active/paused, "require password"). Use a checkbox instead when the choice only takes effect on form submit.

**Segmented control** (theme light/dark/system, analytics range 24h/7d/30d)

- A `bg-surface-subtle rounded-md` track holding equal-width options; the active segment gets `bg-surface shadow-xs text-fg`, inactive `text-fg-muted`. Keyboard: arrow keys move between segments.

### 9.3 Cards

**Link card** (mobile link list, and the hero result after creating a link)

- `bg-surface border border-border rounded-lg p-4`.
- Row 1: the short URL in `font-mono text-sm font-medium text-fg` + a copy icon button + status badge (right-aligned).
- Row 2: destination URL, `text-xs text-fg-muted truncate` with `external-link` icon.
- Row 3 (meta): click count (`tabular-nums`), created date, and a kebab menu for actions (edit, QR, copy, delete).
- Hover: `hover:border-border-strong hover:shadow-sm transition`. Selected (bulk mode): `ring-2 ring-primary` + `bg-primary`-tinted (`indigo-50`/`indigo-950`).
- Optional QR affordance: a small `qr-code` icon button that opens the QR popover/modal.

**Stat card** (dashboard KPIs: total clicks, total links, top link, CTR)

- `bg-surface border border-border rounded-lg p-4 sm:p-6`.
- Eyebrow label (overline style) → stat value (`text-3xl font-semibold tabular-nums`) → delta line (`text-xs`) with `trending-up`/`trending-down` icon colored `success`/`danger`.
- Never more than one accent color per stat card; the number itself stays `text-fg` — color lives only in the delta.

### 9.4 Tables

**Link list table** (`md`+)

- Container `bg-surface border border-border rounded-lg overflow-hidden`. Header row `bg-surface-subtle`, headers in overline style, `text-left`.
- Cells `px-4 py-3 text-sm`, `border-b border-border` between rows, last row borderless.
- Columns: (select checkbox) · Short link (mono, + copy) · Destination (truncate) · Status (badge) · Clicks (`tabular-nums`, right-aligned) · Created · Actions (kebab).
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
- **Use for:** longer contextual editing without leaving the current list — e.g. quick-edit a link's settings, or a filters panel. On mobile, several modal-scale interactions become full-height drawers instead.

**Popover**

- `bg-surface border border-border rounded-lg shadow-md p-4`, anchored to a trigger with a small offset. Non-modal (doesn't trap focus, closes on outside click / `Esc`).
- **Use for:** QR preview + download, copy-with-options, an inline date/expiration picker, truncated-URL full reveal.

**Dropdown menu**

- `bg-surface border border-border rounded-lg shadow-md py-1`, items `px-3 py-2 text-sm`, hover `bg-surface-subtle`, destructive items `text-danger`, section dividers `border-border`. Leading Lucide icon per item (`size-4`), optional trailing shortcut hint in `text-fg-subtle`.
- **Use for:** row kebab menus, the account/avatar menu, "Create" split actions.

### 9.6 Toasts / notifications

- Appear bottom-right (desktop) / bottom-full-width (mobile), stacked, `bg-surface border border-border rounded-lg shadow-lg p-4 max-w-sm`.
- Leading semantic icon + color: success `check-circle`/`success`, error `circle-alert`/`danger`, info `info`/`info`, warning `triangle-alert`/`warning`. A left `border-l-4` in the semantic color, or a colored icon — pick one, applied consistently.
- Contents: short title + optional one-line detail + optional single action (link-style button) + `x` dismiss.
- Auto-dismiss ~5s (success/info); errors persist until dismissed. Pause on hover/focus. Announced to assistive tech (Section 8.3).
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
- Charts loading: skeleton the plot area, keep axes/labels as placeholders.

### 9.9 Error & success states

- **Field-level error:** Section 9.2 (red border, icon, message below). Preferred for form validation.
- **Form-level / section error:** an inline alert banner at the top of the form — `bg-danger`-tinted (`red-50`/`red-950`), `border border-danger/30`, `text-danger`, `circle-alert` icon, plain-language message and, when possible, how to fix it. Not a toast.
- **Success (persistent):** after creating a link, the result surfaces as a prominent **link card** (9.3) with the short URL, copy, and QR — not merely a toast. Transient successes (copied, saved) use toasts.
- **Destructive success with undo:** "Link deleted" toast with an Undo action (the undo _window/behavior_ is the developer's concern; the affordance is specified here).
- **Page-level errors** (link failed to load, permission denied): centered message with an icon, plain explanation, and a recovery action (retry / back to dashboard). Reuse the empty-state layout with danger coloring.

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
  - Success: transitions to the normal redirect/interstitial (or navigates onward) — behavior only; not specified how.
- **Explicitly out of scope:** how the password is verified, attempt limiting/rate-limit logic, and how success proceeds to the destination. Those are implementation. This spec covers only the screen's appearance and its default/error/loading visuals.

**Related public screens** (same centered layout, swap icon + copy + color):

- **Redirect/interstitial:** brand mark, "Redirecting you…", a subtle progress/spinner, and a manual "Continue" link. Optionally the destination shown for transparency.
- **Expired link:** `clock`/`calendar-x` icon in `danger`, "This link has expired", no action or a "Create your own" CTA to the marketing site.
- **Not found (404):** neutral, "This link doesn't exist", link to home.

---

## 10. Navigation & information architecture

Sitemap-level structure only. No routing/URL scheme is prescribed here (that's the developer's), only the _screens_ and how they relate.

**Public (unauthenticated, recipient-facing)**

- Redirect / interstitial
- Password-protected gate (Section 9.10)
- Expired-link page
- Not-found page

**Marketing (unauthenticated, visitor-facing)**

- Landing / home
- (Pricing, features, etc. — same marketing template; not enumerated)

**Auth**

- Sign in — email/password **and** "Continue with Google" (OAuth). Google button is a secondary/neutral button with the Google mark and clear separation ("or") from the email form.
- Sign up — same pattern.
- Forgot / reset password
- (OAuth callback is a transient loading screen — spinner + brand, no chrome)

**Authenticated app** (behind the sidebar)

- **Dashboard** — overview: KPI stat cards + recent links + quick "Create link".
- **Links** — the full link list/table; the primary working surface. Create-link entry point (opens modal on mobile / inline or drawer on desktop).
- **Link detail / edit** — a single link: its short URL + QR, destination, settings (custom alias, password, expiration, active/paused), and a focused analytics summary for that link.
- **Analytics** — cross-link analytics: time-series clicks, and breakdown tables (referrers, countries, devices, top links).
- **Account / settings** — profile, theme preference (light/dark/system), connected accounts (Google), and destructive account actions.

**Primary navigation:** the sidebar (Section 11) holds Dashboard, Links, Analytics, Settings. The avatar menu (top-right) holds account, theme, sign-out. Create-link is a persistent primary button in the app header, not a nav item.

**Depth rule:** the app is intentionally shallow — no more than two levels deep from the dashboard (list → detail). Analytics is reachable both globally (nav) and scoped (from a link's detail).

---

## 11. Page layouts / templates

Each template is described as **layout regions** and how they recompose across breakpoints (Section 6).

### 11.1 App shell (all authenticated pages)

- **Regions:** left **sidebar** (nav) · top **header** (page title / breadcrumb, global search, Create-link button, avatar menu) · **content** · no persistent footer.
- **`lg`+:** sidebar docked (`w-60`), header sticky (`shadow-xs` on scroll), content `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Below `lg`:** sidebar collapses to an off-canvas drawer opened by a hamburger in the header; header stays; Create-link may collapse to an icon button.

### 11.2 Landing / marketing

- **Regions:** top nav (logo left, links center/right, "Sign in" + "Get started" CTAs) · hero (display headline + subhead + primary CTA + a "shorten a link" demo input) · feature sections · footer (multi-column links, legal).
- Uses the comfortable spacing scale (`py-16 md:py-24`, `gap-6`), `text-base` body, `max-w-6xl` sections. Single-column stack on mobile → multi-column feature grids at `md`/`lg`.

### 11.3 Auth pages

- **Regions:** centered card (`max-w-md`) on `bg-canvas`, optional brand mark above. Card holds the form; email/password fields + primary submit, an "or" divider, and the Google OAuth button.
- Same centered treatment at all breakpoints; only whitespace grows. No app shell.

### 11.4 Dashboard

- **Regions (within the app shell content):** page title row (H1 + Create-link) → KPI stat-card grid → recent-links section (link list preview) → optional analytics summary.
- Stat grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-4`. Sections `space-y-6`/`space-y-8`.

### 11.5 Link detail / edit

- **Regions:** back link + title (the short URL, mono) → a two-column layout at `lg` (left: settings form — destination, alias, password toggle, expiration, active/paused; right: the QR code card + share/copy actions and a link-scoped stat summary). Stacks to one column below `lg`, QR card first.
- Content capped at `max-w-3xl` (single column) / wider when two-column.

### 11.6 Analytics view

- **Regions:** header with a time-range **segmented control** (24h/7d/30d/custom) → a full-width time-series chart card → a responsive grid of breakdown tables (referrers, countries, devices) using the in-table bar pattern (9.4).
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

- **Colors:** only the semantic aliases in Section 3.4 are added (`--color-primary`, `--color-fg`, `--color-danger`, …). Do **not** rename or fork Tailwind's default palette (`indigo`, `slate` stay as-is and remain usable). Semantic names describe _role_, never appearance — use `--color-danger`, never `--color-red-button`.
- **Fonts:** `--font-sans`, `--font-mono` only (Section 4).
- **No other extensions by default.** Spacing, radius, shadow, and breakpoints use Tailwind defaults verbatim (Sections 5–6). If a genuinely product-specific value is unavoidable, add it as a _named_ theme extension (e.g. `--spacing-sidebar: … ; --width-sidebar: …`) with a comment stating why the default scale didn't suffice — never an inline arbitrary value scattered across components.
- **The `@theme` file is the single source of truth.** A palette or type change happens there and propagates through the semantic utilities.

**Component & screen naming** (for organizing mockups and, later, the developer's components)

- **PascalCase** for components, named by _role_ not appearance: `LinkCard`, `StatCard`, `LinkTable`, `PasswordGate`, `CreateLinkModal`, `AnalyticsRangeControl`, `EmptyState`, `Toast`.
- **Variant suffixes** describe purpose, not style: `Button` with variants `primary` / `secondary` / `ghost` / `destructive` (not `BlueButton`).
- **State via variant, not name:** there is no `LinkCardHover` — hover is a state of `LinkCard`. Names describe _what a thing is_, styling describes _how it looks in a state_.
- **Screens** mirror the IA (Section 10): `Dashboard`, `LinksList`, `LinkDetail`, `Analytics`, `SignIn`, `SignUp`, `RedirectInterstitial`, `PasswordGate`, `ExpiredLink`, `NotFound`, `Settings`, `Landing`.
- **Icons** are referenced by their Lucide name (`link-2`, `qr-code`, `lock`) so there's one unambiguous mapping.

**Consistency rule of thumb:** before adding a new color, size, or radius, check whether an existing semantic token or canonical scale step already expresses the intent. New primitives are added only when a real need can't be named with the existing system — and when they are, they're added to `@theme` with a comment, not improvised in markup.

---

### Appendix — quick reference

- **Fonts:** Geist Sans (UI) · Geist Mono (URLs, codes, aliases, QR data).
- **Palette:** slate (neutral) · indigo (primary) · emerald (success) · red (danger) · amber (warning) · sky (info/accent).
- **Body default:** `text-sm`. **Page title:** `text-3xl font-semibold tracking-tight`. **Stat value:** `text-3xl font-semibold tabular-nums`.
- **Spacing subset:** `1 2 3 4 6 8 12 16 24`. **Gutter:** `px-4 sm:px-6 lg:px-8`.
- **Radius:** control `rounded-md` · card `rounded-lg` · modal `rounded-xl` · pill `rounded-full`.
- **Elevation:** flat = border, float = `shadow-md`, overlay = `shadow-lg`.
- **Focus:** `focus-visible:ring-2 ring-primary ring-offset-2`.
- **Motion:** `transition-colors duration-150` default; overlays `duration-200` in / `150` out; nothing over `300ms`.
- **Sidebar appears at `lg`.** Public pages: centered `max-w-md`, system dark mode.
