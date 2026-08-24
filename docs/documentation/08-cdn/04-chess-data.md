---
title: Chess Data CDN
type: reference
status: active
created: 2025-12-23
updated: 2026-02-17
description: CDN structure, package architecture, and API usage for the chess dataset served via @kol/chess-data and Backblaze B2.
aliases:
  - chess-data
audience: internal
tags:
  - project/kol-monorepo
  - domain/cdn
  - domain/chess-data
related:
  - "[[01-cdn-overview|cdn overview]]"
---

Base URL: `https://b2.kolkrabbi.io/website/data-library/chess-data`

## CDN Structure

```
chess-data/
├── generated/
│   └── index.js          # Full gameMeta (~20MB, 27,200 games)
├── pgn/
│   └── by-month/
│       ├── 2017-02.json
│       ├── ...
│       └── 2025-11.json  # 108 monthly PGN files
└── sources/
    └── Biskupstunga_games.csv  # Raw source (~92MB)
```

## Package Architecture

The `@kol/chess-data` package uses a hybrid approach:

### Bundled (in repo)
- `generated/lightweight.js` (~139KB) - manifest, monthlySummary, sampleGames
- Imported synchronously for fast initial load

### Fetched from CDN (on demand)
- `generated/index.js` - full gameMeta array (27,200 games)
- `pgn/by-month/*.json` - monthly PGN data

## API Usage

```js
import {
  getManifest,           // sync - from lightweight.js
  getMonthlySummary,     // sync - from lightweight.js
  getSampleGames,        // sync - from lightweight.js
  loadMonthGames,        // async - fetches from CDN
  loadMonthlyPgn,        // async - fetches from CDN
  getGamePgnByIdAsync    // async - fetches from CDN
} from '@kol/chess-data'

// Lightweight (bundled, fast)
const manifest = getManifest()
const summary = getMonthlySummary()

// Heavy data (fetched on demand)
const games = await loadMonthGames('2024-08')
const pgn = await getGamePgnByIdAsync('game-id-123')
```

## File Locations

| Location | Purpose |
|----------|---------|
| `packages/chess-data/generated/lightweight.js` | Bundled lightweight data |
| CDN `/generated/index.js` | Full dataset (fetched) |
| CDN `/pgn/by-month/*.json` | Monthly PGN files (fetched) |
| `docs/a-torg/unused-assets/chess-data/` | Archive of original files |
