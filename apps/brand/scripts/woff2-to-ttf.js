/**
 * Build-time decompressor: turns every woff2 in
 *   public/fonts/Right-Grotesk/
 * into a sibling ttf in
 *   public/fonts/Right-Grotesk-ttf/
 *
 * Why: opentype.js (browser) only parses ttf/otf/woff. wawoff2 uses Node fs
 * + emscripten internals, so it works server-side here but won't bundle for
 * the browser. Pre-converting once is cleaner than a Vite plugin and lets
 * the morph engine load ttf directly.
 *
 * Run with: node scripts/woff2-to-ttf.js
 */

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { decompress } from 'wawoff2'

const __filename = fileURLToPath(import.meta.url)
const ROOT = dirname(dirname(__filename))

const SOURCES = [
  'public/fonts/Right-Grotesk',
]

async function exists(p) {
  try { await stat(p); return true } catch { return false }
}

async function convertDir(srcRel) {
  const src = join(ROOT, srcRel)
  const dst = src + '-ttf'
  await mkdir(dst, { recursive: true })

  const files = (await readdir(src)).filter((f) => f.endsWith('.woff2'))
  let done = 0
  for (const file of files) {
    const ttfName = file.replace(/\.woff2$/, '.ttf')
    const ttfPath = join(dst, ttfName)
    if (await exists(ttfPath)) {
      done++
      continue
    }
    const buffer = await readFile(join(src, file))
    const ttf    = await decompress(new Uint8Array(buffer))
    await writeFile(ttfPath, ttf)
    done++
    if (done % 10 === 0 || done === files.length) {
      console.log(`  [${done}/${files.length}] ${ttfName}`)
    }
  }
  console.log(`✓ ${srcRel} → ${srcRel}-ttf (${files.length} fonts)`)
}

for (const dir of SOURCES) {
  console.log(`Converting ${dir} …`)
  await convertDir(dir)
}
