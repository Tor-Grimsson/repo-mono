const PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'to8h15ed'
const DATASET = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'projects'
const API_VERSION = '2025-01-01'

let cache = { data: null, ts: 0 }
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

async function sanityQuery(query) {
  const params = new URLSearchParams({ query })
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?${params}`
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`Sanity query failed: ${res.status}`)
    return null
  }
  const data = await res.json()
  return data?.result
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  try {
    const [typeCounts, recentDocs, totalCount] = await Promise.all([
      // Count documents per type
      sanityQuery(`{
        "blog": count(*[_type == "blog"]),
        "project": count(*[_type == "project"]),
        "page": count(*[_type == "page"]),
        "category": count(*[_type == "category"]),
        "author": count(*[_type == "author"]),
        "tag": count(*[_type == "tag"])
      }`),
      // Last 10 edited content documents (exclude assets)
      sanityQuery(`*[_updatedAt > "2020-01-01" && !(_type in ["sanity.imageAsset", "sanity.fileAsset"])] | order(_updatedAt desc) [0...10] {
        _type,
        _updatedAt,
        "title": coalesce(title, name, _id)
      }`),
      // Total document count
      sanityQuery('count(*[!(_id in path("_.**"))])'),
    ])

    const types = typeCounts || {}
    const result = {
      totalDocuments: totalCount ?? 0,
      types: {
        blog: types.blog ?? 0,
        project: types.project ?? 0,
        page: types.page ?? 0,
        category: types.category ?? 0,
        author: types.author ?? 0,
        tag: types.tag ?? 0,
      },
      recentEdits: (recentDocs || []).map(d => ({
        type: d._type,
        title: d.title,
        updated: d._updatedAt,
      })),
      ts: Date.now(),
    }

    cache = { data: result, ts: Date.now() }
    return res.status(200).json(result)
  } catch (err) {
    console.error('Sanity metrics error:', err)
    return res.status(500).json({ error: err.message })
  }
}
