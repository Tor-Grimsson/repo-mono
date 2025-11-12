import { useState, useMemo, useEffect } from 'react'
import { Pill } from '@kol/ui'
import { illustrations, filterData, illustrationCollections } from '../../data/illustrations'
import CollectionGrid from '../../components/sections/collections/CollectionGrid'
import CollectionFilters from '../../components/sections/collections/CollectionFilters'
import ProjectsList from '../../components/sections/work/ProjectsList'
import { getAllProjects } from '../../lib/queries'
import CtaGlobal from '../../components/sections/cta/CtaGlobal'

export default function Illustrations() {
  const [filters, setFilters] = useState(new Set())
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      try {
        const data = await getAllProjects()
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Unable to load projects from Sanity', error)
      }
    }

    fetchProjects()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredIllustrations = useMemo(() => {
    if (filters.size === 0) return illustrations

    return illustrations.filter((illustration) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return illustration[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary">
      {/* Header */}
      <section className="w-full px-8 pt-24 pb-16 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-4">
            <Pill variant="inverse">Illustrations</Pill>
            <h1 className="kol-display-lg text-auto">Illustration Collection</h1>
            <p className="kol-mono-text text-fg-64 max-w-[700px]">
              A curated collection of illustrated works and conceptual explorations showcasing visual storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Illustration Grid Section */}
      <div className="main-wrapper">

        <div className="max-w-[1400px] mx-auto">
          <div className="py-12">

            {/* Filters */}
            <div className="mb-8 ">
              <CollectionFilters
                logomarks={illustrations}
                onFilterChange={handleFilterChange}
                collections={illustrationCollections}
                totalCount={illustrations.length}
                showCollectionCategories={false}
              />
            </div>

            {/* Grid */}
            <div>
            {filteredIllustrations.length > 0 ? (
              <CollectionGrid illustrations={filteredIllustrations} />
            ) : (
              <div className="kol-mono-sm-fine py-24">
                <p className="kol-mono-sm-fine mb-4">No illustrations match your current filters</p>
                <button
                  onClick={() => setFilters(new Set())}
                  className="kol-mono-sm-fine underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
            </div>

            {/* Projects Section */}
            <div className="pt-12">
              <ProjectsList projects={projects} />
            </div>



          </div>
        </div>
      </div>

      <CtaGlobal />
    </main>
  )
}
