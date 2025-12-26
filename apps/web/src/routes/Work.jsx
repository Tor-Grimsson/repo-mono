import { useState, useEffect } from 'react'
import SEO from '../components/layout/SEO'
import WorkHeroSection from '../components/sections/work/WorkHeroSection'
import ProjectsGrid from '../components/sections/work/ProjectsGrid'
import ProjectsList from '../components/sections/work/ProjectsList'
import { getAllProjects } from '../lib/queries'
import CtaGlobal from '../components/sections/cta/CtaGlobal'

export default function Work() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      try {
        const data = await getAllProjects()
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Unable to load projects from Sanity', error)
      }
    }

    fetchProjects()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <SEO
        title="Work — Kolkrabbi"
        description="Portfolio of projects including digital design, typography, brand identity, and creative direction work."
        ogTitle="Work & Portfolio"
        ogDescription="Projects in design, typography, and creative technology"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/work"
        canonical="https://kolkrabbi.io/work"
      />
      <main className="min-h-screen w-full overflow-visible">
      <div>
        <WorkHeroSection projects={projects} />
      </div>

      {/* Work Hero Image */}
      <section className="px-6 md:px-8 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="aspect-[2/1] overflow-hidden rounded border border-fg-08">
            <img
              src="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-1200.jpg"
              srcSet="
                https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-400.jpg 400w,
                https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-800.jpg 800w,
                https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-1200.jpg 1200w,
                https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-1600.jpg 1600w,
                https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/work/work-hero/work-2560.jpg 2560w
              "
              sizes="(max-width: 1400px) 100vw, 1400px"
              alt="Featured work showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="py-6 md:py-8 flex flex-col gap-8">
        <div className="mt-8">
          <ProjectsGrid projects={projects} />
        </div>
        <div className="card-wrapper">
          <ProjectsList projects={projects} />
        </div>
      </div>

      <CtaGlobal />
    </main>
    </>
  )
}
