import React from 'react'
import { Button } from '@kol/ui'

const HeroSection = ({
  tag,
  title,
  message,
  subtext,
  titleClassName = '',
  messageClassName = ''
}) => {
  return (
    <section className="pt-[40px] flex flex-col justify-center text-center items-center h-[80vh] relative">
      <div className="flex flex-col items-center h-fit w-fit gap-6">
        {tag && (
          <span className="pill-outline">
            {tag}
          </span>
        )}

        <div className="mb-6">
          {title && (
            <h1
              className={`malromur text-7xl lg:text-[clamp(72px,8vw,120px)] font-bold mb-2 transition-colors duration-300 ${titleClassName}`}
              style={{
                fontFamily: 'TGMalromur',
                fontStyle: 'italic',
                color: 'var(--kol-surface-on-primary)'
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          {message && (
            <p
              className={`text-xl lg:text-[clamp(20px,2vw,32px)] max-w-2xl mx-auto transition-colors duration-300 ${messageClassName}`}
              style={{
                fontFamily: 'TGMalromur',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'color-mix(in srgb, var(--kol-surface-on-primary) 64%, transparent)'
              }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>

        <div className="flex flex-col mt-8 items-center gap-4">
          <div className="flex gap-4 justify-center">
            <Button variant="primary">Download Font</Button>
            <Button variant="secondary">View Specimen</Button>
          </div>

          {subtext && (
            <p className="kol-mono-xs transition-colors duration-300">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
