import { useState } from 'react'
import { Input } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'
import SurfacePreviewGrid from './SurfacePreviewGrid'

const breakpoints = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'desktop', label: 'Desktop' }
]

const inputBreakpointStyles = {
  sm: {
    mobile: { padding: '6px 16px', width: '280px', fontSize: '14px' },
    tablet: { padding: '8px 20px', width: '280px', fontSize: '16px' },
    desktop: { padding: '10px 24px', width: '280px', fontSize: '18px' }
  },
  md: {
    mobile: { padding: '8px 20px', width: '380px', fontSize: '14px' },
    tablet: { padding: '12px 28px', width: '380px', fontSize: '16px' },
    desktop: { padding: '14px 32px', width: '380px', fontSize: '18px' }
  },
  lg: {
    mobile: { padding: '10px 24px', width: '480px', fontSize: '14px' },
    tablet: { padding: '14px 36px', width: '480px', fontSize: '16px' },
    desktop: { padding: '16px 40px', width: '480px', fontSize: '18px' }
  }
}

export default function InputPreview() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')

  return (
    <div className="space-y-8">
      <DesSection
        name="Input"
        description="Form input component with size variants matching Button styles. Supports icons and uppercase text transform."
        details="Uses kol-mono-text typography • Three sizes: sm, md, lg • Optional left icon"
        code={'<Input type="text" placeholder="Enter text..." size="md" />'}
      />

      <div className="space-y-4">
        <DesCard
          name="Size Variants"
          description="Three size options matching button scale: sm, md (default), lg"
          details="Responsive padding at mobile (6-10px), tablet (8-14px), desktop (10-16px)"
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface label="Default surface">
            <div className="space-y-8 py-8">
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size} className="space-y-3">
                  <div className="kol-mono-xs uppercase">
                    {size === 'sm' ? 'Small' : size === 'md' ? 'Medium (default)' : 'Large'}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {breakpoints.map((bp) => (
                      <div key={`${size}-${bp.id}`} className="space-y-2">
                        <div className="kol-mono-xs opacity-60">{bp.label}</div>
                        <Input
                          type="text"
                          placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} input...`}
                          size={size}
                          style={inputBreakpointStyles[size][bp.id]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
          <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
            <div className="space-y-8 py-8">
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size} className="space-y-3">
                  <div className="kol-mono-xs uppercase">
                    {size === 'sm' ? 'Small' : size === 'md' ? 'Medium (default)' : 'Large'}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {breakpoints.map((bp) => (
                      <div key={`${size}-${bp.id}`} className="space-y-2">
                        <div className="kol-mono-xs opacity-60">{bp.label}</div>
                        <Input
                          type="text"
                          placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} input...`}
                          size={size}
                          style={inputBreakpointStyles[size][bp.id]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      <div className="space-y-4">
        <DesCard
          name="With Icon"
          description="Optional left icon for visual context (search, email, etc.)"
          details="Icon positioned at left-6, input gets pl-12 padding adjustment"
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface label="Default surface">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Search (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`search-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="text"
                        placeholder="search articles..."
                        iconLeft="search"
                        iconSize={20}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Email (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`email-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        iconLeft="mail"
                        iconSize={20}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SurfacePreviewGrid.Surface>
          <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Search (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`search-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="text"
                        placeholder="search articles..."
                        iconLeft="search"
                        iconSize={20}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Email (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`email-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        iconLeft="mail"
                        iconSize={20}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>

      <div className="space-y-4">
        <DesCard
          name="Uppercase Variant"
          description="Optional uppercase text transform for stylistic treatment"
          details="Applies CSS text-transform: uppercase"
        />

        <SurfacePreviewGrid>
          <SurfacePreviewGrid.Surface label="Default surface">
            <div className="py-8">
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Uppercase (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`uppercase-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="text"
                        placeholder="UPPERCASE INPUT..."
                        uppercase={true}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SurfacePreviewGrid.Surface>
          <SurfacePreviewGrid.Surface label="Inverse surface" inverse>
            <div className="py-8">
              <div className="space-y-3">
                <div className="kol-mono-xs uppercase">Uppercase (Medium)</div>
                <div className="grid grid-cols-1 gap-4">
                  {breakpoints.map((bp) => (
                    <div key={`uppercase-${bp.id}`} className="space-y-2">
                      <div className="kol-mono-xs opacity-60">{bp.label}</div>
                      <Input
                        type="text"
                        placeholder="UPPERCASE INPUT..."
                        uppercase={true}
                        size="md"
                        style={inputBreakpointStyles.md[bp.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SurfacePreviewGrid.Surface>
        </SurfacePreviewGrid>
      </div>
    </div>
  )
}
