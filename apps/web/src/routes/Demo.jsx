import React from 'react'
import ArticleRichProse from '../components/prose/layouts/ArticleRichProse'
import FontPreviewCard from '../components/fontviewer/FontPreviewCard.jsx'

const Demo = () => {
  return (
    <main className="min-h-screen w-full bg-surface-primary text-auto">
      <div className="main-wrapper py-16 sm:py-20 lg:py-24">
        <section className="card-wrapper">
          <h2 className="kol-heading-section">Font Viewer Card (demo)</h2>
          <p className="kol-mono-xs text-fg-48 uppercase tracking-[0.16em]">
            Static preview wired to font viewer utilities
          </p>
          <div className="mt-10 flex justify-center">
            <FontPreviewCard />
          </div>
        </section>

        <section className="card-wrapper">
          <ArticleRichProse />
        </section>
      </div>
    </main>
  )
}

export default Demo
