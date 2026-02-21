import { Link, useInRouterContext } from 'react-router-dom'
import { Icon, useTheme } from '@kol/ui'
import Wordmark from '../../ui/Wordmark'

const DocsPageHeader = ({ tabs = [], onSearch, searchQuery, onMenuOpen }) => {
  const { theme, toggleTheme } = useTheme()
  const hasRouter = typeof useInRouterContext === 'function' ? useInRouterContext() : false
  const LinkComponent = hasRouter ? Link : 'a'

  return (
    <div className="docs-page-header sticky top-0 z-50 flex-shrink-0">
      {/* Logo + Docs + Toggle */}
      <div className="border-b border-fg-08">
        <div className="max-w-[1400px] mx-auto px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: hamburger (mobile) + Kolkrabbi + Docs */}
            <div className="flex items-center gap-4">
              {/* Hamburger — visible below lg */}
              {onMenuOpen && (
                <button
                  type="button"
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-fg-64 hover:text-fg hover:bg-fg-08 transition-colors"
                  onClick={onMenuOpen}
                  aria-label="Open navigation menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="2" y="3.75" width="14" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="2" y="8.25" width="14" height="1.5" rx="0.75" fill="currentColor"/>
                    <rect x="2" y="12.75" width="14" height="1.5" rx="0.75" fill="currentColor"/>
                  </svg>
                </button>
              )}
              <div className="flex items-center gap-8">
                <LinkComponent {...(hasRouter ? { to: '/' } : { href: '/' })} className="flex items-center transition-opacity hover:opacity-80" style={{ width: '256px' }}>
                  <Wordmark className="h-6 w-auto" />
                </LinkComponent>
                <LinkComponent {...(hasRouter ? { to: '/docs' } : { href: '/docs' })} className="flex items-center transition-opacity hover:opacity-80">
                  <img src="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-docs/workshop-docs.svg" alt="Docs" className="wordmarkBrand h-6 w-auto" />
                </LinkComponent>
              </div>
            </div>

            {/* Right: Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center w-9 h-9 rounded-md text-fg-64 hover:text-fg hover:bg-fg-08 transition-colors"
              >
                <Icon name="theme-toggle" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="w-full border-b border-fg-08">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="docs-tabrow-items">
              <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
                {tabs.map((tab) =>
                  tab.path ? (
                    <LinkComponent key={`tab-${tab.id}`} {...(hasRouter ? { to: tab.path } : { href: tab.path })} className="docs-tab">
                      {tab.icon && <Icon name={tab.icon} size={14} />}
                      {tab.label}
                    </LinkComponent>
                  ) : (
                    <span key={`tab-${tab.id}`} className="docs-tab">
                      {tab.icon && <Icon name={tab.icon} size={14} />}
                      {tab.label}
                    </span>
                  )
                )}
              </div>
              {onSearch && (
                <div className="w-60 flex justify-start">
                  <div className="docs-tab-search-wrapper">
                    <Icon name="search-16" size={14} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery || ''}
                      onChange={(e) => onSearch(e.target.value)}
                      className="docs-tab-search"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocsPageHeader
