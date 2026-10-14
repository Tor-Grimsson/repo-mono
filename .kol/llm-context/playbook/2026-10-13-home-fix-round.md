# Playbook — home fix round

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`.

**Goal:** the user's 10-item review of home / foundry / stack (2026-10-13), rounded to one ticket + six local edits.

**Standing rules (non-negotiable):**
- One ticket to kol-ds-ui (BackgroundVideo HLS start level); everything else local.
- Primary hover (the well) and the tilt banding are NO CHANGE — ruled/explained, not edited.
- Never touch user-facing copy beyond what was asked.

---
## Entries

[20:21 GMT · 2026-10-13] · setup · playbook created
  what → initialised the live playbook   why → /kol-goal + /playbook on the fix round

[20:22 GMT · 2026-10-13] · ticket · kol-ds-ui lobby
  what → BackgroundVideoStartsAtLowestRendition filed (entry · DS row · receipt · our row)   why → new Hls() unconfigured, starts 360p
  note → ✓

[20:22 GMT · 2026-10-13] · home · hooks/useFeatureCards.js:44
  what → Collections card → /stack   before → /work?view=list   after → /stack   ✓

[20:22 GMT · 2026-10-13] · home · components/sections/home/HomeHighlights.jsx
  what → enableTilt={false} on all 7 TiltBento   why → user: tilt too much, disable for now   ✓

[20:22 GMT · 2026-10-13] · home+stack · components/sections/home/HomeSignup.jsx:20
  what → newsletter band ground off   before → bg-fg-absolute-16   after → none   ✓

[20:22 GMT · 2026-10-13] · stack · routes/StackArticle.jsx
  what → TOC blurb "A condensed outline…" deleted, heading kept   ✓

[20:22 GMT · 2026-10-13] · foundry · components/sections/foundry/InDevelopmentSection.jsx:28
  what → placeholder note   before → MISSING   after → In progress   ✓

[20:22 GMT · 2026-10-13] · home hero · components/ui/HlsVideo.jsx
  what → hls.js startLevel -1 · 8 Mbps estimate · capLevelToPlayerSize   why → same ask as the ticket   ✓
  verify → esbuild parse ✓ on all six files · no dev/build run (user validates live)

[20:37 GMT · 2026-10-13] · return · BackgroundVideoStartsAtLowestRendition 🟢
  what → kol-component ^0.252.0 → ^0.255.0 in all four apps   note → 0.254.0 never on the registry; 0.255.0 has HLS_DEFAULTS · one copy ✓
  what → HomeHero on DS BackgroundVideo (aria-hidden passed)   why → HLS_DEFAULTS not exported from the index
  what → components/ui/HlsVideo.jsx ▣ _tmp/2026-10-13-local-hlsvideo/
  verify → parse ✓ · tiles ≥720p not measured here

[21:42 GMT · 2026-10-13] · d1 arc · setup
  what → kol-media D1 created (5bf8981d-ec5d-4da1-80fc-5ac4fd974f2d, WEUR) after the user re-ran wrangler login (d1:write scope)   why → the gate of plans/2026-10-13-d1-arc.md
  note → list contract decided: olina's — key = PATH, storageKey = R2 key; the DS does not read storageKey yet (0 hits) → ticket in T5

[21:46 GMT · 2026-10-13] · d1 arc · apps/media
  what → wrangler.toml [[d1_databases]] DB · schema.sql (files · decks · notes · events) · applied --local and --remote ✓
  what → functions/api: _id · _files · _cors · _middleware (preflight bypasses auth) · upload at f/<id> · list from D1 + adopt/prune bucket objects · rename/move/delete by path (row edits) · download resolves path → key · decks.js · notes.js (olina, verbatim)
  what → src/App.jsx thumbnailFor → publicUrl(o.storageKey ?? key)
  verify → local wrangler pages dev :8788 (PID 31082, killed): upload → rename → folder move → storageKey f/birelm59ff.txt unchanged ✓ · download by new path ✓ · delete ✓ · decks PUT/GET ✓ · notes PUT/GET/DELETE ✓ · preflight 204 + ACAO brand ✓ · no auth 401 ✓ · r2 put --local adopted, delete --local pruned ✓
  note → contract: key = path, storageKey = R2 key (olina's). DS builds URLs on key → MediaLibraryUrlOnStorageKey filed

[21:48 GMT · 2026-10-13] · d1 arc · deploy + ticket
  what → schema --remote (10 queries) · pnpm run deploy → 4cbc719e.kol-media-admin.pages.dev · live /api/list: 434 objects adopted, storageKey == key for all · /api/decks 401 without auth · B2 list 3440 unchanged ✓
  what → MediaLibraryUrlOnStorageKey filed to kol-ds-ui (entry · DS row · receipt · our row)

[21:54 GMT · 2026-10-13] · d1 arc · brand port
  what → olina → brand: 14 editor files into loaders/decks/ (ours SlideDeck · DeckShell · deckStyles KEPT — the Right Grotesk deck) · pages SlideDeckEdit · SlideDeckView · Manager · Templates (ours → _tmp/2026-10-13-brand-decks-elder/) · Notes · NoteEdit · lib adminAuth · notesStore · data/templates.js (docs only, no section components) · styles/decks.css
  what → identity: 'Olina Productions' → 'Kolkrabbi', cover 'Olina / Productions' → 'Kolkrabbi / Vinnustofa', monogram O → K, olina-productions.com → kolkrabbi.io, info@ → hello@kolkrabbi.io, @olinaprojects → @kolkrabbi_ (brand/data/info.js) · fonts Bricolage → Right Grotesk (static cuts in slideExport) · keys kol.deck / kol.note / kol.admin
  what → uploadToBucket returns publicBase/storageKey · mediaClient exports ADMIN_BASE (VITE_ADMIN_BASE override) · routes /slide-deck/:slug(/edit) + /notes(/new|/:slug); Layout / Set 1 / Set 2 placeholders gone · sidebar: Slide deck = Library · Template; NOTES after LIBRARY = Library · Write
  note → olina's layout copy (cities, chapter names) left as placeholder text in the fourteen layout docs — the editor is where it changes

[21:54 GMT · 2026-10-13] · d1 arc · DS return consumed
  what → MediaLibraryUrlOnStorageKey 🟢 same evening: component ^0.257.0 (all four) · media-client ^0.6.0 (brand + media) · receipt + row closed

[21:58 GMT · 2026-10-13] · d1 arc · brand port verified
  what → pdf-lib 1.17.1 added to brand (slideExport's PDF path; the build named it) · layout docs' date line 'New York · 2026' → 'Reykjavík · 2026' (what the Right Grotesk deck itself says) · media KindOverview passes the row to mediaUrl · media redeployed on component 0.257 (1b5c7ce4.kol-media-admin.pages.dev)
  verify → brand vite build ✓ · vite preview :5199 (PID 63419, killed) + playwright: /slide-deck (CatalogPage, Right Grotesk card, New deck, Templates) · /slide-deck/template (Deck view 3 types; Slides view 14 layout docs rendered, KOL identity on the cover) · /slide-deck/right-grotesk/edit (stage + 14 filmstrip tiles, 228 layers, draft seeded at kol.deck.right-grotesk, Edit · Lock · Deck settings · File) · /slide-deck/right-grotesk (the Right Grotesk deck, 52 slide nodes) · /notes (password prompt → dismissed → "Cancelled.") — 0 console errors on all five
  note → not exercised: a deck SAVE / note SAVE against the live API from brand (needs the admin password in a browser) · the deck card has no cover (MISSING plate) — a cover is a registry field, none exists for Right Grotesk
  note → playwright wrote .playwright-mcp/ at the repo root → _tmp/2026-10-13-playwright-mcp/

──────────── MILESTONE: the D1 arc ──────────── [21:58 GMT · 2026-10-13]
  changed: media API (12 files) · brand (27 files) · 4 package.json · lobby ×2 tickets both 🟢 · build ✓
  log: pending /log-work
