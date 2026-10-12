import {defineArrayMember, defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Lab report', value: 'report'},
          {title: 'Peer-reviewed paper', value: 'paper'},
        ],
        layout: 'radio',
      },
      initialValue: 'report',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      description: 'Only the year and month are shown for reports, only the year for papers.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'kind', title: 'Type label', type: 'string', description: 'e.g. TECH REPORT · PDF, PAPER · RESEARCHGATE'}),
    defineField({name: 'authors', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'venue', type: 'string', description: 'Journal or conference'}),
    defineField({name: 'abstract', type: 'text', rows: 5}),
    defineField({name: 'pdf', title: 'PDF', type: 'file', options: {accept: 'application/pdf'}}),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'string',
      description: 'External URL (DOI, ResearchGate…) or a site page. Used when there is no PDF.',
    }),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date'}},
})
