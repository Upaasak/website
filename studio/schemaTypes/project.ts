import {defineArrayMember, defineField, defineType} from 'sanity'

// The visual styles a project page can use. The first eight are the hand-designed
// case files; a new project picks one of them and gets a page in that style.
export const DESIGNS = [
  {title: 'Market feed terminal (HFT)', value: 'hft'},
  {title: 'Schematic case file (iDFT)', value: 'ipdft'},
  {title: 'Sketchbook (Power systems)', value: 'power'},
  {title: 'Postcard (Post-quantum)', value: 'pqc'},
  {title: 'Constellation print (Second brain)', value: 'secondbrain'},
  {title: 'Arcade HUD (SENTINEL)', value: 'sentinel'},
  {title: 'Parchment codex (Swarm)', value: 'swarm'},
  {title: 'Wireframe grid (TCP/IP)', value: 'tcpip'},
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'card', title: 'Listing card', default: true},
    {name: 'page', title: 'Case file page'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', group: 'card', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'card',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'code', type: 'string', group: 'card', description: 'e.g. PRJ_03'}),
    defineField({
      name: 'stage',
      type: 'string',
      group: 'card',
      options: {list: ['SPEC', 'RTL', 'IN VERIFICATION', 'SIGNED OFF', 'PAUSED']},
    }),
    defineField({name: 'tags', type: 'string', group: 'card', description: 'e.g. RTL · GbE · NO SOFT CORE'}),
    defineField({name: 'summary', type: 'text', rows: 4, group: 'card', description: 'Shown on the Projects page.'}),
    defineField({
      name: 'shortSummary',
      title: 'One-line summary',
      type: 'string',
      group: 'card',
      description: 'Shown on the home page card.',
    }),
    defineField({name: 'cardImage', type: 'figure', group: 'card'}),
    defineField({name: 'listed', title: 'Show on Projects page', type: 'boolean', group: 'card', initialValue: true}),
    defineField({name: 'featured', title: 'Show on home page', type: 'boolean', group: 'card', initialValue: false}),
    defineField({name: 'repo', title: 'Repository URL', type: 'url', group: 'card'}),
    defineField({name: 'order', type: 'number', group: 'card'}),

    defineField({
      name: 'caseFile',
      title: 'Case file page',
      type: 'string',
      group: 'page',
      options: {
        list: [
          {title: 'No page yet ("case file pending")', value: 'pending'},
          {title: 'Published', value: 'live'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'design',
      title: 'Page design',
      type: 'string',
      group: 'page',
      options: {list: DESIGNS},
      hidden: ({document}) => document?.caseFile !== 'live',
    }),
    defineField({
      name: 'sections',
      title: 'Page content',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({type: 'pageSection'})],
      hidden: ({document}) => document?.caseFile !== 'live',
      description: 'Each section fills one slot of the chosen design. Empty slots keep their default text.',
    }),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', code: 'code', stage: 'stage', media: 'cardImage'},
    prepare: ({title, code, stage, media}) => ({title, subtitle: [code, stage].filter(Boolean).join(' · '), media}),
  },
})

// A proposed block with a spec but no owner yet.
export const queueItem = defineType({
  name: 'queueItem',
  title: 'Queue block',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'tag', type: 'string', description: 'e.g. DV · 1 OWNER'}),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'tag'}},
})
