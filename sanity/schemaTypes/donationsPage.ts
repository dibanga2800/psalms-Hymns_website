import { defineField, defineType } from 'sanity'

export const donationsPage = defineType({
	name: 'donationsPage',
	title: 'Donations Page',
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
			name: 'scripture',
			title: 'Key Scripture',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'givingOptions',
			title: 'Giving Options',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						}),
						defineField({
							name: 'details',
							title: 'Details (e.g. bank info)',
							type: 'richText',
						}),
						defineField({
							name: 'link',
							title: 'Button Link',
							type: 'link',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'buildingFund',
			title: 'Building Fund Section',
			type: 'object',
			fields: [
				defineField({
					name: 'title',
					title: 'Title',
					type: 'string',
				}),
				defineField({
					name: 'body',
					title: 'Body',
					type: 'richText',
				}),
				defineField({
					name: 'cta',
					title: 'CTA Link',
					type: 'link',
				}),
			],
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

