import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { photoIndexPlugin } from './vite-plugins/photoIndexPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    photoIndexPlugin({ photosDir: 'public/images' }),
  ],
  // Workspace hoisting can leave two physical React copies in the tree
  // (root vs apps/brand/node_modules), which crashes at runtime with a null
  // dispatcher ("w.H is null"). Force a single react / react-dom copy.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5174,
    strictPort: true,
  },
})
