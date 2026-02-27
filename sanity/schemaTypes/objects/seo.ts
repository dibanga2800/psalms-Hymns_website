import { defineField, defineType } from 'sanity'

export const seo = defineType({
	name: 'seo',
	title: 'SEO',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.max(60),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.max(160),
		}),
		defineField({
			name: 'openGraphImage',
			title: 'Open Graph Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'canonicalUrl',
			title: 'Canonical URL',
			type: 'url',
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'openGraphImage',
		},
	},
})

