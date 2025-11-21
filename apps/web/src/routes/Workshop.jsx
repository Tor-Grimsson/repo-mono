import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Workshop = () => {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-surface-primary text-center py-20">Loading workshop…</div>}>
      <Outlet />
    </Suspense>
  )
}

export default Workshop
