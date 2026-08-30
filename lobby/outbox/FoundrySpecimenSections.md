# FoundrySpecimenSections — last three specimen sections + their cards up to the DS; five slug-page package fixes

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FoundrySpecimenSections.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-foundry 0.8.0 · kol-component 0.97.x · kol-theme 0.66.0; remainder executed here 2026-08-27 (bumped, `TypefacePage` imports the three from the package, `ui/Feature*` + `ui/Pairing*` + the `ui.css` foundry rules → `_tmp/2026-08-27-foundry-specimen-sections/`)

## Why it went there

Ruled on the Málrómur slug page in one pass: `FoundryOpentypeFeatures`,
`FoundryTypefaceDetails`, `FoundryTypefacePairing` are the fork's last three
(never in kol-foundry); their cards (`ui/FeatureCard`+`FeatureGrid`,
`ui/PairingCard`+`PairingsList` + `ui.css` rules) should be the family's —
text-only `SectionCardItem` and a kol-foundry `PairingCard` on the typeface
row voices. Plus five package defects: double dropdown on a roman-only face,
full-ink glyph cell outline, missing glyphs not dimmed, variable-font frame,
`ContentFilters` title gap 8 vs the header's 16.

## What stays here

Done locally today, kept until the return: image-wrapper borders off
(`TypefacePage.jsx` ×4); `PairingCard` on the ruled voices + 96px divider;
`FeatureGrid` persistent selected state removed (hover only). The three
sections + four `ui/` cards + the `ui.css` foundry rules keep rendering.

## Remainder here once it ships

bump kol-foundry + kol-component; `TypefacePage` imports the three sections
from the package; retire `ui/FeatureCard`, `ui/FeatureGrid`, `ui/PairingCard`,
`ui/PairingsList` and the `.foundry-title` / `.pairing-card` / `.feature-card`
rules in `ui.css` → `_tmp/`; eyeball the slug page top to bottom

## ✅ RETURNED — 2026-08-27 · kol-foundry 0.8.0 · kol-component 0.97.0 · kol-theme 0.66.0

(A) FoundryOpentypeFeatures · FoundryTypefaceDetails · FoundryTypefacePairing are in kol-foundry with the site's data as defaults (props override). (B) SectionCardItem renders text-only with no visual — the .feature-card frame + hover verbatim (kol-card-feature--text: fg-08 frame, 1% wash + 24% frame on hover, 300ms, hover only), no 96px icon; both sections are rows of it. PairingCard is a kol-foundry molecule on the ruled voices (tag kol-mono-14 uppercase text-emphasis, description kol-mono-12 text-meta, 96px Divider, .kol-pairing-card chrome). (C) GlyphMetricsSection: the axis rides the weight slot only — one dropdown on a roman-only face. (D) cells wear border-fg-08, outline gone. (E) a glyph the parsed font lacks (charToGlyphIndex 0) renders text-fg-24, no click, no hover. (F) VariableFontSection plate: no border, surface-secondary. (G) ContentFilters title gap 16 from md. Rendered: 4 tiles at min-h 180 / fg-08 → 24% on hover / no 96 icons; 3 pairing cards with a 96px seam; 1 dropdown; cell border 0.08; 5 glyphs dimmed on the demo font; plate border 0 on surface-secondary; h2 gap 16px.

**Remainder here:** bump kol-foundry 0.8.0 + kol-component 0.97.0 + kol-theme 0.66.0; import the three sections from the package; delete ui/FeatureCard, FeatureGrid, PairingCard, PairingsList and the ui.css foundry rules (.foundry-title, .pairing-card, .feature-card)
