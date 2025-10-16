import { Link } from 'react-router-dom'
import { Button } from '@kol/ui/atoms'

const WorkCard = () => {
  return (
    <div className="px-6 lg:px-10 py-6">
      <div className="relative rounded-lg overflow-hidden h-[60vh] flex items-center justify-center bg-surface-inverse">
        <div className="flex flex-col items-center text-center p-8 md:py-12 gap-10">
          <p className="kol-label opacity-80">Case Studies</p>

          <p className="w-full kol-heading-display leading-tight">
            Selected Work
            <br />
            & Projects
          </p>

          <Link to="/work" className="mt-4">
            <Button variant="secondary">
              View Work
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WorkCard
