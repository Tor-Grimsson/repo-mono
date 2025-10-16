# Frequency Modulator Dial Component

An interactive circular dial component with harmonic wave modulation, built with React, GSAP, and advanced sine wave mathematics.

## Overview

The Frequency Modulator is a sophisticated circular interface that displays project items around a rotating dial with real-time wave distortion effects. The component features multi-layered modulation, dual control modes, and harmonic frequency quantization for seamless wave patterns.

## Core Components

### Files
- **DialRotation.jsx** - Main dial component with wave generation and GSAP animations
- **WorkHeroSection.jsx** - Container with control panel and state management

## Architecture

### Three-Layer Modulation System

The wave effects are composed of three independent, additive layers:

1. **Base Layer (Intensity/Frequency Sliders)**
   - Always visible baseline wave
   - Controlled by Intensity and Frequency sliders
   - Two modes: Relative (A) and Absolute (B)

2. **Breathing Layer (Breath Amp Slider)**
   - Continuous sine wave oscillation
   - Pulses amplitude in and out over time
   - Triggers automatic circle separation at peaks

3. **Drag Layer (Interaction-Induced)**
   - Builds up during dial rotation
   - Doubles intensity/frequency each full rotation
   - Eases back to zero after interaction

### Control Modes

#### Mode A: Relative (Default)
- Intensity multiplier: `0.05`
- Frequency multiplier: `0.15`
- Breathing is the primary visible effect
- Sliders provide subtle modulation

#### Mode B: Absolute (After Snap)
- Intensity multiplier: `0.1` (2x stronger)
- Frequency multiplier: `0.2` (1.33x stronger)
- Sliders have direct, responsive control
- Breathing still modulates on top

Toggle between modes by:
- Clicking `[A]` or `[B]` indicator on Intensity/Frequency labels
- Clicking "Snap Controls" (switches to mode B)

## Wave Mathematics

### Harmonic Frequency Quantization

To eliminate visible seams where the wave restarts, frequencies are quantized to complete exact cycles around the circle:

```javascript
const cyclesPerCircle = Math.round(freq / 10)
const wavePhase = angle * cyclesPerCircle + drift
const waveOffset = amplitude * Math.sin(wavePhase)
```

**Quantization activation:**
- **Manual**: Toggle with "Quantize [ON/OFF]" button in control panel
- **Automatic**: Triggers when `circleCount > 2` AND `amplitude > 10`
- Ensures seamless connection at 0°/360°
- Creates harmonic wave patterns that multiply into the circle
- Eliminates the "slit scan line" visible seam at high frequencies

### Path Generation

Smooth circular paths use quadratic curves with wrapped indices:

```javascript
for (let i = 0; i < numPoints; i++) {
  const current = points[i]
  const next = points[(i + 1) % points.length] // Wrap around
  const midX = (current.x + next.x) / 2
  const midY = (current.y + next.y) / 2
  pathData += ` Q ${current.x},${current.y} ${midX},${midY}`
}
```

## Multi-Circle System

### Temporal Phase Offsets

Each circle pair has a phase offset for organic ripple effects:

```javascript
const pairIndex = Math.floor(index / 2) + 1
const phaseOffset = pairIndex * 15 // Temporal lag
const ampVariation = amp * (1 + (pairIndex * 0.1)) // +10% per pair
const freqVariation = freq * (1 + (pairIndex * 0.05)) // +5% per pair
```

### Dynamic Separation

Circles separate based on three factors:
- **Base offset**: `pairIndex × separationAmount` (fixed distance)
- **Velocity offset**: Drag/throw velocity (dynamic during interaction)
- **Breath separation**: Breathing animation peaks (automatic pulsing)

## Control Panel

### Sliders

| Slider | Range | Default | Description |
|--------|-------|---------|-------------|
| Intensity | 0-400 | 200 | Wave amplitude control |
| Frequency | 10-200 | 100 | Wave cycles per circle |
| Breath Time | 1-10 | 3 | Breathing cycle duration (seconds) |
| Breath Amp | 0-40 | 10 | Breathing modulation intensity |
| Separation | 0-60 | 16 | Distance between circle pairs (px) |
| Global Scale | 0-100 | 50 | Master multiplier for all effects |
| Global Time | 0-100 | 100 | Animation speed (0 = frozen) |
| Circles | 1-8 | 1 | Number of circle pairs to render |

### Preset Snapshot

The "Snap Controls" button applies a curated preset:

```javascript
{
  intensity: 362,
  frequency: 100,
  breathDuration: 5,
  breathIntensity: 40,
  separation: 16,
  globalScale: 22,
  globalTime: 100,
  circles: 1,
  controlMode: 'absolute' // Switches to mode B
}
```

### Additional Controls

**Quantize Toggle**
- Button: "Quantize [ON/OFF]"
- Purpose: Manually enable harmonic frequency quantization
- Use case: Eliminate slit scan line when running high frequency settings
- Works independently of automatic quantization threshold

## GSAP Animation System

### Timeline Structure

```javascript
spinRef.current = gsap.timeline({
  repeat: -1,
  defaults: { duration: 50, ease: "none" }
})
  .to(circleRef.current, { rotation: 360 })
  .to(items, { rotation: -360 }, 0) // Counter-rotate pills
  .to(centerContentRef.current, { rotation: -360 }, 0) // Counter-rotate logo
```

### Draggable Configuration

- **Type**: `rotation`
- **Inertia**: Enabled for throw physics
- **Velocity-based effects**: Circle separation scales with drag speed
- **Rotation tracking**: Builds up intensity/frequency per full rotation

### Time Control

Global Time slider controls `timeScale` on all animations:
- `0`: Completely frozen
- `50`: Half speed
- `100`: Normal speed (default)

## SVG Integration

### Theme-Aware Icons

Project SVGs are fetched and processed to use theme colors:

```javascript
const themedSvg = svgText
  .replace(/fill="[^"]*"/g, 'fill="currentColor"')
  .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
```

SVGs are cached in `svgCacheRef` for instant display on subsequent hovers.

### Schema Addition

New `svg` field in project schema:

```typescript
defineField({
  name: 'svg',
  title: 'SVG Icon',
  type: 'file',
  group: 'media',
  options: { accept: '.svg' }
})
```

## Performance Optimizations

### Ref-Based Reactivity

All dynamic values use refs to avoid re-renders:
- `globalScaleRef`, `globalTimeRef`, `separationAmountRef`
- `maxIntensityRef`, `maxFrequencyRef`
- `controlModeRef`

Props are synced to refs on every render:

```javascript
globalScaleRef.current = globalScale
```

### Path Caching

Circle paths are stored in refs and updated in-place:
- `circlePathRef` - Main circle
- `circlePathsRef` - Array of additional circles

No DOM recreation, only path `d` attribute updates.

## Usage Example

```jsx
<DialRotation
  projects={projects}
  maxIntensity={200}
  maxFrequency={100}
  breathDuration={3}
  breathIntensity={10}
  separationAmount={16}
  globalScale={50}
  globalTime={100}
  circleCount={1}
  controlMode="relative"
/>
```

## Key Interactions

1. **Hover over project pill**: Display theme-aware SVG icon in center
2. **Click project pill**: Navigate to project detail page
3. **Drag/spin dial**: Build up wave intensity and frequency
4. **Click mode indicator**: Toggle between [A] relative and [B] absolute
5. **Click "Snap Controls"**: Apply preset and switch to absolute mode
6. **Adjust Global Time to 0**: Freeze animation to inspect wave patterns

## Future Enhancements

Potential areas for expansion:
- Additional preset snapshots
- Custom wave shape selection (triangle, square, sawtooth)
- Audio-reactive modulation
- Export/import control settings
- Animation sequence recording
- Velocity-based color shifts
- Multi-axis wave patterns (radial + tangential)

## Credits

Inspired by GSAP ScrollWave demo and refined through iterative design exploration.

Built with love by the Kolkrabbi team.
