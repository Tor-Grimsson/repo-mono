---
name: buttons-never-default-to-outline
description: Button variant choices default to primary; never pick outline as a default — user has forbidden it repeatedly
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 45634ef4-6cd0-42ba-9199-e6f188fce185
  modified: 2026-07-27T22:45:30.103Z
---

When placing a KOL `Button` and no variant was specified, use `primary` (the DS default). Never reach for `outline` as a default.

**Why:** The user has said numerous times not to default to outline. Deriving a variant from surrounding visuals (e.g. matching a border-y legacy look) reconstructs appearance instead of intent — and when the surrounding visual is itself unsanctioned, it launders the violation into DS code.

**How to apply:** Variant unspecified → `primary`. Any other variant needs a stated reason from the user or the surrounding sanctioned pattern. Related: [[checkpoint-question-blocks-execution]].
