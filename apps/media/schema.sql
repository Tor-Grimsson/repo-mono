-- kol-media — the one database, on Cloudflare D1 (2026-10-13).
--
-- Same reasoning as olina's 2026-09-04: no new vendor (R2, Pages, DNS are Cloudflare already),
-- apps/media is already a Pages app with Functions and an auth middleware, free tier is plenty.
-- The Vercel apps (brand, web) call it cross-origin exactly as brand already calls /api/list.

-- ─────────────────────────────────────────────────────────────────────────────
-- files — every object in the R2 bucket, by permanent key (plans/2026-10-13-r2-permanent-ids.md).
--
-- THE OBJECT NEVER MOVES. `key` is the R2 key the bytes live at and the URL is built on; `folder`
-- + `name` are what the media app shows. Rename and move edit this row, never the key.
--
-- Two kinds of key live here:
--   * `f/<id>.<ext>` — anything uploaded through /api/upload since this table existed.
--   * a legacy PATH ('video/x.mp4') — an object that was in the bucket before, or one the dotfiles
--     `bucket-r2 up` put straight into R2. /api/list ADOPTS these on sight (a row with key = path)
--     and PRUNES a legacy row whose object is gone. Never rewritten to an id: the key is already
--     permanent once rename stops moving it.
-- `f/` rows are only ever written and deleted by the API, so they are never adopted or pruned.
--
-- (folder, name) is unique — two files with one name in one folder is what R2 keys ruled out before.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS files (
  id          TEXT PRIMARY KEY,             -- 10 chars of [0-9a-z] — functions/api/_id.js
  key         TEXT NOT NULL UNIQUE,         -- 'f/<id>.<ext>' or a legacy path
  folder      TEXT NOT NULL DEFAULT '',     -- 'video/' · '' is the root · always ends in '/'
  name        TEXT NOT NULL,                -- 'x.mp4'
  size        INTEGER NOT NULL,
  type        TEXT,                         -- content type
  uploaded    INTEGER NOT NULL,             -- epoch ms
  thumb       TEXT                          -- a video's first frame, small JPEG data URL; null otherwise
);

CREATE UNIQUE INDEX IF NOT EXISTS files_folder_name ON files (folder, name);

-- ─────────────────────────────────────────────────────────────────────────────
-- decks — the slide-deck documents brand's editor writes. `doc` is the whole deck as JSON: the
-- shape is still moving and D1 is never asked to query inside one, only to fetch it by slug.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS decks (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  doc         TEXT NOT NULL,              -- JSON: { version, slides: [...] }
  updated_at  INTEGER NOT NULL,           -- epoch ms
  updated_by  TEXT
);

CREATE INDEX IF NOT EXISTS decks_updated_at ON decks (updated_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- notes — brand's notes page. INTERNAL: behind the admin password like every write.
-- `body` is markdown as plain text (kol-component renders it). `assets` is a JSON array of R2
-- KEYS, not URLs — a key survives the CDN hostname changing under it.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notes (
  slug        TEXT PRIMARY KEY,
  title       TEXT NOT NULL DEFAULT '',
  body        TEXT NOT NULL DEFAULT '',
  favourite   INTEGER NOT NULL DEFAULT 0,   -- 0/1; SQLite has no boolean
  assets      TEXT NOT NULL DEFAULT '[]',   -- JSON array of R2 keys
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  updated_by  TEXT
);

CREATE INDEX IF NOT EXISTS notes_updated_at ON notes (updated_at DESC);
CREATE INDEX IF NOT EXISTS notes_favourite  ON notes (favourite, updated_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- events — one append-only log of INTENTIONS (a save, a delete), never interactions.
-- Free tier: 100k row writes a day across the database — nothing per keystroke goes here.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  at        INTEGER NOT NULL,
  actor     TEXT,
  kind      TEXT NOT NULL,                -- 'deck.save' | 'note.save' | 'note.delete' | …
  subject   TEXT,
  meta      TEXT
);

CREATE INDEX IF NOT EXISTS events_at   ON events (at DESC);
CREATE INDEX IF NOT EXISTS events_kind ON events (kind, at DESC);
