# Session: B2 custom domains, three-bucket admin, DS adoption

**Date:** 2026-08-15 (started 2026-08-14)
**Agent:** Grim
**Summary:** Both B2 buckets got Kolkrabbi hostnames behind a Cloudflare Worker, the admin became a three-bucket browser with per-bucket display settings, and the repo stopped running a fork of the design system it fed.

## Changes Made

### Repo structure
- `/kol-migrate-structure` run — legacy `docs/llm-context/` → `.kol/llm-context/`, `plan.md` → `.kol/llm-plan/01-future-exploration.md`, `history.md` → `HISTORY.md`, loose docs → `docs/operations/`. `LLM_RULES.md` is now the dotfiles boot symlink; `.kol/docs-framework/` installed; `docs/.obsidian/` symlinked from `02-kol-vault-shape`.
- `docs/documentation/06-buckets/` written — INDEX (three-bucket comparison), `01-r2-kol-media`, `02-b2-website`, `03-cutover-inventory`, `04-b2-vault-media`, `05-cdn-proxy`.

### CDN
- `workers/cdn-proxy/` (new) — one Worker, two custom domains. `cdn.kolkrabbi.io` → B2 `kolkrabbi`, `vault.kolkrabbi.io` → B2 `kol-vault-media`. Paths pass through untouched. Sets `Cache-Control` (B2 sends none), strips `x-bz-*`, forwards `Range` for HLS, CORS `*`. Deployed; `custom_domain = true` created both DNS records.
- `scripts/cdn-cutover.sh` (new) — dry-run-by-default hostname sweep. **Applied: 219 files across kol-website, kol-ds-ui, kol-apps, kol-vault.** Zero raw Backblaze hosts remain ecosystem-wide.

### API + admin
- `functions/api/_b2.js` (new) — B2 read adapter on B2's **native** API (authorize → list_file_names), no SigV4, no dependency. Pages internally, caps at 10 pages.
- `functions/api/list.js` — `?bucket=r2|b2|b2vault`, all returning the frozen `{ key, contentType, size }` shape.
- `src/lib/media.js` + `media.test.mjs` (new) — kind detection (extension-first), resolution-set grouping, HLS segment folding, system-file detection, poster pairing.
- `src/lib/settings.js` + `settings.test.mjs` (new) — per-bucket display settings in `localStorage`, defaults derived from each bucket's measured profile.
- `src/SettingsPanel.jsx`, `src/KindPreview.jsx` (new); `FileList.jsx`, `App.jsx`, `lib/api.js` rewritten around them.
- `scripts/media-manifest.mjs` (replaces the R2-only bash) — snapshots all three buckets into `manifests/`.

### Design system
- Installed `@kolkrabbi/kol-{component,media-client,theme,icons}` + `hls.js`. **34 vendored files retired** to `_tmp/2026-08-15-vendored-components-retired/`. Deep tier imports (`/atoms/Button`) rather than the barrel — the barrel pulls `ExitPreview` → `react-router-dom`, an optional peer we don't carry. Main chunk **472 kB → 241 kB**.
- Chess data moved **out** of `@kolkrabbi/kol-chess` into `kol-chess/src/data/`; DS package went components-only at **0.6.0** (user published). Showcase given its own demo adapter.
- Filed `kol-ds-ui/lobby/inbox/media-library-non-av-blindness.md` + ledger row.

## Current State

### Working
- `admin.kolkrabbi.io` — three-bucket browser, settings panel (gear, top right). Verified live: R2 433 · B2 3443 · vault 4095.
- `cdn.kolkrabbi.io` / `vault.kolkrabbi.io` — 200s with `cf-cache-status: HIT`, edge-cached, free egress. Raw `f005` host still serves, so consumers were never on a deadline.
- Display list went **3443 → 773 entries**: 197 resolution sets collapsed (thumb 718 KB → 27 KB), 2012 HLS segments folded to 64 stream rows, 118 system files hidden-and-counted. Real video count 2051 → 39.
- Kinds render as themselves — `HlsVideo`, `CodeBlock`, `ProsePreview`, `AssetPlaceholder`.
- `npx eslint src` → **zero errors** (including the pre-existing set-state-in-effect one). Three test suites green.

### Known Issues
- **No audio component in the DS.** The vault's 116 sounds use a bare `<audio>`. Filed upstream.
- **`MediaLibraryProvider` not adopted** — its `accept='all'` still filters to image-OR-video, which would re-drop 80 playlists / 135 text / 116 audio. Components adopted, organism filed as a defect.
- **Cloudflare Image Resizing unavailable** (paid; `/cdn-cgi/image/` → 404). Thumbnails rely on the smallest existing variant, so buckets without variant sets still load full originals.
- `kolkrabbi` bucket lifecycle set to keep-last-version mid-session; the ~12 GB of prior versions may need a sweep to actually reclaim.
- `kol-website`, `kol-ds-ui`, `kol-apps`, `kol-vault` were rewritten but **not rebuilt/redeployed** beyond kol-website's build check.

## Next Steps
1. **Subdomain naming pass** — explicitly deferred. User's sketch: `r2.kolkrabbi.io`, `b2-k.kolkrabbi.io`, `b2-v.kolkrabbi.io`, and `admin.` renamed (it implies restricted access it doesn't have). `media.kolkrabbi.io` is taken by R2's public domain, so it can't go to the admin without moving R2 first.
2. Watch for the DS's answer on `media-library-non-av-blindness`; adopt `MediaLibrary` once `accept` widens.
3. Publish `@kolkrabbi/kol-chess` consumer bump in kol-chess if it ever needs the components package refresh.
