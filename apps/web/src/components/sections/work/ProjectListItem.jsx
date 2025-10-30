import ProjectListItemRow from './ProjectListItemRow'

export default function ProjectListItem({ project }) {
  return (
    <ProjectListItemRow
      title={project.title}
      service1={project.services?.[0] || ''}
      service2={project.services?.[1] || ''}
      year={project.year}
      slug={project.slug.current}
    />
  )
}
