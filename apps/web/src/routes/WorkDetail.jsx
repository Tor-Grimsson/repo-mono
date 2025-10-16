import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, getAllProjects } from '../lib/queries'
import DetailHero from '../components/sections/work-detail/DetailHero'
import FeatureImage from '../components/sections/work-detail/FeatureImage'
import ProjectText from '../components/sections/work-detail/ProjectText'
import ImageLayout from '../components/sections/work-detail/ImageLayout'
import ProjectsList from '../components/sections/work/ProjectsList'
import CtaWork from '../components/sections/cta/CtaWork'

export default function WorkDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setNotFound(false)

      try {
        const [projectData, projectsData] = await Promise.all([
          getProjectBySlug(slug),
          getAllProjects(),
        ])

        if (!cancelled && projectData) {
          setProject(projectData)
          setAllProjects(Array.isArray(projectsData) ? projectsData : [])
          setLoading(false)
          return
        }
      } catch (error) {
        console.error(`Unable to load project ${slug} from Sanity`, error)
      }

      if (cancelled) return

      setNotFound(true)
      setLoading(false)
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (notFound) {
    return <Navigate to="/work" replace />
  }

  if (loading || !project) {
    return null
  }

  return (
    <div className="pt-[72px]">
      <section
        style={{
          backgroundColor: 'var(--kol-surface-primary)',
          color: 'var(--kol-surface-on-primary)'
        }}
      >
        <div className="pagePadding">
          <DetailHero project={project} />
        </div>
      </section>
      <div className="pagePadding pb-8 flex flex-col gap-6 md:gap-8">
        {project.heroImage && (
          <FeatureImage image={project.heroImage} alt={project.title} />
        )}
        <ProjectText project={project} allProjects={allProjects} />
        {project.images && project.images.length > 0 && (
          <ImageLayout images={project.images} />
        )}
        <ProjectsList projects={allProjects} />
        <CtaWork />
      </div>
    </div>
  )
}
