---
name: checkpoint-question-blocks-execution
description: "A question in the user's message is a hard stop — propose the plan and WAIT for explicit go before any edit, even if the same message names the next task"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d74575bf-c808-4845-a750-0fe95984eb6e
---

When a message pairs a task with a question ("let's continue with /work — are we following a plan?"), the question makes the whole message a checkpoint: answer it, lay out the intended batch ("Here's my idea — … Sound good?"), and **stop for the go-ahead**. Do not treat the task half as permission to start editing.

**Why:** On 2026-07-15 the user asked "are we following a plan?" while naming /work as next; Grim answered and immediately made 3 edits + ran the build. User reaction: "WHY ARE YOU NOT STOPPING AND EXPLAINING AND ASKING FOR PERMISSION?!" — the question meant they wanted the plan surfaced and approved first.

**How to apply:** Read-only reconnaissance is fine while answering, but the first Edit/Write on project files waits for an explicit "go"/"sounds good" whenever the triggering message contained any question. Related: [[report-shape]] one-plan-not-a-menu rule in global CLAUDE.md.
