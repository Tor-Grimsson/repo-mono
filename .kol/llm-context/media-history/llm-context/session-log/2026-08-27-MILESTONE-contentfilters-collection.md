# 🏁 Milestone: the listing surface on the DS ContentFilters collection

**Date:** 2026-08-27
**Agent:** Grim
**Arc:** Replace every local alias in the admin's listing surface with the design system's ContentFilters collection — and the hostname/ownership cleanup that came before it.
**Delivered:** `admin.kolkrabbi.io` (admin) and `media.kolkrabbi.io` (read-only) render one view built entirely from DS pieces — `ContentFilters` (search, kind chips, SELECT/FLAT strip, selection bar, `SortControls`), `ContentCard`/`ContentRow` default (`ActionButton` glyphs, `SizeOrDownload`, `ToggleCheckbox variant="media"`), `SettingsPanel`, `ColumnBrowser` (Finder-column folder view with preview and Quick Look), `Dropdown` bucket switcher, `--kol-container-max` page width. Six DS tickets filed and closed same day (SettingsPanel, ContentFiltersCollection, ColumnBrowser + three receipts); this repo owns no card, row, toolbar, sort control, settings panel or column view of its own. Stores on `r2.` / `b2.` / `b2v.`; `media.` is the app. Packages at component 0.96.0 · theme 0.65.0 · icons 0.19.0 · framework 0.27.1.

## What closed
- Subdomain naming → done: stores renamed 08-15, `media.` moved onto the Pages app 08-26, `admin.` kept (user ruling).
- Admin | Library | Gallery tabs → done: one view; `GalleryView` + `MediaBrowser` wiring retired to `_tmp/`.
- `SettingsPanel` → done: DS organism (0.69.0), adapter here.
- Bespoke toolbar / `MediaCard` / `MediaRow` / `SortControls` / `SelectIndicator` → done: replaced by the collection (0.93.x); local copies in `_tmp/`.
- Column folder view → done: built here, shipped as DS `ColumnBrowser` (0.96.0), adopted.
- Card border, overlay scrim/shadow, row-thumb ratio, select-mode layout shifts, basename titles → done: fixed in the DS or in wiring; no local CSS overrides remain.
- `handleSort` two-write bug (sort field never changed) → done: one write.
- `.gitignore` gaps, root PNGs, Playwright output → done: `_tmp/` holds everything retired; root is clean.
- Bulletin on the hostnames → done: posted estate-wide 2026-08-27.
- `cdn.` / `vault.` retirement, consumer redeploys, B2 version sweep, upload-time thumbnails, edge-cache rename risk, list caps, CORS scope → **parked** at `../llm-plan/02-parked-followups.md` with their triggers.
- Repo under git → done by the user (outside the agent's remit).

## The arc (brief)
- 2026-08-26 — packages bumped; `media.` detached from R2 and attached to the app read-only; tabs collapsed to one view; `Dropdown` switcher; docs and bulletin squared. `session-log/2026-08-26-one-view-media-readonly-ds-bumps.md`
- 2026-08-26/27 — `SettingsPanel` filed and adopted; page width to the DS container ladder; the toolbar swapped to `ContentFilters` on a pnpm link, every ruling made live, filed as `ContentFiltersCollection`, shipped, adopted.
- 2026-08-27 — the Finder-column folder view built locally, ruled, filed as `ColumnBrowser`, shipped, adopted; the last local overrides removed. `session-log/2026-08-27-cdn-hostname-bulletin.md`
- Method that held: build locally on a link → the user rules on 5199 → one ticket with the consumer JSX verbatim → the DS ships → adopt in one bump. Identical means the pixels, not the code.
