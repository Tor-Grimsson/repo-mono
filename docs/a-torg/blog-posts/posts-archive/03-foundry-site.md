# Building Foundry: A Design Tool That Lives in Your Design System

When we started building Foundry, we had a simple goal: **create a tool that makes typography exploration feel like play**. But as the project evolved within our monorepo consolidation, it became something more—a case study in how design tools should integrate with design systems, not exist apart from them.

Foundry isn't just a standalone application. It's a living demonstration of our design tokens, a proving ground for new components, and an example of how to build density-heavy interfaces that remain approachable.

## What is Foundry?

Foundry is an interactive typography exploration tool. It lets designers and developers:
- Preview fonts across multiple styles and weights
- Test typography at different sizes and line heights
- Experiment with color combinations
- Export settings as design tokens or CSS
- Visualize type specimens in context

[IMAGE: Full-screen shot of Foundry's main interface showing the specimen viewer, controls panel, and dark/light mode toggle]

The interface is divided into three main areas:
1. **Sidebar navigation** - Section switching (Overview, Specimen, Settings)
2. **Specimen viewer** - Live typography preview with real-time updates
3. **Controls panel** - Size, weight, spacing, and color adjustments

Unlike commercial tools like Adobe Fonts or Google Fonts, Foundry is purpose-built for *our* design system. It knows about TG Málrómur, our spacing scale, our color tokens. Every control maps to a real design decision we can make.

## The Architecture: Shared from the Start

One of the early decisions that paid off: **Foundry shares components with the main website**. This wasn't obvious at first—it's tempting to treat a tool as a separate product with its own rules.

But we enforced the monorepo principle: **if it can be shared, it should be shared**.

Here's the import structure:

```jsx
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

Everything in `@kol/ui` is available. Every design token in `theme.css` is applied. When we update the main site's button styles, Foundry inherits those changes automatically.

This has practical benefits:
- **Zero design drift** - Foundry can't accidentally diverge from the main site
- **Faster development** - No need to rebuild primitives
- **Consistent feel** - The entire product family feels unified
- **Living documentation** - Foundry demonstrates how to use shared components in a complex interface

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

The **Specimen** section is the heart of Foundry. It renders live typography with user-controlled parameters:

```jsx
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
          sampleText="The quick brown fox jumps over the lazy dog"
        />
      </div>
    </div>
  );
}
```

Each control component is self-contained and reusable. The **SizeControl**, for example, provides a slider with preset sizes based on our typography scale:

```jsx
// apps/foundry/src/components/controls/SizeControl.jsx
const PRESET_SIZES = [
  { label: 'Display XL', value: 128 },
  { label: 'Display LG', value: 96 },
  { label: 'H1', value: 56 },
  { label: 'H2', value: 40 },
  { label: 'H3', value: 32 },
  { label: 'Body LG', value: 18 },
  { label: 'Body', value: 16 },
  { label: 'Body SM', value: 14 }
];

export function SizeControl({ value, onChange }) {
  return (
    <div className="control-group">
      <label className="text-sm font-medium text-content-secondary">
        Font Size
      </label>
      
      <input
        type="range"
        min="12"
        max="256"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      
      <div className="preset-buttons grid grid-cols-4 gap-2 mt-4">
        {PRESET_SIZES.map(preset => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className="btn-secondary text-xs"
          >
            {preset.label}
          </button>
        ))}
      </div>
      
      <span className="text-sm text-content-tertiary">{value}px</span>
    </div>
  );
}
```

This pattern—combining continuous controls (sliders) with discrete presets (buttons)—makes Foundry approachable for both exploration and precision work.

[IMAGE: Close-up of the controls panel showing size slider, preset buttons, and live preview updating]

## Font Integration: TG Málrómur from Shared Package

One of the trickier aspects of building Foundry was font loading. We use custom fonts (TG Málrómur) that need to be available immediately—no flashes of unstyled text, no layout shifts.

Originally, Foundry duplicated font files. During migration, we centralized them in `packages/ui`:

```
packages/ui/
├── fonts/
│   ├── tg-malromur-tall-black.woff2
│   ├── tg-malromur-narrow-medium.woff2
│   └── inter-tight-variable.woff2
└── theme.css  # Contains @font-face declarations
```

The `theme.css` file registers all fonts using `@font-face`:

```css
@font-face {
  font-family: "TG Málrómur Narrow Medium";
  src: url("./fonts/tg-malromur-narrow-medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "TG Málrómur Tall Black";
  src: url("./fonts/tg-malromur-tall-black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: block;
}
```

Both the main site and Foundry import this file:

```css
/* apps/foundry/src/index.css */
@import "tailwindcss";
@import "@kol/ui/theme.css";

/* Foundry-specific utilities */
.foundry-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
```

The result: **fonts load once, work everywhere**, with zero duplication.

## Dark Mode: Automatic and Seamless

Foundry inherits the theme system from `@kol/ui`, which means dark mode "just works":

```jsx
// apps/foundry/src/components/layout/Header.jsx
import { ThemeToggle } from '@kol/ui/ThemeToggle';

export function Header() {
  return (
    <header className="foundry-header bg-surface-secondary border-b border-border-primary">
      <h1 className="text-h3 font-heading">Foundry</h1>
      <ThemeToggle />
    </header>
  );
}
```

When the user clicks the theme toggle, the entire app switches modes. Every component using semantic tokens (like `bg-surface-primary` or `text-content-secondary`) automatically updates.

The trick is that Foundry doesn't need to know about light or dark mode. It just uses semantic tokens, and the browser's CSS handles the rest:

```css
/* Light mode (default) */
@theme {
  --color-surface-primary: #ffffff;
  --color-content-primary: #171717;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-surface-primary: #0a0a0a;
    --color-content-primary: #fafafa;
  }
}
```

This approach eliminated an entire class of bugs. In the old version, dark mode was implemented with JavaScript class toggling and manual color swapping. It broke regularly. Now it's declarative and reliable.

[IMAGE: Split-screen showing Foundry in light mode and dark mode side-by-side]

## The Font Viewer Integration

Foundry embeds the `FontViewer` component from `@kol/fontviewer`:

```jsx
import { FontViewer } from '@kol/fontviewer';

<FontViewer
  fontFamily={selectedFont}
  fontSize={fontSize}
  fontWeight={fontWeight}
  lineHeight={lineHeight}
  letterSpacing={letterSpacing}
  color={textColor}
  sampleText={customText || DEFAULT_SAMPLE}
  features={openTypeFeatures}
/>
```

The `FontViewer` handles OpenType feature rendering using `opentype.js`:

```javascript
// packages/fontviewer/src/utils/fontLoader.js
import opentype from 'opentype.js';

export async function loadFont(fontUrl) {
  const font = await opentype.load(fontUrl);
  return {
    familyName: font.names.fontFamily.en,
    styleName: font.names.fontSubfamily.en,
    features: font.tables.gsub?.features || [],
    glyphs: font.glyphs.length
  };
}
```

This gives Foundry access to advanced typography features like ligatures, stylistic alternates, and small caps—all controllable through the UI.

## Performance: Handling Real-Time Updates

Typography preview tools have a performance challenge: **every parameter change triggers a re-render**. Move the size slider from 48px to 49px? Re-render. Change color? Re-render. Adjust letter spacing by 0.01em? Re-render.

We optimized this in two ways:

**1. Debounced updates for continuous controls:**

```jsx
import { useDebouncedValue } from '@kol/ui/hooks';

function SizeControl({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebouncedValue(localValue, 50);
  
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);
  
  return (
    <input
      type="range"
      value={localValue}
      onChange={(e) => setLocalValue(Number(e.target.value))}
    />
  );
}
```

This batches rapid slider movements into a single update 50ms after the user stops moving.

**2. Memoized specimen rendering:**

```jsx
import { memo } from 'react';

export const SpecimenDisplay = memo(function SpecimenDisplay({
  fontFamily,
  fontSize,
  fontWeight,
  color,
  sampleText
}) {
  return (
    <div style={{ fontFamily, fontSize, fontWeight, color }}>
      {sampleText}
    </div>
  );
}, (prev, next) => {
  // Only re-render if props actually changed
  return (
    prev.fontFamily === next.fontFamily &&
    prev.fontSize === next.fontSize &&
    prev.fontWeight === next.fontWeight &&
    prev.color === next.color &&
    prev.sampleText === next.sampleText
  );
});
```

These optimizations keep the interface feeling instant even with complex typography.

## What's Left: CSS Cleanup and QA

Foundry is functionally complete, but there's polish work remaining:

**CSS Token Cleanup:** Some older components still use hardcoded values:
```css
/* TODO: Replace with tokens */
.specimen-panel {
  background: #f5f5f5; /* Should be var(--color-surface-secondary) */
  padding: 24px;       /* Should be var(--spacing-6) */
}
```

**Interaction QA:** We need to smoke-test all controls:
- Size slider edge cases (min/max values)
- Weight selector with fonts that don't support all weights
- Color picker with invalid color inputs
- Export functionality for CSS and design tokens

**Light/Dark Mode Regression Tests:** After token cleanup, verify both modes work correctly across all sections.

These are straightforward tasks—the foundation is solid, we just need to tighten the last screws.

## Lessons: Building Tools with Design Systems

Foundry taught us several lessons about building design tools:

**1. Tools should eat their own dog food.** Foundry uses the same design system it helps explore. This creates a virtuous cycle—improving Foundry improves our design system, and vice versa.

**2. Shared components compound value.** Every hour spent on `@kol/ui` components benefits both the main site and Foundry. That's 2x ROI on every investment.

**3. Dense UIs need semantic tokens even more.** Foundry's interface is denser than the main site (more controls, smaller spacing, tighter layouts). Semantic tokens prevented this from becoming a maintenance nightmare.

**4. Performance matters for tool UX.** A sluggish typography preview breaks the flow of exploration. We prioritized performance from the start, and it shows.

**5. Constraints breed creativity.** By limiting Foundry to our design system's tokens, we couldn't take shortcuts. This forced us to build a robust token system that works for every use case.

## What's Next for Foundry

Short-term priorities:
- Complete CSS token cleanup
- Run full interaction QA
- Test light/dark mode thoroughly
- Add export functionality for design tokens

Longer-term ideas:
- **Font comparison mode** - View multiple fonts side-by-side
- **Variable font controls** - If we add variable fonts, expose axis controls
- **Saved presets** - Let users save favorite configurations
- **Embed in main site** - Make Foundry accessible at `/foundry` on kolkrabbi.io

But even in its current state, Foundry is a success. It's a tool we use daily, built on a foundation that scales with our ambitions.

And that's the point: **tools should grow with your system, not fight against it**.

---

## Sources
1. Foundry App Structure - `apps/foundry/`
2. Foundry Migration Session - `docs/SESSION-LOGS/2025-10-04-1043.md`
3. Font Integration - `docs/SESSION-LOGS/2025-10-08-2115.md`
4. Shared UI Components - `packages/ui/src/`
5. Font Viewer Package - `packages/fontviewer/`
6. Theme System - `packages/ui/theme.css`
7. Agent Context - `docs/AGENT-CONTEXT.md`
