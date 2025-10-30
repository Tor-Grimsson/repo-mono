import { SectionLabel, Divider } from '@kol/ui'
import ProjectListItem from './ProjectListItem'
import ProjectListItemRow from './ProjectListItemRow'

export default function ProjectsList({ projects = [] }) {
  const safeProjects = projects.filter((project) => project?.slug?.current)

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 md:py-16 lg:py-24">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 md:mb-20 lg:mb-24">
        <div className="flex-1 flex flex-col gap-2">
          <SectionLabel text="Collection" size="md" />
          <h1 className="kol-display-section">/ featured work</h1>
        </div>
        <p className="hidden xl:block w-[400px] kol-mono-sm">
          A collection of brand identities and marks produced by Kolkrabbi.
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col">
        <Divider variant="horizontal" className='pb-8' />

        <div className="flex flex-row gap-8">
          <p className="kol-helper-fine-xs text-fg-48 uppercase w-100">Project</p>

          <div className="flex-1 flex flex-col pt-4 pb-12 gap-8 md:gap-10">
            {safeProjects.map((project) => (
              <ProjectListItem key={project._id} project={project} />
            ))}
          </div>
        </div>
      </div>
      

      {/* Archvie List */}
      <div className="flex flex-col">
        <Divider variant="horizontal" className='pb-8' />

         <div className="flex flex-row gap-8">
            <p className="kol-helper-fine-xs text-fg-48 uppercase w-100">Archive</p>

            <div className="flex-1 flex flex-col pt-4 gap-8 md:gap-10">
              <ProjectListItemRow
                title="Logomarks"
                service1="Visual Identity"
                service2="Logo design"
                year="2024"
              />

              <ProjectListItemRow
                title="Illustrations"
                service1="Service 1"
                service2="Service 2"
                year="2024"
              />
            </div>
         </div>
      </div>
    </div>
  )
}
