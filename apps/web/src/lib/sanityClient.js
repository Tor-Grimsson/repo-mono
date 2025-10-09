import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01'
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

if (!projectId || !dataset) {
  console.warn(
    'Sanity client is using placeholder config. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to enable live data.'
  )
}

export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'placeholder',
  apiVersion,
  useCdn,
  perspective: 'published'
})

export const previewClient = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'placeholder',
  apiVersion,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN
})

export function getClient(usePreview = false) {
  return usePreview ? previewClient : sanityClient
}

export function sanityMissingConfig() {
  return projectId == null || dataset == null
}
