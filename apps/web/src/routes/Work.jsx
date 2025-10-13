import { useState, useEffect } from 'react'
import WorkHeroSection from '../components/sections/work/WorkHeroSection'
import ProjectsGrid from '../components/sections/work/ProjectsGrid'
import ProjectsList from '../components/sections/work/ProjectsList'
import CtaWork from '../components/sections/cta/CtaWork'
import { getAllProjects } from '../lib/queries'

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
    <div>
      <section
        style={{
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--foreground)'
        }}
      >
        <div className="pagePadding">
          <WorkHeroSection projects={projects} />
        </div>
      </section>
      <div className="pagePadding pb-8 flex flex-col gap-6 md:gap-8">
        <ProjectsGrid projects={projects} />
        <ProjectsList projects={projects} />
        <CtaWork />
      </div>
    </div>
  )
}
