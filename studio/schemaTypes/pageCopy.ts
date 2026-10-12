import {defineArrayMember, defineField, defineType} from 'sanity'

export const PAGES = [
  {title: 'Home', value: 'home'},
  {title: 'Research', value: 'research'},
  {title: 'Projects', value: 'projects'},
  {title: 'People', value: 'people'},
  {title: 'Publications', value: 'publications'},
  {title: 'News', value: 'news'},
  {title: 'Join', value: 'join'},
]

// The fixed text of one page: its header plus any named sections (CTAs, side panels…).
export const pageCopy = defineType({
  name: 'pageCopy',
  title: 'Page text',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      type: 'string',
      options: {list: PAGES},
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({name: 'kicker', title: 'Small label above the title', type: 'string'}),
    defineField({name: 'title', type: 'text', rows: 3, description: 'Line breaks are kept.'}),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 5,
      description: 'Leave a blank line between paragraphs.',
    }),
    defineField({name: 'seoDescription', title: 'Search / link-preview description', type: 'text', rows: 2}),
    defineField({name: 'sections', type: 'array', of: [defineArrayMember({type: 'pageSection'})]}),
  ],
  preview: {
    select: {page: 'page', title: 'title'},
    prepare: ({page, title}) => ({
      title: PAGES.find((p) => p.value === page)?.title ?? page,
      subtitle: title?.split('\n')[0],
    }),
  },
})
