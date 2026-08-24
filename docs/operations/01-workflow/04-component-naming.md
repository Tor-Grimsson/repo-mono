---
title: Component naming and grouping
type: convention
status: active
created: 2026-08-15
updated: 2026-08-15
description: The written rule for src/ component names and section grouping in apps/web — page-prefixed sections, descriptive shared names, variants as props. Born 2026-08-15 when an unwritten habit proved unenforceable.
tags:
  - framework/conventions
  - project/kol-monorepo
related:
  - "[[01-dev-workflow|Dev workflow]]"
---

# Component naming and grouping

The rule the tree already half-followed, now written so an audit can flag a
violation. Before 2026-08-15 the prefix pattern was habit — which is how
`WorkshopFeatures.jsx` sat unprefixed in `sections/home/` with nothing firing.

## 1. Sections are grouped by page, named `<Page><Section>`

`components/sections/<page>/` holds one page's sections; every file is prefixed
with its page: `HomeHero`, `HomeFoundry`, `HomeWorkshop`, `StudioProcessCard`,
`StackHero`. A section file whose name does not start with its folder's page
name is a defect.

## 2. `shared/` names say what the thing IS

A shared section is named for its content, never its data source or reach:
`StackLatest` (the latest-writing band), `ConnectCta` (the /CONNECT band),
`FeaturedCarousel`. `CmsGlobal` and `CtaGlobal` were the counter-examples —
both renamed 2026-08-15.

## 3. Variants are props, not sibling files

A component that differs from its base only in geometry or scale is a prop on
the base (`<StackHero tall>`), not a wrapper file (`StackHeroTall` — folded
2026-08-15). A second FILE requires a second anatomy.

## 4. Folder names name the page, not a mood

The folder is the route's name: `stack/`, not `stack-detail/` (renamed
2026-08-15 — its files served the Stack index, not a detail view).

## 5. The DS owns anatomies; pages own content

A repeating anatomy (hero, split-section, listing card) is a kol-ds-ui brief,
never a third local copy — standing agreement since 2026-08-09, restated here
because this doc is where naming audits start.
