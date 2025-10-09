import { CASE_STUDY_LIST, CASE_STUDY_DETAIL, FONT_FAMILIES } from '@kol/content/frontend'
import { sanityClient, previewClient } from '../lib/sanityClient'
import { fetchProjectsFallback, fetchProjectDetailFallback, normaliseProject } from './projectBridge'

async function fetchWithFallback(client, query, params = {}, fallback = []) {
  try {
    const result = await client.fetch(query, params)
    if (Array.isArray(fallback)) {
      return Array.isArray(result) ? result : fallback
    }
    return result ?? fallback
  } catch (error) {
    console.warn('Sanity fetch failed', error)
    return fallback
  }
}

export async function fetchCaseStudyList({ preview = false, fallback = [] } = {}) {
  const client = preview ? previewClient : sanityClient
  const data = await fetchWithFallback(client, CASE_STUDY_LIST, {}, fallback)
  if (!Array.isArray(data) || data.length === 0 || data === fallback) {
    const projects = await fetchProjectsFallback({ preview })
    return projects.length > 0 ? projects.map(normaliseProject) : fallback
  }
  return data
}

export async function fetchCaseStudyDetail({ slug, preview = false, fallback = null } = {}) {
  if (!slug) {
    return fallback
  }
  const client = preview ? previewClient : sanityClient
  const result = await fetchWithFallback(client, CASE_STUDY_DETAIL, { slug }, fallback)
  if (!result || result === fallback) {
    const project = await fetchProjectDetailFallback({ slug, preview })
    return normaliseProject(project) || fallback
  }
  return result
}

export async function fetchFontFamilies({ preview = false, fallback = [] } = {}) {
  const client = preview ? previewClient : sanityClient
  return fetchWithFallback(client, FONT_FAMILIES, {}, fallback)
}
