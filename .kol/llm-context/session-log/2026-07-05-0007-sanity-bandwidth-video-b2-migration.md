# Session Log: Sanity bandwidth blowout → image resize + Work-video → B2 migration (Phases 1–2)

**Date:** 2026-07-05
**Status:** In Progress (Phases 1–2 done; 3–5 pending)

## Overview

`/work` rendered "0 of 0" because Sanity hit its **bandwidth quota** (HTTP 402) — forced a paid
upgrade. Root cause: `apps/web` served **full-resolution images and raw video straight from
Sanity's CDN**. Fixed images (URL transforms) and migrated all Work-page **video off Sanity onto
the B2 CDN as compressed MP4** (Phases 1–2 of a 5-phase plan). Site is **not yet cut over** — the
frontend + CMS still point at Sanity video until Phases 3–4 ship.

## Key Accomplishments

### 1. Image bandwidth fix (shipped, uncommitted/undeployed)
**Files:** `apps/web/src/lib/queries.js`, `apps/web/api/metadata-proxy.js`, `apps/web/api/share/stack.js`, `apps/web/api/share/stack/[slug].js`

Every Sanity image URL was the raw full-res original (a 4.3 MB PNG for a 400px thumbnail). Added
CDN transforms via GROQ string-concat: project `thumbnail` `?w=800`, `heroImage`/`media` `w=2000`,
blog `coverImage` `w=2000` / `thumbnail` `w=800` / author `w=200` / videoBlock poster `w=1600` —
all `&auto=format&fit=max`. OG images (metadata-proxy + share fns) → `?w=1200&fm=jpg&q=80`.
**Verified against live CDN: 4.3 MB PNG → 39 KB WebP (110×).**

### 2. Root-cause diagnosis: video was the real killer
The bigger blowout was **1.8 GB of raw video served from Sanity with `autoPlay preload="auto"`** —
`/work/motion-2` alone autoplayed **6 videos ≈ 782 MB per visit** (391 MB hero + gallery). ~13
views = the whole 10 GB free quota. Some were `.mov` (not even web format). Homepage/studio/
collections were already on B2/HLS — the leak was **only** the Work detail pages
(`WorkDetail.jsx` hero + gallery, `ImageLightbox.jsx`).

### 3. Phase 1 — Sanity schema (uncommitted)
**Files:** `packages/content/src/schemas/types/modules.ts`, `.../types/project.ts`, `.../index.ts`

New reusable **`hostedVideo`** object type (`src` URL, `aspectRatio`, `poster`, `alt`, `caption`)
— stores a B2 URL, not an uploaded file. Added `heroVideoSrc` + a `galleryHostedVideo` member to
`project.ts`, alongside the old `file` fields (additive/reversible). **Removed** `heroVideoLight` +
`heroVideoLightSrc` (light-mode video dropped — only kol-radial had one, unused). Type-check: 0 new
errors (2 pre-existing in blog.ts/modules.ts).

### 4. Phase 2 — transcode + upload to B2 (done)
**File:** `scripts/migrate-work-videos-to-b2.py` (new)

Self-contained: queries Sanity for the video manifest, dedups by asset, downloads → `ffmpeg` to
**1080p H.264 MP4** (`+faststart`, bitrate capped at source so it never inflates) + poster →
`bucket up` to B2 → emits `_tmp/work-video-migration/asset-b2-map.json`. **Decision: MP4, not HLS**
— these are short muted autoplay loops (10–149 s); single-rung HLS gave zero adaptive benefit and
just added segment clutter + hls.js. **Ran it: 20 MP4s, 479 MB total** at
`hls-library/video-library/work/<slug>/<name>/video.mp4` (+ `poster.jpg`), all serving HTTP 200.
Cleaned up: purged the first-run HLS trees + raw sources + the dropped radial-light from B2.

## Files Modified / Created (this repo)

### New
- `scripts/migrate-work-videos-to-b2.py` — Phase 2 transcode+upload
- `packages/content/src/schemas/types/modules.ts` → added `hostedVideo` (modified file)
- `docs/plans/work-video-b2-migration-plan.md` — the 5-phase plan (gitignored under `docs/`)

### Modified
- `apps/web/src/lib/queries.js` — image URL transforms
- `apps/web/api/metadata-proxy.js`, `apps/web/api/share/stack.js`, `apps/web/api/share/stack/[slug].js` — OG image transforms
- `packages/content/src/schemas/types/project.ts` — `heroVideoSrc` + `galleryHostedVideo`; removed light-mode video
- `packages/content/src/schemas/index.ts` — registered `hostedVideo`
- `.gitignore` — added `_tmp/`

### Local (gitignored)
- `_tmp/work-video-migration/` — `asset-b2-map.json` (feeds Phase 3) + downloaded sources + encodes

## Also this session — `~/.dotfiles` (separate repo)

Detour into `~/.dotfiles` (added as a working dir): built a **CDN bucket-tree snapshot system**.
Logged fully in that repo at `.kol/llm-context/session-log/2026-07-04-cdn-bucket-tree-snapshot-system.md`.
Files created there (not this repo):
- `bin/bucket-tree.sh` — snapshots each CDN bucket's tree (B2 rclone + R2 admin API) → raw json in
  `_files/` + readable markdown, refreshed by a post-write hook in the `bucket`/`bucket-r2` wrappers.
- `docs/18-cdn-r2b2/` — INDEX + `01-b2` + `02-b2-tree` (gen) + `03-r2` + `04-r2-tree` (gen) + `05-scripts` + `_files/`.
- Moved `bucket-r2` into `claude/packages/`; catalog + skill cross-refs updated.
- Relevance to this repo: `kol-monorepo` is a **consumer** of the B2 `website` bucket (it reads
  `hls-library/video-library/work/...` — where the Phase 2 MP4s now live).

## Context-system migration (later this session)

Converged this repo onto the canonical `.kol/` agent-context system, and fixed the skills behind it.

### This repo
- `docs/llm-context-protocol/` + `docs/plans/` + `docs/status/` → **`.kol/llm-context/`**; repointed `LLM_RULES.md` + `metrics-repo.js`; `.gitignore` now ignores `.kol/`.
- Adopted the `init-agent-context` canon: added `.kol/docs-framework/{fm,md,lib}` + INDEX, `session-bridge/`, `ARCHITECTURE.md` (**seeded** with the real project rules — TS boundaries, Tailwind v4, semantic tokens, Sanity-in-content…), `history.md`, canonical `README.md`, and `_template:` blocks on all so `/init-agent-context-sync` can track them. `session-logs/` → `session-log/`.
- **`LLM_RULES.md` → symlink** to the new generic boot file; project rules moved to `ARCHITECTURE.md`, onboarding to `README.md` (LLM_RULES is now 100% generic).
- Retired cruft → `_tmp/context-migration-removed/`: `.claude/` (skills are global), `AGENT-ONBOARDING.md`, `AGENT-KOL-CONTEXT-CHEAT-SHEET.md`, `count-messages.sh`, old `LLM_RULES.md`.
- Trimmed `AGENT-CONTEXT.md` to spec (**17 KB → 4 KB**): Active Focus to 3 recent tight entries; dropped the stale handoff-note walls (session-bridge owns handoffs now).

### Dotfiles (`~/.dotfiles`, separate repo)
- New `claude/packages/LLM_RULES.md` — the one generic boot file (the symlink source).
- `init-agent-context` skill: **symlinks** LLM_RULES instead of copying; **no per-repo `.claude/`** scaffolding (skills are global).
- `init-agent-context-sync` skill: dropped `.claude/skills` + `LLM_RULES` from sync scope.
- Quarantined obsolete template pieces (per-repo LLM_RULES + `.claude/`) → dotfiles `_tmp/`.

**Result:** the repo boots off the generic `LLM_RULES` → `.kol/`; every context file carries a `_template:` block so `-sync` tracks it; log-work is lean. Uncommitted (both repos).

## Issues Encountered

### 1. Sanity quota — silent empty vs error
`getAllProjects()` swallows all errors to `[]` with only a `console.error`, so a 402 quota outage
looked identical to "no projects exist." Diagnosed via a direct API probe. (Follow-up idea: surface
fetch failures distinctly from empty state — not done.)

### 2. ffmpeg 8.x quirks in the migration script
`ffprobe` csv parse returned an extra field → switched to `-of default=nw=1:nk=1`. Single-image
poster needed `-update 1`. Fixed-bitrate re-encode inflated already-small files → cap target at
source bitrate.

## Next Steps (resume here)

1. **Phase 3 — CMS patch (next).** Write + run a `@sanity/client` mutation script that reads
   `_tmp/work-video-migration/asset-b2-map.json`, matches each project's existing `heroVideo`/gallery
   file-asset ref → B2 URL, and patches the new `heroVideoSrc`/`galleryHostedVideo` fields. **Zero
   manual pairing.** Writes to production Sanity.
2. **Phase 4 — frontend rewire.** `WorkDetail` hero + gallery + `ImageLightbox` → native
   `<video src>` on the B2 MP4, `poster`, `preload="metadata"`, **in-view-only** gallery autoplay
   (IntersectionObserver). Query: emit `coalesce(heroVideoSrc.src, heroVideo.asset->url)` transitional.
3. **Phase 5 — cutover (user).** Drop old `file` fields from schema; delete the 20 Sanity video
   assets; watch usage flatten; **downgrade Sanity to free.**
4. **Commit + deploy** the image fix + schema + frontend (nothing is committed/deployed yet — the
   image fix alone is worth deploying now regardless).

**Plan doc:** `docs/plans/work-video-b2-migration-plan.md` (full detail, phase checkboxes).
