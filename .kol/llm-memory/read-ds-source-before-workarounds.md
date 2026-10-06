---
name: read-ds-source-before-workarounds
description: "Never wrap/margin-hack a DS component to fix its geometry — read the component's full render first; the variant/prop usually exists (ThemeToggle variant=\"flush\")"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8c20c7e9-0f6b-4dba-abc8-c3d5547b7724
  modified: 2026-08-12T11:17:10.034Z
---

Fixing a DS component's look with a consumer-side hack (negative margin, wrapper
box, opacity) without reading the component's FULL source first is a defect.
2026-08-12: hacked `-ml-1.5` onto ThemeToggle to align its icon-button inset —
the component ships `variant="flush"` (chromeless, no box) exactly for that, and
it was visible in the render I had only half-read ("we have props to show toggle
without container.. READ THE FUCKING CODE").

**Why:** the DS is the source; a workaround forks its geometry and breaks on the
next bump. Half-reading a file (props block but not the render) is the same as
not reading it.

**How to apply:** before styling around any `@kolkrabbi/*` component, read the
whole component file — every variant branch in the render, not just the
signature. If the look still isn't expressible, that's a [[lobby-ds]] brief, not
a local patch. Related: [[doc-roles-exist-check-before-authoring]].
