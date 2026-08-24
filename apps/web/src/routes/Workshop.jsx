import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SEO from '../components/layout/SEO'
import { WORKSHOP_ROUTES } from '../data/workshop/navigation'
import { EMBED_GROUPS } from '../data/workshop/embedSections'
import { APPARAT_TOOLS } from '../data/workshop/apparatTools'

// Flat workshop-relative path → page label map, built once from the nav data.
// Section paths resolve to the section label (set after children so it wins).
const WORKSHOP_TITLES = (() => {
  const map = {}
  for (const route of WORKSHOP_ROUTES) {
    for (const child of route.children || []) map[child.path] = child.label
    map[route.path] = route.label
  }
  for (const group of Object.values(EMBED_GROUPS)) {
    for (const page of group.pages) map[page.path] = page.label
  }
  for (const tool of APPARAT_TOOLS) {
    map[`apparat/${tool.id}`] = tool.label
    map[`apparat/${tool.id}/live`] = tool.label
  }
  return map
})()

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
