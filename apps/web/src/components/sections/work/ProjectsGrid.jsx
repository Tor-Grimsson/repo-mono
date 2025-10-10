import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import SanityImage from '../../media/SanityImage'
import { useCursor } from '../../../context/CursorContext'

function ProjectCard({ project }) {
  const ref = useRef(null)
  const [isHoverDevice, setIsHoverDevice] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { setCardHover, clearCardHover } = useCursor()

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches
    setIsHoverDevice(hasHover)
  }, [])

  const handleMouseMove = () => {
    if (!isHoverDevice || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    setCardHover(rect)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (ref.current) {
      setCardHover(ref.current.getBoundingClientRect())
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    clearCardHover()
  }

  return (
    <Link
      to={`/work/${project.slug.current}`}
      data-magnetic-ignore
      className="w-full md:w-[calc(50%-12px)]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={clearCardHover}
    >
      <div
        ref={ref}
        className="aspect-[3/2] p-6 md:p-10 lg:p-12 relative overflow-hidden rounded-lg"
      >
        <Motion.div
          className="absolute inset-0 bg-black/5 transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.1 : 1 }}
        >
          <SanityImage
            image={project.thumbnail}
            alt={project.title}
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </Motion.div>

        <div
          className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-10 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <p className="kol-heading-section text-absolute-white">
            {project.title}
          </p>
          <p className="kol-label text-absolute-white">
            {project.year}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsGrid({ projects = [] }) {
  const safeProjects = Array.isArray(projects) ? projects : []
  const featuredProjects = safeProjects
    .filter((project) => project?.featured && project?.slug?.current)
    .slice(0, 4)

  if (featuredProjects.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-absolute-black text-lg md:text-xl lg:text-2xl leading-snug tracking-[0.01em] uppercase">
          No featured projects yet — add a few in Sanity to populate this grid.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 md:gap-6">
      {featuredProjects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}
