import { defineField, defineType } from 'sanity'

export const membershipPage = defineType({
	name: 'membershipPage',
	title: 'Membership Page',
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
			name: 'formDescription',
			title: 'Form Description',
			type: 'text',
			rows: 3,
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

