---
Title: Naming Conventions
Version: 1.0.0
Date: 2025-12-02
Status: Active
Category: Foundation
Content-Type: Reference
tags: [foundation, guidelines, standards, conventions]
modified: 2026-02-17
---

# Naming Conventions

## Overview

This document defines the naming conventions used throughout the kolkrabbi monorepo for files, directories, code, assets, and version control. Consistent naming improves code readability, maintainability, and collaboration.

---

## File Naming Conventions

### File Extensions

**Use standard extensions:**

| Extension | Purpose | Example |
|-----------|---------|---------|
| `.jsx` | React components | `Button.jsx`, `Home.jsx` |
| `.js` | JavaScript modules, utilities | `utils.js`, `breakpoints.js` |
| `.ts` | TypeScript files | `types.ts`, `sanity.ts` |
| `.tsx` | TypeScript React components | `Component.tsx` |
| `.css` | Stylesheets | `theme.css`, `components.css` |
| `.md` | Markdown documentation | `README.md`, `guide.md` |
| `.json` | JSON data/config | `package.json`, `data.json` |
| `.svg` | Vector graphics | `icon.svg`, `logo.svg` |

### Directory Names

**Always use kebab-case:**

```
✅ Correct:
- components/
- style-guide/
- font-viewer/
- data-tables/
- content-schemas/
- icon-system/

❌ Incorrect:
- components/
- styleGuide/
- fontViewer/
- dataTables/
- contentSchemas/
- iconSystem/
```

### File Names

**JavaScript/TypeScript:**
- PascalCase for components: `Button.jsx`, `HomePage.jsx`
- camelCase for utilities: `breakpoints.js`, `formatDate.ts`
- camelCase for hooks: `useCursor.js`, `useSanity.ts`

**Styles:**
- kebab-case: `button-styles.css`, `color-tokens.css`
- `theme.css` for design tokens
- `components.css` for component styles
- `utilities.css` for utility classes

**Data:**
- camelCase: `breakpoints.js`, `typeScales.js`
- Plural for arrays: `projects.js`, `articles.js`

**Constants:**
- camelCase for filename: `appConstants.js`
- SCREAMING_SNAKE_CASE for exported constants:
  ```javascript
  // appConstants.js
  export const BREAKPOINT_SM = '640px'
  export const BREAKPOINT_MD = '768px'
  export const BREAKPOINT_LG = '1024px'
  ```

---

## Code Naming Conventions

### JavaScript/TypeScript

**Variables and Functions:**
```javascript
// Variables - camelCase
const buttonVariant = 'primary'
const isLoading = false
const projectList = []

// Functions - camelCase
function getProjectById(id) {
  // ...
}

// Boolean variables - use is/has/should prefix
const isVisible = true
const hasError = false
const shouldAnimate = true
```

**Constants:**
```javascript
// Constants - SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_ITEMS_PER_PAGE = 20
const DEBOUNCE_DELAY = 300
```

**Classes:**
```javascript
// Classes - PascalCase
class ButtonComponent {
  // ...
}

class DataTable {
  // ...
}
```

**React Components:**
```jsx
// Component names - PascalCase
function Button() {
  return <button>Click me</button>
}

export const Card = () => {
  return <div>Card content</div>
}

// Default export
export default HomePage
```

**Props:**
```jsx
// Props - camelCase
function Button({ variant, size, isDisabled, onClick }) {
  // variant, size, isDisabled, onClick
}
```

**Custom Hooks:**
```javascript
// Hooks - camelCase, start with 'use'
function useCursor() {
  // ...
}

function useSanityQuery(query) {
  // ...
}
```

### CSS

**Class Names:**
```css
/* BEM methodology */

/* Block */
.button { }

/* Element */
.button__icon { }
.button__text { }

/* Modifier */
.button--primary { }
.button--large { }
.button--disabled { }
```

**CSS Custom Properties (Variables):**
```css
/* Design tokens - kebab-case, prefixed with namespace */

:root {
  /* Colors */
  --color-primary: #0066ff;
  --color-text-primary: #1a1a1a;
  --color-background: #ffffff;

  /* Typography */
  --font-family-primary: 'Inter', sans-serif;
  --font-size-body: 16px;
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 9999px;
}
```

---

## Component Organization

### Atomic Design Naming

**Atoms (Basic components):**
```
packages/ui/src/atoms/
  Button/
    Button.jsx
    Button.css
    index.js
  Input/
    Input.jsx
    Input.css
    index.js
  Icon/
    Icon.jsx
    index.js
    svg/
      check.svg
      close.svg
      arrow.svg
```

**Molecules (Combined atoms):**
```
packages/ui/src/molecules/
  Card/
    Card.jsx
    Card.css
    index.js
  Badge/
    Badge.jsx
    Badge.css
    index.js
```

**Organisms (Complex components):**
```
packages/ui/src/organisms/
  DataTable/
    DataTable.jsx
    DataTable.css
    index.js
  Navigation/
    Navigation.jsx
    Navigation.css
    index.js
```

### Component Export Pattern

```javascript
// packages/ui/src/atoms/Button/index.js
export { default } from './Button'
export { Button } from './Button'
```

```javascript
// packages/ui/src/atoms/Button/Button.jsx
import React from 'react'

export function Button({ children, variant = 'primary' }) {
  return (
    <button className={`button button--${variant}`}>
      {children}
    </button>
  )
}

export default Button
```

---

## Asset Naming

### SVG Icons

**Naming:**
- kebab-case
- Descriptive
- Single word when possible

```
✅ Correct:
- check.svg
- close.svg
- arrow-right.svg
- user-circle.svg
- search.svg

❌ Incorrect:
- checkmark.svg (inconsistent)
- Close.svg (wrong case)
- arrowRight.svg (wrong case)
- userCircle.svg (wrong case)
```

### Logomarks

**Naming:**
- Use descriptive names
- Include format if specific

```
✅ Correct:
- kol-logomark.svg
- web-logomark.svg
- studio-logomark.svg
- foundry-logomark.svg
```

### Fonts

**Naming:**
- Include weight and style
- Use standard font naming conventions

```
✅ Correct:
- Inter-Regular.woff2
- Inter-Bold.woff2
- Inter-Italic.woff2
- SourceCodePro-Regular.woff2
```

### Images

**Naming:**
- kebab-case
- Descriptive of content

```
✅ Correct:
- hero-image.jpg
- project-screenshot.png
- avatar-placeholder.svg
- background-pattern.svg
```

---

## Database/Content Naming

### Sanity Schema Names

**camelCase:**
```javascript
// schemas/project.js
export default {
  name: 'project',  // camelCase
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string'
    },
    {
      name: 'projectSlug',
      title: 'Slug',
      type: 'slug'
    }
  ]
}
```

### GROQ Queries

**camelCase with descriptive names:**
```javascript
// queries/projectQueries.js
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content
  }
`
```

---

## URL Naming

### Routes

**kebab-case:**
```javascript
// React Router routes
const routes = [
  { path: '/', component: Home },
  { path: '/work', component: Work },
  { path: '/work/:slug', component: WorkDetail },
  { path: '/foundry', component: Foundry },
  { path: '/stack', component: Stack },
  { path: '/styleguide', component: Styleguide },
  { path: '/styleguide/colors', component: Colors },
  { path: '/styleguide/typography', component: Typography }
]
```

### Slugs

**kebab-case, descriptive:**
```
✅ Correct:
- modern-design-system
- color-system-guide
- typography-best-practices

❌ Incorrect:
- ModernDesignSystem (camelCase)
- ColorSystemGuide (PascalCase)
- TypographyBestPractices (PascalCase)
```

---

## Git Naming

### Branch Names

**kebab-case with type prefix:**

```
Feature branches:
feature/new-button-component
feature/data-table-implementation
feature/color-system-update

Bug fixes:
bugfix/fix-button-hover-state
bugfix/correct-typography-scale

Hotfixes:
hotfix/critical-security-patch
hotfix/urgent-build-error

Documentation:
docs/update-color-documentation
docs/add-button-examples

Refactoring:
refactor/simplify-component-structure
refactor/optimize-build-pipeline
```

### Commit Messages

**Use conventional commits:**

```
type(scope): subject

Types:
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting, etc.)
refactor: Code refactoring
test: Adding tests
chore: Build process or auxiliary tool changes

Examples:
feat(button): Add variant prop for different styles
fix(data-table): Resolve sorting issue on mobile
docs(color-system): Update token documentation
refactor(components): Simplify Button component structure
```

### Tag Names

**Version tags:**
```
v1.0.0
v1.1.0
v2.0.0
```

**Descriptive tags:**
```
release-v1.0.0
milestone-design-system-complete
archive-legacy-docs
```

---

## Quick Reference Table

| Type | Convention | Example |
|------|------------|---------|
| Component file | PascalCase | `Button.jsx` |
| Utility file | camelCase | `breakpoints.js` |
| Directory | kebab-case | `components/` |
| CSS class | BEM | `.button__icon--large` |
| CSS variable | kebab-case with `--kol-` prefix | `--kol-color-primary` |
| React prop | camelCase | `isDisabled` |
| Function | camelCase | `getProjectById` |
| Constant | SCREAMING_SNAKE_CASE | `MAX_ITEMS` |
| SVG file | kebab-case | `chevron-left.svg` |
| Route | kebab-case | `/styleguide/colors` |
| Git branch | kebab-case with type prefix | `feature/new-component` |
| Commit type | lowercase | `feat:` `fix:` `docs:` |
| NPM package | kebab-case with `@kol/` scope | `@kol/ui` |
| Environment var | UPPER_SNAKE_CASE with VITE_ | `VITE_API_URL` |

---

## Related Documentation

- [Foundation Index](INDEX.md) - Foundation overview
- [Repository Structure](01-repository-structure.md) - Monorepo architecture

---

**Last Updated:** 2026-02-17
