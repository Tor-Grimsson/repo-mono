# Agent Context - kolkrabbi.io Monorepo

> **Read this after running the quickstart loop in `docs/AGENT-ONBOARDING.md`.** It summarizes the live workstreams, latest checkpoints, and handoff notes.

## Project Overview
- Unified monorepo combining the public site (`apps/web`), foundry app (`apps/foundry`), Sanity studios (`apps/studio-*`), and shared packages (`packages/ui`, `packages/content`, `packages/fontviewer`).
- Shared design system (Tailwind v4 + `@kol/ui` tokens) and consolidated Sanity schemas power every experience.

## Current Status
**Phase**: Phase 5 – Component Architecture & Optimization
**Last Updated**: 2025-10-16 17:00
**Active Cycle Checkpoint**: `docs/SESSION-LOGS/2025-10-16-1700-color-system-debugging-complete.md`

### Active Focus
- **Context-aware color system** – ✅ COMPLETE. Scoped token remapping, DataTable debugging, comprehensive documentation.
- **Next priorities** – Continue styleguide component review, consider deprecated token audit across project.

### Latest Milestones
- `docs/SESSION-LOGS/2025-10-16-1700-color-system-debugging-complete.md` – **✅ COLOR SYSTEM DEBUGGING**: Fixed button context-awareness, completed inverse token architecture, fixed DataTable pills & text visibility, created debugging checklist (`4.2-css-debugging.md`), updated LLM_RULES.md with system integrity priorities.
- `docs/SESSION-LOGS/2025-10-16-1102-styleguide-color-tweaks.md` – Orange brand primitive added, checklist formatting updates, theme toggle demos aligned with production animation, and legacy preview removed.
- `docs/SESSION-LOGS/2025-10-16-1600-color-system-refactor-complete.md` – **✅ COLOR SYSTEM REFACTOR**: Phases 1-5 done. 69 tokens, 46 utilities, zero breaking changes, comprehensive docs.
- `docs/SESSION-LOGS/2025-10-16-0242-styleguide-color-update.md` – Styleguide color page reorganized to match design-system chapters.
- `docs/SESSION-LOGS/2025-10-16-1500-color-system-refactor-phase-4-complete.md` – Phase 4: State variant tokens and utilities (11 tokens, 16 utilities).
- `docs/SESSION-LOGS/2025-10-16-1400-color-system-refactor-phase-3-complete.md` – Phase 3: Component abstraction removed, elevation system added.
- `docs/SESSION-LOGS/2025-10-16-1200-color-system-refactor-phase-1-2.md` – Phase 1-2: Token architecture, geometric scale, surface borders.

### Stable Foundations
- Shared packages (`packages/content`, `packages/ui`, `packages/fontviewer`) are production-ready.
- `apps/web` runs live Sanity data with `/home-original` migration complete (GSAP animations included).
- Tailwind v4 tokens, typography system, and light/dark theming are normalized across apps.  
> Consult `docs/status/migration-status-board.md` for the full scoreboard and outstanding tasks by package/app.

### Working Agreements
- Follow `docs/AGENT-ONBOARDING.md` before touching code; update this file whenever active focus changes.
- Archive superseded plans, research, or stale session logs under `docs/archive/` during checkpoint handoffs.
- Record architectural decisions in `docs/status/architectural-decisions-log.md` and keep session checkpoints current.

### Key Links
- Status tracker → `docs/status/migration-status-board.md`
- Decisions log → `docs/status/architectural-decisions-log.md`
- Current checkpoints → `docs/SESSION-LOGS/`
- Archive index → `docs/archive/README.md`

### Source Reference (Legacy Projects)
- `/Users/biskup/git/kolkrabbi` – Original web + fontviewer
- `/Users/biskup/git/kolkrabbi-fontviewer` – Foundry + fontviewer v2
- `/Users/biskup/git/kolkrabbi-foundry` – Foundry standalone
- `/Users/biskup/git/kolkrabbi-staging` – Current production site snapshot

---
**Last Agent**: Claude Sonnet 4.5
**Last Checkpoint**: 2025-10-16 17:00 (`docs/SESSION-LOGS/2025-10-16-1700-color-system-debugging-complete.md`)
**Handoff Note**: ✅ Color system debugging COMPLETE. Fixed button context-awareness (scoped token remapping), completed inverse token architecture (Material Design 3 pattern), fixed DataTable pills (3 variants with context-aware tokens), fixed DataTable text visibility (replaced deprecated `--component-fg` tokens), created comprehensive debugging documentation (`docs/system/4.2-css-debugging.md` - 5-step checklist), updated component reference (`docs/system/4.1-css-components.md`), added inverse surfaces section to color system docs (`docs/system/2.0-color-system.md`), updated `LLM_RULES.md` with design system integrity as highest priority. All components now properly adapt to surface contexts. Ready for continued styleguide component review.
