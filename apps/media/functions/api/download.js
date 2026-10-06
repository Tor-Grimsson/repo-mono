export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!key) {
    return new Response('Missing key', { status: 400 });
  }

  const obj = await env.MEDIA_BUCKET.get(key);
  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const filename = key.split('/').pop() || 'download';
  const safeFilename = filename.replace(/"/g, '\\"');

  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Content-Length': String(obj.size),
    },
  });
};
