import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
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
      '@kolkrabbi/kol-framework',
      '@kolkrabbi/kol-media-client',
      '@kolkrabbi/kol-shell',
      '@kolkrabbi/kol-theme',
    ],
    // Excluded raw-source packages skip esbuild interop, so their CJS deps
    // must be pre-bundled explicitly (kol-component's CodeBlock + carousel chains).
    include: [
      '@kolkrabbi/kol-component > react-syntax-highlighter',
      '@kolkrabbi/kol-component > embla-carousel-react',
    ],
  },
  server: {
    host: true,
    port: 5177,
    strictPort: false,
    // Dev-only: proxy /api to the deployed Pages Functions so `pnpm dev`
    // (plain vite, no wrangler) exercises the real kol-media bucket instead
    // of `pnpm dev:cf`'s local-only R2 simulation. Build/deploy unaffected.
    proxy: {
      '/api': { target: 'https://media.kolkrabbi.io', changeOrigin: true },
    },
  },
})
