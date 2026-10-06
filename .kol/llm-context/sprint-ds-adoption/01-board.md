# Website → kol-design-system Adoption — Status Board

> **Live scoreboard** for the sprint (folder: `sprint-ds-adoption/`, start at
> `00-INDEX.md`). Hoist `apps/web` (+`apps/brand`) off the internal `@kol/*`
> workspace packages and onto the published `@kolkrabbi/kol-*` packages from
> `kol-design-system`. **Agents: read this at session start, update the
> scoreboard as work lands.** This is a multi-session, multi-agent effort — the
> board is the memory.

## Direction (plain language — no jargon)

The **website came first**. The design system was born inside this repo, then got
iterated OUT into `kol-design-system`, which has since pulled ahead (cleaner,
versioned, `@kolkrabbi/*` at v0.5). **We now drag the website UP to match the DS.**

- **DS is the reference.** This repo consumes its published `@kolkrabbi/kol-*` packages.
- **Internal `@kol/*` = the elder**, retired package-by-package as each upstream equivalent proves out.
- No "canonical / upstream / source-of-truth" framing needed — DS is ahead, website catches up.

_(Supersedes the Phase-6 direction on `../status/migration-status-board.md`, which is now stale.)_

## The two systems

| Internal (retiring) | Upstream (adopting) |
|---|---|
| `@kol/theme` | `@kolkrabbi/kol-theme` 0.5 |
| `@kol/loader` (icons) | `@kolkrabbi/kol-icons` 0.4 |
| `@kol/component` | `@kolkrabbi/kol-component` 0.5 |
| `@kol/ui` (elder, roughest) | `@kolkrabbi/kol-component` + `@kolkrabbi/kol-framework` 0.3.1 (split on audit) |
| `@kol/content` · `@kol/fontviewer` · `@kol/chess-data` | app-specific — **stay local** |

DS repo: `~/dev/projects/kol-apparat/kol-design-system` · lobby (83 briefs) feeds it.

## Method (delicate — apps/web is the most active kolkrabbi repo, live in prod)

1. **Parity audit before any swap** (read-only). Per pair: what apps/web+brand *import* vs what upstream *exports* → `swap-safe / needs-app-local-home / missing-upstream`.
2. **Migrate per import-site, not big-bang.** The two package sets have different names (`@kol/*` vs `@kolkrabbi/kol-*`) so they coexist — swap consumers incrementally.
3. **Visual gate every step** — Playwright snapshot (home · /work · styleguide) before/after. Live site is the acceptance test.
4. **App-specific residue stays local** — slim the retired packages down to only what's genuinely app-only.

## Pivotal audit question — ANSWERED ✅

**Do `@kol/theme` and `@kolkrabbi/kol-theme` share token names?** **YES — 1:1.** All 160
`--kol-*` tokens present upstream, identical values, zero drift. **Swaps are fully
incremental** (the good case) — no atomic theme cutover needed.

## Global prerequisites (before any JS-package swap)

_(Corrected 2026-07-08 review.)_

1. **`optimizeDeps.exclude` the `@kolkrabbi/*` JS packages** — raw JSX is fine (Vite core handles it), but their `import.meta.glob` breaks under esbuild pre-bundling of registry installs. Exclude → served through the plugin pipeline. (CSS-only `kol-theme` exempt.) ⚠️ Registry-install consumption is **unproven anywhere** (DS showcase uses `workspace:*`) — prove with a throwaway install + `<Icon>` render first thing in Step 1.
2. **`@layer components` precedence shift — brand only.** Web already layer-wraps its `@kol/theme/*` imports manually (`index.css:8-10`); brand imports unlayered today → visual-check brand's `.kol-*` overrides.

## Scoreboard

| # | Step | Status |
|---|---|---|
| 0 | Parity audit → `02-parity-audit.md` | ✅ **DONE 2026-07-08 — GREEN, incremental (reviewed + corrected same day)** |
| 1 | Foundation: brand theme one-liner + web's four `@kol/theme/*` file imports → upstream (web's `@kol/ui/theme.css` elder entry WAITS for step 4) + `optimizeDeps.exclude` + registry-install proof | ✅ **DONE 2026-07-08, machine-verified** — 1a spike PROVEN (dev + prod build; iconData = own 1.1 MB lazy chunk); 1c byte-diffed (2 upstream files purely additive, 0 changed/deleted rules); **R4 gate CLOSED via old-vs-new render diff on brand** (home byte-identical; /components + /styleguide diffs traced to ONE root cause: `@layer` now lets authored Tailwind utilities beat DS chrome — e.g. `tracking-normal` on `kol-helper-10` code labels finally applies, ls 0.10em→normal, prose re-wraps ±1 line. Old state was the bug: utilities silently dead. Accepted as intended semantics — matches web's manual layering.) |
| 2 | Proving ground: `/workshop`+`/docs` `@kol/ui` → `@kolkrabbi/*` per-site (~95 files, safe to break) | 🟠 **pilot landed 2026-07-09** (kol-workshop shell repoint + docs system) — **30 files still elder** (see census) |
| 3 | Roll outward → `/work` + portfolio | 🟠 **/work DONE 2026-07-15** — fully on `@kolkrabbi/*` (kol-content 0.2.0 incl. AsciiClouds app-local move), 0 elder imports. **Prints only piloted** 07-09 (3 kol-store components) — **3 route files still elder**. Collections removed from scope (dead routes, deleted). Arc journal: `../playbook/2026-07-15-ds-adoption.md` |
| 4 | Home + shell pilot (Navbar/Footer/HomeSignup/WorkshopFeatures, 2026-07-15) — **9 sections/cards files still elder**; collapse `@kol/ui` (delete passthrough + dupes) | 🟠 |
| 5 | Retire emptied `@kol/*` pkgs + slim app residue | ⬜ |

## Surface census — what's actually left (2026-07-15 strict grep, `from '@kol/(ui|component|theme|loader)'`)

> Correction 2026-07-15: earlier ✅s conflated "pilot swap landed" with "surface elder-free".
> **Foundry, article/stack, and brand's JS packages had never been enumerated at all.** This
> census is the ground truth; a surface is done when its row hits 0.

| Surface | Elder files | Notes |
|---|---|---|
| workshop | **30** (components 21 · routes 9) | shell repointed; component/route innards remain |
| foundry | **22** (routes/foundry 16 · components/fontviewer 6) | newly enumerated — never a step |
| home/sections | **9** (sections 8 · cards 1) | pilot swapped only Navbar/Footer/HomeSignup/WorkshopFeatures |
| article/stack | **0** | ✅ **ZERO-ELDER 2026-07-15** (Divider/Pill/Icon/ContentFilters/Table → kol-component+kol-icons; SourcesSection → kol-content SourcesReferences; StickyNavCard moved app-local `prose/blocks/`, elder deleted; CodeBlock ×2 → kol-component 0.10.1 after ledger #12 shipped same day). Visual-gated: /stack + standard + research live on :5173 |
| prints | **3** (PrintsGrid · PrintDetail · PrintDetailOverlay) | kol-store pilot done; `@kol/ui` chrome remains |
| misc | **1** (components/ui/ProfileCard) | |
| **apps/web total** | **65** (was 71 at census) | |
| **apps/brand** | **39** (mostly `@kol/component` + `@kol/loader` Icon) | only theme was swapped (step 1b); JS packages untouched |

**Order of attack (remaining Step-4 work):** workshop remainder → foundry → home/sections → article/stack ✅ → prints remainder → misc → brand JS → then Step 5 retirement.

**Standing site-side debt (not surface-bound):**
- `data/workshop/navigation.js` icon names are mostly legacy-set (only `grid` of the checked names is v1) — every render warns; breaks on kol-icons' next major. Migrate to v1 names once ledger 2.9 settles the target vocabulary.
- ~~`@kol/ui/theme.css` is the elder's core~~ **Theme collapse ROUND 1 DONE 2026-07-15 late:** elder CSS 4,940 → 3,495 lines. theme.css 423→355 (site layer: @font-face + brand/palette/accent tokens + Tailwind-scale overrides with live consumers; dead tokens deleted); components.css 3,084→2,389 (26 unused + kol-table/codeblock/label families → DS); utilities.css 645→339 (64 unused + 50 dual → DS incl. bg-surface-inverse context-remap model); prose.css 788→418 (kol-prose base + callouts + fades → DS; kept -wide/-compact/pull-quote/sources-*). Build 5/5, gated: home/work/stack/both-articles/workshop. **Cascade law learned: consumer `@theme` tokens land in `@layer theme` and LOSE to kol-theme's `@layer components` tokens — site token overrides must be plain `:root`** (2.8 shim fixed this way; ledger 2.8 amended). Remaining elder CSS = the type system (67 live classes: kol-heading/helper/mono/text/display-*) + btn-* + sources-* (workshop preview) — dies at the type-name migration arc.

Named landmines (full detail in matrix §Risk register): **R1** `QuantityStepper` re-export in `@kol/ui/atoms/index.js:16` hard-crashes on blanket alias — repoint per-site, swap to `QuantityInput controls="split"`. **R2** brand `GRAPHIC_RAW` (barrel re-add upstream).

## Open decisions

- ✅ **Publish channel:** consume pinned published npm versions — all 8 `@kolkrabbi/*` live on public npm, installable today.
- ✅ **Theme atomicity:** incremental (tokens 1:1).
- ⬜ **Residue home:** lean `@kol/app-ui` package vs inline app code — decide at Step 5.

## Artifacts (this folder)

- `00-INDEX.md` — sprint orientation + reading order.
- `02-parity-audit.md` — evidence: per-package matrix, risk register R1–R5, elder map.
- `03-plan.md` — the executable plan (steps 1–5: files, gates, rollback).
- `04-package-registry.md` — **all 18 published `@kolkrabbi/*` packages** (what the DS ships — check before declaring anything missing).
- Live journal for this arc → `../playbook/2026-07-15-ds-adoption.md`.
- Build gate (always): `pnpm exec turbo run build --force`.
