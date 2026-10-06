---
title: Monitor
description: Modular video synthesizer — eurorack model, pure-math geometry
status: active
updated: 2026-09-02
url: https://monitor.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-monitor
icon: stat-chart-a
order: 4
embed: true
---
# Monitor

A browser-based modular video synthesizer built on the language of eurorack. Where eurorack uses voltage as its universal medium, Monitor uses pure math — parametric equations and trigonometry generate geometry instead of pushing pixels.

## What is there

- **Rack** — 59 module types across control, math, generators, display and utility, patched with virtual cables; a sidebar and an edit mode
- **Library** · **Create** · **Stage** — the shell's pages around the rack, with Settings

## How it works

The rack engine, Video Modulo, evaluates the patched modules in topological order and renders at 60fps on Canvas2D — no WebGL, no shaders, no pixel buffers, just `Math.sin`, `Math.cos` and a well-sorted render loop. The parametric modules sit on `@kolkrabbi/kol-hardware`: a knob or fader opens its parameter sheet on a touch hold.

## Built with

React 19 · Vite · Canvas2D · Three.js for the 3D geometry · the KOL design system
