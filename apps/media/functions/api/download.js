import { rowFor, sanitizePath } from './_files.js';

/* `key` is the file's PATH; its row names the R2 key the bytes live at. A key with no row (a
 * storage key handed straight in) is fetched as-is, so nothing that worked before stops. */
export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const path = sanitizePath(url.searchParams.get('key'));
  if (!path) {
    return new Response('Missing key', { status: 400 });
  }

  const row = await rowFor(env, path);
  const obj = await env.MEDIA_BUCKET.get(row?.key ?? path);
  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const filename = row?.name || path.split('/').pop() || 'download';
  const safeFilename = filename.replace(/"/g, '\\"');

  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Content-Length': String(obj.size),
    },
  });
};
