# Harmonic Radial Dial – Component Inventory

Copies of the workshop Harmonic Radial Dial (aka `/workshop/apparatus/circle-generator`) live in this folder so the apparatus can be extracted into its own project without touching the main app. The files mirror the originals and keep the full behavior intact.

## Files

| File | Description |
|------|-------------|
| `ApparatusCircleGenerator.jsx` | Route shell used in Workshop. Passes the enhancement idea list into the editor and mounts it full-width. |
| `apparatus/WavyCircleEditor.jsx` | Top-level composition. Renders the control sidebar + interactive canvas and wires every callback coming from the editor hook. |
| `apparatus/WavyCircleControls.jsx` | Slider / toggle UI powered by `@kol/ui` primitives. Manages UX niceties (collapsible descriptions, backlog list, export actions). Calls `onParamChange` + `onUiToggle`. |
| `apparatus/WavyCircleCanvas.jsx` | SVG canvas, drag interactions, and Baseline grid overlay. Binds pointer handlers, renders nodes/handles, and exposes the exportable path. |
| `apparatus/BaselineGrid.jsx` | Lightweight grid renderer shared by the canvas for visual reference. |
| `apparatus/useWavyCircleEditor.js` | Custom hook that stores editor params, generates nodes, tracks drag state, computes stats, and exposes helpers like `exportSvg` / `copyPath`. |
| `apparatus/wavyCircleMath.js` | Pure math helpers (sine modulation, node transforms, clamps) consumed by the hook + canvas. |

Use these copies as the starting point for the external “Harmonic Radial Dial” project or for rapid prototyping without depending on the rest of the monorepo.
