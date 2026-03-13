#!/usr/bin/env node

/**
 * Sanity seed script — uploads a project from the CMS vault.
 *
 * Usage:
 *   SANITY_TOKEN=<write-token> node packages/content/scripts/seed.js <path-to-project-folder>
 *
 * Example:
 *   SANITY_TOKEN=sk... node packages/content/scripts/seed.js \
 *     "/Users/biskup/Library/Mobile Documents/com~apple~CloudDocs/Workbox/kol-vault-mgmt/kol-vault-workbox/kol-cms/cms-type/collection/logo-folio-03-2025"
 *
 * Expected folder structure:
 *   _project.md        ← YAML frontmatter with title, type, slug, year, description, about, tags, seo_title, seo_description
 *   thumbnail/01.png   ← first file used
 *   hero/01.png        ← first file used (supports .png, .jpg, .mov, .mp4, .webm)
 *   gallery/01.png ... ← all files uploaded, sorted by name
 */

import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import { parse } from 'yaml'

// ── Config ──────────────────────────────────────────────────────────
const PROJECT_ID = 'to8h15ed'
const DATASET = 'projects'
const API_VERSION = '2024-01-01'

// Read Sanity editor token from root .env
function readTokenFromEnv() {
  const envPath = join(import.meta.dirname, '..', '..', '..', '.env')
  if (!existsSync(envPath)) {
    console.error(`No .env found at ${envPath}`)
    process.exit(1)
  }
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  const keyLine = lines.find((l) => l.startsWith('key:'))
  if (!keyLine) {
    console.error('No Sanity token (key:) found in .env')
    process.exit(1)
  }
  return keyLine.replace('key:', '').trim()
}

const TOKEN = process.env.SANITY_TOKEN || readTokenFromEnv()

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

// ── Helpers ─────────────────────────────────────────────────────────
const VIDEO_EXT = ['.mp4', '.mov', '.webm']
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
const MEDIA_EXT = [...IMAGE_EXT, ...VIDEO_EXT]

function isVideo(filePath) {
  return VIDEO_EXT.includes(extname(filePath).toLowerCase())
}

function parseFrontmatter(mdPath) {
  const raw = readFileSync(mdPath, 'utf-8')
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) throw new Error(`No frontmatter found in ${mdPath}`)
  return parse(match[1])
}

function firstFile(dir) {
  if (!existsSync(dir)) return null
  const files = readdirSync(dir)
    .filter((f) => MEDIA_EXT.includes(extname(f).toLowerCase()))
    .sort()
  return files.length > 0 ? join(dir, files[0]) : null
}

function allFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => MEDIA_EXT.includes(extname(f).toLowerCase()))
    .sort()
    .map((f) => join(dir, f))
}

async function uploadAsset(filePath) {
  const ext = extname(filePath).toLowerCase()
  const type = VIDEO_EXT.includes(ext) ? 'file' : 'image'
  const buffer = readFileSync(filePath)
  const filename = basename(filePath)

  console.log(`  ↑ ${filename} (${type})`)
  const asset = await client.assets.upload(type, buffer, { filename })
  return { _type: 'reference', _ref: asset._id }
}

// ── Main ────────────────────────────────────────────────────────────
async function seed(projectDir) {
  console.log(`\nSeeding from: ${projectDir}\n`)

  // 1. Parse metadata
  const mdPath = join(projectDir, '_project.md')
  if (!existsSync(mdPath)) {
    throw new Error(`No _project.md found in ${projectDir}`)
  }
  const meta = parseFrontmatter(mdPath)
  console.log(`Project: ${meta.title} (${meta.type}/${meta.slug})`)

  // 2. Upload thumbnail
  const thumbPath = firstFile(join(projectDir, 'thumbnail'))
  let thumbnailField = undefined
  if (thumbPath) {
    const ref = await uploadAsset(thumbPath)
    thumbnailField = {
      _type: 'image',
      alt: meta.title,
      asset: ref,
    }
  } else {
    console.log('  ⚠ No thumbnail found')
  }

  // 3. Upload hero
  const heroPath = firstFile(join(projectDir, 'hero'))
  let heroImageField = undefined
  let heroVideoField = undefined
  if (heroPath) {
    const ref = await uploadAsset(heroPath)
    if (isVideo(heroPath)) {
      heroVideoField = { _type: 'file', asset: ref }
    } else {
      heroImageField = { _type: 'image', alt: meta.title, asset: ref }
    }
  } else {
    console.log('  ⚠ No hero found')
  }

  // 4. Upload gallery
  const galleryPaths = allFiles(join(projectDir, 'gallery'))
  const mediaField = []
  for (const filePath of galleryPaths) {
    const ref = await uploadAsset(filePath)
    if (isVideo(filePath)) {
      mediaField.push({
        _type: 'galleryVideo',
        _key: crypto.randomUUID().slice(0, 12),
        alt: `${meta.title} gallery`,
        asset: ref,
      })
    } else {
      mediaField.push({
        _type: 'galleryImage',
        _key: crypto.randomUUID().slice(0, 12),
        alt: `${meta.title} gallery`,
        asset: ref,
      })
    }
  }
  console.log(`  ${mediaField.length} gallery items`)

  // 5. Build document
  const doc = {
    _type: 'project',
    _id: `project-${meta.slug}`,
    title: meta.title,
    slug: { _type: 'slug', current: meta.slug },
    type: meta.type,
    description: meta.description || '',
    about: meta.about || '',
    year: String(meta.year),
    tags: meta.tags || [],
    links: (meta.links || []).map((l) => ({
      _type: 'object',
      _key: crypto.randomUUID().slice(0, 12),
      label: l.label,
      url: l.url,
    })),
    ...(thumbnailField && { thumbnail: thumbnailField }),
    ...(heroImageField && { heroImage: heroImageField }),
    ...(heroVideoField && { heroVideo: heroVideoField }),
    ...(mediaField.length > 0 && { media: mediaField }),
    seo: {
      metaTitle: meta.seo_title || '',
      metaDescription: meta.seo_description || '',
    },
  }

  // 6. Create or replace
  console.log(`\n  Creating document: ${doc._id}`)
  const result = await client.createOrReplace(doc)
  console.log(`  ✓ Done — ${result._id}\n`)
}

// ── CLI ─────────────────────────────────────────────────────────────
const dir = process.argv[2]
if (!dir) {
  console.error('Usage: SANITY_TOKEN=<token> node seed.js <project-folder>')
  process.exit(1)
}

seed(dir).catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
