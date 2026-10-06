---
title: Mirror
description: Interactive image-distortion playground
status: active
updated: 2026-09-02
url: https://mirror.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-mirror
icon: overlap
order: 5
embed: true
---
# Mirror

Hall of Mirrors — a video distortion playground. Load an image or a clip and warp it live through a desk of channels, generators and effects.

## What is there

- **Studio** — the desk (channel strips, master out, routing matrix, master clock, generators), the viewframe and the tape deck; Studio B is the same tool in a float arrangement, the desk taking the view and the monitor a window over it
- **Library** · **Create** · **Expressions** (the envelope generator) · **Mixer** · **Tape** · **Fronts** · **Icons** · **Settings**

## How it works

Rendering is PixiJS on WebGL; GSAP drives the SVG attribute animation and the drag inertia. A shortcuts sheet, Space to run, a frame budget and adaptive quality keep it playable; media comes from the R2 bucket.

## Built with

React 19 · Vite · PixiJS 8 · GSAP 3 · Tailwind CSS 4 · the KOL design system
