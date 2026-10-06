# Session: Sidenav single-control arc — 4 DS round-trips, stack wave, fonts fix

**Date:** 2026-08-09
**Agent:** Grim (Fable 5)
**Summary:** The sidebar went from collapsed-by-default with phantom chevrons to a single pill-marked grab edge (framework **0.17.0**, user-approved: "ok I like it") through four same-day DS round-trips with the live kol-ds-ui session; the stack rode five waves up alongside; JetBrains Mono had been silently broken in brand since 08-01 and got its variable cuts.

## Changes Made

### Files Modified
- `apps/brand/package.json` + `apps/web/package.json` — five bump waves; final: theme **0.32.3** (exact) · component **^0.32.2** · framework **^0.17.0** · icons **^0.12.1** · workshop **^0.20.1** (web)
- `apps/brand/src/components/framework/BrandLayout.jsx` — mounts the **package SideNav** (`navTree={NAV_TREE}`, `background={false}`); one-time `kol-sidenav` localStorage purge (pre-grab builds wrote `collapsed` as their default, not a user choice)
- `apps/brand/src/components/framework/SideNav.jsx` — **retired** → `_tmp/2026-08-09-brand-sidenav-fork-elder/` (0.15.0 replicated the fork into the package on the user's mandate)
- `apps/brand/src/styles/sidenav-collapse.css` — reduced to the fg-02 rail plane + the 08-01 accent override; everything else now package-owned
- `public/fonts/jetbrains-mono/` — added `JetBrainsMono-Variable.woff2` + italic (copied from kol-ds-ui): kol-theme's @font-face wanted them since 08-01, both faces were `error`, brand rendered system monospace everywhere
- `pnpm-workspace.yaml` — carried a `patchedDependencies` stopgap for broken component 0.28.0 for ~1h; removed same day (patch file → `_tmp/2026-08-09-kol-component-patch-elder/`)
- `lobby/outbox/` — `SideNavGrabResize.md` ✅ remainder executed; **`SideNavPillHandle.md` new**, 🟢 shipped same day

### The four DS round-trips (all via live cross-session messages, all same-day)
1. **0.15.1** — `useDragResize` export was missing from the framework barrel (filed on adoption-blocker)
2. **0.15.2** — `@layer components` cascade defect: Tailwind utilities on the package's own markup outranked its stateful overrides (rail carets/padding/list); DS moved component boxes into rules
3. **0.16.0** — user ruling: no chevron chip in the rail, any rail icon click expands (+discloses)
4. **0.17.0** — the pill-handle build order: rest-visible pill (`::before`), 8px hit area, click-toggle w/ 3px slop, `--kol-sidenav-snap-default`, dblclick reset removed, **chip Button deleted in both states** — completes the original SideNavGrabResize end state

### Incidents
- **component 0.28.0 was a broken publish** (RecordManager.jsx: JSX comment at expression position — parse error killing every consumer's dev). Root-caused the blast radius to framework 0.16.0's **exact `workspace:*`→pin freeze**; DS moved all inter-package deps to `workspace:^` and added a 278-file syntax-transform gate (#1 of 19) that would have caught it.
- The local pill **proto** (SideNavProto + useDragResizeProto) demoed the model but its demo died in the 0.28.0 outage; user ordered it stripped; the DS lifted its hook logic wholesale into 0.17.0. Proto history: `_tmp/2026-08-09-sidenav-pill-proto/`. Standing agreement both sides: **component ideas return as briefs, never local forks** — a fork freezes a moving markup contract.

## Current State

### Working
- Sidebar: loads expanded (stale-key purge verified), pill-marked edge is the single control — drag resize · snap-to-default · snap-collapse · click toggle · Home/arrows/Enter keyboard path; rail: no chip, no carets, icons expand+disclose, tooltips, footer K
- JetBrains Mono real in brand and web (both variable faces `loaded`)
- Brand carries zero collapse CSS of its own; consumer layer is exactly: fg-02 rail fill + accent-icon override

### Known Issues
- Deeper web surfaces (foundry, dashboards, store) unwalked since the 0.32.x component wave; DS flagged the Dropdown trigger/panel seam (churned 3× on 08-09) worth an eyeball — user validates live per the new playwright boundary
- 4 of brand's nav icon names were once suspected dead — verified false, all ten resolve in icons 0.12.1

## Next Steps
1. **RecordManager 📌 remainder is now adoptable** (component ≥0.25 installed): slide-deck manager + Library adoption, retire superseded local markup — `lobby/outbox/RecordManager.md`
2. Snap-band/pill-brightness taste tweaks if the user wants them — one-token DS asks
3. Deploy: all of today rides the next push
