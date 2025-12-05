import ProjectCard from './ProjectCard'
import WorkSection from './WorkSection'

export default function ProjectsGrid({ projects = [] }) {
  const featuredProjects = projects
    .filter((project) => project?.featured && project?.slug?.current)
    .slice(0, 9)

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 py-8">
      <WorkSection label="Featured Work" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {featuredProjects.map((project, index) => (
          <div
            key={project._id}
            className="reveal"
            style={{ '--reveal-delay': `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}
