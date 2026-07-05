---
Title: Chess Data CDN
Date: 2025-12-23
Status: Active
Category: CDN
tags: [cdn, technical-reference, chess, analytics]
modified: 2026-02-17T19:12:25+00:00
---

Base URL: `https://f005.backblazeb2.com/file/kolkrabbi/website/data-library/chess-data`

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
