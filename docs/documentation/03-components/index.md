# 3.0.0 Components Overview

**Version:** 2.0
**Date:** 2025-12-02
**Status:** Active
**Content Type:** implementation
**Category:** design-system

---

# Components Overview

**Purpose:** Consolidated overview of the atomic design methodology for building reusable UI components in the kolkrabbi design system.

> The kolkrabbi design system follows the atomic design methodology, organizing UI components into three hierarchical levels: **Atoms** (basic building blocks), **Molecules** (simple component combinations), and **Organisms** (complex, distinct sections). This methodology ensures consistency, scalability, and maintainability across all user interfaces.

## Chapter Index

| Number | Title | Focus |
|--------|-------|-------|
| `3.0.0` | Components Overview (this doc) | Consolidated atomic philosophy + guidance |
| `3.4.0` | Icons | Iconography + glyph usage |
| `5.3.2`–`5.3.5` | Workshop Apparatus | Specialty experiments (documented in the workshop chapter) |
| `3.7.0` | Templates Overview | How components roll into templates |

**Note:** The detailed component catalogs for Atoms (3.1.0), Molecules (3.2.0), and Organisms (3.3.0) have been archived. This document provides a comprehensive overview of all component types.

## Design Philosophy

1. **Composable Building Blocks** - Each component is designed to work independently and combine seamlessly with others
2. **Semantic Structure** - Component names and organization reflect their function, not their appearance
3. **Progressive Complexity** - Start with simple atoms, combine into molecules, assemble into organisms
4. **Token-Driven Styling** - All components use design tokens (`--kol-*`) for automatic theming
5. **Accessibility First** - Every component meets WCAG 2.1 AA standards
6. **Type Safety** - TypeScript definitions ensure component contracts are clear and enforced

## The Three Levels

### Atoms - Basic Building Blocks

The fundamental, indivisible UI elements that can't be broken down further without losing their meaning.

**Characteristics:**
- Single-purpose components
- No dependencies on other custom components
- Directly map to HTML primitives enhanced with tokens
- Use semantic design tokens (`--kol-*`)
- Meet WCAG 2.1 AA standards
- Support both controlled and uncontrolled patterns

**Current Atoms (packages/ui/src/atoms/):**

**Interactive Atoms:**
- `Button/` - Primary interactive element with variants (primary, secondary, ghost, danger) and sizes
- `Switch/` - Toggle control for on/off states
- `Checkbox/` - Binary selection input for multiple-choice scenarios
- `RadioGroup/` - Single-selection from multiple options

**Input Atoms:**
- `Input/` - Text and data entry fields with label support
- `Textarea/` - Multi-line text input with resize controls
- `Select/` - Dropdown selection interface with search support
- `Label/` - Field identification and descriptions

**Data Display Atoms:**
- `Badge/` - Status indicators and labels with semantic color support
- `Avatar/` - User profile representations with fallbacks
- `Progress/` - Visual representation of completion or loading state
- `Separator/` - Visual divider element with semantic meaning

**Navigation Atoms:**
- `SidebarMenuItem/` - Navigation menu entries with state support

**Feedback Atoms:**
- `Tooltip/` - Contextual information display on hover or focus

**Layout Atoms:**
- `AspectRatio/` - Media container sizing with consistent proportions

**Implementation Pattern:**
```tsx
// Atoms accept semantic tokens and handle their own styling
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
  icon?: React.ReactNode
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'kol-button',
        `kol-button-${variant}`,
        `kol-button-${size}`
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

**Common Atom Patterns:**
- State management: Support both controlled and uncontrolled
- Error handling: All input atoms support error states
- Icons: Passed as React components
- Disabled state: All interactive atoms support disabled
- Token usage: All styling uses semantic design tokens

### Molecules - Simple Combinations

Groups of atoms working together as a single unit to perform a specific function.

**Characteristics:**
- Combine 2-5 atoms into a functional unit
- Have their own, clear purpose distinct from individual atoms
- Maintain atomic styling principles (use design tokens)
- Contain shared logic that would be duplicated in organisms
- Support compound component patterns for flexibility

**Current Molecules (packages/ui/src/molecules/):**

**Layout Molecules:**
- `Card/` - Container for grouping related content with optional header, body, and footer
- `SectionToggle/` - Expandable/collapsible section with toggle button

**Navigation Molecules:**
- `ViewToggle/` - Toggle button group for switching between different view modes (card/list)
- `Breadcrumbs/` - Navigation path indicator showing hierarchical location
- `Pagination/` - Page navigation control for large datasets
- `Tabs/` - Content switching interface with tab navigation

**Form Molecules:**
- `DropdownMenu/` - Selectable list with trigger button

**Feedback Molecules:**
- `Alert/` - Message container with type variants for different severities (info, success, warning, danger)
- `Tooltip/` - Enhanced tooltip patterns with rich content support

**Data Display Molecules:**
- `DataTable/` - Tabular data display with sorting, filtering, and pagination
- `Command/` - Command palette interface for quick actions

**Content Molecules:**
- `NavigationMenu/` - Multi-level navigation menu with nested items
- `StackArticle/` - Article layout wrapper with structured content blocks
- `ProseBlock/` - Rich text content container with full prose system integration

**Implementation Pattern:**
```tsx
// Molecules compose atoms and add shared logic
export function SearchForm() {
  return (
    <form className="kol-search-form" role="search">
      <Input
        className="kol-search-input"
        placeholder="Search..."
        aria-label="Search"
      />
      <Button variant="primary" size="md">
        Search
      </Button>
    </form>
  )
}
```

**Molecule Composition Patterns:**
- Compound components for flexible composition
- Render props for flexible content rendering
- Context providers for state management
- Support both controlled and uncontrolled patterns

### Organisms - Complex Sections

Distinct, complex sections of the interface that form a standalone part of the interface.

**Characteristics:**
- Combine multiple molecules and/or atoms
- Represent distinct, recognizable sections (headers, footers, sidebars)
- Have clear boundaries and can exist independently
- Implement complete user workflows
- Contain application-specific logic and data handling

**Current Organisms (apps/web/src/components/):**

**Layout Organisms:**
- `Header/` - Primary site navigation header with logo, navigation menu, search, and user actions
- `Sidebar/` - Navigation sidebar with collapsible sections and hierarchical menu structure
- `Footer/` - Site footer with links, information, and secondary navigation

**Content Organisms:**
- `BlogPost/` - Complete blog post layout with header, content, author, and related posts
- `FeatureGrid/` - Grid of feature showcases with icons, titles, and descriptions

**Product/Service Organisms:**
- `ProductCard/` - Individual product display with image, title, price, and actions

**E-commerce Organisms:**
- `Cart/` - Shopping cart interface with item list, totals, and checkout actions
- `Checkout/` - Multi-step checkout process with form validation

**Home Page Organisms:**
- `HomeHero/` - Homepage hero section with headline, subtext, and call-to-action

**Implementation Pattern:**
```tsx
// Organisms compose molecules and define layout
export function Header() {
  return (
    <header className="kol-header">
      <Logo />
      <NavigationMenu />
      <SearchForm />
      <UserMenu />
    </header>
  )
}
```

**Organism Patterns:**
- Compound components for flexible structure
- Layout composition with responsive grids
- Data loading and state management
- Performance optimization (code splitting, memoization)
- Local, shared, and server state handling

## Component Architecture

### Design Tokens Integration

All components use semantic design tokens for styling:

```tsx
// Good - Using tokens
const buttonStyles = {
  backgroundColor: 'var(--kol-accent-primary)',
  color: 'var(--kol-surface-on-primary)',
  padding: 'var(--kol-spacing-md)',
}

// Avoid - Hardcoded values
const badStyles = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '16px',
}
```

### CSS Layer Architecture

Components use Tailwind's layer system:

```css
/* packages/ui/css/components.css */
@layer components {
  .kol-button {
    /* Base button styles */
  }

  .kol-search-form {
    /* Base search form styles */
  }
}
```

### React Component Structure

Components follow consistent patterns:

```tsx
// File: packages/ui/src/atoms/Button/Button.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'kol-button',
          `kol-button-${variant}`,
          `kol-button-${size}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

### File Organization

```
packages/ui/src/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Badge/
│   └── ...
├── molecules/
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── CardHeader.tsx
│   │   ├── CardContent.tsx
│   │   ├── CardFooter.tsx
│   │   ├── Card.stories.tsx
│   │   └── index.ts
│   └── ...
└── ...
```

## Component Categories

### Navigation Components

**Atoms:**
- `SidebarMenuItem/` - Menu entry element

**Molecules:**
- `Breadcrumbs/` - Path navigation
- `NavigationMenu/` - Multi-level menu
- `Pagination/` - Page controls
- `Tabs/` - Content switching
- `Command/` - Command palette

**Organisms:**
- `Header/` - Site navigation
- `Sidebar/` - Side navigation

### Data Display Components

**Atoms:**
- `Avatar/` - User representation
- `Badge/` - Status indicator
- `Progress/` - Completion display
- `Separator/` - Visual divider

**Molecules:**
- `DataTable/` - Tabular data
- `Card/` - Content container

**Organisms:**
- `FeatureGrid/` - Feature showcase
- `ProductCard/` - Product display

### Form Components

**Atoms:**
- `Input/` - Text entry
- `Textarea/` - Multi-line text
- `Checkbox/` - Binary selection
- `RadioGroup/` - Single selection
- `Select/` - Dropdown
- `Switch/` - Toggle
- `Label/` - Field label

**Molecules:**
- `DropdownMenu/` - Selectable options

**Organisms:**
- `Checkout/` - Multi-step form
- `SearchForm/` - Search interface

### Feedback Components

**Molecules:**
- `Alert/` - Message display
- `Tooltip/` - Contextual help

**Organisms:**
- `NotificationCenter/` - Message queue (planned)

## Accessibility Standards

Every component must meet WCAG 2.1 AA standards:

### Semantic HTML

```tsx
// Good - Proper semantics
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Avoid - Non-semantic divs
<div className="nav">
  <div className="nav-item">
    <div className="nav-link">Home</div>
  </div>
</div>
```

### ARIA Attributes

```tsx
// Use ARIA attributes appropriately
<button
  aria-expanded={isOpen}
  aria-controls="menu-panel"
  aria-haspopup="menu"
>
  Menu
</button>

<div id="menu-panel" role="menu">
  {/* Menu items */}
</div>
```

### Keyboard Navigation

```tsx
// Ensure all interactive elements are keyboard accessible
function MenuItem({ onSelect, children }) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onSelect}
    >
      {children}
    </div>
  )
}
```

### Focus Management

```tsx
// Manage focus appropriately
function Modal({ isOpen, onClose, children }) {
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus first element when opened
      modalRef.current.querySelector<HTMLElement>('[tabindex]')?.focus()
    }
  }, [isOpen])

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className={cn('kol-modal', isOpen && 'is-open')}
    >
      {children}
    </div>
  )
}
```

## Component Variants and Props

### Variant Pattern

```tsx
// Consistent variant naming across components
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'
type AlertVariant = 'info' | 'success' | 'warning' | 'danger'
```

### Size Pattern

```tsx
// Consistent size naming
type ButtonSize = 'sm' | 'md' | 'lg'
type InputSize = 'sm' | 'md' | 'lg'
```

### Responsive Props

```tsx
// Support responsive props where appropriate
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  sizeSm?: 'sm' | 'md' | 'lg'
  sizeMd?: 'sm' | 'md' | 'lg'
  sizeLg?: 'sm' | 'md' | 'lg'
}
```

## State Management

### Component State

```tsx
// Use React hooks for local state
export function Toggle() {
  const [isOn, setIsOn] = React.useState(false)

  return (
    <button
      aria-pressed={isOn}
      onClick={() => setIsOn(!isOn)}
    >
      {isOn ? 'On' : 'Off'}
    </button>
  )
}
```

### Controlled vs Uncontrolled

```tsx
// Support both patterns
export function Input({
  value,
  defaultValue,
  onValueChange,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <input
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      {...props}
    />
  )
}
```

## Composition Patterns

### Compound Components

```tsx
// Allow flexible composition
export function Card({ children }) {
  return <div className="kol-card">{children}</div>
}

Card.Header = function CardHeader({ children }) {
  return <div className="kol-card-header">{children}</div>
}

Card.Content = function CardContent({ children }) {
  return <div className="kol-card-content">{children}</div>
}

Card.Footer = function CardFooter({ children }) {
  return <div className="kol-card-footer">{children}</div>
}

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

### Render Props

```tsx
// For flexible content rendering
export function DataTable({ columns, data, renderRow }) {
  return (
    <table className="kol-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {renderRow(row)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## Testing Strategy

### Unit Tests

```tsx
// packages/ui/src/atoms/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Accessibility Tests

```tsx
// Test with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'

expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Visual Tests

```tsx
// Storybook stories
// packages/ui/src/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}
```

## Performance Considerations

### Code Splitting

```tsx
// Lazy load organisms and complex molecules
const Checkout = React.lazy(() => import('./organisms/Checkout'))
const DataTable = React.lazy(() => import('./molecules/DataTable'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Checkout />
    </Suspense>
  )
}
```

### Memoization

```tsx
// Memoize expensive components
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  const processedData = React.useMemo(() => {
    return data.map(expensiveCalculation)
  }, [data])

  return <div>{processedData}</div>
})
```

### Prop Optimization

```tsx
// Use React.callback for event handlers
export function List({ items }) {
  const handleItemClick = React.useCallback((id: string) => {
    // Handle click
  }, [])

  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </ul>
  )
}
```

## Best Practices

### Atoms - Do's and Don'ts

**Do's:**
- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Use design tokens for styling
- Provide clear visual feedback
- Support both controlled/uncontrolled
- Include comprehensive tests
- Follow naming conventions
- Document props with TypeScript
- Provide sensible defaults

**Don'ts:**
- Use divs instead of semantic elements
- Forget keyboard accessibility
- Hardcode colors or spacing
- Break when nested in different contexts
- Forget error/disabled states
- Mix presentation and logic
- Use internal state only
- Skip TypeScript definitions
- Ignore ARIA best practices
- Create atoms that depend on other atoms

### Molecules - Do's and Don'ts

**Do's:**
- Keep molecules focused on a single purpose
- Compose atoms meaningfully
- Maintain accessibility from atoms
- Use semantic HTML structure
- Support both controlled and uncontrolled
- Provide sensible defaults
- Handle all states (loading, empty, error)
- Use design tokens consistently
- Test with real content
- Document composition patterns

**Don'ts:**
- Create molecules that depend on other molecules
- Mix too many atom types (2-5 max)
- Duplicate logic that's in organisms
- Forget keyboard accessibility
- Hardcode layout (use composition)
- Skip error/loading states
- Ignore responsive behavior
- Break atomic principles
- Over-engineer the API
- Forget to test screen readers

### Organisms - Do's and Don'ts

**Do's:**
- Keep organisms focused on a single purpose
- Use semantic HTML structure
- Implement proper loading states
- Handle empty/error states gracefully
- Maintain responsive layouts
- Include proper ARIA attributes
- Support keyboard navigation
- Document prop interfaces
- Use TypeScript for type safety
- Test with real data
- Implement error boundaries
- Follow design system tokens

**Don'ts:**
- Mix multiple unrelated features
- Depend on global state excessively
- Skip accessibility considerations
- Hardcode layout measurements
- Ignore mobile responsiveness
- Duplicate logic from molecules
- Skip loading/error states
- Use non-semantic HTML
- Break component boundaries
- Omit prop documentation
- Skip integration tests
- Ignore performance (large payloads)

## Related Documentation

**Design System:**
- [2.0.0 Design System: Overview](2.0.0-design-system-overview.md) - Overall philosophy
- [2.1.0 Design System: Colors](2.1.0-design-system-colors.md) - Color tokens
- [2.2.0 Design System: Typography](2.2.0-design-system-typography.md) - Typography scale
- [2.3.0 Design System: CSS Architecture](2.3.0-design-system-css-architecture.md) - Layer structure
- [2.4.0 Design System: Prose](2.4.0-design-system-prose.md) - Prose integration

**Foundation:**
- [1.0.0 Foundation: Repository Structure](1.0.0-foundation-repository-structure.md) - File organization
- [1.0.1 Foundation: Naming Conventions](1.0.1-foundation-naming-conventions.md) - Naming standards

**Research:**
- [6.0.0 Research Overview](6.0.0-research-overview.md) - Research findings
- [6.1.0 Research: Data Tables](6.1.0-research-data-tables.md) - Data table patterns
- [6.2.0 Research: Typography](6.2.0-research-typography.md) - Typography research
- [6.3.0 Research: Organisms](6.3.0-design-system-organisms-research.md) - Organism patterns

**Archived Documentation:**
- `archive/duplicates/6.0.0-design-system-components-research.md` - Original component research
- `archive/duplicates/6.1.0-design-system-atoms-research.md` - Detailed atom research
- `archive/duplicates/6.2.0-design-system-molecules-research.md` - Detailed molecule research
- `archive/components/` - Original component breakout files

---

## Quick Reference

### Component Decision Tree

```
Is it a single HTML element enhanced with tokens?
├─ Yes → It's an Atom
└─ No

Does it combine 2-5 atoms?
├─ Yes → It's a Molecule
└─ No

Does it form a distinct section of the interface?
├─ Yes → It's an Organism
└─ No → It's a Template (4.x.x)
```

### Naming Conventions

```
Atoms: Noun-based (Button, Input, Avatar)
Molecules: Functional description (SearchForm, DropdownMenu)
Organisms: Page section (Header, Footer, Sidebar)
```

### File Structure

```
packages/ui/src/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations
└── organisms/      # Complex sections (planned)
```

---

**Last Updated:** 2025-12-02
**Cross-References:** 2.0.0, 2.1.0, 2.2.0, 2.3.0, 2.4.0, 1.0.0, 1.0.1, 6.0.0, 6.1.0, 6.2.0, 6.3.0
**Category:** Design System
**Status:** Active
