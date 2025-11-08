import { useMemo, useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, ThemeToggleButton, useTheme } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../../data/workshop/navigation'
import { StyleguideExpansionProvider } from '../WorkshopExpansionContext'
import WorkshopSidebar from './WorkshopSidebar'

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

  // Auto-collapse sidebar when entering sub-pages
  useEffect(() => {
    if (!isMainPage(normalizedPath)) {
      setIsCollapsed(true)
    }
  }, [normalizedPath])

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
      <div className={`mx-auto flex w-full flex-col lg:grid lg:items-stretch ${gridTemplateClass}`}>
        <WorkshopSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />

        <main className={isCompactLayout ? 'flex-1' : 'flex-1 space-y-10'}>
          <div className="lg:hidden px-4 pt-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <ThemeToggleButton
                variant="compact"
                isToggled={themeContext.theme === 'dark'}
                onClick={themeContext.toggleTheme}
              />
              <div className="min-w-[200px]">
                <Dropdown
                  options={dropdownOptions}
                  value={currentDropdownValue}
                  onChange={handleDropdownChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-hidden">
            <StyleguideExpansionProvider>
              <div className={isCompactLayout ? 'h-full w-full' : 'space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12'}>
                <Outlet />
              </div>
            </StyleguideExpansionProvider>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WorkshopLayout
