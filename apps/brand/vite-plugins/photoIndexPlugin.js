/**
 * Vite dev plugin — walks `public/photos/` and serves a JSON index at
 * `/__photos.json`. Used by tools/Gallery.jsx.
 *
 * Drop folders into public/photos/<group>/. Each top-level folder becomes a
 * group. Loose images directly under public/photos/ land in an `(root)` group.
 * Nested subdirs are flattened into their parent group.
 *
 * Dev-only. Production builds don't include the middleware; the Gallery page
 * will just render an empty state if built.
 */

import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep, posix } from 'node:path'

const IMG_RE = /\.(jpe?g|png|webp|avif|gif)$/i

function walkImages(dir, publicRoot) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    const stat = statSync(abs)
    if (stat.isDirectory()) {
      out.push(...walkImages(abs, publicRoot))
    } else if (IMG_RE.test(entry)) {
      const rel = relative(publicRoot, abs).split(sep).join(posix.sep)
      out.push('/' + rel)
    }
  }
  return out
}

export function photoIndexPlugin({
  publicRoot = 'public',
  photosDir = 'public/photos',
  endpoint = '/__photos.json',
} = {}) {
  return {
    name: 'kol-framework-photo-index',
    configureServer(server) {
      server.middlewares.use(endpoint, (req, res) => {
        try {
          let entries = []
          try {
            entries = readdirSync(photosDir)
          } catch (err) {
            if (err.code !== 'ENOENT') throw err
          }

          const groups = []
          const loose = []

          for (const entry of entries) {
            const abs = join(photosDir, entry)
            const stat = statSync(abs)
            if (stat.isDirectory()) {
              const files = walkImages(abs, publicRoot).sort()
              groups.push({ name: entry, count: files.length, files })
            } else if (IMG_RE.test(entry)) {
              const rel = relative(publicRoot, abs).split(sep).join(posix.sep)
              loose.push('/' + rel)
            }
          }

          groups.sort((a, b) => a.name.localeCompare(b.name))
          if (loose.length) {
            groups.unshift({ name: '(root)', count: loose.length, files: loose.sort() })
          }

          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify({ groups }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    },
  }
}
