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
**Phase**: Phase 5 - Component Architecture & Optimization
**Last Updated**: 2025-10-11 10:15

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
- **Component structure refactored** - Moved from flat `common/` to semantic folders: `ui/`, `animation/`, `media/`, `loaders/`
- **Light/dark theming normalized** - Shared tokens + theme helpers now drive both modes; Foundry cards use opacity vars (2025-10-10).
- **CSS layers structured** - Tokens in `packages/ui/theme.css`; shared recipes/utilities extracted to `packages/ui/css`; app utilities stay local (2025-10-10).
- **Component primitives unified** - SectionLabel/SectionHeader moved to `@kol/ui`; styleguide renders default + inverse variants (2025-10-11).
- **Blog Sources & References** - Sources section implemented with numbered citations, GROQ queries updated, SourcesList component created, full styling with light/dark mode support (2025-10-11).
- **Blog prose lists fixed** - Bullets and numbers now visible; unified vertical spacing (1.5em between blocks, 0.25em within lists) across all prose elements (2025-10-11).

### What's In Progress
- Verify GROQ queries (CASE_STUDY / project detail) against the `projects` dataset now that production env vars are updated
- Remove staging components (MigrationDashboard, placeholder copy) from web routes
- Foundry theming QA: run light/dark smoke tests on Foundry + home routes after token overhaul
- Studio QA: provide API tokens and run desk/preview smoke tests for both studios once credentials are available
- **Fix fallbackProjects.js paths** - Update image paths from `/img/` to `/img/Kolk-img/` for Contact section images
- **Styleguide debug nodes added** - Foundry preview card showcases combined controls for LD-mode regression testing (2025-10-11)

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
**Last Agent**: Claude Sonnet 4.5
**Last Checkpoint**: 2025-10-11 10:15 - Blog Sources & References implemented, list styling fixed, vertical spacing unified
**Current Focus**: ✅ **BLOG FEATURES COMPLETE**. Sources & References section fully implemented with numbered citations, SourcesList component, GROQ query updates. List bullets/numbers restored. Unified vertical rhythm (1.5em blocks, 0.25em list items) across all prose.
