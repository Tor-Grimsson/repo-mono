import { listB2 } from './_b2.js';

// The response shape below is frozen — kol-labs-single and kol-design-editor
// read data.objects[].{key,contentType,size} and nothing guards it.
// Both providers return it identically, so ?bucket= is a parameter, not a fork.

// ?bucket= ids the UI sends → the real B2 bucket name. 'r2' is the binding path.
const B2_BUCKETS = {
  b2: 'kolkrabbi',
  b2vault: 'kol-vault-media',
};

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const prefix = url.searchParams.get('prefix') || '';
  const cursor = url.searchParams.get('cursor') || undefined;
  const bucket = url.searchParams.get('bucket') || 'r2';

  let payload;
  try {
    payload = B2_BUCKETS[bucket]
      ? await listB2(env, { bucket: B2_BUCKETS[bucket], prefix, cursor })
      : await listR2(env, { prefix, cursor });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 502, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  return Response.json(payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=30',
    },
  });
};

async function listR2(env, { prefix, cursor }) {
  const result = await env.MEDIA_BUCKET.list({
    prefix,
    cursor,
    limit: 1000,
    include: ['httpMetadata'],
  });

  return {
    objects: result.objects.map((o) => ({
      key: o.key,
      size: o.size,
      uploaded: o.uploaded,
      contentType: o.httpMetadata?.contentType ?? null,
      etag: o.etag,
    })),
    truncated: result.truncated,
    cursor: result.truncated ? result.cursor : null,
  };
}

export const onRequestOptions = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
