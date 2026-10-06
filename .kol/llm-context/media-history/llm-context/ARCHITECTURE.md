# kol-r2b2 — Architecture

Load-bearing decisions and constraints. Anything in this document is "we chose this deliberately and it has downstream consequences." Do not revisit without explicit reason. For decision history (alternatives considered, rejections, evolution), see `HISTORY.md`.

---

## §1 — Two buckets, two purposes; the repo is never the store

Media lives in object storage, never in consumer repos. There are **three** public stores and they do not merge:

| Store | Holds | Public base |
|---|---|---|
| **R2 `kol-media`** | tool media for kol-system apps | `r2.kolkrabbi.io` |
| **B2 `kolkrabbi`** | the public site's media under `website/` — art prints, asset library, HLS video, data library | `b2.kolkrabbi.io` |
| **B2 `kol-vault-media`** | the Obsidian kol-vault's attachments — img, sound, video | `b2v.kolkrabbi.io` |

Both B2 hostnames are served by one Cloudflare Worker, `workers/cdn-proxy/`. Backblaze's own Custom Domains feature is not available in this account (verified 2026-08-14).

**Named 2026-08-15.** The first-generation B2 hosts `cdn.` and `vault.` are still attached and still serve; keeping them attached is what made the consumer sweep safe to run without a flag day — retire them only once a `scripts/cdn-cutover.sh` dry run reports zero. R2's first-generation host `media.` was **detached from the bucket 2026-08-26** and attached to the `kol-media-admin` Pages project instead: it is the app's second hostname, read-only (no upload, rename, delete or move). `admin.kolkrabbi.io` was deliberately left out of this rename and stays the admin surface and API base.

**Consequence:** uploading a file does not require a git push, a CI rebuild, or a deploy. Consumers reference media by absolute URL only. Repo-tracked sample/placeholder media is acceptable but rare and explicit. This repo is the admin and documentation home for **both** stores.

**The split is by purpose, not by convenience.** Tool media and site media have different consumers, different write paths, and different cost profiles. Adding a file to the wrong one is the mistake this rule exists to prevent — not "using two providers."

**Do not revisit** the existence of two stores; that question is closed. Revisit a store's *choice of provider* only if we move off Cloudflare or Backblaze, or take on a hosting cost we want to externalize.

*(Superseded 2026-08-14: §1 formerly read "R2 is the canonical media store" and forbade a second bucket. B2 predated that sentence and serves more public traffic than R2 does — the rule was false as written.)*

---

## §2 — API-first; the admin UI is one consumer

The real surface is `/api/{upload,list,object}` (Pages Functions). The React app in `src/` is a thin client over those endpoints. Other kol-system projects can call the same API directly with `fetch()` rather than embedding the admin.

**Consequence:** no iframe-based integration, no media-picker baked into the admin's UI bundle. When other apps need a "pick / upload" component, the answer is a small reusable React component (extracted later) that consumes the same API — not embedding the admin app.

**Do not revisit** unless authentication moves to per-app scopes (then the API contract changes anyway).

---

## §3 — Single deploy target: Cloudflare Pages with Functions

The admin UI and the API live in the same Pages project. Functions get the R2 binding via the Cloudflare dashboard (`MEDIA_BUCKET` → `kol-media`). No separate Worker, no S3 SDK, no presigned-URL dance.

**Consequence:** local dev uses `wrangler pages dev`. CORS only needs to allow other kol-system origins; same-origin calls from the admin UI need none. Deploys are a single `pnpm deploy` (`vite build` + `wrangler pages deploy dist`, which also compiles `functions/` into Pages Functions) — not a git integration; this project isn't even a git repo.

**Do not revisit** unless the API surface grows to need cron/queues that Pages Functions can't host.

---

## §4 — Shared-secret HTTP Basic Auth

Single admin user. Auth is HTTP Basic against `ADMIN_PASSWORD` stored as a Pages env secret. The browser handles the prompt; no custom login UI.

**Consequence:** no user accounts, no session management, no JWT, no Cloudflare Access setup. If a second user is ever needed, that's the trigger to revisit — not earlier.

**Do not revisit** unless multi-user access becomes a real requirement.

---

## §N — Non-goals (do not reopen)

Stated design limits. Opening discussion on any of these requires explicit user ask:

- **In-browser image transforms.** No resize, no format conversion, no thumbnailing. Both stores serve originals; consumers can pipe through Cloudflare Images later if needed.
- **Multi-user / role-based access.** Single shared password. See §4.
- **Embedded admin UI in consumer apps.** Iframe / postMessage integration is rejected; reusable React component is the path. See §2.
- **Automated lifecycle / cleanup.** No TTLs, no orphan detection, no "files not referenced by any kolkrabbi page" sweeps. Manual delete only.
- **Image metadata / tagging system.** Keys + folder paths are the only organization. No DB layer.
- **Merging the two stores.** R2 and B2 stay separate — see §1. Not a cost question, a purpose question.
