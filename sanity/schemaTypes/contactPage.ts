import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
	name: 'contactPage',
	title: 'Contact Page',
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
			name: 'address',
			title: 'Address',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'phones',
			title: 'Phone Numbers',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
		}),
		defineField({
			name: 'mapEmbedUrl',
			title: 'Map Embed URL',
			type: 'url',
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

