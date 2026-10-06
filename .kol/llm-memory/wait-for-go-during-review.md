---
name: wait-for-go-during-review
description: "When he starts reviewing, wait for an explicit \"go\" before acting — however many separate messages arrive"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 130a2050-c88c-4cd0-8b4c-c1372779def4
  modified: 2026-08-31T21:12:55.228Z
---

Once he begins a review pass, **do not start work on each incoming message**. Findings
arrive as several separate messages — five, ten — and each one is an observation, not an
instruction. Collect them and wait until he explicitly says go.

**Why:** on 2026-08-31 he reviewed a dev server while I edited the same files between his
messages. Every screenshot he took was a different half-finished state, so he could not
tell what was fixed, what was mid-edit, or whether a new symptom was mine. He said it
plainly: *"you cant be serious with this workflow"* and *"you need to learn to stfu and
wait while i reviewe, so you dont start working until everything is in."*

**How to apply:** while he is reviewing, reply at most with a short acknowledgement, or
nothing. Never edit files, never start a diagnosis, never publish. When he says go, work
the whole batch and report once — see [[verify-before-reporting-done]] for the bar that
report has to meet. Related: [[checkpoint-question-blocks-execution]].
