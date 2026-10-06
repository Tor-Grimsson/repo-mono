---
name: tags-are-interactive-only
description: "Tag component = interaction token — its states signal clickability; no interaction → no Tag (use doc-role text/Badge). When a Tag IS used: size defaults sm (not md), variant defaults PRIMARY."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e0c0afe3-1c75-4765-84f2-e062fea1bb87
  modified: 2026-07-30T00:06:54.909Z
---

Used DS Tags as static decoration on the brand /review cards; user law in response (2026-07-29): "tags have states indicating an interaction, if there isn't anything to interact with — don't use a tag. furthermore, default to sm, not md, furthermore USE PRIMARY."

**Why:** Tag's states (rest/active/removable) exist to signal and drive filtering. A non-clickable Tag is a lie in the UI — it promises interaction that isn't there. Static category markers belong to doc chrome (`.kol-doc-eyebrow` etc.) or Badge.

**How to apply:** before reaching for Tag, ask "what happens on click?" — no answer, no Tag. When one IS warranted: `size="sm"` and primary variant are the defaults, same spirit as [[buttons-never-default-to-outline]].

**The static case has its own element: Pill.** Don't downgrade to raw text (a second correction the same day) — `Pill` from `@kolkrabbi/kol-component` IS the label chip: `variant` outline|subtle|inverse, `size` sm|md|lg. Static category/status markers → `<Pill size="sm">`. Chip sizing law across the family: **sm, not md**. Related: [[doc-roles-exist-check-before-authoring]].
