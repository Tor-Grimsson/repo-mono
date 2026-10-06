export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const method = context.request.method;

  if (method === 'GET' && url.pathname === '/api/list') {
    return context.next();
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

  return context.next();
};

function unauthorized() {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="kol-media-admin"' },
  });
}
