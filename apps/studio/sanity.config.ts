import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from '@kol/content'

export default defineConfig({
  name: 'kolkrabbi-studio',
  title: 'Kolkrabbi CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'project'
            ),
          ])
      },
    }),
    visionTool(),
    codeInput(),
  ],
  schema: { types: schemaTypes }
})
