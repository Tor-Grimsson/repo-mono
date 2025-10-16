# Components Page Migration Plan

**Date**: 2025-10-14
**Status**: In Progress
**Goal**: Reorganize `/styleguide/components` into atomic design hierarchy (Atoms, Molecules, Organisms)

---

## Current State
- Single `/styleguide/components` route showing all components in one page
- `ComponentPreview.jsx` molecule handles all preview rendering
- `tokens.js` contains all component definitions mixed together

## Target State
- Three separate routes with shared preview system:
  - `/styleguide/components/atoms`
  - `/styleguide/components/molecules`
  - `/styleguide/components/organisms`
- Sidebar shows nested navigation under "Components"
- Each page shows only relevant components for that hierarchy level

---

## UI Component Hierarchy

```
UI Component Hierarchy
│
├── 1. ATOMS (Primitives - Basic building blocks)
│   ├── Button (primary, secondary, variants)
│   ├── Tag (label badges)
│   ├── Pill (rounded label containers)
│   ├── Slider (input range control)
│   ├── Input (text fields)
│   └── Icon (visual symbols)
│
├── 2. MOLECULES (Simple compositions - 2-3 atoms)
│   ├── Slider Control (label + slider + value display)
│   ├── Button Group (multiple buttons together)
│   ├── Tag List (multiple tags)
│   └── Labeled Input (label + input field)
│
├── 3. ORGANISMS (Complex components - Multiple molecules/atoms)
│   ├── HeroSection (Tag + Title + Message + Button Group)
│   ├── Work Controls Panel (7 Slider Controls + 2 Custom Controls + Button Group)
│   └── Navbar (Logo + Navigation Links + Theme Toggle)
```

**Key Principles:**
- **Atoms** = Cannot be broken down further (Button, Tag, Slider)
- **Molecules** = Combine 2-3 atoms with a single purpose (Slider + Label + Value)
- **Organisms** = Complex standalone sections (HeroSection with multiple molecules)

---

## Migration Steps

### 1. **Data Organization** (tokens.js)
**File**: `apps/web/src/data/styleguide/tokens.js`

Reorganize component definitions by hierarchy:

```javascript
export const componentAtoms = [
  { id: 'buttons', label: 'Buttons', description: 'Primary, secondary, and variant button styles', ... },
  { id: 'tags', label: 'Tags', description: 'Label badges for categorization', ... },
  { id: 'pills', label: 'Pills', description: 'Rounded label containers', ... },
  { id: 'inputs', label: 'Inputs', description: 'Text input fields', ... },
]

export const componentMolecules = [
  { id: 'slider-control', label: 'Slider Control', description: 'Label + slider + value display', ... },
  { id: 'button-group', label: 'Button Group', description: 'Multiple buttons grouped together', ... },
]

export const componentOrganisms = [
  { id: 'work-controls', label: 'Work Controls Panel', description: 'Collapsible controls panel pattern', ... },
  { id: 'hero-section', label: 'Hero Section', description: 'Full hero section with tag, title, message, buttons', ... },
]
```

### 2. **Create New Route Files**

**Files to create:**
- `apps/web/src/routes/styleguide/ComponentsAtoms.jsx`
- `apps/web/src/routes/styleguide/ComponentsMolecules.jsx`
- `apps/web/src/routes/styleguide/ComponentsOrganisms.jsx`

**Template structure (similar pattern for each):**
```jsx
import StyleguideLayout from '../../components/styleguide/layout/StyleguideLayout'
import ComponentPreview from '../../components/styleguide/molecules/ComponentPreview'
import { componentAtoms } from '../../data/styleguide/tokens'

export default function ComponentsAtoms() {
  return (
    <StyleguideLayout title="Components: Atoms">
      <div className="space-y-12">
        {componentAtoms.map(component => (
          <ComponentPreview key={component.id} component={component} />
        ))}
      </div>
    </StyleguideLayout>
  )
}
```

### 3. **Update Routing** (App.jsx)
**File**: `apps/web/src/App.jsx`

Add new routes and redirect old `/components` route:

```jsx
// Replace existing Components route with:
<Route path="/styleguide/components/atoms" element={<ComponentsAtoms />} />
<Route path="/styleguide/components/molecules" element={<ComponentsMolecules />} />
<Route path="/styleguide/components/organisms" element={<ComponentsOrganisms />} />
<Route path="/styleguide/components" element={<Navigate to="/styleguide/components/atoms" replace />} />
```

### 4. **Update Navigation** (navigation.js)
**File**: `apps/web/src/data/styleguide/navigation.js`

Change sidebar structure to support nested routes:

```javascript
{
  label: 'Components',
  path: '/styleguide/components',
  children: [
    { label: 'Atoms', path: '/styleguide/components/atoms' },
    { label: 'Molecules', path: '/styleguide/components/molecules' },
    { label: 'Organisms', path: '/styleguide/components/organisms' },
  ]
}
```

### 5. **Update StyleguideLayout** (if needed)
**File**: `apps/web/src/components/styleguide/layout/StyleguideLayout.jsx`

Ensure sidebar handles nested navigation with children:
- Show parent as expandable/collapsible
- Highlight active child route
- Support nested route matching

### 6. **Deprecate Old Components.jsx**
- Keep temporarily for reference
- Remove after confirming new routes work

---

## Component Classification

### Atoms (Basic building blocks)
- **buttons** - Primary, secondary, and variant button styles
- **tags** - Label badges for categorization
- **pills** - Rounded label containers (if different from tags)
- **inputs** - Text input fields
- **sliders** - Base slider element

### Molecules (Simple compositions)
- **slider-control** - Label + slider + value display
- **button-group** - Multiple buttons grouped together
- **labeled-input** - Label + input field
- **tag-list** - Multiple tags in a list

### Organisms (Complex components)
- **work-controls** - Full panel with all controls (7 sliders + 2 custom + button group)
- **hero-section** - Complete hero section (Tag + Title + Message + Button Group) [future]
- **navbar** - Navigation bar with logo, links, theme toggle [future]
- **footer** - Footer with links and info [future]

---

## Files to Modify

1. **`apps/web/src/data/styleguide/tokens.js`** - Split component arrays into atoms/molecules/organisms
2. **`apps/web/src/data/styleguide/navigation.js`** - Add nested structure with children
3. **`apps/web/src/App.jsx`** - Update routes with new paths and redirect
4. **`apps/web/src/routes/styleguide/ComponentsAtoms.jsx`** - **NEW** route file
5. **`apps/web/src/routes/styleguide/ComponentsMolecules.jsx`** - **NEW** route file
6. **`apps/web/src/routes/styleguide/ComponentsOrganisms.jsx`** - **NEW** route file
7. **`apps/web/src/components/styleguide/layout/StyleguideLayout.jsx`** - Verify/add nested nav support
8. **`apps/web/src/routes/styleguide/Components.jsx`** - Deprecate (keep for reference)

---

## Testing Checklist

- [ ] All three routes render correctly (`/atoms`, `/molecules`, `/organisms`)
- [ ] Sidebar shows nested navigation under "Components"
- [ ] Active route highlighting works for nested items
- [ ] ComponentPreview molecule works correctly on all pages
- [ ] Old `/styleguide/components` redirects to `/styleguide/components/atoms`
- [ ] No console errors or warnings
- [ ] Mobile navigation works with nested items
- [ ] Expandable/collapsible behavior works (if implemented)
- [ ] Direct URL navigation works for all routes
- [ ] Browser back/forward buttons work correctly

---

## Sub-Agent Tasks

### Agent 1: Data Organization
**Task**: Reorganize `tokens.js` to split components into atoms, molecules, organisms arrays
**Files**: `apps/web/src/data/styleguide/tokens.js`
**Output**: Three new exports (`componentAtoms`, `componentMolecules`, `componentOrganisms`)

### Agent 2: Route Files Creation
**Task**: Create three new route components (ComponentsAtoms, ComponentsMolecules, ComponentsOrganisms)
**Files**:
- `apps/web/src/routes/styleguide/ComponentsAtoms.jsx`
- `apps/web/src/routes/styleguide/ComponentsMolecules.jsx`
- `apps/web/src/routes/styleguide/ComponentsOrganisms.jsx`

### Agent 3: Navigation and Routing Updates
**Task**: Update App.jsx routing and navigation.js structure to support nested routes
**Files**:
- `apps/web/src/App.jsx`
- `apps/web/src/data/styleguide/navigation.js`
- `apps/web/src/components/styleguide/layout/StyleguideLayout.jsx` (verify nested support)

---

## Notes

- **Preserve ComponentPreview.jsx**: No changes needed to the preview molecule, it should work across all pages
- **Maintain backward compatibility**: Old `/styleguide/components` route redirects to atoms
- **Future expansion**: This structure easily accommodates new components in each category
- **Consistent with design system**: Follows atomic design methodology for better organization

---

**Status**: Ready for sub-agent execution
**Next**: Launch three sub-agents in parallel to execute tasks
