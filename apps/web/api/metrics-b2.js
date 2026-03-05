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

async function b2GetBucketFiles(auth, bucketId) {
  let totalBytes = 0
  let totalFiles = 0
  let nextFileName = null
  const folders = {} // path -> { files, bytes }
  const recentFiles = [] // last 20 modified files

  // Paginate through all files
  do {
    const body = { bucketId, maxFileCount: 10000 }
    if (nextFileName) body.startFileName = nextFileName

    const res = await fetch(`${auth.apiInfo.storageApi.apiUrl}/b2api/v3/b2_list_file_names`, {
      method: 'POST',
      headers: {
        Authorization: auth.authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      console.error(`B2 list_file_names failed: ${res.status}`)
      break
    }

    const data = await res.json()
    for (const f of data.files || []) {
      const size = f.contentLength || 0
      totalBytes += size
      totalFiles++

      // Build folder tree (first path segment)
      const parts = f.fileName.split('/')
      const folder = parts.length > 1 ? parts[0] : '(root)'
      if (!folders[folder]) folders[folder] = { files: 0, bytes: 0, subfolders: {} }
      folders[folder].files++
      folders[folder].bytes += size

      // Track second-level folders too
      if (parts.length > 2) {
        const sub = parts[1]
        if (!folders[folder].subfolders[sub]) folders[folder].subfolders[sub] = { files: 0, bytes: 0 }
        folders[folder].subfolders[sub].files++
        folders[folder].subfolders[sub].bytes += size
      }

      // Track recent files (by upload timestamp)
      recentFiles.push({
        name: f.fileName,
        size,
        uploaded: f.uploadTimestamp,
      })
    }
    nextFileName = data.nextFileName || null
  } while (nextFileName)

  // Sort recent files by upload time, keep last 10
  recentFiles.sort((a, b) => b.uploaded - a.uploaded)

  // Convert folders to sorted array
  const tree = Object.entries(folders)
    .map(([name, data]) => ({
      name,
      files: data.files,
      bytes: data.bytes,
      bytesFormatted: formatBytes(data.bytes),
      subfolders: Object.entries(data.subfolders)
        .map(([sub, d]) => ({ name: sub, files: d.files, bytes: d.bytes, bytesFormatted: formatBytes(d.bytes) }))
        .sort((a, b) => b.bytes - a.bytes),
    }))
    .sort((a, b) => b.bytes - a.bytes)

  return { totalBytes, totalFiles, tree, recentFiles: recentFiles.slice(0, 10) }
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

    // Get file counts + sizes + tree for each bucket in parallel
    const rawBuckets = bucketsData.buckets || []
    const fileResults = await Promise.all(
      rawBuckets.map(b => b2GetBucketFiles(auth, b.bucketId).catch(() => ({ totalBytes: 0, totalFiles: 0, tree: [], recentFiles: [] })))
    )

    const buckets = rawBuckets.map((b, i) => {
      const r = fileResults[i]
      totalBytes += r.totalBytes
      totalFiles += r.totalFiles
      return {
        name: b.bucketName,
        id: b.bucketId,
        type: b.bucketType,
        bytes: r.totalBytes,
        files: r.totalFiles,
        bytesFormatted: formatBytes(r.totalBytes),
        tree: r.tree,
        recentFiles: r.recentFiles,
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
