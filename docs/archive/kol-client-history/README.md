# kol-client history (archive — read-only)

Archived **2026-05-27**. This is the preserved llm-context + history of the
`kol-client-kolkrabbi` repo, which **merged into this monorepo** during the
brand→monorepo migration (it became `apps/brand` + seeded the canonical
`@kol/*` packages). Its history lives here so the context isn't lost when that
repo is retired.

**This is NOT the live context.** The live, maintained protocol for this
monorepo is `docs/llm-context-protocol/` (AGENT-ONBOARDING, AGENT-CONTEXT,
session-logs). Do not update anything in this folder — it's a snapshot.

## Contents
- `llm-context/` — kol-client's own context system as of the merge:
  - `AGENT-CONTEXT.md`, `ARCHITECTURE.md`, `README.md` — kol-client's agent setup.
  - `session-log/` — ~60 session logs spanning the AC→Kolkrabbi rebrand, the
    editor/color/typography work, and the brand→monorepo migration itself
    (`2026-05-27-phase-2-shared-surface-base.md`,
    `2026-05-27-phase-3-icon-button-reconcile.md`,
    `2026-05-27-phase-3-kol-component-extraction.md`).
- `migration-plan.md` — the full brand→monorepo integration plan (phases 0–6).

## Where the migration's live record is
- This monorepo's Phase 3 ship log: `docs/llm-context-protocol/session-logs/2026-05-27-1100-phase-3-kol-component-shipped.md`
- Memory: `brand-monorepo-migration` + `turbo-cache-raw-source-packages`.

Source repo (still intact at archive time): `~/dev/projects/kol-client/kol-client-kolkrabbi/docs/`.
