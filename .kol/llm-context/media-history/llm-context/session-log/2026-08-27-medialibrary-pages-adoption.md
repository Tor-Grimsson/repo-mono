# Session: FileList retires onto MediaLibrary, and the column browser gets its Finder manners

**Date:** 2026-08-27
**Agent:** Claude (Grim)
**Summary:** Eleven DS tickets closed and adopted in one day; `FileList.jsx` (834 lines) retired onto the DS `MediaLibrary` pages, so `App.jsx` is 98 lines over one media client. The column browser was then tuned live, ruling by ruling, to Finder's behaviour. Deployed.

## Changes Made

### Files Modified
- `src/App.jsx` — the whole UI: `MediaLibrary variant="browse"` + `variant="library" header={false}`, **stacked not tabbed** (the 2026-08-26 one-view ruling stands), sharing one bucket / prefix / settings. Holds the hash-prefix history, the bucket in `localStorage`, the upload `IconFrame` as `headerActions`, the mount focus for the arrow keys, and the GSAP grab-pill tracker.
- `src/lib/client.js` (new) — `createMediaClient({ buckets: BUCKETS })` + the write seams. `downloadUrl` is **pure**: the pages call it during render, and the first version mutated module state there.
- `src/lib/settings.js` — `columnHeight` is forced to `COLUMN_HEIGHT` (800) on every load; kinds come from the DS.
- `src/index.css` — 24 lines of DS overrides became the Finder tuning (see below).
- `package.json` — kol-component **0.118.3** · kol-theme **0.79.0** · kol-icons 0.23.0 · kol-framework 0.29.0 · kol-media-client **0.2.0** · **gsap 3.15.0** (new).
- `config/r2-cors.json` (new) — the R2 bucket CORS policy, applied.
- Retired to `_tmp/2026-08-27-filelist-retired/`: `FileList.jsx` · `SettingsPanel.jsx` · `lib/media.js` · `lib/ratios.js` · `lib/media.test.mjs`. `_tmp/2026-08-27-mediasheets-docpage-local/`: `MediaSheets.jsx` · `DocFrontmatter.jsx` · `lib/frontmatter.js` · `lib/id3.js`.

### DS tickets closed and adopted today
`LabeledControlSection` (0.112.0, BREAKING rename) · `ColumnBrowserResize` (0.113.0) · `PlaybackBarAndAudioSheet` (0.114.0 + icons 0.23.0) · `DocPageAndKindShowcase` (0.114.0 + framework 0.29.0) · `ColumnBrowserWidthsPersist` (0.115.0) · `MediaLibraryPages` (0.118.0 + media-client 0.2.0) · `MediaKindsExportPath` (0.118.1) · `ColumnBrowserChromeCorrections` (0.118.3 + theme 0.79.0). Every receipt in `lobby/outbox/` is 🟢 with no remainder.

### The column browser, ruled live
- **Grab edge** — the SideNav pill, not a wash: 72 × 2px, centred **on** the border line (the DS centres it in the 8px strip, which sits *inside* the border), wakes when the pointer is within 20px of its own line, and **trails** the pointer along the axis on a 2.8s `power4/power3.out` GSAP tween with a 30px deadband. Fade 1.8s with a 400ms hold.
- **Rows** — no dividers, no hover fill ("no explorer does that"), selection is an inset rounded pill. Every row carries the 4px inset so selecting never shifts the layout.
- **Selection** — exactly one row at full strength: `:has(~ …)` finds the last column that actually holds a selection; ancestors sit at `fg-02` as a fading trail. The accent version was "way to bright" and is gone.
- **Height** — one height (800) on every bucket and every reload; the drag lives for the session only.
- **Layout** — the page is THREE units: nav · column view (crumbs + browser + count, internally untouched) · content filters. 40px between units, 40px more above the filters wall.

### Docs written (same session, after the deploy)
- `docs/documentation/07-app/` (new section) — `INDEX` · `01-surfaces` (the two pages, stacked-not-tabbed, the three units) · `02-ds-components` (every DS part consumed, its package and tier, the deep-import rule, what was promoted out of here) · `03-consuming` (guide: the client, `/api/list?bucket=`, the three public bases, CORS and canvas) · `04-local-overrides` (every stopgap, the seam it awaits, the dead-selector failure mode).
- `docs/operations/03-deploy.md` (playbook) and `04-r2-cors.md` (canonical reference for the policy applied today).
- Corrected as stale: `06-buckets/01-r2-kol-media` (CORS is no longer API-only; the media-client consolidation shipped), `docs/INDEX` (`src/styles/` and `src/components/` no longer exist — the DS is installed, not vendored).
- **Vault normalised to the kol-docs framework: 37/37 docs conform, 92 wikilinks resolve.** 19 legacy files carried `date:` instead of `updated:`, `type: overview` (not an archetype), bracket-form tags outside the closed namespaces, and a `version:` field the spec has no room for.

## Current State

### Working
- Deployed and serving on `admin.kolkrabbi.io` and `media.kolkrabbi.io` (both 200). Lint, `settings.test.mjs`, `api.moveKey.test.mjs` and the build green.
- **R2 CORS is live** — `r2.kolkrabbi.io` sends `access-control-allow-origin: *` (GET/HEAD, `Range` allowed, 5 headers exposed), so canvas consumers like kol-mirror can read bucket bytes. Applied on the user's approval; policy committed.

### Known Issues
- The bucket is listed **twice** per load — two `MediaLibrary` instances, each with its own `useBucketLibrary`; no shared provider seam for the pages.
- The `h1` is no longer a reload link (the DS header renders plain text).
- Three local stopgaps over missing DS seams: `autoFocus` on the browser, `stats={false}` on the library page, and the Finder row tuning — the last hangs off the row's Tailwind `bg-fg-04` class because the organism exposes no state class, which is brittle exactly like `.r2b2-columns` was.
- The `kol-bucket-r2` skill doc still names `media.kolkrabbi.io` as the public base — stale since the 08-26 detach, and why `bucket-r2 cat`/`down` fail. Not this repo's file.

## Next Steps
1. File the three stopgaps as one DS ticket (`autoFocus` · `stats={false}` · row state classes + a Finder selection mode), then delete the CSS.
2. Decide whether the double listing is worth a shared-provider seam upstream.
