// B2 read adapter. Underscore prefix = not routed by Pages Functions.
//
// Uses B2's native API, not the S3-compatible one: native auth is HTTP Basic +
// a bearer token, so there's no SigV4 signing and no dependency. Two requests
// instead of one signed request.
// ponytail: read-only (authorize + list). Writes stay on the `bucket` CLI.

const AUTH_URL = 'https://api.backblazeb2.com/b2api/v3/b2_authorize_account';

// Module-scope token cache. Workers isolates persist between requests, so this
// saves an authorize round-trip on most calls. B2 tokens last 24h; we expire at
// 23h and also recover from a 401 below.
let cached = null;

async function authorize(env) {
  if (cached && cached.expires > Date.now()) return cached;

  const keyId = env.B2_KEY_ID;
  const appKey = env.B2_APP_KEY;
  if (!keyId || !appKey) {
    throw new Error('B2 credentials not configured — set B2_KEY_ID and B2_APP_KEY');
  }

  const res = await fetch(AUTH_URL, {
    headers: { Authorization: 'Basic ' + btoa(`${keyId}:${appKey}`) },
  });
  if (!res.ok) throw new Error(`B2 authorize failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  cached = {
    token: data.authorizationToken,
    apiUrl: data.apiInfo.storageApi.apiUrl,
    downloadUrl: data.apiInfo.storageApi.downloadUrl,
    accountId: data.accountId,
    // A bucket-scoped key already names its bucket; an account-wide one doesn't.
    allowedBucketId: data.allowed?.bucketId ?? null,
    expires: Date.now() + 23 * 60 * 60 * 1000,
  };
  return cached;
}

// bucketName → bucketId. Survives across requests in the same isolate; ids never
// change for a live bucket.
const bucketIds = new Map();

async function resolveBucketId(auth, bucketName) {
  if (auth.allowedBucketId) return auth.allowedBucketId;
  if (bucketIds.has(bucketName)) return bucketIds.get(bucketName);

  const res = await fetch(`${auth.apiUrl}/b2api/v3/b2_list_buckets`, {
    method: 'POST',
    headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ accountId: auth.accountId, bucketName }),
  });
  if (!res.ok) throw new Error(`B2 list_buckets failed: ${res.status} ${await res.text()}`);

  const { buckets } = await res.json();
  const hit = buckets.find((b) => b.bucketName === bucketName);
  if (!hit) throw new Error(`B2 bucket not found: ${bucketName}`);
  bucketIds.set(bucketName, hit.bucketId);
  return hit.bucketId;
}

async function listOnce(auth, bucketId, { prefix, cursor, limit }) {
  return fetch(`${auth.apiUrl}/b2api/v3/b2_list_file_names`, {
    method: 'POST',
    headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bucketId,
      prefix,
      maxFileCount: limit,
      startFileName: cursor || null,
    }),
  });
}

// The admin lists from root and partitions client-side, so a single 1000-item
// page would show a third of this bucket. Page through instead.
// ponytail: hard cap of 10 pages (10k objects); bucket is ~3.4k. Past that,
// the UI needs real pagination, not a bigger cap.
const MAX_PAGES = 10;
const PAGE_SIZE = 1000;

/**
 * List B2 objects in the frozen /api/list shape.
 * Returns { objects: [{ key, size, uploaded, contentType, etag }], truncated, cursor }
 * — identical to the R2 path, so consumers and the UI can't tell them apart.
 */
export async function listB2(env, { bucket, prefix = '', cursor, limit = PAGE_SIZE } = {}) {
  const bucketName = bucket || env.B2_BUCKET || 'kolkrabbi';

  let auth = await authorize(env);
  let bucketId = await resolveBucketId(auth, bucketName);

  const objects = [];
  let next = cursor || null;
  let pages = 0;

  do {
    let res = await listOnce(auth, bucketId, { prefix, cursor: next, limit });

    // Cached token outlived its welcome — drop it and go once more.
    if (res.status === 401) {
      cached = null;
      auth = await authorize(env);
      bucketId = await resolveBucketId(auth, bucketName);
      res = await listOnce(auth, bucketId, { prefix, cursor: next, limit });
    }
    if (!res.ok) throw new Error(`B2 list_file_names failed: ${res.status} ${await res.text()}`);

    const data = await res.json();
    for (const f of data.files) {
      objects.push({
        key: f.fileName,
        size: f.contentLength,
        uploaded: new Date(f.uploadTimestamp).toISOString(),
        contentType: f.contentType ?? null,
        etag: f.contentSha1 ?? null,
      });
    }
    next = data.nextFileName ?? null;
    pages += 1;
  } while (next && pages < MAX_PAGES);

  return { objects, truncated: next != null, cursor: next };
}
