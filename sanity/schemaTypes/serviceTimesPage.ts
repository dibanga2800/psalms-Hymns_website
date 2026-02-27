import { defineField, defineType } from 'sanity'

export const serviceTimesPage = defineType({
	name: 'serviceTimesPage',
	title: 'Service Times Page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			description: 'Short line under the title (e.g. "Find a time to worship with us").',
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero / Banner Image',
			type: 'image',
			options: { hotspot: true },
			description: 'Optional banner image for the top of the page.',
		}),
		defineField({
			name: 'intro',
			title: 'Introduction',
			type: 'richText',
		}),
		defineField({
			name: 'services',
			title: 'Services',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 2,
						}),
						defineField({
							name: 'day',
							title: 'Day',
							type: 'string',
						}),
						defineField({
							name: 'time',
							title: 'Time',
							type: 'string',
						}),
						defineField({
							name: 'isThanksgiving',
							title: 'Thanksgiving Service',
							type: 'boolean',
						}),
					],
				},
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

