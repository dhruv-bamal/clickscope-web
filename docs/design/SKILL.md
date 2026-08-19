---
name: click-scope-design
description: Use this skill to generate well-branded interfaces and assets for Click Scope (a Bitly-style URL shortener), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `styles.css` is the single stylesheet to link; it pulls in all tokens (`tokens/`), the base reset, and component styles (`css/`).
- Consume **semantic color tokens** (`--color-primary`, `--color-fg`, `--color-surface`, `--color-danger`, …), never raw palette shades. A `.dark` class on the root flips the theme.
- Type: **Geist Sans** (UI) + **Geist Mono** (all machine text — URLs, aliases, codes). Product default size is **14px** (`text-sm`).
- Icons: **Lucide**, 2px outline, `currentColor`. Load the Lucide browser script and use the `Icon` component (or `<i data-lucide="name">`). No emoji.
- Components live under `components/` and are exported on `window.ClickScopeDesignSystem_0a7fd7`. Each has a `.prompt.md` with usage. Full guidelines (voice, spacing, motion, layout, a11y) are in README.md.
- Full-screen recreations live in `ui_kits/` (app, marketing, auth, public); copyable starting-point templates live in `templates/`. Source of truth is `uploads/design_v2.md`.
