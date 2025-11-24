import { useState } from 'react'
import Tag from '../atoms/Tag'

/**
 * ProseStylesViewer - Visual prose style showcase with variant switching and optional baseline grid
 *
 * @param {string} title - Section heading (e.g., "Visual Example")
 * @param {Array} variants - Array of variant objects: [{ id, label, className }]
 * @param {string} defaultVariant - Initial variant id to display (uncontrolled mode)
 * @param {string} activeVariant - Current variant id (controlled mode)
 * @param {Function} onVariantChange - Callback when variant changes (controlled mode)
 * @param {boolean} showGridToggle - Whether to show the baseline grid toggle button
 * @param {number} gridSize - Grid size in pixels (default 8)
 * @param {React.ReactNode} children - Prose content to display
 */
export default function ProseStylesViewer({
  title = 'Visual Example',
  variants = [],
  defaultVariant,
  activeVariant: controlledVariant,
  onVariantChange,
  showGridToggle = true,
  gridSize = 8,
  children
}) {
  const [internalVariant, setInternalVariant] = useState(defaultVariant || variants[0]?.id)
  const [showGrid, setShowGrid] = useState(false)

  // Use controlled or uncontrolled mode
  const isControlled = controlledVariant !== undefined
  const activeVariant = isControlled ? controlledVariant : internalVariant

  const handleVariantChange = (variantId) => {
    if (isControlled) {
      onVariantChange?.(variantId)
    } else {
      setInternalVariant(variantId)
    }
  }

  const currentVariant = variants.find(v => v.id === activeVariant)
  const variantClassName = currentVariant?.className || ''

  return (
    <section className="w-full px-8 py-24">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="space-y-8">
          <div className="flex flex-row justify-between items-baseline w-max-[1400px]">
            <h2 className="kol-helper-lg text-auto">{title}</h2>

            <div className="flex flex-wrap gap-3">
              {variants.map(variant => (
                <Tag
                  key={variant.id}
                  onClick={() => handleVariantChange(variant.id)}
                  className={activeVariant === variant.id ? 'is-active' : ''}
                >
                  {variant.label}
                </Tag>
              ))}

              {showGridToggle && (
                <Tag
                  onClick={() => setShowGrid(!showGrid)}
                  className={showGrid ? 'is-active' : ''}
                >
                  {showGrid ? 'Hide' : 'Show'} Baseline Grid
                </Tag>
              )}
            </div>
          </div>

          {/* Prose showcase with optional baseline grid */}
          <div className="border border-fg-08 py-16 relative overflow-hidden">
            {/* Baseline grid overlay */}
            {showGrid && (
              <svg
                className="absolute pointer-events-none"
                style={{
                  opacity: 0.12,
                  width: '200vw',
                  height: '200vh',
                  left: '-50vw',
                  top: '-50vh'
                }}
              >
                <defs>
                  <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                    <path
                      d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            )}

            <div className={`relative ${variantClassName} mt-8`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
