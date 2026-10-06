import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The functions in api/ only run on Vercel, so locally /api is answered by the
// deployed ones.
// ponytail: kolkrabbi.io until this app has its own deployment — point it at
// https://metrics.kolkrabbi.io when the web app's copies of the functions retire.
const API = 'https://kolkrabbi.io'
const proxy = { '/api': { target: API, changeOrigin: true } }

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Workspace hoisting can leave two physical React copies in the tree, which
  // crashes at runtime with a null dispatcher. (Same rule as apps/brand.)
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // @kolkrabbi/* publish raw source using import.meta.glob, which esbuild
    // pre-bundling can't process — serve them through the Vite plugin pipeline.
    // (Same rule as apps/web/vite.config.js.)
    exclude: [
      '@kolkrabbi/kol-icons',
      '@kolkrabbi/kol-component',
      '@kolkrabbi/kol-dashboards',
      '@kolkrabbi/kol-theme',
    ],
    // Excluded raw-source packages skip esbuild interop, so their CJS deps
    // must be pre-bundled explicitly (kol-component's CodeBlock chain).
    include: ['@kolkrabbi/kol-component > react-syntax-highlighter'],
  },
  server: {
    host: true,
    port: 5176,
    strictPort: false,
    proxy,
  },
  preview: { proxy },
})
