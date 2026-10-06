---
name: no-fable-subagents-pin-model-explicitly
description: "Never spawn Fable subagents — every Agent call passes an explicit model (haiku for mechanical work, sonnet for judgment); inheritance smuggles Fable in"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7d307b9f-1c1e-498e-943b-4132e158439a
  modified: 2026-08-15T03:21:01.091Z
---

The user has a standing order: no Fable subagents. On 2026-08-15 four adoption agents were spawned with no `model` override on the catch-all `claude` type, which has no definition file and therefore inherits the session model — the session ran Fable 5 (his statusline label), so the subs ran Fable against the order.

**Why:** Fable subs burn cost he explicitly declined; "no override" is not "not Fable" when the parent is Fable. Self-reported model lines stamped into context are not proof — his statusline reads the live session setting.

**How to apply:** Every Agent spawn passes `model` explicitly — `haiku` for mechanical/adoption/sweep work, `sonnet` for judgment passes (the five `kol-*-agent` definitions already pin sonnet). Never rely on inheritance. Related: [[publish-split-npm-mine-git-his]].
