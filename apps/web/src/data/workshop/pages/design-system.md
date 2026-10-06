---
title: Design System
description: The published KOL design system — packages, components, foundations
status: active
updated: 2026-10-05
url: https://ui.kolkrabbi.io
icon: component-01
image: https://b2.kolkrabbi.io/website/asset-library/workshop/workshop-overview/design-system.png
order: 1
---
# Design System

The KOL design system: one workspace that maintains the `@kolkrabbi/kol-*` packages, publishes them to npm and shows them live at [ui.kolkrabbi.io](https://ui.kolkrabbi.io). Every app on this hub is built on it.

## What is there

- [Components](https://ui.kolkrabbi.io/components) — the component library, atoms to organisms
- [Blocks](https://ui.kolkrabbi.io/blocks) — compositions bigger than a component, smaller than a page
- [Sets](https://ui.kolkrabbi.io/sets) — full-apparatus compositions
- [Color](https://ui.kolkrabbi.io/foundations/color) · [Typography](https://ui.kolkrabbi.io/foundations/typography) — the foundations
- [Icons](https://ui.kolkrabbi.io/icons) — the 342-icon registry

## How it is built

Fifteen packages in four tiers. The UI tier is a four-layer stack — `kol-theme` (tokens and base CSS), `kol-icons`, `kol-component`, `kol-framework` (the app shell) — with domain packages above it: `kol-workshop` (the docs system this hub runs on), `kol-dashboards`, `kol-chess`, `kol-content`, `kol-foundry`, `kol-store`. A client tier carries `kol-media-client`, `kol-brand` and the brand template; `kol-scrape` is the one tool. Packages ship raw JSX and CSS, so the consuming app's bundler compiles them, and the CSS cascade order is load-bearing.

Since September the repo also carries an apps tier: a tool is proved as a real app — media, notes, presentation, the editor, the rack, the mixer — before anything is published.

## Built with

React · Vite · Tailwind CSS 4 · pnpm workspace
