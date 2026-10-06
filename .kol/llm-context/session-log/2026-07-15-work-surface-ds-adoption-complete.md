# Session: /work surface DS adoption complete (Step 3 closed)

**Date:** 2026-07-15
**Agent:** Grim (Fable 5)
**Summary:** /work + /work/:slug fully adopted the published DS (kol-content 0.2.0 round-tripped a same-day backport for TG display faces + wheel gestures); dead collections routes and the /work elder orphans deleted; sprint Step 3 done and the board finally truthful.

## Changes Made

### Files Modified
- `apps/web/package.json` — bumps: kol-component **0.9.0**, kol-framework **0.4.0**, kol-theme **0.7.4** (+brand), then `@kolkrabbi/kol-content` added → **^0.2.0**.
- `apps/web/src/routes/Work.jsx` — ShelfRow (~95 lines embla/parallax) → `ParallaxShelf` (+`plugins={[WheelGesturesPlugin()]}` — wheel scroll survives); ListRows → `WorkListItem` (row = own anchor, `active` real now); `ContentFilters` → kol-component; `<SEO>` from `seoMetadata.work` (dev tab showed literal `__TITLE__`; prod SPA-nav kept stale titles); AsciiClouds → relative import.
- `apps/web/src/routes/WorkDetail.jsx` — `Divider` → kol-component; sources column → `SourcesReferences` (title="", meta→note); MoreWorkShelf ShelfCard → `WorkCard`.
- `apps/web/src/components/layout/Navbar.jsx` — local ~137-line WorkViewToggle → 12-line wrapper around kol-content's (wired to WorkViewContext, `listIcon="view-list"`).
- `apps/web/src/index.css` — `@source` kol-content; `.work-display-title`/`.work-display-preview` classes feeding the 0.2.0 seams (TGDylgjur/TGMalromur back; sizes re-added at call sites after the seam ate them; italic left-serif clip fixed via padding-left/negative-margin pair).
- `apps/web/src/components/ui/AsciiClouds.jsx` — moved from `packages/ui` (user ruling: not DS material; only consumer was Work.jsx).
- `apps/web/src/context/WorkViewContext.jsx` — unused `isSearchOpen` fields trimmed.

### Features Added/Removed
- **Deleted (9 files):** work orphans `ShelfCard.jsx` + `ProjectListItem.jsx`; **5 dead `routes/collections/` files** (unrouted — content migrated to CMS `type:'collection'` entries; verified zero router refs); `CollectionGrid.jsx` (+barrel) + `CollectionGridPreview.jsx` (+2 gallery lines).
- **DS round-trip:** backport brief (`docs/operations/01-workflow/03-work-surface-ds-backport.md`) → user shipped kol-content 0.2.0 same day (titleClassName/previewClassName seams + ParallaxShelf plugins prop; AsciiClouds REJECTED from DS) → site consumed.
- **New agent apparatus:** `sprint-ds-adoption/04-package-registry.md` (all 18 published @kolkrabbi pkgs — enumerate the scope before declaring anything missing); `docs/DS-CHANGES.md` ledger (8 open items, 2 rejected); playbook `playbook/2026-07-15-ds-adoption.md` (protocol: propose+OK per bite).

## Current State

### Working
- Build 5/5 green throughout; /work list + shelf + detail visually confirmed by user piecemeal (TG faces, clip fix, dots, sizes).
- Board: Steps 1–3 ✅, Step 4 half (home+shell landed 07-15), Step 5 open. Site-tree doc: Collections branch retired.

### Known Issues
- **DS publishes pending (user's court):** ledger #1 `titleClassName` on WorkListItem (uppercase bold list titles) + #8 `metaClassName` on WorkCard (uppercase meta line) — site passes classes once shipped.
- **Workshop right sidebar renders wrong type** (user screenshots, undiagnosed — TOC/quick-actions in a fallback face).
- **Workshop theme toggle is app-local** — swap to kol-framework's `ThemeToggle` (user directive, queued).
- Stale residue: 9 collections entries in `seoMetadata.js`; 2 stale `/collections` links (LinkCardPreview, FooterTest). FoundryCTA at 5 live sites (foundry ×3, prints ×2) — foundry-pass decision.
- User full visual pass over the whole /work arc still outstanding (piecemeal checks passed).

## Next Steps
1. Workshop right-sidebar type fix (diagnose first) + theme toggle → DS.
2. Consume kol-content seam publish (#1/#8) when it lands.
3. Step 4 remainder: collapse `@kol/ui` (layer A/B deletions are now much smaller post-collections).
