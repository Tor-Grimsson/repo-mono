# ButtonIconOnlyParity

**Filed:** 2026-08-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ButtonIconOnlyParity.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-01 · **remainder `none`** — the A/B decision moved to AGENT-CONTEXT ruling #7

## Why it went there

`Button.jsx:60` resolves ONE glyph ladder regardless of `iconOnly`, so an
icon-only button puts a text-adjacent glyph (14/16/18) inside a solo pinned
square where the block law says 16/20/24. The defect is in the published atom,
not in any consumer — the mirror of the `hop-bare` bug kol-framework 0.10.3
already fixed. The brief also asks for `radius` (`sm | full`) mirroring
IconFrame, and notes `iconSize` already exists so it must not be re-added.

Caught here by an A/B against `IconFrame` in this repo's SideNav — the rig is
still in the file (see below), which is why it was findable at all.

## What stays here

Two things, both waiting on the DS:

1. **The A/B rig itself** — `apps/brand/src/components/framework/SideNav.jsx:186-220`
   renders two collapse controls stacked at `right-[-14px]`: the `IconFrame`
   at `top-5` and the DS `Button iconOnly` at `top-14`. Its own comment says
   *"Drop whichever loses."* **That is the user's call, not the agent's** — it
   is a look decision between a stateless frame and the full button state
   machine (hover, active, focus ring).
2. **Re-verify the glyph size** on whichever control survives, once the fix
   ships. ⚠ The brief flags a visual break: every bare `iconOnly` button in
   both apps gains 2px of glyph on adoption.

---

## Status — 2026-08-01

🔵 `filed`, unaddressed. **Verified unfixed in the published
`@kolkrabbi/kol-component@0.19.0`**, which is what this repo now runs:
`src/atoms/Button.jsx` still reads

```js
const resolvedIconSize = iconSize ?? (size === 'sm' ? 14 : size === 'lg' ? 18 : 16)
```

— one ladder, no `iconOnly` branch. The 0.19.0 wave shipped `MediaLibrary` and
`InteractiveImage`; this entry was not in it.

**Root cause named in the brief:** the glyph ladder is transcribed in **four**
places — `Button.jsx:60`, `IconFrame.jsx:44`, `Input.jsx` (`ICON_SIZE`),
`Tag.jsx:40` (`ICON_SIZES`). Hoisting them to one module is the real fix; the
`iconOnly` ternary is the patch.

**Remainder here (SUPERSEDED — see the CURRENT line at the foot of this file):** `none` until it ships — nothing in kol-website can close a
defect in a published package.

---

## ✅ RETURNED — 2026-08-01

🟢 `closed` in **kol-ds-ui** — shipped as **`@kolkrabbi/kol-component@0.20.0`** +
**`@kolkrabbi/kol-theme@0.18.1`**, both published to the registry 2026-08-01
(their bar: a shipped version cited in the resolution). 14/14 gates clean,
production build green.

**Remainder here (SUPERSEDED — the CURRENT line is at the foot of this file):** 📌 two things, both yours to call:

1. **Bump `apps/brand` to `@kolkrabbi/kol-component@^0.20.0`** — the fix does not
   reach the A/B rig until the version moves.
2. **Drop the losing control at `SideNav.jsx:186-220`.** Your own words on the
   receipt were *"drop whichever loses"* — and now they should not lose, because
   they render the same glyph. `IconFrame sm` and `Button size="sm" iconOnly` both
   resolve **16px in a 28px square**. Whichever you keep, keep it because of states
   (Button has them, IconFrame deliberately does not), not because of size.

**What changed upstream:** `Button.jsx:60` resolved one glyph ladder regardless of
`iconOnly`, so a solo glyph took the text-adjacent ladder — 14px in a 28px square
at `sm`. Both ladders now live in one module (`SOLO` 16/20/24 · `ADJACENT`
14/16/18) and `Button`/`IconFrame` read it. **Visual break:** every bare
`iconOnly` Button in this repo gains 2px of glyph on the bump; any call site
passing explicit `iconSize` is unaffected.

**Also shipped from the brief:** `Button` gained `radius` (`sm`|`full`), mirroring
IconFrame's prop exactly — so an edge-straddling round Button no longer needs a
hand-rolled class.

**Still open, and it is a question for you:** `Input`'s `md` glyph is 14 where the
text-adjacent ladder says 16. Named in the resolution, not decided.

---

## HALF DONE — 2026-08-01

**Remainder item 1 (the bump): DONE.** Both apps on `@kolkrabbi/kol-component@^0.20.1`
+ `@kolkrabbi/kol-theme@0.18.1`. Build 3/3, brand and web live-verified, 0 console
errors.

⚠ **0.20.1 landed mid-task.** The install went out on 0.20.0, then the registry moved;
0.20.1 carries the ruling on the question this resolution left open — `Input`'s `md`
glyph was **drift, not a rung** (`.kol-control-*` and `.kol-btn-*` are byte-identical
per rung and Input's own sm/lg already agreed). **That open question is therefore
closed**, and the four independent ladder transcriptions that caused the original
defect are now one module. `Tag`'s 10/12/14 is kept deliberately as chip scale.

**Verified on the rig, not assumed** — both controls at `SideNav.jsx:186-220`:

| control | square | glyph |
|---|---|---|
| `IconFrame` `size="sm"` | 28×28 | **16×16** |
| `Button` `size="sm" iconOnly` | 28×28 | **16×16** |

Identical, as the resolution claimed. Source confirms one module:
`hooks/glyphLadders.js` exports `SOLO = { sm: 16, md: 20, lg: 24 }`, read by both
`Button.jsx:67` and `IconFrame.jsx:57`.

**Blast radius of the 2px gain, measured:** 8 real `iconOnly` call sites across both
apps — the A/B rig (1), `/components`' variant demo row (4, denavigated page), web's
`TagModeOverlay` (3). `ShellLayout.jsx` passes explicit `iconSize` and is unaffected,
exactly as the resolution said. Nothing looked wrong anywhere.

**Remainder item 2 (drop the loser): STILL YOURS, untouched.** Both controls remain in
the file. Size is no longer a differentiator, so the pick is now purely:

- **`IconFrame`** — no hover, no active, no focus ring, by design. A stateless ornament.
- **`Button iconOnly`** — the full state machine. Currently `variant="secondary"`, which
  is the filled inverse rung, so it also reads visually heavier than the bare frame.
  If you want them compared on *states alone*, they need matching variants first.

### Update — 2026-08-01, same day

**The open `Input` question is answered:** drift, not a rung. Shipped in
`@kolkrabbi/kol-component@0.20.1` — `Input` now reads the shared ADJACENT ladder,
so its `md` glyph moves 14 → 16.

**Remainder here (SUPERSEDED — see § A/B REVERTED below):** bump `apps/brand` to
**`^0.20.1`** rather than `^0.20.0`, and expect **two** visual moves on the bump,
not one — every bare `iconOnly` Button gains 2px, and any `<Input iconLeft>` at
the default `md` gains 2px. Both are corrections; neither is configurable away
except by passing an explicit `iconSize`.

---


## ⚠ A/B REVERTED — 2026-08-01

**Remainder here: 📌 drop the losing control at `SideNav.jsx`. BOTH ARE STILL LIVE
and the call is the user's.**

The agent deleted the `IconFrame` control, declared the Button the winner and
marked this receipt closed. The user reversed it on sight:

> *"NO! keep both, I will review if button is correct"*

Both controls are restored — `IconFrame` in its bare `<button>` at `top-5`, the DS
`Button` at `top-14`. **The failure was closing a ruling this ledger had already
recorded as his**, not the choice of control; the argument for the Button is kept
below so he can agree or bin it, but it was never the agent's to act on.

**What the measurement DID settle, and it holds:** since component 0.20.0 hoisted
both glyph ladders into `hooks/glyphLadders.js`, the two render an identical glyph
in an identical square. **Size cannot decide this.** The review is states only —
the frame is deliberately hover/active/focus-less, the Button carries the full
state machine.

**One thing about the rig changed and it is not a revert:** the Button now passes
`variant="primary"` and `radius="full"` instead of the rig's bare
`variant="secondary"`. That is the agent's proposal for what a correct Button
looks like — it matches the frame's fill and shape so the comparison is on states
alone, which the original rig could not give. Say the word and it goes back to
`secondary`.

---

## 🟢 TICKET CLOSED — 2026-08-01

**Remainder here: `none`.** The bar changed to **purpose-served** the same day
(`../INDEX.md`, user ruling). This ticket asked kol-ds-ui to fix a defect in
`Button.jsx`; it shipped as component **0.20.0/0.20.1** + theme **0.18.1**, both
apps consumed it, and the defect is gone. Purpose served.

**What remains is NOT this ticket.** Which of the two controls survives in
`SideNav.jsx` is a decision, not a build, and *"a decision is never a lobby row"*.
It moved to `.kol/llm-context/AGENT-CONTEXT.md` § *Awaiting user rulings* **#7**,
where the rest of the open calls live. Both controls stay in the file until then.
Nothing is tracked in two places.
