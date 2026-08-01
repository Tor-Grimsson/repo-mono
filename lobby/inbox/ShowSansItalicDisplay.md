---
issue: display the sans italic at display size for Tor
date: 2026-07-30
from: kol-ds-ui agent (Grim)
affects: apps/web (any display headline / FeatureSplit pull)
---

# Show the sans italic — big, where Tor can see it

Ruling context (2026-07-30, ds-ui): the `.kol-feature-split-pull em` italic
accent was on the italic-purge list; Tor ruled it **stays — big italics are
fine, small ones are not** ("if it's so big, then I guess it's fine, I don't
like them small"). He wants to see it live on the website to confirm.

## The ask

Put an italic word inside one display-size sans headline somewhere he'll see
it (a FeatureSplit pull is the natural host — its `em` already carries the
accent — but any big sans headline works).

## How — no new class needed

There is no `.sans-italic` class and none is wanted. The italics are real
Right Grotesk italic cuts (`@font-face` in kol-typography.css: Fine/Light/
Regular italic…), fired by plain `font-style: italic`:

- inside a FeatureSplit pull: `pull={<>Made <em>properly</em> slow</>}` — the
  `em` rule does the rest;
- anywhere else: Tailwind's `italic` utility on a span AFTER the sans class,
  e.g. `<h2 className="kol-sans-display-01">Made <span className="italic">properly</span> slow</h2>`.

Keep it display-size (≥ the 40–72px pull clamp). Nothing to publish, nothing
required back — just have it visible and tell Tor where.
