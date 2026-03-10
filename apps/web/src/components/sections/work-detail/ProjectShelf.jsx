import { Link } from 'react-router-dom'
import SanityImage from '../../media/SanityImage'

const HEIGHTS = ['h-[340px] md:h-[420px]', 'h-[310px] md:h-[390px]', 'h-[280px] md:h-[360px]']

function getHeight(index) {
  return HEIGHTS[index % HEIGHTS.length]
}

export default function ProjectShelf({ projects = [], currentProjectId }) {
  const otherProjects = projects.filter(
    (p) => p._id !== currentProjectId && p?.slug?.current && p?.thumbnail
  )

  if (otherProjects.length === 0) return null

  return (
    <div className="py-12 md:py-16">
      {/* Text section — respects max-width */}
      <div className="max-w-[1800px] mx-auto mb-8 md:mb-10">
        <p className="kol-helper-fine-xs text-fg-48 uppercase mb-3">Case Studies</p>
        <h2 className="kol-heading-section mb-6">Kolkrabbi Use cases</h2>
        <Link
          to="/work-v2"
          className="btn-primary px-5 py-2 kol-mono-text text-sm"
        >
          Work
        </Link>
      </div>

      {/* Card row — starts at max-width left, bleeds to viewport right */}
      <style>{`.project-shelf-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-[1800px] mx-auto">
        <div
          className="project-shelf-scroll flex gap-4 items-end overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', marginRight: 'calc(-50vw + 50%)' }}
        >
        {otherProjects.map((project, index) => (
          <Link
            key={project._id}
            to={`/work-v2/${project.slug.current}`}
            className={`flex-none w-[240px] md:w-[300px] ${getHeight(index)} group`}
          >
            <div className="w-full h-full overflow-hidden rounded-[4px]">
              <SanityImage
                image={project.thumbnail}
                alt={project.title}
                width={600}
                height={800}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
              />
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  )
}
