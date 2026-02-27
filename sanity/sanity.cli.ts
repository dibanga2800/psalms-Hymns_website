import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vra21k0v',
		dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	},
})
