---
title: Local overrides
type: reference
status: active
updated: 2026-08-27
verified: 2026-08-27
description: Everything still local after the adoption — each override, the ruling behind it, the DS seam it is waiting on, and why a dead selector is the failure mode to watch for.
aliases:
  - overrides
  - stopgaps
tags:
  - domain/design-system
  - project/kol-monorepo
covers:
  - the CSS overrides in src/index.css and what each corrects
  - the JS stopgaps in App.jsx
  - which DS seam each is owed
  - the dead-selector failure mode
sources:
  - apps/media/src/index.css
  - apps/media/src/App.jsx
  - lobby/outbox/
related:
  - "[[02-ds-components|DS components]]"
  - "[[01-surfaces|surfaces]]"
---

# Local overrides

After the 2026-08-27 adoption `src/index.css` is 34 lines and `src/App.jsx` is 98. Nearly all of both is **corrections to design-system chrome that the DS has not taken yet**.

Every one is a stopgap. The pattern this repo runs is *local first → the user rules on it live → file to `kol-ds-ui/lobby/` → bump → delete the local*. Eight rounds of that happened on 2026-08-27 alone.

## The failure mode to know about

An override is CSS that matches something the DS renders. **When the DS changes, the selector doesn't error — it silently matches nothing**, and the correction quietly disappears. Neither lint nor the build can see it.

This has happened twice:

- `ColumnBrowser` 0.113.0 moved the columns inside an inner scroll row, so `.r2b2-columns > ul` stopped matching and every column lost its right border.
- Retiring `FileList.jsx` took the `.r2b2-columns` class with it — **all four** corrections died at once, and the user found it, not the agent.

So: when a DS bump lands, re-check the overrides visually, not just the build. And prefer a class the DS owns as the hook over one this repo attaches.

## CSS overrides

`src/index.css`, in file order.

| Rule | Corrects | Owed seam |
|---|---|---|
| `.toggle-checkbox--media:not(.is-active)` border | An unchecked media checkbox has no edge, so it vanishes over pale artwork. | A `media` variant refinement. |
| `.r2b2-library > p { display: none }` | Stacking both pages shows the file count twice. The browse line is the folder-aware one, so the library's is hidden. | `stats={false}` on the library page, beside its `header={false}`. |
| `.r2b2-library { padding-top }` | The filters unit sits further down than the unit gap alone gives it. | None — app layout, correctly local. |
| `div:has(> div > div > .kol-column-browser) { gap }` | Air between the nav and the column-view unit. | None — app layout. |
| The `::before` pill on `.kol-column-browser-resize-x/-y` | The DS centres the pill **inside** the 8px hit strip, but the strip sits inside the border it grabs, so the pill lands ~4px off the line on both axes. Also length, thickness, the long fade, and the `is-near` proximity state. | The pill geometry is the DS's own bug; the proximity state needs a prop. |
| `.kol-column-browser-row` / `-column` / `.bg-fg-04` block | Finder manners: no dividers, no hover fill, an inset rounded selection pill, exactly one row at full strength with ancestors dimmed. | **The important one.** See below. |

### The row block is the brittle one

It hooks on `.bg-fg-04` — a **Tailwind utility the DS happens to put on a selected row**, because the organism exposes no semantic state class. That is a hook that can vanish in any restyle.

It also carries a rule worth keeping whatever happens upstream:

```css
.kol-column-browser-column:not(:has(~ .kol-column-browser-column .kol-column-browser-row.bg-fg-04))
  > .kol-column-browser-row.bg-fg-04 { background-color: var(--kol-fg-04); }
```

Read: *the selected row in the last column that actually holds a selection*. Positional selectors (`:last-of-type`, `nth-last-of-type(2)`) cannot express it — with a file picked they lit the folder column and the file column equally, which was the "ONLY one selected state can exist" complaint. `:has(~ …)` asks the real question.

**Owed:** real state classes on the row (`is-selected`, `is-cursor`) plus a Finder selection mode on `ColumnBrowser`. Until then this block is load-bearing and fragile.

## JS stopgaps

`src/App.jsx`.

| Stopgap | Why | Owed seam |
|---|---|---|
| Focus the browser on mount and on bucket switch | `ColumnBrowser` is `tabIndex={0}` but only focuses itself on a click, so arrow keys did nothing until you clicked. | `autoFocus` on the browser or the browse page. |
| The GSAP pointer tracker | Sets `--r2b2-grab-x/y` on the hovered handle and toggles `is-near` within 20px of its line; a 2.8s `power3.out` tween makes the pill trail rather than pin, with a 30px deadband so small moves don't nudge it. | A DS motion contract for the handle. |

Both are delegated from the wrapper `<div ref={browseRef}>`, rAF-throttled, and keep working mid-drag because pointer capture keeps events on the handle.

## Deliberately local, not owed

Not everything local is a stopgap.

- `src/lib/api.js` — the bucket registry, `READ_ONLY_HOST`, and the write calls. This is the app's own API layer.
- `src/lib/client.js` — the client assembly, including the pure `downloadUrl`.
- `src/lib/settings.js` — per-bucket persistence, and the forced `columnHeight` (800) so every bucket opens the same on every reload.
- `src/UploadZone.jsx` — writes are this app's, not the DS's.
- `src/data/folder-tree.json` + `scripts/folder-tree.mjs` — the baked tree.

## Where the receipts are

`lobby/outbox/` holds one stub per ticket filed from here, each carrying its last known state and the remainder owed **here**. Every stub is 🟢 with no remainder as of 2026-08-27. `lobby/INDEX.md` is the ledger and the truth; a raw `ls` is not.
