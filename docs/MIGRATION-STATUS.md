# Migration Status - kolkrabbi.io Monorepo

> Tracks the progress of consolidating 4 separate projects into unified monorepo.

## Source Projects
1. **Original Web** - Public kolkrabbi.io site
2. **Foundry App** - Font testing/preview tool
3. **Font Viewer** - Font inspection tool
4. **Sanity Studios** - Multiple CMS instances

## Overall Progress

### Phase 1: Foundation ✅
- [x] Monorepo structure created
- [x] Documentation framework established
- [x] LLM rules defined
- [x] Context management system implemented

### Phase 2: Package Consolidation ✅
- [x] `packages/content` - Sanity schemas unified
- [x] `packages/ui` - Shared components consolidated
- [x] `packages/fontviewer` - Font viewer migrated

### Phase 3: App Migration ✅
- [🟢] `apps/web` - Public site migrated (live Sanity data, detail routes rendering)
- [🟡] `apps/foundry` - Standalone shell migrated with fontviewer integration; polish + QA pending
- [🟡] `apps/studio-cms1` - Studio configured with shared schemas; requires env + dataset validation
- [🟡] `apps/studio-cms2` - Studio configured for projects dataset; needs credentials + QA sweep

### Phase 4: Integration & Testing 📋
- [x] Cross-package dependencies verified (web + foundry consume @kol/ui, @kol/content, @kol/fontviewer)
- [x] Shared design tokens working (Tailwind v4 tokens applied across apps)
- [ ] GROQ queries tested end-to-end (schema + queries now align on the `project` type)
- [🟡] Build pipeline validated (web passes `vite build`; need foundry/studios builds + Turbo cache check)
- [ ] Development workflow documented (requires updated run/test guidance post-migration)

## Detailed Status by Package/App

### packages/content
**Status**: ✅ Complete  
**Priority**: High (foundation for everything)  
**Assigned**: Claude 4.5  
**Blockers**: None

**Tasks**:
- [x] Audit schemas from all source projects
- [x] Consolidate into unified schema set
- [x] Document schema relationships
- [x] Create GROQ query library (CASE_STUDY_LIST, CASE_STUDY_DETAIL, FONT_FAMILIES)
- [x] Add TypeScript types

**Outstanding**:
- None — schema + queries aligned on the `project` document type

**Schemas**:
- `author`, `post` (production dataset)
- `project` (projects dataset)

### packages/ui
**Status**: ✅ Complete  
**Priority**: High  
**Assigned**: Claude 4.5  
**Blockers**: None

**Tasks**:
- [x] Audit components from source projects
- [x] Consolidate shared components
- [x] Ensure Tailwind v4 compliance
- [x] Document component API
- [x] theme.css with tokens (already existed)

**Components Created**:
- Atoms: Button, Tag, Container, SectionTitle
- Common: SanityImage
- Specimen: SpecimenEmbed (existing)
- Layout: Excluded (app-specific)

### packages/fontviewer
**Status**: ✅ Complete
**Priority**: Medium
**Assigned**: Claude 4.5 Sonnet
**Blockers**: None

**Tasks**:
- [x] Migrate font viewer code from kolkrabbi-fontviewer
- [x] Define public API (exports FontViewerComponent, FontViewerSection, utilities)
- [x] Add dependencies (opentype.js)
- [x] Document usage in README.md
- [ ] Test integration with apps/web
- [ ] Test integration with apps/foundry

**Components Migrated**:
- FontViewerComponent.jsx - Main viewer component
- FontViewerSection.jsx - Section wrapper
- Utilities: FontLoader, GlyphAnimator, MetricsOverlay, UIControls, VariationAxes, FontInfo
- Styles: styles.css (standalone, no Tailwind)
- Assets: Sample variable font

### apps/web
**Status**: 🟢 Live Data Connected
**Priority**: High
**Assigned**: Claude 4.5 Sonnet
**Blockers**: None

**Progress Snapshot**:
- ✅ Yarn workspaces installed, shared packages consumable in Vite app
- ✅ Router scaffold in place with SiteLayout + sticky Navbar + Footer
- ✅ Home hero, about, story, and contact sections ported using @kol/ui primitives
- ✅ `/work` index route live with Sanity production data (8 projects)
- ✅ `/work/:slug` detail pages rendering with PortableText + galleries
- ✅ Service filters + related project rail migrated into work overview
- ✅ Cursor overlay scaffolded with shared context provider
- ✅ Shared GROQ queries exposed via @kol/content/frontend
- ✅ Sanity data helpers + fallback projects established
- ✅ GROQ queries fixed and optimized with image metadata
- ✅ Production build tested and working (353KB main bundle)

**Tasks**:
- [x] Migrate routing structure
- [x] Migrate page components
- [x] Connect to Sanity live data
- [x] Implement design tokens
- [x] Test all routes
- [ ] Add SEO metadata + page titles
- [ ] Optimize image loading (lazy load, blur placeholders)
- [ ] Replace staging modules (MigrationDashboard, placeholder copy)
- [ ] Performance audit + animation polish

### apps/foundry
**Status**: 🟡 Functional shell running  
**Priority**: Medium  
**Assigned**: Claude 4.5 Sonnet  
**Blockers**: Cleanup + QA

**Progress**:
- ✅ Foundry landing + sections migrated from legacy project
- ✅ `@kol/fontviewer` wired into VariableFontSection with local TG Málrómur asset
- ✅ Local font stack + Tailwind tokens connected

**Tasks**:
- [x] Migrate foundry app code
- [x] Integrate packages/fontviewer
- [ ] Resolve CSS token issues (missing semicolons, hover overrides)
- [ ] Smoke-test critical interactions (theme toggle, glyph sets)
- [ ] Ensure TG Málrómur font files documented for deployment packaging

### apps/studio-cms1 & apps/studio-cms2
**Status**: 🟡 Configured, awaiting credentials  
**Priority**: High  
**Assigned**: Claude 4.5 Sonnet  
**Blockers**: Needs project/dataset env vars + sanity auth

**Progress**:
- ✅ Shared schemas imported from `@kol/content`
- ✅ Dual studio configs scaffolded (`production` vs `projects` intent)
- ✅ TypeScript + Vision tool wired in

**Tasks**:
- [x] Configure schema imports
- [x] Set `SANITY_STUDIO_PROJECT_ID` / `DATASET` per studio (`studio-cms1` → `71etqgt2/production`, `studio-cms2` → `to8h15ed/projects`)
- [ ] Provide editor auth + desk structure QA
- [ ] Document dataset split + deployment commands

## Known Issues & Questions
- **GROQ validation**: Run CASE_STUDY queries end-to-end after schema alignment to confirm zero regressions.
- **Staging UI cleanup**: MigrationDashboard + placeholder content remain on live routes.
- **Foundry CSS polish**: Missing semicolons in theme block break strict parsing.

## Next Milestones
1. Run GROQ CASE_STUDY queries end-to-end with the updated `project` schema.
2. QA studios with environment credentials; document login + deployment workflow.
3. Remove staging dashboards/placeholders and finalize marketing copy.

---
**Last Updated**: 2025-10-04 11:45
**Updated By**: Codex GPT-5 (restored Tailwind font registration)
