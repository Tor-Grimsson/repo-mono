---
name: bump-includes-receipt-remainders
description: "Update packages" includes executing the receipt remainders — adoption work follows the bump without a separate go
metadata:
  type: feedback
---

When the user says to update/bump packages and outbox receipts carry adoption remainders tied to those versions, the remainders ARE part of the instruction. Do not bump, stop, and ask "say go and I'll start it" — he answered: "I dont feel i should tell you its pretty fucking self evident THAT WORK FOLLOWS FUCKING bump of packages" (2026-08-15).

**Why:** A bump without the adoption is half the job — the receipts' whole point is that the DS shipped and the consumer work lands here. Stopping between the two halves is the checkpoint-question defect in a new coat.

**How to apply:** After bumping per receipts, read each receipt's "Remainder here" and execute it in the same pass (adopt, retire to `_tmp/`, build-verify). Related: [[publish-split-npm-mine-git-his]], [[checkpoint-question-blocks-execution]].
