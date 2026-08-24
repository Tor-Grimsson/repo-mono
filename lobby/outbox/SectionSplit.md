# SectionSplit — the page-section anatomy, solved once

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplit.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — component 0.42.0 + theme 0.42.0

## Why it went there

Six hand-built heroes + five hand-built split-sections all ship the same
anatomy: media slot beside kicker · heading · body · actions, sometimes
flipped — every one re-deciding breakpoints, hover, and button variant.
That rebirth is why HomeFoundry's hover broke silently and why the Studio
hero sat unfixed for months. The anatomy is DS-tier; the brief names
HomeFoundry / StudioProcessCard / HomeAbout / HomeSignup / CtaGlobal as
reference implementations.

## What stays here

- **On ship: adopt** — the listed sections re-declare as content; the Studio
  hero is the first adopter; bespoke heroes (HomeHero) stay local.

## Return — 🟢 2026-08-15

Shipped in **`@kolkrabbi/kol-component@0.42.0`** + **`@kolkrabbi/kol-theme@0.42.0`**
(both registry-verified).

**Read the ask carefully first: no `SectionSplit` was built, on purpose.** The
anatomy you describe already ships as **`FeatureSplit`** — media slot beside
kicker / heading / body / actions, breakpoints and gap owned once. Building a
second one would have turned eleven hand-built sections into twelve
implementations, which is the opposite of the ask. `FeatureSplit` grew instead.

| You asked for | Status |
|---|---|
| Polymorphic media slot (img / video / interactive node) | already there — `media` is a ReactNode slot, so StudioProcessCard's ProfileCard drops straight in |
| kicker · heading · body · actions | already there — `kicker` / `title` / `body` / `ctas` |
| Text-only case (the /CONNECT band) | already worked — omit `media` |
| `flip` | **added** |
| Heading scale by size prop | **added** — `titleSize` |
| Media hover owned by the component | **added** — `mediaHover` |

**Your core design question is answered, and the answer is "you don't."** Per-site
type classes do not thread through the text contract — a consumer picks a ROLE
(`titleSize: 'heading-01'`) and the component emits exactly one type class.
Passing your own class in alongside would put two equal-specificity rules on one
element with sheet load order picking the winner, which is the cascade failure
ARCHITECTURE §5 exists for. `FoundryFeatureSection`'s `titleClassName` /
`descriptionClassName` defaults are the pattern to drop, not to port.

**HomeFoundry's broken hover is closed at its cause** — `mediaHover` is DS CSS on
the same 1.03 / 300ms / reduced-motion numbers as the CardFeatureItem zoom you
already have.

**Remainder here:** bump `@kolkrabbi/kol-component` to `^0.42.0` and
`@kolkrabbi/kol-theme` to `^0.42.0`, re-declare `HomeFoundry` · `HomeAbout` ·
`HomeSignup` · `StudioProcessCard` on `FeatureSplit` (map `imagePosition="right"`
→ `flip`, `titleClassName="kol-sans-heading-01"` → `titleSize="heading-01"`, the
TiltCard → the `media` slot with `mediaHover`), then retire
`components/sections/foundry/FoundryFeatureSection.jsx`. `CtaGlobal` is already a
DS organism — check whether your local band still needs to exist at all.

✅ **Remainder executed 2026-08-15 same session:** component ^0.43.0 + theme 0.42.0
(exact) bumped; HomeFoundry + StudioProcessCard re-declared on `FeatureSplit`
(flip corrected against source — media-left needs `flip`, the receipt's mapping was
inverted); FoundryFeatureSection retired to `_tmp/2026-08-15-anatomy-adoption/`.
Two deliberate deviations: **HomeSignup → `NewsletterBand`** (the DS ships this
exact centered form band; FeatureSplit's split contract doesn't fit) and
**HomeAbout untouched** — its media is a GSAP ScrollTrigger-pinned clip expanding
to 100vw/100vh, which FeatureSplit's fixed-aspect half-width frame would clip.
ConnectCta answered: it WAS the CtaGlobal source — now a 16-line copy-binding on
the DS import (kept as a file; 3 routes consume it). Build 3/3 green; eyeballs owed
on kicker casing + entrance-stagger deltas.
