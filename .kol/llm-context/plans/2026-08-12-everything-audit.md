# Everything-audit — 2026-08-12

Ordered by the user heading out ("HUUUUGE everything audit"). Eleven sweeps over
`apps/web/src` + `apps/brand/src`, run same-day as the navbar/takeover
consolidation (log: `2026-08-12-navbar-takeover-consolidation-fork-purge-ds-waves.md`).
**Report only — nothing below was changed.** Every item is a candidate, not a done.

## Verdict card

| # | Sweep | Verdict |
|---|---|---|
| 1 | Orphan components | 🔴 **17 confirmed** zero-reference files |
| 2 | DS name collisions | 🟠 **20 local files** shadow a DS-shipped component |
| 3 | Type protocol (arbitrary px text) | 🟠 21 hits, ~half legit specimen/art |
| 4 | Opacity-dimming (07-28 law) | 🟠 28 non-hover `opacity-N` on content |
| 5 | Hardcoded hex | 🟡 54 raw, most in art/mock components |
| 6 | index.css imports-only | 🟡 web ✅ · brand carries 1 rule + misses 1 `@source` |
| 7 | a11y quick pass | 🟢 0 img-without-alt · 0 icon-buttons without aria-label |
| 8 | Dependencies | 🟡 DS stack current; web toolchain a major behind brand; 1 dead dep |
| 9 | Icon gaps | 🟡 7 dashboard names resolve nowhere (pre-existing) |
| 10 | TODO/FIXME debt | 🟢 8 total |
| 11 | Routes | 🟢 web clean after today's purge · brand: `/library/:folder` NotFound known |

---

## 1 · Orphans — 17 files, zero references in their app

Verified two ways (import-shape scan, then raw-name grep). Candidates for `_tmp/`:

**web (13)**
- `components/animation/AnimatedTitleStory.jsx`
- `components/fontviewer/EditableMetricsViewer.jsx` · `FontViewerSuperSuite.jsx` · `MetricsViewerCard.jsx` · `MetricsWithControls.jsx` (the whole fontviewer shelf except what foundry imports)
- `components/overlay/CursorTrailColor.jsx`
- `components/react-bits/TextPressureNew.jsx` (TextPressure itself is live ×8)
- `components/sections/cta/CtaFoundry.jsx` · `CtaWork.jsx`
- `components/sections/shared/ChapterNavigation.jsx`
- `components/sections/studio/StudioHero.jsx`
- `hooks/useStoryTiltMotion.js`
- `routes/foundry/components/FoundryLicenseQuestions.jsx`

**brand (4)**
- `components/loaders/decks/slideTemplates.js`
- `components/styleguide/LogoScaling.jsx` · `MoodTile.jsx` · `TypeScaleSection.jsx`

## 2 · DS name collisions — 20 locals shadowing a shipped component

Same shape as ContentFilters/FeaturesCardSection (both retired today). Each needs a
**diff before swap** — some are true forks, some pre-date the DS copy, one or two may
carry local changes worth a brief upstream. Grouped by likely effort:

**Probably straight swaps (small, stable API)**
- brand `framework/ScrollToTop.jsx` ⇄ kol-framework (byte-diff first — likely identical)
- brand `framework/Layout.jsx` · `PageSection.jsx` · `BrandHero.jsx` ⇄ kol-framework
- web `errors/ErrorBoundary.jsx` ⇄ kol-component utilities
- web `media/HlsVideo.jsx` ⇄ kol-component atoms (local one carries the contextmenu block)

**Known composite — ✅ CLOSED 2026-08-14 (user): keep local, no import**
- ~~web `layout/LoaderOverlay.jsx` + `loaders/ColorLoader.jsx` ⇄ DS pair~~ — logic diff is 284 lines of ~170: the local one is a gesture engine (wheel/touch/keyboard exit, CursorTrail) the DS deliberately dropped when generalizing. One consumer, different behavior, no benefit. Consolidated instead: both files merged into `components/loaders/IntroLoader.jsx` (CursorProvider + shell + curtain, honest name), elder pair in `_tmp/2026-08-14-introloader-merge/`. Do not re-propose the import

**Needs real diffing (bigger organisms)**
- web `sections/shared/FeaturedCarousel.jsx` ⇄ kol-component organisms (Studio uses local)
- web `sections/shared/FullBleedHero.jsx` ⇄ kol-component organisms
- web `sections/cta/CtaGlobal.jsx` ⇄ kol-component organisms (used site-wide)
- web `routes/workshop/DocumentationReader.jsx` ⇄ kol-workshop docs (web's portals its own TOC — may be the intended adapter, verify before touching)
- web `prose/blocks/ImageBlock.jsx` · `VideoBlock.jsx` ⇄ kol-component molecules
- web `prose/layouts/ArticleHeader.jsx` ⇄ kol-content
- web `sections/stack-detail/StackHero.jsx` ⇄ kol-content (StackHeroTall is local-only, no collision)
- web `cards/BentoCard.jsx` ⇄ kol-component molecules
- web `animation/AnimatedTitle.jsx` · `TiltCard.jsx` ⇄ kol-component
- web `ui/AsciiCursor.jsx` ⇄ kol-component utilities (DS ships one! today's right-click fix went into the LOCAL copy — if the DS copy still preventDefaults, that's a DS bug to file)
- brand `sections/ColorRamp.jsx` ⇄ kol-component molecules

## 3 · Type protocol — 21 arbitrary-px text hits

- Legit-looking (specimen/art display, cursor art): `TypefaceLibraryItem.jsx:104` (140/160px glyphs), `TypefaceStyleSection.jsx:147`, AsciiCursor's 3–14px art sizes
- Should conform: `ui/PairingCard.jsx:41,71` — `text-[20px] md:text-[28px] lg:text-[36px]` on real UI copy; a `kol-*` ramp exists for this
- Full list: `grep -rnE 'text-\[[0-9]+px\]' apps/*/src --include="*.jsx"`

## 4 · Opacity-dimming — 28 non-hover `opacity-N` on content

The 07-28 law: never dim via opacity utilities, fg/oq ladder only. 28 survivors
(hover/group-hover excluded). Sweep list: `grep -rnE 'opacity-[0-9]+' apps/*/src
--include="*.jsx" | grep -vE 'hover:|group-hover:|focus'`. Needs a classify pass —
some sit on images/overlays (legit), the text ones are breaches.

## 5 · Hardcoded hex — 54

- Legit: `web/styles/tokens.css` status-danger pair (load-bearing, documented),
  brand `SocialMocks.jsx` client-palette mocks, art components (TextPressure,
  CursorTrail, ColorLoader `#121215`)
- Grey zone: `web/styles/ui.css:168` `color: #fcfbfb` — one raw ink in a real stylesheet
- The art/mock bulk is fine; nothing looks like a token dodge in chrome code

## 6 · index.css law

- web: ✅ imports/`@source` only, all ten raw-JSX packages covered
- brand: `:root { scrollbar-gutter: stable; }` lives inline (one rule in an
  imports-only file — move to a styles/ file or bless it), and **`@source` for
  `@kolkrabbi/kol-brand` is missing** (web has it; brand renders kol-brand JSX via
  Asset — Tailwind can't see its classes). kol-media-client is JS-only, no line owed.

## 7 · a11y quick pass — clean

0 `<img>` without alt · 0 icon-only buttons without aria-label. (Only the two
crude checks — no contrast/focus-order audit.)

## 8 · Dependencies

- **DS stack current** as of tonight: theme 0.40.0 · component 0.38.0 · framework
  0.19.0 · icons 0.15.0 · workshop 0.21.0
- **Toolchain skew, web vs brand**: vite **5.4 vs 8.0** · plugin-react 4 vs 6 ·
  react-router-dom **6.30 vs 7.15**. Web is the flagship on the older toolchain.
- Majors waiting (web): @portabletext/react 4→7 · @sanity/client 6→7 ·
  framer-motion 12→13 · opentype.js 1→2 · react-helmet-async 2→3 · vercel/analytics 1→2
- **Dead dep: `chess.js`** (web) — zero references anywhere incl. api/. (kol-chess
  and d3 ARE used; express/google-* live in server.js + api/; @floating-ui/react +
  react-syntax-highlighter are kol-component chain requirements — keep.)
- Patch noise: react 19.2.8, tailwind 4.3.3, playwright, eslint

## 9 · Icon gaps — 7 names, pre-existing

`dashboard-bookmark` · `dashboard-roadmap` · `dashboard-dual-opponent` ·
`stat-crown` · `stat-winner` · `stopwatch` · `trending` — live at `Metrics.jsx`
:336,379,382,392 + `workshop/DashboardComponents.jsx`:314,382,399,416,490; absent
from icons 0.15.0, no `registerIcons()` anywhere. Map to real names or file the
batch to kol-icons.

## 10 · TODO/FIXME — 8 hits

Low. `grep -rnE 'TODO|FIXME|HACK|XXX' apps/*/src`

## 11 · Routes

- web: clean after today's purge (4 dead routes gone, /metrics inside SiteLayout)
- brand: `/library/video` + siblings → NotFound (known since 08-01, deliberate)

---

## Recommended order (all awaiting the user's go)

1. **Orphan sweep → `_tmp/`** — 17 files, zero risk, one pass
2. **`chess.js` out of web deps** + the two brand index.css nits (one `@source` line, one rule relocated)
3. **Collision diff pass** — byte-diff the 20, split into identical-swap / fork-with-delta / intended-adapter; adopt the identicals, brief the deltas upstream (AsciiCursor first — the DS copy may still eat right-click)
4. **PairingCard type conform** + opacity-classify pass (the two protocol sweeps)
5. **Toolchain**: lift web to vite 8 / plugin-react 6 (brand already proves the pair), then decide the react-router 6→7 migration separately (breaking)
6. Icon batch: map or file the 7 dashboard names

## Standing questions for the user (from today, still open)

- Feature band deltas: header 02→03 + lost reveal stagger — live with, or ticket `reveal` support?
- TOOLS_ROUTES: stack/prints/foundry still show in-page toggle+search — move up or leave?
- Workshop content well max-width for overviews — file to kol-workshop or drop?
- LoaderOverlay/ColorLoader swap — proposed, unruled.
