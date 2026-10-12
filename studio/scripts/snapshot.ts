// Saves the published content to content/snapshot.json — the copy the website
// falls back to if Sanity can't be reached. Run from studio/:  npm run snapshot
// then commit and push the updated file.
import {readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {runInNewContext} from 'node:vm'
import {getCliClient} from 'sanity/cli'

const SITE_ROOT = resolve(process.cwd(), '..')

// Reuse the exact query the website runs, straight from cms.js.
const sandbox: any = {window: {}}
runInNewContext(readFileSync(resolve(SITE_ROOT, 'cms.js'), 'utf8'), sandbox)
const query: string = sandbox.window.WB.query

const client = getCliClient({apiVersion: '2025-02-19'}).withConfig({perspective: 'published', useCdn: false})

client
  .fetch(query)
  .then((data) => {
    const out = resolve(SITE_ROOT, 'content', 'snapshot.json')
    writeFileSync(out, JSON.stringify(data, null, 1) + '\n')
    console.log(`Wrote ${out}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
