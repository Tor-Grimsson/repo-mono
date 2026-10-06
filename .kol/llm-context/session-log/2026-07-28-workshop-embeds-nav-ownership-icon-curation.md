# Workshop rebuild: embeds, nav ownership, icon curation

**Date:** 2026-07-28 (session span 2026-07-27 → 07-28)
**Agent:** Grim (Fable 5)

The workshop went from elder component museum to lab-plus-portals, and this repo took ownership of all its navigation. Two-repo round-trips shipped kol-workshop 0.1.7 (scroll regions), theme 0.11.3 (global link-blue killed → `.kol-link` opt-in), icons 0.7.1 (v1 curation), all consumed here with theme 0.11.7 / framework 0.5.4 / chess 0.5.1.

- **Museum sweep:** 76 files quarantined (`_tmp/workshop-museum-elder/`), workshop elder census 0
- **About/preview law:** `EmbedFrame` (full-bleed, scroll-locked, no right rail) + per-group Overviews with cards; groups: DS (6 deep links) · Brand (Styleguide/Kolkrabbi/Reference) · Dashboard (4 live `?tab=` embeds — land right after next deploy) · Apparat (8 story pages + frames) · Chess (Analysis/Stats/Database)
- **Nav ownership (USER LAW):** whole workshop system vendored to `src/workshop-system/` incl. engine + `WorkshopHeader`; `@kolkrabbi/kol-workshop` dep dropped; wordmarks fixed (KOLKRABBI→`/`, WORKSHOP→`/workshop`); DS lobby note staged (`kol-ds-ui/lobby/WorkshopSystemVendored.md`)
- **Icons:** v1 curation per 4 user rulings (foundation art, true frequency, cone + database into v1) + 9 name swaps — zero legacy resolution in workshop
- **Cards:** `OverviewCard` sizes by `aspect-[4/3]` (was fixed-height in a widened container)
- **Cleanup:** `packages/chess-data` → `_tmp/packages-chess-data/` (pre-merge item CLOSED); overscroll bounce killed app+shell; theme law now explicit>system>light (system-follow verified)
- **Standing conduct rulings this session:** git/deploys never mine to schedule · legacy icon trees never for new work · existing file ≠ precedent (conformance check joins import census) · geometry carries over when rebuilding a page · answer-shape: facts + checklists, minimal words

## Next arc (agreed, awaiting go)
**5-dimension audit of apps/web** — tooltips (DS Tooltip on all icon-only controls, mechanical sweep not glance) · labels/a11y · SEO/meta per route (folds parked /work/:slug item) · head/doc · robots/sitemap report. One inventory, one correction pass, one apply batch.

## Open / parked
- Typography pass on docs pages (on hold, not concluded)
- Apparat tool stories: Modulator, Radial, Distress, Radar (content from user)
- Dashboard `?tab=` deep-links activate at next site deploy (user's schedule)
