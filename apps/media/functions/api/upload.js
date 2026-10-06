export const onRequestPost = async ({ request, env }) => {
  const form = await request.formData();
  const file = form.get('file');
  const rawKey = form.get('key');

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'Missing file' }, { status: 400 });
  }
  if (!rawKey || typeof rawKey !== 'string') {
    return Response.json({ error: 'Missing key' }, { status: 400 });
  }

  const key = sanitizeKey(rawKey);
  if (!key) {
    return Response.json({ error: 'Invalid key' }, { status: 400 });
  }

  await env.MEDIA_BUCKET.put(key, file, {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
  });

  return Response.json({ ok: true, key, size: file.size, contentType: file.type || null });
};

function sanitizeKey(input) {
  const stripped = input.replace(/^\/+/, '').trim();
  if (!stripped) return null;
  if (stripped.split('/').some((seg) => seg === '..' || seg === '.')) return null;
  return stripped;
}
