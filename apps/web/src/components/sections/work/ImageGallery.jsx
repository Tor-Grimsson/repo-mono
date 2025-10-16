import React from 'react'
import { Container, SanityImage } from '@kol/ui'
import { getClient } from '../../../lib/sanityClient'

const client = getClient(false)

export default function ImageGallery({ items = [] }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="bg-[var(--bg-secondary)] py-16">
      <Container className="grid gap-6 md:grid-cols-2">
        {items.map((image) => (
          <figure
            key={image._key || image.url}
            className="flex flex-col gap-3 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-primary)] p-4"
          >
            <SanityImage
              sanityClient={client}
              image={image}
              alt={image.alt || 'Gallery image'}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            {image.caption ? (
              <figcaption className="kol-text text-xs uppercase tracking-[0.24em] opacity-70">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </Container>
    </section>
  )
}
