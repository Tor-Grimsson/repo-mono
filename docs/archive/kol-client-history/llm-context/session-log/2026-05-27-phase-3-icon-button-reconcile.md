# Session: Monorepo merge — Phase 3 prep (Icon API + Button casing reconcile)

**Date:** 2026-05-27
**Agent:** Grim
**Status:** Phase 3 prep — two primitive collisions settled (Icon, Button casing); class-prefix/variant reconcile remains CSS-coupled. All code changes in `~/dev/projects/kol-monorepo`.

## Overview

Closed the Phase 2 token audit tail for the `status` group (verdict: fold-up,
no code) and started Phase 3's primitive reconcile. Icon API unified onto the
canonical implementation; Button's `uppercase` anti-pattern removed (the
plan's feared "casing flip" was a non-issue — 1 consumer, not 23). Plus a
dead-code kill: an orphaned 1857-line `chess.css`.

## Key Accomplishments

### 1. status token group — audited, fold-up (no code)
Web-only group (`danger` / `on-danger` / `danger-strong` / `danger-muted`,
light+dark), defined in `@theme` in `packages/ui/theme.css`. 13 `var()`
consumers, all CSS — real ones in `chess.css` + `prose.css` (danger
border/bg/alert). Canonical `@kol/theme` does NOT define status. **Verdict:
fold UP into `@kol/theme` at Phase 2/3** so web still resolves after migration;
not a blocker. No `bg-kol-status-*` utility-class usage despite `@theme`
registration.

### 2. Dead orphan chess.css deleted
**File:** `apps/web/src/components/workshop/chess/chess.css` (DELETED, 1857 lines)

Imported by nobody. Live chess styles come from `packages/ui/css/chess.css`
(1225 lines, 8 import sites via `@kol/ui/css/chess.css`). The orphan held ~80
extra selectors — all the OLD dashboard system (`metric-card`,
`dashboard-card`, `table-card`, `donut-color-*`, `opening-card`) superseded by
`dash-*` classes. Confirmed zero `className` usage in any JSX before deleting.

### 3. Icon API reconciled (web → canonical)
**File:** `packages/ui/src/atoms/icons/Icon.jsx`

The two repos' Icons were 99% identical (same props, `normalizeSize`,
`applySizeToMarkup`, render). Two diffs only:
- Glob: web `./svg/*.svg` (flat) → canonical `./svg/**/*.svg` + `00-kol/`
  overlay (recursive; canonical stroke set wins name collisions). Adopted.
- `responsive` prop: web had it, canonical dropped it. **Zero call-site usage**
  (verified) → removed the dead branch.

Web's flat svg dir means `**/*.svg` matches the same files and the `00-kol`
overlay is currently a no-op → **zero behavior change today**, but the API is
now unified and forward-compatible (web can absorb canonical's foldered icon
set without a call-site touch). 29 `<Icon>` sites unaffected.

### 4. Button casing anti-pattern removed
**Files:** `packages/ui/src/atoms/Button.jsx`,
`apps/web/src/routes/prints/PrintDetailOverlay.jsx`

The migration plan flagged a "Button casing flip" (~23 web buttons losing
forced uppercase). **Premise was stale** — web's Button already defaulted
`uppercase = false`. Only **1** consumer opted in (`PrintDetailOverlay.jsx:403`
Inquire button). Removed the `uppercase` prop + the `caseClass` conditional
entirely; Button now always emits `normal-case` (matches canonical +
ARCHITECTURE §2 / no UI-layer text-transform). Dropped the prop from the one
consumer — string left verbatim ("Inquire"), casing now call-site authored.

## Files Modified (in kol-monorepo)

### Deleted
- `apps/web/src/components/workshop/chess/chess.css` — dead orphan (1857 lines)

### Modified
- `packages/ui/src/atoms/icons/Icon.jsx` — recursive glob + `00-kol/` overlay; dropped dead `responsive` prop/branch
- `packages/ui/src/atoms/Button.jsx` — removed `uppercase` prop + `caseClass` logic; always `normal-case`
- `apps/web/src/routes/prints/PrintDetailOverlay.jsx` — dropped `uppercase` prop on Inquire button

## Issues / decisions

- **Visible change:** prints "Inquire" button renders "Inquire" instead of
  "INQUIRE". Correct per the no-auto-text-transform rule; recase the JSX string
  if loud casing is wanted.
- **Class-prefix swap NOT done (deliberately):** web Button uses bare `btn-*`;
  canonical uses `kol-btn` base + `kol-btn-*`, and variant `control` vs `ghost`
  + `quiet`. Flipping the JS without moving the `kol-btn*` CSS would break every
  web button. That reconcile lands WITH the CSS extraction in Phase 3 proper,
  not as a blind JS edit.
- **Icon/Button changes are in `@kol/ui` (web's package), not a new
  `@kol/component`.** Deliberate — these are API-convergence steps that shrink
  the canonical gap without committing to the package split (the gated
  "surgery"). When `@kol/component` is created, these primitives lift cleanly.

## Next Steps

- **Phase 3 proper (gated on team readiness):** create `packages/component`
  (`@kol/component`); reconcile remaining primitive collisions (Badge next —
  both repos define it). Class-prefix + variant remap for Button lands here,
  WITH the `kol-btn*` CSS.
- Fold `status` (+ verified keepers from `palette`/`container`/neutrals) UP into
  `@kol/theme`.
- Carried from Phase 2: optional Playwright light+dark snapshot to formally
  close the Phase 2 gate (expected no-op — surface hex byte-identical).
- Carried from Phase 0: user owes Vercel project + `brand.kolkrabbi.io` DNS.
