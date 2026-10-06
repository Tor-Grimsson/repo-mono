/* The one media client the DS pages take (ARCHITECTURE §2 — the UI is a consumer of the API,
 * never the other way round). `createMediaClient` (kol-media-client 0.2.0) carries the bucket
 * table so `MediaLibrary`'s dropdown reaches all three stores through one client; the write
 * seams below are what turn the pages writable — a client without them renders read-only,
 * which is exactly what `media.kolkrabbi.io` and every B2 bucket need. */
import { createMediaClient } from '@kolkrabbi/kol-media-client';
import { BUCKETS, deleteObject, renameObject, setBucket } from './api';

const base = createMediaClient({ buckets: BUCKETS });

/* `downloadUrl` is called DURING RENDER by the pages (every card's download chip), so it must be
 * pure — `src/lib/api.js`'s version reads module state, and routing this through `setBucket` would
 * mutate that state mid-render. The rule it encodes is the same: the /api/download proxy (which
 * sets Content-Disposition) is the R2 path; B2 objects are public, so hand back the direct URL
 * rather than proxying a key the R2 bucket does not hold. */
const downloadUrl = (key, bucket) => {
  const b = BUCKETS[bucket] ?? BUCKETS.r2;
  return b.writable ? `/api/download?key=${encodeURIComponent(key)}` : `${b.publicBase}/${key}`;
};

export const mediaClient = {
  ...base,
  downloadUrl,
  /* The mutating seams run from event handlers, never render. `src/lib/api.js` resolves the bucket
   * from module state (one admin, one active bucket) and App keeps that in step on every switch —
   * the guard below only matters if a page ever calls them with a bucket of its own. */
  deleteObject: (key, bucket) => { if (bucket && bucket !== undefined) setBucket(bucket); return deleteObject(key); },
  renameObject: (from, to, bucket) => { if (bucket && bucket !== undefined) setBucket(bucket); return renameObject(from, to); },
};

export default mediaClient;
