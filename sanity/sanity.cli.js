import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hcm6ufrb',
    dataset: 'production'
  },
  deployment: {
    appId: 'nc73q0nf1q4iho3ikkikgt4o',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
