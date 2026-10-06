# Mobile audit — apps/web + apps/brand

Ordered 2026-08-24 ("I noticed a bunch of bugs on mobile… start a mobile audit"), run
2026-08-25. **Report only** — nothing fixed. Artefacts (walker, JSON, every screenshot,
probes) in `_tmp/2026-08-25-mobile-audit/` (gitignored).

> ## ✅ ACTIONED 2026-08-25 (user: "go")
>
> **Local, shipped and probe-verified at 393:** takeover menu stacks below `md`
> (nav first, tagline column hidden, logomark `h-24`, overlay scrolls — links now end
> at x=377) · brand sidenav stopgap rule (`content top=0`, aside `fixed`) · licensing
> `md:min-w-[720px]` · typeface style row stacks + specimen header wraps (0 overflowing
> elements on `/foundry/typefaces/malromur`) · home hero title floor `3rem` (138px wide).
> Web + brand `vite build` green.
>
> **Filed to kol-ds-ui** (receipts in `lobby/outbox/`): `SideNavMobilePosition` ·
> `TableMobileScroll` · `CodeBlockMobileOverflow` · `WorkshopShellMobile` ·
> `MobileTouchFloor` (🔴 ruling request).
>
> **Downgraded after reading the code — no change:** #2 the `/work/:slug` strip is an
> embla carousel with `dragFree` (touch drag works; headless cannot drag) · #7's ASCII
> scene is a deliberate scroll-driven pan (`h-[500vh]` on mobile). Both moved to the
> device list. Unpushed.

> ## Round 2 — 2026-08-25, "continue to scan"
>
> - **React warning root-caused and fixed.** "Cannot update a component (`AsciiCursor`) while
>   rendering (`Firework`)" — `Firework` called the parent's `onDone` inside its `setFrame`
>   updater (updaters run during render). Fired on every hamburger tap (the 393 pass opened
>   the menu, the 360 pass didn't — that was the tell). Now a completion effect; the interval
>   also no longer restarts on every cursor move. Verified: menu open/close, zero errors.
> - **Tablet pass (768×1024 + 1024×1366, both apps):** clean except `kol-table` (brand
>   `/assets` 874–1106px at 768, `/reference` still 1049–1187px at **1024** — added to the
>   `TableMobileScroll` brief) and my own licensing fix: `md:min-w-[720px]` overflowed at 1024
>   inside `lg:grid-cols-[400px_1fr]`; the min-width is gone, the grid sizes the column.
> - **Dark-mode pass (mobile walk + a light-surface detector on 21 routes):** no hardcoded
>   light surfaces. Everything the detector caught is an inverse by design — secondary
>   buttons, inverse pills/badges, the workshop overview cards (`bg-surface-inverse`, dark
>   tile in light mode), the typeface preview panel, the letterhead paper mock, colour
>   swatches.
> - **Brand nav wiring:** 18 hashes + 17 redirects all resolve to real section ids, stacked
>   order matches the sidebar, no duplicate ids, every page sets a title.
> - **Brand `/assets` Graphics previews empty — dev-only.** Production renders the SVGs; the
>   local cell holds an empty `.kol-graphic` span. `kol-component` is in `optimizeDeps.exclude`,
>   so most likely the running brand dev server predates today's component bump (0.46→0.68).
>   Restart it before chasing further.
> - Minor, noted only: `/metrics` tab strip overflows by 21px at 360; `/workshop` cards sit
>   3px over at 393.

## Method

- Playwright headless Chromium, mobile emulation, **393×852** (iPhone 15, screenshots +
  metrics + hamburger-open shot) and **360×800** (metrics only). Every route scrolled end
  to end before measuring so reveal classes fire.
- Per route: horizontal overflow (`scrollWidth` vs viewport, outermost offending element
  named), tap targets under 36px, text under 11px, `overflow:hidden` boxes whose content
  is wider than they are, fixed/sticky elements, console errors, failed requests.
- **web** — 33 static routes on the dev server (5174), 11 `/workshop/*` sub-routes,
  and **production** kolkrabbi.io for the Sanity-backed pages (`/`, `/work`,
  `/work/another-creation`, `/stack`, `/stack/vcap`, `/prints`) because 5174 is not in
  Sanity's CORS list and 5173 is held by kol-studio. Production is the 08-08 build.
- **brand** — all 34 routes on the dev server (5175), i.e. today's unpushed tree.

## Verdict card

| Area | Verdict |
|---|---|
| Brand — every page | 🔴 content starts **one viewport (852px) down** on phones — a DS bug, see #1 |
| Brand — tables | 🔴 `kol-table` has no scroll wrapper: right columns unreachable on `/assets` (4 tables) and `/reference` (24) |
| Web — `/work/:slug` | 🔴 project gallery is a 7400px horizontal strip inside `overflow-x:hidden` — one image visible, rest unreachable by touch |
| Web — `/stack/:slug` | 🟠 code blocks clip at the viewport edge (no horizontal scroll), copy button sits on the first line |
| Web — workshop shell | 🟠 header tabs overflow (613px nav in 393) and clip — Dashboard/Apparat/Chess tabs unreachable |
| Web — foundry | 🟠 licensing FAQ forced to `min-w-[720px]`; typeface weight cards overflow; specimen banner bleeds |
| Web — home | 🟡 ASCII hero art is desktop-sized (2948px wide) — phones see a strip of dots; display title `Vinnustofa` is 408px in a 393 viewport |
| Both — tap targets / type | 🟡 class-wide: 14–26px-high controls, 2px range sliders, 16px table buttons; hundreds of 10px labels |
| Mobile nav (both) | 🟢 works — brand drawer, web takeover (links visible after the reveal; see verify list) |
| Horizontal page scroll | 🟢 zero routes scroll the page sideways (everything that overflows is clipped instead — which is the pattern above) |

## Findings — ranked

1. **Brand: every page opens one viewport down.** `BrandLayout`'s content wrapper sits at
   `top=852` at 393px (probe: `aside position=sticky`, content `top=852`; at 1280
   `top=0`). kol-framework's `kol-framework.css:238` `@media (max-width:767px)` sets
   `.kol-sidenav { position: fixed; transform: translateX(-100%) }`, but the package's
   `SideNav.jsx:96` also puts Tailwind `sticky top-0 self-start h-dvh` in the className,
   and that utility wins the cascade. Result: the drawer stays in flow, the one-column
   grid gives it an 852px row, the transform only hides it visually. **Every consumer
   of the package SideNav has this on phones.** Owner: kol-ds-ui (move the position
   into the package CSS or drop the utility). Consumer stopgap is one rule in
   `styles/sidenav-collapse.css`: `@media (max-width:767px){ .kol-brand-layout .kol-sidenav { position: fixed } }`.
2. **Web `/work/:slug`: gallery unreachable on touch.** `WorkDetail.jsx:101` renders
   `flex-none` tiles in a strip 7400px wide inside `main.overflow-x-hidden` (41
   overflowing tiles measured on `/work/another-creation`). Desktop scrolls it by wheel;
   a phone gets the first tile and a sliver of the second. Owner: this repo.
3. **Article code blocks clip.** `/stack/vcap`: `span.token` runs to x=482 in a 393
   viewport; the `<pre>` has no `overflow-x:auto`, and the copy button (32px,
   top-right) overlaps the first line. Owner: kol-ds-ui (CodeBlock chrome).
4. **Brand `kol-table` overflow.** Tables 410–937px wide on `/assets` and `/reference`,
   page clipped at the viewport, no scroll — Path/Color/Download columns gone. Same
   component on the desktop-only `/components` demo. Owner: kol-ds-ui (table needs an
   `overflow-x:auto` wrapper as part of the component).
5. **Workshop shell header.** `nav.flex.flex-1.gap-6` is 613px on every `/workshop/*`
   page; tabs after Brand are clipped, no scroll. Owner: kol-ds-ui (kol-workshop /
   ShellHeader). Same family: `/workshop/dashboard/components` two-up cards overflow
   by ~20px (kol-dashboards).
6. **Foundry pages.** `routes/foundry/FoundryLicensing.jsx:77` — `min-w-[720px]` on the
   FAQ column, answers cut mid-word. Typeface pages (`TypefacePage.jsx` sections): the
   weight card row (`div.flex.items-center.gap-4`, right edge 513–547) and the
   `600`/`800` weight columns overflow; the "Málrómur ×3" specimen banner bleeds out of
   its frame. Owner: this repo (+ kol-foundry for the specimen).
7. **Home hero on phones.** The sticky ASCII logo art is 2948px wide (`div.sticky.top-0.h-screen`,
   `sw=2948 cw=393`): a phone shows a sparse strip of dots for the first ~1500px, no
   composition. `h1.kol-display-lg.home-hero__titleText "Vinnustofa"` measures 408px
   (−31…377), clipped both sides. Owner: this repo.
8. **Tap targets and type — class-wide.** Under 36px: `toggle-switch` 34×14 / 118×20,
   `kol-seg-cell` 24px, `kol-btn-sm` 26px, `input.slider-black` 19×2 (range sliders),
   brand table buttons 16×16, `/library/gallery` folder links 12px high, `/reference`
   links 14px. Under 11px: `kol-helper-10` / `kol-mono-10` chrome, `th.kol-table-cell-title`
   10.4px, brand color swatch labels — 100–430 elements per brand page, 5–36 per web
   page. Owner: kol-ds-ui tokens (a mobile floor for helper/mono-10 and control heights).
9. **Console, every web page:** React "Cannot update a component while rendering a
   different component" — a setState during render somewhere in the shell.
   `AsciiCursor.jsx:331` (`setHovering` inside a mousemove handler) is the likeliest;
   not verified. Not visual; noted.
10. **Brand `/editor*` embeds** 404 `https://editor.kolkrabbi.io/fonts/jetbrains-mono/JetBrainsMono-Variable.woff2`
    — the editor deploy is missing the font. Owner: kol-ds-fxr / editor repo.
11. **Brand `/brand` Overview** still reads "Each chapter is its own page" above the
    stacked sections. Content call (known).
12. **Production-only, fixed by the unpushed tree:** the Connect block's
    `hello@kolkrabbi.io` clips at the right edge on `/work` and `/stack` (08-08 build);
    the DS CtaGlobal sizes it to fit locally. The old mobile menu also leaves the page's
    links visible underneath it; the takeover replaces it.

## Verify on a device (headless can't settle these)

- **Takeover reveal timing:** links were invisible 900ms after tapping the hamburger and
  visible at 3s. If that is a real 1–3s black frame on a phone, it reads as broken.
- **Home hero words** (`AnimatedTitle`): parked at `x:150vw` until a ScrollTrigger at
  `'100 bottom'` — headless never fired it, so the headline was off-canvas in every
  shot. Confirm it plays on a phone.
- **`/work/:slug` gallery drag** (embla `dragFree`) and the **home ASCII pan** (`HomeInstagram`, 500vh scroll scene) — both intended, neither testable headless.
- **Brand `/assets` Graphics table:** preview cells rendered empty in the capture (logos
  table rendered fine). Lazy-load or a broken path — look once.

## Not bugs (mine)

- `/apparat`, `/dashboard*`, `/mirrors`, `/chess`, `/design-system`, `/brand` on web
  404'd in the first pass — they live under `/workshop/…`; re-walked there.
- The first run walked kol-studio's app on 5173 (web had hopped to 5174). Discarded,
  shelved under `_wrong-servers/`.

## Coverage gaps

- Sanity-backed pages audited on **production (08-08 build)** only; the unpushed
  ListingCard/ArticleHeader/FeatureSplit surfaces were not seen with data.
- Embedded tools (`/workshop/apparat/*`, brand `/editor/*`, `/monitor/*`) measured as
  host pages; the iframe contents were not walked.
- No real touch gestures (embla drag, the gallery strip, drawer swipe) and no iOS
  Safari — Chromium emulation only.
