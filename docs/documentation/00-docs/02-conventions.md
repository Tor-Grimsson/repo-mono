---
title: Conventions
type: reference
status: active
created: 2026-08-08
updated: 2026-08-08
description: The authoring contract for this vault — frontmatter fields, filename law, wikilink form, and the tag taxonomy. One page; the canon lives in the docs framework.
aliases:
  - conventions
  - frontmatter-contract
tags:
  - project/kol-monorepo
  - domain/documentation
  - framework/conventions
related:
  - "[[INDEX|docs overview]]"
  - "[[01-writing-guidelines|writing guidelines]]"
---

## What this page is

The vault's authoring contract in one place. The **canon** is the kol-docs
framework at `.kol/docs-framework/` (`kol-docs-fm` for frontmatter, `kol-docs-md`
for whole documents) — this page states what every author needs day to day and
defers to the framework for the full spec. When the two disagree, the framework
wins.

## Frontmatter

Every doc opens with a YAML block. Fields, by obligation:

| Obligation | Fields |
|---|---|
| Required | `title` · `type` · `status` · `updated` · `tags` |
| Recommended | `description` · `aliases` |
| Optional | `created` · `sources` · `related` · `verified` · `audience` · `version` · `superseded_by` · `drift` |

- `type` names the archetype (`index`, `reference`, `guide`, `playbook`, …).
- `status` is the lifecycle enum — `active` is the normal state.
- `updated` moves when the **content** changes, not on mechanical edits.
- Keys are lowercase. The 2026-08-08 conformance pass closed out the last
  legacy-schema docs (capitalized keys, `Date:`/`Content-Type:`); do not
  author new ones.

## Tags

- **At least two per doc.** Every tag is `namespace/leaf`, two levels typical,
  three max.
- The namespaces are a **closed set of ten**: `project` · `domain` · `audience`
  · `provider` · `integration` · `pattern` · `brand` · `editor` · `archive` ·
  `framework`. New namespaces are a framework decision, not an authoring one.
- Tags are block lists in the frontmatter, never inline arrays.

## Filenames and folders

- The law is `docs/<category>/<chapter>/<page>.md` — two categories here:
  `documentation/` and `operations/`.
- Pages carry the `NN-` sort prefix (`01-colors.md`). Meta files are UPPERCASE
  (`INDEX.md`).
- A chapter's `INDEX.md` is its front door — the workshop rail renders it as
  the chapter-header link plus the `About` row. A category's `INDEX.md` is the
  category's landing page and never appears as a page inside itself.
- A markdown file sitting directly in `docs/` is not vault content — the
  parser skips it.

## Cross-references

- Wikilinks use the explicit-with-display form: `[[01-colors|color tokens]]`.
- Sibling cross-references go in **both** files' `related:` fields, not just
  one.
- The workshop's Related rail renders `related:` — an unlinked doc is an
  invisible doc.

## What renders where

The workshop derives everything from this contract: the sidebar tree from the
folder law, the frontmatter panel from the fields, the tag overlay and graph
from the tags, search headings from the `##` structure. Nothing is transcribed
by hand — which is why the contract, not a hand-kept index, is the thing to
maintain. (The old hand-kept concept index drifted for five months and was
retired 2026-08-08.)
