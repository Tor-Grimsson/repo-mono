# What is Foundry? A Design Tool That Lives Inside Our Design System

*Accessible Guide • 8 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

When we started building Foundry, our goal was simple: make exploring typography feel fun. But as the project evolved, it became something far more important—a powerful demonstration of a core belief: **design tools shouldn't exist separate from the design system; they should be built right into it**.

## What is Foundry?

Foundry is not just a standalone app; it's a **living model of our architecture**. It's the ultimate proving ground for our components, the live preview of our design tokens, and a great example of how we build interfaces that are rich in features yet easy to use.

Simply put, Foundry is an interactive playground for typography. It lets designers and developers get hands-on with type:

- Test our fonts (TG Málrómur) across various weights and styles
- Tweak sizes, line heights, and letter spacing in real-time
- Experiment with our official color token combinations
- Export all settings as clean design tokens or CSS

Crucially, Foundry is purpose-built. Unlike generic commercial tools, it only knows about our system: our spacing scale, our color palette, and our specific typeface. Every control you touch maps directly to a real, actionable design decision we can make in our product.

## The Key Insight: Sharing Components from Day One

One early decision determined the entire success of the project: **Foundry shares components directly with our main website**.

It was tempting to treat the tool as a separate side project, but we stuck to our monorepo principle: **if it can be shared, it must be shared**.

Here's a peek at how simple the imports look:

```javascript
// apps/foundry/src/App.jsx
import { ThemeToggle } from '@kol/ui/ThemeToggle';
import { Button } from '@kol/ui/Button';
import { Card } from '@kol/ui/Card';
// ... and so on
```

When we update the look of our site's button or tweak a shadow effect, Foundry automatically inherits those changes.

### Why This Matters for the Team

**Zero Design Drift:** Foundry simply cannot diverge from the main product's look and feel.

**Faster Development:** We skip rebuilding basic elements like headers or buttons.

**Unified Feel:** The entire product family is consistent, from the public site to this dense utility tool.

**Living Documentation:** Foundry itself demonstrates the best-practice way to use our shared components in a complex application.

## The Anatomy of the Tool

The interface is divided into three logical zones:
1. The **Controls panel** (for size, weight, and color adjustments)
2. The **Specimen viewer** (the live preview area)
3. The **Sidebar navigation**

The heart of the app is the Specimen section. It's built with a clean, standard structure: controls panels manage state (like fontSize and fontWeight), and the main viewer consumes that state to render the live typography.

```javascript
// apps/foundry/src/components/sections/Specimen.jsx

// Use React state to manage the chosen properties
const [fontSize, setFontSize] = useState(48);
// ...

return (
  <div className="controls-panel">
    <SizeControl value={fontSize} onChange={setFontSize} />
  </div>

  <div className="specimen-display">
    <FontViewer fontSize={fontSize} /> // Viewer reads the state
  </div>
);
```

By tightly coupling the tool to our system, we've not only made typography exploration playful, but we've also created one of the most reliable and honest parts of our design system. **It can't lie about what our tokens look like, because it is built from them.**

## The Business Case: Why Build Tools Inside the System?

### Traditional Approach: External Tools

Most design teams use external tools:
- **Adobe Fonts** for typography exploration
- **Figma** for component design
- **Separate codebases** for each product

This creates problems:
- Tools drift from the actual product
- Designers and developers work in different systems
- Maintaining consistency requires constant manual effort
- Updates in one place don't propagate to others

### Our Approach: Integrated Tools

Foundry demonstrates a better way:
- **Built into the system** from day one
- **Shares components** with production
- **Uses actual design tokens** (not approximations)
- **Updates automatically** when the system evolves

### The Competitive Advantage

This approach gives us:

1. **Guaranteed Consistency:** Foundry can't use outdated components or tokens
2. **Faster Iteration:** Changes to the system instantly reflect in the tool
3. **Better Documentation:** The tool serves as a living styleguide
4. **Reduced Maintenance:** One codebase instead of many

## Real-World Impact

### For Designers

- **Explore typography** with confidence that matches production
- **Test combinations** that actually work in the product
- **Export settings** that developers can immediately use
- **Understand the system** through hands-on interaction

### For Developers

- **Trust the tool** because it uses real components
- **Implement designs** without translation layers
- **Debug styling** using Foundry as a reference
- **Contribute to the system** knowing changes propagate

### For the Organization

- **Reduced design debt** from tool drift
- **Faster time-to-market** for new features
- **Better design-development collaboration**
- **Higher quality outputs** with less review cycles

## The Technology That Makes It Possible

### Monorepo Architecture

Foundry lives in the same codebase as everything else:
- `apps/foundry/` - The Foundry application
- `packages/ui/` - Shared design system
- `packages/content/` - Content schemas
- `apps/web/` - The main website

### React + Tailwind v4

Foundry uses:
- **React** for interactive components
- **Tailwind v4** for styling with design tokens
- **Semantic tokens** that automatically handle theming

### Design Tokens in Action

Foundry doesn't just use tokens—it **proves they work**:

```css
/* Components use semantic tokens */
.controls-panel {
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-primary);
}

/* Dark mode works automatically */
@media (prefers-color-scheme: dark) {
  .controls-panel {
    /* Colors automatically swap to dark values */
    background: var(--color-surface-secondary);
  }
}
```

## Lessons for Other Teams

### Start with Tokens, Not Components

We learned that building components first leads to inconsistencies. Building tokens first ensures everything else aligns.

### Make Tools Non-Negotiable

A design system without tools is just documentation. Tools make the system tangible and testable.

### Embrace Constraints

Limiting Foundry to our actual design system made it more useful, not less. Constraints enable creativity.

### Documentation Through Usage

The best documentation is code that's used daily. Foundry documents our system by being part of it.

## The Bigger Picture: Design Systems as Products

Foundry represents a shift in thinking: **design systems aren't just code libraries; they're product ecosystems**.

This means:
- Design tools are part of the system
- Documentation lives in code and usage
- Testing happens in production-like environments
- Evolution is continuous and integrated

## What Comes Next?

### Planned Enhancements

**Direct Token Editing:** Let design system maintainers update tokens from within Foundry

**Component Preview:** Test how real components look with custom typography

**Collaboration Features:** Share typography configurations with the team

**Figma Integration:** Bridge design and code workflows

### Beyond Typography

Foundry is a proof of concept. The same approach could work for:
- Color exploration tools
- Component playground
- Layout testing environment
- Animation preview system

## Conclusion: The Future of Design Tools

Foundry's approach to integrating design and engineering isn't just technically sound—it's strategically advantageous. By building tools inside the system rather than alongside it, we've created a more coherent, maintainable, and honest design environment.

**What do you think of Foundry's approach to integrating design and engineering? Is it something you see your own team doing?**

The future of design tools isn't separate applications that approximate your system—it's tools that **are** your system.

---

### Quick Reference

**Key Principles:**
- Design tools should be part of the design system
- Shared components prevent drift
- Tokens first, components second
- Documentation through usage

**Technology Stack:**
- React (component framework)
- Tailwind v4 (CSS-first styling)
- Design tokens (semantic color/spacing)
- Monorepo architecture

**Business Value:**
- Guaranteed consistency
- Faster iteration
- Better collaboration
- Reduced maintenance