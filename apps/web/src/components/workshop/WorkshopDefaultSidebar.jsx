import { useLocation, Link } from 'react-router-dom'
import { Icon } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation'

const WorkshopDefaultSidebar = () => {
  const location = useLocation()
  const stripped = location.pathname.replace(/^\/workshop\/?/, '')
  const firstSegment = stripped.split('/')[0]

  const parentRoute = WORKSHOP_ROUTES.find(r => r.path === firstSegment)
  const siblings = parentRoute?.children || []
  const currentChild = siblings.find(c => `/workshop/${c.path}` === location.pathname)
  const links = currentChild?.links

  return (
    <div className="space-y-4">
      {siblings.length > 1 && (
        <div>
          <div className="shell-sidebar-label">{parentRoute.label}</div>
          <nav className="space-y-0">
            {siblings.map(child => (
              <Link
                key={child.id}
                to={`/workshop/${child.path}`}
                className={`shell-sidebar-link block ${
                  location.pathname === `/workshop/${child.path}` ? 'active' : ''
                }`}
              >
                {child.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {links && (
        <div>
          <div className="shell-sidebar-label">Repository</div>
          <div className="space-y-1">
            {links.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" className="shell-sidebar-action">
                <Icon name="docs-external-link" size={14} />
                Live site
              </a>
            )}
            {links.repo && (
              <a href={links.repo} target="_blank" rel="noopener noreferrer" className="shell-sidebar-action">
                <Icon name="docs-external-link" size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      )}

      <div>
        <div className="shell-sidebar-label">Quick actions</div>
        <div className="space-y-1">
          <Link to="/workshop" className="shell-sidebar-action">
            <Icon name="layout" size={14} />
            Workshop home
          </Link>
          <button
            className="shell-sidebar-action"
            type="button"
            onClick={() => navigator.clipboard.writeText(window.location.pathname)}
            title="Copy page path to clipboard"
          >
            <Icon name="copy" size={14} />
            Copy path
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkshopDefaultSidebar
