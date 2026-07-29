---
title: Prose Styles — Index
type: index
status: active
updated: 2026-02-17
created: 2025-12-03
description: Chapter map and cross-reference index for the Stack, Documentation, and Málrómur prose specs, linking each to its Foundry prose-spec source file.
aliases:
  - prose-styles-index
tags:
  - project/kol-monorepo
  - domain/design-system
  - domain/prose-styles
related:
  - "[[09-prose-styles-stack|prose styles — stack]]"
  - "[[10-prose-styles-docs|prose styles — docs]]"
  - "[[11-prose-styles-malromur|prose styles — málrómur]]"
  - "[[08-text-styles-kol|text styles — kol]]"
---
---



> The Stack, Documentation, and Málrómur specs all originate from `/apps/web/src/routes/foundry/prose-specs/*`. This index links the production-ready documentation to the source references so you can cross-check measurements quickly.

## Chapter Map

| Title | What it Covers |
|-------|----------------|
| Prose Styles Index (this doc) | Chapter guide, references, implementation checklist |
| [Text Styles – Kol](08-text-styles-kol.md) | Complete list of typography utility classes |
| [Prose Styles — Stack](09-prose-styles-stack.md) | `.kol-prose`, `.kol-prose-wide`, `.kol-prose-compact` wrappers |
| [Prose Styles — Docs](10-prose-styles-docs.md) | Wiki-style typography extracted from Foundry documentation spec |
| [Prose Styles — Málrómur](11-prose-styles-malromur.md) | Editorial serif system for special publications |

## Choosing the Right Spec

1. **Need a class name?** Check [Text Styles – Kol](08-text-styles-kol.md) first—it lists every `kol-*` style plus usage guidance.
2. **Rendering CMS content?** Start with [Prose Styles — Stack](09-prose-styles-stack.md) for the Stack wrappers, then layer on documentation or Málrómur specifics if required.
3. **Building wiki/docs pages?** Use [Prose Styles — Docs](10-prose-styles-docs.md) for exact px/rem measurements plus the baseline code example extracted from `/foundry/prose-specs/documentation`.
4. **Editorial serif layouts?** [Prose Styles — Málrómur](11-prose-styles-malromur.md) mirrors `/foundry/prose-specs/malromur` with the full H1–H6 stack, captions, pull quotes, and list behavior.

## Implementation Checklist

- **Wrapper Selection:** Pick `.kol-prose`, `.kol-prose-wide`, or `.kol-prose-compact` based on the column width (65/90/45ch). Reference [Prose Styles — Stack](09-prose-styles-stack.md).
- **Typography Class:** Apply the matching `kol-*` utility (see [Text Styles – Kol](08-text-styles-kol.md)) when you need to enforce a specific scale outside of the prose wrappers.
- **Content Variant:** 
  - Documentation: use `.doc-*` classes defined in `packages/ui/css/docs.css` and documented in [Prose Styles — Docs](10-prose-styles-docs.md).
  - Málrómur: use `.malromur-*` classes from the Foundry specimen (documented in [Prose Styles — Málrómur](11-prose-styles-malromur.md)).
- **CMS Mapping:** When wiring Portable Text or MDX content, map headings/lists/marks to the Stack wrappers first, then layer variant-specific styles via class overrides.
- **Design Tokens:** Never substitute hex values—colors come from tokens defined in `packages/ui/theme.css`, typography tokens from the Typography doc, and spacing from the Breakpoints doc.

## Related References

- `/apps/web/src/routes/foundry/prose-specs/StackProseSpecs.jsx`
- `/apps/web/src/routes/foundry/prose-specs/DocumentationProseSpecs.jsx`
- `/apps/web/src/routes/foundry/prose-specs/MalromurProseSpecs.jsx`
- `packages/ui/css/prose.css`
- `packages/ui/css/docs.css`

Keep this index updated whenever a 2.4.x file moves or when a new prose variant ships.
