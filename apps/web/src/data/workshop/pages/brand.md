---
title: Brand
description: The Kolkrabbi brand site — styleguide, assets and lookups
status: active
updated: 2026-10-03
url: https://brand.kolkrabbi.io
icon: edit
order: 2
---
# Brand

The Kolkrabbi brand site, [brand.kolkrabbi.io](https://brand.kolkrabbi.io) — the brand book, the assets and the slide decks, one scrolling page per chapter.

## What is there

- [Brand](https://brand.kolkrabbi.io/brand) — about, tone, look, the logo and its lockups, color, typography
- [Assets](https://brand.kolkrabbi.io/assets) — logos, graphics, patterns, stationery, labels, bags, packaging, social sizes and profiles
- [Slide deck](https://brand.kolkrabbi.io/slide-deck) — the template, the layout and two sets
- [Library](https://brand.kolkrabbi.io/library) — the media library over the three buckets, read-only

## How it is built

`apps/brand` in the site's monorepo. The identity is data: `@kolkrabbi/kol-brand` carries Kolkrabbi's brand manifest and logo SVGs, the brand color layer comes from `kol-framework`, and every page is design-system chrome — no local components. The library reads the buckets through `@kolkrabbi/kol-media-client`.

## Built with

React · Vite · `@kolkrabbi/kol-brand` · `kol-framework` · `kol-component`
