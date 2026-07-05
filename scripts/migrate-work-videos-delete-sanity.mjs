#!/usr/bin/env node
/**
 * Phase 5 — cutover: unreference + delete the old Sanity video file assets.
 *
 * The Work pages now serve video from B2 (Phases 3–4, deployed + verified). This removes
 * the superseded uploads from Sanity to reclaim storage and let the plan drop to free.
 *
 * IRREVERSIBLE. Two steps, in order (Sanity won't delete a still-referenced asset):
 *   1. Unreference — unset `heroVideo` and remove `galleryVideo` items from each project's
 *      media[], but ONLY where the asset is in the Phase-2 B2 map (i.e. was migrated).
 *   2. Delete — remove those now-unreferenced file assets.
 *
 * Only touches assets present in _tmp/work-video-migration/asset-b2-map.json — never any
 * other file asset (blog videoBlock uploads, etc. are untouched).
 *
 *   node scripts/migrate-work-videos-delete-sanity.mjs            # DRY RUN — lists everything, deletes nothing
 *   SANITY_WRITE_TOKEN=xxx node scripts/… --commit                # LIVE — unref then delete
 *
 * Idempotent: a re-run finds no matching refs (already unset) → nothing to do.
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
const migratedAssetIds = new Set(Object.keys(map))

async function query(groq) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`
  const res = await fetch(url)
  const payload = await res.json()
  if (!res.ok) throw new Error(`Query failed: ${JSON.stringify(payload)}`)
  return payload.result ?? []
}

async function mutate(mutations) {
  if (!TOKEN) throw new Error('SANITY_WRITE_TOKEN not set — cannot commit.')
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

const projects = await query(
  `*[_type=="project" && (defined(heroVideo.asset) || count(media[_type=="galleryVideo"])>0)]` +
    `{_id, "slug": slug.current, "heroRef": heroVideo.asset._ref, "gv": media[_type=="galleryVideo"]{_key, "ref": asset._ref}}`
)

const patches = [] // unref: { id, slug, unset: [...] } — idempotent (empty once cut over)
for (const p of projects) {
  const unset = []
  if (p.heroRef && migratedAssetIds.has(p.heroRef)) unset.push('heroVideo')
  for (const gv of p.gv ?? []) {
    if (gv.ref && migratedAssetIds.has(gv.ref)) unset.push(`media[_key=="${gv._key}"]`)
  }
  if (unset.length) patches.push({ id: p._id, slug: p.slug, unset })
}

// Delete targets = the migrated assets from the map (NOT derived from doc refs, so a re-run
// after unref still finds them). Gate each on having ZERO references from a NON-project doc:
// a video reused in a blog videoBlock (out of scope) must survive or the blog breaks.
const mapIds = [...migratedAssetIds]
const refInfo = await query(
  `*[_id in ${JSON.stringify(mapIds)}]{_id, "extRefs": count(*[references(^._id) && _type != "project"])}`
)
const existing = new Set(refInfo.map((a) => a._id))
const deletable = refInfo.filter((a) => a.extRefs === 0).map((a) => a._id)
const blocked = refInfo.filter((a) => a.extRefs > 0)
const alreadyGone = mapIds.filter((id) => !existing.has(id))

console.log(`\nPhase 5 — unreference + delete old Sanity video assets  (${COMMIT ? 'COMMIT' : 'DRY RUN'})`)
console.log(`Project ${PROJECT_ID}/${DATASET} · map: ${mapIds.length} migrated assets\n`)

console.log('Step 1 — unreference (patch project docs):')
if (!patches.length) console.log('  (none — already unreferenced)')
for (const p of patches) console.log(`  ${p.slug}  unset: ${p.unset.join(', ')}`)

console.log(`\nStep 2 — delete ${deletable.length} unreferenced assets.`)
if (blocked.length) {
  console.log(`  SKIP ${blocked.length} still referenced by non-project docs (e.g. blog) — kept:`)
  for (const a of blocked) console.log(`    ${a._id}  (${a.extRefs} ext ref)`)
}
if (alreadyGone.length) console.log(`  (${alreadyGone.length} already deleted)`)

if (!COMMIT) {
  console.log(`\nDRY RUN — nothing changed. To apply (IRREVERSIBLE):`)
  console.log('  SANITY_WRITE_TOKEN=<editor-token> node scripts/migrate-work-videos-delete-sanity.mjs --commit\n')
} else {
  if (patches.length) {
    const r = await mutate(patches.map((p) => ({ patch: { id: p.id, unset: p.unset } })))
    console.log(`\n✓ Unreferenced. transactionId: ${r.transactionId}`)
  } else {
    console.log('\n✓ Nothing to unreference (already done).')
  }
  if (deletable.length) {
    const r = await mutate(deletable.map((id) => ({ delete: { id } })))
    console.log(`✓ Deleted ${deletable.length} assets. transactionId: ${r.transactionId}`)
  } else {
    console.log('✓ Nothing to delete.')
  }
  if (blocked.length) console.log(`⚠ Kept ${blocked.length} asset(s) still used by non-project docs (blog videoBlock — out of scope).`)
  console.log('')
}
