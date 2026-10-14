import { corsHeaders, withCors } from './_cors.js';

export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const method = context.request.method;

  // Reading the tree is open.
  if (method === 'GET' && url.pathname === '/api/list') {
    return context.next();
  }

  /* PREFLIGHT BYPASSES AUTH, and must: a browser sends OPTIONS with no Authorization header by
     specification. Answering it grants nothing — the write that follows still carries the password. */
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(context.request) });
  }

  const expected = context.env.ADMIN_PASSWORD;
  if (!expected) {
    return new Response('Server misconfigured: ADMIN_PASSWORD not set', { status: 500 });
  }

  const header = context.request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) return unauthorized();

  let decoded;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }
  const idx = decoded.indexOf(':');
  const provided = idx === -1 ? decoded : decoded.slice(idx + 1);
  if (provided !== expected) return unauthorized();

  /* the route's own response plus the CORS headers a cross-origin caller needs to READ it —
     without these the write succeeds and the browser still reports a network error */
  return withCors(await context.next(), context.request);
};

function unauthorized() {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="kol-media-admin"' },
  });
}
