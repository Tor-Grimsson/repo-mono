import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import SanityImage from '../../media/SanityImage'
import { useCursor } from '../../../context/CursorContext'

export default function ProjectCard({ project, className = '', isHero = false }) {
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
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={clearCardHover}
    >
      <div
        ref={ref}
        className="aspect-[2/1] md:h-[440px] md:aspect-auto p-6 md:p-10 lg:p-12 relative overflow-hidden border border-fg-08"
        style={{ borderRadius: '4px' }}
      >
        <Motion.div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.1 : 1,
            backgroundColor: 'color-mix(in srgb, black 5%, transparent)'
          }}
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
