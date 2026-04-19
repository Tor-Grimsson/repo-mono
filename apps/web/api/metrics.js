const UMAMI_URL = 'https://kol-umami.vercel.app'
const WEBSITE_ID = 'fcd04534-5dcd-44a3-b7b1-256cbdf49ab9'
const UMAMI_USER = process.env.UMAMI_USER || 'admin'
const UMAMI_PASS = process.env.UMAMI_PASS

// Cache in-memory (serverless cold starts reset this, but helps within a warm instance)
// Keyed by `${rangeMs}:${host}` so each (range, host) combination has its own entry.
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

function msToReadable(ms) {
  const s = Math.round(ms / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
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

const PALETTE = [
  'var(--kol-palette-blue)',
  'var(--kol-palette-green)',
  'var(--kol-palette-orange)',
  'var(--kol-palette-purple)',
  'var(--kol-palette-red)',
]

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  // Parse range from query string (milliseconds)
  const rangeMs = parseInt(req.query?.range, 10) || 30 * 86400000
  const host = typeof req.query?.host === 'string' && req.query.host.trim() ? req.query.host.trim() : null
  const cacheKey = `${rangeMs}:${host ?? 'all'}`
  const hostFilter = host ? { hostname: host } : {}

  // Serve cache if fresh and same (range, host)
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json(cached.data)
  }

  try {
    const token = await getToken()

    const now = Date.now()
    const todayStart = new Date().setHours(0, 0, 0, 0)
    const yesterdayStart = todayStart - 86400000
    const rangeStart = now - rangeMs
    const prevRangeStart = rangeStart - rangeMs
    const unit = rangeMs <= 86400000 ? 'hour' : rangeMs <= 7 * 86400000 ? 'day' : 'day'

    // Parallel fetches. `hostFilter` is spread into every call so a host=X query
    // scopes the entire dashboard to that hostname. topHosts itself isn't scoped —
    // it's always the full hostname breakdown (used to populate filter pills).
    const [
      statsToday,
      statsYesterday,
      statsRange,
      statsPrevRange,
      pageviewsChart,
      topPagesRaw,
      topCountriesRaw,
      topReferrersRaw,
      topBlogRaw,
      devicesRaw,
      topHostsRaw,
      topHostsPrevRaw,
      sessionsRaw,
    ] = await Promise.all([
      umamiGet(token, '/stats', { startAt: todayStart, endAt: now, ...hostFilter }),
      umamiGet(token, '/stats', { startAt: yesterdayStart, endAt: todayStart, ...hostFilter }),
      umamiGet(token, '/stats', { startAt: rangeStart, endAt: now, ...hostFilter }),
      umamiGet(token, '/stats', { startAt: prevRangeStart, endAt: rangeStart, ...hostFilter }),
      umamiGet(token, '/pageviews', { startAt: rangeStart, endAt: now, unit, ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'path', limit: 10, ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'country', limit: 5, ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'referrer', limit: 5, ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'path', limit: 10, search: '/stack', ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'device', limit: 5, ...hostFilter }),
      umamiGet(token, '/metrics', { startAt: rangeStart, endAt: now, type: 'hostname', limit: 10 }),
      umamiGet(token, '/metrics', { startAt: prevRangeStart, endAt: rangeStart, type: 'hostname', limit: 10 }),
      Promise.resolve(null), // sessions — no per-visit duration available from this endpoint
    ])

    // Row 1 — Key metrics
    const visitorsToday = statsToday?.visitors?.value ?? statsToday?.visitors ?? 0
    const visitorsYesterday = statsYesterday?.visitors?.value ?? statsYesterday?.visitors ?? 0
    const visitorsRange = statsRange?.visitors?.value ?? statsRange?.visitors ?? 0
    const visitorsPrevRangeCount = statsPrevRange?.visitors?.value ?? statsPrevRange?.visitors ?? 0
    const isToday = rangeMs <= 86400000
    const visitorsDisplay = isToday ? visitorsToday : visitorsRange
    const visitorsDeltaBase = isToday ? visitorsYesterday : visitorsPrevRangeCount
    const visitorsDeltaLabel = isToday ? 'vs yesterday' : 'vs prev period'
    const pageviewsToday = statsToday?.pageviews?.value ?? statsToday?.pageviews ?? 0
    const pageviewsRange = statsRange?.pageviews?.value ?? statsRange?.pageviews ?? 0
    const pageviewsDisplay = isToday ? pageviewsToday : pageviewsRange
    const pagesPerVisit = visitorsDisplay > 0 ? (pageviewsDisplay / visitorsDisplay).toFixed(1) : '0'

    const avgTimeRange = statsRange?.totaltime?.value ?? statsRange?.totaltime ?? 0
    const avgTimePrev = statsPrevRange?.totaltime?.value ?? statsPrevRange?.totaltime ?? 0
    const timeDelta = (avgTimeRange - avgTimePrev) / 1000

    const bounceRange = statsRange?.bounces?.value ?? statsRange?.bounces ?? 0
    const visitsRange = statsRange?.visits?.value ?? statsRange?.visits ?? 1
    const bounceRate = ((bounceRange / visitsRange) * 100).toFixed(1)

    // Row 2 — Daily visits (stacked bar shape)
    const pvData = pageviewsChart?.pageviews || pageviewsChart || []
    const sessData = pageviewsChart?.sessions || []
    const dailyVisits = pvData.map((d, i) => {
      const pv = d.y ?? d.value ?? 0
      const sess = sessData[i]?.y ?? sessData[i]?.value ?? Math.round(pv * 0.6)
      const bounce = Math.round(sess * 0.15)
      const returning = Math.round(sess * 0.35)
      const newV = sess - returning - bounce
      return { win: Math.max(newV, 0), draw: returning, loss: bounce, total: pv }
    })
    const totalVisitsRange = dailyVisits.reduce((s, d) => s + d.total, 0)

    // Range comparison for alert card
    const visitsThisRange = statsRange?.pageviews?.value ?? statsRange?.pageviews ?? 0
    const visitsPrevRange = statsPrevRange?.pageviews?.value ?? statsPrevRange?.pageviews ?? 0
    const rangeDelta = pctDelta(visitsThisRange, visitsPrevRange)
    const rangeDiff = visitsThisRange - visitsPrevRange

    // Row 3 — Top pages
    const topPagesTotal = (topPagesRaw || []).reduce((s, p) => s + (p.y ?? p.value ?? 0), 0)
    const topPages = (topPagesRaw || []).map((p, i) => {
      const v = p.y ?? p.value ?? 0
      return {
        label: p.x ?? p.name ?? p.url ?? '/',
        value: `${formatNum(v)} views`,
        percent: topPagesTotal > 0 ? Math.round((v / topPagesTotal) * 100) : 0,
        color: PALETTE[i % PALETTE.length],
      }
    })

    // Row 3 — Top countries
    const countryNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const topCountriesTotal = (topCountriesRaw || []).reduce((s, c) => s + (c.y ?? c.value ?? 0), 0)
    const topCountries = (topCountriesRaw || []).map((c, i) => {
      const v = c.y ?? c.value ?? 0
      const code = c.x ?? c.name ?? c.country ?? 'Unknown'
      let label = code
      try {
        label = countryNames.of(code) ?? code
      } catch {}
      return {
        label,
        value: formatNum(v),
        detail: topCountriesTotal > 0 ? `${Math.round((v / topCountriesTotal) * 100)}%` : '0%',
        color: PALETTE[i % PALETTE.length],
      }
    })

    // Row 3 — Top hosts (subdomains). Filter out Vercel preview URLs and map prev-period
    // pageviews in by hostname so each row can show a delta.
    const hostNameOf = (h) => h.x ?? h.name ?? h.hostname ?? ''
    const isTrackedHost = (name) => !!name && !name.endsWith('.vercel.app')
    const prevByHost = new Map(
      (topHostsPrevRaw || []).map(h => [hostNameOf(h), h.y ?? h.value ?? 0])
    )
    const topHostsFiltered = (topHostsRaw || []).filter(h => isTrackedHost(hostNameOf(h)))
    const topHostsTotal = topHostsFiltered.reduce((s, h) => s + (h.y ?? h.value ?? 0), 0)
    const topHosts = topHostsFiltered.map((h, i) => {
      const name = hostNameOf(h)
      const v = h.y ?? h.value ?? 0
      const prev = prevByHost.get(name) ?? 0
      return {
        label: name || 'Unknown',
        value: `${formatNum(v)} views`,
        percent: topHostsTotal > 0 ? Math.round((v / topHostsTotal) * 100) : 0,
        delta: pctDelta(v, prev),
        color: PALETTE[i % PALETTE.length],
      }
    })

    // Row 4 — Blog posts
    const blogPosts = (topBlogRaw || []).filter(p => {
      const path = p.x ?? p.name ?? p.url ?? ''
      return path && path !== '/stack/'
    }).map(p => ({
      label: (p.x ?? p.name ?? p.url ?? '').replace('/stack/', '').replace(/^\/stack$/, 'Stack index').replace(/-/g, ' ') || 'Stack index',
      value: `${formatNum(p.y ?? p.value ?? 0)} reads`,
    }))

    // Row 4 — Referrers
    const refTotal = (topReferrersRaw || []).reduce((s, r) => s + (r.y ?? r.value ?? 0), 0)
    const referrers = (topReferrersRaw || []).map((r, i) => {
      const v = r.y ?? r.value ?? 0
      return {
        label: r.x ?? r.name ?? r.referrer ?? 'Direct',
        value: `${formatNum(v)} visits`,
        percent: refTotal > 0 ? Math.round((v / refTotal) * 100) : 0,
        color: PALETTE[i % PALETTE.length],
      }
    })


    // Row 6 — Devices
    const devTotal = (devicesRaw || []).reduce((s, d) => s + (d.y ?? d.value ?? 0), 0)
    const devices = (devicesRaw || []).map(d => {
      const v = d.y ?? d.value ?? 0
      return {
        range: d.x ?? d.name ?? d.device ?? 'Unknown',
        count: v,
        percentage: devTotal > 0 ? Math.round((v / devTotal) * 100) : 0,
      }
    })


    const result = {
      // Row 1
      visitors: { today: formatNum(visitorsDisplay), delta: `${pctDelta(visitorsDisplay, visitorsDeltaBase)} ${visitorsDeltaLabel}`, isToday },
      pageviews: { today: formatNum(pageviewsDisplay), delta: `${pagesPerVisit} pages / visit` },
      session: { avg: msToReadable(avgTimeRange), delta: `${timeDelta >= 0 ? '+' : ''}${Math.round(timeDelta)}s vs prev period` },
      bounce: { rate: `${bounceRate}%`, delta: '' },
      // Row 2
      dailyVisits,
      totalVisitsMonth: formatNum(totalVisitsRange),
      // Row 3
      topPages,
      topCountries,
      topHosts,
      // Row 4
      blogPosts,
      referrers,
      // Row 5 — B2 placeholder (Phase 3)
      b2: null,
      // Row 6
      weeklyTraffic: { delta: rangeDelta, diff: `${rangeDiff >= 0 ? '+' : ''}${formatNum(rangeDiff)} visits` },
      devices,
      totalSessions: formatNum(devTotal),
      // Meta
      ts: now,
    }

    cache.set(cacheKey, { data: result, ts: now })
    return res.status(200).json(result)
  } catch (err) {
    console.error('Metrics API error:', err)
    return res.status(500).json({ error: err.message })
  }
}
