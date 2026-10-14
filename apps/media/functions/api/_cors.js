/**
 * _cors — who may call this admin's API from another origin (ported from olina 2026-10-13).
 *
 * `/api/list` answers `Access-Control-Allow-Origin: *` because it is public and read-only. The
 * WRITE routes take an ALLOWLIST: the password still authorises the write, but a wildcard invites
 * every page on the internet to sit in front of a password prompt for this bucket.
 *
 * THE PREFLIGHT MUST BYPASS AUTH. A browser sends `OPTIONS` with NO `Authorization` header — that
 * is the spec — so `_middleware.js` lets OPTIONS through, or brand could read the bucket but never
 * write a deck or a note.
 */
const ALLOWED = [
  'https://kolkrabbi.io',
  'https://brand.kolkrabbi.io',
  'https://media.kolkrabbi.io',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5199',
];

/** The origin to echo back, or null when the caller is not on the list. */
export function allowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return null;
  return ALLOWED.includes(origin) ? origin : null;
}

/* EVERY method the API supports: the middleware answers the preflight before the route resolves.
   A narrower default silently blocks whole verbs ("Method PUT is not allowed…" with the route and
   the password both right). An unsupported verb still gets a 405 from the route. */
const ALL_METHODS = 'GET, POST, PUT, DELETE, OPTIONS';

/** CORS headers for a write route's response. `Vary` because the value differs per caller. */
export function corsHeaders(request, methods = ALL_METHODS) {
  const origin = allowedOrigin(request);
  if (!origin) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

/** Copy the CORS headers onto a Response that already exists. */
export function withCors(response, request, methods) {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders(request, methods)).forEach(([k, v]) => headers.set(k, v));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
