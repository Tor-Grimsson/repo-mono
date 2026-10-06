---
title: Dead & Duplicate Components — Cleanup Ledger
type: audit
status: active
updated: 2026-07-03
description: Orphaned/dead components and live duplicates found during the 2026-07-03 DS-lobby sweep, verified by importer grep. Delete/dedupe list.
tags:
  - project/monorepo
  - domain/design-system
sources:
  - apps/web/src
related:
  - "[[01-component-scan-coverage|component scan coverage]]"
---

# Dead & Duplicate Components — Cleanup Ledger

Surfaced during the 2026-07-03 reusable-component sweep (see [[01-component-scan-coverage|component scan coverage]]). **Verified** by grepping every importer across `apps/web/src`, not just taken from the scan agents' word.

## Confirmed dead — delete-safe

Zero functional importers. (The only hits are in **generated workshop audit data** — `data/workshop/system-metrics.json`, `data/workshop/typeAudit.js` — which list component paths but don't import them; regenerate that data after deleting.)

| File | Why dead | Verification |
|---|---|---|
| `routes/StackBlog.jsx` | Not routed in `App.jsx`; identical twin of StackDetail | 0 code importers (audit-json only) |
| `routes/StackDetail.jsx` | Not routed; identical twin of StackBlog | 0 code importers (audit-json only) |
| `components/prose/layouts/ArticleLayout.jsx` | **Chain-dead** — only imported by StackBlog + StackDetail, both dead | 2 importers, both dead |
| `components/sections/studio/StudioHero.jsx` | Orphaned; never imported | 0 importers |
| `components/sections/shared/ChapterNavigation.jsx` | Orphaned TOC nav; never imported | 0 importers |
| `components/sections/cta/CtaWork.jsx` | Superseded; not rendered anywhere | 0 code importers (typeAudit only) |
| `components/sections/cta/CtaFoundry.jsx` | Superseded; not rendered anywhere | 0 code importers (typeAudit only) |
| `components/workshop/organisms/CardFeatures.jsx` | Duplicate feature grid; never imported | 0 importers |

> **Note:** `StudioHero` and `ChapterNavigation` were still *staged to the lobby* as reusable-pattern references. Staging captures the pattern in a spec — it does **not** require keeping the source file. Delete the files; the DS recreates from the spec if wanted.

## Live duplicates — migrate, then delete

NOT dead (they render on live pages), but they reimplement something already staged. Migrate the consumer, then delete.

| File | Consumer | Duplicate of | Action |
|---|---|---|---|
| `components/sections/home/WorkshopFeatures.jsx` | `routes/Home.jsx:53` | `FeaturesCardSection` (staged) | Repoint Home → `FeaturesCardSection`, then delete |
| `components/sections/studio/StudioProcessCard.jsx` | `routes/Studio.jsx:69` | `FeatureSplit` (staged, `imagePosition:'right'`) | Repoint Studio → `FeatureSplit`, then delete |

## Not cleanup — for context

- `components/sections/studio/StudioAboutCard.jsx` — LIVE (`Studio.jsx:63`); a consumer of the glass-panel pattern (→ `OverlayGlassPanel`, staged). Keep; just refactor onto the shared panel.

## Caveat

Verification was an importer grep over `apps/web/src`. Before deleting, re-run `grep -rn <Name> apps/` once more (catches any cross-app or dynamic-string reference), and regenerate `data/workshop/{system-metrics.json,typeAudit.js}` so their stale entries drop.
