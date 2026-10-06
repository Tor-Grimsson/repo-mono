# Playbook — web polish (post-audit run)

> Append-only work journal. Real timestamps. One idea per line.
> Carries the threads the 🏁 5-D-audit milestone parked (visual pass excluded — user-side).

## Backlog
- [x] sitemap build-script — generate `/work/:slug` + `/stack/:slug` + `/prints/:slug` urls from Sanity/local data at build, merge with static sitemap
- [x] docs typography pass (workshop docs pages) — on hold pre-audit, never concluded
- [x] apparat tool stories — CLOSED per user 2026-07-28: lives with him, he brings content when ready; not tracked here

## Journal
- 2026-07-28 10:16 — playbook opened at milestone close; backlog seeded from arc leftovers + pre-arc parked items
- 2026-07-28 10:24 — sitemap script DONE: `apps/web/scripts/generate-sitemap.mjs`, post-build step in package.json; test-run 78 urls (19 static + 26 work + 9 stack + 24 prints); fails soft to static-only
- 2026-07-28 10:35 — PLAYBOOK CLOSED: user closed visual-pass gating (reports issues as seen), the veto window (light live, siblings stay in touch-icons/), and apparat stories (his side). Also landed post-close: overview-card per-page icons (EmbedOverview fallback + 14 v1 picks). Nothing open.
- 2026-07-28 10:24 — typography pass DONE: docs surfaces audited against kol-type-conform — already conformant (kol-prose owns body, helper/mono fault line correct, no foreign families/freestyle sizing); one fix: dead `docs-list`/`tight` classes (no rules in theme 0.11.7 nor DS repo) stripped from DocumentationReader + Documentations, lists fall to `.kol-prose ul/ol/li`; rendered-verify rides user's visual pass
