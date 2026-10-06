# Session: Apparatus Gallery — Phase 4 cleanup

**Date:** 2026-07-08
**Agent:** Claude (Grim)
**Summary:** Closed out the Workshop → Apparatus Gallery sprint's Phase 4 — deleted the orphaned inline-apparat code cluster, scrubbed FooterTest's stale nav, added the 3 missing tools to the sidebar, synced docs. Build green (turbo 5/5).

## Changes Made

### Files Modified
- `apps/web/src/routes/FooterTest.jsx` — dropped dead `Apparat` + `Mirrors` SITE_TREE groups; removed retired "Hall of Mirrors" narrative card, renumbered cards 01–09 + comment.
- `apps/web/src/data/workshop/navigation.js` — added `kol-ds-editor` / `kol-vcap` / `kol-radar` to the apparat sidebar section (icon + live/repo links).
- `apps/web/src/App.jsx` — added 3 `<Navigate>` redirect routes (`apparat/kol-ds-editor|kol-vcap|kol-radar` → `/workshop/apparat`) so the new sidebar paths don't 404, matching the existing apparat-tool pattern.
- `docs/documentation/04-pages/11-site-tree.md` — rewrote the stale Apparatus + Hall of Mirrors block into the current curated-gallery shape.
- `memory/MEMORY.md` — marked the "Workshop iframe embeds" tech-debt note MOOT (workshop pivoted to link-out cards; no iframes).
- `.kol/llm-context/sprint-apparatus-gallery/02-plan.md` — Phase 4 marked ✅ with the landed detail + remaining doc-drift list.
- `.kol/llm-context/AGENT-CONTEXT.md` — Active Focus updated (Phase 4 done, uncommitted).

### Files Deleted (orphaned apparat cluster — all unrouted/unimported)
- `apps/web/src/routes/workshop/ApparatusCircleGenerator.jsx`
- `apps/web/src/routes/workshop/ApparatusFrequencyModulator.jsx`
- `apps/web/src/components/workshop/animations/FrequencyModulationPreview.jsx` (only consumer was FreqMod)
- `apps/web/src/components/workshop/apparatus/` — whole dir (6 files: WavyCircleEditor/Canvas/Controls, useWavyCircleEditor, wavyCircleMath, BaselineGrid)

## Current State

### Working
- `pnpm exec turbo run build --force` → **5/5 successful** (web built ~20.5s, studio green). Chunk-size lines are pre-existing warnings, not errors.
- Verified before deleting: both route files unrouted in `App.jsx` and unimported elsewhere; `DesPage` (21 consumers) left untouched.
- Sidebar apparat nav now lists all 8 curated tools (modulator/radial/distress/mirror/monitor/ds-editor/vcap/radar), matching the `HomeApparat` gallery.

### Known Issues
- **Uncommitted** — all Phase 4 changes are in the working tree only (user commits).
- **Deferred doc drift (owner decision, not blocking):** `docs/documentation/05-workshop/03-mirrors.md` still documents the retired Hall of Mirrors / Kol Editor / freq-modulator — delete vs rewrite as "superseded by kol-mirror card" (carries salvageable styleguide-architecture content). Plus stale refs in `05-workshop/INDEX.md`, `05-workshop/09-right-sidebar.md`, `00-docs/INDEX.md:61`, and `data/workshop/system-metrics.json`.
- **`kol-radar` blurb** still a placeholder (needs owner input on what the tool is).

## Next Steps
1. Commit Phase 4 (user).
2. Decide the fate of `03-mirrors.md` + clear the remaining doc-drift refs.
3. Cross-repo (blocked-external): `plans/dashboard-ds-swap.md` + `plans/chess-ds-swap.md` — need kol-ds to publish `@kolkrabbi/kol-dashboard`/`kol-chess` first.
