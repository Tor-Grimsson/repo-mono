import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { photoIndexPlugin } from './photoIndexPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    // Serves /__photos.json over public/images/ for the local Gallery page (dev).
    photoIndexPlugin({ photosDir: 'public/images' }),
  ],
  // Workspace hoisting can leave two physical React copies in the tree
  // (root vs apps/brand/node_modules), which crashes at runtime with a null
  // dispatcher ("w.H is null"). Force a single react / react-dom copy.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // @kolkrabbi/* publish raw source using import.meta.glob, which esbuild
    // pre-bundling can't process — serve them through the Vite plugin pipeline.
    // (Same rule as apps/web/vite.config.js.)
    exclude: [
      '@kolkrabbi/kol-icons',
      '@kolkrabbi/kol-framework',
      '@kolkrabbi/kol-brand',
      '@kolkrabbi/kol-component',
      '@kolkrabbi/kol-media-client',
      '@kolkrabbi/kol-shell',
    ],
    // CJS chain (elder @kol/ui CodeBlock → react-syntax-highlighter → lowlight)
    // needs explicit pre-bundling for ESM interop — same fix as apps/web.
    include: ['react-syntax-highlighter'],
  },
  server: {
    host: true,
    port: 5174,
    strictPort: false,
  },
})
