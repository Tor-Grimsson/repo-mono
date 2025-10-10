# Agent Context - kolkrabbi.io Monorepo

> **READ THIS FIRST** when starting any work session on this project.

## Project Overview
This is a **monorepo consolidation project** bringing together 4 separate projects:
1. Original web site
2. Foundry app
3. Font viewer tool
4. Sanity Studio(s)

The goal is unified architecture with shared dependencies, design tokens, and content schemas.

## Current Status
**Phase**: Phase 4 - Home Page Refinement & Theme Integration
**Last Updated**: 2025-10-09 20:30

### Migration Status
- [✅] Content schemas consolidated in `packages/content`
- [✅] UI theme complete in `packages/ui/theme.css` - v2.0 finalized
- [✅] Styleguide created in `apps/web/styleguide.html`
- [✅] UI components consolidated in `packages/ui`
- [✅] Font viewer migrated to `packages/fontviewer`
- [✅] Web app migrated to `apps/web` - Live data connected
- [✅] Home page migrated to `/home-original` - All 8 phases complete
- [🟡] Foundry app migrated to `apps/foundry` - Functional shell, CSS cleanup + QA pending
- [🟡] Studio instances configured (`studio-cms1`, `studio-cms2`) - Awaiting env credentials + validation

### What's Working
- Monorepo structure established
- LLM rules and documentation framework
- Session logging system implemented
- Context management protocol active
- Decision logging in place
- **CSS Design Audit complete** - analyzed 4 projects, 8 CSS files
- **Figma Analysis complete** - extracted and compared design tokens
- **Design System v2.0 COMPLETE** - Typography finalized with correct fonts, div 4/8 sizing, percentage line-heights
- **All typography classes corrected** - Display (Tall Black), Headings (Narrow Medium + Inter Tight), proper sizing
- **packages/content COMPLETE** - All Sanity schemas consolidated with TypeScript
- **packages/ui COMPLETE** - Shared components (atoms, common) consolidated, documented, Tailwind v4 compliant
- **packages/fontviewer COMPLETE** - Font viewer migrated with React components, utilities, styles, opentype.js integration
- **apps/web LIVE** - Routing, Sanity data, PortableText rendering, /fonts route, production build tested, local fonts, scroll-aware navbar with blur, mobile theme toggle
- **apps/web/home-original COMPLETE** - Full home page migration with GSAP animations, 14 new components, all dependencies installed (gsap@3.13.0, @gsap/react@2.1.2, react-icons@5.5.0)
- **Home page assets FOUND** - All 15 assets (9 videos, 5 images, 1 SVG) located in public folder (updated 2025-10-09)
- **Shared font support** - TG Málrómur registered via Tailwind `@font-face` in web + foundry
- **apps/foundry functional** - Sections + fontviewer migrated; TG Málrómur font now sourced from shared package; needs token cleanup + interaction QA before sign-off
- **apps/studio-cms1 and studio-cms2 configured** - Shared schemas wired; awaiting project/dataset env vars for validation
- **Tailwind v4 + theme.css CONNECTED** - All apps using shared design tokens
- **Local fonts optimized** - Inter Tight variable font (100-900) + Right Grotesk fonts, zero CSS warnings

### What's In Progress
- Verify GROQ queries (CASE_STUDY / project detail) against the `projects` dataset now that production env vars are updated
- Remove staging components (MigrationDashboard, placeholder copy) from web routes
- Foundry polish: fix Tailwind token syntax, verify theme toggle + glyph interactions
- Studio QA: provide API tokens and run desk/preview smoke tests for both studios once credentials are available
- **Fix fallbackProjects.js paths** - Update image paths from `/img/` to `/img/Kolk-img/` for Contact section images

### What's Blocked
- Studios require project/dataset credentials to complete QA

## ⚠️ CHECKPOINT PROTOCOL
**CRITICAL**: To prevent context loss and ensure continuity across sessions:

### When to Checkpoint
- Every **10-15 messages** in a conversation
- Before making **major architectural changes**
- When switching between **different tasks/domains**
- When you notice the conversation getting **complex or long**
- **Before ending any session**

### How to Checkpoint
1. Create a timestamped log: `docs/SESSION-LOGS/YYYY-MM-DD-HHMM.md`
2. Use the template in `docs/SESSION-LOGS/TEMPLATE.md`
3. Update this `AGENT-CONTEXT.md` file with current status
4. Document any decisions in `docs/DECISIONS.md`

### Agent Self-Awareness
If you (the LLM) notice:
- Message count approaching 15+
- Complex multi-step work being done
- Multiple files being modified
- Important decisions being made

**STOP and create a checkpoint** before continuing.

## Active Agents & Domains
Track who's working on what to avoid conflicts:

| Domain | Agent/Session | Status | Last Updated |
|--------|---------------|--------|--------------|
| Design System | Claude 4.5 | ✅ Complete | 2024-10-04 |
| Content Schemas | Claude 4.5 | ✅ Complete | 2025-10-04 |
| UI Components | Claude 4.5 | ✅ Complete | 2025-10-04 |
| Font Viewer | Claude 4.5 | ✅ Complete | 2025-10-04 |
| Web App | Claude 4.5 | ✅ Complete | 2025-10-04 |
| Foundry App | Claude 4.5 | ✅ Complete | 2025-10-04 |
| Studio Config | Claude 4.5 | ✅ Complete | 2025-10-04 |
| Home Page Migration | Claude 4.5 | ✅ Complete | 2025-10-07 |

## Quick Reference
- **Rules**: `LLM_RULES.md` → `docs/RULES_STRUCTURE.md`
- **Design Audit**: `docs/DESIGN-AUDIT.md`
- **Design Proposal**: `docs/DESIGN-PROPOSAL.md`
- **Decisions**: `docs/DECISIONS.md`
- **Migration Status**: `docs/MIGRATION-STATUS.md`
- **Session Logs**: `docs/SESSION-LOGS/`
- **Home Migration**: `docs/SESSION-LOGS/2025-10-07-HOME-MIGRATION-PLAN.md` (8 phases + checkpoints)
- **Theme**: `packages/ui/theme.css`

## Next Session Checklist
When starting a new session:
1. ✅ Read `LLM_RULES.md`
2. ✅ Read `docs/RULES_STRUCTURE.md`
3. ✅ Read this file (`AGENT-CONTEXT.md`)
4. ✅ Check latest session log in `docs/SESSION-LOGS/`
5. ✅ Review any open questions in `docs/DECISIONS.md`
6. ✅ Understand your assigned domain
7. ✅ Begin work, checkpointing regularly

## Original Projects Context
The 4 source projects are located in separate folders (not in this monorepo yet).
Content and implementation details need to be migrated here following the established rules.

**Projects audited for design system:**
- `/Users/biskup/git/kolkrabbi` - Original web + fontviewer
- `/Users/biskup/git/kolkrabbi-fontviewer` - Foundry + fontviewer v2
- `/Users/biskup/git/kolkrabbi-foundry` - Foundry standalone
- `/Users/biskup/git/kolkrabbi-staging` - Current production site

---
**Last Agent**: Codex (GPT-5)
**Last Checkpoint**: 2025-10-09-2030 (Post-Migration Recovery & Deploy)
**Current Focus**: ✅ **POST-MIGRATION BUILD RESTORED & LIVE**. Repository reset to commit `post-migration-monorepo` (`71185821`), env templates updated (`to8h15ed/projects`), Vercel SPA rewrite added, and production deployment at `https://repo-mono.vercel.app` now serves Sanity data successfully. Remaining follow-up: migrate domain `kolkrabbi.vercel.app` to same project if desired.
