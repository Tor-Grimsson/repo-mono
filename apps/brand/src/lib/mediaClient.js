import { createMediaClient } from '@kolkrabbi/kol-media-client'

/* ONE client for the LIBRARY pages (MediaLibraryPages, 2026-08-27): three
 * buckets through the one admin API — kol-r2b2's table verbatim, every bucket
 * READ-ONLY here (writes go through the admin / the `bucket` CLI). Module-level
 * so its identity is stable: MediaLibraryProvider's fetch effect keys on it. */
export const BUCKETS = {
  r2:      { id: 'r2',      label: 'R2 · kol-media', publicBase: 'https://r2.kolkrabbi.io',  writable: false },
  b2:      { id: 'b2',      label: 'B2 · website',   publicBase: 'https://b2.kolkrabbi.io',  writable: false },
  b2vault: { id: 'b2vault', label: 'B2 · vault',     publicBase: 'https://b2v.kolkrabbi.io', writable: false },
}

export const mediaClient = createMediaClient({ buckets: BUCKETS })
