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
      '@kolkrabbi/kol-workshop',
      '@kolkrabbi/kol-dashboards',
      '@kolkrabbi/kol-chess',
      '@kolkrabbi/kol-brand'
    ]
  },
  resolve: {
    alias: {
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
