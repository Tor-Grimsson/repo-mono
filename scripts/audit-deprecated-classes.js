#!/usr/bin/env node

/**
 * Audit Deprecated CSS Classes
 *
 * Scans the codebase for deprecated CSS classes and patterns from the old color system.
 * Run with: node scripts/audit-deprecated-classes.js
 *
 * Based on color system v3.1 (2025-10-16)
 * See: docs/system/2.0-color-system.md
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Deprecated patterns to search for
const deprecatedPatterns = [
  {
    pattern: /className="[^"]*\bsurface-inverse\b(?!\w)/g,
    description: 'Deprecated `.surface-inverse` class (use `.bg-surface-inverse` instead)',
    suggestion: 'Replace with `.bg-surface-inverse` which automatically sets both background and foreground',
    severity: 'error'
  },
  {
    pattern: /className="[^"]*\bborder-auto-10\b/g,
    description: 'Deprecated `.border-auto-10` class (use `.border-auto` instead)',
    suggestion: 'Replace with `.border-auto` (uses --kol-border-default)',
    severity: 'warning'
  },
  {
    pattern: /className="[^"]*\bdivider-auto-10\b/g,
    description: 'Deprecated `.divider-auto-10` class (use `.divider-auto` instead)',
    suggestion: 'Replace with `.divider-auto`',
    severity: 'warning'
  },
  {
    pattern: /var\(--surface-inverse\)/g,
    description: 'Direct usage of `--surface-inverse` token in inline styles',
    suggestion: 'Use `.bg-surface-inverse` utility class or `--kol-surface-inverse` token',
    severity: 'warning'
  },
  {
    pattern: /var\(--surface-primary\)/g,
    description: 'Direct usage of `--surface-primary` token in inline styles',
    suggestion: 'Use `.bg-surface-primary` utility class or `--kol-surface-primary` token',
    severity: 'info'
  },
  {
    pattern: /var\(--foreground\)(?!\w)/g,
    description: 'Direct usage of `--foreground` token in inline styles',
    suggestion: 'Use utility classes which automatically pair foreground colors',
    severity: 'info'
  },
  {
    pattern: /className="[^"]*\bbg-auto\b/g,
    description: 'Usage of `.bg-auto` context wrapper',
    suggestion: 'Consider explicit surface utilities like `.bg-surface-primary` for clarity',
    severity: 'info'
  },
  {
    pattern: /className="[^"]*\btext-auto\b/g,
    description: 'Usage of `.text-auto` context wrapper',
    suggestion: 'Foreground colors are automatically paired with surface utilities',
    severity: 'info'
  }
]

const results = {
  error: [],
  warning: [],
  info: []
}

let totalFiles = 0
let scannedFiles = 0

function shouldIgnore(filePath) {
  const ignorePaths = [
    'node_modules',
    'dist',
    'build',
    '.next',
    'coverage',
    '.git',
    'scripts/audit-deprecated-classes.js' // Don't scan self
  ]
  return ignorePaths.some(ignore => filePath.includes(ignore))
}

function scanFile(filePath) {
  if (shouldIgnore(filePath)) return

  const ext = filePath.split('.').pop()
  if (!['js', 'jsx', 'ts', 'tsx'].includes(ext)) return

  scannedFiles++
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relativePath = relative(rootDir, filePath)

  deprecatedPatterns.forEach(({ pattern, description, suggestion, severity }) => {
    // Reset regex lastIndex for global patterns
    pattern.lastIndex = 0

    lines.forEach((line, index) => {
      const matches = line.match(pattern)
      if (matches) {
        results[severity].push({
          file: relativePath,
          line: index + 1,
          column: line.indexOf(matches[0]) + 1,
          description,
          suggestion,
          code: line.trim(),
          severity
        })
      }
    })
  })
}

function scanDirectory(dirPath) {
  const entries = readdirSync(dirPath)

  entries.forEach(entry => {
    const fullPath = join(dirPath, entry)
    if (shouldIgnore(fullPath)) return

    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      scanDirectory(fullPath)
    } else if (stat.isFile()) {
      totalFiles++
      scanFile(fullPath)
    }
  })
}

function printResults() {
  console.log('\n' + '='.repeat(80))
  console.log('  DEPRECATED CSS CLASS AUDIT')
  console.log('  Color System v3.1 (2025-10-16)')
  console.log('='.repeat(80) + '\n')

  const totalIssues = results.error.length + results.warning.length + results.info.length

  if (totalIssues === 0) {
    console.log('✅ No deprecated patterns found!\n')
    console.log(`Scanned ${scannedFiles} files`)
    return
  }

  // Print errors
  if (results.error.length > 0) {
    console.log(`\n🔴 ERRORS (${results.error.length})\n`)
    results.error.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}:${issue.column}`)
      console.log(`    ❌ ${issue.description}`)
      console.log(`    💡 ${issue.suggestion}`)
      console.log(`    📝 ${issue.code}`)
      console.log()
    })
  }

  // Print warnings
  if (results.warning.length > 0) {
    console.log(`\n⚠️  WARNINGS (${results.warning.length})\n`)
    results.warning.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}:${issue.column}`)
      console.log(`    ⚠️  ${issue.description}`)
      console.log(`    💡 ${issue.suggestion}`)
      console.log(`    📝 ${issue.code}`)
      console.log()
    })
  }

  // Print info
  if (results.info.length > 0) {
    console.log(`\nℹ️  INFO (${results.info.length})\n`)
    results.info.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}:${issue.column}`)
      console.log(`    ℹ️  ${issue.description}`)
      console.log(`    💡 ${issue.suggestion}`)
      console.log(`    📝 ${issue.code}`)
      console.log()
    })
  }

  // Summary
  console.log('='.repeat(80))
  console.log('\n📊 SUMMARY\n')
  console.log(`  Total files scanned: ${scannedFiles}`)
  console.log(`  Errors:              ${results.error.length}`)
  console.log(`  Warnings:            ${results.warning.length}`)
  console.log(`  Info:                ${results.info.length}`)
  console.log(`  Total issues:        ${totalIssues}`)
  console.log()

  if (results.error.length > 0) {
    console.log('❌ Audit failed with errors. Please fix critical issues.')
    process.exit(1)
  } else if (results.warning.length > 0) {
    console.log('⚠️  Audit completed with warnings.')
    process.exit(0)
  } else {
    console.log('✅ Audit completed successfully.')
    process.exit(0)
  }
}

// Main execution
console.log('🔍 Scanning codebase for deprecated CSS patterns...\n')

const appsDir = join(rootDir, 'apps', 'web', 'src')
const packagesDir = join(rootDir, 'packages')

scanDirectory(appsDir)
scanDirectory(packagesDir)

printResults()
