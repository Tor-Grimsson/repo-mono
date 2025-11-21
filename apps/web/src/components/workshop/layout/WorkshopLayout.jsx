import { useMemo, useState, useEffect, Suspense } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, ThemeToggleButton, useTheme } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../../data/workshop/navigation'
import { StyleguideExpansionProvider } from '../WorkshopExpansionContext'
import WorkshopSidebar, { WorkshopSidebarMobileNav } from './WorkshopSidebar'

// Helper to check if current path is a main page (not a sub-page)
const isMainPage = (path) => {
  const mainPaths = [
    '/workshop',
    '/workshop/foundations',
    '/workshop/components',
    '/workshop/apparatus',
    '/workshop/chess',
    '/workshop/docs',
    '/workshop/design-system/documentation'
  ]
  return mainPaths.includes(path)
}

const WorkshopLayout = ({ variant = 'default' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const normalizedPath = location.pathname.replace(/\/$/, '')
  const themeContext = useTheme()

  const [expandedItems, setExpandedItems] = useState({})
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSidebarLocked, setIsSidebarLocked] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Auto-collapse sidebar when entering sub-pages (unless locked)
  useEffect(() => {
    if (!isMainPage(normalizedPath) && !isSidebarLocked) {
      setIsCollapsed(true)
    }
  }, [normalizedPath, isSidebarLocked])

  const dropdownOptions = useMemo(() => {
    const flattened = WORKSHOP_ROUTES.flatMap(({ label, path, children }) => {
      if (children) {
        return children.map((child) => ({
          label: `${label}: ${child.label}`,
          value: `/workshop/${child.path}`
        }))
      }
      return [
        {
          label,
          value: path ? `/workshop/${path}` : '/workshop'
        }
      ]
    })

    return [
      ...flattened,
      { label: 'Reports: Type Report', value: '/workshop/type-report' }
    ]
  }, [])

  const currentDropdownValue = useMemo(() => {
    const match = dropdownOptions.find((option) => {
      if (option.value === '/workshop') {
        return normalizedPath === '/workshop'
      }
      return normalizedPath === option.value || normalizedPath.startsWith(`${option.value}/`)
    })
    return match ? match.value : '/workshop'
  }, [dropdownOptions, normalizedPath])

  const handleDropdownChange = (value) => {
    if (value) navigate(value, { replace: false })
  }

  const isApparatusView = normalizedPath.startsWith('/workshop/apparatus/')
  const isCompactLayout = variant === 'compact' || isApparatusView

  const gridTemplateClass = isCollapsed
    ? 'lg:grid-cols-[96px_minmax(0,1fr)]'
    : 'lg:grid-cols-[304px_minmax(0,1fr)]'

  return (
    <div className="min-h-screen w-full bg-surface-primary text-auto">
      <WorkshopSidebarMobileNav
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        normalizedPath={normalizedPath}
      />
      <div className={`mx-auto flex w-full flex-col lg:grid lg:items-stretch ${gridTemplateClass}`}>
        <WorkshopSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          isSidebarLocked={isSidebarLocked}
          setIsSidebarLocked={setIsSidebarLocked}
        />

        <main className={isCompactLayout ? 'flex-1' : 'flex-1 space-y-10'}>
          <div className="lg:hidden px-4 pt-6 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="inline-flex flex-1 items-center justify-between gap-3 rounded-full border border-fg-08 bg-fg-02 px-4 py-3 text-left transition hover:border-fg-16 focus:outline-none focus:ring-2 focus:ring-fg-24 sm:justify-start"
              >
                <div className="flex flex-col">
                  <span className="kol-helper-xs uppercase tracking-[0.08em] text-fg-48">
                    Navigation
                  </span>
                  <span className="kol-mono-text text-[14px] text-fg-80">
                    Browse workshop
                  </span>
                </div>
                <span className="kol-helper-xs text-fg-64">Open</span>
              </button>
              <ThemeToggleButton
                variant="compact"
                isToggled={themeContext.theme === 'dark'}
                onClick={themeContext.toggleTheme}
              />
            </div>
            <div className="mt-4">
              <Dropdown
                options={dropdownOptions}
                value={currentDropdownValue}
                onChange={handleDropdownChange}
              />
            </div>
          </div>

          <div className="flex h-full w-full flex-col overflow-x-hidden">
            <StyleguideExpansionProvider>
              <div className={isCompactLayout ? 'flex-1' : 'flex h-full flex-col px-4 pb-16 pt-10 sm:px-8 lg:px-12'}>
                <Suspense fallback={<div className="flex items-center justify-center p-12 text-fg-48">Loading...</div>}>
                  <Outlet />
                </Suspense>
              </div>
            </StyleguideExpansionProvider>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WorkshopLayout
