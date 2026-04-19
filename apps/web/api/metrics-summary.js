const UMAMI_URL = 'https://kol-umami.vercel.app'
const WEBSITE_ID = 'fcd04534-5dcd-44a3-b7b1-256cbdf49ab9'
const UMAMI_USER = process.env.UMAMI_USER || 'admin'
const UMAMI_PASS = process.env.UMAMI_PASS

const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function getToken() {
  const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: UMAMI_USER, password: UMAMI_PASS }),
  })
  if (!res.ok) throw new Error(`Umami auth failed: ${res.status}`)
  const { token } = await res.json()
  return token
}

async function umamiGet(token, path, params = {}) {
  const url = new URL(`${UMAMI_URL}/api/websites/${WEBSITE_ID}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    console.error(`Umami ${path} failed: ${res.status}`, await res.text().catch(() => ''))
    return null
  }
  return res.json()
}

function formatNum(n) {
  return n != null ? n.toLocaleString('en-US') : '0'
}

function pctDelta(current, previous) {
  if (!previous) return current > 0 ? 'new' : '—'
  const d = ((current - previous) / previous) * 100
  const sign = d >= 0 ? '+' : ''
  return `${sign}${d.toFixed(1)}%`
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const host = typeof req.query?.host === 'string' && req.query.host.trim() ? req.query.host.trim() : null
  if (!host) return res.status(400).json({ error: 'host query param required' })

  const rangeMs = parseInt(req.query?.range, 10) || 30 * 86400000
  const cacheKey = `${rangeMs}:${host}`

  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json(cached.data)
  }

  try {
    const token = await getToken()

    const now = Date.now()
    const rangeStart = now - rangeMs
    const prevRangeStart = rangeStart - rangeMs
    const unit = rangeMs <= 86400000 ? 'hour' : 'day'
    const hostFilter = { hostname: host }

    const [statsRange, statsPrev, pageviewsChart] = await Promise.all([
      umamiGet(token, '/stats', { startAt: rangeStart, endAt: now, ...hostFilter }),
      umamiGet(token, '/stats', { startAt: prevRangeStart, endAt: rangeStart, ...hostFilter }),
      umamiGet(token, '/pageviews', { startAt: rangeStart, endAt: now, unit, ...hostFilter }),
    ])

    const visitors = statsRange?.visitors?.value ?? statsRange?.visitors ?? 0
    const visitorsPrev = statsPrev?.visitors?.value ?? statsPrev?.visitors ?? 0
    const pageviews = statsRange?.pageviews?.value ?? statsRange?.pageviews ?? 0
    const pageviewsPrev = statsPrev?.pageviews?.value ?? statsPrev?.pageviews ?? 0

    const pvData = pageviewsChart?.pageviews || pageviewsChart || []
    const trend = pvData.map(d => d.y ?? d.value ?? 0)

    const result = {
      host,
      visitors: formatNum(visitors),
      pageviews: formatNum(pageviews),
      visitorsDelta: pctDelta(visitors, visitorsPrev),
      pageviewsDelta: pctDelta(pageviews, pageviewsPrev),
      trend,
      ts: now,
    }

    cache.set(cacheKey, { data: result, ts: now })
    return res.status(200).json(result)
  } catch (err) {
    console.error('metrics-summary API error:', err)
    return res.status(500).json({ error: err.message })
  }
}
