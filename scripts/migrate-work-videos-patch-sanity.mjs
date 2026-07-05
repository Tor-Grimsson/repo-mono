#!/usr/bin/env node
/**
 * Phase 3 — CMS repoint (work-video → B2 migration).
 *
 * Reads each project's existing Sanity video *file* references, matches them to the
 * B2 URL map emitted by Phase 2 (migrate-work-videos-to-b2.py), and patches the NEW
 * hostedVideo URL fields — ADDITIVELY, alongside the old file fields (Decision 3:
 * reversible, no downtime). Nothing is deleted here; Phase 5 (user) removes the old
 * fields + Sanity assets after Phase 4 frontend verification.
 *
 *   heroVideo (file)        → sets  heroVideoSrc  (hostedVideo)
 *   media[] galleryVideo    → inserts a galleryHostedVideo twin immediately after it
 *                             (order preserved; Phase 4 frontend prefers the hosted twin
 *                              and skips the old file item)
 *
 * Reads are public (published dataset — no token). Writes need a write-scoped token.
 *
 *   node scripts/migrate-work-videos-patch-sanity.mjs           # DRY RUN — prints the plan, writes nothing
 *   SANITY_WRITE_TOKEN=xxx node scripts/… --commit              # LIVE — posts mutations
 *
 * Idempotent: skips a project's hero if heroVideoSrc is already set, and skips a
 * gallery item if its hosted twin (_key `hv-<sourcekey>`) already exists. Safe to re-run.
 */

import { readFileSync } from 'node:fs'

const PROJECT_ID = 'to8h15ed'
const DATASET = 'projects'
const API_VERSION = '2024-01-01'
const WORKDIR = process.env.WORKDIR ?? '_tmp/work-video-migration'
const MAP_PATH = `${WORKDIR}/asset-b2-map.json`

const COMMIT = process.argv.includes('--commit')
const TOKEN = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_AUTH_TOKEN ?? null

const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'))

// Public read (no token) — apicdn is fine for a published-dataset query.
async function fetchProjects() {
  const groq = encodeURIComponent(
    `*[_type=="project" && (defined(heroVideo.asset) || count(media[_type=="galleryVideo"])>0)]` +
      `{_id, title, "slug": slug.current, heroVideo, heroVideoSrc, media}`
  )
  // api (not apicdn) — fresh/uncached, so post-commit re-reads reflect writes immediately.
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${groq}`
  const res = await fetch(url)
  const payload = await res.json()
  if (!res.ok) throw new Error(`Sanity query failed: ${JSON.stringify(payload)}`)
  return payload.result ?? []
}

// hostedVideo default aspect ratio if the old file field didn't carry one.
const HERO_DEFAULT_AR = '5:3'
const GALLERY_DEFAULT_AR = '4:5'

// Returns the hostedVideo field VALUE without _type — the caller sets _type
// ('hostedVideo' for the hero field, 'galleryHostedVideo' for a media[] array member).
// (A spread that included _type here previously clobbered the array-member type.)
function hostedFromMap(entry, aspectRatio, extra = {}) {
  const out = { src: entry.video, aspectRatio }
  if (extra.alt) out.alt = extra.alt
  if (extra.caption) out.caption = extra.caption
  return out
}

function planProject(p) {
  const set = {} // field path -> value  (for `set` patch)
  const notes = []

  // --- hero ---
  const heroRef = p.heroVideo?.asset?._ref
  if (heroRef) {
    if (p.heroVideoSrc?.src) {
      notes.push(`hero: already set (skip)`)
    } else if (map[heroRef]) {
      set['heroVideoSrc'] = { _type: 'hostedVideo', ...hostedFromMap(map[heroRef], p.heroVideo?.aspectRatio || HERO_DEFAULT_AR) }
      notes.push(`hero: → ${map[heroRef].video.split('/work/')[1]}`)
    } else {
      notes.push(`hero: ref ${heroRef} NOT in map (skip)`) // e.g. an unmigrated asset
    }
  }

  // --- gallery: rebuild media[] with a hosted twin after each mapped galleryVideo ---
  // Self-healing + idempotent: strip any previously-generated twins (`hv-` keys) first,
  // then regenerate them with the correct `_type`. Re-running after the type-bug fix
  // therefore repairs the mislabeled twins; a subsequent run is a no-op (array unchanged).
  const original = p.media ?? []
  const baseMedia = original.filter((m) => !(typeof m._key === 'string' && m._key.startsWith('hv-')))
  const newMedia = []
  for (const item of baseMedia) {
    newMedia.push(item)
    if (item._type !== 'galleryVideo') continue
    const ref = item.asset?._ref
    if (!ref || !map[ref]) {
      if (ref) notes.push(`gallery ${item._key}: ref not in map (skip)`)
      continue
    }
    newMedia.push({
      _type: 'galleryHostedVideo',
      _key: `hv-${item._key}`,
      ...hostedFromMap(map[ref], item.aspectRatio || GALLERY_DEFAULT_AR, {
        alt: item.alt,
        caption: item.caption
      })
    })
    notes.push(`gallery ${item._key}: + twin → ${map[ref].video.split('/work/')[1]}`)
  }
  // Order-insensitive compare (Sanity returns object keys in a different order than we build
  // them, which a plain JSON.stringify would read as a spurious change). Array order is kept.
  const stable = (v) =>
    JSON.stringify(v, (_, val) =>
      val && typeof val === 'object' && !Array.isArray(val)
        ? Object.fromEntries(Object.keys(val).sort().map((k) => [k, val[k]]))
        : val
    )
  if (stable(newMedia) !== stable(original)) set['media'] = newMedia

  return { id: p._id, slug: p.slug, title: p.title, set, notes, hasChange: Object.keys(set).length > 0 }
}

async function commit(patches) {
  if (!TOKEN) throw new Error('SANITY_WRITE_TOKEN not set — cannot commit. Re-run without --commit for a dry run.')
  const mutations = patches.map((pt) => ({ patch: { id: pt.id, set: pt.set } }))
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations })
  })
  const payload = await res.json()
  if (!res.ok) throw new Error(`Mutation failed: ${JSON.stringify(payload)}`)
  return payload
}

// --- run ---
const projects = await fetchProjects()
const plans = projects.map(planProject)
const changing = plans.filter((p) => p.hasChange)

console.log(`\nPhase 3 — CMS repoint  (${COMMIT ? 'COMMIT' : 'DRY RUN'})`)
console.log(`Project ${PROJECT_ID}/${DATASET} · map: ${MAP_PATH} (${Object.keys(map).length} assets)\n`)

for (const p of plans) {
  const flag = p.hasChange ? '●' : '·'
  console.log(`${flag} ${p.slug ?? p.id}  "${p.title}"`)
  for (const n of p.notes) console.log(`    ${n}`)
}

console.log(`\n${changing.length}/${plans.length} projects would be patched.`)

if (!COMMIT) {
  console.log('\nDRY RUN — nothing written. To apply:')
  console.log('  SANITY_WRITE_TOKEN=<editor-token> node scripts/migrate-work-videos-patch-sanity.mjs --commit\n')
} else {
  if (!changing.length) {
    console.log('Nothing to commit.\n')
  } else {
    const result = await commit(changing)
    console.log(`\n✓ Committed. transactionId: ${result.transactionId}\n`)
  }
}
