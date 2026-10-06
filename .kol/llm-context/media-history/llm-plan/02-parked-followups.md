# Parked follow-ups — after the ContentFilters-collection milestone (2026-08-27)

Parked, not open. None blocks the admin; each is picked up on its own trigger.

| Item | Trigger | Notes |
|---|---|---|
| Retire `cdn.` / `vault.` from `workers/cdn-proxy/` | `pnpm cdn-cutover` dry run reports zero old-host refs estate-wide | Bulletin posted 2026-08-27; the old names cost nothing while attached |
| Redeploy kol-ds-ui / kol-apps / kol-vault from the 08-15 hostname sweep | Their next build | Bulletin tells each repo; nothing here waits on it |
| `kolkrabbi` B2 bucket — sweep the ~12 GB of prior versions | When storage cost matters | Lifecycle is keep-last-version since 08-15; old versions still stored |
| Thumbnails at upload time (R2 has no variant sets → grids load full renders) | When `labs-render-examples/` browsing feels slow | Cloudflare Image Resizing is paid/off on this zone; `loading="lazy"` is the current mitigation |
| Edge-cache 404 on rename (consumers hardcoding old URLs) | A consumer reports it | Not surfaced in the UI; keys are unique per upload in practice |
| R2 list cursor ignored (>1000 objects) / B2 adapter 10-page cap | R2 > 1000 objects or a B2 bucket > 10k | 433 / 3443 / 4095 today |
| `FileList` = DS `MediaLibrary` + a writes slot (one render of the bucket) | brand `/library` and the admin drift apart, or a third consumer wants the listing | `MediaLibraryReconcile` 🟢 2026-08-26 made the DS page variant FileList's read-only render; the writes slot is the missing half |
| The bucket is listed twice per page load | A load feels slow, or a bucket grows past the point where a duplicate list is felt | Browse and library each run their own `useBucketLibrary`; the DS pages have no shared provider seam. `cache-control: public, max-age=30` means the second request is usually a cache hit — waste, not breakage. Fixing it is a DS provider that both pages sit inside |
| CORS for **writes** only | A second app wants to write, not just read | Reads are done: `/api/list` always sent `*`, and object reads on `r2.kolkrabbi.io` got a bucket policy 2026-08-27 (`docs/operations/04-r2-cors.md`). Writes still need Plan B (consumer proxy) or Plan C (shared component) |
| **`MediaLibrary` has no mobile story — DS ticket, not ours** | Someone actually needs the page on a phone | Seen 2026-09-03 on `media.olina-productions.com` (same organisms, different repo — the layout reproduced, which is the point): at 390px the second column is clipped off-screen with no scroll affordance, the stored `columnHeight` (800) paints an empty black void the length of the viewport, and the crumb / ROW·COLUMN row overflows with `COLUMN` cut at the edge. Source confirms the cause: `ColumnBrowser.jsx` has **zero** breakpoint classes and the theme has no `@media` rule for it — a Finder column view was never given one. `ContentFilters` and the page shell do have some (`max-md:hidden`, `md:gap-*`). Fix belongs in kol-ds-ui and should be filed with measurements from a real phone, not from source. **Not filed** — the user's call to note and move on (2026-09-03) |
