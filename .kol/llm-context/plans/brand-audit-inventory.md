# apps/brand audit inventory — 2026-07-29

> ## ⛔ MOSTLY SPENT — read this box before treating anything below as open (2026-07-30)
>
> Sections **2, 4, 5, 6, 7, 8 are CLOSED.** The prose beneath them is the ORIGINAL
> 07-29 finding, kept for provenance — it is **not** a to-do list. Each closed
> section carries a `✅ CLOSED` line stating what shipped. Do not re-open, re-scan
> or re-report them.
>
> **Still open — the whole live list:**
>
> | § | Item | Why it's still open |
> |---|---|---|
> | ~~1~~ | ~~Theme boot~~ | ✅ **CLOSED 2026-07-30** — attr dropped, web's boot script ported. It was worse than cosmetic: `getExplicitTheme()` reads the attr before localStorage, so it vetoed the OS *and* the saved toggle. |
> | 3 | Gallery — outlaw page | its colors are tokenised now, its FATE is not ruled: rebuild DS-conformant, denavigate, or kill |
> | 5a | `Landing.jsx:35` — `{BRAND.name}` under `uppercase` | content decision; the name is shared with page titles + footer, so re-authoring ripples |
>
> Everything else on this page is history.

Full-repo audit (post wave-2). Report-only; every item awaits a user go.
Sibling precedent: `plans/web-audit-5d-inventory.md` (web got this pass 07-28 — brand never did).

## 1 · THEME BOOT — law violation (highest)
- `apps/brand/index.html:2` hardcodes `data-theme="dark"`. Standing law: **explicit > system > light**, light-first. Brand force-boots dark for every fresh visitor; the DS `useTheme` only re-stamps after a toggle mounts.
- Fix shape: drop the attr (or stamp via the kol-framework boot snippet web uses).

## 2 · ELDER COMPONENT CENSUS — 17 files · 36 imports · 26 components · 100% swappable

**✅ CLOSED 2026-07-30** — the elder flush deleted `packages/` entirely; every import below now resolves from `@kolkrabbi/kol-component`. Vite `optimizeDeps.exclude` added. Nothing here is actionable.
Every elder `@kol/component` import has a same-name export in `@kolkrabbi/kol-component@0.12.19` (verified name-by-name, incl. GRAPHICS/GRAPHIC_RAW):

| File | Elder imports |
|---|---|
| pages/Components.jsx | Button Input Stepper Textarea TransparentX ColorSwatch Slider ToggleSwitch ToggleCheckbox ToggleBracket ViewToggle PropertyInput LabeledControl Pill Tag Badge (16) |
| pages/Landing.jsx | Button |
| pages/Library.jsx | Input Button |
| pages/Reference.jsx · pages/Assets.jsx | Table |
| pages/Styleguide.jsx | Graphic GRAPHICS Table |
| framework/BrandLayout.jsx | ModalProvider |
| framework/Layout.jsx | ExitPreview |
| framework/PageSection.jsx | Divider |
| framework/SideNav.jsx | useScrollSpy |
| styleguide/AssetCarousel.jsx | Carousel FullscreenOverlay Image |
| styleguide/AssetTable.jsx | Table Graphic GRAPHICS GRAPHIC_RAW |
| styleguide/ClearspaceDiagram.jsx | GRAPHIC_RAW |
| styleguide/FullscreenGallery.jsx | FullscreenOverlay |
| styleguide/LogoCard.jsx | ToggleSwitch |
| styleguide/LogoCarousel.jsx | Carousel |
| styleguide/TypeScaleSection.jsx | Table |

- Hidden elder surface: elder components resolve icons through elder `@kol/loader` internally (e.g. Library's `Button iconRight="external-link"`) — dies with the swap.
- Swap prerequisite: add `@kolkrabbi/kol-component` to brand vite `optimizeDeps.exclude` (the `react-syntax-highlighter` include is already there).
- After the swap: elder `@kol/component` dep drops → brand fully DS-native.

## 3 · GALLERY — outlaw page (route `/gallery`, kept in nav)

**🔶 PARTIALLY CLOSED 2026-07-30** — the 6 hardcoded colors are gone (tokenised to the theme-independent absolute tier; it stays fixed-dark in both themes by design) and its 2 casing hits are re-authored. **STILL OPEN: the page's fate** — rebuild DS-conformant, denavigate, or kill. That ruling is yours.
`components/tools/Gallery.jsx`: 100% inline styles, hardcoded palette (`#0b0b0b`/`#ddd`), zero DS components, no PageSection/kol-page, bypasses `usePageTitle` (`document.title=`), inline `<nav>` of style-objects. Also fetches `/__photos.json` from the local `photoIndexPlugin` — verify that endpoint exists in the production build at all. Effectively a dev tool squatting on a public nav slot. Needs a ruling: rebuild DS-conformant, or denavigate to the ❓ pile with Library's decision.

## 4 · CLIENT-ERA / DEAD WEIGHT — 18 files, zero consumers

**✅ CLOSED 2026-07-30** — all 10 components quarantined to `_tmp/brand-orphan-elder/` (7 had published DS twins, 2 killed on user verdict, PortalIndex had zero importers). AssetFigure/AssetGrid went with FullscreenGallery. The `/^\/site/` ExitPreview branch and the whole `.site-*` layer are gone — `kol-site.css` became `styles/landing.css`, 39 lines, one rule.
- **Data (5):** `brand/data/blog-data.js` · `shop-data.js` · `collections-data.js` · `branded-assets.js` · `placeholder-logos.jsx` — 0 importers each.
- **Components (10):** SubPageHero · SigTicker · FeatureSplit · ProsePreview · SpectrumGrid · LogoCarousel · TypeSpecCard · TypeSample · FullscreenGallery + its private pair AssetFigure/AssetGrid (chain has no outside consumer).
- **Plumbing:** `Layout.jsx` `/^\/site/` ExitPreview branch — no `/site` route exists in App.jsx; `styles/kol-site.css` `.site-*` chrome is mostly dead (live classes: PortalIndex's `site-anchor-nav` + the new `landing-hero-overlay`).
- Quarantine candidates all → `_tmp/brand-triage-elder/`.

## 5 · CASING LAW — 110 hits (`uppercase`/`tracking-widest` chrome)

**✅ CLOSED 2026-07-30** (one carve-out). User ruling: **mocks keep their casing as artwork; chrome is re-authored.** Applied — Gallery ×2, NotFound, and 13 SideNav group labels moved into `sidebars.config.js` in caps with the `uppercase` class dropped (renders pixel-identical). SubPageHero/TypeSample/TypeSpecCard hits died with the components. **Carve-out §5a, still open: `Landing.jsx:35`.**
No-auto-transform law: strings authored in final case, never class-enforced. Hits: Components 34 · StationeryMocks 24 · Styleguide 7 · Gallery 2 · ColorRamp 2 · SubPageHero 2 (orphan) · singles in NotFound/Landing/Assets/TypeBlock/TypeSample/TypeSpecCard + SideNav group labels (`kol-sidenav-group … uppercase`). Needs a chrome-vs-artwork split ruling: mock/artwork casing (Stationery/Social mocks) is arguably brand artwork; chrome labels (section labels, nav groups, table cells) are violations to re-author.

## 6 · HARDCODED COLOR — 40 hex/rgb hits in JSX

**✅ CLOSED 2026-07-30** — exemptions confirmed (mocks = artwork, ColorRamp/ColorSwatch = the hex IS the demo payload, SlideDeck = luminance math). The only real offenders, Gallery's 6, are tokenised. Zero hardcoded color remains outside the exempt set.
StationeryMocks 17 · SocialMocks 9 (brand-artwork mocks — likely exempt as swatch/art) · Components 5 · Styleguide 4 · Gallery 2 (chrome — violations) · ColorRamp 2 (doc swatches — exempt per §3) · SlideDeck 2 (vendored `fgOn` luminance constants). Real offenders after exemptions: Gallery chrome + the Components/Styleguide odd ones — inspect at fix time.

## 7 · A11Y / DOM — brand never got web's 07-28 pass

**✅ CLOSED 2026-07-30** — skip link added to `Layout.jsx` before `<main id="main">` (mirrors web's 07-28 pattern), `<nav aria-label="Sections">` wraps the SideNav tree. Verified: link focuses to 158×34 at 16,16, `position:fixed`, and is not inside the landmark it targets.
- No skip link · no `id="main"` on the main landmark · SideNav tree has **no `<nav>` element** (aside > div > ul).
- Good: drawer hamburger has aria-label/aria-expanded; per-page titles via usePageTitle; html lang="en".

## 8 · GEOMETRY — largely referenced, three exceptions

**✅ CLOSED 2026-07-30** — Library's `bg-fg-08 min-h-screen` → `bg-oq-04` (opaque tier, per the opacity-hierarchy law). Width literals replaced by the DS scale: `PageSection` header → `--kol-content-panel`/`--kol-content-column`, 28× `max-w-[60ch]` → `--kol-content-measure`. The one survivor, `AssetTable.jsx:168` `max-w-[80vw]`, is an overlay sized to the viewport by design. Gallery's improvisation is tracked in §3.
- ✓ Every content page rides `PageSection` → `.kol-page`/`.kol-page-section` (Styleguide 15 · Reference 5 · Assets 4 · Components 7 · Library 1); NotFound rides `.kol-page-hero`; Landing rides the /stack hero system.
- ✗ Library wraps everything in improvised `bg-fg-08 min-h-screen` — an fg-opacity tint used as a page surface (opacity-hierarchy law: fg/oq ladder only, never dim/tint via opacity utilities).
- ✗ Gallery — fully improvised (see §3).
- Freestyle type is light: 6 `text-[..]` hits (ColorRamp 4 · Components 1 · AssetTable 1).

## Suggested order (when opened)
1. Theme boot (one-line, law) → 2. Elder swap (mechanical, 17 files + vite exclude + dep drop) → 3. Corpse quarantine (18 files) → 4. Gallery ruling → 5. a11y pass → 6. casing/color ruling pass → 7. Library wrapper.

---

## Amendments — 2026-07-29 evening (user review round)

### 4a reclassified — data corpses OUT of structural scope
The 5 dead data files (blog/shop/collections/branded-assets/placeholder-logos) are CONTENT, not structure — they move to the content pass. Structural corpses stay: the 10 orphan components + dead `/site` plumbing.

### Visual review surface — ✅ DELETED 2026-07-30 (was `/review`, route-only)
Served its purpose while the 9 orphans were live. Once they were killed it rendered **zero
components** — a text doc in the wrong medium, still asking for a casing ruling that had already
landed. Route + import out of `App.jsx`, `pages/Review.jsx` → `_tmp/brand-orphan-elder/`. Gone.

### 7 — SideNav DS sibling: YES
`@kolkrabbi/kol-framework` ships `SideNav` — same scroll-spy tree implementation (collectSectionIds/hasActiveDescendant, same class contracts), DS-native imports. In fact the ENTIRE brand framework layer has published siblings: SideNav · Layout · PageSection (near byte-identical) · PortalFooter · ScrollToTop · BrandHero · SubPageHero · AppShell · ShellHeader · ThemeToggle · theme.js.

### 8 — the real reference map: WHAT brand references and WHY
Brand references THREE local stylesheets (imported by `index.css`), all pre-KOLDS artifacts:

| Local file | What it holds | DS sibling | Verdict |
|---|---|---|---|
| `components/framework/kol-framework.css` | ALL page geometry — `:root` pad/sidenav/container vars · `.kol-brand-layout` grid · `.kol-page` / `.kol-page-hero` / `.kol-page--fullbleed` / `.kol-grid` — PLUS local styleguide chrome (`.kol-asset-*`, `.kol-mood-tile`, `.kol-swatch`, `.kol-ramp`, `.kol-type-sample`, `.kol-prose` extensions, `.kol-overlay`, `.kol-embla`) | `@kolkrabbi/kol-framework/kol-framework.css` — **643 diff-lines of drift** (brand is the elder parent; DS was raided from it) | converge on the package css; local file shrinks to genuinely-local leftovers, then dies |
| `brand/kol-brand-color.css` | brand hue ramps + accent binding (the init-client layer) | `@kolkrabbi/kol-framework/kol-brand-color.css` — 57 diff-lines | reconcile drift, consume package copy |
| `styles/kol-site.css` | `.site-*` client-era marketing chrome + `.landing-hero-overlay` | none (client content) | dies with client content; overlay block moves somewhere owned |

Sidenav/hop/link/group chrome + `.kol-page-section-divider` already live DS-side in `kol-theme/kol-components-atoms.css` (brand gets them via the theme import — those ARE referenced from KOL DS today). What is NOT DS-referenced today: the geometry scaffold above + local styleguide chrome.

Styleguide components: `@kolkrabbi/kol-styleguide` ships MoodTile · ColorAnatomy · TypeBlock · AssetTable · LogoCard · ClearspaceDiagram · LogoScaling · ComboLab (+ typographyCuts) — raided from this very app 2026-07; `kol-theme/kol-components-styleguide.css` carries their chrome. Brand still renders its own local copies of all of them.

### Appendix — casing hits (full list)
Raw grep (uppercase/capitalize/text-transform, 113 lines incl. CSS) → `scratchpad/casing-hits.txt` this session; digest by file:

| File | Hits | Chrome or artwork? |
|---|---|---|
| pages/Components.jsx | 34 | chrome (demo labels/headers) |
| components/styleguide/StationeryMocks.jsx | 24 | ARTWORK (mock print pieces) — likely exempt |
| pages/Styleguide.jsx | 7 | chrome (figcaptions, labels) |
| components/tools/Gallery.jsx · sections/ColorRamp.jsx · framework/SubPageHero.jsx | 2 each | chrome |
| NotFound · Landing (h1) · Assets · TypeBlock · TypeSample · TypeSpecCard | 1 each | chrome |
| kol-framework.css `.kol-sidenav-group`-adjacent + kol-site.css | rest | chrome (CSS-enforced nav/section casing) |

(The `/review#casing` live demo that used to illustrate this was deleted with the page on 07-30.)
