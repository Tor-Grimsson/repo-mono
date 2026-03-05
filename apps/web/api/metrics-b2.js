const B2_KEY_ID = process.env.B2_APPLICATION_KEY_ID
const B2_KEY = process.env.B2_APPLICATION_KEY

let cache = { data: null, ts: 0 }
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

async function b2Authorize() {
  const credentials = Buffer.from(`${B2_KEY_ID}:${B2_KEY}`).toString('base64')
  const res = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${credentials}` },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error(`B2 auth failed: ${res.status}`, text)
    return null
  }
  return res.json()
}

async function b2ListBuckets(auth) {
  const res = await fetch(`${auth.apiInfo.storageApi.apiUrl}/b2api/v3/b2_list_buckets`, {
    method: 'POST',
    headers: {
      Authorization: auth.authorizationToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accountId: auth.accountId }),
  })
  if (!res.ok) {
    console.error(`B2 list_buckets failed: ${res.status}`)
    return null
  }
  return res.json()
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (!B2_KEY_ID || !B2_KEY) {
    return res.status(200).json({ error: 'B2 keys not set', buckets: [] })
  }

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data)
  }

  try {
    const auth = await b2Authorize()
    if (!auth) {
      return res.status(200).json({ error: 'B2 auth failed', buckets: [] })
    }

    const bucketsData = await b2ListBuckets(auth)
    if (!bucketsData) {
      return res.status(200).json({ error: 'B2 list failed', buckets: [] })
    }

    let totalBytes = 0
    let totalFiles = 0

    const buckets = (bucketsData.buckets || []).map(b => {
      const bytes = b.totalSize || 0
      const files = b.fileCount || 0
      totalBytes += bytes
      totalFiles += files
      return {
        name: b.bucketName,
        id: b.bucketId,
        type: b.bucketType,
        bytes,
        files,
        bytesFormatted: formatBytes(bytes),
      }
    })

    const result = {
      totalBytes,
      totalFiles,
      totalFormatted: formatBytes(totalBytes),
      bucketCount: buckets.length,
      buckets,
      ts: Date.now(),
    }

    cache = { data: result, ts: Date.now() }
    return res.status(200).json(result)
  } catch (err) {
    console.error('B2 metrics error:', err)
    return res.status(200).json({ error: err.message, buckets: [] })
  }
}
