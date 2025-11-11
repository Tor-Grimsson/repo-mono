# Building Foundry: A Design Tool That Lives in Your Design System

*Technical Deep Dive • 12 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

When we started building Foundry, we had a simple goal: create a tool that makes typography exploration feel like play. But as the project evolved within our monorepo consolidation, it became something more—a case study in how design tools should integrate with design systems, not exist apart from them.

Foundry isn't just a standalone application. It's a living demonstration of our design tokens, a proving ground for new components, and an example of how to build density-heavy interfaces that remain approachable.

## What is Foundry?

Foundry is an interactive typography exploration tool. It lets designers and developers:

- Preview fonts across multiple styles and weights
- Test typography at different sizes and line heights
- Experiment with color combinations
- Export settings as design tokens or CSS
- Visualize type specimens in context

### Interface Architecture

The interface is divided into three main areas:

1. **Sidebar navigation** - Section switching (Overview, Specimen, Settings)
2. **Specimen viewer** - Live typography preview with real-time updates
3. **Controls panel** - Size, weight, spacing, and color adjustments

Unlike commercial tools like Adobe Fonts or Google Fonts, Foundry is purpose-built for our design system. It knows about TG Málrómur, our spacing scale, our color tokens. Every control maps to a real design decision we can make.

## The Architecture: Shared from the Start

One of the early decisions that paid off: Foundry shares components with the main website. This wasn't obvious at first—it's tempting to treat a tool as a separate product with its own rules.

But we enforced the monorepo principle: **if it can be shared, it should be shared**.

### Component Import Structure

```javascript
// apps/foundry/src/App.jsx
import { ThemeToggle } from '@kol/ui/ThemeToggle';
import { Button } from '@kol/ui/Button';
import { Card } from '@kol/ui/Card';
import { FontViewer } from '@kol/fontviewer';

function App() {
  return (
    <div className="foundry-app bg-surface-primary text-content-primary">
      <Header>
        <ThemeToggle />
      </Header>
      <Sidebar />
      <MainContent />
    </div>
  );
}
```

### Benefits of Shared Components

**Zero Design Drift:** Foundry can't accidentally diverge from the main site.

**Faster Development:** No need to rebuild primitives.

**Consistent Feel:** The entire product family feels unified.

**Living Documentation:** Foundry demonstrates how to use shared components in a complex interface.

Everything in `@kol/ui` is available. Every design token in `theme.css` is applied. When we update the main site's button styles, Foundry inherits those changes automatically.

## Component Structure: Sections and Controls

Foundry is organized into logical sections, each with its own responsibilities:

```
apps/foundry/src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Top navigation with theme toggle
│   │   ├── Sidebar.jsx         # Section navigation
│   │   └── MainContent.jsx     # Content area router
│   ├── sections/
│   │   ├── Overview.jsx        # Landing section
│   │   ├── Specimen.jsx        # Typography preview
│   │   └── Settings.jsx        # Export and configuration
│   ├── controls/
│   │   ├── SizeControl.jsx     # Font size slider
│   │   ├── WeightControl.jsx   # Font weight selector
│   │   ├── SpacingControl.jsx  # Line height and letter spacing
│   │   └── ColorControl.jsx    # Color picker using theme tokens
│   └── viewer/
│       └── SpecimenDisplay.jsx # Live typography renderer
```

### The Specimen Section: Heart of the Application

The Specimen section is the heart of Foundry. It renders live typography with user-controlled parameters:

```javascript
// apps/foundry/src/components/sections/Specimen.jsx
import { useState } from 'react';
import { FontViewer } from '@kol/fontviewer';
import { SizeControl, WeightControl, ColorControl } from '../controls';

export function Specimen() {
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(400);
  const [textColor, setTextColor] = useState('var(--color-content-primary)');

  return (
    <div className="specimen-container">
      <div className="controls-panel bg-surface-secondary border-border-primary">
        <SizeControl value={fontSize} onChange={setFontSize} />
        <WeightControl value={fontWeight} onChange={setFontWeight} />
        <ColorControl value={textColor} onChange={setTextColor} />
      </div>

      <div className="specimen-display bg-surface-primary">
        <FontViewer
          fontFamily="TG Málrómur Narrow Medium"
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={textColor}
        >
          Sample text for typography testing
        </FontViewer>
      </div>
    </div>
  );
}
```

### State Management Pattern

Foundry uses a clean React state pattern:
- **Control components** manage individual parameters
- **Section components** aggregate controls and pass state
- **Viewer components** consume state to render live previews

This pattern enables:
- Predictable data flow
- Easy debugging
- Composable control panels
- Reusable viewer components

## Design System Integration

### Token-Driven Development

Foundry doesn't just use design tokens—it **is a design token validator**. Every control surface maps directly to tokens:

```css
/* Foundry uses semantic tokens */
.specimen-container {
  background: var(--color-surface-primary);
  color: var(--color-content-primary);
}

.controls-panel {
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-primary);
}

/* Dark mode works automatically */
@media (prefers-color-scheme: dark) {
  .specimen-container {
    background: var(--color-surface-primary); /* Switches to dark values */
    color: var(--color-content-primary);       /* Switches to light values */
  }
}
```

### Component Hierarchy Mapping

Foundry demonstrates the full atomic design hierarchy in action:

**Atoms (from `@kol/ui`):**
- Buttons, inputs, toggles in control panels
- Typography primitives in specimen display
- Icons and indicators

**Molecules (composed from atoms):**
- Control groups (SizeControl combines input + label)
- Parameter blocks (WeightControl combines select + slider)
- Navigation items (Sidebar combines icon + text)

**Organisms (complex sections):**
- Complete control panel
- Full specimen viewer
- Sidebar navigation system

**Apparatus (beyond atomic design):**
- Wavy Circle Editor (documented separately)
- Complex data visualization tools

## Performance Considerations

### Efficient Rendering

Foundry uses several performance optimizations:

1. **Debounced State Updates:** Control changes are debounced to prevent excessive re-renders
2. **Memoized Calculations:** Expensive typography calculations are memoized
3. **Virtual Scrolling:** Large specimen lists use virtual scrolling
4. **Lazy Loading:** Non-critical sections load on demand

```javascript
// Example: Debounced control updates
import { useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

export function Specimen() {
  const [fontSize, setFontSize] = useState(48);

  // Debounce font size changes
  const debouncedSetFontSize = useCallback(
    debounce((size) => setFontSize(size), 150),
    []
  );

  // Memoize expensive calculations
  const calculatedMetrics = useMemo(() => {
    return calculateTypographyMetrics(fontSize, fontWeight);
  }, [fontSize, fontWeight]);

  return (
    // ... component JSX
  );
}
```

### Bundle Optimization

Foundry leverages Turborepo's build optimization:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

This means:
- Shared packages build first
- Foundry builds with optimizations
- Code splitting for large dependencies
- Tree shaking for unused code

## Testing Strategy

### Component Testing

Foundry includes comprehensive component tests:

```javascript
// tests/components/controls/SizeControl.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SizeControl } from '../SizeControl';

describe('SizeControl', () => {
  it('calls onChange with new value when slider moves', () => {
    const mockChange = jest.fn();
    render(<SizeControl value={48} onChange={mockChange} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '64' } });

    expect(mockChange).toHaveBeenCalledWith(64);
  });

  it('displays current value correctly', () => {
    render(<SizeControl value={48} onChange={jest.fn()} />);
    expect(screen.getByText('48px')).toBeInTheDocument();
  });
});
```

### Visual Regression Testing

Typography is visual, so visual tests are crucial:

```javascript
// tests/visual/Specimen.test.jsx
import { render } from '@testing-library/react';
import { Specimen } from '../Specimen';

describe('Specimen Visual Tests', () => {
  it('renders typography correctly at base size', () => {
    const { container } = render(
      <Specimen fontSize={16} fontWeight={400} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders typography correctly at large size', () => {
    const { container } = render(
      <Specimen fontSize={72} fontWeight={700} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Export Functionality

### Design Token Export

Foundry can export current settings as design tokens:

```javascript
// apps/foundry/src/utils/export.js
export function exportAsTokens(settings) {
  return {
    typography: {
      fontFamily: {
        primary: 'TG Málrómur Narrow Medium',
        secondary: 'Inter Tight'
      },
      scale: {
        base: `${settings.fontSize}px`,
        ratio: calculateScaleRatio(settings.fontSize)
      },
      weight: {
        value: settings.fontWeight,
        display: getWeightName(settings.fontWeight)
      }
    },
    color: {
      text: settings.textColor,
      background: settings.backgroundColor
    }
  };
}
```

### CSS Custom Properties Export

Settings can also export as CSS custom properties:

```javascript
export function exportAsCSS(settings) {
  return `
:root {
  --font-size-base: ${settings.fontSize}px;
  --font-weight-primary: ${settings.fontWeight};
  --color-text-primary: ${settings.textColor};
  --color-background-primary: ${settings.backgroundColor};
}

/* Usage */
.body-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-primary);
  color: var(--color-text-primary);
  background: var(--color-background-primary);
}
`;
}
```

## Future Enhancements

### Planned Features

**Token Editing/Round-Tripping:**
- Allow design system maintainers to edit token values directly
- Integrate with token generation pipeline (Style Dictionary, Figma Tokens)
- Changes in Foundry trigger PRs with new token values

**Live Component Density Testing:**
- Preview real components using chosen typography settings
- Test complex interfaces (data tables, forms) with custom typography
- Ensure chosen type scales work in real contexts

**Component Library Integration:**
- Preview any component with current typography settings
- Test component variants across the type scale
- Validate accessibility with custom typography

**Collaboration Features:**
- Share typography configurations via URLs
- Comment on and review typography decisions
- Version control for typography experiments

### Technical Roadmap

**Performance Improvements:**
- WebGL rendering for complex specimens
- Web Workers for heavy calculations
- Service Worker for offline functionality

**Integration Expansions:**
- Figma plugin for design handoff
- GitHub integration for token PRs
- Slack notifications for typography changes

## Lessons Learned

### What Worked

1. **Shared Components from Day One:** Enforcing monorepo principles early prevented divergence
2. **Purpose-Built Focus:** Limiting to our design system made the tool more useful, not less
3. **Token-First Development:** Starting with tokens, not components, ensured consistency
4. **Living Documentation:** Using the tool to document the system created a virtuous cycle

### What We'd Do Differently

1. **Earlier TypeScript Adoption:** Adding TypeScript earlier would have caught more errors
2. **More Aggressive Code Splitting:** Large dependencies should load on demand
3. **Accessibility Testing from Start:** Should have prioritized a11y testing from day one
4. **User Testing Earlier:** Real user feedback would have shaped the tool differently

### Key Insights

**Design Tools Should Be Design Systems:** Building Foundry inside our system, not alongside it, created a living example of best practices.

**Constraints Enable Creativity:** Limiting to our actual design tokens forced more thoughtful decisions.

**Density Requires Care:** Building a control-heavy interface requires careful attention to spacing, hierarchy, and feedback.

**Documentation Through Usage:** The best documentation is code that's used daily.

## Conclusion

Foundry represents a new paradigm for design tools: instead of external applications that approximate your system, build tools that **are** your system.

By integrating Foundry directly into our monorepo and sharing components from day one, we've created a tool that can't drift from our design system. It serves as living documentation, a testing ground for new components, and a practical utility for typography exploration.

The result is more than a tool—it's a proof of concept that design systems can encompass not just components and tokens, but the entire ecosystem of design and development.

---

### Resources

**Implementation:**
- `apps/foundry/src/` - Complete Foundry application
- `packages/ui/` - Shared design system components
- `packages/fontviewer/` - Typography rendering engine

**Documentation:**
- [Design System Overview](/docs/system-evolution/2.0.0-design-system-overview.md)
- [Components: Atoms](/docs/system-evolution/3.1.0-design-system-atoms.md)
- [Typography System](/docs/system-evolution/2.2.0-design-system-typography.md)