export const onRequestDelete = async ({ request, env }) => {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!key) {
    return Response.json({ error: 'Missing key' }, { status: 400 });
  }
  await env.MEDIA_BUCKET.delete(key);
  return Response.json({ ok: true, key });
};
