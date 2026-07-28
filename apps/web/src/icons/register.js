// Consumer-registered icons (kol-icons 0.8 is v1-only; socials are web's own).
// Filename = icon name; SVGs use currentColor.
import { registerIcons } from '@kolkrabbi/kol-icons'

registerIcons(import.meta.glob('./social/*.svg', { eager: true, query: '?raw', import: 'default' }))
