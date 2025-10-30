# Agent Context - kolkrabbi.io Monorepo

> **Read this after running the quickstart loop in `docs/AGENT-ONBOARDING.md`.** It summarizes the live workstreams, latest checkpoints, and handoff notes.

## Project Overview
- Unified monorepo combining the public site (`apps/web`), foundry app (`apps/foundry`), Sanity studios (`apps/studio-*`), and shared packages (`packages/ui`, `packages/content`, `packages/fontviewer`).
- Shared design system (Tailwind v4 + `@kol/ui` tokens) and consolidated Sanity schemas power every experience.

## Current Status
**Phase**: Phase 5 – Component Architecture & Optimization
**Last Updated**: 2025-10-30 14:42
**Active Cycle Checkpoint**: `docs/SESSION-LOGS/2025-10-30-1442-work-page-refactor.md`

### Active Focus
- **Awaiting next task assignment**

### Recently Completed
- **Work page refactor** – ✅ COMPLETE. Full restructure with ProjectsGrid (9 cards, asymmetric layout), ProjectCard component, WorkSection header.
- **Structure unification** – ✅ COMPLETE. All main pages (Home/Work/Foundry) now use `<main>` + `.main-wrapper` pattern, removed pagePadding conflicts.
- **Component migrations** – ✅ ImageSection moved to @kol/ui, ControlButton created and documented.
- **Design system cleanup** – ✅ Fixed .btn-control padding, unified 4px border radius, removed inline styles.

### Latest Milestones
- `docs/SESSION-LOGS/2025-10-29-2206-foundry-hero-refactor.md` – **✅ FOUNDRY HERO REFACTOR**: Created Pill component (3 variants), refactored FoundryHero with ButtonGroup & context-aware tokens, documented preferred component structure pattern, created kol-div agent & 8.0-div-structure.md baseline, improved SectionLabel demo structural compliance (6/10→9/10).
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
**Last Checkpoint**: 2025-10-30 14:42 (`docs/SESSION-LOGS/2025-10-30-1442-work-page-refactor.md`)
**Handoff Note**: ✅ WORK PAGE REFACTOR COMPLETE. Unified all main pages (Home/Work/Foundry) to use `<main>` + `.main-wrapper` structure, removed pagePadding conflicts. Created ControlButton component (documented in 7.0-components.md), moved ImageSection to @kol/ui. ProjectsGrid refactored: split ProjectCard into separate file, CSS Grid with asymmetric layout (first + last cards span 2 columns), 9 projects displayed, 440px height, 4px radius, 1200px max-width. ProjectsList max-width added, inline styles removed. All components use utility classes, design system compliant. System clean and consistent.
