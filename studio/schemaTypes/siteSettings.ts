import {defineArrayMember, defineField, defineType} from 'sanity'

// Lab-wide details shown in the header, footer and contact blocks of every page.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'lab', title: 'Lab', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'home', title: 'Home page'},
  ],
  fields: [
    defineField({name: 'labName', type: 'string', group: 'lab', validation: (r) => r.required()}),
    defineField({name: 'tagline', description: 'Shown next to the logo, e.g. ASIC · FPGA · DV', type: 'string', group: 'lab'}),
    defineField({name: 'footerBlurb', type: 'string', group: 'lab'}),
    defineField({name: 'intakeOpen', title: 'Intake is open', type: 'boolean', group: 'lab', initialValue: true}),
    defineField({name: 'email', type: 'string', group: 'contact', validation: (r) => r.email()}),
    defineField({name: 'github', title: 'GitHub URL', type: 'url', group: 'contact'}),
    defineField({name: 'location', type: 'string', group: 'contact'}),
    defineField({name: 'hours', title: 'Open hours', type: 'string', group: 'contact'}),
    defineField({
      name: 'statusPanel',
      title: 'LAB.STATUS panel',
      description: 'The fact rows in the panel at the top of the home page.',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({type: 'keyValue'})],
    }),
    defineField({name: 'statusNote', title: 'LAB.STATUS note', type: 'string', group: 'home'}),
    defineField({
      name: 'tracks',
      title: 'What we do (tracks)',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({type: 'keyValue'})],
      description: 'Label = "TRACK A", Value = title, Detail = description.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
