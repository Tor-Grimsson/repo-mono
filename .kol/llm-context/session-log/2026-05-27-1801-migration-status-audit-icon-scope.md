# Session Log: Migration status audit, stale-record fixes, Icon dual-home scope

**Date:** 2026-05-27
**Status:** Docs/records only — no app code changed. Build untouched.

## Summary

Audited the brand→monorepo migration to answer "is it over / what's next." Reconstructed the missing status board, fixed stale records, and scoped the one real remaining Phase-4 item (Icon dual-home). Surfaced that Phase 5 is structurally done and that framework/styleguide/decks are being descoped to stay in brand.

## What changed

- **Created `docs/status/migration-status-board.md`** — the live scoreboard (was a dangling reference in AGENT-CONTEXT *and* AGENT-ONBOARDING; `docs/status/` didn't exist). Holds the phase table, the "brand is canonical" directive, Phase-4 detail, and the descope decision.
- **Fixed `/metrics` staleness** — it's been LIVE since 2026-03-05 (5 endpoints via `useMetricsData`), not a "static mockup." Corrected in AGENT-CONTEXT (×2) + memory MEMORY.md (×3) + `kol-acyr-derived-projects.md`.
- **Repointed dead decisions-log links** → `docs/archive/kol-client-history/migration-plan.md` (§0 Decisions locked, §5 Risk register). In AGENT-CONTEXT (×2) + AGENT-ONBOARDING (×3).

## Decisions

- **framework / styleguide / loaders-decks DESCOPED** → stay in `apps/brand` (brand-data/presentation coupled). Kills the planned `@kol/framework` / `@kol/styleguide` / `@kol/docs` packages. (User call.)
- **Phase 5 (editor) is structurally done** — editor already in `apps/brand`, already consumes shared DS via `@kol/component` (51 imports) + `@kol/loader`. Remaining = formal close only (freeze + smoke modes). No extraction.
- Editor freeze: safe. Old `kol-client` repo: not diverged (`apps/brand` is freshest).

## Icon dual-home scope (the next build)

Two Icon homes, **largely disjoint libraries** (not duplicate copies):
- `@kol/loader` (brand, canonical): 349 names. `@kol/component/icons` (web, via `@kol/ui`): 573 names.
- Shared 94 → 67 identical, **27 differ** (brand wins). **255 loader-only + 479 web-only** uniques → both must survive.
- `Icon.jsx` resolvers differ. Web has ≥14 statically-referenced names outside loader's set → can't drop to loader.

**Plan:** UNION into `@kol/loader` (home, per directive); web's 479 fold up; brand wins the 27 conflicts; reconcile the resolver; `@kol/component` + `@kol/ui` re-export from `@kol/loader` (web's 33 sites untouched); delete `@kol/component/src/icons/`. Gate: `pnpm exec turbo run build --force` 5/5 + visual Icon spot-check both apps. ~1 session.

## Next Steps

1. **Icon dual-home consolidation** (scoped above) — the real remaining Phase-4 work.
2. **Phase 5 formal close** — editor freeze + smoke every mode, mark done.
3. **Phase 6** — invert upstream (demote kol-system to scaffold-from-monorepo; update `/init-scaffold` + `/init-client`).
