---
title: B2 hostname cutover inventory
type: audit
status: active
updated: 2026-08-14
description: Every live reference to the raw f005.backblazeb2.com host across the ecosystem, by repo and file — the exact blast radius of moving the website bucket onto a Kolkrabbi domain.
aliases:
  - cutover-inventory
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/backblaze
covers:
  - live code references by repo and file
  - docs and vault references
  - the replace token
  - what a release gates
sources:
  - grep of ~/dev/projects for f005.backblazeb2.com/file/kolkrabbi/website
related:
  - "[[02-b2-website|B2 — kolkrabbi/website]]"
  - "[[INDEX|buckets]]"
---

# B2 hostname cutover inventory

Snapshot of **2026-08-14**. Counts are occurrences of the literal `f005.backblazeb2.com/file/kolkrabbi/website`, excluding `node_modules/` and `dist/`.

## The replace tokens

Every single reference carries the full literal base. Two find-and-replaces cover everything:

```
https://f005.backblazeb2.com/file/kolkrabbi        →  https://cdn.kolkrabbi.io
https://f005.backblazeb2.com/file/kol-vault-media  →  https://vault.kolkrabbi.io
```

Order matters only in that the first pattern must not be written as `…/file/kolkrabbi/website` if you also want it to catch the three stray non-`website/` objects in that bucket.

**The hostname is centralised nowhere.** Each file declares its own `const cdnBase = '…'` — there is no shared constant, no env var, no config. That makes the cutover mechanical but wide, and it's the reason a shared base constant is worth extracting *after* the domain lands (not before — it would double the diff).

## Totals

| Repo | Occurrences | Files | Class |
|---|---|---|---|
| `kol-website` | 45 | 28 | **the live public site** — 23 in code, rest in its own docs |
| `kol-vault` | 1552 | 110 | Obsidian note embeds — markdown, not code |
| `kol-apps` | 15 | 14 | **outdated folders** — swept for hygiene, not a live consumer |
| `kol-chess` | 0 | 0 | the chess-data home, but reads chess.com directly — no CDN reference |
| `kol-ds-ui` | 4 | 4 | 2 live in **published packages**; 2 in lobby history |

## Live code — the actual cutover targets

**`kol-website`** — 23 occurrences, 20 files:

| Area | Files |
|---|---|
| `apps/web/src/data/` | `prints.js` · `grids.js` · `illustrations.js` · `logomarks.js` · `motion-graphics.js` · `featureCards.js` · `foundry/typefaceConfig.js` |
| `apps/web/src/components/sections/home/` | `HomeAbout` · `HomeFoundry` · `HomeHero` · `HomeHighlights` (×2) · `WorkshopFeatures` |
| `apps/web/src/components/` | `sections/stack-detail/StackHero.jsx` · `ui/ProfileCard.jsx` |
| `apps/web/src/routes/` | `Stack.jsx` (×2, inline `src`/`srcSet`) · `Studio.jsx` · `prints/PrintsGridGsap.jsx` · `foundry/FoundryTypefaces.jsx` · `workshop/WorkshopIntroduction.jsx` |
| `apps/brand/` | `src/pages/Landing.jsx` |

**`kol-ds-ui`** — 2 occurrences, both in **published packages**:

- `packages/foundry/src/typefaceConfig.js`
- `packages/chess/src/data/sample-games.js`

These are the constrained ones: the URL is baked into `@kolkrabbi/*` at publish, so changing it needs a version bump and a consumer update. **Not blocking** — the raw B2 host keeps working after the domain lands, so these can lag.

**`kol-apps`** — 1 occurrence, in an **outdated folder**:

- `kol-labs-monorepo/packages/chess-data/src/index.js`

`kol-apps` is mostly superseded folders, not a live consumer. It stays in the sweep so a stale copy can't reintroduce a raw hostname, not because anything ships from it.

**`kol-chess`** — the chess-data home, and it references the CDN **nowhere**. It reads the chess.com API directly (`src/lib/resolveGame.js`), so the bucket's `data-library/chess-data/` (108 objects) is consumed by `kol-ds-ui/packages/chess/` and the retired `kol-apps` copy, not by `kol-chess` itself.

## Not cutover targets

- `kol-apps/kol-client-kolkrabbi/_tmp/_import-dump/` — 11 occurrences in retired import dumps. Out of tree by definition.
- `kol-apps/kol-years/CLAUDE.md` — placeholder examples using `/file/bucket/path/`, not the real bucket.
- `kol-apps/kol-lightroom/.../{ARCHITECTURE,AGENT-CONTEXT}.md` — prose mentions of the bucket, not URLs.
- `kol-ds-ui/.kol/llm-context/lobby-history/` — historical records. Point-in-time, never rewritten.
- `kol-website/docs/documentation/08-cdn/` — 7 doc files. Update with the code, not before.

## The vault — both buckets

`kol-vault` is the largest holder of raw hostnames and needs **both** replaces:

| Points at | Occurrences | Becomes |
|---|---|---|
| `kolkrabbi` bucket | 1552 | `cdn.kolkrabbi.io` |
| `kol-vault-media` bucket | 4908 | `vault.kolkrabbi.io` |

Markdown in an Obsidian vault, not code — no build, no release, no consumer. Mechanically it's the easiest sweep in this document and the least urgent: nothing breaks if vault notes keep using the raw host. Do it in one pass whenever, after the Worker is live.

## Why this is safe to stage

The raw B2 hostname **does not stop working** when a custom domain is added — both resolve to the same objects. So every repo above can move on its own schedule, and a half-migrated ecosystem is a valid state rather than an outage. There is no flag day.
