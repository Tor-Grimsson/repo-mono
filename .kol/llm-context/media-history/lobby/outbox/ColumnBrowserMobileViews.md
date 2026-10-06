# ColumnBrowserMobileViews — the four views the first ticket never described

**Filed:** 2026-09-03 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserMobileViews.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-09-03
**Follows:** [ColumnBrowserStackMode](ColumnBrowserStackMode.md) — measured today; that one closes on its two defects, this one carries the design
**Wireframe:** https://claude.ai/code/artifact/085f1e65-756d-492e-9a74-73be6dbd41a7 · local copy `_tmp/2026-09-03-mobile-browser-scope/views.html`
**References:** `_tmp/ref/IMG_2553 · 2554 · 2556 · 2557 · 2558 · 2559 · 2560`

## Why it went there — and why there are two tickets

`ColumnBrowserStackMode` took **one navigation rule** out of eight reference screenshots and filed
it. kol-ds-ui built exactly that rule in 0.195.0, correctly, and it shipped thin. The user, on
seeing it: *"kinda underwhelming… did you even look at the refs?"*

He was right and the fault is in the spec. The references are **five views and a chrome constant
across all of them** — list, list-expanded, grid, media player, image viewer, with search pinned
above and a floating tab pill below. A spec that describes behaviour and not substance gets back
behaviour and not substance.

Two tickets rather than a revision: the first has a build against it and two live defects, and those
fixes should not queue behind a seven-item design scope.

## What went

- **The row is four zones** — disclosure with its own tap target, a 44 × 44 icon **or thumbnail**, name + meta, trailing overflow. 60px row, divider from zone 3. The build has three zones, a 14px glyph in a 20px slot, and DS Table padding sized for the glyph.
- **Meta is per-view and folders have their own** — `date · N items` in list, `N items` in grid. My item 5 said "size · date" flat, which is exactly why folders render bare: they have neither.
- **Thumbnails.** `COL_ICON` maps kinds to glyphs with no thumbnail path at all. On a media browser.
- **The grid view**, the **media player** and the **image viewer** — three views never specified.
- **Search pinned above the list**, and `···` carrying view mode + sort. Item 7 of the first ticket hid the toggles and put nothing in their place, so sort is currently unreachable on a phone.
- **The tab pill.** Filed with the user's ruling.

## The ruling that came out of this

**Browse · Files · Kinds as a bottom tab pill below `md`** — the answer to the library-wall question
the first ticket deliberately left open. Neither reference stacks two full-height surfaces; both give
each surface a tab. This app has exactly three. It is also why the FILES wall currently renders as an
empty filter bar under the folder list: two surfaces in one scroll, and the second is empty because
the first is the one you are looking at. Desktop untouched — the 2026-08-26 one-view ruling stands.

## Left open, and stated as the user's

1. **Where thumbnails come from.** R2 and B2 serve originals; in-browser transforms are `ARCHITECTURE §N`. A 44px thumbnail that pulls a 2 MB JPEG is a different problem. Paid Image Resizing is parked with a trigger — this may be it.
2. **Item counts, computed or passed.** O(n) per folder against 3443 objects, versus a `folderTree` this repo already passes with files and bytes per folder. Probably a seam.
3. **Whether the two viewers become the DS's** — they are the consumer's via `onQuickLook` today.

## What stays here

Nothing. No stopgap was written and none should be; the phone surface is what it is until the mode
lands. **Owed from here on return:** the 390 × 844 measurement, as with the first ticket — that is
the arrangement that caught both of its defects.

## ↩ FOLLOW-ON — 2026-09-04 · the seams do not reach the page

Bumped to component 0.207.0 / theme 0.145.0 / icons 0.27.0. Items 11, 12 and 14 are in the source;
**items 10 and 13 render as if they never shipped**, because `thumbnailFor` and `folderMeta` are
props of `ColumnBrowser` and `MediaLibraryBrowse` neither accepts nor forwards them. This app renders
`MediaLibrary variant="browse"`, so there is nowhere to hand them a thumbnail or a folder count.

Same shape as `settingsFooter` in `BrowsePageRulingsAndSeams` — the organism carried the slot and the
page hardcoded past it. Appended to their entry with the ask (two words in the signature, two in the
`<ColumnBrowser>` call) and a note that the page's whole prop list is worth a sweep rather than a
third one-off fix.

Also confirmed still open on 0.207.0: **D1** (`:576` still reads "nothing recursive here") and **D2**
(`:582` still passes `o.uploaded` raw) — both on the `ColumnBrowserStackMode` ticket.

## ✅ RETURNED — 2026-09-04 · @kolkrabbi/kol-component@0.213.0

All seven items. 10-14 shipped in 0.204.0/0.207.0 (four-zone row, thumbnails, disclosure as its own target, folder + grid meta, grid view) — with items 10 and 13 shipped-but-UNREACHABLE until 0.209.0, because MediaLibraryBrowse never forwarded thumbnailFor or folderMeta and the props gate stayed green while the deployed build rendered as if neither existed. Item 15: search pinned above the list below md, filtering the KEY SPACE so the tree still navigates and no flat results view had to be minted; a ··· carrying the stack view and the sort keys, tapping the active key flipping direction. Sort was unreachable on a phone since item 7 hid the desktop cluster. Item 16: MobileTabBar, the floating bottom pill — what a tab MEANS is the consumer's, so it ships the shape and takes a list rather than the DS deciding a media library has three surfaces; TABBAR_H is published so a list does not hardcode the room it owes. Both pages take tabs/activeTab/onTabChange, and above md nothing renders. Two seams it forced: MenuItem caret (an icon trigger is complete without one) and sortObjects as a pure module function, where name is the tiebreak in every mode so equal sizes do not reshuffle between renders. The three 'still to rule' items were never assumed — two became seams (thumbnailFor, folderMeta) and the viewers stayed the consumer's.

**Remainder here:** bump and measure at 390 — wire tabs to your three surfaces
