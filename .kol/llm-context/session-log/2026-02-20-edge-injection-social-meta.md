# Session Log - 2026-02-20 — Edge Injection & Social Metadata

## Agent Info
- **LLM Used**: Claude Sonnet 4.6
- **Session Started**: 2026-02-20
- **Session Ended**: 2026-02-20
- **Message Count**: ~25

---

## What Was Accomplished

### Problem Solved
Social crawlers (Facebook, LinkedIn, Slack, X/Twitter) do not execute JavaScript. The SPA served `index.html` with hardcoded generic tags to every crawler regardless of URL — sharing any page showed the homepage title and image. The `/api/share/stack.js` endpoint existed but generated a separate share-URL page that nothing linked to, so it was never used.

### Solution: Vercel Edge Injection Proxy
All navigable HTML requests are now intercepted by a serverless function (`/api/metadata-proxy.js`) that reads `dist/index.html`, fills in the correct per-route metadata, and returns pre-filled HTML. Static assets (JS/CSS/images) are served directly by Vercel CDN before rewrites fire and are unaffected.

### 1. `apps/web/index.html` — Placeholders
Replaced all hardcoded `<title>` and `og:*` / `twitter:*` content values with substitution tokens:
- `__TITLE__`, `__DESCRIPTION__`, `__IMAGE__`, `__URL__`
- 8 substitutions total (title appears in 3 places, description in 3, image in 2, URL in 2)

### 2. `apps/web/api/metadata-proxy.js` — New serverless function
Three-tier metadata lookup:

| Tier | Routes | Source |
|------|--------|--------|
| 1 | `/stack/:slug` | Sanity — `blog` document: `seo.seoTitle` → `title`, `seo.seoDescription` → `excerpt`, `seo.ogImage` → `thumbnail` → `coverImage` |
| 1 | `/work/:slug` | Sanity — `project` document: `seo.metaTitle` → `title`, `seo.metaDescription` → `description`, `thumbnail` |
| 2 | `/prints/:slug` | `prints.js` — `getPrintBySlug()`: `shareImage` → `detailImages[0]` → `image` |
| 3 | Everything else | `STATIC_META` from `seoMetadata.js` |

Cache header: `s-maxage=60, stale-while-revalidate`

Uses `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET` / `VITE_SANITY_API_VERSION` — already set on Vercel, no new env vars needed. Sanity dataset is public-read, no token required.

### 3. `apps/web/vercel.json` — Rewrites updated
Removed the old SPA catch-all (`/(.*) → /`) and the non-functional `/share/stack/:slug` workaround. All HTML routes now go through the proxy:
```json
{ "source": "/(.*)", "destination": "/api/metadata-proxy" }
```

### 4. `apps/web/src/data/seoMetadata.js` — Extended
- Added top-level page entries to `seoMetadata` object: `home`, `prints`, `work`, `stack`, `about`, `contact`
- Added `STATIC_META` export — a flat `/path → {title, description, image}` map covering all 20 static routes
- Named image constants at the top (`OG_HOME`, `OG_PRINTS`, etc.) make per-section image swaps a one-liner
- Foundry typeface pages wired to their existing per-typeface OG images in `/public/img/open-graph-foundry/`

### 5. `packages/content/src/schemas/types/blog.ts` — SEO fields added
Added `seo` object field (group: `meta`) with:
- `seoTitle` (string, max 60)
- `seoDescription` (text, max 160)
- `ogImage` (image)

Mirrors the pattern in `project.ts`. Existing posts work without changes — proxy falls back to `title` and `excerpt`.

### 6. `scripts/test-meta.sh` — New crawler simulation script
```bash
./scripts/test-meta.sh /stack/some-article
# Sends Twitterbot UA to localhost:5173 and greps OG/Twitter tags
```
Note: works against `vercel dev` (not `yarn dev`) to exercise the actual proxy.

### 7. `docs/documentation/00-metadata/0.0.5-social-crawlers.md` — Documentation
Full reference doc covering: system architecture, three-tier resolution, image specs, how to change images per page/section, Sanity CMS override fields, print shareImage path, cache clearing per platform, local testing commands.

### 8. Fixed `d3` missing dependency
`TagGraph.jsx` imported `d3` which was not installed. Ran `cd apps/web && yarn add d3`, then `yarn install` from root to materialize it into `node_modules`.

---

## Files Changed

| File | Change |
|------|--------|
| `apps/web/index.html` | Replaced static meta content with `__TITLE__` / `__DESCRIPTION__` / `__IMAGE__` / `__URL__` placeholders |
| `apps/web/api/metadata-proxy.js` | **Created** — edge injection serverless function |
| `apps/web/vercel.json` | Replaced `/(.*) → /` catch-all and `/share/stack/:slug` workaround with proxy rewrite |
| `apps/web/src/data/seoMetadata.js` | Added `home`/`prints`/`work`/`stack`/`about`/`contact` entries; added `STATIC_META` flat route map with named image constants |
| `packages/content/src/schemas/types/blog.ts` | Added `seo` object field with `seoTitle`, `seoDescription`, `ogImage` |
| `scripts/test-meta.sh` | **Created** — crawler simulation curl script |
| `docs/documentation/00-metadata/0.0.5-social-crawlers.md` | **Created** — full reference documentation |
| `docs/documentation/00-metadata/0.0.4-concept-index.md` | Added `0.0.5` entry |
| `apps/web/package.json` | Added `d3` dependency |

---

## Current State

**What's Working:**
- All static pages (`/`, `/prints`, `/work`, `/stack`, `/foundry/*`, `/collections/*`, `/about`, `/contact`, `/workshop`) return correct per-section OG tags to crawlers
- `/work/:slug` Sanity pages return correct title, description, and thumbnail image ✅ (verified with Facebook Sharing Debugger)
- `/stack/:slug` Sanity pages return correct title, description, and image from Sanity ✅ (verified with `curl -A "Twitterbot"`)
- `/prints/:slug` returns print name and artwork image ✅
- Foundry typeface pages use their dedicated per-typeface OG images
- Browser users unaffected — React hydrates normally, `react-helmet-async` handles in-app navigation
- `react-helmet-async` still works for in-app navigation (SPA behavior unchanged)
- Sanity Studio deployed with new `seo` fields on blog schema

**What's In Progress:**
- None

**What's Broken/Blocked:**
- None known

---

## Known Limitations / Design Decisions

### Print pages show portrait/square image on Facebook
`/prints/:slug` uses `print.image` (the artwork), which is portrait/square. Facebook shows portrait images as a small thumbnail beside text rather than large-on-top. To fix:
1. Add a `shareImage` field per print in the source YAML (`art-prints/print-{name}/data.yaml`)
2. Update `art-prints/generate-prints-js.py` to include it in the output
3. Proxy already checks `print.shareImage` first in its fallback chain

### `fb:app_id` warning in Facebook Sharing Debugger
Facebook notes a missing `fb:app_id` tag. This is only needed for Facebook Analytics/SDK. Safe to ignore for link previews.

### `test-meta.sh` targets Vite dev server
The script hits `localhost:5173` (Vite) which doesn't run the serverless proxy. For proxy testing use `vercel dev` or `curl` against the deployed URL.

### Cache clearing required after deploy
Facebook and LinkedIn cache OG data aggressively. After deploying changes use:
- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/) → Scrape Again (sometimes twice)
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Next Steps
1. Create landscape `shareImage` crops for individual prints and wire via YAML → generator
2. Create custom OG images for key static pages (`/stack`, `/prints`, `/work`) — currently all using the default `open-graph-03.png`
3. Consider adding `og:image:width` / `og:image:height` tags to the proxy response for faster layout decisions by social platforms

## Open Questions
- Should `/workshop` have its own dedicated OG image?
- Should we add a single `og:image` for `/collections/*` pages beyond the default?

## Notes
- The old `/api/share/stack.js` endpoint still exists but is no longer linked to by any rewrite. It can be deleted in a cleanup pass.
- `seoMetadata.js` is imported by both the React app (client-side, for `react-helmet-async`) and the serverless proxy (server-side). Keep it free of browser-only APIs.
- Vercel CDN serves `dist/` static assets before rewrites fire — the proxy is only invoked for HTML document requests, not JS/CSS/image files. No performance impact on asset loading.
