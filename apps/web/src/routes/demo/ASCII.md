╔══════════════════════════════════════════════════════════════════════╗
║                 ###    CHESS DATA SYSTEM FLOW    ###                 ║
╠══════════════════════════════════════════════════════════════════════╣

░░██░░░██░░██░░░                  SOURCE                     ░░██░░░██░░██░░░
██░░██░░░██░░██░  -----------------------------------------  ██░░██░░░██░░██░
░░██░░██░░░██░░░  Chess.com Public API (JSON over HTTPS)     ░░██░░██░░░██░░░

                           ┌─────────────────────────────────┐
                           │      Chess.com Public API       │
                           │  https://api.chess.com/pub/...  │
                           └─────────────────────────────────┘
                                              │
                                              │  HTTP (JSON)
                                              ▼

□■ □■□□   ■□■   □■□ □ ■ □■□□   ■□■   □■□ □ ■ □■□□   ■□■    □■□□   ■□■   □■  □■
□■□   ■□ ||    REQUEST CLIENT    || ■□□■ □ ■ □■□□   ■□■   □■□□ ■ □■□□   □■□ □□
□ ■ □■□□   ■□■   □■□□ ■ □■□□   ■□■   □■□□ ■ □■□□   ■□■   □■□□ ■ □■□□   ■□■ □■□

                         ┌──────────────────────────────────────┐
                         │      Python Export Script            │
                         │  requests + pandas, User-Agent       │
                         │  archive discovery (106 months)      │
                         └──────────────────────────────────────┘
                                              │
                                              │  all_games → DataFrame
                                              ▼

╔═══╦══════╦═══╦══════╗
║ ░ ║ ████ ║ ░ ║ ████ ║   RAW MASTER DATASET (LOCAL)
╠═══╬══════╬═══╬══════╣   ---------------------------------
║ █ ║ ░░░░ ║ █ ║ ░░░░ ║   Biskupstunga_games.csv
╚═══╩══════╩═══╩══════╝   ≈ 92 MB, 27,200 games, 106 months
                          metadata: players, ratings, ECO, URLs, timestamps
                          note: PGN not included in JSON API

                     ┌─────────────────────────────────────────────┐
                     │       Raw Master CSV (Local File)           │
                     │   Biskupstunga_games.csv (~92 MB, 27,200)   │
                     └─────────────────────────────────────────────┘
                                              │
                                              │  split + normalize
                                              ▼

   ███     ░░   █
     ░░█   PIPELINE STAGE   ░░
   ███░    (@kol/chess-data)
     ░   ████

              ┌────────────────────────────────────────────────────────┐
              │                @kol/chess-data package                 │
              │                                                        │
              │  ┌──────────────────────────────────────────────────┐  │
              │  │          Source Layer (per-month CSV)            │  │
              │  │  packages/chess-data/sources/                    │  │
              │  │    2017-01.csv                                   │  │
              │  │    2017-02.csv                                   │  │
              │  │    ...                                           │  │
              │  └──────────────────────────────────────────────────┘  │
              │                           │                            │
              │                           │ ingestion / build          │
              │                           ▼                            │
              │  ┌──────────────────────────────────────────────────┐  │
              │  │          Generated Data Layer (JSON)             │  │
              │  │  packages/chess-data/generated/                  │  │
              │  │    manifest.json                                 │  │
              │  │    monthly-summary/*.json                        │  │
              │  │    top-openings.json                             │  │
              │  │    top-rivals.json                               │  │
              │  └──────────────────────────────────────────────────┘  │
              │                           │                            │
              │                           │ helper functions           │
              │                           ▼                            │
              │  ┌──────────────────────────────────────────────────┐  │
              │  │                Public API Layer                  │  │
              │  │   getManifest()                                  │  │
              │  │   getMonthlySummary()                            │  │
              │  │   getTopOpenings()                               │  │
              │  │   getTopOpponents()                              │  │
              │  │   getSampleGames()                               │  │
              │  └──────────────────────────────────────────────────┘  │
              └────────────────────────────────────────────────────────┘
                                              │
                                              │ imported helpers
                                              ▼

░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░
██░░██░░██░░██░░│ APPLICATION CONSUMPTION LAYER │ ░░██░░██░░██░░██░░██░░██░░██
░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░
│                                                                            │
│  +----------------------------------------------------------------------+  │
│  │            Styleguide / Chess (5.1.x “garage” workspace)             │  │
│  │  /styleguide/chess (later /workshop/chess)                           │  │
│  │                                                                      │  │
│  │  - Atoms: icons, badges, mini-boards                                 │  │
│  │  - Molecules: OpeningTrends, streak cards                            │  │
│  │  - Organisms: chess dashboards, apparatus panels                     │  │
│  │  - Shared state: ChessControlsProvider, ChessBoard, ChessSidebar     │  │
│  +----------------------------------------------------------------------+  │
│                                                                            │
│  +----------------------------------------------------------------------+  │
│  │              Workshop / Dashboard (5.6.0 dashboard layer)             │  │
│  │  /workshop/dashboard                                                 │  │
│  │                                                                      │  │
│  │  - DashboardComponents library (cards, charts, meters)               │  │
│  │  - Analysis dashboard (/dashboards/analysis)                         │  │
│  │  - Performance dashboard (/dashboards/performance)                   │  │
│  │  - Inputs: manifest + monthly summaries                              │  │
│  +----------------------------------------------------------------------+  │
│                                                                            │
│  +----------------------------------------------------------------------+  │
│  │                  Board Apparatus and Game Viewer                     │  │
│  │  /workshop/chess/analysis                                            │  │
│  │                                                                      │  │
│  │  - PGN/FEN snapshots, playback, notation panel                       │  │
│  │  - Orientation toggle, edit mode, variation tree (in progress)       │  │
│  │  - Consumes sample games + future PGN-enhanced data                  │  │
│  +----------------------------------------------------------------------+  │
└────────────────────────────────────────────────────────────────────────────┘

   ███     ░░   █
     ░░█   END OF FLOW   ░░
   ███░    DATASET → MODULE → UI → ANALYTICS
     ░   ████


═══════════════════════════════════════════════════════════════════════
                    INSTAGRAM CARD ASCII SKIES
═══════════════════════════════════════════════════════════════════════

              ·                     ·              ░
            · ∙ ·                 · ∙ ·          ·░▒░·
          · ∙ ░ ∙ ·             · ∙ ░ ∙ ·      · ░▒▓▒░ ·
        · ∙ ░ ▒ ░ ∙ ·         · ∙ ░ ▒ ░ ∙ ·  · ░▒▓█▓▒░ ·
      · ∙ ░ ▒ ▓ ▒ ░ ∙ ·     · ∙ ░ ▒ ▓ ▒ ░ ∙ ░▒▓█████▓▒░
        · ∙ ░ ▒ ░ ∙ ·         · ∙ ░ ▒ ░ ∙ ·  · ░▒▓█▓▒░ ·
          · ∙ ░ ∙ ·             · ∙ ░ ∙ ·      · ░▒▓▒░ ·
            · ∙ ·                 · ∙ ·          ·░▒░·
              ·                     ·              ░

    ·         ░░         ·               ·         ▒▒         ·
  · ∙ ·     ░▒▓▒░     · ∙ ·           · ∙ ·     ▒▓██▓▒     · ∙ ·
· ∙ ░ ∙ · ░▒▓███▓▒░ · ∙ ░ ∙ ·     · ∙ ░ ∙ · ▒▓██████▓▒ · ∙ ░ ∙ ·
  · ∙ ·     ░▒▓▒░     · ∙ ·           · ∙ ·     ▒▓██▓▒     · ∙ ·
    ·         ░░         ·               ·         ▒▒         ·


═══════════════════════════════════════════════════════════════════════
                         SPACE INVADER
═══════════════════════════════════════════════════════════════════════

    ████████
  ████████████
████████████████
████  ████  ████
████████████████
████████████████
  ████    ████
  ██        ██
████        ████


═══════════════════════════════════════════════════════════════════════
                         KOLKRABBI LOGO SKETCHES
═══════════════════════════════════════════════════════════════════════

  █ █
     █
   █████
  ██ █ ██
  ███████
  █ ███ █
  █     █
   █   █