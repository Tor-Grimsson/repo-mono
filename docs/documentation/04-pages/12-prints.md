---
title: Prints Page
type: reference
status: active
updated: 2026-08-28
description: Structure and behavior of the /prints catalog and its /prints/:slug detail overlay, including the keyboard control set.
aliases:
  - prints
tags:
  - project/kol-monorepo
  - domain/pages
  - domain/prints
related:
  - "[[10-prints-landing-experiments|Prints Landing Page Experiments]]"
  - "[[04-work|Work Page]]"
---

## Overview

`/prints` is the art-print catalog. One route renders both states: the grid is
always mounted, and `/prints/:slug` opens a detail overlay on top of it without
unmounting the grid behind. The whole page is drivable from the keyboard.

## Anatomy

| File | Owns |
|---|---|
| `routes/Prints.jsx` | the route. The **order**, the **image kind**, the shortcut sheet, and every key except the ones scoped to an open print |
| `routes/prints/PrintsGrid.jsx` | the catalog — `ContentFilters` → `ContentCollection` → `ContentCard print` (grid) / `ContentRow article` (list) |
| `routes/prints/PrintDetailOverlay.jsx` | the open print — gallery, tabs, pricing. Owns `activeImageIndex` and the keys that move it |
| `lib/keys.js` | `isTypingTarget` and a Fisher–Yates `shuffle`, shared by both layers |
| `data/prints.js` | 24 records. `image` = the artwork file · `detailImages[0]` = the photographed print · `detailImages[1]` = the certificate · `images[]` = artwork renditions for `srcset` |

## The keyboard set

| Key | Does | Scope |
|---|---|---|
| `←` `→` | previous / next image of the open print, wrapping | open print only |
| `⇧←` `⇧→` | previous / next print, wrapping first↔last | open print only |
| `A` | render every card from its artwork file | catalog |
| `P` | render every card from its print photo | catalog |
| `R` | re-roll the order | catalog |
| `S` | toggle the shortcut sheet | catalog |
| `Esc` | close the sheet, else close the print | whichever layer is on top |

The sheet is kol-shell's **`ShortcutsOverlay`**, not a local component. It reads
the same `[{ section, items: [{ label, combo }] }]` array a settings page would,
so the keymap is declared once — `SHORTCUTS` in `Prints.jsx`, beside the
bindings it describes.

### Three rules this set lives by

**One key, one owner.** Both the route and the overlay listen on `window`. A key
handled in both fires twice — `⇧→` handled in both stepped *two* prints per
press. `⇧`+arrow belongs to the route; the overlay yields it with an early
return rather than forwarding it.

**The top layer owns `Esc`.** `ShortcutsOverlay` closes itself on `Esc`, and so
does the print overlay, so one press closed both. The print overlay takes
`keysEnabled={!showShortcuts}` and goes inert while the sheet is up.

**No key survives a focused field.** Bare letters are bindings here, so
`isTypingTarget` drops every shortcut while an `INPUT` / `TEXTAREA` / `SELECT` or
a `contentEditable` has focus — otherwise the filter row's search box cannot
type `a`, `p`, `r` or `s`.

## The order

The card order is randomised per visit, and it lives in `Prints.jsx` — not in
the grid. It moved there on 2026-08-28 because two features need it: the overlay
must step through *the order on screen* (`⇧`+arrow), and `R` must be able to
re-roll it. While it was a mount-frozen `useState` inside `PrintsGrid`, the
overlay could not see it and nothing could re-roll it.

The shuffle is Fisher–Yates. It replaced `sort(() => Math.random() - 0.5)`,
which is not a shuffle — the comparator is inconsistent, so the sort leaves a
measurably biased order.

## Artwork vs print

Every card renders `print.image` (the artwork) by default; `P` swaps the whole
grid to `detailImages[0]` (the photographed print) and `A` swaps back. A record
with no `detailImages` falls back to its artwork rather than an empty frame —
defensive, since all 24 currently have both.

> The grid has never mixed the two. Before this set, the only random thing about
> `/prints` was the card order.
