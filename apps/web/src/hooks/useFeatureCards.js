import { useMemo } from 'react'
import { useThemeAttr } from '../hooks/useThemeAttr'

/* The four home/studio feature cards. Lived as default props inside the local
 * FeaturesCardSection fork until 2026-08-12 — the DS organism is deliberately
 * content-free ("no default copy, images, or routes live here"), so the data
 * is app-side now, theme-variant URLs included. */

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/homepage'

export function useFeatureCards() {
  const theme = useThemeAttr()
  // -w suffix for light/white variant
  const variant = theme === 'dark' ? '' : '-w'

  return useMemo(() => [
    {
      /* line art on white — 1.03 is invisible on it (CardFeatureZoomScale,
       * kol-theme 0.114.0). The dark UI-screenshot cards elsewhere keep the default. */
      zoom: 1.08,
      title: 'Type Foundry',
      icon: 'type',
      description: 'Custom typefaces',
      href: '/foundry',
      visual: `${cdnBase}/home-feat-kol/feat-kol-foundry/feat-kol-foundry${variant}-600.jpg`
    },
    {
      /* line art on white — 1.03 is invisible on it (CardFeatureZoomScale,
       * kol-theme 0.114.0). The dark UI-screenshot cards elsewhere keep the default. */
      zoom: 1.08,
      title: 'Client Work',
      icon: 'diamond',
      description: 'Selected projects and collaborations',
      href: '/work',
      visual: `${cdnBase}/home-feat-kol/feat-kol-client/feat-kol-client${variant}-600.jpg`
    },
    {
      /* line art on white — 1.03 is invisible on it (CardFeatureZoomScale,
       * kol-theme 0.114.0). The dark UI-screenshot cards elsewhere keep the default. */
      zoom: 1.08,
      title: 'Collections',
      icon: 'atomic-organism-01',
      description: 'Collection of design explorations',
      href: '/work?view=list',
      visual: `${cdnBase}/home-feat-kol/feat-kol-collections/feat-kol-collections${variant}-600.jpg`
    },
    {
      /* line art on white — 1.03 is invisible on it (CardFeatureZoomScale,
       * kol-theme 0.114.0). The dark UI-screenshot cards elsewhere keep the default. */
      zoom: 1.08,
      title: 'Workshop',
      icon: 'triangle',
      description: 'Interactive tools and utilities',
      href: '/workshop',
      visual: `${cdnBase}/home-feat-kol/feat-kol-workshop/feat-kol-workshop${variant}-600.jpg`
    }
  ], [variant])
}
