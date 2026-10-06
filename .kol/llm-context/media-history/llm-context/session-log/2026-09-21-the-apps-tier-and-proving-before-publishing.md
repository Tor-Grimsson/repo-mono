# Session: The apps tier — a product has to work before anything consumes it

**Date:** 2026-09-21
**Agent:** Grim (Claude Opus 5)
**Summary:** No code changed. The session was about the development process itself: six published component versions to land one mobile screen is the symptom, and the cause is that kol-ds-ui has nowhere to *use* a product. Filed the structural ask, and wrote the concept once in dotfiles rather than four times across four repos.

## What happened

Started by reading what kol-client-olina's MBP session had done to `apps/media/src/UploadZone.jsx`
— a "New folder (optional)" field prefixing upload keys (R2 has no empty folders, so folder
creation is upload-driven), then browser-side image conversion: every filename slugged, a raster
still uploaded twice as `original/<name>` plus a canvas-re-encoded `<stem>.jpg` (≤2560 wide,
white-flattened, quality stepped until ≤500 KB).

That surfaced the real subject. The user's framing, and the thing this log exists to carry:

> *"1000 round trips to kol-ds-ui npm package bullshit... every time comes with uncertainty of the
> publish is missing a piece because we couldn't proof it before publish."*

> *"These mini tools have their validity as products, but no home to reference — I always have to
> find the latest iteration and upstream that to sync with older models. The latest version should
> always be before its consumed."*

## What was established

- **kol-ds-ui has two tiers and needs three.** `packages/*` is published; `showcase` and `workbench`
  are apps. Showcase is *presentation* (a set page lists its member components; `/sets/preview/:slug`
  is described in its own source as an iframe src) and workbench is Ladle isolation, 90 stories. Neither
  is a place to use a product. So the only surface where one can be exercised is a consumer holding
  real credentials — which is how concept ownership drifted into consumers.
- **Workspace deps are symlinks, not copies.** `workspace:*` links `node_modules/@kolkrabbi/kol-component`
  → `packages/component/`. N apps declaring the same package is ONE source folder, not N updates, and
  folder depth is irrelevant. This is the fact that kills the publish round trip inside the repo;
  publishing is only for repos outside it.
- **The fake is the mechanism.** In-memory mutable fixture tree, a Clear-changes reset, every operation
  actually executing. No provider — Pages / Vercel / Supabase is the consumer's choice, not the DS's.
  `showcase/src/sets/record-manager-cms.jsx` already proves the pattern works (`useState(SEED)`, 165
  lines); it just has no mandate and sits in the presentation tier.
- **One app at a time.** The tier is designed for N tools (editors, 3D, vector, notes/md parsers, the
  shared home+settings shell fxr/mirror/monitor use, the per-client brand setup) and populated one at
  a time. Media first. *"This is a marathon not a sprint."*
- **Shared shells become packages**, not copies inside each app.

Two corrections taken during the session, recorded because they were mine: I pointed at
`showcase/src/sets/` as if it answered the question (it displays compositions, it does not run a
product), and I narrowed a file-management *system* to the four client methods the organism happens
to call today. The reference is Finder / Dropbox / Drive — folders as real objects, context menus,
drag, search, tags, modes — not today's call list.

## Changes Made

No `src/` changes. Bookkeeping and documentation only:

- **`~/.dotfiles/docs/operations/systems/apps-tier/INDEX.md`** — **new, and the source of truth.**
  The whole concept: the law, the three tiers, what an app in the tier is and is not, the data rule,
  one-app-per-product-shape, why symlinks remove the round trips, scope discipline, and the media gap.
  Rowed into `docs/operations/systems/INDEX.md`.
- **`~/dev/projects/kol-ds-ui/lobby/inbox/apps-tier-media-first.md`** — the ticket. Build order, not
  reasoning; it links the concept doc rather than restating it. Queue row + history row added to their
  ledger (queue 4 → 5).
- **`lobby/outbox/apps-tier-media-first.md`** + `Filed elsewhere` row + history row here.
- **Pointers, not copies** — a short section in this repo's `docs/operations/INDEX.md` and in
  kol-ds-ui's, both linking the dotfiles file and both saying explicitly not to restate it.

## The logistics ruling worth keeping

The user asked for the concept in four places — here, kol-ds-ui, dotfiles, worklogs — and asked
whether one source of truth could be copied instead. **It is written once and linked, not copied.**
That is already the estate's own rule, stated in `docs/operations/systems/INDEX.md`: *"Each system
documents the map and the machinery here; each repo keeps its own depth in its own docs/. Nothing is
written twice."* Four copies of one explanation is exactly the drift the arrangement exists to stop —
and it is the same failure as the upload surface existing twice.

## Current State

- Ticket filed 🔵. **Nothing owed here.** This repo is a consumer of the outcome; no `src/` change, no
  bump, no adoption until `apps/media` exists and has been clicked through.
- Available to the DS on request, not pushed: `src/UploadZone.jsx` (the DS has no upload at all), and
  the fact that ARCHITECTURE §N forbids in-browser image transforms **here** — a kol-r2b2 non-goal,
  not the design system's, already crossed by the olina fork on a client bucket. If the product grows
  conversion, §N needs a deliberate ruling rather than a quiet exception.

## Next Steps

1. kol-ds-ui builds the tier and `apps/media`. Nothing here moves until then.
2. When it lands: this repo adopts the published result, and the upload surface stops existing twice.
