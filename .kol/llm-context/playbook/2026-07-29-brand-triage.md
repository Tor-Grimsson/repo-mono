# Playbook — apps/brand triage (post-merge follow-up)

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`.

**Goal:** Strip apps/brand to its public brand-book shape — the mechanical slice only (demo delete · denavigate Reference/Components · Kolkrabbi removal after diff-check vs studio owner-copy · editor + icons local-copy removal). Parked OUTSIDE this arc: Gallery/Library joint ruling (❓) · styleguide content rewrite · kol-ds-ui `?embed=1` mode + iframe wiring (cross-repo).

**Standing rules (non-negotiable):**
- Quarantine = move to `_tmp/` (repo precedent: apps-video, packages-chess-data) — never delete outright, never git.
- Denavigate ≠ remove: Reference (6) + Components (10) lose the sidebar entry, keep the mounted route for harvest.
- Kolkrabbi (5) dies only AFTER the brand-vs-studio business-data diff confirms nothing brand-only is lost.
- Editor (7): no code-port, no package consume — one deployed origin, iframed later; today it just leaves brand.
- User rulings gate the parked items — do not reopen them inside this arc.

**Triage map (user rulings 2026-07-29):** 1 Home ✓ keep · 2 Styleguide ✓ keep, text later · 3 Gallery ❓ · 4 Library ❓ · 5 Kolkrabbi → remove post-diff · 6 Reference → denavigate, keep route · 7 Editor → remove · 8 Icons → remove, iframe later · 9 Demo → delete · 10 Components → denavigate, keep route.

---
## Entries

[16:55 GMT · 2026-07-29] · setup · playbook created
  what → initialised the brand-triage playbook   why → multi-step arc, /kol-goal to follow
  note → apps/video already quarantined to _tmp/apps-video this session (pre-arc)

[17:02 GMT · 2026-07-29] · triage/diff-check · brand/data/business-data.js
  what → diffed brand copy vs kol-studio owner copy (235 vs 445 lines)   why → gate before Kolkrabbi removal
  verify → every distinctive fact present upstream ✓ · lone brand-only line (Skipholt note) answered by studio info.js ✓
  note → nothing brand-only dies · ▣ cleared to cut

[17:02 GMT · 2026-07-29] · triage/cuts · App.jsx · sidebars.config.js
  what → routes out: /kolkrabbi /editor/:mode /icons /icons/variants /demo + 7 legacy /generators redirects
  what → NAV_TREE → Home/Styleguide/Gallery/Library only · Reference+Components trees parked in exported DENAVIGATED (routes stay mounted)

[17:02 GMT · 2026-07-29] · triage/quarantine · _tmp/brand-triage-elder/
  what → ▣ src/editor (whole dir) · pages Demo/Kolkrabbi/Icons/IconsVariants/Compose · business-data.js · data/generators.jsx · molecules/TypeBlockToolbar.jsx
  note → Compose.jsx was already unrouted (dead) · TypeBlockToolbar's only consumer was editor TypeFrame · info.js STAYS (StationeryMocks uses BRAND_INFO)

[17:02 GMT · 2026-07-29] · triage/keeper-fixes · BrandLayout · SlideDeck · SideNav · Styleguide · Reference
  what → GeneratorLibraryProvider unwrapped (consumers all editor-internal) · fgOn vendored into SlideDeck (10-line luminance helper) · SideNav /editor auto-collapse plumbing out · dead-link Generators sections stripped from Styleguide (#social-generators + nav child) and Reference (#generators)
  note → styleguide section numbering now gaps at 14 — renumber belongs to the parked content rewrite

[17:02 GMT · 2026-07-29] · triage/deps · apps/brand/package.json
  what → orphaned editor deps out: @floating-ui/react · colord · gsap · opentype.js   verify → lockfile settled ✓ · build green 3.4s ✓
  note → kol-theme + tailwindcss kept (CSS @imports) · wawoff2 kept (woff2-to-ttf script)

──────────── GOAL DONE: brand mechanical slice ──────────── [17:02]
  changed: 8 files · quarantined: 9 (1 dir + 8 files) · deps out: 4 · build ✓ (brand 3/3 green runs)
  sidebar = Home/Styleguide/Gallery/Library ✓ (NAV_TREE sole source, static-verified)
  parked: Gallery/Library ruling · styleguide rewrite+renumber · kol-ds-ui ?embed=1 + icons/editor iframes · Reference/Components harvest→quarantine

[18:17 GMT · 2026-07-29] · icons/kol-ds-ui · packages/icons 0.8.7 PUBLISHED
  what → new v1 group `kolkrabbi`: `kolkrabbi` (from kol-logomark master, mark-positive, scale(0.75) onto 24-grid) + `kol-ds` (favicon vector, style/clip stripped)
  why → favicon.svg was a knockout tile w/ hardcoded fills — logomark is the currentColor positive; user base honored via same glyph
  verify → npm publish ✓ 172 files · installed 0.8.7 resolves group ✓
  note → inventory doc REGENERATED from fs (was stale: missed 0.8.6 editing/typography/socials) — 166 icons · 26 groups

[18:17 GMT · 2026-07-29] · brand/ds-sweep · package.json · 6 files
  what → deps: +kol-icons ^0.8.7 +kol-brand ^0.1.2 +kol-framework ^0.5.10 · @kol/loader DROPPED (elder Icon dead in brand)
  what → Icon imports → @kolkrabbi/kol-icons (SideNav/BrandLayout/AssetTable/DeckShell/Library) · name fixes: menu→hamburger, home signature-thick→kolkrabbi, ref list-01→view-list, comp component→component-01
  what → local ThemeToggle ▣ → DS ThemeToggle (kol-framework, same hop/hop-bare API, same kol-theme storage key — no reset) · Components.jsx demo import swapped too
  what → KolLogo svgr imports → @kolkrabbi/kol-brand/svg/*.svg?react (published home; ./svg/ local copies STAY as AssetTable glob source until it moves to ASSETS map)

[18:17 GMT · 2026-07-29] · brand/collapse+select · SideNav · kol-framework.css
  what → manual collapse feature DELETED (state, chevron button, is-collapsed rules, data-sidenav root var) — reason left with the editor; kills items 4/10/11
  note → responsive rail-mode (<1024px) is a DIFFERENT feature — kept intact
  what → global user-select:none gate + allowlist REMOVED (::selection brand highlight kept) — text copyable everywhere

[18:17 GMT · 2026-07-29] · brand/assets-page · pages/Assets.jsx ★
  what → ★ rescued Reference tail (logos/graphics/patterns AssetTables + branded-assets registry) into /assets nav page, sections renumbered 01–04
  what → nav entry Assets (icon folder, 4 anchor children) after Library · Reference sheds moved sections + dead helpers

[18:17 GMT · 2026-07-29] · digs/a+b · read-only, reported
  a → alt-right in nvim: terminal sends Esc+f (word-nav preset, keybinds.md:222 "alt free for terminal Alt-b/f"); nvim unmapped-meta = Esc then key → `b`=back-word (works), `f`=find-char PENDING (hangs) — asymmetry explained, no config touched
  b → markdown "mode" = own dotfiles after/ftplugin/markdown.lua (conceallevel=2 + wrap + textwidth=80) + treesitter markdown/markdown_inline — no plugin; off-switch `:setlocal conceallevel=0`

──────────── GOAL DONE: polish wave 1 + icons ──────────── [18:17]
  kol-ds-ui: icons 0.8.7 published (kolkrabbi group) + inventory doc regen · kol-website: web bump ^0.8.7, brand on DS icons/toggle/logo, collapse+select-gate deleted, /assets page live
  build ✓ brand+web 2/2 (21s) · deferred: client text (item 9) · sidebar now Home/Styleguide/Gallery/Library/Assets
  ⚠ RETRACTED 18:20 — user review: nothing rendered in dev. Root cause below.

[18:54 GMT · 2026-07-29] · FUCK-UP + fix · vite.config.js (brand)
  what → wave 1 shipped verified by BUILD only — dev broke: @kolkrabbi raw-source pkgs use import.meta.glob, esbuild pre-bundle can't transform it (icons empty, DS toggle glyphs dead); rollup build masks it entirely
  fix → optimizeDeps.exclude kol-icons/kol-framework/kol-brand (web's config documents this exact rule — I never checked the precedent) + include react-syntax-highlighter (lowlight CJS interop crashed the page blank)
  fix → Landing logo wrapper +text-emphasis — logo inherited hero's absolute-white while prose classes self-theme; now light #121215 / dark #FAFAFA
  verify → PLAYWRIGHT on live dev (5176, task-scoped, killed): 0 console errors · all 5 nav icons paint (kolkrabbi glyph on Home, screenshot both themes) · toggle labeled + flips data-theme/localStorage · ThemeToggle module served from node_modules/@kolkrabbi/kol-framework@0.5.10 (DS-origin proven) · /assets renders 4 sections + downloads
  lesson → dev-only failure class exists for this DS (glob pre-bundling); build green ≠ works — playwright-check consumer apps after DS wiring changes

[18:54 GMT · 2026-07-29] · digs/a+b · dotfiles EDITS (user go)
  a → keymaps.lua: n-mode <M-f>/<M-b> + <M-Right>/<M-Left> → w/b — no conflict (plain f/b untouched; alt chords were dead keys) · keybinds.md #nvim#move line added
  b → after/ftplugin/markdown.lua: <leader>mc buffer-local conceal toggle (2↔0) · keybinds.md #nvim#edit line · headless-verified config loads, md buffer opens conceal=2

──────────── GOAL DONE (for real): wave 1 playwright-verified ──────────── [18:54]
  screenshots: scratchpad/brand-home-{dark,light}.png · servers killed (77193/81107) · repo root clean

[19:25 GMT · 2026-07-29] · wave2/toggle · kol-framework 0.5.13 PUBLISHED
  what → ThemeToggle `button` variant: plain kol-btn kol-btn-primary kol-btn-{size} + rung mono + label, zero overrides
  what → roll restored: strip slides + both glyphs spin 180° same clock — dark→light rolls >> , back <<  (matrix(1,..)↔matrix(-1,..) verified)
  what → text-adjacent glyph law: 14/16/18 (glyph must fit the rung's mono line 16/18/22) — first cut used icon-square 16/20/24 law → measured 34≠32, WRONG per user's own test; fixed + comment pins the law
  note → 0.5.11 BURNED (npm publish leaked workspace:* deps — pnpm publish is the ONLY publish path for framework) · 0.5.12 burned (oversized glyph) · both npm-deprecated with forward pointers
  verify → playwright: toggle 32px === same-rung kol-btn 32px · label ✓ · roll ✓ both directions

[19:25 GMT · 2026-07-29] · wave2/rest · icons 0.8.8 · Landing · sidebar · keybind
  what → library.svg redesign: 4 bars→3 (x 4.75/10.5/16.25, w 3, clear 1.25px gaps after stroke — negative space can't collide), shared 19.5 baseline kept · icons 0.8.8 published
  what → Landing hero → /stack system: CDN mood-05 srcset (400–1600w) <img> object-cover + .landing-hero-overlay (kol-site.css, mirrors web ui.css: 32% light / 80% dark color-mix) · bg-absolute-black/text-absolute-white context dropped — content self-themes
  what → sidebar seats <ThemeToggle variant="button" size="md"> in px-6 row (hop-bare row gone)
  what → conceal toggle rebound <leader>mc→<leader>md (md was free; mp=format only neighbor) · keybinds.md synced · on/off loop confirmed (2↔0)
  verify → playwright on published artifacts: library 3 rects · mood-05-1600 served+loaded · overlay light 32%/dark 80% computed · console 0 errors · screenshots both themes · build 2/2 green
  note → consumers on framework ^0.5.13 + icons ^0.8.8 (web+brand) · servers killed, ports clean

──────────── GOAL DONE: wave 2 playwright-verified ──────────── [19:25]
  screenshots: scratchpad/wave2-{dark,light}.png · parked: Components-page toggle demo rows still show icon/hop only (content pass)
  ⚠ user verdicts 19:30 — roll animation FAIL (reads wrong live) · library 3-bar redesign FAIL · landing bg ✓ · both failures declared in kol-ds-ui lobby

[19:41 GMT · 2026-07-29] · lobby + AUDIT · kol-ds-ui lobby/ · plans/brand-audit-inventory.md
  what → lobby/ThemeToggleButtonVariant.md: button-variant spec + glyph law + BOTH failures declared (roll = replace not iterate · library.svg = real redesign or kill) · INDEX queue 6→7
  what → FULL apps/brand audit (report-only): theme-boot law violation (index.html data-theme="dark" vs light-first) · elder census 17 files/36 imports/26 components — 100% swappable vs kol-component 0.12.19 · Gallery = outlaw page (inline hex chrome, no DS, dev-only /__photos.json?) · 18 dead client-era files (5 data + 10 orphan components + /site plumbing) · casing 110 hits · hardcoded color 40 hits · no skip-link/id=main/<nav> · geometry referenced EXCEPT Library bg-fg-08 wrapper + Gallery
  note → inventory at plans/brand-audit-inventory.md with suggested order: theme boot → elder swap (+vite exclude kol-component) → corpse quarantine → Gallery ruling → a11y → casing/color rulings → Library wrapper

──────────── GOAL DONE: lobby filed + brand audited ──────────── [19:41]

[20:28 GMT · 2026-07-29] · audit round 2 · answers + /review page
  what → user corrections applied: data corpses reclassified to content pass · casing made concrete (live demo + full hit list) · DS-sibling question ANSWERED properly
  what → the real reference map: brand framework layer = pre-KOLDS parent with FULL published siblings (kol-framework pkg ships SideNav/Layout/PageSection/PortalFooter/ScrollToTop/BrandHero/SubPageHero + kol-framework.css [643 diff-lines drift] + kol-brand-color.css [57]) · kol-styleguide pkg ships 8 styleguide siblings (raided FROM brand 2026-07) · sidenav/hop/divider chrome already DS-referenced via kol-theme atoms
  what → /review page built (route-only): 9 orphans rendered live under error boundaries w/ file+status+sibling captions · casing demo · in-situ index of live non-DS components
  verify → playwright: all 9 sections render, 0 boundary failures, 1 console warning = FeatureSplit's OWN missing-key bug (left visible — review-relevant) · screenshot scratchpad/review-page.png
  note → user modified DS ThemeToggle himself → tri-state 0.6.0 (light→dark→system cycle) — DS-side surface is HIS now, hands off
  note → inventory amended (plans/brand-audit-inventory.md): reclassification + sibling map + CSS reference table + casing appendix
