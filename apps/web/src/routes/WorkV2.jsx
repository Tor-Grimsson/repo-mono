import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../lib/queries'
import SanityImage from '../components/media/SanityImage'
import LoaderOverlay from '../components/layout/LoaderOverlay'

export default function WorkV2() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      try {
        const data = await getAllProjects()
        if (!cancelled && Array.isArray(data)) {
          setProjects(data.filter((p) => p?.slug?.current && p?.thumbnail))
          setLoading(false)
        }
      } catch (error) {
        console.error('Unable to load projects from Sanity', error)
        if (!cancelled) setLoading(false)
      }
    }

    fetchProjects()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return <LoaderOverlay message="Loading work" />
  }

  return (
    <main className="pt-20 pb-6 md:pb-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/work-v2/${project.slug.current}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[4px] group"
            >
              <SanityImage
                image={project.thumbnail}
                alt={project.title}
                width={1400}
                height={700}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
