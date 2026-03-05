const UMAMI_URL = 'https://kol-umami.vercel.app'
const WEBSITE_ID = 'fcd04534-5dcd-44a3-b7b1-256cbdf49ab9'
const UMAMI_USER = process.env.UMAMI_USER || 'admin'
const UMAMI_PASS = process.env.UMAMI_PASS

// Cache in-memory (serverless cold starts reset this, but helps within a warm instance)
let cache = { data: null, ts: 0 }
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
  if (!res.ok) throw new Error(`Umami ${path} failed: ${res.status}`)
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
  if (!previous) return '+0%'
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

  // Serve cache if fresh
  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  try {
    const token = await getToken()

    const now = Date.now()
    const todayStart = new Date().setHours(0, 0, 0, 0)
    const yesterdayStart = todayStart - 86400000
    const weekAgo = now - 7 * 86400000
    const prevWeek = weekAgo - 7 * 86400000
    const monthAgo = now - 30 * 86400000

    // Parallel fetches
    const [
      statsToday,
      statsYesterday,
      statsWeek,
      statsPrevWeek,
      statsMonth,
      pageviews30d,
      topPagesRaw,
      topCountriesRaw,
      topReferrersRaw,
      topBlogRaw,
      devicesRaw,
    ] = await Promise.all([
      umamiGet(token, '/stats', { startAt: todayStart, endAt: now }),
      umamiGet(token, '/stats', { startAt: yesterdayStart, endAt: todayStart }),
      umamiGet(token, '/stats', { startAt: weekAgo, endAt: now }),
      umamiGet(token, '/stats', { startAt: prevWeek, endAt: weekAgo }),
      umamiGet(token, '/stats', { startAt: monthAgo, endAt: now }),
      umamiGet(token, '/pageviews', { startAt: monthAgo, endAt: now, unit: 'day' }),
      umamiGet(token, '/metrics', { startAt: monthAgo, endAt: now, type: 'url', limit: 5 }),
      umamiGet(token, '/metrics', { startAt: monthAgo, endAt: now, type: 'country', limit: 5 }),
      umamiGet(token, '/metrics', { startAt: monthAgo, endAt: now, type: 'referrer', limit: 5 }),
      umamiGet(token, '/metrics', { startAt: monthAgo, endAt: now, type: 'url', limit: 5, url: '/blog/*' }),
      umamiGet(token, '/metrics', { startAt: monthAgo, endAt: now, type: 'device', limit: 5 }),
    ])

    // Row 1 — Key metrics
    const visitorsToday = statsToday.visitors?.value ?? statsToday.visitors ?? 0
    const visitorsYesterday = statsYesterday.visitors?.value ?? statsYesterday.visitors ?? 0
    const pageviewsToday = statsToday.pageviews?.value ?? statsToday.pageviews ?? 0
    const pagesPerVisit = visitorsToday > 0 ? (pageviewsToday / visitorsToday).toFixed(1) : '0'

    const avgTimeWeek = statsWeek.totaltime?.value ?? statsWeek.totaltime ?? 0
    const avgTimePrevWeek = statsPrevWeek.totaltime?.value ?? statsPrevWeek.totaltime ?? 0
    const timeDelta = (avgTimeWeek - avgTimePrevWeek) / 1000

    const bounceMonth = statsMonth.bounces?.value ?? statsMonth.bounces ?? 0
    const visitsMonth = statsMonth.visits?.value ?? statsMonth.visits ?? 1
    const bounceRate = ((bounceMonth / visitsMonth) * 100).toFixed(1)

    // Row 2 — Daily visits (stacked bar shape)
    const pvData = pageviews30d.pageviews || pageviews30d || []
    const sessData = pageviews30d.sessions || []
    const dailyVisits = pvData.map((d, i) => {
      const pv = d.y ?? d.value ?? 0
      const sess = sessData[i]?.y ?? sessData[i]?.value ?? Math.round(pv * 0.6)
      const bounce = Math.round(sess * 0.15)
      const returning = Math.round(sess * 0.35)
      const newV = sess - returning - bounce
      return { win: Math.max(newV, 0), draw: returning, loss: bounce, total: pv }
    })
    const totalVisitsMonth = dailyVisits.reduce((s, d) => s + d.total, 0)

    // Row 2 — Weekly comparison for alert card
    const visitsWeek = statsWeek.pageviews?.value ?? statsWeek.pageviews ?? 0
    const visitsPrevWeek = statsPrevWeek.pageviews?.value ?? statsPrevWeek.pageviews ?? 0
    const weekDelta = pctDelta(visitsWeek, visitsPrevWeek)
    const weekDiff = visitsWeek - visitsPrevWeek

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
    const topCountriesTotal = (topCountriesRaw || []).reduce((s, c) => s + (c.y ?? c.value ?? 0), 0)
    const topCountries = (topCountriesRaw || []).map((c, i) => {
      const v = c.y ?? c.value ?? 0
      return {
        label: c.x ?? c.name ?? c.country ?? 'Unknown',
        value: formatNum(v),
        detail: topCountriesTotal > 0 ? `${Math.round((v / topCountriesTotal) * 100)}%` : '0%',
        color: PALETTE[i % PALETTE.length],
      }
    })

    // Row 4 — Blog posts
    const blogPosts = (topBlogRaw || []).map(p => ({
      label: (p.x ?? p.name ?? p.url ?? '').replace('/blog/', '').replace(/-/g, ' '),
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
      visitors: { today: formatNum(visitorsToday), delta: `${pctDelta(visitorsToday, visitorsYesterday)} vs yesterday` },
      pageviews: { today: formatNum(pageviewsToday), delta: `${pagesPerVisit} pages / visit` },
      session: { avg: msToReadable(avgTimeWeek), delta: `${timeDelta >= 0 ? '+' : ''}${Math.round(timeDelta)}s vs last week` },
      bounce: { rate: `${bounceRate}%`, delta: '' },
      // Row 2
      dailyVisits,
      totalVisitsMonth: formatNum(totalVisitsMonth),
      // Row 3
      topPages,
      topCountries,
      // Row 4
      blogPosts,
      referrers,
      // Row 5 — B2 placeholder (Phase 3)
      b2: null,
      // Row 6
      weeklyTraffic: { delta: weekDelta, diff: `${weekDiff >= 0 ? '+' : ''}${formatNum(weekDiff)} visits` },
      devices,
      totalSessions: formatNum(devTotal),
      // Meta
      ts: now,
    }

    cache = { data: result, ts: now }
    return res.status(200).json(result)
  } catch (err) {
    console.error('Metrics API error:', err)
    return res.status(500).json({ error: err.message })
  }
}
