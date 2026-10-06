---
title: Monitor — Project Descriptions
version: 1.1.0
date: 2026-04-08
status: active
content-type: reference
category: content
---

# Monitor — Project Descriptions

Formats from single-line titles to full blog post. Each section expands on the previous.

## Table of Contents

- [0. Marketing Copy](#0-marketing-copy) — titles, taglines, subheaders, short paragraphs
- [1. Paragraph](#1-paragraph) — elevator pitch, one paragraph
- [2. Short Description](#2-short-description) — landing page, press kit, 3 paragraphs
- [3. Technical Overview](#3-technical-overview) — developer docs, architecture section
- [4. Use Case](#4-use-case) — feature walkthrough with code and visuals
- [5. Blog Post](#5-blog-post) — full technical case study, ~2200 words

---

## 0. Marketing Copy

### Titles

- Monitor — Modular Video Synthesizer
- Monitor — Voltage Control for the Browser
- Monitor — 50 Modules, Pure Math, 60fps

### Taglines (one-liners)

- Where eurorack uses voltage, Monitor uses math.
- Patch cables, not pixel buffers.
- A modular video synthesizer that runs on trigonometry.
- 50 modules. Pure geometry. Your browser.
- Eurorack for your eyes.

### Subheaders

Use under a title or as section headers on a landing page.

- **What it is:** A browser-based modular video synthesizer built on the language of eurorack.
- **How it works:** Parametric equations generate geometry. Patch cables route signals. The render loop handles the rest.
- **Why it's fast:** Math, not pixels. Every generator outputs coordinates and edges — never bitmaps.
- **Why eurorack:** Familiar vocabulary, proven architecture. Modules reference real hardware by name.
- **The signal types:** Scalars, points, colors, and pens flow through the same cables. Effects adapt to whatever arrives.
- **The rack engine:** Video Modulo — the modular rack at the core of Monitor. 50 modules patched, routed, and rendered in a single frame loop.

### Short Paragraphs

For cards, feature grids, social posts, portfolio entries. Each is self-contained.

**The philosophy:**
Monitor treats math the way eurorack treats voltage — as a universal, scalable medium. Generators compute geometry through trigonometry and parametric equations. A 3D wireframe is 6 trig calls and a rotation matrix. A Lissajous curve is two sine functions. The system draws geometry, not pixels, which is why 50 modules run at 60fps in a browser.

**The modules:**
50 modules across five categories — control, math, generators, display, utility. Clock dividers, LFOs, envelopes, and sequencers drive timing. Filters, delays, and the Ghost reverb shape signals. Generators like Gen 3D, Radial, and Dither produce geometry from pure math. Some are ports of standalone visual projects. Others reference real eurorack hardware by name.

**The signal types:**
Four signal types flow through every cable: scalar (a number, like voltage), points (geometry with edge connectivity), color (RGBA), and pen (draw style). Effects are type-polymorphic — a filter on a scalar is one state-variable pair, on a point cloud it filters each vertex independently, on a color it processes RGB channels separately.

**The effects:**
Delay on a scalar is a ring buffer with exponential feedback. Delay on points is trailing geometric echoes — past frames of geometry concatenated into a single output. Ghost uses 12 prime-spaced taps for reverb diffusion, the same technique used in audio DSP. Same knobs, same cable, different physics depending on what flows through.

**The render loop:**
A single requestAnimationFrame drives all 50 modules. Kahn's algorithm sorts the module graph so every module processes after its inputs are ready. Feedback loops get a 1-frame delay. The sort runs once per graph change, not once per frame. Disabled modules are skipped entirely.

**The heritage:**
MathsModule adapts the Make Noise Maths dual function generator. MagnetoModule adapts the Strymon Magneto tape echo with 4 color-coded playback heads and CRT chromatic offset. RadialGen ports wavyCircleMath from kol-radial. ModulatorGen ports DialRotation from kol-modulator. Real references, ported math, modular signal path.

---

## 1. Paragraph

Monitor is a browser-based modular video synthesizer built on the language of eurorack. Where eurorack uses voltage as its universal medium, Monitor uses pure math — parametric equations and trigonometry generate geometry instead of pushing pixels. Its rack engine, Video Modulo, runs fifty modules across five categories (control, math, generators, display, utility) connected through virtual patch cables, evaluated in topological order, and rendered at 60fps on Canvas2D. No WebGL, no shaders, no pixel buffers — just `Math.sin`, `Math.cos`, and a well-sorted render loop.

---

## 2. Short Description

Monitor is a browser-based modular video synthesizer that borrows the vocabulary and architecture of eurorack. Modules sit in a 104HP case measured in horizontal pitch units. Patch cables connect output jacks to input jacks. CV (control voltage) inputs modulate parameters in real time. The system references real hardware by name — MathsModule adapts Make Noise Maths, MagnetoModule adapts Strymon Magneto — and packages standalone visual projects (kol-radial, kol-modulator) as signal-generating modules in the rack.

The core architectural decision is to treat math as voltage. Every generator in the Video Modulo rack engine computes geometry through parametric equations: a 3D wireframe is 6 trig calls and a rotation matrix, a Lissajous curve is two sine functions, a radial shape is a Fourier-like polar loop. The output is always an array of `{x, y}` points and an edge list — never a bitmap. This is why 50 modules run at 60fps in a browser: the system draws geometry, not pixels.

Four signal types flow through the cables: `scalar` (0-100, the code equivalent of 0-10V), `points` (geometry with edge connectivity), `color` (RGBA), and `pen` (draw style). Effects adapt to whatever type they receive — a filter on a scalar is a single state-variable pair, on a point cloud it filters each vertex's Y coordinate independently, on a color it processes each RGB channel separately. Type converters (S2V, V2S) bridge between numbers and geometry, enabling feedback loops where a shape's center of mass modulates its own rotation speed.

---

## 3. Technical Overview

Monitor's rack engine, Video Modulo, runs 50 modules in a single `requestAnimationFrame` loop at 60fps. The render loop (`useRenderLoop.js`) uses Kahn's algorithm to topologically sort the module graph, builds a connection index Map for O(1) input lookups, and skips disabled modules entirely. Feedback loops are detected automatically — modules in cycles read from a 1-frame-delayed output buffer.

Each module registers via the `useModule` hook, declaring typed input/output ports and a `process(inputs, dt, t)` function. The signal contract is defined in `signals.js` — 47 lines that specify the entire type system:

```javascript
scalar(n)              // { type: 'scalar', value: clamp(n, 0, 100) }
points(arr, edges)     // { type: 'points', value: [...{x,y}], edges: [...[i,j]] }
color(r, g, b, a)      // { type: 'color', value: { r, g, b, a } }
pen(props)             // { type: 'pen', value: { thickness, dash, gap, opacity, ... } }
```

Generators produce geometry through pure math. The WireframeModule builds 7 parametric 3D primitives and projects them with a pre-computed rotation matrix — 6 `Math.cos`/`Math.sin` calls per frame instead of 6 per vertex. The RadialGenModule ports `wavyCircleMath` from kol-radial into a Fourier-like parametric curve: `r = (radius + amplitude * Math.sin(wavePhase)) * scaleF / 200`. The LineGenModule's Lissajous mode creates complex knot patterns from `x = sin(n*f + t)`, `y = cos(n*f*ratio + phase)`.

Effects are type-polymorphic. The FilterModule implements a state-variable filter in 4 lines (`hp = input - lp - q * bp; newBp = bp + f * hp; newLp = lp + f * newBp`), but manages state differently per signal type: a single `{lp, bp}` pair for scalars, a `Float32Array` of per-point Y states for geometry, per-channel RGB state for color. The Ghost module (reverb) uses 12 prime-spaced delay taps `[7, 13, 23, 37, 53, 71, ...]` — primes that prevent comb-filter artifacts, the same principle used in audio reverb design. On points, each tap's geometry gets per-point alpha decay: `{ ...pt, a: (pt.a ?? 1) * decay * wet }`. The Delay module accumulates past frames as trailing geometric echoes for points, but applies exponential feedback decay for scalars. Same patch cable, same knobs, different physics.

---

## 4. Use Case

### Patch a Wireframe Through a Tape Echo

**Start with a shape.** Drop a Gen 3D module into the rack and select "cube" from 7 parametric primitives. The module computes vertices and edges through trigonometry, then projects 3D to 2D with perspective division: `scale = fov / (fov + rz)`. Twist the rotation knobs. Toggle `ani` for auto-rotation. The output is a `points` signal — coordinates and edge pairs, not a rendered image.

```javascript
// WireframeModule.jsx:112 — the entire 3D rotation pipeline
function buildRotationMatrix(rx, ry, rz) {
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const cz = Math.cos(rz), sz = Math.sin(rz)
  return [
    cy * cz,                cy * sz,               -sy,
    sx * sy * cz - cx * sz, sx * sy * sz + cx * cz,  sx * cy,
    cx * sy * cz + sx * sz, cx * sy * sz - sx * cz,  cx * cy,
  ]
}
```

Six trig calls. One matrix. Applied to every vertex with 9 multiplies each. A naive approach computes 6 trig calls per vertex — 7200 for a sphere. Pre-computation turns a performance problem into a non-problem.

**Modulate it.** Patch an LFO output into the Gen 3D's `spd` CV jack. The rotation speed now breathes with a sine wave. The signal on that cable is a `scalar` — a single number from 0 to 100. This is voltage control: one module's output drives another module's parameter, the same way a physical LFO patch cable works in eurorack.

**Feed it through Magneto.** Patch Gen 3D's `out` into MagnetoModule's `in`. Magneto is a 4-head tape echo inspired by the Strymon Magneto pedal, translated from hardware signal processing to geometry manipulation. Four color-coded playback heads (red, green, blue, amber) create trailing echoes with CRT chromatic offset. The tape degradation knobs — `age`, `crinkle`, `wow`, `spring` — come straight from analog tape vocabulary. The `points` signal flows through unchanged in type, but Magneto accumulates multiple frames of geometry into a single output, each head tinted through the `groups` array.

**Watch it on the console.** Patch Magneto's `out` into the Console's channel A. The `drawSignal` dispatcher in `drawSignal.js` detects the `points` type and renders edges as lines, groups as colored wireframes. The same dispatcher handles scalars (oscilloscope trace with ring buffer history), colors (filled rectangles), and points (wireframes with fill support) — one function, three visual modes.

> "Delay on a scalar is a ring buffer with exponential feedback. Delay on points is trailing geometric echoes. Same module, same knobs, different physics."

`[visual: screenshot of Gen 3D → LFO → Magneto patched in rack, cables visible]`
`[visual: Console display showing chromatic wireframe echoes with RGB head separation]`
`[visual: signal flow diagram — points from Gen 3D, scalar from LFO into CV, points through Magneto to Console]`

---

## 5. Blog Post

# Voltage in the Browser: Building a 50-Module Video Synthesizer with Pure Math

## The Premise

What if the entire video synthesizer ran on `Math.sin`?

Monitor is a browser-based modular video synthesizer built in React. At its core is Video Modulo — a rack engine that runs 50 modules at 60fps on Canvas2D. No WebGL shaders, no pixel buffers, no GPU compute. The system generates geometry through parametric equations and draws it as wireframes, oscilloscope traces, and filled shapes.

The architecture borrows from eurorack modular synthesis. Physical eurorack uses voltage as its universal medium. Electricity flows through patch cables, gets shaped by modules, produces output. Monitor does the same thing, but the electricity is math — numbers and point arrays flowing through a virtual patch bay.

The vocabulary is deliberate. Modules sit in a 104HP case (1 HP = 16 pixels). Connections run between 3.5mm jack sockets. Parameters accept CV (control voltage) inputs. Knobs range from 0 to 100 — the code equivalent of 0-10V. Two modules reference real eurorack hardware by name: MathsModule adapts the Make Noise Maths dual function generator, MagnetoModule adapts the Strymon Magneto tape echo. The language is familiar because the architecture is analogous.

> "In eurorack, voltage is the universal medium. In code, that medium is pure math."

`[visual: hero screenshot of a fully patched rack with colorful outputs on the Console display]`

## Math as Voltage

The signal contract lives in a single 47-line file. Four type constructors define everything that flows through a cable:

```javascript
// signals.js — the entire type system

scalar(n)              // { type: 'scalar', value: clamp(n, 0, 100) }
color(r, g, b, a)      // { type: 'color', value: { r, g, b, a } }
points(arr, edges)     // { type: 'points', value: [{x,y}, ...], edges: [[i,j], ...] }
pen(props)             // { type: 'pen', value: { thickness, dash, gap, opacity, ... } }
```

A `scalar` is a number clamped to 0-100 — like a voltage rail. A `points` signal carries an array of 2D coordinates and an edge list defining wireframe connectivity. A `color` carries RGBA. A `pen` carries draw style (thickness, dash pattern, opacity). The helper `readScalar()` extracts a number from any type — luminance from color, point count from geometry — so modules can interpret any signal as a control value.

Every generator in the system produces geometry through parametric math, never pixel operations. The WireframeModule defines 7 3D primitives (cube, tetrahedron, octahedron, icosahedron, sphere, torus, cylinder) as vertex arrays and edge index lists. The rotation pipeline pre-computes a single 3x3 matrix from Euler angles:

```javascript
// WireframeModule.jsx:112
function buildRotationMatrix(rx, ry, rz) {
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const cz = Math.cos(rz), sz = Math.sin(rz)
  return [
    cy * cz,                cy * sz,               -sy,
    sx * sy * cz - cx * sz, sx * sy * sz + cx * cz,  sx * cy,
    cx * sy * cz + sx * sz, cx * sy * sz - sx * cz,  cx * cy,
  ]
}
```

Six trig calls per frame. Then `transformAndProject()` applies the matrix per vertex with 9 multiplies and perspective division: `scale = fov / (fov + rz)`. A naive per-vertex approach would compute 7200 trig calls for a 1200-vertex sphere. Pre-computation reduces that to 6.

The RadialGenModule ports `wavyCircleMath` from a standalone visual project (kol-radial) into the modular signal path. It generates Fourier-like parametric curves:

```javascript
// RadialGenModule.jsx:56-86
for (let i = 0; i < totalNodes; i++) {
  const theta = (i / totalNodes) * Math.PI * 2
  const lfoPhase = syncedLfoFreq * theta
  const lfoValue = getLfoValue(lfoPhase, lfoWaveType)
  const freqMod = frequency + lfoAmount * lfoValue
  const wavePhase = freqMod * mirrorTheta
  const r = (radius + amplitude * Math.sin(wavePhase)) * scaleF / 200
  const angle = theta + rotateRad
  pts.push({ x: 0.5 + r * Math.cos(angle), y: 0.5 + r * Math.sin(angle) })
}
```

LFO modulation on frequency. Mirror symmetry via theta remapping (reducing computation by up to 4x). The output is a closed loop of points with edge indices. The LineGenModule takes it further with Lissajous figures — `x = sin(n*f + t)`, `y = cos(n*f*ratio + phase + t*0.3)` — where the `ratio` parameter determines the knot complexity. Two sine functions create curves that would take thousands of pixels to rasterize.

The pattern is consistent across all 14 generators: compute coordinates and edges, return `points()`. Let `drawSignal.js` handle rendering. The math is the content.

> "`buildRotationMatrix` computes 6 trig calls per frame. A naive approach computes 6 per vertex — 7200 for a sphere."

`[visual: diagram showing the 4 signal types as colored boxes with their data structures]`
`[visual: screenshot of Gen 3D showing a rotating icosahedron rendered as wireframe on a Monitor module]`

## The Render Loop

Video Modulo's render loop in `useRenderLoop.js` drives all 50 modules from a single `requestAnimationFrame`. On each frame it:

1. Checks if the module graph changed (module count or connection reference identity)
2. If changed, runs Kahn's algorithm for topological sort — determines evaluation order so upstream modules process before downstream
3. Builds a `connIndex` Map: for each module, which connections feed into it (O(1) lookup instead of scanning the full connection array)
4. Iterates the sorted list, assembling each module's inputs from upstream outputs, calling `process(inputs, dt, t)`, storing results
5. Detects feedback cycles — modules not reached by Kahn's algorithm read from a 1-frame-delayed buffer

```javascript
// useRenderLoop.js:5-51 — Kahn's algorithm for module graph
function buildGraph(modulesMap, connections) {
  const ids = [...modulesMap.keys()]
  const inDegree = new Map(ids.map(id => [id, 0]))
  const adjacency = new Map(ids.map(id => [id, []]))
  const connIndex = new Map()

  for (const conn of connections) {
    if (!modulesMap.has(conn.fromModuleId) || !modulesMap.has(conn.toModuleId)) continue
    adjacency.get(conn.fromModuleId).push(conn.toModuleId)
    inDegree.set(conn.toModuleId, (inDegree.get(conn.toModuleId) || 0) + 1)
    let list = connIndex.get(conn.toModuleId)
    if (!list) { list = []; connIndex.set(conn.toModuleId, list) }
    list.push(conn)
  }

  const queue = []
  for (const [id, deg] of inDegree) { if (deg === 0) queue.push(id) }
  const sorted = []
  while (queue.length > 0) {
    const id = queue.shift()
    sorted.push(id)
    for (const downstream of adjacency.get(id)) {
      const newDeg = inDegree.get(downstream) - 1
      inDegree.set(downstream, newDeg)
      if (newDeg === 0) queue.push(downstream)
    }
  }
  // Cycle modules get 1-frame delay
  const delayed = new Set()
  if (sorted.length < ids.length) {
    const sortedSet = new Set(sorted)
    for (const id of ids) {
      if (!sortedSet.has(id)) { sorted.push(id); delayed.add(id) }
    }
  }
  return { sorted, delayed, connIndex }
}
```

The graph cache invalidates by reference identity — not deep comparison. Disabled modules are skipped entirely (`enabledRef.current` check before input gathering). The connection index avoids O(modules x connections) scanning. Five display modules (Monitor, Scope, Output, Console, Life) share a single consolidated `requestAnimationFrame` via `useCanvasLoop.js` — one callback loop, not five.

The result: 50 modules evaluate, connect, and render in a single frame without the browser noticing.

> "Kahn's algorithm sorts the module graph so every module processes after its inputs are ready. Feedback loops get a 1-frame delay. The sort runs once per graph change, not once per frame."

`[visual: diagram showing topological sort evaluation order with arrows for signal flow between modules]`

## Type-Polymorphic Effects

The most architecturally interesting feature is that effects adapt their behavior to whatever signal type flows through them.

The FilterModule implements a state-variable filter (SVF) in 4 lines:

```javascript
// FilterModule.jsx:112-117
const svf = (input, lp, bp) => {
  const hp = input - lp - q * bp
  const newBp = bp + f * hp
  const newLp = lp + f * newBp
  const notch = hp + lp
  return { lp: newLp, bp: newBp, hp, notch }
}
```

Four lines. But the state management differs per signal type. For a scalar, the module keeps a single `{lp, bp}` pair — one filter processing one number. For points, it allocates a `Float32Array` per point index and filters each vertex's Y coordinate independently — the geometry's vertical shape gets smoothed (low-pass) or sharpened (high-pass). For color, it maintains separate `{r, g, b}` state — each RGB channel filtered independently, creating color separation effects.

The DelayModule uses a 256-frame ring buffer. For scalars, it applies feedback with exponential decay:

```javascript
// DelayModule.jsx:161
wetSum += tap.value * Math.pow(feedback, c + 1)
```

Repeating echoes that fade exponentially — the standard audio delay behavior. But for points, there is no feedback. Past frames of geometry are concatenated as trailing echoes:

```javascript
// DelayModule.jsx:126-148
if (input.type === 'points') {
  const allPts = []
  const allEdges = []
  // Dry: current frame
  for (const pt of input.value) allPts.push(pt)
  if (input.edges) for (const [a, b] of input.edges) allEdges.push([a, b])
  // Wet: delayed copies merged as trails
  for (let c = 0; c < numCopies; c++) {
    const tap = buf[readPos]
    if (!tap || tap.type !== 'points') continue
    const offset = allPts.length
    for (const pt of tap.value) allPts.push(pt)
    if (tap.edges) for (const [a, b] of tap.edges) allEdges.push([a + offset, b + offset])
  }
  return { out: points(allPts, allEdges) }
}
```

Each delayed frame's geometry is merged into the current output with offset edge indices. The result is a trail of shapes — not a blurred smear, but discrete geometric echoes.

The Ghost module (reverb) takes this further with 12 prime-spaced delay taps:

```javascript
const TAP_PRIMES = [7, 13, 23, 37, 53, 71, 97, 113, 137, 157, 179, 199]
```

Prime numbers prevent comb-filter artifacts — the same technique used in audio reverb design (Schroeder, Moorer). For points, each tap's geometry gets per-point alpha decay: `{ ...pt, a: (pt.a ?? 1) * decay * wet }`. The wireframe persists but fades. For color, each RGB channel blends across taps independently. For scalars, weighted tap averaging produces a smoothed, diffused value.

> "The Filter module is 4 lines of math. But it runs those 4 lines once for a scalar, 256 times for a point cloud, and 3 times for a color."

`[visual: side-by-side screenshots — Filter in LP mode on a wireframe (smooth curves) vs HP mode (sharp edges)]`
`[visual: Delay module on a RadialGen shape showing trailing geometric echoes]`

## Ported, Not Imported

Several generators in Monitor are ports of standalone visual projects. The RadialGenModule opens with a comment: "Ports wavyCircleMath from kol-radial into modular signal path." The parametric curve math was lifted from a standalone radial art generator, stripped of its rendering, and wrapped in the `useModule` / `process` / `points()` pipeline. The ModulatorGenModule does the same with `DialRotation` from kol-modulator — breathing concentric circles with frequency modulation.

The hardware references follow the same pattern. MathsModule translates Make Noise Maths — a dual function generator with rise/fall envelopes, cycle mode, and attenuverters — from analog circuits to knob values and `process()` callbacks. MagnetoModule translates the Strymon Magneto's 4-head tape echo into geometry manipulation: four color-coded playback heads (red, green, blue, amber) with CRT chromatic offset and tape degradation parameters named `age`, `crinkle`, `wow`, `spring`.

The pattern is: take standalone visual code or hardware design, strip out the rendering, extract the pure math, output `points()` signals. The modular system provides rendering, routing, CV control, and timing. The generator only needs to produce geometry.

> "Strip out the rendering. Extract the math. Output `points()`. The modular system handles everything else."

`[visual: standalone kol-radial project next to RadialGenModule in the rack — same math, different context]`

## Bridging Signal Domains

Two converter modules complete the signal architecture.

S2V (Scalar to Visual) takes up to 4 scalar inputs and outputs geometry in 5 visualization modes: bar charts, radial gauges, time-domain plots, horizontal meters, XY scatter. It turns numbers into shapes — each mode computing coordinates and edges from input values through straightforward math (arc segments via `Math.cos(a) * r`, ring buffers for history traces).

V2S (Visual to Scalar) does the reverse: takes a `points` input, analyzes the geometry, and outputs 4 scalar values — point count, center-of-mass X, center-of-mass Y, bounding-box area. It turns shapes into numbers.

Together they enable self-modifying systems. A generator creates geometry. V2S extracts its center of mass as a scalar. That scalar feeds back into the generator's frequency CV input. The geometry shifts. The scalar changes. The cycle continues — a feedback loop built entirely from signal routing, no special feedback mechanism required. Kahn's algorithm detects the cycle automatically and applies a 1-frame delay to keep the loop stable.

> "V2S turns a spinning wireframe into four numbers. Patch one of those numbers back into the wireframe's rotation speed. The geometry modulates itself."

`[visual: diagram showing feedback loop — Generator → V2S → scalar cable → Generator CV input, with annotations showing signal types at each stage]`
