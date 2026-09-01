import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = path.resolve(rootDir, '..', '..')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // @kolkrabbi/* publish raw source using import.meta.glob, which esbuild
    // pre-bundling can't process — serve them through the Vite plugin pipeline.
    exclude: [
      '@kolkrabbi/kol-icons',
      '@kolkrabbi/kol-component',
      '@kolkrabbi/kol-framework',
      '@kolkrabbi/kol-dashboards',
      '@kolkrabbi/kol-brand',
      '@kolkrabbi/kol-store',
      '@kolkrabbi/kol-content',
      '@kolkrabbi/kol-foundry',
      '@kolkrabbi/kol-workshop',
      '@kolkrabbi/kol-shell',
      '@kolkrabbi/kol-theme'
    ],
    // Excluded raw-source packages skip esbuild interop, so their CJS deps
    // must be pre-bundled explicitly (kol-component 0.12.5 CodeBlock chain).
    include: ['@kolkrabbi/kol-component > react-syntax-highlighter']
  },
  resolve: {
    /* dedupe — required whenever a @kolkrabbi package is linked to source with
     * `kol-link` (dotfiles docs/scripts/22-kol-link.md), and harmless when it is
     * not. Vite resolves a symlink to its REAL path, so a linked package would
     * import react — and its own @kolkrabbi deps — from the kol-ds-ui monorepo's
     * workspace instead of ours. Two Reacts break hooks with an error that blames
     * the component; two kol-icons copies break the icon set. What gets deduped
     * is what a linked package DRAGS IN, never the linked package itself. */
    dedupe: [
      'react',
      'react-dom',
      '@kolkrabbi/kol-icons',
      '@kolkrabbi/kol-theme',
      '@kolkrabbi/kol-brand',
      '@kolkrabbi/kol-component',
      '@kolkrabbi/kol-framework'
    ],
    alias: {
      // The workshop-system alias is GONE (2026-08-08): the in-repo copy is
      // retired and the app consumes the published @kolkrabbi/kol-workshop.
      '@docs': path.join(repoRoot, 'docs')
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    fs: {
      allow: [repoRoot]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_err, _req, res) => {
            res.writeHead(503, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'API unavailable in dev' }))
          })
        }
      }
    }
  }
})
