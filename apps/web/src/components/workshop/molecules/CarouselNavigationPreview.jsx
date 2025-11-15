import { useState } from 'react'
import { CarouselNavigation } from '@kol/ui'

export default function CarouselNavigationPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 5

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  return (
    <div className="space-y-8">
      {/* Default CarouselNavigation */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Carousel Navigation</h3>
          <p className="kol-mono-sm text-fg-64">
            Navigation controls for carousel components with previous/next buttons using chevron icons
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="kol-mono-xs text-fg-48 mb-4">Interactive Example</div>
            <div className="flex items-center gap-4">
              <CarouselNavigation
                onPrevious={handlePrevious}
                onNext={handleNext}
                iconSize={20}
              />
              <span className="kol-mono-sm text-fg-64">
                Slide {currentSlide + 1} of {totalSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Props</div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-fg-64 pb-2 border-b border-fg-16">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>onPrevious</div>
              <div className="text-fg-64">function</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>onNext</div>
              <div className="text-fg-64">function</div>
              <div className="text-fg-48">required</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>iconSize</div>
              <div className="text-fg-64">number</div>
              <div className="text-fg-48">20</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>className</div>
              <div className="text-fg-64">string</div>
              <div className="text-fg-48">''</div>
            </div>
            <div className="grid grid-cols-3 gap-4 kol-mono-sm text-auto">
              <div>buttonProps</div>
              <div className="text-fg-64">object</div>
              <div className="text-fg-48">{'{}'}</div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-4">Usage</div>
          <pre className="kol-mono-sm text-auto overflow-x-auto">
{`import { CarouselNavigation } from '@kol/ui'

const [currentSlide, setCurrentSlide] = useState(0)

const handlePrevious = () => {
  setCurrentSlide((prev) => prev - 1)
}

const handleNext = () => {
  setCurrentSlide((prev) => prev + 1)
}

<CarouselNavigation
  onPrevious={handlePrevious}
  onNext={handleNext}
  iconSize={20}
/>

// With custom icon size
<CarouselNavigation
  onPrevious={handlePrevious}
  onNext={handleNext}
  iconSize={24}
/>

// With additional button props
<CarouselNavigation
  onPrevious={handlePrevious}
  onNext={handleNext}
  buttonProps={{ disabled: isLoading }}
/>`}
          </pre>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Different Icon Sizes</h3>
          <p className="kol-mono-sm text-fg-64">
            Adjust icon size to match your design needs
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <CarouselNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              iconSize={16}
            />
            <span className="kol-mono-sm text-fg-64">Icon size: 16px (compact)</span>
          </div>

          <div className="flex items-center gap-4">
            <CarouselNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              iconSize={20}
            />
            <span className="kol-mono-sm text-fg-64">Icon size: 20px (default)</span>
          </div>

          <div className="flex items-center gap-4">
            <CarouselNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              iconSize={24}
            />
            <span className="kol-mono-sm text-fg-64">Icon size: 24px (large)</span>
          </div>
        </div>
      </div>

      {/* Composition Notes */}
      <div className="bg-container-primary p-8 rounded-sm space-y-6">
        <div className="space-y-3">
          <h3 className="kol-heading-sm text-auto">Composition</h3>
          <p className="kol-mono-sm text-fg-64">
            This molecule combines:
          </p>
        </div>

        <div className="space-y-3 kol-mono-sm text-fg-64">
          <div>• Button atoms (2x)</div>
          <div>• Icon atoms (chevron-left, chevron-right)</div>
          <div>• Flex container for layout</div>
        </div>

        <div className="bg-container-secondary p-6 rounded">
          <div className="kol-mono-xs text-fg-48 mb-3">Design Pattern</div>
          <p className="kol-mono-sm text-fg-64">
            A molecule is a simple composition of 2-3 atoms with a single purpose.
            CarouselNavigation combines two button atoms with chevron icons to provide
            bidirectional navigation controls for carousels and slideshows.
          </p>
        </div>
      </div>
    </div>
  )
}
