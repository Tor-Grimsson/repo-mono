import React from 'react'
import { PortableText } from '@portabletext/react'

const components = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = typeof href === 'string' && href.startsWith('http')
      return (
        <a
          href={href}
          className="underline decoration-[var(--surface-border)] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }
  },
  types: {
    callout: ({ value }) => (
      <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-secondary)] p-6">
        <p className="kol-text text-sm opacity-80">{value?.text}</p>
      </div>
    )
  },
  block: {
    normal: ({ children }) => <p className="kol-text text-pretty opacity-80">{children}</p>,
    h2: ({ children }) => (
      <h2 className="kol-heading-m text-lg uppercase tracking-[0.24em] opacity-80">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="kol-heading-s text-base uppercase tracking-[0.24em] opacity-80">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="kol-heading-s text-sm uppercase tracking-[0.24em] opacity-80">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--surface-border)] pl-6 italic opacity-70">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 opacity-80">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6 opacity-80">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="kol-text">{children}</li>,
    number: ({ children }) => <li className="kol-text">{children}</li>
  }
}

export default function PortableRichText({ value = [] }) {
  if (!value || value.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[var(--surface-border)] bg-[var(--surface-secondary)] p-6 text-sm opacity-70">
        Portable Text content placeholder. Integrate `@portabletext/react` once Sanity data is wired.
      </div>
    )
  }

  return (
    <div className="portable-text space-y-6">
      <PortableText value={value} components={components} />
    </div>
  )
}
