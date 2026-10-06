export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { from, to } = body || {};
  if (!from || typeof from !== 'string') {
    return Response.json({ error: 'Missing from' }, { status: 400 });
  }
  if (!to || typeof to !== 'string') {
    return Response.json({ error: 'Missing to' }, { status: 400 });
  }

  const cleanTo = sanitizeKey(to);
  if (!cleanTo) {
    return Response.json({ error: 'Invalid destination key' }, { status: 400 });
  }
  if (cleanTo === from) {
    return Response.json({ ok: true, key: from, unchanged: true });
  }

  const exists = await env.MEDIA_BUCKET.head(cleanTo);
  if (exists) {
    return Response.json({ error: 'Destination already exists' }, { status: 409 });
  }

  const obj = await env.MEDIA_BUCKET.get(from);
  if (!obj) {
    return Response.json({ error: 'Source not found' }, { status: 404 });
  }

  await env.MEDIA_BUCKET.put(cleanTo, obj.body, {
    httpMetadata: obj.httpMetadata,
    customMetadata: obj.customMetadata,
  });
  await env.MEDIA_BUCKET.delete(from);

  return Response.json({ ok: true, from, to: cleanTo });
};

function sanitizeKey(input) {
  const stripped = input.replace(/^\/+/, '').trim();
  if (!stripped) return null;
  if (stripped.split('/').some((seg) => seg === '..' || seg === '.')) return null;
  return stripped;
}
