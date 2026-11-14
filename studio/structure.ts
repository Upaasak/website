import type {StructureResolver} from 'sanity/structure'
import {PAGES} from './schemaTypes/pageCopy'

// Sidebar of the dashboard: settings and page text first, then the lists editors touch most.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Page text')
        .child(
          S.list()
            .title('Page text')
            .items(
              PAGES.map(({title, value}) =>
                S.listItem()
                  .title(title)
                  .id(`page-${value}`)
                  .child(S.document().schemaType('pageCopy').documentId(`page-${value}`)),
              ),
            ),
        ),
      S.listItem()
        .title('Project pages (case files)')
        .id('projectPages')
        .child(
          S.documentTypeList('project')
            .title('Project pages')
            .filter('_type == "project" && caseFile == "live"')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.divider(),
      S.documentTypeListItem('post').title('News, events & announcements'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('queueItem').title('Project queue (unclaimed)'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('person').title('People'),
      S.documentTypeListItem('researchArea').title('Research areas'),
      S.documentTypeListItem('openPosition').title('Open positions'),
    ])
