import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SEO from '../components/layout/SEO'
import { PAGES } from '../data/workshop/pages.js'

// Flat workshop-relative path → page label map, built once from the pages.
const WORKSHOP_TITLES = Object.fromEntries(
  PAGES.flatMap((p) => [[p.id, p.title], [`${p.id}/live`, p.title]])
)

const Workshop = () => {
  const { pathname } = useLocation()
  const label = WORKSHOP_TITLES[pathname.replace(/^\/workshop\/?/, '').replace(/\/$/, '')]
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-surface-primary text-center py-20">Loading workshop…</div>}>
      <SEO
        title={label ? `${label} — Workshop | Kolkrabbi` : 'Workshop — Kolkrabbi'}
        description="Design experiments, tools, and interactive explorations."
      />
      <Outlet />
    </Suspense>
  )
}

export default Workshop
