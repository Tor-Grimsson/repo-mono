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
})
