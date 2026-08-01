# lobby — kol-website

Intake queue for **kol-website**: content and UI issues.
Not documentation — a work queue, deliberately outside `docs/`.

**This file is the ledger. The ledger is the truth, never a raw `ls`.**

| | |
|---|---|
| file one | `clip-drop.sh --kol-website NAME` · `/lobby-web` (from any repo) |
| read it | `/lobby-list` · `bin/lobby` · `prefix Ctrl+K` |
| the spec | `~/.dotfiles/docs/operations/systems/lobby/` |

## States

| | state | means | lives in |
|---|---|---|---|
| 🔵 | `filed` | captured, unread | `inbox/` |
| 🟡 | `read` | understood — the row below restates it | `inbox/` |
| 🟠 | `addressed` | a change shipped that is *meant* to close it | `inbox/` |
| 🟢 | `closed` | met the bar; resolution appended | `done/` |
| ⚪ | `parked` | deliberately not-now, reason recorded | `archive/` |
| 🔴 | `needs-ruling` | **flag, not a state** — blocked on the user's call | wherever it is |

**`read` is never `closed`.** Understanding a ticket ships nothing.
**Bar for 🟢 closed in this repo:** the user confirms it.
Open · closed · stale · parked is the **user's call** — never the agent's.

## Queue — 1 entry

| | Entry | About | Staged | State |
|---|---|---|---|---|
| 🟠 | [ShowSansItalicDisplay](inbox/ShowSansItalicDisplay.md) | Show Sans Italic Display — type/specimen issue | 2026-07-30 | `addressed` 2026-08-01 — shipped at `apps/brand/src/pages/Brand.jsx:265`, chapter 07 of `/brand`: the page's own pangram at `.kol-prose-display-md`, one word on Tailwind's `italic`. Verified computed *Right Grotesk Narrow · 64px · italic · 500*. **Not closed — the bar here is the user's confirm** |

## Closed

_(none yet — entries land in `done/` with a `## ✅ RESOLUTION — <date>` section)_

## Archived

_(none yet — ownership, deferral and context notes land in `archive/`)_

## Filed elsewhere

Tickets this ledger does **not** govern — each row names the destination ledger that
does. The **Remainder** is this repo's to do; the state is theirs to report.

| | Receipt | Destination | Last known | Remainder here |
|---|---|---|---|---|
| 🟢 | [MediaLibrary](outbox/MediaLibrary.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-01 | **`none` — remainder DONE 2026-08-01.** `Library.jsx` rebuilt on `<MediaLibrary variant="page" client={mediaClient} />`; `LibraryFolder.jsx` + `/library/:folder` + the 3 sidebar children retired to `_tmp/brand-medialibrary-elder/` |
| 🟢 | [MediaLibraryVideoFallback](outbox/MediaLibraryVideoFallback.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-01 | **`none` — remainder DONE 2026-08-01.** Both apps on component `^0.21.0` + theme `0.19.0`; build 3/3, 0 console errors. Verified live at `/library` → `video/`: **10 fallbacks for 10 tiles**, each a play glyph + filename at `opacity 1`, `data-painted="false"` — no blank grey boxes left. Your `#t=0.1`-in-real-Chrome item is now **non-blocking**; resolving it only decides whether a poster frame appears *as well* |
| 🟢 | [ButtonIconOnlyParity](outbox/ButtonIconOnlyParity.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-01 | **`none` — both items DONE 2026-08-01.** Bumped (now riding component `0.21.0`), and **the A/B is resolved: the Button won, the IconFrame-in-a-bare-`<button>` was deleted.** Sizes were identical, so the pick was states — a collapse toggle is a click target and `IconFrame` ships hover/active/focus-less by design. Kept round via the new `radius="full"`; one element replaces a button wrapping a frame. Verified: one control, collapse round-trips 256↔56, `data-sidenav` + localStorage persist, build 3/3 |

## History

| Date | Event |
|---|---|
| 2026-07-30 | lobby created; `ShowSansItalicDisplay` filed |
| 2026-07-31 | restructured: entries moved to `inbox/`, this INDEX became the ledger, emoji states adopted, the orphaned `ShowSansItalicDisplay` row backfilled |
| 2026-08-01 | **`ButtonIconOnlyParity` receipt backfilled** — it was filed to kol-ds-ui the same day and sat in their inbox with no record on this side at all, so nothing here knew this repo was waiting on it. Found by `/lobby-list`'s receipt-drift check |
| 2026-08-01 | **`MediaLibrary` remainder executed** — the swap landed, so its row drops from 📌 to 🟢 with `Remainder here: none`. `ShowSansItalicDisplay` → 🟠 `addressed`; it stays in `inbox/` because closing it needs the user's eyes |
| 2026-08-01 | **`MediaLibraryVideoFallback` returned 🟢** — kol-ds-ui shipped the fallback whole in component **0.21.0** + theme **0.19.0**, loading strategy untouched as the brief demanded. Remainder 📌: the version bump |
| 2026-08-01 | **`ButtonIconOnlyParity` returned 🟢** — kol-ds-ui shipped component **0.20.0** + theme **0.18.1**: both glyph ladders now live in one module, so the A/B pair renders identically. Its remainder is 📌 open here — the version bump, then the drop-one call |
| 2026-08-01 | **`ButtonIconOnlyParity` remainder half-executed** — both apps bumped to component **0.20.1** + theme **0.18.1** and verified (build 3/3, the A/B pair measured identical at 16×16 in 28×28). Its row stays 📌: the drop-one call is the user's and both controls are still in the file. ⚠ The ledger row named `^0.20.1` while `0.20.0` was the newest at install time — **0.20.1 landed mid-task**, carrying the `Input` glyph ruling |
| 2026-08-01 | **`MediaLibraryVideoFallback` remainder executed** — both apps to component **0.21.0** + theme **0.19.0** (the pair must move together; the fallback's `.kol-media-thumb-fallback` chrome is theme-side). Verified live: 10 of 10 video tiles now show glyph + filename. Its **duplicate row was removed** in the same edit — a stale 🔵 `filed` had survived the return alongside the 📌 |
| 2026-08-01 | **`ButtonIconOnlyParity` fully closed** — the A/B was resolved rather than left parked: Button kept, `IconFrame` control deleted from `SideNav.jsx`, on states not size. **`outbox/` now owes nothing** — all three tickets filed from here today returned and are consumed. Every stub's superseded `Remainder here:` line is marked as such, so a grep no longer reads the filing-time prediction first |
| 2026-08-01 | `outbox/` created and **Filed elsewhere** added — the section was missing, so a receipt returned from kol-ds-ui would have had nowhere to land. `MediaLibrary` receipt written straight to `✅ RETURNED` (it predated the receipt convention); remainder is open |
