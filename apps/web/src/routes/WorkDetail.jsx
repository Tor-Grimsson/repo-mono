import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, getAllProjects } from '../lib/queries'
import DetailHero from '../components/sections/work-detail/DetailHero'
import ImageCarousel from '../components/sections/work-detail/ImageCarousel'
import ProjectText from '../components/sections/work-detail/ProjectText'
import ImageLayout from '../components/sections/work-detail/ImageLayout'
import ProjectsList from '../components/sections/work/ProjectsList'
import CtaGlobal from '../components/sections/cta/CtaGlobal'
import LoaderOverlay from '../components/layout/LoaderOverlay'

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
    return <LoaderOverlay message="Loading project" />
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div>
        <DetailHero project={project} />
      </div>

      

      <div className="flex flex-col gap-8 py-6 md:py-8">
         <div className="card-wrapper">
            <ProjectText project={project} allProjects={allProjects} />
         </div>

            <div className="">
               <ImageCarousel images={project.images} projectTitle={project.title} />
            </div>

         <div className="">
            <ImageLayout images={project.images} />
         </div>

         <div className="card-wrapper">
            <ProjectsList projects={allProjects} />
         </div>
      </div>

      <CtaGlobal />
    </main>
  )
}
