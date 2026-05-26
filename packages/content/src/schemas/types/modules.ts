import { defineType, defineField } from 'sanity'

export const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  description: 'Structured data table with explicit columns and rows',
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Accessible caption announced to screen readers'
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        {
          type: 'object',
          name: 'tableColumn',
          fields: [
            defineField({
              name: 'key',
              title: 'Column Key',
              type: 'string',
              description: 'Unique identifier used internally (e.g., slugged header)',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Header Label',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Auto', value: 'auto' },
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'auto'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description: 'Enter cells in the same order as the columns above',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          fields: [
            defineField({
              name: 'label',
              title: 'Row Label (optional)',
              type: 'string'
            }),
            defineField({
              name: 'cells',
              type: 'array',
              of: [{ type: 'text' }],
              validation: (Rule) => Rule.min(1),
              description: 'Values should align with column order'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'footnote',
      type: 'text',
      rows: 3,
      description: 'Optional note displayed below the table'
    })
  ]
})

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  description: 'Upload and display a hosted video with optional poster and caption.',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      description: 'Optional label displayed above the video (e.g., “Figure 2”).'
    }),
    defineField({
      name: 'file',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ parent }) => !!parent?.embedUrl,
      validation: (Rule) => Rule.custom((value, context) => {
        if (!value && !context.parent?.embedUrl) return 'Either a video file or embed URL is required'
        return true
      })
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'YouTube or Vimeo URL. Used instead of uploaded file when provided.',
      hidden: ({ parent }) => !!parent?.file?.asset
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      description: 'Optional poster displayed before playback.'
    }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Optional caption displayed below the video.'
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'muted',
      title: 'Muted (required for autoplay)',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'label',
      caption: 'caption',
      file: 'file',
      embedUrl: 'embedUrl'
    },
    prepare({ title, caption, file, embedUrl }) {
      return {
        title: title || caption || 'Video',
        subtitle: embedUrl ? `Embed: ${embedUrl}` : file ? 'MP4/Video file' : 'Missing video'
      }
    }
  }
})
