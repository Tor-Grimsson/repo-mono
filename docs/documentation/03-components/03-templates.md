---
title: Templates
type: reference
status: active
updated: 2026-02-17
description: Architecture, navigation, and layout patterns for the Kolkrabbi Design System's page templates and apparatus integration.
aliases:
  - templates
tags:
  - project/kol-monorepo
  - domain/components
  - domain/templates
related:
  - "[[INDEX|components overview]]"
---
---

## Overview

This section covers the page layout templates and structural patterns that compose the Kolkrabbi Design System styleguide. Domain 5 documents the **architecture of documentation**, not just the content itself.

Templates define how information is presented, how navigation works, and how interactive apparatus integrates with static documentation.

## Domain 5 Architecture

```
5.0.x - Template Overview
5.1.x - Styleguide Structure
5.2.x - Navigation System
5.3.x - Page Layouts
5.4.x - Apparatus Integration
5.5.x - Workflow and Maintenance
```

### Purpose

**Domain 5** bridges design and implementation by documenting:

1. **Structural patterns** - How pages are built
2. **Navigation systems** - How users move through content
3. **Interactive elements** - How apparatus fits into documentation
4. **Responsive behavior** - How layouts adapt across devices

## Core Principles

### 1. Component-Driven Documentation

Every page is built from documented components:

```jsx
// Standard page structure
<DesPage>              // Container
  <DesSection>         // Content blocks
    <DesCard>          // Information cards
    <DesSectionToggle> // Interactive sections
  <Divider />          // Visual separators
</DesPage>
```

### 2. Semantic HTML First

All templates prioritize accessibility and semantics:

```html
<!-- Navigation uses semantic landmarks -->
<nav aria-label="Styleguide navigation">
  <ul role="list">
    <li><a href="/styleguide/colors">Colors</a></li>
  </ul>
</nav>

<!-- Content uses proper heading hierarchy -->
<main>
  <h1>Page Title</h1>
  <h2>Subsection</h2>
</main>
```

### 3. Auto-Token Styling

All components use semantic tokens for theming:

```css
/* Background adapts to theme */
.page-container {
  background: var(--kol-surface-primary);
  color: var(--kol-content-primary);
}

/* Borders use semantic tokens */
.card {
  border-color: var(--kol-border-primary);
}
```

## Template Categories

### Category 5.1: Stylguide Structure


- Component hierarchy
- Context providers
- State management

- `apps/web/src/routes/styleguide/Home.jsx` - Dashboard
- `StyleguideExpansionContext.jsx` - State management

### Category 5.2: Navigation System


- Breadcrumbs
- Section toggles
- Search interface

- `SectionToggle` - Expandable sections
- `Breadcrumbs` - Path indication

### Category 5.3: Page Layouts


- Spacing patterns
- Responsive behavior
- Print styles

- Dashboard layouts (cards grid)
- Documentation layouts (prose + sidebar)

### Category 5.4: Apparatus Integration


- State isolation
- URL routing
- Export workflows

- `FrequencyModulator.jsx` - Audio visualization
- `ApparatusContainer.jsx` - Wrapper component

### Category 5.5: Workflow and Maintenance


- Content updates
- Version control
- Quality assurance

- Documentation update workflows
- Component catalog maintenance

## Technical Implementation

### Layout Hierarchy

```
Root Layout
  ├── Navigation Sidebar
  │   ├── Navigation Tree
  │   ├── Section Toggles
  │   └── Breadcrumbs
  │
  └── Main Content Area
      ├── Page Header
      ├── Section Components
      ├── Interactive Apparatus
      └── Footer
```

### Component Composition

```jsx
// Example: Home page structure
<DesPage title="Kolkrabbi Design System">
  <DesSection name="System snapshot">
    <MetricCard />
    <NavigationCard />
  </DesSection>

  <SectionToggle expanded={false}>
    <DesSection name="Workflow checklist">
      <ChecklistCard />
    </DesSection>
  </SectionToggle>
</DesPage>
```

### Responsive Behavior

All templates use responsive design patterns:

```css
/* Mobile-first approach */
.styleguide-layout {
  /* Mobile: stacked layout */
  display: flex;
  flex-direction: column;
}

/* Tablet and up: two-column */
@media (min-width: 768px) {
  .styleguide-layout {
    flex-direction: row;
  }

  .navigation-sidebar {
    width: 280px;
    flex-shrink: 0;
  }

  .main-content {
    flex: 1;
    max-width: calc(100% - 280px);
  }
}
```

## Theming Architecture

### CSS Custom Properties

All templates consume design tokens:

```css
:root {
  /* Surface colors */
  --kol-surface-primary: #ffffff;
  --kol-surface-secondary: #f5f5f5;

  /* Content colors */
  --kol-content-primary: #171717;
  --kol-content-secondary: #525252;

  /* Border colors */
  --kol-border-primary: #e5e5e5;

  /* Semantic utilities */
  --border-auto: var(--kol-border-primary);
  --bg-auto: var(--kol-surface-primary);
  --text-auto: var(--kol-content-primary);
}
```

### Dark Mode

Dark mode is automatic via media queries:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --kol-surface-primary: #0a0a0a;
    --kol-surface-secondary: #171717;
    --kol-content-primary: #fafafa;
    --kol-content-secondary: #d4d4d4;
  }
}
```

## Navigation Patterns

### Tree Structure

Navigation is defined as a nested tree:

```javascript
const navigationTree = {
  id: 'styleguide',
  label: 'Styleguide',
  children: [
    {
      id: 'colors',
      label: 'Colors',
      path: '/styleguide/colors',
      children: [...]
    },
    {
      id: 'typography',
      label: 'Typography',
      path: '/styleguide/typography'
    }
  ]
}
```

### Section Toggles

Components can be collapsed/expanded:

```jsx
<SectionToggle
  label="System snapshot"
  isExpanded={expandedSections.snapshot}
  onToggle={() => toggleSection('snapshot')}
/>
```

State is persisted across sessions via context.

## Apparatus Integration

### Mounting Points

Interactive tools mount to designated containers:

```jsx
{/* Static documentation */}
<DesSection name="Wavy Circle Editor">
  <p>Mathematical waveform manipulation tool.</p>
</DesSection>

{/* Interactive apparatus */}
<WavyCircleEditor
  initialParams={{ radius: 120, amplitude: 25, frequency: 5 }}
  onExport={(pathData) => exportSVG(pathData)}
/>
```

### State Isolation

Each apparatus maintains isolated state:

```jsx
// Each editor instance is independent
<WavyCircleEditor id="editor-1" />
<WavyCircleEditor id="editor-2" />
```

### URL Routing

Apparatus can be deep-linked:

```
/styleguide/apparatus/wavy-circle?radius=120&amplitude=25&frequency=5
```

## Metrics and Analytics

### System Metrics

The styleguide tracks:

```json
{
  "generatedAt": "2025-11-04T10:30:00Z",
  "workspaces": {
    "apps": {
      "web": {
        "routes": 47,
        "components": 156
      }
    },
    "packages": {
      "ui": {
        "atoms": { "total": 23, "core": 18, "foundry": 5 },
        "molecules": { "total": 31, "core": 24, "foundry": 7 }
      }
    }
  }
}
```

### Generation Process

Metrics update via:

```bash
yarn metrics:styleguide
```

This script:
1. Scans source directories
2. Counts components and modules
3. Generates JSON metrics file
4. Updates UI displays

## Workflow

### Adding New Pages

1. Create route in `apps/web/src/routes/styleguide/`
2. Add to navigation tree
3. Generate metrics
4. Update documentation

### Updating Components

1. Modify component source
2. Rebuild styleguide
3. Verify in browser
4. Update metrics
5. Document changes

### Version Control

All changes tracked in git:

```bash
git add .
git commit -m "docs(styleguide): update navigation structure

- Add new Colors section
- Update breadcrumb hierarchy
- Refresh metrics"
```

## Related Documents

- [- Component Overview](INDEX.md)
- 5.3.2 - Apparatus Overview
- 5.1.0 - Styleguide Structure

## Changelog

- **2025-11-04** (3.7.0): Initial template overview documentation

---

