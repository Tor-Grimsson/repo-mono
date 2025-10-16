# Migration Status - kolkrabbi.io Monorepo

**Last Updated:** 2025-10-14 20:00  
**Maintainer:** Shared (update when shifting owners)

> This scoreboard complements `docs/AGENT-CONTEXT.md`. Use it to understand portfolio-wide progress at a glance; detailed session notes live in `docs/SESSION-LOGS/` and the archive.

## Phase Overview
| Area | Status | Notes |
|------|--------|-------|
| Phase 1: Foundation | ✅ Complete | Monorepo + documentation framework established. |
| Phase 2: Package Consolidation | ✅ Complete | `@kol/ui`, `@kol/content`, `@kol/fontviewer` stable. |
| Phase 3: App Migration | 🟢 Web shipped / 🟡 Foundry & Studios | Web routing + data live; foundry needs QA; studios waiting for credentials. |
| Phase 4: Integration & Testing | 🟡 In Progress | Build pipeline verification and GROQ validation outstanding. |

## Active Workstreams
1. **Foundry polish** – Validate token usage, hover states, and interaction QA before sign-off (`apps/foundry`).
2. **Studio credential handoff** – Obtain project/dataset env vars and run smoke tests on `apps/studio-cms1` & `apps/studio-cms2`.
3. **Content verification** – Run CASE_STUDY GROQ queries end-to-end now that schemas are unified.
4. **Dev workflow documentation** – Refresh run/build/test guidance post-migration (add to `docs/operations/workspace-cheatsheet.md` when ready).

## Stable Foundations
- **Packages**: `packages/content`, `packages/ui`, `packages/fontviewer` are production-ready and version-aligned.
- **Design System**: Tailwind v4 tokens, typography, and context-aware color utilities documented in the styleguide.
- **Web App**: Live Sanity data, `/home-original` migration complete, GSAP animation stack verified.

## Outstanding Risks / Follow-ups
- 🟡 **Build pipeline** – Need foundry + studio build checks and Turbo cache validation.
- 🟡 **Foundry UX QA** – Ensure TG Málrómur assets + interactions behave across themes.
- 🟡 **Deployment readiness** – Document studio credentials and dataset split for future operators.

## Reference Links
- Latest checkpoints → `docs/SESSION-LOGS/`
- Decisions archive → `docs/status/architectural-decisions-log.md`
- Onboarding workflow → `docs/AGENT-ONBOARDING.md`
- Historical plans/research → `docs/archive/`

## Source Projects (for comparison only)
1. `kolkrabbi` – Original public site
2. `kolkrabbi-fontviewer` – Foundry + font viewer v2
3. `kolkrabbi-foundry` – Legacy foundry app
4. `kolkrabbi-staging` – Current production snapshot
