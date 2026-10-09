# Deep audit — apps/web + apps/brand (logic · missing · bugs · headless)

Ordered 2026-08-12 ("deeper audit… logic, missing, bugs… headlesss"), the depth
pass behind the same-day hygiene audit (`2026-08-12-everything-audit.md`).
**Report only.** Headless walk ran against built dists on localhost — every
Sanity request fails CORS there (origin not allowlisted), so data-path errors
were classified, not counted as bugs.

## Verdict card

| Area | Verdict |
|---|---|
| Link ↔ route integrity | 🟢 **zero dead internal links** (web); brand NAV_TREE ↔ routes **exact parity** (50 nav paths, 45 routes, 0 misses both directions) |
| Headless walk — brand | 🟢 12 routes, **0 console errors**, all titles resolve |
| Headless walk — web | 🟢 12 routes render, no JS exceptions; all errors = local-CORS/analytics class · icon warnings = the known 7 names |
| React logic | 🟢 timers clean · 1 listener leak (in an orphan file) · 25 index-key files (low risk) |
| Data layer | 🟢 queries.js catches internally (4/4); useMetricsData has error state; 2 soft spots below |
| Prod serving (`metadata-proxy`) | 🟠 4 findings below — it fronts EVERY page request |
| /metrics | 🟡 sets **no page title** — stale title bleeds from the previous route |

> ## ✅ ALL SIX FIXED 2026-08-14 (user: "fix all")
>
> This section is **closed** — do not mine it for tasks. What shipped, per finding:
>
> 1. `routes/Metrics.jsx` — `<SEO>` block added (title + description), render wrapped in a fragment.
> 2. `api/metadata-proxy.js` — `KNOWN_SECTIONS` allowlist (8 top-level segments) + definitive slug misses → `res.status(404)`, SPA shell still sent so NotFound renders. Deliberately **segment-level, not a mirror of App.jsx's route table** (that table is built dynamically from embed groups + apparat tools; duplicating it would 404 live pages on every new route). Residual: an unknown leaf under a known section still returns 200.
> 3. `api/metadata-proxy.js` — `JSON.stringify(slug)` replaces the hand-quoted param.
> 4. `api/metadata-proxy.js` — `normalizePath()` applied once, before **all** matching (static lookup and the three slug regexes).
> 5. `hooks/useMetricsData.js` — the audit named `:197`; there were **four** identical silent catches in that effect. All four now report through `setError` with the endpoint name (`repo`/`sanity`/`deploys`/`b2`). The 5s poll's catch stays silent on purpose, commented.
> 6. `CursorTrailColor.jsx` — orphan re-verified (0 importers, web + brand), retired to `_tmp/2026-08-14-audit-fixes/`. Not repaired, per the ruling.
>
> Also added: `scripts/metadata-proxy.test.mjs` — asserts every real section passes the
> allowlist and that garbage fails. Run `node apps/web/scripts/metadata-proxy.test.mjs`.
> New top-level route ⇒ add its segment to `KNOWN_SECTIONS` **and** to that test.
>
> Build `pnpm exec turbo run build --force` 3/3 green. Undeployed.

## Findings — worth fixing

1. **`/metrics` has no SEO/title** — confirmed headless: after visiting `/work`
   then `/metrics`, the tab still reads "Work — Kolkrabbi". Every other route
   walked sets its title. One `<SEO>` block in `routes/Metrics.jsx`.

2. **metadata-proxy: unknown paths return 200** (`api/metadata-proxy.js:127`) —
   any garbage URL gets `app.html` + default meta + **status 200**: soft-404s
   site-wide for crawlers. Fix: a route allowlist (the router's own table or
   STATIC_META keys + the three slug patterns) → 404 status (still rendering the
   SPA shell so the NotFound page shows).

3. **metadata-proxy: hand-quoted GROQ param** (`:47`) —
   `params.set('$slug', `"${slug}"`)`: a slug containing `"` or `\` produces
   invalid param JSON → Sanity 400 → silent default meta. `JSON.stringify(slug)`
   is the encoding. Not exploitable (params, not query splice), just fragile.

4. **metadata-proxy: `STATIC_META[url]` is exact-match** (`:103`) — `/studio/`
   (trailing slash) misses the entry and falls to default meta. Normalize the
   url before lookup (strip trailing slash) unless Vercel is known to normalize.

5. **`useMetricsData.js:197` swallows errors silently** (`.catch(() => {})`)
   while its siblings surface `setError` — one endpoint failing is invisible to
   the page. Low stakes, but it's the odd one out in its own file.

6. **CursorTrailColor.jsx: 7 addEventListener / 2 remove** — real leak, but the
   file is one of yesterday's confirmed **orphans** (zero importers). Dies with
   the orphan sweep; don't fix, retire.

## Findings — recorded, low priority

- **Index keys in 25 files** — only bites on reorder/filter lists; the filtered
  grids (Stack `key={article.slug || index}`) already have slug fallbacks. Sweep
  opportunistically when touching each file.
- **Sanity fetch call sites have no per-call error UI** (Work/Stack/WorkDetail/
  CmsGlobal render empty lists on failure — queries.js catches and returns
  empty). Deliberate-looking; noting that offline = silently empty pages.
- **Web title bleed pattern**: titles come from per-route `<SEO>`; any future
  route without one inherits the previous route's title (the /metrics case is
  the only current instance).
- The `/foundry`, `/prints`, `/metrics` console errors in the walk log
  (`.playwright-mcp/console-2026-08-12T16-45…log`) are ALL the localhost-CORS
  class + `_vercel/insights` 404 — none reproduce on the real origin.
- Icon warnings fire exactly for the 7 dashboard names already in the hygiene
  audit (§9) — now confirmed live on `/metrics`.

## What was checked and came back clean

- **T1**: every literal `to=`/`href=` internal link in both apps resolves
  against the real route tables; brand NAV_TREE (50) ↔ routes (45) parity is
  exact in both directions; no route unreachable from nav.
- **T2**: no setInterval/setTimeout leaks anywhere; no module-scope
  window/document access that could crash at import; scroll/key listeners in
  Navbar/TakeoverMenu/SideNav all clean up.
- **T3**: `lib/queries.js` — 4 exported queries, 4 internal catches;
  `useMetricsData` throws on `!r.ok` and surfaces `error` state (except finding
  5); brand's media client built at module scope per the 08-01 law.
- **T4** (today's new code, re-reviewed): TakeoverMenu's paired `useGSAP`
  effects clean up (listener + scroll lock restore both branches); the workshop
  X-ride's mount-time tween is a no-op at rest (harmless); sparkle nodes
  self-remove; the ride's link query is scoped to the takeover's own
  `nav[aria-label="Primary"]`; dev favicon is compile-time gated.
- **T5**: brand localStorage (`kol-sidenav` one-time purge, `kol-theme` boot)
  guarded with try/catch; `useEmbed` latch consumed by BrandLayout; headless
  walk green.
- **T6**: build chain coherent — `vite build && mv index.html app.html`,
  9 meta placeholders present in source, vercel rewrite → metadata-proxy,
  robots/sitemap in dist, filesystem precedence serves static assets.

## Method note (headless)

`vite preview` 404s the web app by design — dist has `app.html`, not
`index.html`; prod serves through the metadata-proxy rewrite. The walk loaded
`/app.html` directly and drove the router via pushState/popstate; brand walked
normally on its preview. 24 routes total, both themes' apps, zero JS exceptions.
