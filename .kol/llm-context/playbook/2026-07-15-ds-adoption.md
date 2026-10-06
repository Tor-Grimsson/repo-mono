# Playbook — DS adoption (website → published @kolkrabbi/*)

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`. Plan: `sprint-ds-adoption/03-plan.md` · registry: `sprint-ds-adoption/04-package-registry.md`.

**Goal:** Hoist apps/web (+brand) off the internal `@kol/*` elder packages onto the published
`@kolkrabbi/kol-*` DS. Currently at plan Step 3, /work surface.

**Standing rules (non-negotiable):**
- Propose the action and get an explicit OK BEFORE taking it. One bite per go.
- Check `04-package-registry.md` (or re-enumerate the scope) before declaring anything not-shipped.
- Build gate `pnpm exec turbo run build --force` 5/5 · visual gate = the user, live.
- No upstream equivalent → import stays on `@kol/ui`, goes in the gap tally.
- No git, no publishes — DS-side fixes are the user's court.

---
## Entries

[12:38 GMT · 2026-07-15] · setup · playbook created
  what → initialised the live playbook for the ds-adoption arc   why → user ruling: this arc journals here, not in ad-hoc sprint docs
  note → state at creation, backfilled from this session (clock times not recorded per item, sequence accurate):
    · deps — kol-component ^0.9.0, kol-framework ^0.4.0, kol-theme ^0.7.4 (web+brand) bumped + installed · build ✓
    · /work swaps ×3 — Work.jsx ContentFilters → kol-component · WorkDetail.jsx Divider → kol-component · ImageLightbox.jsx Icon → kol-icons · build ✓ · USER visual check pending (list-view header gains upstream's inline search toggle — expected delta)
    · gap tally so far — AsciiClouds (no upstream, only AsciiCursor) · SourcesItem/SourcesSection (superseded by kol-content SourcesReferences, swap proposed) · useTheme (kol-framework exports none, ×3 consumers wait)
    · registry — sprint-ds-adoption/04-package-registry.md created: all 18 @kolkrabbi pkgs enumerated; SourcesReferences ships in kol-content@0.1.0 since 2026-07-09
    · recon flags — kol-specimen ≈ subset-dup of kol-foundry (DS-repo question) · kol-content also ships the /work apparatus (WorkCard, WorkListItem, ParallaxShelf, WorkViewToggle) → parity read before any swap
    · process — 05-work-surface-playbook.md deleted same turn (redundant with 03-plan + this journal)
  next (awaiting OK) → Phase 1: pnpm add @kolkrabbi/kol-content + @source/optimizeDeps scaffold, WorkDetail SourcesItem → SourcesReferences (title="", meta→note)

[12:43 GMT · 2026-07-15] · bite 1 · /work/:slug sources → kol-content
  what → kol-content ^0.1.0 installed + scaffold (index.css @source, vite optimizeDeps.exclude) · WorkDetail.jsx SourcesItem map → <SourcesReferences title="" sources={links.map(…)}/>, meta→note, page label kept verbatim
  why → elder trio (SourcesSection/SourcesItem/prose.css) superseded by self-contained upstream
  verify → build ✓ 5/5 · USER visual check pending (tool/system detail page, both themes)
  note → elder SourcesItem/prose.css left alive — StackArticle still consumes (own arc) · @kol/ui import gone from WorkDetail entirely

[12:48 GMT · 2026-07-15] · bite 2 · parity read done (read-only) — verdicts to user
  what → compared kol-content Work* vs local: WorkCard≈ShelfCard port (flat props + onNavigate seam, kol-sans-display-02 replaces inline TGDylgjur, meta loses uppercase) · WorkListItem≈ProjectListItem port (row=anchor, Tag chips replace joined text, kol-sans-heading-03 replaces inline TGMalromur italic, active-border actually implemented — local's isActive prop is dead) · ParallaxShelf≈ShelfRow port (same constants/gutter/guard, adds reduced-motion, ⚠ drops WheelGesturesPlugin → desktop wheel-scroll regression) · WorkViewToggle = navbar control replacement (controlled view/query props; WorkViewContext stays as state owner) · ScrollDriftGallery = no local counterpart on /work, n/a
  note → awaiting per-row rulings before any edit

[13:02 GMT · 2026-07-15] · bite 2 close · USER RULING: accept all four as published
  what → WorkCard, WorkListItem, ParallaxShelf, WorkViewToggle adopted as-is — deltas accepted (Right Grotesk type, no wheel gestures, Tag chips, verbatim casing) · backport brief written for the DS repo: docs/operations/01-workflow/03-work-surface-ds-backport.md (TG display-face slot/seam · ParallaxShelf plugins prop · AsciiClouds port)
  why → user mid-work in DS repo, can't change it now — site adopts published truth, DS retro-fits from the brief
  next (awaiting OK) → bite 3: the four swaps in Work.jsx (ShelfRow→ParallaxShelf, ShelfCard→WorkCard, ProjectListItem→WorkListItem, navbar control→WorkViewToggle), one build+visual gate

[13:14 GMT · 2026-07-15] · bite 3 · the four /work swaps landed
  what → Work.jsx: ShelfRow (~95 lines embla/parallax) deleted → <ParallaxShelf items={toCardItem(…)}> · ListRows: Link wrapper dropped → <WorkListItem href/active/onNavigate> · WorkDetail.jsx: MoreWorkShelf ShelfCard → WorkCard (flat props) · Navbar.jsx: local WorkViewToggle (~137 lines) → thin wrapper around kol-content's (view/onView/query/onQuery, listIcon="view-list"), dead CUBIC_EASE removed
  why → bite-2 ruling: accept published components as-is
  verify → build ✓ 5/5 · zero ShelfCard/ProjectListItem consumers left (orphans, delete at bite 4) · USER visual gate pending (shelf drag+parallax, list rows, navbar pill+search, both themes; wheel-scroll on shelves is expected-dead until DS backport)
  note → context isSearchOpen/setIsSearchOpen now unused by navbar — trim with orphan deletion at bite 4

[13:34 GMT · 2026-07-15] · consume bite · kol-content 0.2.0 (the backport resolution)
  what → dep ^0.2.0 + install · index.css: .work-display-title/.work-display-preview (TG faces per brief §5) · titleClassName rides toCardItem (ParallaxShelf spreads items into WorkCard) + explicit on WorkDetail's WorkCard · previewClassName on ListRows' WorkListItem · plugins={[WheelGesturesPlugin()]} on ParallaxShelf — wheel scroll restored · vault brief synced with user's resolved 1.1.0 (_tmp copy: seams shipped, AsciiClouds REJECTED from DS — permanent elder resident)
  why → DS shipped the /work backport (class seams + plugins pass-through), site consumes it — TG display faces restored
  verify → build ✓ 5/5 · USER visual gate now covers everything: shelf (TG titles + wheel scroll), list (TG italic previews), navbar control, sources block, both themes

[13:47 GMT · 2026-07-15] · list-view parity fixes (user screenshot review: live vs dev)
  what → ListRows: previewClassName += "text-xl md:text-5xl" (seam replaced heading-03, my class carried no size — preview rendered tiny) · tags shim: one pre-joined chip [tags.join(' · ')] restores live's dotted line · docs/DS-CHANGES.md created (direct child of docs/, per user) — DS-repo ledger: WorkListItem titleClassName seam (user shipping), tags seam, useTheme, light-first block, specimen/foundry dup, R2, kol-segment-title; rejected list carries AsciiClouds + token slot
  why → dev/live diff: uppercase bold title (blocked on DS seam), tiny description, missing tag dots
  verify → build ✓ 5/5 · title fix waits on kol-content 0.2.x titleClassName → then site passes "kol-mono-sm uppercase"
  note → __TITLE__ tab mystery root-caused for user: index.html ships literal placeholders; prod substitutes per-request via api/metadata-proxy (vercel.json rewrites ALL routes through it, STATIC_META has /work) — dev has no proxy, and Work.jsx renders no <SEO>, so nothing ever sets document.title client-side. Also means SPA-nav to /work on PROD keeps the previous page's tab title. Fix candidate (not approved): render <SEO> from STATIC_META in Work.jsx — matches AGENT-CONTEXT next-step "/work/:slug SEO meta tags"

[13:57 GMT · 2026-07-15] · /work SEO fix (user-approved "bug, sure ok fix")
  what → Work.jsx renders <SEO> from seoMetadata.work (title/description/ogImage + ogUrl/canonical) — Home.jsx pattern
  why → dev tab stuck on __TITLE__ + prod SPA-nav kept previous page's title (no client-side setter on /work)
  verify → build ✓ 5/5
  note → /work/:slug per-project SEO still open (AGENT-CONTEXT next-step №2, out of this bite) · card-preview clip fix proposed (padding via unlayered .work-display-preview — beats layered utilities), awaiting go

[14:01 GMT · 2026-07-15] · preview-clip fix ✓ (user: "worked, bjutiful")
  what → .work-display-preview += padding-left 0.08em / margin-left -0.08em — italic A's left serif escapes the overflow-hidden clip, net-zero alignment
  note → first attempt (padding-block, vertical axis) was wrong + reverted; clip was horizontal at line start
  verify → user visual ✓ live on HMR

[14:03 GMT · 2026-07-15] · shelf-card drawer parity (user screenshot: dev vs correct)
  what → titleClassName += "text-4xl lg:text-5xl" at both WorkCard call sites (toCardItem + WorkDetail) — seam had eaten kol-sans-display-02's size, same failure as the list preview · DS-CHANGES.md gains #8: metaClassName seam on WorkCard (meta line uppercase blocked on DS, ship with #1)
  verify → HMR (user checking) · pending DS publish: WorkListItem titleClassName (#1) + WorkCard metaClassName (#8)

[14:07 GMT · 2026-07-15] · AsciiClouds → app-local (user-approved)
  what → mv packages/ui/src/atoms/AsciiClouds.jsx → apps/web/src/components/ui/ (beside AsciiCursor) · Work.jsx relative import · elder barrel export line deleted
  why → user DS ruling (not design-system material) + only consumer is Work.jsx + ascii family already app-local (cursor, instagram-card fireworks)
  verify → build ✓ 5/5 · zero stale refs · Work.jsx now 100% elder-free — /work gap tally EMPTY
  note → later dedup candidate (home pass, not now): instagram card's inline AsciiLayer ≈ AsciiClouds' internal AsciiLayer

──────────── MILESTONE: /work surface (bite 4 close) ──────────── [14:54]
  what → deleted: ShelfCard.jsx + ProjectListItem.jsx (orphans) · 5 dead routes/collections/ files + dir (user: content migrated to CMS entries, unrouted — verified) · CollectionGrid.jsx + organisms barrel line + CollectionGridPreview.jsx + gallery section entry (ComponentsOrganisms.jsx) · WorkViewContext isSearchOpen fields trimmed
  docs → board rows 2/3/4 current (Step 3 DONE, collections struck from scope) · site-tree: Collections branch → retired-to-CMS note
  verify → build ✓ 5/5 · straggler grep clean
  open (carried, not /work blockers) → DS publish #1 titleClassName + #8 metaClassName (user's court) · FoundryCTA down to 5 live sites (foundry ×3, prints ×2 — foundry-pass decision) · stale: 9 collections entries in seoMetadata.js + 2 stale /collections links (LinkCardPreview, FooterTest) · user full visual pass outstanding
  log → session-log pending user /log-work

[15:11 GMT · 2026-07-15] · workshop right-sidebar diagnosis + @source line (session-log written 14:5x — /work arc SEALED there)
  what → root cause: NO @source line for kol-workshop → its unique Tailwind utilities (text-meta/text-body = v4 font-size utilities) never generated → right sidebar (WorkshopDefaultSidebar) falls to defaults; left sidebar survives only because its class names co-occur in scanned files · fix: index.css += @source kol-workshop (local, dies when DS fix ships) · DS-CHANGES.md += #9 kol-theme kol-sources.css manifest (kills the whole footgun class — bit twice: 07-09 shell collapse, today)
  verify → USER: dev restart, recheck sidebar type/size; if font still wrong → DevTools computed font-family on one sidebar item
  next (awaiting go) → workshop theme toggle: local workshop-system/shell/ThemeToggle.jsx (102 lines) → kol-framework ThemeToggle · landmine: leftover .dark class vs data-theme (07-09 note) — gate both themes

[15:29 GMT · 2026-07-15] · right sidebar ACTUALLY fixed — @source theory was wrong
  what → DOM (playwright, read-only vs user's dev server): rendered links = app-local WorkshopSidebarContent.jsx with BARE chrome classes (no kol type) — vendoring workshop-system back into website dropped the type classes (user confirmed origin) · fix: package-parity classes added — labels += kol-helper-10 text-meta, links/actions += kol-mono-14 text-body — in WorkshopSidebarContent.jsx (feeds ~6 workshop pages) + Documentations.jsx DocsLandingToc (same disease)
  note → theme CSS is deliberate: shell-sidebar-* = layout only, type lives in JSX · @source kol-workshop line stays (hygiene) + ledger #9 stands · vendored workshop-system/shell + /compositions have ZERO importers — dead-code delete candidates, next housekeeping bite
  verify → user HMR check pending · playwright page closed

[15:43 GMT · 2026-07-15] · right sidebar spacing aligned to package numbers
  what → WorkshopSidebarContent.jsx: root space-y-10 pr-4 → space-y-4 · inline paddingBottom 12px dropped from section headers (theme's 8px label margin governs) · collapse chevrons kept (feature)
  verify → user HMR check

[15:49 GMT · 2026-07-15] · sidebar "still broken" = STALE HMR, fix was already live
  what → DOM probe (playwright, fresh load): L/R rows numerically IDENTICAL (JetBrains 14px/18lh, 64% ink, h=26) · R labels correct (kol-helper-10 text-meta, 10px) · root cause of user's screenshot: setTocContent stores a React ELEMENT in ShellLayout state — HMR keeps the old function reference, so the pushed TOC renders stale until the tab reloads
  note → real nit found: package ShellSidebar's group-toggle WRAPPER carries shell-sidebar-label with no type classes (16px box, left side, ×2) — cosmetic box-height only, folded into ledger #10 scope
  verify → playwright measurements above · user: one tab reload

[16:56 GMT · 2026-07-15] · sidebar spacing rolled back (user order) · theme toggle sized to DS reference
  what → WorkshopSidebarContent spacing edits REVERTED (space-y-10 pr-4 + 12px header pad restored; type classes stay) · toggle: confirmed the rendered one IS the DS's (chain: ShellLayout → kol-framework ShellHeader → framework ThemeToggle; local workshop-system/shell/ThemeToggle.jsx = dead code) · user DevTools reference: 36×36 button / 20px svg vs framework's hard-coded 32/18 → index.css shim (width/height 36 + scale(1.111) on glyph window — swap machinery is inline-styled, scale avoids fighting it) · DS-CHANGES #10 (sidebar-family rhythm ruling) + #11 (ThemeToggle size prop; delete shim when shipped)
  verify → user HMR check on the toggle size

[17:01 GMT · 2026-07-15] · toggle size ACTUALLY fixed — root cause was baked SVG attrs
  what → first shim (scale) was wrong-layer: DOM probe showed svg renders with hard width/height="32px" ATTRIBUTES from the kol-icons mode-toggle-01/02 files — Icon size prop no-ops, glyph 32px everywhere · shim v2: CSS forces svg 20×20 + button 36×36 (CSS beats svg presentation attributes) · measured live post-fix: btn 36×36, svg 20×20 = user's DevTools reference exactly · ledger #11 rewritten: clean the 2 SVGs in kol-icons (viewBox-only per icon-set discipline), delete shim when shipped
  verify → playwright measurement ✓ · user visual pending

[17:19 GMT · 2026-07-15] · THEME MIGRATION — web off the elder theme system entirely
  what → Navbar: both hand-rolled toggles (desktop+mobile) → kol-framework <ThemeToggle/> (owns state, writes data-theme + kol-theme key) · new hooks/useThemeAttr.js (read-only: data-theme via MutationObserver, else prefers-color-scheme) — HomeHero, HomeFoundry, FeaturesCardSection, InteractivePreview swapped onto it · index.html boot: key theme→kol-theme with one-time carry-over, .dark classList line dropped · utilities.css: 4 .dark-only brand-filter selectors → :is([data-theme="dark"], .dark) pair (web's last .dark-only dependency)
  why → landmine confirmed live: elder useTheme's 'dark' fallback ALREADY served dark hero video on light pages (user-reported) — two theme systems disagreed on key/marker/propagation
  verify → build ✓ 5/5 · elder useTheme: zero live consumers (only a museum prose string + ThemeToggleMoleculePreview exhibit) · USER gate: toggle on navbar (36/20 shim applies — same aria-label), home hero follows toggle+OS both ways, workshop toggle unaffected
  note → ledger #3 (framework useTheme export) now MOOT for web — useThemeAttr covers reading; leave #3 as a DS nicety or strike at next ledger pass

[17:23 GMT · 2026-07-15] · theme migration USER-VERIFIED ✓
  what → user confirms: home hero follows the navbar toggle both ways — wrong-hero bug dead
  verify → user visual ✓ · migration arc closed
  open (carried) → DS publishes: #1 titleClassName, #8 metaClassName, #9 @source manifest, #11 mode-toggle SVG clean (shims in index.css die with #11) · vendored workshop-system/shell + /compositions dead-code deletion (awaiting go) · sidebar-rhythm ruling #10

[23:31 GMT · 2026-07-15] · prints/conformance + cta-lobby · PrintDetailOverlay · PrintsGrid · kol-ds packages/component
  what -> overlay rebuilt DS-compliant (TabsRow, Icon x, kol-helper-10/mono-14/12, sans-heading-01/02, bg-fg-absolute-80 scrim, dead uppercase prop gone); ContentFilters -> kol-component; dead PrintDetail.jsx -> _quarantine; FoundryCTA LOBBIED into kol-component 0.12.0 (centered CTA tier, href+onNavigate seam, no router dep) — awaits push
  open -> prints FoundryCTA swap on 0.12.0 bump · foundry surface next · HARVEST LATER (user): home-page card family (text-left/image-right etc.) -> kol-component candidates

[00:21 GMT · 2026-07-16] · foundry/sweep · routes/foundry · TypefacePage · components/ui
  what -> kol-foundry ADOPTED (dep+vite exclude; sources manifest already covered): 6 package twins swapped in (StyleSection/FontPreview/VariableFont/GlyphMetrics/CharacterSets/LibraryGridWithVariables, linkComponent={Link} seams); 5 dead locals -> _quarantine; bucket-2 atoms swapped (Button/Divider/Dropdown/Pill/SectionLabel/Icon/ContentFilters); cut cards VENDORED app-local per ruling-stands (components/ui/{FeatureGrid,FeatureCard,PairingsList,PairingCard}, elder deps conformed); ButtonGroup -> children API; TypefacePage off applyTheme/getInitialTheme (dead toggleTheme deleted); FoundryCTA x2 -> kol-component (to->href, onNavigate)
  verify -> build 5/5 · foundry routes elder files 15->3 (all = workshop-held museum chain: local WithVariables+LibraryGrid+VariablePreview for FoundryOrganismsPreview) · app census 66->51
  open -> fontviewer 6 files PARKED (engine not extracted — DS lobby arc) · museum chain dies at workshop joint session
[00:38 GMT · 2026-07-16] · sections+misc/sweep · components/sections · cards · ui
  what -> Button x6 + Divider + ButtonGroup(children API) -> kol-component; ProfileCard TogglePill -> ToggleSwitch (visual: switch not pill — user eyeball) + Icon -> kol-icons; CarouselNavigation VENDORED to components/ui (no DS twin); local FeaturedCarousel KEPT (DS twin lacks HLS media/per-item flags/fullWidth+rounded — ledger-3.0 convergence candidate), internals swapped
  census -> TRUE elder (ui/component/loader/fontviewer): workshop 30 (joint) + fontviewer 6 (parked) + foundry museum 3 = 39 files; sections/cards/ui/misc ZERO. NB @kol/content = internal Sanity schema pkg (ARCHITECTURE §5), never elder — census corrected
  verify -> build 5/5
[01:25 GMT · 2026-07-16] · type-name-arc · 45 open files
  what -> theme 0.10.0 consumed (Display Tight tier live); elder->DS type sweep executed via perl map (mono->kol-mono-N, helpers+uc->kol-helper-N+uppercase, text/body->kol-sans-body-0N, headings->kol-sans-heading-0N, tight family->kol-display-* verbatim names, kol-heading-display+display-xl ghosts->display-lg); 1 ghost kol-helper-uc-sm hand-fixed
  scope -> open surfaces only; EXCLUDED: workshop (joint), fontviewer (parked), foundry museum chain, data/workshop (audit data, not styling)
  verify -> build 5/5 · zero elder type classes in open files
  next -> elder CSS deletion blocked on held surfaces; user visual pass over site type
[01:46 GMT · 2026-07-16] · fontviewer-lobby/consume + stack-verify
  what -> stack articles VERIFIED FIXED live (roles+faces+masthead correct, 0 console errors — killed by prose-roles+0.10.0 chain); fontviewer engine lobbied (kol-foundry 0.5.0 ./engine + GlyphItem, viewer CSS -> kol-theme 0.11.0) + consumed; 8 fontviewer files swapped (6 census + 2 HIDDEN double-quote-import files the census greps missed — census now quote-agnostic); defaultFontUrl -> /fonts/*.ttf (root public); elder @kol/fontviewer dep DROPPED from apps/web
  census -> whole-app elder: workshop 30 + foundry museum 3 = THE JOINT SCOPE ONLY. web is otherwise zero-elder.
  verify -> build 5/5

[00:25 GMT · 2026-07-28] · workshop-sweep /kol-goal · routes/workshop · components/workshop · data/workshop · App.jsx
  what -> museum DELETED-BY-RULING (ui.kolkrabbi.io/brand.kolkrabbi.io/chess.kolkrabbi.io = canonical homes; backworking previews = negative value): 76 files -> _tmp/workshop-museum-elder (14 museum/subject routes + typeAudit, 53 preview components in 3 orphan waves, 4 chess routes, museum data files); OverviewCard VENDORED components/ui (no DS twin @ dashboards 0.2.0) — 3 keepers swapped; nav pruned to 6 groups; home WorkshopFeatures href repointed
  verify -> build 5/5 · workshop elder census 0 · survivors with live consumers kept (DesCard/WorkshopSidebarContent/CardFeatureItem/FeatureCard)
  note -> pre-session: kol bumps consumed (chess 0.5.0 / dashboards 0.2.0 / theme 0.11.1) · elder remaining app-wide: foundry museum chain 3 (parked ruling stands)

[00:25 GMT · 2026-07-28] · embed-rework about/preview split · EmbedFrame · EmbedOverview · embedSections.js
  what -> iframe-on-scrollable-page = scroll trap (USER law: 'about' and 'preview' never share a page): EmbedFrame full-bleed via package seams (ShellFullHeightContext + ShellTocCollapsedContext — page scroll dead, right rail dropped); EmbedOverview = about page (blurb + primary Button + linked views); DS group fans out to REAL ui.kolkrabbi.io routes (components/blocks/sets/color/typography/icons — spacing+breakpoints don't exist there yet); 3 hand-rolled embed pages -> _tmp
  note -> CONFORMANCE FIASCO logged: agent copied pre-existing hand-rolled pseudo-button (inline chrome + legacy 'interactive' icon) into 2 new files unaudited, then defaulted variant=outline vs USER standing rule primary-default -> all fixed (Button primary, v1 icons desktop/external-link); lesson -> existing file ≠ precedent; conformance (DS-way + curated icon) joins the checklist next to import census; memory written: buttons-never-default-to-outline
  note -> sidebar leaf groups don't navigate (ShellSidebar headers = toggle-only buttons; children NavLinks are the only nav) -> every embed group carries an Overview child

[00:25 GMT · 2026-07-28] · next-round plan AGREED (user) · brand/chess/dashboard/apparat + shell scroll
  plan -> brand children kolkrabbi//reference//editor-compose (real brand routes verified) · chess games//stats (/stats verified in kol-chess) · dashboard Metrics REBUILD (dead data) -> 4 embeds kolkrabbi.io/metrics?tab=site|project|infra|sessions (+1-line ?tab= init in Metrics.jsx) · apparat: fossil redirects (retired-inline-pages decision) -> EmbedFrame pages, external = opt-in, overview -> dashboard-style about+sections · overscroll-behavior kill (minimax ref)
  blocker -> shell scroll architecture (1 scroll container wraps grid; sidebars sticky+max-h hack -> cut/co-scroll) lives in kol-workshop ShellLayout -> DS-side round, placement discussion next
  parked -> typography conformance arc (dashboard docs pages) · popup/popover unused (backlog'd)

[04:53 GMT · 2026-07-28] · NAV OWNERSHIP — whole workshop system vendored · workshop-system/ · App.jsx · package.json
  what -> USER LAW (re-stated; original 07-09 lift was snapshot-for-DS, NOT parent): this repo owns ALL navigation — kol-workshop 0.1.7 source vendored WHOLE (shell/compositions/tags/docs/engine, 25 files) into src/workshop-system/ (replacing the dead 07-15 vendor); kol-framework ShellHeader vendored as shell/WorkshopHeader.jsx; 8 consumer files' imports swapped to local; @kolkrabbi/kol-workshop dep DROPPED (lockfile settled)
  local fixes landed same stroke -> KOLKRABBI wordmark → '/' (was /workshop), WORKSHOP wordmark → /workshop (was unlinked); search trigger → DS Button (ghost quiet iconOnly); tabs +kol-mono-14; nav group icons → v1 (book-open/component-01/edit/stat-chart-a/target/chess-pawn)
  verify -> build 5/5 · zero @kolkrabbi/kol-workshop imports · engine stays building-block-free of shell (blocks from DS: Button/Icon/Drawer/SearchOverlay/Assets/theme CSS)
  ds-side -> lobby note staged: kol-ds-ui/lobby/WorkshopSystemVendored.md (+INDEX row) — package fate (stop-publish vs deprecate) = user's call later
  note -> earlier same session: theme 0.11.3→0.11.6 + framework 0.5.4 + chess 0.5.1 consumed (link-blue dead, theme law explicit>system>light); dark-OS-shows-light = stale localStorage kol-theme:'light', not code

[07:02 GMT · 2026-07-28] · icon curation + bumps + cleanup round · kol-ds-ui packages/icons · embedSections · OverviewCard
  what -> v1 CURATION (4 user rulings, DS-side, icons 0.7.1): foundation art replaced (dice out, svg-web art in) · true frequency imported (stroke/system one = dashboard glyph) · cone + database MOVED into v1; consumer swaps x9 (book-open/edit/stat-chart-a/component-01/scribble/overlap/roadmap/search + search-16→search) — workshop resolves ZERO icons from legacy
  chess -> re-pointed to real routes: Overview · Analysis(/analysis) · Statistics(/stats) · Database(/database)
  bumps consumed -> icons 0.7.1 · theme 0.11.6→0.11.7 · framework 0.5.4 · (theme law now explicit>system>light; dark-OS light = stale localStorage kol-theme, verified system-follow works)
  card aspect -> ROOT CAUSE: h-60/h-64 fixed-height card in a container that got wider (shell went full-width) → OverviewCard now aspect-[4/3] (original proportions), h-64 overrides stripped from 4 overview pages
  cleanup -> packages/chess-data QUARANTINED → _tmp/packages-chess-data (pre-merge item closed; build graph 5→4 tasks, green)
  popover REFRAMED -> user meant TOOLTIPS: DS Tooltip ships unused; icon-only chrome shows no hover name; all buttons are ours post-vendor → consumer-side fix; glance-list rejected, mechanical sweep required
  NEXT ARC (agreed, awaiting go): 5-dimension audit of apps/web — 1 tooltips · 2 labels/a11y (alt/aria) · 3 SEO/meta per route (folds parked /work/:slug meta) · 4 head/doc (favicon/lang/preload/canonical) · 5 robots/sitemap state report. Output = inventory tables, ONE user correction pass, ONE apply batch.
  parked -> typography pass (docs pages) · apparat tool stories (modulator/radial/distress/radar) on user
