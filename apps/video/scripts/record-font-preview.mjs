/**
 * Record FontPreviewSection interaction on the Málrómur typeface page.
 *
 * Records at 2x retina (2160×2700), then outputs:
 *   - font-preview-2x.mp4  (2160×2700, H.264 CRF 18)
 *   - font-preview-1x.mp4  (1080×1350, H.264 CRF 18)
 *
 * Usage: node apps/video/scripts/record-font-preview.mjs
 */

import { chromium } from 'playwright'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../out')

const VIEWPORT = { width: 1080, height: 1350 }
const RECORD_SIZE = { width: 2160, height: 2700 } // 2x retina
const PAGE_URL = 'http://localhost:5173/foundry/typefaces/malromur'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function smoothMove(page, fromX, fromY, toX, toY, { steps = 30, duration = 600 } = {}) {
  const delay = duration / steps
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const x = fromX + (toX - fromX) * ease
    const y = fromY + (toY - fromY) * ease
    await page.mouse.move(x, y)
    await page.waitForTimeout(delay)
  }
}

async function dragSlider(page, sliderEl, fromPct, toPct, { duration = 800 } = {}) {
  const box = await sliderEl.boundingBox()
  if (!box) return
  const y = box.y + box.height / 2
  const fromX = box.x + box.width * fromPct
  const toX = box.x + box.width * toPct

  await page.mouse.move(fromX, y)
  await page.waitForTimeout(100)
  await page.mouse.down()
  await smoothMove(page, fromX, y, toX, y, { steps: 40, duration })
  await page.mouse.up()
}

/** Smooth-scroll an element to vertical center of the viewport */
async function scrollToCenter(page, locator) {
  await locator.evaluate((el) => {
    const rect = el.getBoundingClientRect()
    const elCenter = rect.top + rect.height / 2
    const vpCenter = window.innerHeight / 2
    window.scrollBy({ top: elCenter - vpCenter, behavior: 'smooth' })
  })
  await page.waitForTimeout(800)
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

async function main() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: RECORD_SIZE,
    },
    colorScheme: 'dark',
  })

  const page = await context.newPage()
  await page.goto(PAGE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // Find sliders
  const sliders = page.locator('input[type="range"]')
  const sliderCount = await sliders.count()
  console.log(`Found ${sliderCount} sliders`)

  if (sliderCount === 0) {
    console.log('No sliders found — check the page URL')
    await context.close()
    await browser.close()
    return
  }

  // Scroll FontPreviewSection to center of viewport
  const firstPreviewCard = sliders.first().locator('xpath=ancestor::div[contains(@class,"min-h-40")]')
  await scrollToCenter(page, firstPreviewCard)

  // --- Interaction 1: Drag the Size slider on row 1 ---
  console.log('Dragging size slider...')
  const sizeSlider = sliders.nth(0)
  await dragSlider(page, sizeSlider, 0.45, 0.75, { duration: 1000 })
  await page.waitForTimeout(400)
  await dragSlider(page, sizeSlider, 0.75, 0.45, { duration: 800 })
  await page.waitForTimeout(600)

  // --- Interaction 2: Change weight to Bold ---
  console.log('Changing weight to Bold...')
  const headerDropdowns = page.locator('button[aria-haspopup="listbox"]')
  const headerCount = await headerDropdowns.count()
  console.log(`Found ${headerCount} dropdown buttons`)

  if (headerCount > 0) {
    const weightDropdown = headerDropdowns.first()
    await weightDropdown.click()
    await page.waitForTimeout(400)

    const boldOption = page.locator('button[role="option"]', { hasText: 'Bold' }).first()
    if (await boldOption.isVisible()) {
      await boldOption.click()
      await page.waitForTimeout(800)
    }
  }

  // --- Interaction 3: Toggle to Italic ---
  console.log('Toggling to Italic...')
  if (headerCount > 1) {
    const styleDropdown = headerDropdowns.nth(1)
    await styleDropdown.click()
    await page.waitForTimeout(400)

    const italicOption = page.locator('button[role="option"]', { hasText: 'Italic' }).first()
    if (await italicOption.isVisible()) {
      await italicOption.click()
      await page.waitForTimeout(800)
    }
  }

  // --- Interaction 4: Drag Leading slider on row 2 ---
  console.log('Adjusting leading...')
  if (sliderCount >= 5) {
    const leadingSlider = sliders.nth(4)
    await scrollToCenter(page, leadingSlider)
    await dragSlider(page, leadingSlider, 0.2, 0.7, { duration: 1000 })
    await page.waitForTimeout(400)
    await dragSlider(page, leadingSlider, 0.7, 0.2, { duration: 800 })
  }

  await page.waitForTimeout(1500)

  // Finalize video — must close context to flush recording
  const videoPath = await page.video().path()
  await context.close()
  await browser.close()

  console.log(`\nRaw recording: ${videoPath}`)

  // --- Post-process with ffmpeg ---
  const out2x = path.join(OUTPUT_DIR, 'font-preview-2x.mp4')
  const out1x = path.join(OUTPUT_DIR, 'font-preview-1x.mp4')

  console.log('Converting to MP4 (2x retina)...')
  execSync(
    `ffmpeg -y -i "${videoPath}" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${out2x}"`,
    { stdio: 'inherit' }
  )

  console.log('Downscaling to 1x...')
  execSync(
    `ffmpeg -y -i "${out2x}" -vf "scale=1080:1350" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${out1x}"`,
    { stdio: 'inherit' }
  )

  // Clean up raw .webm
  fs.unlinkSync(videoPath)

  console.log(`\nDone!`)
  console.log(`  2x: ${out2x}`)
  console.log(`  1x: ${out1x}`)
}

main().catch(console.error)
