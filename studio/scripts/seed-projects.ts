// Loads each project's case-file page content into Sanity.
// Source: content/projects/<slug>.json (the text and images the page was designed with).
//
// Run from studio/:
//   npm run seed-projects                 fill only projects whose page content is still empty
//   npm run seed-projects -- --force pqc  overwrite the named project(s) with the JSON again
//   npm run seed-projects -- --only pqc   process only the named project(s)
//
// Safe by default: a project an editor has already filled in is skipped, so dashboard edits
// are never overwritten unless you name it with --force.
import {createReadStream, existsSync, readdirSync, readFileSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-02-19'}).withConfig({perspective: 'raw', useCdn: false})
const SITE_ROOT = resolve(process.cwd(), '..')
const DIR = resolve(SITE_ROOT, 'content', 'projects')

// --force a b   overwrite projects a and b;  --only a   process just project a
const args = process.argv.slice(2)
const listAfter = (flag: string) => {
  const i = args.indexOf(flag)
  if (i === -1) return []
  const out = []
  for (const a of args.slice(i + 1)) { if (a.startsWith('--')) break; out.push(a) }
  return out
}
const forced = listAfter('--force')
const only = listAfter('--only')

type Row = {label?: string; value?: string; detail?: string; accent?: string}
type Img = {src: string; alt?: string; caption?: string}
type Section = {key: string; kicker?: string; heading?: string; body?: string; items?: Row[]; images?: Img[]; links?: {label: string; href: string}[]}
type Seed = {seoDescription?: string; sections: Section[]}

const imageCache = new Map<string, string>()
async function upload(src: string) {
  const file = resolve(SITE_ROOT, src)
  if (!existsSync(file)) throw new Error(`Missing image ${src}`)
  if (!imageCache.has(file)) {
    // Sanity stores identical files once, so re-running never duplicates images.
    const asset = await client.assets.upload('image', createReadStream(file), {filename: basename(file)})
    imageCache.set(file, asset._id)
  }
  return imageCache.get(file)!
}

const keyed = <T extends object>(arr: T[] | undefined, type: string, prefix: string) =>
  (arr || []).map((x, i) => ({_key: `${prefix}${i}`, _type: type, ...x}))

async function build(seed: Seed) {
  const sections = []
  for (const [i, s] of seed.sections.entries()) {
    const images = []
    for (const [j, im] of (s.images || []).entries()) {
      images.push({
        _key: `i${j}`,
        _type: 'figure',
        alt: im.alt || '',
        ...(im.caption ? {caption: im.caption} : {}),
        asset: {_type: 'reference', _ref: await upload(im.src)},
      })
    }
    sections.push({
      _key: `s${i}-${s.key}`,
      _type: 'pageSection',
      key: s.key,
      ...(s.kicker !== undefined ? {kicker: s.kicker} : {}),
      ...(s.heading !== undefined ? {heading: s.heading} : {}),
      ...(s.body !== undefined ? {body: s.body} : {}),
      items: keyed(s.items, 'keyValue', 'r'),
      images,
      links: keyed(s.links, 'link', 'l'),
    })
  }
  return sections
}

async function main() {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.json') && (!only.length || only.includes(f.replace(/\.json$/, ''))))
  for (const f of files) {
    const slug = f.replace(/\.json$/, '')
    const id = `project-${slug}`
    const seed: Seed = JSON.parse(readFileSync(resolve(DIR, f), 'utf8'))
    const [doc, draft] = await Promise.all([client.getDocument(id), client.getDocument(`drafts.${id}`)])
    if (!doc) { console.log(`skip ${slug}: no project document ${id}`); continue }
    const filled = (doc.sections || []).length > 0 || (draft?.sections || []).length > 0
    if (filled && !forced.includes(slug)) { console.log(`skip ${slug}: already has page content (use --force ${slug})`); continue }
    const sections = await build(seed)
    const set: Record<string, unknown> = {sections, caseFile: 'live'}
    if (seed.seoDescription) set.seoDescription = seed.seoDescription
    const tx = client.transaction().patch(id, (p) => p.set(set))
    if (draft) tx.patch(`drafts.${id}`, (p) => p.set(set))
    await tx.commit()
    console.log(`filled ${slug}: ${sections.length} sections`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
