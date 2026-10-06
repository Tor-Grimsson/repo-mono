# Session: Workshop becomes a hub of app pages, metrics gets its own app, home section rewritten

**Date:** 2026-10-05
**Agent:** Grim (Fable 5.1)
**Summary:** The workshop stopped publishing docs and framed copies of other sites and became a hub — one markdown page per app through the design system's reader. `apps/metrics` was built as its own app and matches the live page; it waits on a Vercel project. One DS ticket is out, deliberately complete, with no stopgap here.

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` · `pnpm-lock.yaml` — component ^0.239.0 → **^0.239.1** · icons ^0.33.0 → **^0.33.1** · theme 0.165.0 → **0.166.0**. One copy of kol-component.
- **Workshop hub.** New: `apps/web/src/data/workshop/pages/*.md` (eight pages: design-system · brand · fxr · monitor · mirror · vcap · chess · metrics), `data/workshop/pages.js` (the inventory), `routes/workshop/WorkshopPage.jsx`. Rewritten: `WorkshopIntroduction.jsx` (home cards from the inventory), `components/workshop/WorkshopChrome.jsx` (flat rail, page links in the right rail, search over the pages, tag overlay gone), `routes/Workshop.jsx`, the workshop block of `App.jsx` (pages, `/live` for `embed: true`, 21 redirects; `TagModeProvider` gone).
- **Retired to `_tmp/2026-10-05-workshop-hub/`:** the Docs section (index, reader wrapper, Showcase page, `vault.js`), the Apparat layer (`HomeApparat`, `ApparatTool`, `apparatTools.js`), the Dashboard pages, `EmbedOverview`, `embedSections.js`, `navigation.js`, `labels.js`. `docs/` itself is untouched and no longer published on the site.
- `apps/web/src/components/sections/home/HomeHighlights.jsx` — Radial tile → `radial.kolkrabbi.io`, chess → `/workshop/chess`, dashboard → `/workshop/metrics`. `layout/TakeoverMenu.jsx` — the "Docs" link is gone (six links). `public/sitemap.xml` — the workshop block is the eight pages.
- `apps/web/src/components/sections/home/HomeWorkshop.jsx` — new section line, cards Introduction · Design System · Brand · FXR, second button "View Design System". New local still `public/img/dev/home-feat-workshop/workshop-fxr-800.jpg` (captured from the live editor).
- **`apps/metrics` (new app):** `MetricsDashboard` from kol-dashboards + `src/useMetricsData.js` (moved from web, plus host summaries) + `src/milestones.js` + the six `api/metrics*.js` functions copied in. Root `package.json` gains `dev:metrics` (port 5176, `/api` proxied to production). The web app's page, hook and functions are untouched.
- **`apps/media` (new app, later the same day):** kol-r2b2 moved in — `src/`, `functions/api/` (7), `workers/cdn-proxy/`, `scripts/`, `manifests/`, `config/`, `wrangler.toml`, `.dev.vars` copied; fonts a symlink to the root set. Bumped to the repo's versions (two Button aliases migrated), built, rendered against the live API before and after. `pnpm-workspace.yaml` gains `onlyBuiltDependencies: [workerd]`; root `package.json` gains `dev:media` (5177) · `media:cf` · `media:deploy` · `media:cdn-deploy`. Its context, plans and lobby are copied as they were to `.kol/llm-context/media-history/`; its bucket and app docs are `docs/documentation/09-media/`, its operations docs `02-infrastructure/04–07`; its design-system chapters and docs-system meta went to `_tmp/2026-10-05-media-move/docs/`. `ARCHITECTURE.md` gains §8. Plan: `plans/2026-10-05-media-app-into-monorepo.md`.
- `lobby/` — two August receipts closed on the user's word (`ShelfCardTiltWrapsCard` · `TiltBentoVoiceAndDefaults`); `reader-takes-field-config-and-page-actions` filed to kol-ds-ui with receipt, ledger rows and history at both ends.
- Docs: `04-pages/11-site-tree.md` (workshop tree) · `04-pages/01-home.md` · `05-workshop/INDEX.md` rewritten · six `05-workshop` docs `status: archived` (text untouched) · `01-foundation/09-dev-servers.md` · `01-repository-structure.md` · `operations/02-infrastructure/01-hosting-dns.md` · `02-integrations.md`. `ARCHITECTURE.md` §4 lists `apps/metrics`.
- Plans: `plans/2026-10-05-workshop-hub-makeover.md` · `plans/2026-10-05-metrics-app-subdomain.md`. Memory: three entries (the shelf receipts, the ticket rule, where app descriptions come from).

### Verification
- Hub, on the built app (`vite preview` 5199, documents answered with `dist/app.html`): 8 cards · 8 pages · 4 frames · 21/21 redirects · search finds a page by a body word · no overflow at 390 · 0 console errors.
- Metrics, built app against `kolkrabbi.io/metrics` on live data: all four tabs carry the same cards at 1440 and 390 (15 · 15 · 11 · 4), status `live`, 0 console errors. JS 320 kB.
- **Not looked at in a browser:** the home page (menu, three tiles, the rewritten Workshop section and its FXR still).

### 2026-10-06, the day after — done from the "what can be done now" list
- **Home page checked** in a browser: four Workshop cards with their images, tiles repointed, section reads right at 1440 and 390.
- **`media` page** added to the hub (`pages/media.md`).
- **Metrics numbers re-measured** (`metrics-repo.js`, measured 2026-10-06: 39 components · 21 routes · 20,533 lines · 328 commits · 296 session logs · 83 docs · 342 icons · 112 fonts) and the milestones brought to October; redeployed.
- **Round 2 of the page texts** from the design system's apps-tier docs, kol-fxr's architecture, the vcap write-up and the chess docs — every page rewritten except metrics and media.
- **`apps/media` on the current media packages** — see the media plan §9.2; deployed. One ticket out (`explorer-autofocus-scrolls-the-fixed-page`), `autoFocus` off until it returns.
- **Metrics went live** at `metrics.kolkrabbi.io` through the Vercel + Cloudflare APIs (project `kol-metrics`, Git-connected, five secrets, CNAME); the web app is cut over (`/metrics` redirects at the edge with its next deploy; page, hook, functions and kol-dashboards retired to `_tmp/2026-10-05-metrics-app/web/`).
- **Media has one hostname:** `media.kolkrabbi.io`; `admin.` 301s there (`functions/_middleware.js`) until the `media-client-admin-base-is-media` return; the dotfiles ticket returned closed.

## Current State

### Working
- Everything above. KOL packages current as of this morning.

### Known Issues
- Until the ticket returns, each page's frontmatter block prints `Url` · `Repo` · `Icon` · `Order` · `Embed` as plain rows, and at 390 the four tool pages show no link to the live app. No stopgap, by agreement.
- Page text is a round-1 draft from READMEs and old workshop copy. The user: ui.kolkrabbi.io and each repo's own docs are the better sources.
- `apps/metrics` carries stale content over: `api/metrics-repo.js` is a 2026-03-05 snapshot and the milestones end the same day.
- `docs/documentation/05-workshop/06-dashboard.md` is `canonical` and names workshop dashboard routes that no longer exist — left locked.
- `apps/media` on kol-component 0.239 lost the browse header's ROW · COLUMN and grid/list toggles to the package's own `MediaLibrary` (now a search field and a `…` menu), rows are tighter, and a focus ring sits on the browser on load. Not a move defect: the user named "adopt the current media packages" as the step after the move.
- `apps/media` is not deployed from here yet; `admin.kolkrabbi.io` still serves the old repo's last deploy. The old repo stays untouched as the fallback.
- The lobby watch was stopped by the user mid-session and not re-armed.
- Working tree, undeployed.

## Laws this session bought
- **Check what is live before proposing a structure.** The first sitemap kept an Apparat list that was half dormant, mis-named and missing an app; subdomain status, page titles and push dates settled it in five minutes.
- **The design system may already ship the thing.** `MetricsDashboard` was in kol-dashboards the whole time — the 657-line local page was the older copy, so the "move" became a thin shell.
- **Say "off the live site", and name the exact edit.** "Retire the docs" and "archived" both read to the user as files leaving the repo.
- **A boot flag is plain words about something he can act on today.** A month-old "look at it sometime" receipt in ticket shorthand is noise.
- **One DS ticket: render everything first, ask for the seam, write no stopgap, close the receipt the turn it returns.**

## Next Steps
1. kol-ds-ui answers `reader-takes-field-config-and-page-actions`; then bump, pass the field config and the Open button from `WorkshopPage.jsx`, re-render at 1440 and 390, close the receipt the same turn.
2. User creates the metrics Vercel project (settings in the plan §6); then check the subdomain and cut over in web.
3. User eyeballs `/workshop` and the home page; round 2 of the page text from ui.kolkrabbi.io and the repos' docs.
4. User runs `pnpm media:deploy` from `apps/media` and checks both hostnames; then the old repo and its three dotfiles lobby rows retire; then the app is brought onto the current media packages.
5. His calls, untouched: the four dormant tools · the media admin on the hub · refreshing the metrics snapshot and milestones.
