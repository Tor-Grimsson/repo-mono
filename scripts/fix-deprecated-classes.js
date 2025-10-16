#!/usr/bin/env node

/**
 * Fix Deprecated CSS Classes
 *
 * Automatically fixes deprecated CSS classes and patterns from the old color system.
 * Run with: node scripts/fix-deprecated-classes.js
 *
 * Based on color system v3.1 (2025-10-16)
 * See: docs/system/2.0-color-system.md
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const fixes = {
  applied: 0,
  files: new Set()
}

// Fix patterns - order matters (most specific first)
const fixPatterns = [
  {
    // Fix .surface-inverse class (not preceded by bg- or after a dash)
    pattern: /className="([^"]*)\bsurface-inverse\b(?!\w)/g,
    replace: (match, classNames) => {
      return `className="${classNames.replace(/\bsurface-inverse\b/, 'bg-surface-inverse')}"`
    },
    description: '.surface-inverse → .bg-surface-inverse'
  },
  {
    // Fix .border-auto-10
    pattern: /\bborder-auto-10\b/g,
    replace: 'border-auto',
    description: '.border-auto-10 → .border-auto'
  },
  {
    // Fix .divider-auto-10
    pattern: /\bdivider-auto-10\b/g,
    replace: 'divider-auto',
    description: '.divider-auto-10 → .divider-auto'
  },
  {
    // Fix inline var(--surface-inverse)
    pattern: /var\(--surface-inverse\)/g,
    replace: 'var(--kol-surface-inverse)',
    description: 'var(--surface-inverse) → var(--kol-surface-inverse)'
  }
]

function shouldIgnore(filePath) {
  const ignorePaths = [
    'node_modules',
    'dist',
    'build',
    '.next',
    'coverage',
    '.git',
    'scripts/', // Don't modify scripts
    'docs/' // Don't modify documentation
  ]
  return ignorePaths.some(ignore => filePath.includes(ignore))
}

function fixFile(filePath) {
  if (shouldIgnore(filePath)) return

  const ext = filePath.split('.').pop()
  if (!['js', 'jsx', 'ts', 'tsx'].includes(ext)) return

  let content = readFileSync(filePath, 'utf-8')
  const originalContent = content
  let fileFixed = false

  fixPatterns.forEach(({ pattern, replace, description }) => {
    const matches = content.match(pattern)
    if (matches) {
      if (typeof replace === 'function') {
        content = content.replace(pattern, replace)
      } else {
        content = content.replace(pattern, replace)
      }

      if (content !== originalContent) {
        fileFixed = true
        fixes.applied += matches.length
        console.log(`  ✓ ${description} (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`)
      }
    }
  })

  if (fileFixed) {
    writeFileSync(filePath, content, 'utf-8')
    fixes.files.add(relative(rootDir, filePath))
  }

  return fileFixed
}

function fixDirectory(dirPath) {
  const entries = readdirSync(dirPath)

  entries.forEach(entry => {
    const fullPath = join(dirPath, entry)
    if (shouldIgnore(fullPath)) return

    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      fixDirectory(fullPath)
    } else if (stat.isFile()) {
      const relativePath = relative(rootDir, fullPath)
      const fixed = fixFile(fullPath)
      if (fixed) {
        console.log(`\n📝 ${relativePath}`)
      }
    }
  })
}

// Main execution
console.log('\n' + '='.repeat(80))
console.log('  AUTOMATIC FIX: DEPRECATED CSS CLASSES')
console.log('  Color System v3.1 (2025-10-16)')
console.log('='.repeat(80) + '\n')

console.log('🔧 Applying fixes...\n')

const appsDir = join(rootDir, 'apps', 'web', 'src')
const packagesDir = join(rootDir, 'packages')

fixDirectory(appsDir)
fixDirectory(packagesDir)

console.log('\n' + '='.repeat(80))
console.log('\n📊 SUMMARY\n')
console.log(`  Files modified:      ${fixes.files.size}`)
console.log(`  Total fixes applied: ${fixes.applied}`)
console.log()

if (fixes.files.size > 0) {
  console.log('✅ Fixes applied successfully!\n')
  console.log('Modified files:')
  Array.from(fixes.files).sort().forEach(file => {
    console.log(`  - ${file}`)
  })
  console.log()
  console.log('💡 Run the audit script to verify: node scripts/audit-deprecated-classes.js')
} else {
  console.log('ℹ️  No deprecated patterns found to fix.')
}

console.log()
