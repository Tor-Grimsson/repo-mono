import { useState, useEffect } from 'react'
import WorkHeroSection from '../components/sections/work/WorkHeroSection'
import ProjectsGrid from '../components/sections/work/ProjectsGrid'
import ProjectsList from '../components/sections/work/ProjectsList'
import { getAllProjects } from '../lib/queries'
import { ImageSection } from '@kol/ui'
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
    <main className="min-h-screen w-full overflow-x-hidden">
      <div>
        <WorkHeroSection projects={projects} />
      </div>

      <ImageSection src="/img/features/card-item-base-1.png" alt="Featured work showcase" />

      <div className="main-wrapper">
        <div className="card-wrapper">
          <ProjectsGrid projects={projects} />
        </div>
        <div className="card-wrapper">
          <ProjectsList projects={projects} />
        </div>
      </div>

      <CtaGlobal />
    </main>
  )
}
