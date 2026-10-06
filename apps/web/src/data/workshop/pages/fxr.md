---
title: FXR
description: Embeddable vector + generative design editor
status: active
updated: 2026-09-04
url: https://fxr.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-fxr
icon: layout
order: 3
embed: true
---
# FXR

Effexor FXR — the Kolkrabbi design editor, and the one editor the scattered prototypes converge into. A DOM/SVG vector and generative compositor: canvas and frames, layers, palette, pattern and type generators, kinetic type, boolean geometry, image fill, export.

## What is there

Three chromes on the same engine:

- **Editor** — the full compositor, with Home, Library, Settings and an Output view beside it
- **Labs** — one generator or source at a time, with its own catalog on the rail; a pick is the URL
- **Randomiser** — Generate and Effects, the two tools a phone lands on

## How it works

The editor is published as `@kolkrabbi/design-editor` and mounts wherever it is placed, on an internal router, so a host app's URL bar is never touched. Media and fonts load same-origin through a `/media` proxy, because a cross-origin image taints the canvas and breaks the photo filters and export. It consumes the published design system as a normal npm downstream, which is also how the design system gets validated.

## Built with

React · DOM/SVG compositor · `@kolkrabbi/kol-*` peers
