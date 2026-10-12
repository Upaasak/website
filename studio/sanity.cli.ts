import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted dashboard address: https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST || 'whistleblower-lab',
  deployment: {appId: 'qmmz3i5wmsm1446z1hq0owvk', autoUpdates: true},
})
