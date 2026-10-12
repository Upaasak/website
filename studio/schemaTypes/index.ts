import {defineField, defineType} from 'sanity'
import {figure, keyValue, link, pageSection} from './objects'
import {pageCopy} from './pageCopy'
import {person} from './person'
import {post} from './post'
import {project, queueItem} from './project'
import {publication} from './publication'
import {researchArea} from './researchArea'
import {siteSettings} from './siteSettings'

// A role on the Join page and the home page "QUEUE" panel.
const openPosition = defineType({
  name: 'openPosition',
  title: 'Open position',
  type: 'document',
  fields: [
    defineField({name: 'role', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slots', type: 'string', description: 'e.g. 3 SLOTS, FILLED'}),
    defineField({name: 'filled', type: 'boolean', initialValue: false}),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'role', subtitle: 'slots'}},
})

export const SINGLETONS = new Set(['siteSettings', 'pageCopy'])

export const schemaTypes = [
  link,
  figure,
  keyValue,
  pageSection,
  siteSettings,
  pageCopy,
  post,
  project,
  queueItem,
  publication,
  person,
  researchArea,
  openPosition,
]
