import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@kol/content'

export default defineConfig({
  name: 'kolkrabbi-studio',
  title: 'Kolkrabbi CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes }
})
