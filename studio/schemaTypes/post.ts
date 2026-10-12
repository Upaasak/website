import {defineField, defineType} from 'sanity'

// News, events and announcements share one list so the News page stays one log.
export const post = defineType({
  name: 'post',
  title: 'News item',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Event', value: 'event'},
          {title: 'Announcement', value: 'announcement'},
        ],
        layout: 'radio',
      },
      initialValue: 'news',
      validation: (r) => r.required(),
    }),
    defineField({name: 'date', title: 'Posted on', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'tag', title: 'Card tag', type: 'string', description: 'Short label on the card, e.g. TIMING, BENCH, INTAKE'}),
    defineField({name: 'body', type: 'text', rows: 5}),
    defineField({name: 'image', type: 'figure'}),
    defineField({name: 'link', type: 'link'}),
    defineField({
      name: 'eventStart',
      title: 'Event starts',
      type: 'datetime',
      hidden: ({document}) => document?.type !== 'event',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Event location',
      type: 'string',
      hidden: ({document}) => document?.type !== 'event',
    }),
    defineField({name: 'pinned', title: 'Pin to top', type: 'boolean', initialValue: false}),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
})
