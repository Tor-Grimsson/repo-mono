---
name: publish-split-npm-mine-git-his
description: "npm publishing is Claude's job to run; git (commit/push/deploy scheduling) is always the user's"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 46638038-4a36-4d11-ae1f-3a0046131471
  modified: 2026-07-28T08:40:09.690Z
---

When a KOL package round-trip needs shipping: Claude runs the npm publish (e.g. `pnpm --filter @kolkrabbi/<pkg> publish --no-git-checks --access public` from kol-ds-ui) and the consumer bump+install; the user handles all git (commit/push) and deploy timing.

**Why:** User corrected "I will push git, you do the npm. cammon man you know this" (2026-07-28) after Claude handed him the publish command — past two-repo rounds always worked this split.

**How to apply:** Don't hand the user publish commands or wait for permission to publish a staged bump — publish, bump the consumer, settle the lockfile. Never run git; leave commit/push to him. See [[checkpoint-question-blocks-execution]] for the general go-gate.
