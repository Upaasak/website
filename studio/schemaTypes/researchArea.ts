import {defineArrayMember, defineField, defineType} from 'sanity'

export const researchArea = defineType({
  name: 'researchArea',
  title: 'Research area',
  type: 'document',
  fields: [
    defineField({name: 'code', type: 'string', description: 'e.g. R1', validation: (r) => r.required()}),
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['PRIMARY', 'ACTIVE', 'EXPLORATORY', 'ONGOING', 'PAUSED']},
    }),
    defineField({name: 'description', type: 'text', rows: 5}),
    defineField({name: 'sideLabel', title: 'Side panel label', type: 'string', description: 'e.g. TOOLING, TARGET, BENCH'}),
    defineField({
      name: 'sideItems',
      title: 'Side panel lines',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Start a line with "// " to show it dimmed, as a side note.',
    }),
    defineField({
      name: 'related',
      title: 'See also',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
    }),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {code: 'code', title: 'title', status: 'status'},
    prepare: ({code, title, status}) => ({title: `${code} · ${title}`, subtitle: status}),
  },
})
