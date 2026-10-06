---
title: Vcap
description: Console-driven skinless tab recorder for Chromium
status: active
updated: 2026-04-20
url: https://vcap.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-vcap
icon: row
order: 6
embed: true
---
# Vcap

A Chrome extension that records the active tab from the DevTools console, with no recorder UI in the captured pixels — no banner, no floating stop button, no red border, no countdown.

```
vcap.start('.dialog', { margin: 20, duration: 5000 })
→ press ⌘⇧V to begin; auto-stops after 5s
```

## How it works

Chrome's tab capture needs a real user gesture to start, and a console call is not one. So the console **arms** the capture — resolves the selector, computes the crop, applies isolation, hands the config to the service worker — and the hotkey **fires** it, because a registered command counts as a gesture. The recording is cropped through a canvas in an offscreen document and lands in Downloads as mp4 or webm.

## Install

From [vcap.kolkrabbi.io](https://vcap.kolkrabbi.io): download the versioned zip, unzip, and Load unpacked in `chrome://extensions`.

## Built with

Manifest V3 · `tabCapture` · `MediaRecorder` · an offscreen document · an Astro landing page
