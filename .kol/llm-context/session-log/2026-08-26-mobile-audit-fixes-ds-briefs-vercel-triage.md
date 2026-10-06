# Session: Mobile audit → fixes + five DS briefs; Vercel web-build triage

**Date:** 2026-08-26 (work ran 2026-08-24 evening → 2026-08-25)
**Agent:** Grim
**Summary:** Playwright mobile audit of web + brand (393/360, then 768/1024 and a dark-mode pass, ~250 loads incl. production for the Sanity-backed pages) — report at `plans/2026-08-25-mobile-audit-web-brand.md`. Every local finding fixed and probe-verified; five DS-owned defects filed to kol-ds-ui with receipts; the React setState-in-render warning root-caused to `Firework`. Earlier: web's Vercel deploy failed after a green build — the only deploy-stage variable (a test file inside `api/`) moved out. Brand deployed at `43eeb9e`; web still the 08-08 build. Everything since is unpushed.

## Changes Made

### Files Modified
- `apps/web/scripts/metadata-proxy.test.mjs` — moved out of `api/` (Vercel ships every `api/` file as a function); import path + doc pointers updated, test still passes. Vercel's log showed `✓ built` → `Build Completed` → `Deploying outputs...` and died after; the actual error line was never pasted. **Retry pending**
- `apps/web/src/components/sections/stack/StackHero.jsx` — duplicate `style` attribute merged (the second silently dropped `objectFit`)
- `apps/web/src/components/layout/TakeoverMenu.jsx` — stacks below `md`: `flex-col-reverse` (nav first, full width), tagline paragraphs + divider `hidden md:block`, logomark `h-24 md:h-56`, overlay `overflow-y-auto`. At 393 the seven links ended at x=377 (was off-canvas)
- `apps/brand/src/styles/sidenav-collapse.css` — mobile stopgap: `@media (max-width:767px) .kol-brand-layout .kol-sidenav { position: fixed }`. Root cause is the package's (see briefs); content `top` 852 → 0
- `apps/web/src/routes/foundry/FoundryLicensing.jsx:77` — `min-w-[720px]` removed outright (first moved to `md:`, which still overflowed at 1024 inside `lg:grid-cols-[400px_1fr]`)
- `apps/web/src/components/sections/foundry/TypefaceStyleSection.jsx` — preview/style-cards row `flex-col md:flex-row`, columns `w-full md:w-[65%|35%]`; `SpecimenSectionHeader.jsx` — header row + dropdown group `flex-wrap`. Málrómur page: 0 overflowing elements
- `apps/web/src/styles/ui.css:254` — `.home-hero__titleText` floor `4rem → 3rem` ("Vinnustofa" 408px → 138px at 393)
- `apps/web/src/components/ui/AsciiCursor.jsx` (Firework) — `onDone` was called inside the `setFrame` updater (runs during render) → "Cannot update a component (AsciiCursor) while rendering Firework" on every hamburger tap; now a completion effect with a done-ref, interval keyed on `frames` only (it used to restart on every cursor move)
- `lobby/outbox/` +5 receipts, ledger rows + history; `~/dev/projects/kol-ds-ui/lobby/inbox/` +5 entries, ledger 4→9, history line; `bin/lobby --lint` clean

### Filed to kol-ds-ui (2026-08-25)
- **SideNavMobilePosition** — `SideNav.jsx:96` ships Tailwind `sticky top-0 self-start h-dvh`; the 767px media rule's `position: fixed` loses, the drawer keeps an 852px grid row, **every consumer opens one viewport down on phones** (probe: `aside sticky`, `content top=852`)
- **TableMobileScroll** — `.kol-table` no scroll wrapper: 668–937px tables at 393, 874–1106 at 768, `/reference` still 1187 at 1024
- **CodeBlockMobileOverflow** — `<pre>` neither wraps nor scrolls (`/stack/vcap` tokens to x=482), copy button overlaps line 1
- **WorkshopShellMobile** — ShellHeader tabs 613px at 393 (Dashboard/Apparat/Chess unreachable); dashboard two-up cards overflow
- **MobileTouchFloor** — 🔴 ruling request: 10px chrome (100–430 elements per brand page) and 14–26px hit areas

### Audit method + coverage (for whoever re-runs it)
- Walker `_tmp/2026-08-25-mobile-audit/audit.mjs` (`node audit.mjs web|brand|prod|ws`, env `AUDIT_VP=tablet`, `AUDIT_SCHEME=dark`, `AUDIT_TAG`); `PW_EXEC` points at the installed headless shell (repo playwright wants build 1223, cache has 1234). Probes alongside (`probe-*.mjs`), results JSON + every screenshot in that folder (gitignored)
- **Ports:** kol-studio holds 5173, so web hops to **5174** and brand to **5175** — and **5174 is not in Sanity's CORS list**, so `/work`, `/stack` and their details render empty locally; those were measured on production (08-08 build). First run walked kol-studio by mistake (shelved under `_wrong-servers/`)
- Not covered: the unpushed ListingCard/ArticleHeader/FeatureSplit surfaces with data on mobile; iframe contents; iOS Safari; real touch gestures

## Current State

### Working
- Web + brand `vite build` green after every fix; all four local fixes probe-verified at 393; menu open/close emits zero console errors
- Dark-mode detector over 21 routes: no hardcoded light surfaces (secondary buttons, inverse pills, workshop `bg-surface-inverse` cards, typeface panel, letterhead mock are inverses by design)
- Brand nav wiring: 18 hashes + 17 redirects resolve, stacked order = sidebar order, no duplicate ids, every page titled

### Known Issues
- **Unpushed:** all of the above. Brand production (`43eeb9e`) carries the scroll sections but **not** the sidenav stopgap — it shows the blank-screen bug on phones right now. Web production is 08-08
- **Vercel web deploy** — cause unknown; retry after the `api/` move, and if it fails again the error is the last line below `Deploying outputs...`
- DS bugs stay live until kol-ds-ui ships and we bump: brand tables, article code blocks, workshop tabs, dashboard cards
- Brand `/assets` Graphics previews empty **locally only** (production renders the SVGs) — the running brand dev server predates the 0.46→0.68 component bump; restart it
- Lobby inbox ticket `brand-redeploy-frees-media-hostname`: the ask (deploy brand) happened at `43eeb9e`; DoD still needs the bundle curl for `media.kolkrabbi.io`, a `/library` image check, and the receipt back to kol-r2b2. State stays 🔵 until the user rules
- `/brand` Overview "Chapters" copy still says each chapter is its own page — content call
- Minor, noted only: `/metrics` tab strip 21px over at 360; workshop cards 3px over at 393

## Next Steps
1. Push; retry the web deploy; then the four phone-only checks (takeover reveal delay, home hero words, `/work/:slug` drag, Graphics previews)
2. Verify + close `brand-redeploy-frees-media-hostname` (curl bundle, `/library` images, receipt to kol-r2b2) on the user's word
3. When the five DS briefs ship: bump, delete the sidenav stopgap block, re-walk brand `/assets` and web `/stack/vcap` at 393
4. Rulings: MobileTouchFloor, Chapters copy
