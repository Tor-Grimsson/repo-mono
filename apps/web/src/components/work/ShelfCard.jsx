import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TiltCard from '../animation/TiltCard'

const HEIGHTS = ['h-[408px] md:h-[560px]', 'h-[372px] md:h-[520px]', 'h-[336px] md:h-[480px]']
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

function getHeight(index) {
  return HEIGHTS[index % HEIGHTS.length]
}

export default function ShelfCard({ project, index }) {
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const src = project.thumbnail?.url
    if (!src) {
      setReady(true)
      return
    }
    const img = new Image()
    img.onload = () => setReady(true)
    img.onerror = () => setReady(true)
    img.src = src
  }, [project.thumbnail?.url])

  return (
    <Link
      to={`/work/${project.slug.current}`}
      state={{ backgroundLocation: location }}
      className={`flex-none w-[280px] md:w-[400px] ${getHeight(index)} group`}
      style={IS_MOBILE ? undefined : { perspective: 800 }}
    >
      <div
        style={{
          transformOrigin: 'bottom center',
          opacity: ready ? 1 : 0,
          transform: ready
            ? 'rotateX(0deg) translateY(0px)'
            : `rotateX(${20 + (index % 3) * 8}deg) translateY(${30 + (index % 4) * 10}px)`,
          transition: `opacity ${0.7 + (index % 3) * 0.15}s ${EASE} ${index * 0.07}s, transform ${0.7 + (index % 3) * 0.15}s ${EASE} ${index * 0.07}s`,
        }}
        className="w-full h-full"
      >
        <TiltCard
          src={project.thumbnail?.url}
          alt={project.title}
          className="w-full h-full rounded-[4px] border border-fg-04"
          variant="grounded"
        >
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8 bg-surface-inverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p
              className="text-auto-inverse text-4xl lg:text-5xl leading-tight text-center"
              style={{ fontFamily: 'TGDylgjur', fontWeight: 400 }}
            >
              {project.title}
            </p>
          </div>
        </TiltCard>
      </div>
    </Link>
  )
}
