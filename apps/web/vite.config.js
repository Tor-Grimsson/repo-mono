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
      '@kolkrabbi/kol-chess',
      '@kolkrabbi/kol-brand',
      '@kolkrabbi/kol-store',
      '@kolkrabbi/kol-content',
      '@kolkrabbi/kol-foundry',
      '@kolkrabbi/kol-workshop'
    ],
    // Excluded raw-source packages skip esbuild interop, so their CJS deps
    // must be pre-bundled explicitly (kol-component 0.12.5 CodeBlock chain).
    include: ['@kolkrabbi/kol-component > react-syntax-highlighter']
  },
  resolve: {
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
