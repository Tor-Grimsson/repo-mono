# Foundry Atomic Design Refactor

**Date**: 2025-10-14
**Status**: Planning Phase
**Objective**: Refactor Foundry components into proper atomic design hierarchy and integrate into main styleguide

---

## 🎯 Project Goals

1. Extract reusable atoms from existing Foundry sections
2. Create composable molecules from repeated patterns
3. Properly classify organisms
4. Integrate all components into main styleguide (atoms/molecules/organisms pages)
5. Eliminate redundancy and improve maintainability
6. Establish single source of truth for all Foundry components

---

## 🧠 Design Philosophy

**Key Principle**: Foundry components are **not a separate design system**. They use the same:
- Color tokens (`--surface-*`, `--foreground`, `--component-fg`)
- Typography system (Right Grotesk, Inter, TG Málrómur)
- Button styles, borders, surfaces
- Spacing and layout patterns

**Therefore**: Foundry components should be **integrated peers** with other design system components, not isolated in a separate showcase.

**Organization Strategy**: Use collapsible "FOUNDRY" sections within existing atoms/molecules/organisms pages to maintain atomic design hierarchy while providing clear categorization.

---

## 📊 Current State Analysis

### Existing File Structure

**Sections (12 components):**
```
apps/web/src/components/sections/foundry/
├── HeroSection.jsx
├── ImageSection.jsx
├── StylesSection.jsx
├── FontPreviewSection.jsx
├── VariableFontSection.jsx
├── GlyphsSection.jsx
├── FeaturesSection.jsx
├── LicenseSection.jsx
├── DownloadSection.jsx
├── CarouselSection.jsx
├── PairingsSection.jsx
└── FoundryType.jsx
```

**Foundry-Atoms (3 components):**
```
apps/web/src/components/sections/foundry-atoms/
├── FontPreviewItem.jsx
├── GlyphGrid.jsx
└── ImageItem.jsx
```

### Classification Issues

1. **FontPreviewItem** - Currently in "foundry-atoms" but is actually an **organism** (complex, stateful, multi-molecule)
2. **GlyphGrid** - Currently in "foundry-atoms" but is actually a **molecule** (composition of glyph atoms)
3. **ImageItem** - Correctly an **atom** but misplaced location
4. **Missing atoms** - Repeated patterns (cards, badges) not extracted
5. **No molecules** - Control panels and grids not separated from organisms
6. **Sections conflated** - Full page sections mixed with reusable components

---

## 🏗️ Proposed Atomic Hierarchy

### ATOMS (6 components)

**Definition**: Basic building blocks with no decomposable parts. Single responsibility, stateless (or minimal state).

1. **GlyphItem** 🆕
   - **Extracted from**: GlyphGrid.jsx
   - **Purpose**: Single glyph character display
   - **Features**: Bordered box, hover flip theme effect, font display
   - **Props**: `glyph` (string), `className`

2. **FeatureCard** 🆕
   - **Extracted from**: FeaturesSection.jsx
   - **Purpose**: Title + description card
   - **Features**: Bordered card, hover flip theme, padding
   - **Props**: `title`, `description`, `className`

3. **PairingCard** 🆕
   - **Extracted from**: PairingsSection.jsx
   - **Purpose**: Font pairing display
   - **Features**: Shows primary + secondary font + usage context
   - **Props**: `primary`, `secondary`, `usage`, `className`

4. **StyleCard** 🆕
   - **Extracted from**: StylesSection.jsx
   - **Purpose**: Individual font weight display
   - **Features**: Weight name + sample text in that weight
   - **Props**: `weight`, `sampleText`, `className`

5. **FontBadge** 🆕
   - **Extracted from**: Multiple sections (FeaturesSection, VariableFontSection, etc.)
   - **Purpose**: Small label badge for categorization
   - **Features**: Uppercase label, mono font, semantic styling
   - **Props**: `children`, `variant`, `className`

6. **ImageItem** ✅ (move)
   - **Currently**: `foundry-atoms/ImageItem.jsx`
   - **Move to**: `packages/ui/src/atoms/foundry/ImageItem.jsx`
   - **Purpose**: Single image display with optional styling
   - **Props**: `src`, `alt`, `objectFit`, `className`

---

### MOLECULES (6 components)

**Definition**: Simple compositions of 2-3 atoms with a single purpose. Reusable patterns.

1. **GlyphGrid** ✅ (move + refactor)
   - **Currently**: `foundry-atoms/GlyphGrid.jsx`
   - **Move to**: `packages/ui/src/molecules/foundry/GlyphGrid.jsx`
   - **Purpose**: Grid layout of glyph items
   - **Composition**: Multiple `GlyphItem` atoms
   - **Props**: `glyphs` (array), `glyphsGridRef`, `className`

2. **FeatureGrid** 🆕
   - **Extracted from**: FeaturesSection.jsx
   - **Purpose**: 2-column responsive grid of features
   - **Composition**: Multiple `FeatureCard` atoms
   - **Props**: `features` (array of {title, description}), `className`

3. **PairingsList** 🆕
   - **Extracted from**: PairingsSection.jsx
   - **Purpose**: Vertical list of font pairings
   - **Composition**: Multiple `PairingCard` atoms
   - **Props**: `pairings` (array), `className`

4. **StylesGrid** 🆕
   - **Extracted from**: StylesSection.jsx
   - **Purpose**: Grid of font weight examples
   - **Composition**: Multiple `StyleCard` atoms
   - **Props**: `weights` (array), `sampleText`, `className`

5. **FoundryCard** 🆕
   - **Extracted from**: Common pattern across all sections
   - **Purpose**: Base card container with variants
   - **Features**: Opacity control, padding variants, inverted styling
   - **Props**: `variant` (default|padded|inverted), `opacity`, `children`, `className`
   - **CSS Variables**: `--card-opacity` for background transparency

6. **FontControlsPanel** 🆕
   - **Extracted from**: FontPreviewItem.jsx
   - **Purpose**: Grouped font controls (style, weight, size, leading, spacing)
   - **Composition**: 2 Dropdowns + 3 Sliders
   - **Props**: `styleOptions`, `weightOptions`, `onStyleChange`, `onWeightChange`, `size`, `onSizeChange`, `leading`, `onLeadingChange`, `spacing`, `onSpacingChange`

---

### ORGANISMS (12 components)

**Definition**: Complex sections combining multiple molecules and atoms. Often stateful, domain-specific functionality.

1. **FontPreviewItem** ✅ (refactor)
   - **Currently**: `foundry-atoms/FontPreviewItem.jsx` (MISCLASSIFIED)
   - **Move to**: `packages/ui/src/organisms/foundry/FontPreviewItem.jsx`
   - **Purpose**: Interactive font preview with controls
   - **Composition**: FontControlsPanel molecule + text display + auto-sizing logic
   - **State**: weight, style, size, leading, spacing, visible text
   - **Refactor**: Extract FontControlsPanel to separate molecule

2. **HeroSection** ✅ (keep)
   - **Location**: `sections/foundry/HeroSection.jsx`
   - **Purpose**: Page hero with tag, title, message, subtext
   - **Classification**: Organism (complete page section)

3. **StylesSection** ✅ (refactor)
   - **Location**: `sections/foundry/StylesSection.jsx`
   - **Purpose**: Display all font weight styles
   - **Refactor**: Use `StylesGrid` molecule instead of inline implementation
   - **Composition**: Section wrapper + FontBadge + StylesGrid

4. **FontPreviewSection** ✅ (keep)
   - **Location**: `sections/foundry/FontPreviewSection.jsx`
   - **Purpose**: Grid of multiple FontPreviewItem organisms
   - **Classification**: Organism (complex layout orchestration)

5. **VariableFontSection** ✅ (keep)
   - **Location**: `sections/foundry/VariableFontSection.jsx`
   - **Purpose**: Interactive variable font controls with live preview
   - **Classification**: Organism (complex state management)

6. **GlyphsSection** ✅ (refactor)
   - **Location**: `sections/foundry/GlyphsSection.jsx`
   - **Purpose**: Display glyph set with controls
   - **Refactor**: Use `GlyphGrid` molecule
   - **Composition**: Section wrapper + controls + GlyphGrid

7. **FeaturesSection** ✅ (refactor)
   - **Location**: `sections/foundry/FeaturesSection.jsx`
   - **Purpose**: Display OpenType features
   - **Refactor**: Use `FeatureGrid` molecule
   - **Composition**: FoundryCard wrapper + FontBadge + FeatureGrid
   - **Decision**: Keep as organism (complete page section with semantic meaning)

8. **PairingsSection** ✅ (refactor)
   - **Location**: `sections/foundry/PairingsSection.jsx`
   - **Purpose**: Display font pairing recommendations
   - **Refactor**: Use `PairingsList` molecule
   - **Composition**: FoundryCard wrapper + heading + PairingsList
   - **Decision**: Keep as organism (complete page section)

9. **LicenseSection** ✅ (keep)
   - **Location**: `sections/foundry/LicenseSection.jsx`
   - **Purpose**: License information display
   - **Classification**: Organism (complete content section)

10. **DownloadSection** ✅ (keep)
    - **Location**: `sections/foundry/DownloadSection.jsx`
    - **Purpose**: Download CTA with button and info
    - **Classification**: Organism (complete CTA section)

11. **CarouselSection** ✅ (keep)
    - **Location**: `sections/foundry/CarouselSection.jsx`
    - **Purpose**: Font examples carousel
    - **Classification**: Organism (interactive section)

12. **ImageSection** ✅ (keep)
    - **Location**: `sections/foundry/ImageSection.jsx`
    - **Purpose**: Full-width image or multi-image grid
    - **Classification**: Organism (layout orchestration)

---

## 📁 New File Structure

### Packages Structure

```
packages/ui/src/
├── atoms/
│   ├── foundry/
│   │   ├── GlyphItem.jsx           🆕
│   │   ├── FeatureCard.jsx         🆕
│   │   ├── PairingCard.jsx         🆕
│   │   ├── StyleCard.jsx           🆕
│   │   ├── FontBadge.jsx           🆕
│   │   ├── ImageItem.jsx           ✅ (moved)
│   │   └── index.js                🆕
│   └── index.js                    (export foundry atoms)
│
├── molecules/
│   ├── foundry/
│   │   ├── GlyphGrid.jsx           ✅ (moved + refactored)
│   │   ├── FeatureGrid.jsx         🆕
│   │   ├── PairingsList.jsx        🆕
│   │   ├── StylesGrid.jsx          🆕
│   │   ├── FoundryCard.jsx         🆕
│   │   ├── FontControlsPanel.jsx   🆕
│   │   └── index.js                🆕
│   └── index.js                    (export foundry molecules)
│
└── organisms/
    ├── foundry/
    │   ├── FontPreviewItem.jsx     ✅ (moved + refactored)
    │   └── index.js                🆕
    └── index.js                    (export foundry organisms)
```

### Apps Structure (Updated)

```
apps/web/src/components/sections/foundry/
├── HeroSection.jsx                 ✅ (uses foundry atoms/molecules)
├── StylesSection.jsx               ✅ (refactored to use StylesGrid)
├── FontPreviewSection.jsx          ✅ (uses FontPreviewItem from @kol/ui)
├── VariableFontSection.jsx         ✅ (keep as-is)
├── GlyphsSection.jsx               ✅ (refactored to use GlyphGrid)
├── FeaturesSection.jsx             ✅ (refactored to use FeatureGrid)
├── PairingsSection.jsx             ✅ (refactored to use PairingsList)
├── LicenseSection.jsx              ✅ (keep as-is)
├── DownloadSection.jsx             ✅ (keep as-is)
├── CarouselSection.jsx             ✅ (keep as-is)
└── ImageSection.jsx                ✅ (keep as-is)

apps/web/src/components/sections/foundry-atoms/
🗑️ DELETE THIS FOLDER (components moved to @kol/ui)
```

---

## 🎨 Styleguide Integration

### Components: Atoms Page

**Add new section** (after "Controls", before "Other"):

```jsx
{
  id: 'foundry',
  label: 'Foundry',
  atomIds: [],
  customPreview: true
}
```

**Preview Component**: `FoundryAtomsPreview.jsx`

**Shows**:
- GlyphItem (multiple examples, hover demo on both surfaces)
- FeatureCard (hover demo on both surfaces)
- PairingCard (example on both surfaces)
- StyleCard (multiple weights: Thin, Regular, Bold, Black)
- FontBadge (variants: "Variable Font", "OpenType Features", "TG Málrómur")
- ImageItem (single image display)

---

### Components: Molecules Page

**Add new section** (after "Work Controls Panel", before "Other"):

```jsx
{
  id: 'foundry',
  label: 'Foundry',
  moleculeIds: [],
  customPreview: true
}
```

**Preview Component**: `FoundryMoleculesPreview.jsx`

**Shows**:
- GlyphGrid (20+ glyphs in flex wrap grid)
- FeatureGrid (4 features in 2x2 responsive grid)
- PairingsList (4 font pairings in vertical stack)
- StylesGrid (9 weight examples from Thin to Black)
- FoundryCard (3 variants: default, padded, inverted with opacity slider)
- FontControlsPanel (interactive controls: 2 dropdowns + 3 sliders)

---

### Components: Organisms Page

**Add new section**:

```jsx
{
  id: 'foundry',
  label: 'Foundry',
  organismIds: [],
  customPreview: true
}
```

**Preview Component**: `FoundryOrganismsPreview.jsx`

**Shows**:
- FontPreviewItem (full interactive preview with all controls)
- StylesSection (complete section demo with all 9 weights)
- FeaturesSection (complete section with 4 OpenType features)
- PairingsSection (complete section with 4 pairings)
- VariableFontSection (interactive variable font weight slider)
- GlyphsSection (glyph grid with button to expand)

**Note**: HeroSection, LicenseSection, DownloadSection, CarouselSection, ImageSection are **page-specific** organisms and don't need styleguide previews (they're full layout sections, not reusable components).

---

## 🔄 Migration Strategy

### Phase 1: Extract Atoms ✅
**Duration**: 2-3 hours
**Risk**: Low (creating new files, no refactoring yet)

1. Create `packages/ui/src/atoms/foundry/` folder
2. Create 5 new atom components:
   - GlyphItem.jsx (extract from GlyphGrid line 8-14)
   - FeatureCard.jsx (extract from FeaturesSection line 33-44)
   - PairingCard.jsx (extract from PairingsSection line 20-37)
   - StyleCard.jsx (extract from StylesSection - TBD after reading full file)
   - FontBadge.jsx (extract pattern from FeaturesSection line 28-30)
3. Move ImageItem.jsx from foundry-atoms to atoms/foundry
4. Create atoms/foundry/index.js with all exports
5. Update packages/ui/src/atoms/index.js to export foundry atoms
6. Test: Import atoms in a test file, verify they render

---

### Phase 2: Create Molecules ✅
**Duration**: 3-4 hours
**Risk**: Medium (refactoring existing components)

1. Create `packages/ui/src/molecules/foundry/` folder
2. Move GlyphGrid.jsx from foundry-atoms to molecules/foundry
3. Refactor GlyphGrid to use GlyphItem atom
4. Create 4 new molecule components:
   - FeatureGrid.jsx (refactor from FeaturesSection)
   - PairingsList.jsx (refactor from PairingsSection)
   - StylesGrid.jsx (refactor from StylesSection)
   - FoundryCard.jsx (base card component with variants)
5. Extract FontControlsPanel from FontPreviewItem (lines TBD)
6. Create molecules/foundry/index.js with all exports
7. Update packages/ui/src/molecules/index.js to export foundry molecules
8. Test: Import molecules in isolation, verify composition works

---

### Phase 3: Refactor Organisms ✅
**Duration**: 2-3 hours
**Risk**: Medium (updating existing sections)

1. Create `packages/ui/src/organisms/foundry/` folder
2. Move FontPreviewItem from foundry-atoms to organisms/foundry
3. Refactor FontPreviewItem to use FontControlsPanel molecule
4. Update section files to use new molecules:
   - FeaturesSection → import & use FeatureGrid
   - PairingsSection → import & use PairingsList
   - StylesSection → import & use StylesGrid
   - GlyphsSection → import & use GlyphGrid from @kol/ui
5. Create organisms/foundry/index.js with exports
6. Update packages/ui/src/index.js to export foundry organisms
7. Test: Load Foundry page, verify all sections render correctly

---

### Phase 4: Cleanup ✅
**Duration**: 1 hour
**Risk**: Low (removing old files)

1. Delete `apps/web/src/components/sections/foundry-atoms/` folder
2. Update all imports in Foundry.jsx to use @kol/ui imports
3. Search codebase for any remaining old imports
4. Remove unused files
5. Test: Full Foundry page smoke test

---

### Phase 5: Styleguide Documentation ✅
**Duration**: 4-5 hours
**Risk**: Low (creating new preview components)

1. Create `apps/web/src/components/styleguide/foundry/` folder
2. Create FoundryAtomsPreview.jsx:
   - Show all 6 atoms
   - Default + Inverse surface examples
   - Interactive hover demos
3. Create FoundryMoleculesPreview.jsx:
   - Show all 6 molecules
   - Interactive examples (FontControlsPanel with state)
   - Variant demonstrations (FoundryCard)
4. Create FoundryOrganismsPreview.jsx:
   - Show 6 key organisms
   - Full interactive demos
   - Proper data examples
5. Update ComponentsAtoms.jsx:
   - Add Foundry section
   - Import FoundryAtomsPreview
   - Add conditional render
6. Update ComponentsMolecules.jsx:
   - Add Foundry section
   - Import FoundryMoleculesPreview
   - Add conditional render
7. Update ComponentsOrganisms.jsx:
   - Add Foundry section
   - Import FoundryOrganismsPreview
   - Add conditional render
8. Test: Navigate styleguide, verify all previews render and interact correctly

---

## ✅ Acceptance Criteria

### Atoms
- [ ] All 6 foundry atoms created in `packages/ui/src/atoms/foundry/`
- [ ] Each atom is stateless and single-purpose
- [ ] Atoms use design system tokens (no hardcoded colors)
- [ ] Atoms are exported from `@kol/ui`
- [ ] Atoms render on both default and inverse surfaces
- [ ] Styleguide atoms page shows all foundry atoms with examples

### Molecules
- [ ] All 6 foundry molecules created in `packages/ui/src/molecules/foundry/`
- [ ] Molecules compose atoms correctly
- [ ] GlyphGrid uses GlyphItem atoms
- [ ] FeatureGrid uses FeatureCard atoms
- [ ] PairingsList uses PairingCard atoms
- [ ] StylesGrid uses StyleCard atoms
- [ ] FontControlsPanel uses Dropdown and Slider atoms
- [ ] FoundryCard provides base card functionality with variants
- [ ] Molecules are exported from `@kol/ui`
- [ ] Styleguide molecules page shows all foundry molecules with examples

### Organisms
- [ ] FontPreviewItem moved to `packages/ui/src/organisms/foundry/`
- [ ] FontPreviewItem refactored to use FontControlsPanel molecule
- [ ] All section files refactored to use new molecules
- [ ] No hardcoded inline implementations of grids/lists
- [ ] Organisms are exported from `@kol/ui`
- [ ] Styleguide organisms page shows foundry organisms with examples

### Integration
- [ ] Foundry page works without errors
- [ ] All visual design preserved (no regressions)
- [ ] All interactions work (sliders, dropdowns, hover effects)
- [ ] `foundry-atoms/` folder deleted
- [ ] No console errors or warnings
- [ ] Build completes successfully

### Documentation
- [ ] Styleguide atoms page has "Foundry" section
- [ ] Styleguide molecules page has "Foundry" section
- [ ] Styleguide organisms page has "Foundry" section
- [ ] All preview components show proper examples
- [ ] Code snippets included for key components
- [ ] Interactive demos work (hover, state changes)

---

## 🚀 Implementation Timeline

**Total Estimated Time**: 12-15 hours

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Extract Atoms | 2-3 hours | None |
| Phase 2: Create Molecules | 3-4 hours | Phase 1 complete |
| Phase 3: Refactor Organisms | 2-3 hours | Phase 2 complete |
| Phase 4: Cleanup | 1 hour | Phase 3 complete |
| Phase 5: Styleguide Documentation | 4-5 hours | Phase 4 complete |

**Recommended Approach**: Complete one phase fully (including testing) before moving to the next.

---

## 📝 Technical Decisions

### Component Export Pattern
```js
// atoms/foundry/index.js
export { default as GlyphItem } from './GlyphItem'
export { default as FeatureCard } from './FeatureCard'
// ... etc

// atoms/index.js
export * from './foundry/index.js'
```

### Import Pattern
```js
// Before (old)
import GlyphGrid from '../../sections/foundry-atoms/GlyphGrid'
import FontPreviewItem from '../../sections/foundry-atoms/FontPreviewItem'

// After (new)
import { GlyphGrid, FontControlsPanel } from '@kol/ui'
import { FontPreviewItem } from '@kol/ui'
```

### CSS Strategy
- Use Tailwind classes for layout and spacing
- Use CSS variables for theming (`--component-fg`, `--surface-border`)
- Use inline styles for dynamic values (opacity, font-weight)
- Maintain existing `.foundryCard` classes during transition
- Eventually migrate to FoundryCard component variants

### State Management
- Atoms: Stateless (presentational only)
- Molecules: Minimal state (UI state like hover, focus)
- Organisms: Complex state (form values, interactive controls)

### Prop Naming Conventions
- Use semantic names: `title`, `description`, `primary`, `secondary`
- Use `className` for style extension
- Use `variant` for component variants
- Use `on[Action]` for callbacks: `onChange`, `onClick`

---

## 🐛 Potential Issues & Solutions

### Issue 1: Import Path Breakage
**Problem**: Changing import paths could break Foundry page
**Solution**: Complete refactor in phases, test after each phase
**Mitigation**: Keep old files until new files verified working

### Issue 2: CSS Class Conflicts
**Problem**: `.foundryCard` classes might conflict with new FoundryCard component
**Solution**: Use component-specific classes, gradually migrate
**Mitigation**: Test visual parity before removing old classes

### Issue 3: State Lifting Complexity
**Problem**: FontControlsPanel extraction might complicate state management
**Solution**: Use controlled component pattern, pass state down as props
**Mitigation**: Keep FontPreviewItem as smart component, panel as dumb component

### Issue 4: Styleguide Performance
**Problem**: Many interactive organisms could slow down styleguide
**Solution**: Use lazy loading for organism previews
**Mitigation**: Collapse sections by default, expand on demand

---

## 📚 Reference Documentation

### Key Files to Read Before Starting
1. `apps/web/src/routes/Foundry.jsx` - Page structure
2. `apps/web/src/components/sections/foundry/FeaturesSection.jsx` - Pattern to extract
3. `apps/web/src/components/sections/foundry-atoms/FontPreviewItem.jsx` - Complex organism to refactor
4. `apps/web/src/components/sections/foundry-atoms/GlyphGrid.jsx` - Simple molecule to move
5. `packages/ui/src/atoms/Button.jsx` - Example atom pattern
6. `packages/ui/src/molecules/ControlPanel.jsx` - Example molecule pattern

### Related Documentation
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/) - Brad Frost
- [Component Hierarchy Best Practices](https://react.dev/learn/thinking-in-react) - React Docs
- Design System Architecture - Internal patterns already established

---

## 🎯 Success Metrics

1. **Code Reusability**: FeatureCard atom used in 2+ places
2. **Maintainability**: Change glyph border style in 1 file (GlyphItem), updates everywhere
3. **Documentation**: New developer can find and use foundry components via styleguide
4. **Consistency**: All foundry cards use FoundryCard component base
5. **Performance**: No regression in build time or bundle size
6. **Quality**: Zero console errors, all interactions work
7. **DX**: Clean imports: `import { FeatureCard } from '@kol/ui'`

---

## 🔍 Post-Refactor Validation

### Visual QA Checklist
- [ ] Foundry page loads without errors
- [ ] All font previews render correctly
- [ ] All interactive controls work (sliders, dropdowns)
- [ ] Hover effects work on all cards
- [ ] Light/dark theme toggle works
- [ ] Responsive breakpoints work (mobile, tablet, desktop)
- [ ] All images load
- [ ] Typography renders with correct fonts

### Code QA Checklist
- [ ] No TypeScript errors (if using TS)
- [ ] No ESLint warnings
- [ ] All imports resolve correctly
- [ ] No circular dependencies
- [ ] No unused files in codebase
- [ ] Build completes without warnings
- [ ] Bundle size unchanged or reduced

### Accessibility Checklist
- [ ] All interactive elements keyboard accessible
- [ ] Proper ARIA labels on controls
- [ ] Color contrast ratios maintained
- [ ] Focus indicators visible
- [ ] Screen reader friendly

---

## 📞 Questions & Decisions Log

### Decision 1: FeaturesSection & PairingsSection Classification
**Question**: Should these be molecules or organisms?
**Decision**: Keep as organisms
**Reasoning**: They are complete page sections with semantic meaning, not just reusable UI patterns
**Date**: 2025-10-14

### Decision 2: Separate Foundry Page vs Integrated Sections
**Question**: Should foundry have its own styleguide page or integrate into existing pages?
**Decision**: Integrate into existing atoms/molecules/organisms pages
**Reasoning**: Foundry is not a separate design system, components should be peers with other system components. Avoids redundancy and maintains atomic design purity.
**Date**: 2025-10-14

### Decision 3: FoundryCard Component Approach
**Question**: Should FoundryCard be a wrapper component or CSS classes?
**Decision**: Component with variant props
**Reasoning**: Provides better API, easier to maintain, clear variants
**Date**: 2025-10-14

### Decision 4: FontControlsPanel Extraction
**Question**: Should controls stay in FontPreviewItem or be extracted?
**Decision**: Extract to separate molecule
**Reasoning**: Reusable in VariableFontSection, better separation of concerns
**Date**: 2025-10-14

---

## 📅 Checkpoint Schedule

- **After Phase 1**: Review atom quality, ensure proper use of design tokens
- **After Phase 2**: Review molecule composition, verify atoms are used correctly
- **After Phase 3**: Visual QA on Foundry page, verify no regressions
- **After Phase 4**: Code cleanup verification, no orphaned files
- **After Phase 5**: Full styleguide review, documentation completeness

---

**Last Updated**: 2025-10-14
**Next Review**: After Phase 1 completion
**Document Owner**: Claude + User
**Status**: Ready to begin Phase 1
