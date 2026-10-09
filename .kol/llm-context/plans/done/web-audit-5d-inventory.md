# apps/web 5-dimension audit — APPLIED 2026-07-28

> ## ⛔ FULLY CLOSED — 2026-07-30 (user). Nothing on this page is open.
>
> Every follow-up and parked ruling this file ever carried is **closed by user verdict**:
> the tail correction points, the hero px-ladder, the divider seat, Bento/ArticleCard,
> the rendered audit, the sitemap build-script (shipped as
> `apps/web/scripts/generate-sitemap.mjs`) and the visual pass. The document below is
> **provenance only** — a record of what shipped on 07-28, not a to-do list.
> Do not re-scan it, do not re-report it, do not reconstruct a backlog from it.

**Status: BATCH APPLIED** (user go, all defaults accepted). 28 Tooltip wraps (12 files) · a11y across 25 files
(skip link, per-route `id="main"`, 7 input labels, 3 video fixes, 404 noindex; Prints.jsx/MagnetLines/PrintsGridGsap
skipped — nesting/unrouted) · SEO 4 files (WorkDetail SEO+main, workshop per-path titles, STATIC_META cleanup,
proxy /workshop prefix fallback) · head canonical + apple-touch-icon-light wired · robots 5 Disallows · sitemap
rewritten (19 urls). All parse-verified; eslint config broken pre-existing (`@eslint/js` missing — separate issue).
Crawler doc synced (08-social-crawlers.md tier-3 list). Touch icon: SVG masters (keyline-guide layer included) + PNG exports in root `public/touch-icons/`
(own concept-folder, NOT favicons; web mounts via symlink). **PICK LOCKED: light** (user, 2026-07-28) — wired in head;
dark master stays in the folder as the editable sibling. `_tmp/touch-icon/` candidates deleted. Remaining follow-ups: sitemap build-script for dynamic slugs · user visual pass.
Inventory below kept for reference.

---

## D1 — Tooltips (DS `Tooltip` on icon-only controls)

Verified API: `import { Tooltip } from '@kolkrabbi/kol-component'` (v0.12.0, atoms/Popover.jsx:113) —
`<Tooltip label="…" shortcut placement offset triggerClassName>{control}</Tooltip>`, hover+focus, `.kol-tooltip`.
**Census: 32 icon-only controls, 0 wrapped today. Zero Tooltip usages anywhere in apps/web.**

Wrap (27 call sites; map sites cover multiple rendered controls):

| File | Sites | Labels |
|---|---|---|
| `components/layout/Navbar.jsx` | :222,:224,:309,:378,:444,:446,:515 | Toggle theme · Toggle menu · per-item chevrons |
| `components/layout/Footer.jsx` | :25 (map) | social `label` |
| `components/work/ImageLightbox.jsx` | :57,:68,:80 | Close · Previous · Next |
| `components/ui/CarouselNavigation.jsx` | :32,:40 | Previous slide · Next slide |
| `components/ui/ProfileCard.jsx` | :108,:183 (maps) | social `label` |
| `routes/StackArticle.jsx` | :332,:496 (maps) | Share on X |
| `routes/prints/PrintDetailOverlay.jsx` | :250 | Close |
| `workshop-system/shell/WorkshopHeader.jsx` | :73,:75,:120,:130 | Toggle theme · Open menu · Nav sidebar · TOC sidebar |
| `workshop-system/shell/ShellSidebar.jsx` | :80 | Collapse/expand |
| `workshop-system/compositions/WorkshopSidebar.jsx` | :72 | Collapse/expand |
| `workshop-system/shell/ShellLayout.jsx` | :119 | Search |
| `workshop-system/tags/TagModeOverlay.jsx` | :40,:49,:78 | View toggle · Close · Clear |

SKIP (default — correct me): wordmark links `Navbar.jsx:210`/`Footer.jsx:75` (logos don't get tooltips) ·
`FooterTest.jsx:308,:373` (prototype route) · `PrintDetailOverlay.jsx:286` (image thumbnails, not icons).
ThemeToggle wraps get static `label="Toggle theme"` (DS-internal title is dynamic; not reachable from outside).

## D2 — A11y labels

- **20 unlabelled form controls:**
  - Raw inputs → add `aria-label`: `CmsGlobal.jsx:106,:134` (search) · `MetricsWithControls.jsx:177` · `TypefaceVariablePreview.jsx:145`
  - DS `Input`/`SearchInput` → pass `aria-label` at call site: `HomeSignup.jsx:75` · `TagModeOverlay.jsx:61` · `DocsComponents.jsx:40,:41` · `WorkshopHeader.jsx:112` (currently unreached)
  - DS `Slider` ×11 (`FontPreviewCard.jsx:256–295`, `MetricsWithControls.jsx:191–230`, `TypefaceVariablePreview.jsx:112–131`): **FIXED DS-side 2026-07-28** — kol-component 0.12.1 staged in kol-ds-ui (`useId` htmlFor/id pairing in Slider.jsx; Input/SearchInput already spread `inputProps`, no defect). Awaiting user publish → bump here. Consumer slider aria-labels DROPPED from batch — the `label` prop attaches once 0.12.1 lands.
- **6 videos, 0 tracks/labels:** muted decorative loops (`BentoCard:59`, `ImageLightbox:93`, `HlsVideo:30`, `WorkDetail:271`) → `aria-hidden="true"`; `VideoBlock:35` → `aria-label` from caption; `WorkDetail:44` → `aria-label` from project title.
- **Landmarks:** no skip link anywhere · `SiteLayout.jsx:16` has no `<main>` (8 routes render none: Prints, WorkDetail, NotFound, Metrics, FooterTest, PrintsArchitectural, PrintDetailOverlay, MagnetLines) → move `<main>` into SiteLayout around `<Outlet/>`, demote per-route `<main>`s to div in same batch · workshop header has no `<header>` wrapper (`WorkshopHeader.jsx`) · `aria-label` missing on `Navbar.jsx:286` nav + ShellLayout `:24/:42` asides · add skip-to-content link in both shells.
- **Latent:** `ShellLayout.jsx:47` `brandLogoAlt` defaults `''` on a sole-child link · `render-tokens.jsx:68` alt undefined when md omits it. Imgs otherwise clean (0 missing alt), iframes clean (all titled), icon links clean.

## D3 — SEO/meta per route

Infra (exists, works): client `react-helmet-async` via `components/layout/SEO.jsx` (16 routes) + crawler proxy
`api/metadata-proxy.js` (Vercel rewrite → fills `__TITLE__/__DESCRIPTION__/__IMAGE__/__URL__` in dist/app.html;
Sanity tiers for /stack/:slug + /work/:slug, prints local, `STATIC_META` 22 routes).

| Gap | Fix |
|---|---|
| `/work/:slug` — no client `<SEO>` (crawler side already live) | add `<SEO>` in WorkDetail post-fetch: `seo.metaTitle\|\|title`, `seo.metaDescription\|\|description`, `thumbnail.url`, canonical — **folds the parked /work/:slug item** |
| `/workshop/**` ~40 routes — neither layer | one `<SEO>` in workshop shell, title from route label (`WORKSHOP_ROUTES`/embed+apparat data); proxy: prefix fallback `url.startsWith('/workshop')` → workshop meta (1 line) |
| `/studio` — route exists, no STATIC_META | add entry |
| Dead STATIC_META: `/about`, `/contact`, 4× `/collections/*`, `/foundry/specimen` | delete (no such routes) |
| NotFound | `<meta name="robots" content="noindex">` via Helmet |
| Prototype routes (`/demo`, `/metrics`, `/footer-test`, `/prints-x`, `/prints-xx`) | robots.txt Disallow (D5), no meta work |

## D4 — Head/doc (index.html)

Sound: `lang="en"`, charset, viewport, placeholder head + proxy, theme boot script, umami.

| Item | Action |
|---|---|
| No `<link rel="canonical">` | add `<link rel="canonical" href="__URL__">` — proxy already computes it |
| Favicon = svg only, no apple-touch-icon/png | BOTH candidates staged 2026-07-28: `public/favicons/apple-touch-icon-{light,dark}.png` (from `_tmp/touch-icon/`). Head `<link rel="apple-touch-icon">` waits on user's pick — batch wires whichever he names (default: light). |
| `theme-color` meta | skip (default) — say so if wanted |
| og:image:width/height/alt, twitter:site | skip (default) |

## D5 — Robots/sitemap

- `robots.txt`: allow-all, fine → add `Disallow: /demo /metrics /footer-test /prints-x /prints-xx`. Workshop stays crawlable (existing comment implies deliberate).
- `sitemap.xml` (Feb 10, badly stale): dead — `/foundry/specimens`, ~30 `/specimen/*`, 4 `/collections/*`, silfurbarki + ordspor typeface pages; missing — `/prints`. Rewrite to the real static route set (~15 urls + workshop top levels). Dynamic `/work/:slug`, `/stack/:slug`, `/prints/:slug` need a build-time generator (Sanity fetch) — **out of scope for the batch, noted as follow-up**.

---

## Correction points (defaults marked, apply batch follows your rulings)

1. Tooltip skips: wordmarks · FooterTest · image thumbnails — default SKIP.
2. ThemeToggle tooltip label: static "Toggle theme" — default YES.
3. Dead STATIC_META entries — default DELETE.
4. Workshop crawlable in robots — default YES (stays allowed).
5. Sitemap dynamic slugs — default DEFER (build-script follow-up).
6. DS-side Slider fix: DONE per user go (kol-component 0.12.1 in kol-ds-ui, publish = user's:
   `pnpm --filter @kolkrabbi/kol-component publish --no-git-checks --access public`), then bump web.
