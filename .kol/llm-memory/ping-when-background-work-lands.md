---
name: ping-when-background-work-lands
description: Send a push notification when background work finishes or the arc blocks on the user
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 46638038-4a36-4d11-ae1f-3a0046131471
  modified: 2026-07-28T08:56:29.929Z
---

When a background stage completes (agents, publishes, long builds) or work halts waiting on the user's pick/go, send a PushNotification — don't just leave the report in the terminal.

**Why:** User: "you forgot to ping me" (2026-07-28) after the kol-component publish round finished without a notification while he was away.

**How to apply:** End long-running or backgrounded arcs with a PushNotification (short: what landed, what's waited on). Not needed when he's actively in the conversation. See [[publish-split-npm-mine-git-his]].
