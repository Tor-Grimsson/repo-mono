# Session: Monorepo merge — Phase 2 (shared neutral surface base)

**Date:** 2026-05-27
**Agent:** Grim
**Status:** Phase 2 partial — surface base unified across web + brand; accent/fonts/app-vocab deferred by design.

**Summary:** Extracted the brand-neutral surface tier (page bg/fg) into a shared
`@kol/theme/kol-base-tokens.css` and pointed BOTH `apps/web` and `apps/brand`
at it. Web's page colors and brand's page colors now come from one canonical
file — they physically cannot drift. All changes are in `~/dev/projects/kol-monorepo`.

## Changes Made (in kol-monorepo)

### New
- `packages/theme/kol-base-tokens.css` — canonical NEUTRAL base: surface tiers
  (primary/secondary/tertiary/inverse + `-on-*`, secondary/tertiary-inverse,
  contrast, splits) + absolutes, light `:root` + dark `:is([data-theme="dark"], .dark)`.
  Plain `:root` (not `@theme`): these tokens aren't `--color-*`-namespaced so they
  generate no Tailwind utilities either way; consumed as `var(--kol-surface-*)`.

### Modified — web side
- `packages/ui/theme.css` — `@import "@kol/theme/kol-base-tokens.css"` after the
  tailwindcss import; removed the surface tier + absolutes from its `@theme` light
  block and the surface overrides from its dark block. Web KEEPS its own accent
  (`#f5d245`), fonts (RightGrotesk), brand-color primitives, neutrals, container,
  status, palette, opacity-hex.
- `packages/ui/package.json` + `apps/web/package.json` — added `@kol/theme` dep.

### Modified — brand side
- `packages/theme/kol-theme.css` (umbrella) — `@import "./kol-base-tokens.css"`
  first in the cascade.
- `packages/theme/kol-color.css` — removed the duplicate absolutes + surface tiers
  from `:root` and the explicit `[data-theme="dark"], .dark` surface block (both
  now come from the shared base). KEPT brand's neutral-ink accent default, borders,
  ui-state, the `.bg-surface-inverse` context block, and the
  `@media (prefers-color-scheme: dark)` auto-dark block (brand-local; web has no
  equivalent).

## Decisions

- **Shared file is NEUTRAL, surfaces only.** First cut bundled surfaces + yellow
  accent + fonts. Reading `kol-color.css` showed brand's accent is intentionally
  brand-neutral (`var(--kol-surface-on-primary)`, rebound to yellow by
  `kol-brand-color.css`) — the scaffold-template design (plan decision #4). A
  yellow/font-carrying shared file would have poisoned brand's neutral DS layer.
  Re-scoped to neutral surfaces + absolutes; accent + fonts stay per-app.
- **Accent stays divergent by design:** web = kolkrabbi `#f5d245` in its theme;
  brand = neutral ink default + brand-layer rebind. Verified brand built CSS shows
  `--kol-accent-primary: var(--kol-surface-on-primary)` then `var(--brand-primary)`
  — architecture preserved, not contaminated.
- **opacity-hex / status / palette / container untouched** per user direction —
  deferred, dealt with later.
- **Dark mechanism reconciled:** shared file uses `:is([data-theme="dark"], .dark)`,
  matching brand's `[data-theme="dark"], .dark` and web's existing selector.

## Verification

- `pnpm install` relinked `@kol/theme` into web + `@kol/ui` (symlinks confirmed).
- **web build green; brand build green.**
- Built-CSS grep parity:
  - web + brand both emit `--kol-surface-primary: #fafafa` (light) AND `#121215` (dark).
  - web accent `#f5d245` + RightGrotesk intact; web-only palette/status/opacity-hex intact.
  - brand accent resolves via brand layer (not undefined, not yellow-from-shared).
- Not yet run: Playwright before/after visual snapshot (plan's formal Phase 2 gate).
  Values are byte-identical hex so render parity is expected — snapshot is belt-and-suspenders.

## Next Steps

- Optional: run the Playwright light+dark visual snapshot on web + brand to formally
  close the Phase 2 gate.
- Remaining Phase 2 reconciliation (deferred): web-only token groups (status/palette/
  container/opacity-hex) — verify per-group consumption before any fold-up/delete.
  opacity-hex stays as-is until explicitly revisited.
- Phase 3 (the surgery): promote primitives to `@kol/component`, reconcile the icon
  API + Button casing flip. Unblocked once the team's ready.
