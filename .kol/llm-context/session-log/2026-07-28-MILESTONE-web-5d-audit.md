# 🏁 Milestone: apps/web 5-dimension audit

**Date:** 2026-07-28
**Agent:** Grim (Fable 5)
**Arc:** The agreed 5-dimension sweep of apps/web — tooltips · a11y labels · SEO/meta per route · head/doc · robots/sitemap — inventory → correction pass → one apply batch.
**Delivered:** Full coverage across all five dimensions (~45 files), one DS round-trip (kol-component 0.12.1), and a guide-built touch-icon system.

## What closed
- Tooltips → done: 28 icon-only controls wrapped in DS `Tooltip` (12 files); wordmarks/prototypes/thumbnails deliberately skipped
- A11y → done: skip link, per-route `id="main"` landmarks, 7 form-control labels, video aria, 404 noindex (25 files)
- SEO → done: `<SEO>` on WorkDetail + per-path workshop titles; STATIC_META dead rows out, `/studio` in; proxy `/workshop` prefix fallback — closes the long-parked `/work/:slug` SEO item
- DS Slider label bug (found by audit) → fixed in kol-ds-ui, **kol-component 0.12.1** published + consumed; Input/SearchInput verified not-defective
- Head/doc → done: canonical placeholder line, apple-touch-icon wired
- Robots/sitemap → done: 5 prototype routes disallowed, sitemap rewritten to the 19 real static pages
- Touch icon → done: SVG masters on the KOL keyline grid (toggleable guide layer) + PNG exports in root `public/touch-icons/` (own concept-folder, web symlink mount); **light locked** (user)
- Sitemap build-script for dynamic `/work`+`/stack` slugs → parked at `playbook/2026-07-28-web-polish.md`
- Docs typography pass + apparat tool stories (pre-arc parked items) → carried in `playbook/2026-07-28-web-polish.md` as the next run's vehicle
- User visual pass → user-side, outside agent scope

## The arc (brief)
- Inventory by three parallel audit agents + head/robots/sitemap read; findings + defaults in `plans/web-audit-5d-inventory.md` (now marked APPLIED, kept as reference)
- Discovery that shaped the arc: SEO infra already existed two-layered (helmet client-side + Vercel `metadata-proxy` crawler path) — work became coverage, not construction
- Apply batch ran as three parallel edit agents (tooltips / a11y / SEO) + direct head/robots/sitemap edits; all parse-verified (eslint config pre-broken: missing `@eslint/js`)
- Side quest: touch icon went candidate-PNGs → user correction → keyline-grid SVG masters as the kept deliverable, rasters demoted to exports
- Conduct rulings landed this arc: npm publish = agent, git = user · ping when background work lands · decisions in plain speak · corrections clarify, never retract · asset deliverables = SVG masters in repo paths
- Spans: `2026-07-28-workshop-embeds-nav-ownership-icon-curation.md` (prior arc) → this log
