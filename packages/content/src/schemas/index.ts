import { type SchemaTypeDefinition } from 'sanity'
import { project } from './types/project'
import { blog } from './types/blog'
import { author } from './types/author'
import { tableBlock, videoBlock } from './types/modules'
import { dividerBlock } from './types/dividerBlock'

export const schemaTypes: SchemaTypeDefinition[] = [
  project, blog, author,
  tableBlock, videoBlock, dividerBlock
]

export { project } from './types/project'
export { blog } from './types/blog'
export { author } from './types/author'
