import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, getAllProjects } from '../lib/queries'
import DetailHero from '../components/sections/work-detail/DetailHero'
import ImageMasonry from '../components/sections/work-detail/ImageMasonry'
import ProjectOverlay from '../components/sections/work-detail/ProjectOverlay'
import ProjectShelf from '../components/sections/work-detail/ProjectShelf'
import CtaGlobal from '../components/sections/cta/CtaGlobal'
import LoaderOverlay from '../components/layout/LoaderOverlay'

export default function WorkDetailV2() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setOverlayOpen(false)

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
    return <LoaderOverlay message="Loading project" />
  }

  return (
    <main>
      {/* Hero slightly shorter than viewport so the info bar peeks on load */}
      <div className="h-[calc(100dvh-7rem)] overflow-hidden full-bleed">
        <DetailHero project={project} />
      </div>

      {/* Project name + Information toggle — aligned with image grid */}
      <div className="w-full max-w-[1800px] mx-auto py-6 md:py-8 flex items-center justify-between">
        <p className="kol-mono-text">
          / {project.slug?.current || project.title}
        </p>
        <button
          type="button"
          onClick={() => setOverlayOpen(true)}
          className="kol-mono-text hover:text-fg-64 transition-colors cursor-pointer flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          <span>Information</span>
        </button>
      </div>

      <ImageMasonry images={project.images} projectTitle={project.title} />

      <ProjectOverlay
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        project={project}
      />

      <ProjectShelf projects={allProjects} currentProjectId={project._id} />

      <CtaGlobal />
    </main>
  )
}
