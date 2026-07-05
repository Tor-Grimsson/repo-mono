import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Meta' },
    { name: 'media', title: 'Media' }
  ],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(4),
      group: 'meta'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Client', value: 'client' },
          { title: 'Collection', value: 'collection' },
          { title: 'Typeface', value: 'typeface' },
          { title: 'Tool', value: 'tool' },
          { title: 'System', value: 'system' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'meta',
      hidden: ({ parent }) => parent?.type !== 'client'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'meta'
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      rows: 6,
      group: 'meta',
      description: 'Longer background context shown in the detail view.'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'meta',
      validation: (Rule) =>
        Rule.regex(/^[0-9]{4}$/).warning('Prefer a four digit year, e.g. 2024')
    }),
defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'meta',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  allowRelative: true,
                  scheme: ['http', 'https']
                })
            })
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' }
          }
        }
      ]
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text improves accessibility.')
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
      description: 'Default hero image (dark mode)',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text improves accessibility.')
        })
      ]
    }),
    defineField({
      name: 'heroImageLight',
      title: 'Hero Image (Light Mode)',
      type: 'image',
      group: 'media',
      description: 'Optional light mode variant',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'heroVideoSrc',
      title: 'Hero Video (B2 CDN)',
      type: 'hostedVideo',
      group: 'media',
      description: 'Supersedes the uploaded Hero Video file. Takes priority over image and file.'
    }),
    defineField({
      name: 'media',
      title: 'Gallery Media',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          name: 'galleryImage',
          options: {
            hotspot: true
          },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' })
          ]
        },
        {
          type: 'hostedVideo',
          name: 'galleryHostedVideo',
          title: 'Video (B2 CDN)'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          validation: (Rule) => Rule.max(60)
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160)
        })
      ]
    })
  ],
  orderings: [
    orderRankOrdering,
    {
      title: 'Title (A → Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      client: 'client',
      media: 'thumbnail'
    },
    prepare({ title, type, client, media }) {
      return {
        title,
        subtitle: client ? `${client} • ${type}` : type,
        media
      }
    }
  }
})
