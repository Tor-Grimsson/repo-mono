---
name: undeployed-means-unpushed
description: "In kol-website \"undeployed\" = not committed+pushed to main; Vercel is git-connected so push IS deploy — never split the two in status reports"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 14e68669-c307-4413-b988-96d2e43f5918
  modified: 2026-08-24T19:23:01.603Z
---

"Undeployed" in this repo's logs and status lines means **not yet committed and pushed to `main`**. Both Vercel projects (web, brand) build from `main`, so a push is a deploy — there is no separate deploy step and no state where something is committed but not live.

**Why:** 2026-08-24 the agent drew a line between "not live on Vercel" and "not committed" ("I never run git so I don't know what's committed"). User: "that's a non-starter, they are linked, you can not do one without the other." The distinction read as evasion, not precision.

**How to apply:** Report it as one state — "uncommitted/unpushed since <date>". A lobby ticket asking for a "redeploy" is asking him to push. Still never run git ([[publish-split-npm-mine-git-his]]); the wording changes, not the boundary.
