# Media app into the monorepo + moving media off Sanity — scope

**Date:** 2026-10-02 · read-only scope, nothing changed. Sources: `kol-r2b2`, `kol-olina`, this repo, and the live Sanity dataset.
**Question (user):** bring the media app (kol-r2b2) in as `apps/media`, the way the client repos are set up, with the point of maybe changing where Sanity's media lives. Scope it; talk about it later.
**Verdict:** doable and medium-sized. Bringing the app in is the small part. The real work is replacing what Sanity does for images that a bucket does not — mainly resizing.
**State:** PARKED for discussion. No decision taken; the four picks in §6 are the agent's, not rulings. **2026-10-05:** the move itself is scoped on its own in `2026-10-05-media-app-into-monorepo.md`; this file keeps the Sanity half.

---

## 1. The three media apps on the estate

**kol-r2b2 is the media app** — the repo root is the app (`src/`, `functions/`, `wrangler.toml`), live as `admin.kolkrabbi.io` / `media.kolkrabbi.io`.

| | kol-r2b2 | kol-olina `apps/media` | kol-ds-ui `apps/media` |
|---|---|---|---|
| What it is | the estate's admin | a copy of r2b2, taken 2026-09-02, diverged since | the DS fixture — fake in-memory data, no network |
| Buckets | R2 `kol-media` (read + write), B2 `kolkrabbi` and B2 `kol-vault-media` (read-only) | R2 `olina-media` only | none |
| Database | none | Cloudflare D1 (`files`, `folders`, plus `decks`, `notes`, `events`) | none |
| File URLs | the key is the path — a rename or move changes the URL | permanent: every object at `f/<id>.<ext>`, name and folder are a D1 row | n/a |
| Move / rename / drag | rename only, and it breaks links | on (`fileActions`), safe because keys never move | on, over fake data |
| KOL versions | component ^0.215.0 · theme ^0.145.0 | component 0.232.0 · theme 0.160.0 · shell 0.59.1 | workspace |
| Extra | `functions/api/_b2.js` (B2 adapter), `workers/cdn-proxy/`, manifests + cutover scripts, bucket docs | upload pipeline (`src/lib/upload.js`), `functions-check.sh`, tests | — |

Olina's ARCHITECTURE §14 is explicit that its copy has **no upstream sync** — nothing it gained went back to r2b2. So the permanent-URL model exists only in olina's copy. Plan and cutover record: `kol-olina/.kol/llm-plan/02-media-permanent-urls.md`.

## 2. How olina set it up (the reference shape)

- pnpm workspace, `apps/{web,studio,media,brand}`; root scripts `media` (`wrangler pages dev`) and `media:deploy`.
- `apps/media` deploys to **Cloudflare Pages** with Functions (`wrangler.toml`: R2 binding `MEDIA_BUCKET`, D1 binding `DB`); the other apps deploy to Vercel.
- `pnpm-workspace.yaml` carries, beyond `packages` and the React override: `onlyBuiltDependencies` + `allowBuilds` for `esbuild` and `workerd` (without them install exits 1), and `minimumReleaseAgeExclude: '@kolkrabbi/*'`. This repo's file has neither.
- Sanity holds **documents and ordering only**. Every media field is `type: 'url'` pointing at R2; nothing binary is a Sanity asset. The studio previews thumbnails off the R2 URL.
- Uploads go through the media app's `/api/upload`, which writes the object and its D1 row together. A file put straight into R2 is invisible to the app.

## 3. What is in Sanity today

Project `to8h15ed`, dataset `projects`, queried 2026-10-02:

| | Stored | Referenced by a document |
|---|---|---|
| Images | 745 · 646 MB (jpg · png · svg · webp) | 300 · 300 MB |
| Files (video) | 22 · 653 MB | 8 · 580 MB |
| Documents | 26 `project` · 9 `blog` · 1 `author` | |

- 445 images are orphans (no document references them).
- The 8 referenced video files sit in 4 documents: blog `kol-radial-editor`, `monitor-modular-video-synthesizer`, `vcap`, and project `kol-radial`.
- Project video is **already half moved**: 6 hero videos (`heroVideoSrc.src`) and 17 gallery videos (`galleryHostedVideo`) are plain URLs to B2 HLS. 225 gallery items are still Sanity images.
- Largest images are 3200px PNGs up to 9.8 MB; largest file is a 150 MB mp4.
- A hotspot is set on one document, though six schema fields enable it.

## 4. What the move touches here

- **Schema** — `packages/content/src/schemas/types/`: 11 `image` fields and 1 `file` field across `project.ts`, `blog.ts`, `author.ts`, `modules.ts`.
- **Web** — `apps/web/src/lib/queries.js` (8 `asset->url` projections, each with a resize query), `components/ui/SanityImage.jsx` (used by `prose/blocks/ImageBlock.jsx` and `routes/StackArticle.jsx`), `components/prose/blocks/VideoBlock.jsx`; also `packages/content/src/queries.ts`.
- **Migration** — copy the 300 referenced images and 8 files through the media app's upload (so each gets a permanent key and a row), then rewrite the 36 documents in one transaction. Sanity assets stay until every new URL is verified.
- **Workspace** — the two `pnpm-workspace.yaml` settings from §2; root scripts; `apps/media` on the same KOL versions as web and brand (this repo keeps one copy of the DS tier). Olina's 0.232 is close to this repo's 0.237; r2b2's 0.215 is not.
- **Brand** — `apps/brand/src/lib/mediaClient.js` already reads the three buckets read-only through the admin API; it would point at whatever the admin becomes.

## 5. What Sanity does that a bucket does not

- **Resizing.** The queries ask Sanity for 200, 800, 1600 and 2000px renditions with `auto=format`. A bucket serves one file. Olina's uploader makes a single JPEG, at most 2560px and 500 KB — so list thumbnails get heavier unless a thumbnail rendition is made at upload. r2b2 lists in-browser transforms and paid Image Resizing as non-goals / parked.
- **Transparency.** Olina's uploader flattens stills onto white and re-encodes as JPEG. This site has PNG, SVG and WebP assets; the pipeline needs an exception for them.
- **Dimensions.** `heroImage` and gallery `media[]` read `asset->metadata.dimensions` for layout. With URL fields, width and height have to be stored with the URL (document or D1).
- **Studio upload.** Editors paste a URL instead of uploading in the studio. Crop/hotspot is lost; it is used on one document.

## 6. Open decisions (agent's picks, none ruled)

1. **Which code is the base.** Pick: olina's `apps/media` shape (permanent keys + D1), because a URL stored in Sanity is only safe if the file's URL never changes. r2b2 as it stands breaks links on rename.
2. **One admin or two.** Pick: one — the app that lands here carries r2b2's read-only B2 browsing, and `admin.kolkrabbi.io` stays the only admin. This changes r2b2's ARCHITECTURE (it names itself the admin and documentation home for both stores).
3. **Which bucket holds CMS media.** Pick: R2. r2b2 ARCHITECTURE §1 says the public site's media belongs on B2 `kolkrabbi/website/`, but the admin cannot write to B2 and the permanent-key model is built on R2 + D1. That rule would need amending — flag before acting.
4. **Image sizes.** Pick: a thumbnail and a full rendition made at upload, rather than paying for on-the-fly transforms.

## 7. Not verified

- **Whether Sanity bandwidth is actually a problem.** AGENT-CONTEXT records a planned Growth → Free downgrade around 2026-08-01 (100 GB cap), but usage is not visible from here and total storage is only 1.3 GB.
- The estate copy of kol-r2b2 read for this scope is the MBP checkout (first session there 2026-10-02); its code state matches its 2026-09-04 log.
- Nothing was measured about current thumbnail weights on `/work` versus what a single 500 KB rendition would cost.

## 8. Account-side work (the user's, not an agent's)

A writable R2 bucket for site media, a D1 database, the Pages project/hostname, and its secrets (`ADMIN_PASSWORD`, plus the B2 keys if the B2 adapter comes along).
