# kol-r2b2 — Agent Context

Current project state + operational reference. Updated at the end of each significant session.

For chronological detail see `session-log/`. For load-bearing decisions see `ARCHITECTURE.md`. For decision history / alternatives considered see `HISTORY.md`. For speculative future work see `../llm-plan/01-future-exploration.md`.

**Last updated:** 2026-10-02 — see `session-log/2026-10-02-first-mbp-session.md`. **First session on the MBP; no code changed.** A fresh clone lacks everything `.gitignore` hides: the user copied `docs/`, `_media/`, `.dev.vars` and `.kol/` across (not `_tmp/` — fetch from it only on a specific need), and `LLM_RULES.md` was re-symlinked from the scaffold template. The bucket CLIs were dead on this machine — `bootstrap-cli.sh` links only executables directly in `claude/packages/` and the wrappers moved under `kol-cdn/` — so both were linked by hand, verified with a live read, and the bootstrap fix filed as `bootstrap-links-nested-bucket-clis` → dotfiles 🔵. **Open on the MBP:** `node_modules` is absent and `pnpm install` is held on the user's word; R2 writes are untested here; four KOL packages are behind (component 0.237.0 · framework 0.48.0 · icons 0.33.0 · theme 0.163.0 are latest).
Earlier: 2026-09-21 — see `session-log/2026-09-21-the-apps-tier-and-proving-before-publishing.md`. **No code changed; the development process did.** Filed `apps-tier-media-first` → kol-ds-ui: a third tier, `apps/*` beside `packages/*`, where each product runs as a real clickable app over **fake mutable in-memory data** with a Clear-changes reset, no provider and no network — so function is proved by USE before anything is published. Six component versions to land one mobile screen was the symptom; the cause is that showcase presents and workbench isolates, and neither lets anyone use a product, so the only place to exercise one was a consumer holding real credentials. **Media is the first and only app**; the tier is designed for N tools and populated one at a time. Two facts settled: workspace deps are symlinks, so N apps sharing a package is ONE source and not N updates; and the upload surface already exists twice (here + a kol-client-olina fork that grew folder creation and browser-side image conversion), which is what no-canonical-home looks like. **The concept is written ONCE** at `~/.dotfiles/docs/operations/systems/apps-tier/INDEX.md` and linked from both lobbies and both docs vaults — never copied. **Nothing owed here**: this repo is a consumer of the outcome, no change until `apps/media` exists.
Earlier: 2026-09-04 — see `session-log/2026-09-04-mobile-arc-closed-and-the-measurement-rule.md`. **The mobile browser is the reference shape and the arc is closed** (component 0.197.0 → **0.215.0** over six bumps). `App.jsx` wires the three seams — `folderMeta` off a **recursive per-folder tally now baked by `scripts/folder-tree.mjs`** so it stays a lookup, `thumbnailFor` as the original with `loading="lazy"`, `formatDate` as a short local date — plus **Browse · Files · Kinds as a bottom tab pill below `md`**, one surface at a time, both pages stacked above it under the 2026-08-26 ruling. Verified at 390 × 844 **on the deployed build**: ancestor rows gone, base indent 16, zero painted rows, frame 0/0, glyph 44-in-44, inline expand splicing children under the row, the last row clearing the tab bar, both tabs reading `19.6.2026`. **The rule that changed: measure before filing.** Three rounds ran on the user sending screenshots — *"you have REFERENCE IMAGES, WIREFRAMES, PLAYWRIGHT — how are you still fucking up"* — and two defects (the tab-bar spacer, the `formatDate` gap) surfaced only once Playwright was pointed at the deployed site. **Open:** `_media/` holds 387 deduped identity assets awaiting review; **R2 still has zero SVGs**.
Earlier: 2026-09-04 — see `session-log/2026-09-03-mobile-stack-mode-pwa-and-the-vector-sweep.md`. **Bumped 30 minors** (component 0.197.0 · theme 0.142.0 · framework 0.44.0 · icons 0.26.0 · media-client 0.4.0) and ran the `BrowsePageRulingsAndSeams` deletions owed since 09-02, verifying each rule in the bumped source first: `src/index.css` **175 → 63** and `src/App.jsx` **217 → 147** — the ~60-line GSAP grab tracker is `useGrabEdge` inside the organism now and the MutationObserver footer portal is the `settingsFooter` prop (gsap stays a dependency; the DS hook imports it). **The app installs to the home screen** — manifest, KOL touch icons, `black-translucent` + safe-area insets, ~180pt of chrome back. **The mobile stack mode was measured at 390 on a device**: three items hold, two defects reported back — `ColumnBrowser.jsx:487` never implements inline expand (a flat loop appends, so children land after every sibling) and `:502` passes `o.uploaded` through raw. **The larger finding is that our own first ticket was an underspecification** — it pulled one navigation rule out of eight reference screenshots; the refs are five views plus a constant chrome, and `ColumnBrowserMobileViews` was filed with the row anatomy, the missing views and the user-ruled tab pill. **Open:** bump 0.204.0/0.143.0 and measure (kol-ds-ui holds items 15–16 until we do); `_media/` holds 387 deduped identity assets awaiting review, nothing uploaded.
Earlier: 2026-08-28 — see `session-log/2026-08-28-kind-overview-and-browser-verified-fixes.md`. **The kind overview** (`src/KindOverview.jsx`, the grid button beside the gear): all 14 kinds in vocabulary order, surveyed across all three buckets, each tile a real preview with count, weight and home buckets; clicking opens it large in place. `ColumnBrowserSeams` adopted — **component 0.119.0 · theme 0.81.0 · icons 0.24.0 · framework 0.33.0** — so `autoFocus` and `stats={false}` replaced two stopgaps and the row's `is-selected` / `is-cursor` replaced the `bg-fg-04` hook. The theme toggle is back in the settings-footer, portalled beside reset (the DS drawer hardcodes that footer). Column browser ruled live: one fill and it means selected, no hover fill, pill clamped on the line, documents capped at 3:5, one height (800) everywhere. **Work is now browser-verified** — Playwright against the deployed site, on the user's explicit authorisation, found four defects that lint, tests and the build all passed. Every `lobby/outbox/` receipt is 🟢. **Open:** consumer write access needs an auth model that is not the shared password — the user's call, ARCHITECTURE §4.

---

## Status at a glance

- **v0.2 — live.** `https://admin.kolkrabbi.io` browses all three buckets with a per-bucket settings panel; `https://media.kolkrabbi.io` is the same Pages app read-only (`READ_ONLY_HOST` in `src/lib/api.js` — no upload, rename, delete or move). Basic Auth still gates writes; `/api/list` is public.
- **Three public stores**, all on Kolkrabbi hostnames:
  | Store | Public base | In the admin |
  |---|---|---|
  | R2 `kol-media` | `r2.kolkrabbi.io` | read + write |
  | B2 `kolkrabbi` | `b2.kolkrabbi.io` | read-only |
  | B2 `kol-vault-media` | `b2v.kolkrabbi.io` | read-only |
  First-generation `cdn.` / `vault.` still attached to the B2 buckets; `media.` left R2 on 2026-08-26.
- **`workers/cdn-proxy/` — deployed.** One Worker, both B2 hostnames, `custom_domain = true` created the DNS. Sets `Cache-Control` (B2 sends none), strips `x-bz-*`, forwards `Range`. **Backblaze Custom Domains does not exist in this account** (console-verified 2026-08-14) — the Worker is the route, not a fallback.
- **Cloudflare Pages** — project `kol-media-admin` (deploy target keeps the old name; the repo is `kol-r2b2`), R2 binding `MEDIA_BUCKET`, secrets `ADMIN_PASSWORD` + `B2_KEY_ID` + `B2_APP_KEY`.
- **Design system is installed, not vendored.** `@kolkrabbi/kol-{component,media-client,theme,icons}` + `hls.js`. Deep tier imports only (`/atoms/Button`) — the barrel drags `ExitPreview` → `react-router-dom`.
- **Bucket contents** (live 2026-08-15) — R2 433 · B2 `kolkrabbi` 3443 / 5.4 GB · B2 `kol-vault-media` 4095 / 25.7 GB. Snapshots in `manifests/{r2,b2,b2vault}.tsv`; re-diff with `pnpm media-manifest`.
- **Hostname cutover DONE** — 219 files across kol-website, kol-ds-ui, kol-apps, kol-vault. Zero raw `f005` hosts remain. The raw host still serves, so nothing was ever on a deadline.

## What works

- Full upload → list → rename → download → delete against R2; read-only against both B2 buckets (writes stay on the `bucket` CLI).
- **One view (2026-08-26).** `FileList` is the interface on both hosts. The Admin | Library | Gallery tabs (DS `MediaBrowser`, `GalleryView`) were removed — no paging, no settings, no writes; retired to `_tmp/2026-08-26-views-retired/`. Bucket switcher is the DS `Dropdown` (primary).
- **Three-bucket switcher** in the header; **settings panel** (gear icon) holds per-bucket defaults in `localStorage` — kinds allow-list, flat, group-variants, fold-segments, page size, video preview, layout, sort, drop-pool. Every control is a default, never a gate; a toggle with nothing to act on renders disabled and says so.
- **Display rules** (`src/lib/media.js`, tested): extension-first kind detection (image/video/audio/text/code/playlist/font/archive/system), resolution-set grouping (thumb loads the smallest variant), HLS segment folding, system-file hiding-with-count, poster pairing. On the website bucket this is 3443 → 773 entries and a 718 KB → 27 KB thumbnail.
- **Kinds render as themselves** — `HlsVideo`, `CodeBlock`, `ProsePreview`, `AssetPlaceholder`. Text previews cap at 200 KB.
- Page-at-a-time rendering (`pageSize`) so Flat over a whole bucket doesn't hang.
- Click-to-sort headers, search, kind chips with live counts, batch selection (shift-range, Move-to-folder / Download / Delete), inline rename with 409 overwrite refusal.
- CLI bulk upload: `pnpm bulk-upload -- <local-dir> <remote-prefix>`. Manifests: `pnpm media-manifest`. Cutover sweep: `pnpm cdn-cutover [--apply]`. Tests: `pnpm test:b2`, `node src/lib/{media,settings}.test.mjs`.
- `npx eslint src` → zero errors.

## What's pending

Nothing. The arc closed 2026-08-27 (🏁 above) — every thread is done, filed to `lobby/` as a tracked ticket, or parked at `../llm-plan/02-parked-followups.md` with the trigger that reopens it.

- **The mobile arc is done.** Nothing owed to kol-ds-ui; every ticket closed 🟢 and measured.
- **`thumbnailFor` serves originals with `loading="lazy"`.** If a 2 MB JPEG behind a 44px tile proves costly, that is the trigger for paid Image Resizing — measure it before buying it.
- **`_media/` is a paused review.** 387 identity assets deduped from 608 copies swept out of `~/dev/projects/*`. Loop: drop into `_media/svg/**`, run `python3 _media/build-sheet.py`, open `_media/sheet.html`. Gitignored. **Nothing uploaded — R2 still has zero SVGs.** The argument landed on `@kolkrabbi/kol-marks` as the source with an R2 `svg/` mirror for browsing: a bucket cannot end the copying, because boot icons must sit in `public/` either way.
- Double bucket listing, consumer redeploys, the `kolkrabbi` version sweep, edge-cache rename, R2 cursor / B2 page caps, paid Image Resizing — **parked**, each with its trigger.
- No tagging / metadata — deliberate non-goal, ARCHITECTURE §N.

## Active known issues

**None in the DS.** Every mobile defect filed this arc came back fixed and was re-measured at 390 on the deployed build.

**One pattern worth watching, not a bug:** `layout: 'off'` was forced in `loadSettings` by a 2026-08-27 ruling that was correct when the wall sat UNDER the browser, and silently stopped being correct the moment the wall got its own tab — the Files tab rendered a filter bar above nothing. **A ruling expiring when its reason expires is the thing nothing checks.**

**In `_media/`, awaiting the user:** `kol-vector`'s 20 `form-*.svg` carry no fill at all and render as nothing on any ground; `kol/logo/` holds 18 files whose `-2`/`-3`/`-4` suffixes are filename collisions needing a ruling on which wordmark is current; and `favicon.svg` is byte-identical to `logo.svg` in several repos — the logo has been shipping as the favicon under another name.

---

## Key files and their roles

| file | role | hot edit points |
|---|---|---|
| `src/App.jsx` | UI shell | layout, header — holds prefix/refreshKey only, view state lives in FileList |
| `src/UploadZone.jsx` | drag-drop + queue | progress UX, key derivation from prefix |
| `src/FileList.jsx` | the listing surface on the DS ContentFilters collection | `<ContentFilters>` props (slots: `trailingActions`, `leadingActions`, `belowActions`, header strip items), `renderItem` (sort → page → `ContentCard`/`ContentRow`), `renderActions`, `toggleSelect`/`batchMove`/`batchDelete`. Sort/flat/layout live in per-bucket settings; `handleSort` writes once |
| `src/SettingsPanel.jsx` | per-bucket display settings | adapter over DS `SettingsPanel` (drawer); local footer = framework `ThemeToggle` + reset |
| `index.html`, `public/manifest.webmanifest`, `public/touch-icons/` | Add to Home Screen | standalone display, KOL touch icons (kol-website's, verbatim), `black-translucent` + `viewport-fit=cover`; safe-area insets live on `body` in `src/index.css` |
| `_media/` | staging for the bucket, **gitignored** | `svg/**` deduped by owner and set · `build-sheet.py` regenerates `sheet.html` · `INDEX.md` carries provenance |
| `src/lib/api.js` | bucket registry, `READ_ONLY_HOST`, fetch wrappers + `moveKey` | endpoint names, error shape, move-key path logic |
| `scripts/bulk-upload.sh` | CLI bulk upload | concurrency, content-type detection (`file --mime-type`) |
| `scripts/media-manifest.sh` | bucket snapshot + diff | `pnpm media-manifest` → `media-manifest.tsv` (tracked) |
| `vite.config.js` | dev server | `/api` proxy → `admin.kolkrabbi.io` so plain `pnpm dev` hits the real bucket (dev:cf uses local sim only) |
| `src/App.jsx` | UI shell, **~190 lines** | `TABS` + `useMediaQuery` fork below `md`; the three seams (`folderMeta` · `thumbnailFor` · `formatDate`) and `unroot()`, which strips the virtual root both seams are handed |
| `scripts/folder-tree.mjs` | baked folder tree | now also a **recursive per-folder `counts`** map — the tally rides the whole-bucket pass it already made, so `folderMeta` never counts |
| `src/index.css` | DS entry, **63 lines** | body anchor, safe-area insets, and only `.r2b2-*` rules — every `.kol-*` override went upstream 2026-09-03 |
| `src/components/atoms/`, `molecules/`, `organisms/` | KOL design system | do not edit; copies of upstream |
| `src/styles/kol-theme.css` | DS umbrella import | do not edit |
| `functions/api/_middleware.js` | auth gate | shared-secret check; CORS later |
| `functions/api/upload.js` | POST multipart → R2 | key sanitization, contentType handling |
| `functions/api/list.js` | GET → R2.list | prefix/cursor query params |
| `functions/api/object.js` | DELETE → R2.delete | key required |
| `functions/api/rename.js` | POST → get/put/delete | overwrite refusal (409), sanitization |
| `functions/api/download.js` | GET → R2.get + attachment headers | filename derivation from key |
| `wrangler.toml` | local dev R2 binding | `MEDIA_BUCKET` → `kol-media` (mock by default; `--remote` to hit real) |
| `package.json` | scripts | `dev:cf`, `deploy`, `preview`, `build`, `lint` |

---

## Critical consistency seams

### R2 binding name

The Cloudflare Pages dashboard binding name (set there) must match `context.env.MEDIA_BUCKET` reads in functions, and must match the binding name in `wrangler.toml` for local dev. Pick one — `MEDIA_BUCKET` — and hold it.

### API ↔ UI contract

`/api/list` response shape is consumed by the FileList component. If the response shape changes, both sides must update; there's no shared types layer.

---

## Roadmap (prioritized)

Empty at the milestone. The original five (API · wrangler.toml · UI MVP · Pages deploy · CORS) shipped; the collection arc closed 2026-08-27. Follow-ups wait on their triggers in `../llm-plan/02-parked-followups.md`.

---

## Known gotchas

### Pages Functions binding setup is dashboard-only

R2 bindings for Pages Functions are configured in the Cloudflare dashboard, not committed to the repo. The `wrangler.toml` only defines the local-dev simulation. New deploys to a fresh Pages project will need the binding re-created in the dashboard.

### Cloudflare edge cache

Custom-domain R2 responses are cached at the edge. Overwriting a key without purging the URL serves the old file. Either use unique keys per upload (timestamp suffix) or purge on overwrite.

---

## Debugging recipes

**Deploy to prod (`admin.kolkrabbi.io`):**
```sh
pnpm deploy
```
Runs `vite build` then `wrangler pages deploy dist` — ships the UI and compiles `functions/` into Pages Functions in one shot. No git push (not a git repo); uses the already-authenticated `wrangler` OAuth session.

**Local dev with R2 simulation:**
```sh
pnpm exec wrangler pages dev -- pnpm dev
```
(wired once `wrangler.toml` exists; will run vite + functions + simulated R2.)

**Test upload from CLI:**
```sh
curl -u admin:$ADMIN_PASSWORD -F "file=@./local.jpg" -F "key=test/local.jpg" \
  https://admin.kolkrabbi.io/api/upload
```

**Bulk-upload a local folder (bypasses the GUI, bypasses Basic Auth entirely):**
```sh
pnpm bulk-upload -- ./local-folder some/remote/prefix
```
Uses `wrangler r2 object put --remote` under the already-authenticated OAuth token (`pnpm exec wrangler whoami` to confirm), not the admin's `ADMIN_PASSWORD`. Parallelized with `xargs -P` (default concurrency 6, third arg overrides). Content-type is derived per-file via `file --mime-type`.

**Single-file CLI ops without cloning this repo:** `bucket-r2` (global wrapper, `~/.local/bin/bucket-r2`, skill `kol-bucket-r2`) — `bucket-r2 ls [prefix]`, `bucket-r2 up <local> <key>`, `bucket-r2 rm <key>`. Same zero-new-credentials approach as bulk-upload. No recursive/bulk verb by design — use `scripts/bulk-upload.sh` for whole folders.

---

## Contracts the next agent should not quietly break

- §1 — Two stores, split by purpose: R2 `kol-media` (tool media) and B2 `kolkrabbi/website` (site media). Don't merge them, and don't add a *third* without an ARCHITECTURE.md update.
- §2 — Don't bake media-picker UI into the admin. Extract to a reusable component when needed by other apps.
- §3 — Single deploy target. Don't split API into a separate Worker.
- §4 — One shared password. Don't introduce user accounts.
- R2 binding name `MEDIA_BUCKET` — referenced in dashboard config, functions, and `wrangler.toml`. Renaming requires touching all three.
