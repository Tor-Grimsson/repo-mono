import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel, Divider, ButtonNav } from '@kol/ui'

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
    <div className="w-full max-w-[1400px] mx-auto py-12 md:py-16 lg:py-24">

      {/* Top Section: Header */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 md:mb-20 lg:mb-24">

        <div className="flex-1 flex flex-col gap-2">
          <SectionLabel text="Project Overview" size="md" />
          <h1 className="kol-display-section">
            / {project.slug?.current || 'project'}
          </h1>
        </div>

        {project.description && (
          <p className="hidden xl:block w-[400px] kol-mono-sm">
            {project.description}
          </p>
        )}

      </div>

      {/* Bottom Section: Content with dividers */}
      <div className="flex flex-col">

        {/* 1. CMS Info Fields (Client, Services, Year, Timeframe) */}
        <Divider variant="horizontal" className='pb-8' />

        <div className="flex flex-row mb-16">
          <div className="flex flex-col gap-4 flex-1">
            {project.client && (

              <div className="flex flex-col w-100">
                <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">Client</p>
                <p className="kol-mono-sm">{project.client}</p>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-4 justify-between w-180">
            {project.services?.length > 0 && (
              <div className="flex flex-col">
                <p className="kol-helper-fine-xs text-fg-48 pb-2 w-32 uppercase">Services</p>
                <div className="flex flex-col gap-1">
                  {project.services.map((service, index) => (
                    <p key={index} className="kol-mono-sm">
                      {service}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {project.timeframe && (
              <div className="flex flex-col">
                <p className="kol-helper-fine-xs text-fg-48 pb-2 w-24 uppercase">Timeframe</p>
                <p className="kol-mono-sm">{project.timeframe}</p>
              </div>
            )}

            {project.year && (
              <div className="flex flex-col">
                <p className="kol-helper-fine-xs text-fg-48 pb-2 w-8 uppercase">Year</p>
                <p className="kol-mono-sm">{project.year}</p>
              </div>
            )}
          </div>
        </div>

        {/* 2. About Text */}
        {contentParagraphs.length > 0 && (
          <>
            <Divider variant="horizontal" className='pb-10' />

            <div className="flex flex-row justify-between w-full">
              <p className="kol-helper-fine-xs text-fg-48 pb-4 uppercase w-100">About</p>
              <div className="w-180 flex flex-col gap-2 pt-4">
                <p className="kol-mono-sm text-auto">
                  {contentParagraphs[0]}
                </p>
                {contentParagraphs.slice(1).map((paragraph, index) => (
                  <p key={index} className="kol-mono-sm-fine pt-2 text-fg-64 text-[14px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 3. Back/Next Navigation */}
        {hasNavigation && (
          <>
            <Divider variant="horizontal" className='py-20' />

            <div className="flex justify-between items-center">
              <ButtonNav
                direction="back"
                onClick={() => handleNavigation(previousProject)}
              />

              <ButtonNav
                direction="next"
                onClick={() => handleNavigation(nextProject)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
