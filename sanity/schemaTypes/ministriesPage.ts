import { defineField, defineType } from 'sanity'

export const ministriesPage = defineType({
	name: 'ministriesPage',
	title: 'Ministries Page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'intro',
			title: 'Introduction',
			type: 'richText',
		}),
		defineField({
			name: 'layout',
			title: 'Layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Grid', value: 'grid' },
					{ title: 'List', value: 'list' },
				],
				layout: 'radio',
			},
			initialValue: 'grid',
		}),
		defineField({
			name: 'seo',
			title: 'SEO',
			type: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})

