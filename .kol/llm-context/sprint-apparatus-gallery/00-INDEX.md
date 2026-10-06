# Sprint: Workshop → KOL Apparatus Gallery

> The dedicated home for this sprint. Multi-session, agent-generational — everything
> it produces lives in this folder. **Agents: read in order before touching anything.**

## What this sprint is

The `/workshop` in `apps/web` was a design-system showcase + a set of **inline, now-outdated
re-implementations** of the KOL tools. Two things changed that:

1. **`apps/brand` (→ `kol-ds`, ds.kolkrabbi.io) is now the real DS/component showcase.** The
   workshop's DS + Components pages are superseded — they get **saved into the `kol-ds` repo**,
   not maintained here (parked; see the DS-adoption sprint).
2. **Every KOL tool already lives as its own deployed standalone** (github.com/Tor-Grimsson,
   each on a vercel/subdomain deploy). The workshop's inline copies (`KolMirror.jsx`,
   `KolMonitor.jsx`, apparatus editors, …) have gone stale.

**So the workshop's new job: CURATE, not host.** A gallery of cards — category · live link ·
repo link · preview image · real blurb — that highlights the tool constellation and **deletes
the stale inline code**. The only things kept *embedded live* are the two **in-repo** systems:
the dashboard/metrics set and the chess system (same-origin, no cross-origin pain, ours to show
in full).

## Locked decisions

- **KEEP the workshop LOOK — do NOT change the chrome.** The local `components/shell/` + workshop-style
  sidebar + layout STAY (the look is wanted). This sprint updates the stale *components* inside the shell
  to the current published `@kolkrabbi/kol-component`; it does **not** adopt the framework's `AppShell` or
  rebuild the layout. _(Rejected 2026-07-08: wholesale kol-framework shell adoption — it would change the
  look. "Look to the framework" meant "get components current like the framework's," not "adopt its shell.")_
- **Curate, don't embed.** External tools = cards linking to their live deploy + repo, with a
  **static preview image** (NOT an iframe — sidesteps the cross-origin partitioning pain).
- **In-repo systems stay live-embedded** (dashboards, chess).
- **Retire the inline apparat implementations** from `apps/web` as each card lands (redundancy kill).
- **DS/Components showcase pages → `kol-ds` repo**, parked meanwhile (not deleted).

## Reading order

| File | What | Read when |
|---|---|---|
| `01-registry.md` | the tool constellation — one row per tool, with live/repo/blurb/inline-page-to-retire | first |
| `02-plan.md` | the 4-phase execution plan | when doing the work |

## Status snapshot

- **2026-07-08** — Sprint opened. Phase 0 (registry) run via `gh` + README fetch. 8 external tools
  + 2 in-repo systems. 5 blurbs solid; **radial/modulator/radar need real blurbs** (boilerplate
  READMEs). Next: confirm the 3 blurbs, then Phase 1 (gallery shell).

## Relationship to the DS-adoption sprint

Predecessor `sprint-ds-adoption/` is **PARKED** at a clean checkpoint (theme + shell + docs migrated
to `@kolkrabbi/*`). Its abandoned showcase pages are this sprint's "→ kol-ds repo" item. Not the
same sprint: that one was package plumbing, this one is workshop product architecture.
