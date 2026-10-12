import {defineArrayMember, defineField, defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Member', value: 'member'},
          {title: 'Advisor', value: 'advisor'},
          {title: 'Alumni', value: 'alumni'},
        ],
        layout: 'radio',
      },
      initialValue: 'member',
      validation: (r) => r.required(),
    }),
    defineField({name: 'tag', title: 'Card tag', description: 'Short label on the card, e.g. LEAD, RTL, DV', type: 'string'}),
    defineField({name: 'role', type: 'string', description: 'e.g. VERIFICATION LEAD'}),
    defineField({name: 'bio', type: 'text', rows: 3}),
    defineField({
      name: 'areas',
      title: 'Research areas',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'researchArea'}]})],
    }),
    defineField({name: 'photo', type: 'figure'}),
    defineField({
      name: 'alumniNote',
      title: 'Where they are now',
      type: 'string',
      description: 'Alumni only, e.g. "now DV at [company]"',
      hidden: ({document}) => document?.status !== 'alumni',
    }),
    defineField({name: 'links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first.'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
