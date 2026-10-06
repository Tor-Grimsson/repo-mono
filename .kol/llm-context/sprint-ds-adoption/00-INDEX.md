# Sprint: Website → kol-design-system Adoption  — ⏸ PARKED (2026-07-08)

> **PARKED at a clean checkpoint:** theme + shell + docs migrated to `@kolkrabbi/*` (steps 1 + partial 2
> done, green). Active work moved to `../sprint-apparatus-gallery/`. Reason: the workshop's DS/Components
> showcase pages — the bulk of the remaining migration target — are **superseded by `apps/brand`/`kol-ds`**
> and will be **saved into the `kol-ds` repo**, not migrated here. Resume only if we consume more
> `@kolkrabbi/*` in surviving web surfaces. SearchInput logged as a gap (upstream lacks `iconOnly` mode).


> **The dedicated home for this sprint** — a once-in-a-repo-lifetime effort, tracked
> here because it spans many sessions and many agents. Everything the sprint produces
> lives in this folder. **Agents: read in the order below before touching anything.**

## What this sprint is

The website (`apps/web`) came first. The design system was born inside it, iterated
OUT into `kol-design-system` (`~/dev/projects/kol-apparat/kol-design-system`), and
pulled ahead — cleaner, versioned, published as `@kolkrabbi/kol-*` on public npm.
**This sprint drags the website up to match the DS**: consume the published packages,
collapse the internal `@kol/*` elders, delete the rough folders and duplicates.

Delicate by definition: the most active kolkrabbi repo, live in prod. Hence:
per-import-site swaps, visual gates, proving ground first (`/workshop`+`/docs`),
never big-bang.

## Reading order

| File | What | Read when |
|---|---|---|
| `01-board.md` | **Live scoreboard** — step status, prereqs, landmine shortlist | every session, first |
| `02-parity-audit.md` | **Evidence** — per-package parity matrix, risk register R1–R5, elder map | before executing any step |
| `03-plan.md` | **The executable plan** — steps 1–5 with files, gates, rollback | when doing the work |

## Status snapshot (update on milestone, not every edit)

- **2026-07-08** — Sprint opened. Step-0 parity audit run (5 agents) + independently reviewed/corrected same day: **GREEN, fully incremental.**
- **2026-07-08 (later)** — Step 1 code done on branch `sprint/ds-adoption`: **1a registry spike PROVEN** (`import.meta.glob` works from a registry install under `optimizeDeps.exclude`, dev + prod build; icon data lands as its own 1.1 MB/241 kB-gzip lazy chunk), 1b brand theme entry + 1c web's four theme file imports swapped to `@kolkrabbi/kol-theme`, builds green. **Step 1 CLOSED same evening, machine-verified** (byte-diffs + old-vs-new render diff on brand; the only visual delta = `@layer` shift letting authored Tailwind utilities finally beat DS chrome — accepted, the old state was the bug). Next: Step 2 proving ground `/workshop`+`/docs`.

## Rules of engagement

- Board is the single live status — update it the same turn work lands.
- Session logs still go to `session-log/` as usual; this folder is sprint state, not a log archive.
- The old `status/migration-status-board.md` (brand→monorepo migration) is a PREDECESSOR sprint — done, superseded on direction by this one.
