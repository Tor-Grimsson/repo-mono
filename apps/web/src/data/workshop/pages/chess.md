---
title: Chess
description: 27,200 games — browsable, replayable, aggregated
status: active
updated: 2026-09-01
url: https://chess.kolkrabbi.io
repo: https://github.com/Tor-Grimsson/kol-chess
icon: chess-pawn
image: https://b2.kolkrabbi.io/website/asset-library/workshop/workshop-overview/chess.png
order: 7
---
# Chess

The chess system, its own deploy at [chess.kolkrabbi.io](https://chess.kolkrabbi.io) — 27,200 games over 108 months of personal play, exported from chess.com, browsable, replayable, aggregated.

## What is there

- [Analysis](https://chess.kolkrabbi.io/analysis) — the board and the game player
- [Statistics](https://chess.kolkrabbi.io/stats) — results, openings, streaks, rating history
- [Database](https://chess.kolkrabbi.io/database) — the game database, browsable

## How it works

The chess system is consumed, not built here: the board, the apparatus, the piece sets and the data adapter are `@kolkrabbi/kol-chess`, and the app is a thin consumer on the published design system. Changes to the board or the playback go to the design system, not to this repo.

## Built with

React · `@kolkrabbi/kol-chess` · the KOL design system
