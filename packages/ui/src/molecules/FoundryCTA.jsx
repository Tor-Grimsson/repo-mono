import { Link, useInRouterContext } from 'react-router-dom'
import Button from '../atoms/Button'

/**
 * FoundryCTA Component
 *
 * Reusable call-to-action section for foundry pages with centered layout,
 * divider line, heading, description, and action button(s)
 *
 * @param {string} heading - Main heading text
 * @param {string} description - Description text below heading
 * @param {Object|Array} action - Single action object or array of action objects
 * @param {string} action.to - Link destination
 * @param {string} action.label - Button text
 * @param {string} action.variant - Button variant: 'primary' (default) or 'secondary'
 * @param {string} className - Additional classes for the section (optional)
 */
const FoundryCTA = ({
  heading,
  description,
  action,
  className = ''
}) => {
  const actions = Array.isArray(action) ? action : [action]
  const hasRouter = typeof useInRouterContext === 'function' ? useInRouterContext() : false

  return (
    <section className={`w-full py-24 ${className}`}>
      <div className="max-w-[900px] mx-auto text-center space-y-8">
        <div className="reveal w-32 h-[1px] bg-fg-24 mx-auto" style={{ '--reveal-delay': '0s' }} />

        <h2 className="reveal kol-heading-lg text-auto" style={{ '--reveal-delay': '0.1s' }}>
          {heading}
        </h2>

        <p className="reveal kol-mono-text text-fg-64 max-w-[600px] mx-auto" style={{ '--reveal-delay': '0.2s' }}>
          {description}
        </p>

        <div className={`reveal pt-4 ${actions.length > 1 ? 'flex flex-col sm:flex-row gap-4 justify-center' : ''}`} style={{ '--reveal-delay': '0.3s' }}>
          {actions.map((act, index) => {
            const isPrimary = act.variant !== 'secondary'
            const Wrapper = hasRouter ? Link : 'a'
            const wrapperProps = hasRouter ? { to: act.to } : { href: act.to, target: '_blank', rel: 'noreferrer noopener' }
            return (
              <Wrapper key={index} {...wrapperProps}>
                <Button
                  variant={isPrimary ? 'primary' : 'outline'}
                  size="md"
                  uppercase={true}
                >
                  {act.label}
                </Button>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FoundryCTA
