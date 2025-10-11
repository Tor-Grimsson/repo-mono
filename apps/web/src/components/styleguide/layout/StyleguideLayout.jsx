import { NavLink, Outlet, Link } from 'react-router-dom'
import { STYLEGUIDE_ROUTES } from '../../../data/styleguide/navigation'
import { ThemeToggle } from '@kol/ui'
import Wordmark from '../../ui/Wordmark'

const StyleguideLayout = () => {
  return (
    <div className="min-h-screen bgAbsoluteWhite textAbsoluteBlack">
      <div className="mx-auto flex w-full flex-col lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="borderAbsoluteBlack20 border-b bgAbsoluteBlack5 px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
          <div className="flex flex-1 flex-col">
            <div className="rounded-3xl borderAbsoluteBlack20 bgAbsoluteWhite px-5 py-6">
              <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-80">
                <Wordmark className="h-6 w-auto" />
              </Link>
              <h1 className="mt-4 text-2xl font-semibold textAbsoluteBlack">Design System</h1>
              <p className="mt-3 text-sm textAbsoluteBlack opacity-70">
                Tokens, components, and live previews for light & dark parity.
              </p>
            </div>
            <nav className="mt-6 hidden flex-1 flex-col gap-1 lg:flex">
              {STYLEGUIDE_ROUTES.map(({ id, label, path }) => (
                <NavLink
                  key={id}
                  to={path ? path : '.'}
                  end={path === ''}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bgAbsoluteBlack textAbsoluteWhite'
                      : 'textAbsoluteBlack opacity-70 hover:bgAbsoluteBlack10 hover:textAbsoluteBlack hover:opacity-100'
                  }`
                }
              >
                {label}
              </NavLink>
              ))}
            </nav>
            <div className="hidden lg:flex">
              <ThemeToggle variant="compact" />
            </div>
          </div>
          <div className="mt-8 lg:hidden">
            <ThemeToggle />
          </div>
        </aside>

        <main className="flex-1 space-y-10">
          <div className="lg:hidden">
            <div className="flex flex-wrap gap-2">
            {STYLEGUIDE_ROUTES.map(({ id, label, path }) => (
              <NavLink
                key={id}
                to={path ? path : '.'}
                end={path === ''}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bgAbsoluteBlack textAbsoluteWhite'
                        : 'bgAbsoluteBlack10 textAbsoluteBlack hover:bgAbsoluteBlack hover:textAbsoluteWhite'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StyleguideLayout
