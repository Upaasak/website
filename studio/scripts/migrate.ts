// One-time import of the site's existing content into Sanity.
// Run from studio/:  npm run migrate
// Safe to re-run: documents use fixed IDs and are only created if missing,
// so nothing an editor has changed in the dashboard is ever overwritten.
import {createReadStream, existsSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import * as seed from './seed'

const client = getCliClient({apiVersion: '2025-02-19'})
const SITE_ROOT = resolve(process.cwd(), '..')

const key = (i: number) => `k${i}`
const withKeys = <T extends object>(arr: T[] = []) => arr.map((item, i) => ({_key: key(i), ...item}))
const sections = (arr: any[] = []) =>
  withKeys(arr.map((s) => ({_type: 'pageSection', ...s, items: withKeys(s.items), links: withKeys(s.links)})))

const imageCache = new Map<string, string>()
async function uploadImage(relPath: string, alt: string) {
  const file = resolve(SITE_ROOT, relPath)
  if (!existsSync(file)) throw new Error(`Missing image ${relPath}`)
  if (!imageCache.has(file)) {
    const asset = await client.assets.upload('image', createReadStream(file), {filename: basename(file)})
    imageCache.set(file, asset._id)
    console.log(`  uploaded ${relPath}`)
  }
  return {_type: 'figure', alt, asset: {_type: 'reference', _ref: imageCache.get(file)!}}
}

async function main() {
  const docs: any[] = []

  docs.push({_id: 'siteSettings', _type: 'siteSettings', ...seed.siteSettings,
    statusPanel: withKeys(seed.siteSettings.statusPanel), tracks: withKeys(seed.siteSettings.tracks)})

  for (const [page, copy] of Object.entries(seed.pages)) {
    docs.push({_id: `page-${page}`, _type: 'pageCopy', page, ...copy, sections: sections(copy.sections)})
  }

  seed.researchAreas.forEach((a, i) =>
    docs.push({_id: `area-${a.code.toLowerCase()}`, _type: 'researchArea', order: i + 1, ...a, related: withKeys(a.related)}),
  )

  for (const [i, p] of seed.projects.entries()) {
    const {slug, image, short, hidden, ...rest} = p as any
    docs.push({
      _id: `project-${slug}`,
      _type: 'project',
      ...rest,
      slug: {_type: 'slug', current: slug},
      shortSummary: short,
      listed: !hidden,
      featured: Boolean(p.featured),
      caseFile: p.design ? 'live' : 'pending',
      order: i + 1,
      ...(image ? {cardImage: await uploadImage(image, p.title)} : {}),
    })
  }

  seed.queue.forEach((q, i) => docs.push({_id: `queue-${i + 1}`, _type: 'queueItem', order: i + 1, ...q}))
  seed.publications.forEach((p, i) => docs.push({_id: `pub-${i + 1}`, _type: 'publication', ...p}))
  seed.posts.forEach((p, i) =>
    docs.push({_id: `post-${i + 1}`, _type: 'post', type: 'news', pinned: false, ...p,
      ...(p.link ? {link: {_type: 'link', ...p.link}} : {})}),
  )
  seed.people.forEach((p: any, i) =>
    docs.push({
      _id: `person-${i + 1}`,
      _type: 'person',
      name: '[ NAME ]',
      status: 'member',
      order: i + 1,
      ...p,
      areas: (p.areas ?? []).map((code: string, j: number) => ({_key: key(j), _type: 'reference', _ref: `area-${code.toLowerCase()}`})),
    }),
  )
  seed.positions.forEach((p, i) => docs.push({_id: `position-${i + 1}`, _type: 'openPosition', filled: false, order: i + 1, ...p}))

  const tx = client.transaction()
  docs.forEach((d) => tx.createIfNotExists(d))
  await tx.commit()
  console.log(`Done: ${docs.length} documents checked, missing ones created.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
