---
title: kol-media-admin — Future Exploration
version: 1.2.0
date: 2026-07-02
status: active
type: plan
tags: [media-admin, plan, exploration, kol-system/media-admin/plan]
---

# kol-media-admin — future exploration

Ideas that aren't committed work. Move items out of here when they become real roadmap entries in `../llm-context/AGENT-CONTEXT.md`.

---

## Card-size slider (grid density control)

Slider that scales grid card minimum width — denser at low values (more cards per row, smaller thumbs), looser at high values (fewer cards, bigger thumbs).

### shape
- Slider in the Files-section header next to the view toggle
- Range mapped to grid `minmax(<size>px, 1fr)` — e.g. 140 → 360
- Persists per session (localStorage)
- Hidden in list view (irrelevant)

### architecture
- New atom or inline `Slider` (kol-component already has one)
- App-level state `cardSize`, passed to FileList
- FileList swaps `grid-cols-[repeat(auto-fill,minmax(${cardSize}px,1fr))]` accordingly

### trade-offs
- Trivial code, mild visual chrome cost
- One more setting to forget about

### open questions
- Default size — 220 (current after the bump from 220→260)? 280?
- Should it also scale the type/buttons proportionally, or only the thumb?

### kill criteria
- If users only ever use one density, dropping the slider for a fixed value is cleaner.

---

## Multi-select download

Tick boxes on cards/rows → bulk-download all selected files at once. Avoids opening N tabs or clicking the per-file download button repeatedly when grabbing a batch.

### shape
- Selection mode: checkbox in the top-left of each card (mirror of the download icon's top-right placement) and an inline checkbox in list view.
- Persistent action bar at the bottom (or sticky header) when 1+ files selected: "N selected · Download · Deselect."
- "Select all visible" affordance near the view toggle.

### architecture
Two reasonable shapes — pick at build time:

- **Server-side zip endpoint** — `POST /api/download-batch { keys: [...] }` streams a zip of the requested R2 objects back with `Content-Disposition: attachment; filename="kol-media-<timestamp>.zip"`. Cleaner one-file UX. Implementation cost: a streaming zip lib that runs in Workers (e.g. `client-zip`), handle cancel mid-stream, memory ceilings on Workers free plan.
- **Client-side fan-out** — for each selected key, programmatically trigger a download via a hidden `<a download href="/api/download?key=...">` (already exists). Browser handles N parallel downloads. Cheaper to ship; messier for the user (N save dialogs unless browser is configured to auto-save, and folder structure is flattened).

Server-side zip is the right end state. Client-side is the v0.

### trade-offs
- Selection mode adds UI state complexity (selected keys set, rendering checkboxes, action bar visibility).
- Workers streaming zip works but memory-bounds the practical batch size. Past ~50 large files, the user should be using `wrangler r2 object get` or rclone instead.

### open questions
- Should a download include the folder structure (`photoshoot/04.jpg` keeps the prefix in the zip) or flatten everything?
- Does a single failure (one key 404s) abort the batch or skip and continue?
- Selection mode default: always-on (checkboxes visible), or toggled with a "Select" button to keep the default UI clean?

### kill criteria
- If it turns out the user only ever bulk-downloads via `rclone sync` or `wrangler r2`, the in-app version is wasted UI. The single-file Download button covers the 90% case already.

---

Nothing here is committed. This doc is a thought exercise until items graduate to `../llm-context/AGENT-CONTEXT.md`.
