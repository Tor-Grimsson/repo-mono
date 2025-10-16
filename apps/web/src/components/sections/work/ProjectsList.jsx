import { Link } from 'react-router-dom'
import { useCursor } from '../../../context/CursorContext'
import { SectionLabel } from '@kol/ui'

export default function ProjectsList({ projects = [] }) {
  const { clearCardHover } = useCursor()
  const safeProjects = Array.isArray(projects) ? projects.filter((project) => project?.slug?.current) : []

  if (safeProjects.length === 0) {
    return (
      <div className="py-12 md:py-16 lg:py-24 text-center">
        <p
          className="text-base md:text-lg lg:text-xl uppercase opacity-60"
          style={{ color: 'var(--kol-surface-on-primary)' }}
        >
          No projects found. Create one in Sanity to get started.
        </p>
      </div>
    )
  }

  return (
    <div
      className="py-12 md:py-16 lg:py-24"
      style={{ color: 'var(--foreground)' }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end gap-8 md:gap-10 lg:gap-12 mb-16 md:mb-20 lg:mb-24">
        <div className="flex-1 flex flex-col gap-2">
          <SectionLabel text="Collection" />
          <h1 className="kol-heading-display">
            / featured work
          </h1>
        </div>

        <div className="hidden xl:block w-[360px] self-end">
          <p className="text-base md:text-lg lg:text-xl opacity-80">
            A collection of brand identities and marks produced by Kolkrabbi.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <div className="border-t" style={{ borderColor: 'var(--kol-border-default)' }} />

          <div className="flex flex-col gap-6">
            <p
              className="text-xs uppercase opacity-40 tracking-[0.04em]"
              style={{ fontFamily: 'var(--kol-font-family-rgrot-narrow)' }}
            >
              Project
            </p>

            <div className="flex flex-col gap-8 md:gap-10">
              {safeProjects.map((project) => (
                <Link
                  key={project._id}
                  to={`/work/${project.slug.current}`}
                  className="flex flex-row items-end justify-between gap-3 md:gap-4 md:h-8 hover:opacity-80 transition-opacity"
                  data-magnetic
                  onClick={clearCardHover}
                >
                  <div className="flex items-end gap-2">
                    <p
                      className="uppercase text-[32px] md:text-[36px] leading-[0.8]"
                      style={{ fontFamily: 'var(--kol-font-family-rgrot-narrow)' }}
                    >
                      {project.title}
                    </p>
                  </div>

                  <div className="flex gap-3 md:gap-4 items-end">
                    <p className="text-[10px] md:text-xs uppercase opacity-80 w-20 md:w-24">
                      {project.services?.[0] || ''}
                    </p>
                    <p className="text-[10px] md:text-xs uppercase opacity-80 w-20 md:w-24">
                      {project.services?.[1] || ''}
                    </p>
                    <p className="text-[10px] md:text-xs uppercase opacity-80 w-8 text-right">
                      {project.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
