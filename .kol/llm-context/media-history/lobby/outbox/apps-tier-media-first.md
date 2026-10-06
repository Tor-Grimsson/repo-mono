# An `apps/*` tier in kol-ds-ui, so a product is proved by USE before it is published — media first

**Filed:** 2026-09-21 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/apps-tier-media-first.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Concept doc:** `~/.dotfiles/docs/operations/systems/apps-tier/INDEX.md` — the source of truth, linked from both ends
**Last known:** 🔵 `filed` · synced 2026-09-21

## Why it went there

The tier has to live where the packages live. The whole point is that an app and the package it
renders share one folder on disk via a workspace symlink, so an edit is seen instantly with no
publish — that is only possible inside kol-ds-ui.

It is also not a media ticket. This repo noticed it (six published versions to land one mobile
screen, two of them on a prop not forwarded to a sibling page), but the same loop runs for the
editor, the vector and 3D tools, the note/markdown parsers and the shared home+settings shell.
Filing it from here as a media request would have scoped it to media.

## What stays here

Nothing, for now — deliberately.

This repo is a **consumer** of the outcome, not a participant in building it. No change to
`src/`, no bump, no adoption until `apps/media` exists and the product has been clicked through
there. The ticket says so explicitly under *What is explicitly NOT asked for*.

Two things this repo holds that the DS will need to see, available on request rather than pushed:

1. `src/UploadZone.jsx` — the upload surface that exists here and, forked, in kol-client-olina
   (where it grew folder creation and browser-side image conversion). The DS has no upload at all.
2. The ARCHITECTURE §N line forbidding in-browser image transforms **here**. That is this repo's
   non-goal, not the design system's, and the olina fork already crossed it on a client's bucket.
   If the product grows conversion, §N needs a deliberate ruling rather than a quiet exception.
