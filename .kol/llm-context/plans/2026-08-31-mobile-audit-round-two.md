# Mobile audit — round two (2026-08-31)

Source: 27 iPhone/Safari screenshots of **production** (kolkrabbi.io), taken 2026-08-30 ~23:08–23:17,
plus the user's own prose list. Everything below is **report-only** until he gives a go per item.

Verified = confirmed in source or measured in a browser. Read = my reading of a screenshot, unconfirmed.

---

## A. The overflow question — ANSWERED 2026-08-31, and the theory was wrong

**Measured on production at 390×844.** `scrollWidth == innerWidth` on `/`, `/work`, `/workshop` and
`/foundry/typefaces/root`. **No route overflows the document.** The unbreakable-tag-token hypothesis
is dead; the tag row is a real defect (C1) but it was never setting the page width.

The clipping had two unrelated causes:

- [x] **A1 — iOS auto-zoom, filed as a DS ticket.** The newsletter mail field computes 14px, and
      Safari zooms the page on focus of any sub-16px input and never zooms back — so every shot after
      that tap is a zoomed viewport. Traced to `Input.jsx:49`, `SIZE_TYPE = { sm: kol-mono-12,
      md: kol-mono-14, lg: kol-mono-16 }` with `md` the **default** — every input in every KOL
      consumer, not ours. Filed `InputTypeScaleZoomsIOS`; **deliberately not patched locally**, a
      `pointer: coarse` override here would fork the type scale for one app.
- [x] **A2 — one genuine overflow, and it is not the document.** `/workshop`'s `main` is
      `overflow-x: auto` at client 342 / scroll 372, because
      `grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]` forces a 352px minimum track into a 302px
      column. **FIXED** — `minmax(min(22rem,100%),1fr)` in `WorkshopIntroduction.jsx:46` and
      `EmbedOverview.jsx:27`. Build green.

## B. Confirmed in source

- [ ] **B1 — ContentFilters title↔icons gap is fixed.** *(His report. I first misread this as the
      facet-column gap — that is B1b below, a different thing.)* `ContentFilters.jsx:322` sets `gap-6`
      (24px) around the vertical divider, and the title span at `:334` carries an extra `pr-4` (16px).
      Title text edge → divider = **40px**; divider → first icon = 24px. No breakpoint variant on any
      of it. **Note:** the `pr-4` is ours — added by the `ContentFiltersTitleGap` ticket 2026-08-27 to
      balance the divider at desktop. It is what makes mobile tight. **DS ticket.**

- [ ] **B1b — ContentFilters facet-column gap is also fixed.** `gap-16` (64px) on both the outer row
      and the inner group row, `:460-461`, no breakpoint variant — 64px between CATEGORY and YEAR at
      390px. Mine, not his; fold into the same ticket as B1.

- [ ] **B2 — Print detail overlay hides its images below `lg`.** `PrintDetailOverlay.jsx:291` declares
      grid columns only at `lg`; below that it is one column, two rows. The media row's image is
      `absolute inset-0` inside a `flex-1` box (`:296-297`) so it contributes zero intrinsic height —
      the row collapses to the thumbnail strip, the only thing in flow. **Local fix:** a definite
      height on the media column below `lg`. The thumbnail strip and the ←/→ stepper already work, so
      that alone restores the gallery in place. No overlay-on-overlay, no tabs.

---

## C. Reported, cause not yet established

- [ ] **C1 — Fonts fall back to system sans on specific elements.** Not global: headings render in the
      condensed face and body in mono correctly, while the tag row and the "Studystack" section title
      render in system UI sans. Same elements as the concatenation defect in A — likely one component,
      not two bugs. Identify the component before filing.

- [x] **C2 — FILED as `TagModeOverlayIgnoresQuery`.** Traced end to end: `ShellLayout:393` swaps the
      body for `TagModeOverlay` on commit, and that component never reads `tagMode.text` — `:31`/`:35`
      filter by chips only, `:88` computes the cloud over the entire inventory, `:118` gates document
      rows on chips rather than query. Zero keyword rows by construction. Original note follows.
- [ ] ~~**C2 — Workshop search returns tag rows, not keyword results.**~~ The engine is NOT tags-only:
      `kol-workshop/src/engine/search.js:19-35` matches label / tags / headings / keywords via
      substring. So what renders (rows like `project/kol-monorepo 85` with counts) is a tag-frequency
      list, not the engine's output. **Open:** read `ShellSearchOverlay` to see whether the item
      results are absent, or present but pushed out of view by the same overflow as A.
      Also: the results panel was clipped on the left in that shot.

- [x] **C3 — FIXED.** Measured: `SectionHero` is `h-[50svh]` at `top:0` under an opaque 68px bar — 68 of 422px. No `--kol-nav-h` token existed anywhere, so nothing could reserve it; minted one in the app's `tokens.css` (68px verified identical at 390 and 1280) and the three call sites take `mt-[var(--kol-nav-h)]`. Original note follows.
- [ ] ~~**C3 — Heroes sit under the fixed navbar.**~~ Real instance: the foundry typeface page
      (`/foundry/typefaces/:slug`) — hero banner sliced at the top. **Not** instances: `/prints` and
      `/work/:slug` — a later at-rest shot shows `/prints` fully clear of the navbar with a correct
      gutter, so those two were mid-scroll, not defects.

- [x] **C4 — FIXED.** Never disabled: scrolling up does set `translateY(0)`. But `Navbar.jsx:125` gated opacity on `isHovered || isMobileMenuOpen || lastScrollY < innerHeight`, so past one viewport only a hover could restore it — and a touch device never hovers. Opacity now follows `isVisible`. Original note follows.
- [ ] ~~**C4 — Navbar scroll-up-to-reveal is gone.**~~ It now sits on top permanently. Behaviour
      regression; source not yet read.

- [ ] **C5 — Studio about card crops its graphic.** The portrait renders as a letterbox strip, cutting
      the face. User reports the same component behaves correctly on home, and that the featured card
      item loses its graphics entirely on studio. **Verify the "same component" claim first** — shared
      variant names have not meant shared treatment twice this month.

---

## D. Noted, not yet raised by him as bugs

- [ ] **D1** `/prints` filter panel: the YEAR facet stacks 14 chips into a full-screen column on mobile.
- [ ] **D2** Home instagram section: an image runs off the right edge; large vertical void beneath.
- [ ] **D3** Listing card excerpts truncate to a single line with an ellipsis at mobile width
      ("A quiet, considered …"). ~~May be intended.~~ **Superseded by C6 — the truncation is a symptom,
      not the bug.**

---

## C6 — Listing card height is content-driven; it should be image-driven *(user, 2026-08-31)*

**His ruling, not a question.** The `/work` list card grows taller as its content grows — five tag
pills wrap to five rows and the card follows. The height should be **a function of the image**, full
stop, and content should fit inside that.

His two candidate levers: **shrink the image** on mobile, and/or **hide the tags** on mobile. Either
is his call, not mine to pick unilaterally — but the constraint is fixed: content never sets the height.

`ContentRow variant="showcase"` in `kol-component`, so **DS ticket**. Do not solve it with a local
`max-height` — that clips content instead of fixing the ratio contract.

- [ ] **C6a** Read `ContentRow`'s box for `showcase` — establish whether a ratio already governs the
      media column and the row is simply letting the text column out-grow it.
- [ ] **C6b** Decide the mobile lever with him before filing. The ticket carries final values, not a
      restructure — the 08-30 arc cost six round-trips to that exact lesson.

---

## Open questions for the user

1. ~~**C5** — production only, or locally too?~~ **Answered 2026-08-31: "dunno, figure it out."** Mine
   to establish — reproduce both and report which.
2. ~~**D3** — is the truncation intended?~~ **Answered — wrong question.** See C6.
3. ~~Are the 27 the complete set?~~ **Answered: yes, complete.** But he is explicitly not confident I
   have accounted for everything in them, so a screenshot-by-screenshot sweep against this list is
   owed before any fix pass starts — the gap is mine to close, not his to re-report.

---

## Standing constraints for this arc

- A defect inside `@kolkrabbi/*` chrome is a **ticket to kol-ds-ui**, never a local override.
- Sanity-backed routes (`/work`, `/stack`) verify against production — the local dev port is not in
  Sanity's CORS list and renders them empty.
- Nothing is edited until he gives a go on that item.

---

## Parked until the review is over *(user, 2026-08-31)*

- [ ] **Bigger buttons in the CARDS, not the card items.** The `View Project` CTAs inside the
      big `TiltBento` highlight cards are hard to press on a phone; the small `SectionCards`
      feature items are fine as they are. His words: *"Id like to see bigger buttons in the
      cards, not the card items… although it can wait."*
      Context: `ButtonGroup`'s gap is a fixed `gap-4` (16px, `ButtonGroup.jsx:35`, no
      breakpoint variant), and the DS's `MobileTouchFloor` ruling (2026-08-26) is *no type
      floor, 24px hit floor, drawn size never moves* — so drawing a bigger button on mobile
      is a change to that ruling, not just a size tweak. Raise it as a DS question, not a
      local override.

---

## E. Workshop search overlay — found 2026-09-01, all four measured, none fixed

The DS's `TagModeOverlayIgnoresQuery` fix works: a query now returns rows and
`No documents match "bingo"`. These are four *new* defects on the same overlay.

- [ ] **E1 — the search input triggers iOS auto-zoom.** Measured `font-size: 14px`.
      `InputTypeScaleZoomsIOS` (kol-theme 0.112.0) keyed its 16px coarse-pointer floor
      on `.kol-control input` / `.kol-expand input` — but `SearchInput`'s field is
      `min-w-0 flex-1 bg-transparent border-none outline-…`, **not** a `.kol-control`,
      so the rule misses it entirely. This is a gap in that fix, not a new class of
      problem. **DS ticket**, and worth flagging as such — the floor was reported as
      covering every field.

- [ ] **E2 — cannot dismiss by tapping outside. CONFIRMED BUG.** `ShellSearchOverlay`
      does wire `onClick={onClose}` on `.kol-overlay-scrim` (`:137`), and the scrim
      does cover the viewport (measured 0,0 → 390×700 with the panel at 16,140 →
      358×532, so there is real backdrop to hit). Tapped at (195, 70) with touch
      emulation: **overlay still open.** A click handler that a tap does not fire —
      likely needs a pointer/touch listener rather than `onClick`, or the scrim is
      being swallowed. **DS ticket.**

- [ ] **E3 — background blur is unwanted.** `.kol-overlay-scrim` computes
      `backdrop-filter: blur(1px)` over `rgba(0,0,0,0.6)`. User does not want it.
      A 1px blur is doing very little for the cost of a compositing layer on a phone.
      **DS ticket** — it is theme chrome, not ours to override.

- [ ] **E4 — result rows need padding.** User's report. My measurement of the expanded
      panel put the tag rows at a 20px inset from the panel edge, which does not match
      what his screenshot shows for the `Clear filters` / `No tags` /
      `No documents match` rows — those read flush. **Not yet reproduced; measure the
      status rows specifically, not the tag rows, before filing.**

**None of these are filed yet.** E1–E3 are measured and ready to write up; E4 needs one
more measurement first.
