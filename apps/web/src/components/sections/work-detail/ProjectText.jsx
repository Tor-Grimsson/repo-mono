import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel } from '@kol/ui'
import { Tag } from '@kol/ui'

function blocksToParagraphs(blocks) {
  if (!Array.isArray(blocks)) {
    return []
  }

  return blocks
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) =>
      block.children
        .map((child) => (typeof child.text === 'string' ? child.text : ''))
        .join('')
        .trim(),
    )
    .filter(Boolean)
}

function normalizeProjects(projects = []) {
  return projects.filter((project) => project?.slug?.current)
}

export default function ProjectText({ project, allProjects = [] }) {
  const navigate = useNavigate()

  const contentParagraphs = useMemo(() => blocksToParagraphs(project.content), [project])
  const projectList = useMemo(() => normalizeProjects(allProjects), [allProjects])
  const currentIndex = projectList.findIndex((item) => item._id === project._id)
  const hasNavigation = projectList.length > 1 && currentIndex !== -1

  const previousProject = hasNavigation
    ? projectList[(currentIndex - 1 + projectList.length) % projectList.length]
    : null
  const nextProject = hasNavigation
    ? projectList[(currentIndex + 1) % projectList.length]
    : null

  const handleNavigation = (targetProject) => {
    if (!targetProject?.slug?.current || targetProject._id === project._id) {
      return
    }

    navigate(`/work/${targetProject.slug.current}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="py-12 md:py-24"
      data-name="project-text"
      style={{ color: 'var(--kol-surface-on-primary)' }}
    >
      <div className="max-w-[1344px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 mb-16 lg:mb-24">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <SectionLabel text="Project Overview" />
            <h1 className="kol-heading-display">
              / {project.slug?.current || 'project'}
            </h1>
          </div>

          <div className="lg:w-[800px] lg:flex-shrink-0">
            {project.description && (
              <p className="font-compact text-lg md:text-xl lg:text-2xl leading-[1.2] tracking-[0.02em] opacity-80">
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 lg:mb-16">
          <div className="w-full h-px mb-6" style={{ backgroundColor: 'var(--kol-border-default)', opacity: 0.4 }}></div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              {project.client && (
                <div>
                  <p className="font-compact text-xs uppercase opacity-40 tracking-[0.04em] mb-3 leading-none">
                    Client
                  </p>
                  <p className="font-compact text-base md:text-lg">
                    {project.client}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:w-[800px] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:flex lg:justify-between">
              {project.services?.length > 0 && (
                <div className="lg:w-[96px]">
                  <p className="font-compact text-xs uppercase opacity-40 tracking-[0.04em] mb-3 leading-none">
                    Services
                  </p>
                  <div className="flex flex-col gap-2">
                    {project.services.map((service, index) => (
                      <p key={index} className="font-compact text-base md:text-lg">
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="hidden lg:block lg:w-[96px]"></div>

              {project.timeframe && (
                <div className="lg:w-[96px]">
                  <p className="font-compact text-xs uppercase opacity-40 tracking-[0.04em] mb-3 leading-none">
                    Timeframe
                  </p>
                  <p className="font-compact text-base md:text-lg">
                    {project.timeframe}
                  </p>
                </div>
              )}

              {project.year && (
                <div className="lg:w-[96px]">
                  <p className="font-compact text-xs uppercase opacity-40 tracking-[0.04em] mb-3 leading-none">
                    Year
                  </p>
                  <p className="font-compact text-base md:text-lg">
                    {project.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {contentParagraphs.length > 0 && (
          <div className="mb-12 lg:mb-16">
            <div className="w-full h-px mb-6" style={{ backgroundColor: 'var(--kol-border-default)', opacity: 0.4 }}></div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              <div className="flex-1 lg:flex-initial">
                <p className="font-compact text-xs uppercase opacity-40 tracking-[0.04em] leading-none">
                  About
                </p>
              </div>

              <div className="lg:w-[800px] lg:pr-24 lg:pt-4">
                <p className="font-bold text-xl md:text-2xl leading-[1.5] tracking-[0.02em] mb-4 md:mb-6">
                  {contentParagraphs[0]}
                </p>
                {contentParagraphs.slice(1).map((paragraph, index) => (
                  <p key={index} className="font-compact text-base md:text-lg leading-[1.4] opacity-60 mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasNavigation && (
          <div>
            <div className="w-full h-px mb-6" style={{ backgroundColor: 'var(--kol-border-default)', opacity: 0.4 }}></div>

            <div className="flex justify-between items-center">
              <div onClick={() => handleNavigation(previousProject)}>
                <Tag text="Back" showArrow arrowDirection="left" variant="inverse" />
              </div>

              <div onClick={() => handleNavigation(nextProject)}>
                <Tag text="Next" showArrow arrowDirection="right" variant="inverse" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
