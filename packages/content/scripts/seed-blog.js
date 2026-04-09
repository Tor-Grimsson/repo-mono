#!/usr/bin/env node

/**
 * Sanity blog seed script — uploads a blog post from a vault folder.
 *
 * Usage:
 *   node packages/content/scripts/seed-blog.js <path-to-blog-folder>
 *
 * Expected folder structure:
 *   _blog.md           ← YAML frontmatter + markdown body
 *   cover/01.png       ← cover image (first file used)
 *   thumbnail/01.png   ← card thumbnail (first file used)
 *   images/01.png ...  ← inline images, mapped to [image: ##.ext] in body order
 *   videos/01.mp4 ...  ← inline videos, mapped to [video: ##.ext] in body order
 */

import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'
import { parse } from 'yaml'

// ── Config ──────────────────────────────────────────────────────────
const PROJECT_ID = 'to8h15ed'
const DATASET = 'projects'
const API_VERSION = '2024-01-01'

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

function uid() {
  return crypto.randomUUID().slice(0, 12)
}

function parseFrontmatterAndBody(mdPath) {
  const raw = readFileSync(mdPath, 'utf-8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/)
  if (!match) throw new Error(`No frontmatter found in ${mdPath}`)
  return { meta: parse(match[1]), body: match[2].trim() }
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

// ── Markdown → Portable Text ────────────────────────────────────────

function parseInlineMarks(text) {
  // Parse **bold**, *italic*, `code`, and [text](url)
  const children = []
  const markDefs = []
  let remaining = text

  while (remaining.length > 0) {
    // Find the next mark
    const patterns = [
      { regex: /\*\*(.+?)\*\*/, mark: 'strong' },
      { regex: /\*(.+?)\*/, mark: 'em' },
      { regex: /`([^`]+)`/, mark: 'code' },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/, mark: 'link' },
    ]

    let earliest = null
    let earliestIndex = Infinity

    for (const p of patterns) {
      const m = remaining.match(p.regex)
      if (m && m.index < earliestIndex) {
        earliest = { ...p, match: m }
        earliestIndex = m.index
      }
    }

    if (!earliest) {
      if (remaining) children.push({ _type: 'span', _key: uid(), text: remaining, marks: [] })
      break
    }

    // Text before the mark
    if (earliestIndex > 0) {
      children.push({ _type: 'span', _key: uid(), text: remaining.slice(0, earliestIndex), marks: [] })
    }

    if (earliest.mark === 'link') {
      const linkKey = uid()
      markDefs.push({ _type: 'link', _key: linkKey, href: earliest.match[2] })
      children.push({ _type: 'span', _key: uid(), text: earliest.match[1], marks: [linkKey] })
    } else {
      children.push({ _type: 'span', _key: uid(), text: earliest.match[1], marks: [earliest.mark] })
    }

    remaining = remaining.slice(earliestIndex + earliest.match[0].length)
  }

  return { children: children.length > 0 ? children : [{ _type: 'span', _key: uid(), text, marks: [] }], markDefs }
}

function makeBlock(style, text) {
  const { children, markDefs } = parseInlineMarks(text)
  return { _type: 'block', _key: uid(), style, children, markDefs }
}

function markdownToPortableText(markdown, imageAssets, videoAssets) {
  const lines = markdown.split('\n')
  const blocks = []
  let i = 0
  let imageIndex = 0
  let videoIndex = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const langMatch = line.trim().match(/^```(\w*)/)
      const language = langMatch?.[1] || 'text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      // Check if first line is a comment with filename
      let filename = ''
      const firstLine = codeLines[0] || ''
      const fileMatch = firstLine.match(/^\/\/\s*(\S+\.\w+)/)
      if (fileMatch) filename = fileMatch[1]
      blocks.push({
        _type: 'code',
        _key: uid(),
        code: codeLines.join('\n'),
        language,
        ...(filename && { filename }),
      })
      continue
    }

    // Image placeholder [image: 01.png]
    if (line.trim().match(/^\[image:\s*(.+?)\]$/)) {
      const asset = imageAssets[imageIndex]
      if (asset) {
        blocks.push({
          _type: 'image',
          _key: uid(),
          asset: asset,
          alt: `Monitor — inline image ${imageIndex + 1}`,
        })
        imageIndex++
      }
      i++
      continue
    }

    // Video placeholder [video: 01.mp4]
    if (line.trim().match(/^\[video:\s*(.+?)\]$/)) {
      const asset = videoAssets[videoIndex]
      if (asset) {
        blocks.push({
          _type: 'videoBlock',
          _key: uid(),
          file: { _type: 'file', asset: asset },
          autoplay: true,
          loop: true,
          muted: true,
          controls: true,
        })
        videoIndex++
      }
      i++
      continue
    }

    // YouTube embed [youtube: url]
    if (line.trim().match(/^\[youtube:\s*(.+?)\]$/)) {
      const url = line.trim().match(/^\[youtube:\s*(.+?)\]$/)[1]
      blocks.push({
        _type: 'videoBlock',
        _key: uid(),
        embedUrl: url,
        controls: true,
      })
      i++
      continue
    }

    // Headings
    if (line.startsWith('#### ')) {
      blocks.push(makeBlock('h4', line.slice(5)))
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push(makeBlock('h3', line.slice(4)))
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push(makeBlock('h2', line.slice(3)))
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push(makeBlock('blockquote', line.slice(2)))
      i++
      continue
    }

    // Numbered list
    if (line.match(/^\d+\.\s/)) {
      const listItems = []
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        const text = lines[i].replace(/^\d+\.\s/, '')
        const { children, markDefs } = parseInlineMarks(text)
        listItems.push({
          _type: 'block',
          _key: uid(),
          style: 'normal',
          listItem: 'number',
          level: 1,
          children,
          markDefs,
        })
        i++
      }
      blocks.push(...listItems)
      continue
    }

    // Bullet list
    if (line.match(/^[-*]\s/)) {
      const listItems = []
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        const text = lines[i].replace(/^[-*]\s/, '')
        const { children, markDefs } = parseInlineMarks(text)
        listItems.push({
          _type: 'block',
          _key: uid(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children,
          markDefs,
        })
        i++
      }
      blocks.push(...listItems)
      continue
    }

    // Regular paragraph
    blocks.push(makeBlock('normal', line))
    i++
  }

  return blocks
}

// ── Main ────────────────────────────────────────────────────────────
async function seed(blogDir) {
  console.log(`\nSeeding blog from: ${blogDir}\n`)

  // 1. Parse metadata and body
  const mdPath = join(blogDir, '_blog.md')
  if (!existsSync(mdPath)) throw new Error(`No _blog.md found in ${blogDir}`)
  const { meta, body } = parseFrontmatterAndBody(mdPath)
  console.log(`Blog: ${meta.title} (${meta.slug})`)

  // 2. Upload cover image
  const coverPath = firstFile(join(blogDir, 'cover'))
  let coverField = undefined
  if (coverPath) {
    const ref = await uploadAsset(coverPath)
    coverField = { _type: 'image', alt: meta.title, asset: ref }
  } else {
    console.log('  ⚠ No cover image found')
  }

  // 3. Upload thumbnail
  const thumbPath = firstFile(join(blogDir, 'thumbnail'))
  let thumbnailField = undefined
  if (thumbPath) {
    const ref = await uploadAsset(thumbPath)
    thumbnailField = { _type: 'image', alt: meta.title, asset: ref }
  } else {
    console.log('  ⚠ No thumbnail found')
  }

  // 4. Upload inline images
  const imagePaths = allFiles(join(blogDir, 'images'))
  const imageAssets = []
  for (const p of imagePaths) {
    const ref = await uploadAsset(p)
    imageAssets.push(ref)
  }
  console.log(`  ${imageAssets.length} inline images`)

  // 5. Upload inline videos
  const videoPaths = allFiles(join(blogDir, 'videos'))
  const videoAssets = []
  for (const p of videoPaths) {
    const ref = await uploadAsset(p)
    videoAssets.push(ref)
  }
  console.log(`  ${videoAssets.length} inline videos`)

  // 6. Parse body to Portable Text
  const bodyBlocks = markdownToPortableText(body, imageAssets, videoAssets)
  console.log(`  ${bodyBlocks.length} body blocks`)

  // 7. Build document
  const doc = {
    _type: 'blog',
    _id: `blog-${meta.slug}`,
    title: meta.title,
    slug: { _type: 'slug', current: meta.slug },
    excerpt: meta.excerpt || '',
    type: meta.type || 'research',
    author: meta.author ? { _type: 'reference', _ref: meta.author } : undefined,
    publishedAt: new Date().toISOString(),
    featured: meta.featured ?? true,
    tags: meta.tags || [],
    ...(coverField && { coverImage: coverField }),
    ...(thumbnailField && { thumbnail: thumbnailField }),
    body: bodyBlocks,
    sources: (meta.sources || []).map((s) => ({
      _type: 'object',
      _key: uid(),
      title: s.title,
      url: s.url,
      meta: s.meta || '',
    })),
    relatedProjects: (meta.relatedProjects || []).map((id) => ({
      _type: 'reference',
      _key: uid(),
      _ref: id,
    })),
    toc: (meta.toc || []).map((t) => ({
      _type: 'object',
      _key: uid(),
      title: t.title,
      targetId: { _type: 'slug', current: t.targetId },
      summary: t.summary || '',
      bullets: t.bullets || [],
    })),
    seo: meta.seo_title ? {
      seoTitle: meta.seo_title,
      seoDescription: meta.seo_description || '',
    } : undefined,
  }

  // 8. Create or replace
  console.log(`\n  Creating document: ${doc._id}`)
  const result = await client.createOrReplace(doc)
  console.log(`  ✓ Done — ${result._id}\n`)
}

// ── CLI ─────────────────────────────────────────────────────────────
const dir = process.argv[2]
if (!dir) {
  console.error('Usage: node seed-blog.js <blog-folder>')
  process.exit(1)
}

seed(dir).catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
