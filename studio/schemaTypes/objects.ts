import {defineArrayMember, defineField, defineType} from 'sanity'

// A labelled link: internal page path ("projects.html") or full URL.
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'href',
      title: 'URL or page',
      type: 'string',
      description: 'A full URL (https://…), an email (mailto:…), or a site page such as projects.html',
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

// An image with the accessibility text the site needs.
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'What the image shows, for screen readers and when it fails to load.',
      validation: (r) => r.required().warning('Add alt text'),
    }),
    defineField({name: 'caption', type: 'string'}),
  ],
})

// One row in a list of facts: "TARGETS → ARTIX-7 · ZYNQ", a pipeline stage, a stat…
export const keyValue = defineType({
  name: 'keyValue',
  title: 'Row',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string'}),
    defineField({name: 'value', type: 'string'}),
    defineField({name: 'detail', type: 'text', rows: 2}),
    defineField({
      name: 'accent',
      type: 'string',
      description: 'Optional highlight colour as a hex code, e.g. #FF1744',
      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex colour'}),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'value'}},
})

// A named block of content that a page design places in a fixed slot.
// The page's code decides how the slot looks; editors only change what it says.
export const pageSection = defineType({
  name: 'pageSection',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Slot',
      type: 'string',
      description: 'Which part of the page this fills. Keep the slot name the page was set up with.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'kicker', title: 'Small label above the heading', type: 'string'}),
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'body',
      type: 'text',
      rows: 6,
      description: 'Plain text. Leave a blank line between paragraphs.',
    }),
    defineField({name: 'items', title: 'Rows', type: 'array', of: [defineArrayMember({type: 'keyValue'})]}),
    defineField({name: 'images', type: 'array', of: [defineArrayMember({type: 'figure'})]}),
    defineField({name: 'links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
  ],
  preview: {
    select: {key: 'key', heading: 'heading'},
    prepare: ({key, heading}) => ({title: heading || key, subtitle: `slot: ${key}`}),
  },
})
