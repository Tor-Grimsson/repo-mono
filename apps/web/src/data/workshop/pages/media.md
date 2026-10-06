---
title: Media
description: The admin and the API for the estate's object stores
status: active
updated: 2026-10-05
url: https://media.kolkrabbi.io
icon: database
order: 9
---
# Media

The admin for Kolkrabbi's media, at [media.kolkrabbi.io](https://media.kolkrabbi.io). Anyone can browse; uploads, renames and moves ask for the login.

## What is there

- R2 `kol-media` — tool media for the apps, served at `r2.kolkrabbi.io`. The one store the admin writes to.
- B2 `website` — the public site's media: art prints, the asset library, HLS video. Read-only here, served at `b2.kolkrabbi.io`.
- B2 `vault` — the Obsidian vault's attachments. Read-only here, served at `b2v.kolkrabbi.io`.

## How it works

API-first: the surface is `/api/list`, `/api/upload`, `/api/object` and friends, Cloudflare Pages Functions in front of the buckets. The app is one thin client over them; other apps call the same API. Listing is open, every write is behind HTTP Basic auth.

## Built with

React · `@kolkrabbi/kol-component`'s `MediaLibrary` · Cloudflare Pages Functions · R2 · Backblaze B2
