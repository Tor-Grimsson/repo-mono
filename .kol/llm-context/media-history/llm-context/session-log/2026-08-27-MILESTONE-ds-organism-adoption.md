# 🏁 Milestone: the app is the design system

**Date:** 2026-08-27
**Agent:** Claude (Grim)
**Arc:** Everything this repo drew for itself moved into `kol-ds-ui` and came back as installed components — ending with `FileList.jsx`, the 834-line browsing surface that was the app.
**Delivered:** `src/App.jsx` is 98 lines of wiring over two `MediaLibrary` page variants and one media client; `src/index.css` is 34 lines. Thirteen tickets filed, closed and adopted in a day, across component `0.104.0 → 0.118.3`, theme `0.71.0 → 0.80.0`, icons `0.20.0 → 0.24.0`, framework `0.28.0 → 0.33.0`, media-client `0.1.2 → 0.2.0`. Live on both hosts.

## What closed

- **`FileList.jsx`, `SettingsPanel.jsx`, `lib/media.js`, `lib/ratios.js`** → promoted to `MediaLibrary variant="browse" | "library"`, `LabeledControlSection`, `utilities/mediaKinds`, `utilities/ratios`; retired to `_tmp/2026-08-27-filelist-retired/`. **Done.**
- **`MediaSheets.jsx`, `DocFrontmatter.jsx`, `lib/frontmatter.js`, `lib/id3.js`** → `PlaybackBar`, `AudioSheet`, `VideoSheet`, `DocPage`, `DocFrontmatter`, `utilities/{id3,frontmatter}`; retired to `_tmp/2026-08-27-mediasheets-docpage-local/`. **Done.**
- **The `kol-framework.css` `.kol-overlay` clash** — the framework retired its duplicate rules in 0.29.0; the local override is gone. **Done.**
- **The column browser's chrome** — last column's edge, a lone row's hairline, one ink for folders and files, the grab pill — shipped in component 0.118.3 / theme 0.79.0. **Done.**
- **Height and per-column width drags** — shipped 0.113.0 / 0.115.0; the `width !important` offset workaround is deleted. **Done.**
- **`PlayDiscAndVideoBar`, `ColumnBrowserMediaFacts`, `SettingsPanelEyebrowAndDropdowns`, `MediaLibraryReconcile`, `MediaKindsExportPath`** — all 🟢, remainders applied. **Done.**
- **R2 had no CORS policy** — applied 2026-08-27 (`config/r2-cors.json`), verified cross-origin; kol-mirror can read bucket bytes into a canvas. **Done.**
- **Prod behind the local build** — deployed, both hosts 200. **Done.**
- **Docs** — `documentation/07-app/` written (surfaces · DS components · consuming · local overrides), `operations/03-deploy` + `04-r2-cors` added, stale CORS/client/src-path claims corrected, and the vault normalised to the kol-docs framework: **37/37 docs conform, 92 wikilinks resolve.** **Done.**
- **The last three stopgaps** (`autoFocus`, `stats={false}`, row state classes) → filed as `ColumnBrowserSeams`, receipt in `lobby/outbox/`. **Closed into the ledger** — the lobby is where an open ticket lives, not this file.
- **The bucket is listed twice per load** → **parked** at `../llm-plan/02-parked-followups.md` with its trigger.

## The arc (brief)

It started on 2026-08-26 with one view and one read-only hostname, and ran through the ContentFilters collection (🏁 `2026-08-27-MILESTONE-contentfilters-collection.md`) into the settings drawer, the virtual `R2B2` root, the media tiles and the QuickTime bar (`2026-08-27-settings-drawer-…`, `2026-08-27-media-tiles-…`). Each piece was built here first, ruled on live by the user, filed to `kol-ds-ui/lobby/`, shipped the same day, then bumped and deleted locally — thirteen round trips in one day, several inside an hour.

The last one took the surface itself (`2026-08-27-medialibrary-pages-adoption.md`). What remains local is what should be: the bucket registry and write API, per-bucket settings persistence, the upload zone, the baked folder tree, and the media client's assembly.

Two lessons the arc paid for, both recorded in `documentation/07-app/04-local-overrides.md`: a CSS override whose target moves **fails silently** — it still parses, matches nothing, and no lint or build can see it; and a green build is not a rendered app, which is why every visual ruling in this arc was made against the running thing, not the diff.
