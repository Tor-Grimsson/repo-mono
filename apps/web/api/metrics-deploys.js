const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const TEAM_ID = process.env.VERCEL_TEAM_ID || ''

let cache = { data: null, ts: 0 }
const CACHE_TTL = 5 * 1000 // 5 seconds

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (!VERCEL_TOKEN) {
    return res.status(200).json({ deploys: [], error: 'VERCEL_TOKEN not set' })
  }

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  try {
    const params = new URLSearchParams({ limit: '10' })
    if (TEAM_ID) params.set('teamId', TEAM_ID)

    const response = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      console.error(`Vercel API error: ${response.status}`, text)
      return res.status(200).json({ deploys: [], error: `Vercel API ${response.status}` })
    }

    const data = await response.json()
    const deploys = (data.deployments || []).map(d => ({
      id: d.uid,
      url: d.url,
      state: d.state,           // READY, ERROR, BUILDING, QUEUED, CANCELED
      created: d.created,        // timestamp ms
      ready: d.ready,            // timestamp ms (when build finished)
      source: d.meta?.githubCommitMessage || d.meta?.gitlabCommitMessage || d.name || '—',
      branch: d.meta?.githubCommitRef || d.meta?.gitlabCommitRef || 'main',
      duration: d.ready && d.created ? Math.round((d.ready - d.created) / 1000) : null,
    }))

    const result = { deploys, ts: Date.now() }
    cache = { data: result, ts: Date.now() }
    return res.status(200).json(result)
  } catch (err) {
    console.error('Deploy metrics error:', err)
    return res.status(200).json({ deploys: [], error: err.message })
  }
}
