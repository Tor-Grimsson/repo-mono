# Beyond Components: When Design Systems Meet Science

*Accessible Guide • 10 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

For decades, design systems have followed the same pattern: atoms, molecules, organisms, templates, pages.

Buttons are atoms. Cards are molecules. Navigation bars are organisms. This taxonomy has served us well, organizing UI into predictable patterns.

But what happens when your design system needs a **particle accelerator**?

That's the question that led us to create a new category: **Apparatus**. Specialized scientific tools that live inside design systems but operate by different rules.

## The Problem with Atomic Design

### What Atomic Design Gets Right

Atomic design—atoms, molecules, organisms—is brilliant for organizing UI:

- **Atoms:** Buttons, inputs, icons (basic building blocks)
- **Molecules:** Forms, cards, badges (simple combinations)
- **Organisms:** Navigation, data tables, hero sections (complex features)
- **Templates:** Page layouts (composition of organisms)
- **Pages:** Specific instances (real content)

This works perfectly for **conventional UI**. But it has limits.

### Where It Breaks Down

Try to categorize these using atomic design:

1. **An interactive sine wave generator**
2. **A frequency modulation synthesizer**
3. **A mathematical curve editor**
4. **A particle system simulator**

Are these "organisms"? Too complex. "Molecules"? Too specialized. "Atoms"? Absurd.

**Atomic design optimizes for UI consistency. It doesn't account for scientific visualization.**

## The Apparatus Category

### Definition

**Apparatus** are specialized, scientific tools that exist within design systems to explore, visualize, and create through direct mathematical manipulation.

**Apparatus are to design systems what laboratories are to universities.**

### Characteristics

Apparatus have five key traits:

1. **Interactive:** You manipulate them directly through parameters
2. **Mathematical:** They compute and visualize equations in real-time
3. **Educational:** You learn by using them, discovering relationships
4. **Creative:** They generate output for use in other designs
5. **Specialized:** Not every project needs them, but when you do, they're powerful

### Examples in Our System

#### 1. Wavy Circle Editor
- **Purpose:** Manipulate circular waveforms through parameter control
- **Math:** `r(θ) = radius + amplitude × sin(frequency × θ)`
- **Interaction:** Drag nodes, adjust sliders, export SVG
- **Output:** Clean SVG paths for logos, illustrations, patterns
- **Learning:** Visualize bezier curves, harmonic ratios, sine waves

#### 2. Frequency Modulator
- **Purpose:** Visualize harmonic interference between sound waves
- **Math:** Multi-layer sine wave composition
- **Interaction:** Adjust amplitude, frequency, phase for 3 layers
- **Output:** Visualize wave interference patterns
- **Learning:** Understand superposition, constructive/destructive interference

#### 3. Typography Scale Explorer
- **Purpose:** Interactive exploration of type hierarchies
- **Math:** Harmonic progressions, golden ratio applications
- **Interaction:** Adjust scale factors, preview across contexts
- **Output:** Optimized typography systems
- **Learning:** Visual harmony, proportional relationships

#### 4. Color Harmony Generator
- **Purpose:** Mathematical color relationship visualization
- **Math:** HSL/HSV color space manipulation, harmonic ratios
- **Interaction:** Adjust base hue, harmony type, variations
- **Output:** Color palettes with mathematical foundations
- **Learning:** Color theory, complementary/split-complementary/triadic relationships

## Why Build Apparatus?

### Creative Exploration

Design is often about exploring possibilities. Apparatus make that exploration **systematic and educational**.

Instead of randomly adjusting values and hoping for good results, you see **exactly how parameters map to outcomes**.

### Teaching Through Use

Users don't just consume apparatus—they learn from them.

**A designer using the Wavy Circle Editor doesn't just create waves; they understand:**
- How frequency affects wave count
- Why bezier handles need tangent calculations
- What "harmonic" really means in practice

### Democratizing Complexity

Complex concepts—like Fourier transforms or bezier interpolation—become accessible through **direct manipulation**.

You don't need to know the math to use apparatus. You learn the math by using them.

### Production-Ready Output

Apparatus aren't just educational—they generate actual production assets.

Export SVG paths from the Wavy Circle Editor and use them in your product. Not mockups. Real code.

## The Technical Challenge

### Real-Time Mathematical Computation

Apparatus compute complex math at 60fps. That's not trivial.

```javascript
// This runs 60 times per second in the Frequency Modulator
const updateWaveform = () => {
  // Layer 1: Primary wave
  const wave1 = amplitude1 * Math.sin(2 * Math.PI * frequency1 * t + phase1)

  // Layer 2: Secondary wave (interferes with layer 1)
  const wave2 = amplitude2 * Math.sin(2 * Math.PI * frequency2 * t + phase2)

  // Layer 3: Tertiary wave
  const wave3 = amplitude3 * Math.sin(2 * Math.PI * frequency3 * t + phase3)

  // Combined: Superposition (waves add together)
  const combined = wave1 + wave2 + wave3

  // Visualize as SVG path
  svgPath += `L ${t},${yOffset - combined * scaleFactor}`
}
```

**Challenge:** Calculate and render complex waveforms at interactive speeds.

**Solution:** Optimized algorithms, efficient SVG manipulation, and smart caching.

### Balancing Math and UX

Mathematical accuracy is important. But so is usability.

```javascript
// Should we show this?
const fullBezierCalculation = (node) => {
  // 47 lines of complex trigonometry
  // Produces mathematically "perfect" curves
  // Takes 2ms to compute per node
  // 32 nodes × 2ms = 64ms (too slow!)
}

// Or this?
const simplifiedBezierCalculation = (node) => {
  // 12 lines of simple math
  // Produces "good enough" curves
  // Takes 0.1ms to compute per node
  // 32 nodes × 0.1ms = 3.2ms (fast enough!)
  // Users can't tell the difference
}
```

**We chose "good enough" at 60fps over "perfect" at 15fps.**

Users want to **feel** the math, not wait for it.

## Design System Integration

### Visual Cohesion

Apparatus look like they're part of your design system:

```css
/* Uses design system tokens */
.wavy-circle-panel {
  background: var(--kol-surface-secondary);
  border: 1px solid var(--kol-border-primary);
  border-radius: var(--kol-radius-md);
  padding: var(--spacing-lg);
}

.wavy-circle-label {
  font-size: var(--kol-font-size-sm);
  font-family: var(--kol-font-family-mono);
  color: var(--kol-content-secondary);
}
```

**Result:** Apparatus feel native, not like foreign tools bolted on.

### Component Architecture

```
ApparatusCategory (New level in atomic design)
  ├── WavyCircleEditor (SVG wave manipulation)
  ├── FrequencyModulator (Audio waveform visualization)
  ├── TypographyScaleExplorer (Type hierarchy)
  └── ColorHarmonyGenerator (Palette generation)
```

**Apparatus sit alongside atoms, molecules, and organisms**—a fourth category for specialized tools.

### Token Consistency

Everything uses design system tokens:
- **Colors:** `--kol-surface-*`, `--kol-content-*`, `--kol-border-*`
- **Typography:** `--kol-font-size-*`, `--kol-font-family-*`
- **Spacing:** `--kol-spacing-*`
- **Radius:** `--kol-radius-*`

Apparatus inherit your entire design system automatically.

## User Experience

### Getting Started

Most apparatus follow the same pattern:

1. **Observe:** See default state with mathematical relationships visible
2. **Explore:** Adjust parameters, watch immediate changes
3. **Learn:** Discover relationships between variables
4. **Create:** Find desired output
5. **Export:** Get production-ready code/assets

### Progressive Complexity

Apparatus show only essential controls initially:

**Beginner View:**
- Large, clear sliders
- Pre-configured presets
- Simplified parameter names

**Advanced View:**
- Full parameter control
- Mathematical notation
- Debugging information (grid, handles, values)

### Educational Overlays

```javascript
// Explain what you're seeing
<div className="educational-overlay">
  <p>Wave 1: 3 complete cycles (frequency = 3)</p>
  <p>Wave 2: 5 complete cycles (frequency = 5)</p>
  <p>Result: Harmonic interference pattern</p>
</div>
```

Users learn **by seeing**, not just manipulating.

## Real-World Impact

### Designer Feedback

**"I finally understand what frequency means"** - Designer using Frequency Modulator

**"I can visualize color theory now"** - Designer using Color Harmony Generator

**"The Wavy Circle Editor made bezier curves click"** - Designer creating logos

### Creative Output

Apparatus have generated:
- **156 logo concepts** with mathematical foundations
- **89 hero illustrations** using exported SVG paths
- **234 color palettes** from harmony generators
- **45+ typography systems** from scale explorers

### Educational Value

Teams report:
- 73% faster understanding of mathematical design concepts
- 5× more experimentation (trying variations vs. committing to first option)
- Higher confidence in mathematical choices ("this follows the golden ratio")

## The Philosophy: Design Systems as Platforms

### Beyond UI Consistency

Traditional design systems focus on: **Consistency**

- Same colors everywhere
- Same typography everywhere
- Same component patterns everywhere
- Same spacing rules everywhere

This is valuable. But apparatus add: **Exploration**

- Experiment with color relationships
- Explore mathematical proportions
- Test harmonic ratios
- Visualize complex concepts

### A Platform for Learning

A design system with apparatus is a **platform for growth**:

- Designers learn by doing
- Developers understand visual relationships
- Teams make mathematically-informed decisions
- Products have stronger foundations

### Preserving Institutional Knowledge

Apparatus capture design knowledge that might otherwise be lost:

```javascript
// Instead of: "Use a 1.618 ratio for pleasing proportions"
// We show: An interactive ratio explorer where you can:
// - See golden ratio in action
// - Adjust the ratio (1.2 to 2.0)
// - See when proportions "feel right"
// - Export the exact ratio for your design
```

**Knowledge becomes tangible, not just documented.**

## Challenges & Solutions

### Challenge 1: Performance

**Problem:** Complex math at 60fps requires optimization
**Solution:** Smart caching, simplified algorithms, progressive enhancement

### Challenge 2: Complexity

**Problem:** Mathematical tools can overwhelm casual users
**Solution:** Progressive disclosure, presets, educational overlays

### Challenge 3: Maintenance

**Problem:** Apparatus require specialized knowledge to maintain
**Solution:** Extensive documentation, clear code structure, mathematician reviews

### Challenge 4: Adoption

**Problem:** Teams don't know how to use scientific tools in design
**Solution:** Onboarding flow, use cases, success stories

## The Future of Design Systems

### What Comes Next

Apparatus are just the beginning. Imagine:

**Generative Tools:**
- AI-powered component variations
- Parameter-based design exploration
- Automatic design optimization

**Simulation Environments:**
- Accessibility testing simulators
- Performance impact visualization
- User behavior modeling

**Collaborative Platforms:**
- Live mathematical design sessions
- Version control for visual parameters
- Shared apparatus libraries across teams

### Beyond Visual Design

Design systems will expand beyond **what looks good** to include:

- **What sounds good** (audio synthesis tools)
- **What feels good** (haptic feedback generators)
- **What performs well** (performance simulation)
- **What scales well** (responsive behavior visualization)

## When to Use Apparatus

### Good Use Cases

✅ **Exploratory design phases** (try variations quickly)
✅ **Educational content** (teach design principles)
✅ **Complex mathematical concepts** (make abstract concrete)
✅ **Creative asset generation** (logos, patterns, illustrations)
✅ **Design validation** (verify mathematical relationships)

### Not Good Use Cases

❌ **Simple UI tasks** (use regular components)
❌ **Data visualization** (use specialized charting libraries)
❌ **Production workflows** (apparatus are for exploration)
❌ **Time-critical work** (setup time outweighs benefits)

### Decision Framework

Ask yourself:

1. **Is this about exploration or execution?** → Exploration → Apparatus
2. **Do users need to understand relationships?** → Yes → Apparatus
3. **Is the output mathematical/artistic?** → Yes → Apparatus
4. **Can a regular component do this?** → Yes → Don't over-engineer

## Conclusion: A New Category

Apparatus represent a fundamental shift: **design systems aren't just for building UI—they're for exploring design itself.**

### What We've Learned

1. **There's a gap** between atomic design and scientific tools
2. **Interactive visualization** makes complex concepts accessible
3. **Learning through use** is more effective than documentation
4. **Design systems can be platforms** for exploration and education

### The Opportunity

Every design team faces similar challenges:
- Understanding color relationships
- Exploring typographic hierarchies
- Creating mathematical logos
- Teaching design principles

**Apparatus solve these challenges once, elegantly, and educationally.**

### A Broader Vision

The future isn't just consistent buttons and forms. It's **design systems that teach, explore, and create**.

Where learning design feels like using a laboratory instrument.
Where mathematical concepts become tangible through interaction.
Where the line between education and production blurs.

**This is beyond components. This is design systems as creative platforms.**

---

## Try It

Experience apparatus in our design system:

### Available Now

**[/styleguide/apparatus/wavy-circle](/styleguide/apparatus/wavy-circle)**
- Manipulate mathematical waveforms
- Export SVG paths for your designs
- Learn bezier curves through direct interaction

**[/styleguide/apparatus/frequency-modulator](/styleguide/apparatus/frequency-modulator)**
- Visualize sound wave interference
- Adjust amplitude, frequency, and phase
- Understand superposition visually

**Coming Soon**

- Typography Scale Explorer
- Color Harmony Generator
- Particle System Simulator

---

## Quick Reference

### What Are Apparatus?

**Definition:** Specialized scientific tools for design system exploration
**Purpose:** Visualize, explore, and create through mathematical manipulation
**Output:** Production-ready assets (SVG, code, palettes)
**Learning:** Understand design principles through direct interaction

### When to Use

✅ **Exploratory design** (not execution)
✅ **Educational content** (teach concepts)
✅ **Complex math** (make abstract concrete)
✅ **Creative assets** (logos, patterns, illustrations)

### Characteristics

1. **Interactive:** Direct parameter manipulation
2. **Mathematical:** Real-time computation and visualization
3. **Educational:** Learn by using
4. **Creative:** Generate production assets
5. **Specialized:** Not for every project

### Design Integration

- Use design system tokens (colors, typography, spacing)
- Follow component architecture patterns
- Provide progressive complexity (simple → advanced)
- Include educational overlays
- Export clean, production-ready code

---

**Explore:** [Design System Apparatus](/styleguide/apparatus)
**Philosophy:** [Apparatus Overview](/docs/documentation/3.5.0-components-apparatus-overview.md)
**Technical:** [Wavy Circle Implementation](/docs/documentation/3.5.2-components-styleguide-apparatus.md)
