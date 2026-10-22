# Give metrics.kolkrabbi.io a share image: og:image + twitter:image, 1200×630

**Staged:** 2026-10-19 · from a kol-atlas session
**Change:** small — one image in `apps/metrics/public/` and four meta tags in `apps/metrics/index.html`

---

## The problem, in one case
`apps/metrics/index.html` has a title ("Metrics — Kolkrabbi") and a description, a favicon, a touch icon and a manifest — but no Open Graph or Twitter card tags. Any link preview of https://metrics.kolkrabbi.io (Slack, iMessage, a link card) shows text only.

Found from kol-atlas, whose workspace previews links on hover from each site's og metadata: metrics was the one Kolkrabbi link with no image. kol-atlas now carries a local stopgap screenshot (`docs/documentation/_assets/link-cards/custom-metrics-kolkrabbi-io.png`), which drifts from the real dashboard the moment it changes.

## The fix
- A 1200×630 share image for metrics in `apps/metrics/public/` (the identity mark on the dashboard look, per `/front-door` and the family's other share cards).
- In `apps/metrics/index.html`: `og:title`, `og:description`, `og:image` (absolute URL), `og:type`, and `twitter:card` = `summary_large_image` + `twitter:image`.
- `robots` stays `noindex, nofollow` — a share card is about previews, not search.

## Rejected alternative
Keeping per-consumer screenshots (kol-atlas's stopgap): every consumer would carry its own copy, and none of them updates.

## Definition of done
- [ ] `curl -s https://metrics.kolkrabbi.io | grep og:image` returns an absolute image URL that loads (200, image/*)
- [ ] `twitter:card` is `summary_large_image`
- [ ] kol-atlas can drop its `custom-metrics-kolkrabbi-io.png` and refetch the card
