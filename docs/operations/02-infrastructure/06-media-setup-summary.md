---
title: Setup summary
type: log
status: archived
updated: 2026-05-05
description: The 2026-05-04 → 05 zero-to-live session — R2 bucket, Pages project, bindings, and what ended up where. Kept as the origin record; live state is agent state.
aliases:
  - setup-summary
tags:
  - domain/workflow
  - project/kol-monorepo
  - provider/cloudflare
related:
  - "[[INDEX|operations]]"
  - "[[04-media-deploy|deploy]]"
---

# kol-media-admin — setup summary

Session of 2026-05-04 → 2026-05-05. From zero to live.

## What we built

A standalone admin app for the `kol-media` R2 bucket. Drag-drop upload, list with image/video thumbs, copy-URL, delete. No git push needed to add media; consumer projects (kolkrabbi, etc.) reference URLs at `r2.kolkrabbi.io` (was `media.` until 2026-08-26).

## What lives where

| thing | location |
|---|---|
| R2 bucket | Cloudflare → `kol-media` |
| Public media URL | `https://r2.kolkrabbi.io/<key>` |
| Admin app (deployed) | `https://kol-media-admin.pages.dev` (latest deploy: `https://88fd3d49.kol-media-admin.pages.dev`) |
| Admin app (local source) | `/Users/biskup/dev/projects/kol-system/kol-media-admin` |
| Admin password | Bitwarden + Cloudflare secret `ADMIN_PASSWORD` + local `.dev.vars` |

## Stack

- React 19 + Vite 8 + Tailwind 4 + KOL design system (copied via `/init-scaffold`)
- Cloudflare Pages with Pages Functions for `/api/{upload,list,object}`
- R2 binding `MEDIA_BUCKET` → `kol-media`
- HTTP Basic Auth, single password

## Architecture decisions (codified)

See `docs/llm-context/ARCHITECTURE.md` for the full version. Short list:

- §1 R2 is the canonical media store; nothing in repos.
- §2 API-first; the admin UI is one consumer. Other apps consume `/api/*` directly or via an extracted React component (later).
- §3 Single deploy target — Cloudflare Pages with Functions.
- §4 Single shared password (Basic Auth). No user accounts.

Non-goals: no in-browser image transforms, no multi-user, no iframe embeds, no auto-cleanup, no metadata DB.

## Commands you'll actually use

```sh
pnpm dev:cf              # local dev (mock R2, no risk to real bucket)
pnpm run deploy          # build + ship to Cloudflare Pages
pnpm exec wrangler login # one-time, already done
```

`pnpm dev` alone (no `:cf`) skips the Functions layer — the UI loads but uploads/list/delete return 404.

## Next steps

### 1. Full round-trip smoke test (5 min)
Goal: prove end-to-end. Upload → fetch via public URL → see file render in a fresh tab.

- Open admin URL, drag in a small test image (e.g. `test/sample-01.jpg`)
- Click **Copy URL** on the resulting card
- Paste into a new tab — if the image renders at `https://r2.kolkrabbi.io/test/sample-01.jpg`, the chain works
- Delete the file from the admin → refresh the public URL → expect 404

### 2. Custom subdomain for the admin (5 min)
Goal: stop dealing with `kol-media-admin.pages.dev`.

In Cloudflare → Workers & Pages → `kol-media-admin` → **Custom domains** → add `admin.kolkrabbi.io` (or whatever subdomain you want). Cloudflare auto-provisions the cert.

### 3. Clean up test files (1 min)
The bucket currently holds `bdfoijdf.jpg` from initial dashboard testing. Delete it via the admin and re-upload with a real key like `samples/character-01.jpg` so future-you isn't squinting at gibberish filenames.

### 4. Hook up GitHub auto-deploy (optional, 10 min)
Goal: every `git push` deploys automatically + branch previews.

- `git init`, push to a new GitHub repo
- Cloudflare → Pages project → **Settings → Builds & deployments → Connect to Git**
- Future deploys via push instead of `pnpm run deploy`

Skip this if you're happy with manual deploys for solo work.

### 5. Reusable picker component (when the 2nd repo needs it)
Per ARCHITECTURE §2, when kolkrabbi (or another repo) wants in-app uploads instead of opening the admin in a new tab:

- Extract `<MediaUploader>` and `<MediaPicker>` components into `kol-system/packages/kol-media-client/`
- Both consume the same `/api/*` endpoints
- Add CORS allowlist to `functions/api/_middleware.js` for the consumer origin

Don't build this preemptively — wait until a real consumer asks for it.

### 6. Edge cache hygiene
Cloudflare caches public media URLs aggressively. If you ever overwrite a key (e.g. uploading a new `samples/hero.jpg` over the old one), the public URL may serve the stale file. Two paths:

- **Convention:** never overwrite. Append a version (`hero-v2.jpg`) or content hash.
- **Manual purge:** Cloudflare dashboard → Caching → Configuration → Purge URL.

### 7. Future: lifecycle / quota awareness
R2 free tier is 10 GB. Video eats this fast. When you start pushing real volume, two options:
- Move to a paid R2 plan ($0.015/GB/month, no egress fees)
- Front R2 with Cloudflare Stream for video-specific transcoding/ABR

Not urgent. Track usage in the R2 dashboard.

## Files in this repo (what to read when you come back)

- `README.md` — public-facing setup + deploy
- `docs/llm-context/ARCHITECTURE.md` — load-bearing decisions
- `docs/llm-context/AGENT-CONTEXT.md` — current state, gotchas, contracts
- `docs/llm-context/session-log/2026-05-04-r2-setup-and-scaffold.md` — first session log
- `CLAUDE.md` — *(does not exist yet — add via `/init` if you want one)*
- `LLM_RULES.md` — startup protocol for Claude agents in this repo

`/docs/`, `LLM_RULES.md`, and `.claude/` are gitignored — they're agent-facing artifacts that don't ship with the deployed app.
