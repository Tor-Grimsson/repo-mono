---
_template:
  version: 1
  path: .kol/llm-context/history.md
  sync: skip
---

# Studio website kolkrabbi.io — history & decisions

The *why* behind core decisions — for humans or agents who need reasoning, not the current state.
For rules-as-enforced see `ARCHITECTURE.md`; for current state see `AGENT-CONTEXT.md`.

---

## origin

Unified monorepo consolidating the previously-separate kolkrabbi web, foundry, and fontviewer
projects (see the legacy source paths in `AGENT-CONTEXT.md`) plus the brand site and Sanity
studios, on a shared design system (`@kol/*` packages, Tailwind v4 tokens).

## deep history

Chronological decision + workstream history predating the current active cycle. This is agent
state — it belongs here, not in the Obsidian vault (`docs/archive/` was retired 2026-07-05; it
held nothing but this). Every entry points at a session log in `session-log/` for full detail.

### Archived Active Focus (pre-2026-05-26)

- **/work Shelf + List Filters + Sanity Schema Cleanup** – Shelf rows no longer cap at 8 or repeat short rows (each project renders once). List view now uses `ContentFilters` from `@kol/ui` with Type (mutually exclusive) + Tags groups. ShelfCard hover overlay redesigned to a bottom-pinned strip with title + `{client||type} · {year}`. /work background switched `bg-surface-secondary` → `bg-surface-primary`. ProjectListItem: `bg-surface-secondary` + transparent border, `hover:border-fg-16`. Pruned 6 dead Sanity schemas (`fontFamily`, `font`, `foundry`, `page`, `navigation`, `siteSettings`) + orphaned `hero`/`richText`/`galleryGrid`/`specimenEmbed` modules + dead `FONT_FAMILIES` query/helper. Added `typeface` project type. Added per-video `aspectRatio` field (4:5 / 5:3, default 4:5) on `galleryVideo` to fix the "all videos render as 4:5 / 400px" bug — Sanity file assets have no `metadata.dimensions`, so every video was hitting the WorkDetail fallback. Frontend reads authored value first, falls back to image metadata, then 0.8. **Vercel ignored-build-step gotcha:** studio at `repo-mono-studio.vercel.app` (Sanity-hosted `kolkrabbi-work.sanity.studio` is broken) was serving a 9-second cached build after schema push — the Vercel project's Ignored Build Step only triggers on `apps/studio/**`, not `packages/content/**`. Quick fix: redeploy without cache. Permanent fix: change to `git diff --quiet HEAD^ HEAD ./ ../../packages/content/`. Session log: `2026-05-26-1653-work-shelf-list-filters.md`.
- **Metrics Host Filter + Summary Cards + Favicon** – `/metrics` now supports per-host filtering via pills at the top, backed by a `?host=X` param on `/api/metrics` that forwards `hostname=X` to every Umami call. Two pinned summary cards above Row 1: left always shows `kolkrabbi.io` (yellow); right is dynamic — shows the filtered host or the top-traffic non-main subdomain when "All" is selected (teal). New lightweight `/api/metrics-summary` endpoint feeds the summary cards (stats + pageviews for a single host). Top hosts card now displays per-host delta vs prev period; hidden entirely when a specific host is filtered. Host filter persists in the URL via `history.replaceState` — reload survives, deep-linkable. Favicon reorganized: moved `/svg/favicon.svg` → `/favicons/favicon.svg`, added `/favicons/favicon-metrics.svg` that swaps in on the `/metrics` route via `useEffect`. Session log: `2026-04-19-1442-metrics-host-filter.md`.
- **Umami Top Hosts — Metric Type Fix** – Top hosts card on `/metrics` was empty because the query used `type: 'host'` (invalid). Correct value per Umami v3.0.3 source is `type: 'hostname'`. One-line fix in `apps/web/api/metrics.js:109`. Session log: `2026-04-19-1230-umami-hostname-fix.md`.
- **Monitor Home Card Swap + Umami on monitor.kolkrabbi.io** – Swapped the homepage Monitor bento card `src`/`poster` to `monitor.mp4`/`monitor.png` in `HomeHighlights.jsx`. Added the main-site Umami tracking script to the standalone `monitor.kolkrabbi.io` Vercel repo (same `data-website-id`). Flagged: Stack OG image priority is inconsistent — Stack front page uses `coverImage`→`thumbnail`, share endpoint uses `thumbnail`→`coverImage`, and the `seo.ogImage` field on the blog schema is unused. Session log: `2026-04-18-2139-monitor-home-card-umami-subdomain.md`.
- **Blog Inline Media — Fixed 5:3 Frame** – Reverted the dynamic per-asset aspect ratio. Blog inline images (`ImageBlock.jsx`) and videos (`VideoBlock.jsx`) now use a fixed `aspect-[5/3]` frame. Removed `dimensions` projection from `BLOG_DETAIL` and `BLOG_FIELDS`. `object-cover` retained. Sanity does not transcode video via its asset CDN — plan is to pre-compress future 4K masters to 1080p before upload. Session log: `2026-04-18-1824-blog-fixed-5-3-aspect-ratio.md`.
- **Monitor Blog Reseed (Punctuation + Image Order)** – Reseeded `blog-voltage-in-the-browser` from new `_blog-5.md` draft. Reduced em dashes (15 → 2), fixed spacing, renamed images to match body placeholder order. Session log: `2026-04-17-2253-monitor-blog-seed-dynamic-image-ratios.md`.
- **Debug Fixes — Work Detail, Shelf, Lightbox, Instagram** – Fixed 3 work page bugs: `/work/:slug` direct URL 404, shelf first-card double-click, lightbox navigation (functional setState). Added IntersectionObserver to HomeInstagram to pause animations when out of view. Session log: `2026-04-12-debug-fixes-work-detail-shelf-lightbox-instagram.md`.
- **Monitor Launch — Blog, Work, Home Card** – Seeded work project (`project-monitor`) and blog post (`blog-voltage-in-the-browser`). Created `seed-blog.js` with markdown→Portable Text parser. Added `embedUrl` field to `videoBlock` schema + iframe rendering. Added Monitor bento card to home page. Session log: `2026-04-09-0536-monitor-blog-work-home.md`.
- **Kol Monitor Apparat Page** – Added `monitor.kolkrabbi.io` subdomain (Cloudflare CNAME → cname.vercel-dns.com, DNS only). Created KolMonitor.jsx iframe page, route, nav entry. Session log: `2026-04-08-kol-monitor-apparat.md`.
- **Workshop Search Crash** – Search overlay triggers React ErrorBoundary "Something went wrong". Needs dev server + console to diagnose. Likely in `buildWorkshopSearchItems()` or `parseDocsMarkdown`.
- **Sanity Seed Skill & Tool Project Seeding** – Created `/sanity-seed` skill. Fixed 5 tool `_project.md` files in vault. Seeded 6 projects (Modulator/Editor/Noter/Distress/Mirror/Pattern #3). Total Sanity projects now 28. Session log: `2026-03-18-2345-sanity-seed-skill-tool-projects.md`.
- **Studio Hero Mobile Fix** – Moved ProfileCard from hero overlay to StudioProcessCard. Responsive vertical/horizontal variants. Hero text simplified. ProfileCard default image → CDN. Unused `StudioHero.jsx` needs cleanup. Session log: `2026-03-18-0531-studio-hero-mobile.md`.
- **ASCII Cursor & Foundry Unification** – ASCII cursor (fireworks/invader/stars/crosshair). `FullBleedHero` component. Unified hero typography between `FeaturedCarousel` and typeface pages. `FoundrySection` unified with `size` prop. Site-wide padding scale 16/20/24px. Session log: `2026-03-18-2330-hero-text-responsive.md`.
- **Metrics Dashboard Fixes** – Umami API `type: 'url'` → `type: 'path'`. Range-aware visitors/pageviews. Stack posts filter fixed (`/blog` → `/stack`). Deploy ding sound via Web Audio API. IP exclusion via `IGNORE_IP`. Session log: `2026-03-18-0100-metrics-fixes.md`.
- **Modal Routes, ShelfCard & Design System** – React Router Modal Routes for WorkDetail. ShelfCard shared component. @container → @media migration (118 total). hover:bg-surface-* utilities. Session log: `2026-03-17-2330-modal-routes-shelfcard-design-system.md`.
- **Foundry Simplification** – Reduced foundry from 4 sections to single typefaces page. Removed ~120 specimen/prose files, 46 imports, 43 routes. `/foundry` renders FoundryTypefaces with full-bleed carousel. Dead code archived. Session log: `2026-03-17-1800-foundry-simplification.md`.
- **Mobile Polish, Docs Cleanup & Navbar Fixes** – SourcesItem for tool/system projects, gallery lazy-load fix, AsciiClouds conditional unmount, ProjectListItem responsive, docs triage, FooterSimple globally in SiteLayout, navbar burger rewrite. Session log: `2026-03-17-1600-mobile-polish-docs-cleanup-navbar.md`.
- **Mobile Optimization — /work and /work/:slug** – Full-width mobile detail panel, responsive spacing, TiltCard disabled on coarse pointer, ImageLightbox component. Session log: `2026-03-17-mobile-optimization-work-pages.md`.
- **Work Page Layout, Navbar Grid & ASCII Clouds** – Background `bg-fg-02`, simultaneous shelf scroll, navbar 8-col grid on /work, `AsciiClouds` extracted to `@kol/ui` (3 variants), Sanity orderable-document-list. Session log: `2026-03-13-2345-work-page-layout-navbar-clouds.md`.
- **Work Page Polish & Layout Refactor** – Detail panel header redesigned, gallery uses real Sanity aspect ratios, SiteLayout padding removed (routes own padding via `.breakpoint-padding`). Session log: `2026-03-13-2300-work-polish-typography-layout.md`.
- **Work V2 → V1 Migration (DONE)** – Promoted `/work-v2` to `/work`, retired V1, static data → Sanity queries, archived V1 dead code. Session log: `2026-03-13-2100-work-v2-to-v1-migration.md`.
- **Sanity Schema Update & Seed Script** – Project schema for Work V2: `type`, `about`, `tags`, `links[]`, `media[]`. Removed deprecated fields. Built `packages/content/scripts/seed.js`. Seeded 10 projects. Session log: `2026-03-13-1900-sanity-schema-seed-script.md`.
- **Work V2 Detail — Cinematic Hero** – Two-section scrollable overlay: 100vh hero + grid section. Panel slides up. Session log: `2026-03-13-1630-work-v2-detail-cinematic-hero.md`.
- **Work V2 View Animations** – Animated shelf/list toggle transitions, per-card staggered hinge. Session log: `2026-03-13-1400-work-v2-view-animations.md`.
- **Work V2 View Toggle** – Collins-style shelf/list toggle + animated search bar. WorkViewContext. Session log: `2026-03-13-1200-work-v2-view-toggle.md`.
- **Work V2 Static Prototype** – 4 Embla Carousel shelf rows. TiltCard `grounded` variant. Session log: `2026-03-13-0511-work-v2-static-prototype.md`.
- **Burger & Waves Rewrite** – All 6 Burger/Waves compositions rewritten. Shared `burger-shared.ts`. Session log: `2026-03-12-1736-burger-waves-rewrite.md`.
- **Animation Redo — QA, Export & Cleanup** – Rewrote Bloom V1-V5 + Flowers V1-V3. Exported 33 compositions. Archived 47+ files. Session log: `2026-03-11-1200-animation-redo-qa-export-cleanup.md`.
- **GridSymbols V2–V5 & Line Animation Skill** – Iterated GridSymbols through 5 versions. Created `/line-animation` skill. Session log: `2026-03-10-2002-gridsymbols-v2-v5-line-animation-skill.md`.
- **Apparat Pages & Remotion GridSymbols** – All 6 iframe tool pages updated with same-origin subdomains. New KolModulator, KolMirror pages. First SVG+Remotion composition. Session logs: `2026-03-10-1811-iframe-fix-kol-radial-sidebar.md`, `2026-03-10-1838-apparat-pages-remotion-grid-symbols.md`.
- **Dev Servers & Creative Tooling Docs** – Created `1.6.0-dev-servers.md` + `8.6.0-creative-tooling.md`. Session log: `2026-03-10-1811-iframe-fix-kol-radial-sidebar.md`.
- **CMS Projects Planning** – COMPLETE. Four project types, schema cleanup, copy polish, SEO. Tone skill at `/tone`. Session logs: `2026-03-09-1800-cms-projects-planning.md`, `2026-03-09-2000-cms-projects-completion.md`.
- **Work V2 Gallery-First Redesign** – New `/work-v2` test routes. DetailHero → ImageMasonry → ProjectShelf. Session logs: `2026-03-09-1600-work-v2-gallery-first-redesign.md`, `2026-03-10-1400-work-v2-hmr-fix.md`.
- **Mobile Scroll Fix & Work Card Polish** – `overflow-x: clip` on html/body/#root, responsive hero title padding, ProjectCard responsive aspect ratio. Session log: `2026-03-08-1849-mobile-scroll-and-work-cards.md`.
- **Dashboard Interactivity** – Chart tooltips, metric card cycling, list item hover, value count-up animation. Session log: `2026-03-08-dashboard-interactivity.md`.
- **Prints Page GSAP Hero** – Full-width 300vh animated gallery hero with 4-column vertical marquees. Session log: `2026-03-05-prints-gsap-hero-workshop-toggles.md`.
- **Workshop Expand All Toggle** – All 10 workshop route files destructure `allExpanded`/`toggleAll`. Toggle moved to right sidebar TOC. Session log: `2026-03-05-prints-gsap-hero-workshop-toggles.md`.
- **TogglePill Atom** – Extracted to `packages/ui/src/atoms/TogglePill.jsx`. CSS: `toggle-pill`.
- **Metrics Dashboard Live Data** – Phase 2: Umami + Neon PostgreSQL deployed. `/api/metrics` endpoint, `Metrics.jsx` wired. Session log: `2026-03-05-metrics-live-data.md`.
- **GLIF Image Generation Pipeline** – Nano Banana Pro (style refs + img2img). MCP buggy — use curl to `simple-api.glif.app`. Skill at `.claude/skills/glif-image-generation/SKILL.md`. Session log: `2026-03-03-2300.md`.
- **Playwright Screen Recording Pipeline** – Record component interactions as MP4. 2x retina, ffmpeg post-processing. Script at `apps/video/scripts/record-font-preview.mjs`. Skill at `.claude/skills/screen-recording/SKILL.md`.

### Archived "Recently Completed"

- **Input Sizing Unification** – Unified Input atom with Button/Dropdown 28/32/36px tiers. SearchInput wraps Input. Session log: `2026-03-07-2043-input-sizing-unification.md`.
- **Button Rework + Workshop Cleanup** – Button sizes (28/32/36px), size-aware icons, outline 1px. Removed all SurfacePreviewGrid usage. Session log: `2026-03-05-button-rework-workshop-cleanup.md`.
- **Dashboard Typography + Container Queries** – JetBrains Mono type system (6 `dash-*` classes), `@container` queries, Badge atom. Session log: `2026-03-05-dashboard-system.md`.
- **Analytics → Dashboard Rename** – Full rename across 4 route files, App.jsx, navigation.js. Session log: `2026-03-05-dashboard-system.md`.
- **CodeBlock Consolidation** – Merged 3 code block components into one `CodeBlock` in `@kol/ui` with Prism + copy button. Session log: `2026-03-04-codeblock-consolidation.md`.
- **Kol Distress Page** – iframe embed at `workshop/apparat/kol-distress`. Session log: `2026-03-03-2100.md`.
- **Screen Recording Skill** – Created `/screen-recording` skill. Session log: `2026-03-03-2100.md`.
- **Remotion Video Pipeline** – Scaffolded `apps/video` with Remotion, Tailwind v4. Created `/remotion` skill. Session log: `2026-03-03.md`.
- **OverviewCard Extraction** – Extracted reusable `OverviewCard` molecule to `@kol/ui`. Refactored 8 overview pages. Session log: `2026-03-01.md`.
- **Interactive → Animations Merge** – Merged Interactive page into Animations. Session log: `2026-03-01.md`.
- **index.css Cleanup** – Reduced from 720 lines to 35 (imports-only). Session log: `2026-03-01.md`.
- **Table Consolidation** – Deleted redundant `DataTable.jsx`, migrated 18 consumers to `Table`. Session log: `2026-03-01.md`.
- **Standalone `@kol/table` Package** – Created `packages/table/` with self-contained CSS. Session log: `2026-03-01.md`.
- **`@apply` Removal** – Eliminated all `@apply` directives across all CSS files. Session log: `2026-03-01.md`.
- **Shell Layout Refactor** – Extracted `ShellLayout` to `@kol/ui/layout`, replaced `WorkshopLayout`. Session log: `2026-02-28.md`.
- **Documentation Page + Mobile Menu** – Route structure, mobile breakpoint fixes. Session log: `2026-02-28.md`.
- **Print Store 24-Print CDN Migration** – Migrated 12 hardcoded prints to 24 CDN-managed prints. Session log: `2026-02-18-2230.md`.
- **Stack Article Share Previews** – Per-article SEO tags + share buttons, serverless share endpoint (`/api/share/stack?slug=`). Session log: `2026-01-10-1645.md`.
- **Stack Article Media Ratios & Hero Srcset** – 16:9 inline media, responsive 2:1 hero `srcset`/`sizes`. Commit: `ef67715`. Session log: `2026-01-10-0951.md`.
- **Print Store Pricing Refactor** – Centralized pricing in `prints.js`, 8 PayPal links, dynamic price calculation. Session log: `2025-12-29-prints-pricing-refactor.md`.
- **Content Protocol / Documentation Hub Iterations** – Hero/tab/breadcrumb adjustments. Session log: `2025-11-07-2319-content-protocol-work-log.md`.

### Chess analytics saga (all COMPLETE — Nov 2025)
Full visual customization (4 piece sets × 6 board themes), advanced analysis features (keyboard shortcuts, captured pieces, material eval), controls layout refinement, multi-size board support, coordinate labels, and data-integration Phases 1–7 over 27,200 games. Session logs: `2025-11-07-chess-*.md` (customization, analysis-advanced-features, controls-layout-refinement, chessboard-piece-sizing, coordinate-labels-final, components-final-improvements, analytics-phase-7-icons, badge-styling-histogram-fix, hotfix-phase-6, data-integration-phase-1 through -6, circular-gradient-chart), `2025-11-04-1830-chess-board-green-pieces.md`, `2025-11-04-1800-chess-apparatus-simplification.md`.

### Earlier foundations (COMPLETE)
- **Documentation system live connection** – Connected `docs/documentation/` (43 structured docs) to `/styleguide/design-system/documentation`.
- **Dropdown/Input atom sync** – Shared sizing/spacing/bg rules. Session log: `2025-11-06-2343-dropdown-input-alignment.md`.
- **Markdown parser implementation** – Shared `parseDocsMarkdown.jsx` utility.
- **Work page refactor** – ProjectsGrid (9 cards), ProjectCard, WorkSection header.
- **Structure unification** – Home/Work/Foundry use `<main>` + `.main-wrapper`.
- **Component migrations** – ImageSection → @kol/ui, ControlButton created.
- **Design system cleanup** – `.btn-control` padding, unified 4px radius, removed inline styles.

### Archived "Latest Milestones"

- `2025-10-29-2206-foundry-hero-refactor.md` – Pill component (3 variants), FoundryHero with ButtonGroup, kol-div agent + 8.0-div-structure.md baseline.
- `2025-10-16-1700-color-system-debugging-complete.md` – Fixed button context-awareness, inverse token architecture, DataTable pills, debugging checklist.
- `2025-10-16-1102-styleguide-color-tweaks.md` – Orange brand primitive, checklist formatting, theme toggle demos.
- `2025-10-16-1600-color-system-refactor-complete.md` – Color system refactor Phases 1-5. 69 tokens, 46 utilities, zero breaking changes.
- `2025-10-16-0242-styleguide-color-update.md` – Styleguide color page reorganized.
- `2025-10-16-1500-color-system-refactor-phase-4-complete.md` – State variant tokens/utilities (11 tokens, 16 utilities).
- `2025-10-16-1400-color-system-refactor-phase-3-complete.md` – Component abstraction removed, elevation system added.
- `2025-10-16-1200-color-system-refactor-phase-1-2.md` – Token architecture, geometric scale, surface borders.

### Archived "Future Tasks (Logged)"
(Also tracked in `memory/MEMORY.md` Pending Ideas.)
- **Wide Viewport Sidebar Expansion** – At 1600px+, expand left sidebar 256→360px, right TOC 160→256px.
- **Delete SurfacePreviewGrid** – Dead code (zero consumers after workshop cleanup).
- **Metrics Phase 2** – Umami aggregation endpoint, wire `/metrics` to live data. Plan: `plans/done/metrics-data-plan.md`.
- **Shift+Alt hover for classNames** – WorkshopDevTooltip showing className on Shift+Alt+hover.

### Archived older handoff notes

**Handoff (2026-05-26, work-detail modal removal):** `/work/:slug` is no longer a modal overlay — it's a regular slug URL page. Modal Routes block deleted from App.jsx; `Work.jsx` + `ShelfCard.jsx` Links no longer pass `backgroundLocation`; `WorkDetail.jsx` stripped of `isModal`/`panelRef`/slide-up motion/backdrop. Hero locked to source aspect ratio via new `aspectRatio` field on `heroVideo` (4:5/5:3, default 5:3); frontend reads authored value or `heroImage.dimensions.aspectRatio`, falls back to 5/3. Title now an overlay anchored bottom-left of the hero frame. Scroll listener replaced with IntersectionObserver. In-page sticky header removed (modal artifact). `pt-[68px]` clears the Navbar. `WorkViewContext` initial state `'shelf'` → `'list'`. Installed `embla-carousel-wheel-gestures` and wired `WheelGesturesPlugin` into all three Embla instances; flipped `containScroll: false` → `'trimSnaps'`. TS2322 in `project.ts:280` prepare() fixed. **Open audit items** (deferred): SEO meta tags from `project.seo.*` + dynamic `document.title`, replace `getAllProjects()` with `getProjectBySlug(slug)` + smaller More Work query, drop `select-none` modal artifact, replace `capitalize` class with `TYPE_LABELS[type]`, cap More Work shelf at 6, loading skeleton instead of `null`, extract `useDragSuppressedClick` hook (triplicated), hero fallback if both heroVideo+heroImage missing, verify ImageLightbox renders `<video>` for galleryVideo items. **Carried:** Vercel Ignored Build Step fix on studio project — change to `git diff --quiet HEAD^ HEAD ./ ../../packages/content/`.

**Handoff (2026-04-19, metrics host filter):** `/metrics` per-host filtering via pills, `?host=X` on `/api/metrics` scopes every Umami call. Two pinned summary cards (left = `kolkrabbi.io`, right = dynamic). New `/api/metrics-summary` endpoint. URL persistence via `history.replaceState`. Favicon moved to `/favicons/`; metrics route swaps to `favicon-metrics.svg`. **To verify on deploy:** whether Umami v3's `/stats` and `/pageviews` apply `hostname=X` as a filter. Earlier: Umami metric type `host` → `hostname`. Monitor bento card uses `monitor.mp4`/`monitor.png` (old `12.mp4` + `hl-monitor-1200.png` dead). Main-site Umami script added to standalone `kol-monitor` repo. Flagged: Stack OG-image priority inconsistency. Blog inline images/videos switched to fixed `aspect-[5/3]`.

### Stale-backlog purge — 2026-07-30 (user verdict: close, never raise again)

Six long-dormant threads were closed **unruled** in one act. They are not deferred, not
parked, not awaiting anything — they are gone. Any future session that finds a trace of
them is looking at provenance, not a backlog. Do not resurrect, re-scan or re-report.

| Closed | Where it went |
|---|---|
| Icon staging — 3,472 SVGs, ~190 blind solids, promote-or-delete | shelf stays inert at `_tmp/brand-staging-icons/`; plan → `_tmp/plans-elder/` |
| ds-seeding Batch-2 rulings — `kol-segment-title` · 28/32px chrome | playbook marked CLOSED in-file |
| web-polish threads — sitemap script · docs typography · apparat stories | already all `[x]`; playbook was closed 07-28 |
| post-merge smalls — 2 latent `/NN` no-ops · navbar touch-at-top · deep-page reveal | plan → `_tmp/plans-elder/` |
| web-audit-5d tail rulings — hero px-ladder · divider seat · Bento/ArticleCard · rendered audit | ⛔ FULLY CLOSED box on `plans/done/web-audit-5d-inventory.md` |
| 7 dead plan files — chess-ds-swap · dashboard-ds-swap · workshop-content-flow · work-video-b2 · design-system-mobility · edge-injection · monitor-graphics | → `_tmp/plans-elder/` (work-video-b2 was already ✅ COMPLETE 07-05) |

`plans/` now holds four live files only: `brand-audit-inventory.md`, `metrics-data-plan.md`,
`project-descriptions.md`, `web-audit-5d-inventory.md`.

---

## what's *not* in this document

- Load-bearing decisions as rules → `ARCHITECTURE.md`
- Current state, roadmap, gotchas, contracts → `AGENT-CONTEXT.md`
- Session-by-session dev log → `session-log/`
- Speculative future work → `plans/`
