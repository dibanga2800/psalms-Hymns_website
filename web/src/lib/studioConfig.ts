import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from '@schema/index'

export const studioConfig = defineConfig({
	name: 'rccg-psalms-hymns',
	title: 'RCCG Psalms & Hymns',

	basePath: '/studio',

	projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
	dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
})
