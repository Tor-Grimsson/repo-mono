/**
 * @kol/ui - Shared UI Components Package
 * 
 * Exports all shared components, design tokens, and utilities
 * for kolkrabbi.io monorepo apps
 */

// Atomic Components
export * from './atoms/index.js'

// Common Components
export * from './common/index.js'

// Specimen Components
export { default as SpecimenEmbed } from './specimen/SpecimenEmbed.jsx'

// Note: Layout components (Navbar, Footer) are app-specific
// and should be implemented per-app, not shared
