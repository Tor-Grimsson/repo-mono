import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel, Divider, LinkWithIcon } from '@kol/ui'

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
    <div className="w-full max-w-[1200px] mx-auto pt-20 pb-12">

      {/* Top Section: Header */}
      <div className="mb-16 md:mb-20 lg:mb-8">
        <div className="flex flex-row items-end">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="reveal kol-display-section text-[80px]" style={{ '--reveal-delay': '0.1s' }}>
              / {project.slug?.current || 'project'}
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Section: Content with dividers */}
      <div className="flex flex-col">

        {/*
          ROW 1: Description | Client | Timeframe | Year
          ┌────────────────────┬────────────────────────────────┐
          │ LEFT (40%)         │ RIGHT (60%) = 3-col grid       │
          │                    │ [Col1]   [Col2]      [Col3]    │
          │ Description        │ Client   Timeframe   Year      │
          └────────────────────┴────────────────────────────────┘
        */}
        <Divider variant="horizontal" className='pb-8' />

        <div className="flex flex-col lg:flex-row mb-8 gap-8 lg:gap-40">
          {/* LEFT (40%): Description */}
          <div className="flex flex-col lg:w-[40%]">
            {project.description && (
             <>
               <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">⟐∫∫∫⟐</p>
               <p className="kol-mono-text">{project.description}</p>
             </>
            )}
          </div>

          {/* RIGHT (60%): 3-column grid */}
          <div className="grid grid-cols-3 gap-40 lg:w-[60%]">
            {/* Col 1: Client */}
            <div className="flex flex-col">
              {project.client && (
                <>
                  <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">Client</p>
                  <p className="kol-mono-text">{project.client}</p>
                </>
              )}
            </div>

            {/* Col 2: Timeframe */}
            <div className="flex flex-col">
              {project.timeframe && (
                <>
                  <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">Timeframe</p>
                  <p className="kol-mono-text">{project.timeframe}</p>
                </>
              )}
            </div>

            {/* Col 3: Year */}
            <div className='flex flex-col items-end pr-2'>
               <div className="flex flex-col">
               {project.year && (
                  <>
                     <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">Year</p>
                     <p className="kol-mono-text">{project.year}</p>
                  </>
               )}
               </div>
            </div>
          </div>
        </div>

        {/*
          ROW 2: About | (empty) | Services | (empty)
          ┌────────────────────┬────────────────────────────────┐
          │ LEFT (40%)         │ RIGHT (60%) = 3-col grid       │
          │                    │ [Col1]   [Col2]      [Col3]    │
          │ About              │ (empty)  Services    (empty)   │
          └────────────────────┴────────────────────────────────┘
        */}
        {(contentParagraphs.length > 0 || project.services?.length > 0) && (
          <>
            <Divider variant="horizontal" className='pb-10' />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-40">
              {/* LEFT (40%): About */}
              <div className="flex flex-col lg:w-[40%]">
                {contentParagraphs.length > 0 && (
                  <>
                    <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">About</p>
                    <div className="flex flex-col gap-2">
                      <p className="kol-mono-text text-auto">
                        {contentParagraphs[0]}
                      </p>
                      {contentParagraphs.slice(1).map((paragraph, index) => (
                        <p key={index} className="kol-mono-text pt-2 text-fg-64">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT (60%): 3-column grid */}
              <div className="grid grid-cols-3 gap-40 lg:w-[60%]">
                {/* Col 1: (empty) */}
                <div />
                {/* Col 2: Services (aligned under Timeframe) */}
                <div className="flex flex-col">
                  {project.services?.length > 0 && (
                    <>
                      <p className="kol-helper-fine-xs text-fg-48 pb-2 uppercase">Services</p>
                      <div className="flex flex-col gap-1">
                        {project.services.map((service, index) => (
                          <p key={index} className="kol-mono-text">
                            {service}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {/* Col 3: (empty) */}
                <div />
              </div>
            </div>
          </>
        )}

        {/* 3. Back/Next Navigation */}
        {hasNavigation && (
          <>
            <Divider variant="horizontal" className='pt-10 pb-15' />

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleNavigation(previousProject)}
                className="cursor-pointer"
              >
                <LinkWithIcon
                  to="#"
                  iconName="arrow-left"
                  iconPosition="left"
                  iconSize={12}
                  className="[&:hover]:gap-2"
                >
                  Back
                </LinkWithIcon>
              </button>

              <button
                onClick={() => handleNavigation(nextProject)}
                className="cursor-pointer"
              >
                <LinkWithIcon
                  to="#"
                  iconName="arrow-right"
                  iconPosition="right"
                  iconSize={12}
                  className="[&:hover]:gap-2"
                >
                  Next
                </LinkWithIcon>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
