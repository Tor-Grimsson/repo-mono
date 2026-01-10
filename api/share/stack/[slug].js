const escapeHtml = (value) => {
  if (value == null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const getEnv = (key, fallback) => process.env[key] || fallback

export default async function handler(req, res) {
  const slugParam = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug

  if (!slugParam) {
    res.status(400).send('Missing slug')
    return
  }

  const projectId =
    getEnv('SANITY_PROJECT_ID', '') ||
    getEnv('VITE_SANITY_PROJECT_ID', '') ||
    'to8h15ed'
  const dataset =
    getEnv('SANITY_DATASET', '') ||
    getEnv('VITE_SANITY_DATASET', '') ||
    'projects'
  const apiVersion =
    getEnv('SANITY_API_VERSION', '') ||
    getEnv('VITE_SANITY_API_VERSION', '') ||
    '2025-01-01'

  const query =
    '*[_type == "blog" && slug.current == $slug][0]{title, excerpt, "slug": slug.current, coverImage{ "url": asset->url }, thumbnail{ "url": asset->url }}'

  const params = new URLSearchParams()
  params.set('query', query)
  params.set('$slug', slugParam)

  const apiUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params.toString()}`

  let payload = null
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    payload = data?.result || null
  } catch (error) {
    payload = null
  }

  const title = payload?.title || 'Stack article'
  const description = payload?.excerpt || ''
  const image =
    payload?.thumbnail?.url ||
    payload?.coverImage?.url ||
    'https://kolkrabbi.io/img/open-graph/open-graph-03.png'
  const canonicalUrl = `https://kolkrabbi.io/stack/${slugParam}`

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    ${description ? `<meta name="description" content="${escapeHtml(description)}" />` : ''}
    <meta property="og:title" content="${escapeHtml(title)}" />
    ${description ? `<meta property="og:description" content="${escapeHtml(description)}" />` : ''}
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    ${description ? `<meta name="twitter:description" content="${escapeHtml(description)}" />` : ''}
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  </head>
  <body>
    <p>Stack article share preview for ${escapeHtml(title)}.</p>
    <p><a href="${escapeHtml(canonicalUrl)}">Open article</a></p>
  </body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(html)
}
