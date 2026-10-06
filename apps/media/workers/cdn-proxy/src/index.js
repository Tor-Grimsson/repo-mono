// kol-cdn-proxy — puts Kolkrabbi-owned hostnames in front of the public B2 buckets.
//
// Backblaze's own "Custom Domains" feature is NOT available in this account's
// console (checked 2026-08-14: absent from the sidebar and from both buckets'
// panels), so this is the route: a Worker on a Cloudflare custom domain that
// proxies to B2's public download host. Egress B2 → Cloudflare is free under
// the Bandwidth Alliance.
//
// Both buckets are public, so this is a pure proxy — no signing, no credentials.

const B2_HOST = 'f005.backblazeb2.com';

// hostname → B2 bucket. Paths pass through untouched, which is what makes the
// consumer migration a hostname replace instead of a path rewrite.
//   cdn.kolkrabbi.io/website/art-prints/x.jpg
//     → f005.backblazeb2.com/file/kolkrabbi/website/art-prints/x.jpg
//
// `b2.` / `b2v.` are the names; `cdn.` / `vault.` are the originals, kept
// attached so the consumer sweep is never a flag day. Retire them only once a
// sweep shows zero references left.
export const BUCKETS = {
  'b2.kolkrabbi.io': 'kolkrabbi',
  'cdn.kolkrabbi.io': 'kolkrabbi',
  'b2v.kolkrabbi.io': 'kol-vault-media',
  'vault.kolkrabbi.io': 'kol-vault-media',
};

// Forwarded upstream so range requests (HLS seeking) and conditional GETs work.
const PASS_THROUGH = ['range', 'if-none-match', 'if-modified-since', 'accept-encoding'];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

export function originUrl(hostname, pathname) {
  const bucket = BUCKETS[hostname];
  if (!bucket) return null;
  return `https://${B2_HOST}/file/${bucket}${pathname}`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed\n', {
        status: 405,
        headers: { Allow: 'GET, HEAD, OPTIONS' },
      });
    }

    const origin = originUrl(url.hostname, url.pathname);
    if (!origin) return new Response('Unknown host\n', { status: 404 });

    const headers = new Headers();
    for (const h of PASS_THROUGH) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }

    const upstream = await fetch(origin, {
      method: request.method,
      headers,
      cf: { cacheEverything: true, cacheTtl: 86400 },
    });

    const out = new Headers(upstream.headers);

    // B2 sends no Cache-Control at all — without setting it here the edge falls
    // back to Cloudflare's defaults rather than anything we chose.
    out.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000, immutable');

    // Don't leak B2 file ids / upload metadata to the browser.
    for (const key of [...out.keys()]) {
      if (key.startsWith('x-bz-')) out.delete(key);
    }

    for (const [k, v] of Object.entries(CORS)) out.set(k, v);

    return new Response(upstream.body, { status: upstream.status, headers: out });
  },
};
