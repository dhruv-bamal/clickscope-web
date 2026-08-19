# Click Scope — Design System

**Click Scope** is a prosumer **URL-shortening web application** (Bitly-style): link creation with custom aliases, QR codes, password-protected links, expiration rules, an analytics dashboard, and email/password + Google OAuth sign-in. The product voice is plain and confident; the UI is a well-built developer tool that a non-developer is still comfortable in — **utilitarian first, approachable second**.

This design system is a faithful implementation of the product's written design specification. It ships CSS design tokens, a Geist type system, a Lucide icon wrapper, and a set of reusable React UI primitives, plus (in progress) full-screen UI-kit recreations.

## Sources

- **`uploads/design_v2.md`** — the current source of truth: an expanded 13-section visual + interaction spec for Tailwind CSS v4 (CSS-first `@theme`, oklch palette). Supersedes the original `uploads/design.md`. Every token, size, radius, and rule here is transcribed from it. There was **no codebase, no Figma file, and no logo** provided — see *Brand mark* below.
- **`uploads/design.md`** — the original v1 spec, retained for history.

### v2 alignment status

Applied from v2: the **completed four-role semantic token set** (`--color-<family>` solid · `-fg` · `-bg-subtle` · `-border`, with `-tint` kept as a `-bg-subtle` alias; `--color-warning-on-solid` carries the dark-text-on-amber rule), the **context-aware focus-ring offset** (`--focus-offset`, defaults to surface), the **`.cs-alert` inline banner** (§9.9), and the new icons `tag` / `filter` / `shield-alert`.

Also built from v2: the new components `FilterBar` (§9.11), `BulkActionToolbar` (§9.12), `QrCodePopover` (§9.13), `AnalyticsChart` (§9.14), `Tag` chip, and `PageError` (§9.15) — all wired into the app kit (the link list uses `FilterBar` + `BulkActionToolbar` + a Tags column; dashboard/analytics/detail use `AnalyticsChart`; detail uses `QrCodePopover`). New screens: the auth kit adds the password-reset flow (§10.1) and account-link conflict (§10.2); Settings adds the OAuth-disconnect guard (§10.3); the public kit adds the 403 Forbidden page; and the 401/403/404 distinction ships as `PageError`.

## Brand mark

**No logo was provided.** Per the spec, the wordmark is rendered in plain type — **"Click Scope"** in Geist Sans semibold, `slate-900` (light) / `slate-50` (dark), with (optionally) the word "Scope" or a mark in `indigo-600`. Never recolor a mark into a semantic hue. If/when a real logo arrives, drop it into `assets/` and update `thumbnail.html` and the UI-kit headers.

## Intentional additions

- **`Icon`** — a thin wrapper over the Lucide browser library (the spec names Lucide as *the* icon set but defines no component). It renders a glyph by name at the brand's default sizes and inherits `currentColor`. Consumers must load the Lucide script on the page (see *Iconography*).

Everything else maps 1:1 to a component named or implied in Section 9 of the spec. No primitives were invented beyond the spec's inventory.

---

## Content fundamentals

How Click Scope writes copy (spec §2, §9):

- **Voice: plain and confident.** Say what a thing is or does. `"Create link"`, `"Copy"`, `"This link is expired"`, `"Unlock"`. **Never** `"Oops!"`, `"Awesome!"`, `"Woohoo!"`, or exclamation-driven cheer.
- **Casing: sentence case** everywhere — buttons, titles, labels, menu items (`"Create link"`, not `"Create Link"`). The only uppercase is the **overline/eyebrow** style (table column headers, section eyebrows) via letter-spacing, e.g. `TOTAL CLICKS`.
- **Person:** address the user as **you** implicitly; copy is mostly imperative (`"Paste a long URL…"`). Avoid `"we"`; the product doesn't narrate itself.
- **Errors are specific and blame-free.** `"Incorrect password"`, `"That destination isn't reachable"` — state the problem and, when possible, how to fix it. No apologies, no personification.
- **Machine text is literal.** Short URLs, aliases, codes, and QR payloads are shown verbatim in the mono face, never paraphrased.
- **Empty states invite, don't celebrate.** `"Create your first short link"` — inviting, but *"still no confetti"* (spec §9.7). Distinguish *nothing-exists-yet* from *nothing-matched-your-filter*.
- **No emoji.** The tone is a precise tool; emoji are not used anywhere in the product UI.
- **Numbers align.** Metrics use tabular figures and are formatted with thousands separators (`24,819`).

---

## Visual foundations

Answers to the brand's visual questions (spec §3–§12):

- **Color vibe.** Cool, technical, restrained. **Slate** (cool gray) is the workhorse — the vast majority of every screen. **Indigo** is the *single* action color: it means "act here" or "this is live/selected", so it stays rare enough to keep that meaning. **Sky** appears only in data-viz and info highlights (never as a second button color). Semantics: emerald (success), red (danger), amber (warning), sky (info). Five families total; anything else needs a documented reason.
- **Palette source.** Tailwind v4 default palette in **oklch**; product code consumes **semantic aliases** (`--color-primary`, `--color-fg`, `--color-surface`, `--color-danger`, …), never raw shades. Light + dark both defined; a `.dark` class re-points surface/text/semantic tokens so no per-element `dark:` color overrides are needed.
- **Type.** Two families only — **Geist Sans** (UI) and **Geist Mono** (all machine text: URLs, short-codes, aliases, QR payloads, IDs). No serif/display. **`text-sm` (14px) is the product default**, not 16px — the app is dense; `text-base` is reserved for marketing and long-form empty states. Headings use tight tracking; overline uses wide tracking + uppercase. `tabular-nums` on every metric and aligned column.
- **Spacing.** A named subset of Tailwind steps: **1 2 3 4 6 8 12 16 24**. Dense inside data regions (`p-3`/`p-4`, `gap-3`/`gap-4`); generous (`p-6`+, `gap-6`+) only for marketing and empty/first-run states. Standard responsive gutter `px-4 sm:px-6 lg:px-8`.
- **Backgrounds.** Flat. `slate-50` canvas / `white` surfaces (light); `slate-950` canvas / `slate-900` surfaces (dark). **No gradients, no images, no textures, no hand-drawn illustration** in the product — structure comes from borders and subtle surface shifts. (Marketing may use a demo input + feature grids, still flat.)
- **Elevation & shadow.** Minimal, reserved for things that genuinely float. **Flat surfaces use a border, not a shadow.** Menus/popovers/tooltips → `shadow-md`; modals/drawers/toasts → `shadow-lg`. In dark mode elevation is carried by a lighter surface + `ring-1 ring-white/10`, not by shadow.
- **Corner radii.** Bigger surface, bigger radius: control/input/badge `rounded-md` (6px) · card/panel/popover `rounded-lg` (8px) · modal/drawer `rounded-xl` (12px) · avatar/dot/pill/toggle `rounded-full`. Never mix radii on touching nested corners.
- **Cards.** `bg-surface` + `1px border-border` + `rounded-lg`, **no shadow at rest**. Hover lifts to `border-border-strong` + `shadow-sm`. Selected (bulk mode) → `ring` + indigo tint (`indigo-50`/`indigo-950`). No colored-left-border cards.
- **Borders.** `border` = `slate-200`/`slate-800`; `border-strong` (input outlines) = `slate-300`/`slate-700`. Dividers use `border`.
- **Hover states.** Buttons/links/rows shift **background or border color only** (`transition-colors duration-150 ease-out`); ghost gains `surface-subtle`; cards add `shadow-sm` + border shift. Primary fill steps one shade darker on hover.
- **Press states.** Optional `active:scale-[0.98]` on buttons (immediate, no easing lag); fill steps one shade darker again.
- **Focus.** Always visible, `focus-visible` only (never bare `focus`). Canonical ring: 2px indigo ring + 2px offset against the canvas — **indigo everywhere**, including on destructive controls (the ring signals focus, the fill signals danger).
- **Animation.** Functional and fast; **nothing over 300ms**. Color feedback `150ms ease-out`; small transforms (toggle knob, chevron) `200ms`; overlays `200ms` in / `150ms` out (modals fade+scale, drawers slide, popovers fade+small translate); toasts slide-up+fade; skeletons pulse; spinners spin. **Nothing bounces.** Honors `prefers-reduced-motion`.
- **Transparency & blur.** Used only on the **modal scrim** (`slate-950/50` + `backdrop-blur-sm`) and dark-mode elevation rings. Not decorative.
- **Layout rules.** Sidebar (`w-60`) docks at `lg`; below that it's an off-canvas drawer behind a hamburger. Header is sticky (gains `shadow-xs` on scroll). Content caps: dashboard `max-w-7xl`, forms/auth `max-w-md`, link detail `max-w-3xl`, marketing `max-w-6xl`. Public recipient pages (redirect, password gate, expired, 404) are a centered `max-w-md` column that honors OS dark mode with no app chrome.

---

## Iconography

- **Set: Lucide** — open, consistent 24×24 grid, **2px stroke, outline style**. No filled/duotone sets, **no emoji**, no unicode-glyph icons.
- **Delivery: the Lucide browser library from CDN.** This system's `Icon` component renders `<i data-lucide="name">` and hydrates it via `window.lucide`. Any page using icons must include the Lucide script, e.g. `<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>`. *(Substitution note: the spec names Lucide but ships no binary; we link the official Lucide CDN build — this is the real set, not an approximation. If you vendor Lucide locally, drop it in `assets/` and point the script there.)*
- **Sizes:** `16` inline with text (default), `20` for standalone icon buttons, `24` only in empty-state art.
- **Color:** always `currentColor` — icons take their context's text color; never hard-code an icon color.
- **Icons support labels, rarely replace them.** Icon-only controls (copy, QR, kebab, close) must carry an accessible name (the `IconButton` `label` prop).
- **Canonical metaphors:** `link-2` links · `qr-code` QR · `lock` password · `clock`/`calendar-clock` expiration · `bar-chart-3` analytics · `copy`/`check` copy interaction · `external-link` outbound · `trash-2` destructive · `ellipsis-vertical` row menu · `chevron-down`/`chevron-up` disclosure/sort · `circle-check`/`circle-alert`/`info`/`triangle-alert` toast semantics · `eye`/`eye-off` password reveal · `trending-up`/`trending-down` stat delta.

---

## Index / manifest

**Root**
- `styles.css` — the one file consumers link. `@import` manifest only (fonts → tokens → base → components).
- `readme.md` — this file.
- `SKILL.md` — Agent-Skills-compatible entry point.
- `thumbnail.html` — homepage tile.

**`tokens/`** — `fonts.css` (Geist via Google Fonts), `colors.css` (oklch palette + semantic aliases + `.dark`), `typography.css` (families, scale, weights, tracking), `spacing.css` (spacing subset, radius, shadow, sizing, motion).

**`css/`** — `base.css` (reset, body defaults, focus ring, reduced-motion), `components.css` (the `cs-*` classes the React components attach, with hover/focus/disabled/dark states).

**Components** (`window.ClickScopeDesignSystem_0a7fd7.<Name>`)
- **Icon** (`components/icon/`) — `Icon` (Lucide glyph wrapper).
- **Forms** (`components/forms/`) — `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Toggle`, `SegmentedControl`.
- **Data display** (`components/data-display/`) — `Badge`, `Tag`, `LinkCard`, `StatCard`, `DataTable`, `TableBar`, `AnalyticsChart`.
- **Navigation** (`components/navigation/`) — `FilterBar`, `BulkActionToolbar`.
- **Feedback & overlays** (`components/feedback/`) — `Modal`, `DropdownMenu`, `Toast`, `EmptyState`, `Spinner`, `Skeleton`, `QrCodePopover`, `PageError`.

**UI kits** (`ui_kits/`) — `app/` (sign-in → dashboard, links, analytics, link detail, settings, create-link modal), `marketing/` (landing + sign-in), `auth/` (sign-in, forgot/reset/confirm, account-link conflict), `public/` (password gate, redirect, expired, 403 forbidden, 404).

**Templates** (`templates/`) — `marketing-landing/` and `app-dashboard/`: starting-point DCs consuming projects can copy; each loads the design system through its `ds-base.js` and mounts a kit surface via `<x-import>`.

Each component directory has a `.jsx` (implementation), `.d.ts` (props contract), `.prompt.md` (what/when + usage), and shares one `@dsCard` specimen HTML.

**UI kits** — see the *UI kits* entry above (`app/`, `marketing/`, `auth/`, `public/`).

---

## Status

Complete and validated: all tokens, `styles.css`, 26 components, 17 specimen/kit cards, four UI kits, and two starting-point templates — aligned to `design_v2.md`. Open items are cosmetic-only and listed under *Caveats* in chat: no real logo (plain wordmark), and Geist/Lucide loaded from CDN rather than vendored.
