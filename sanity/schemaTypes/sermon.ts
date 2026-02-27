import { defineField, defineType } from 'sanity'

export const sermon = defineType({
	name: 'sermon',
	title: 'Sermon',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'date',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'preacher',
			title: 'Preacher',
			type: 'string',
		}),
		defineField({
			name: 'series',
			title: 'Series',
			type: 'string',
		}),
		defineField({
			name: 'scripture',
			title: 'Scripture Reference(s)',
			type: 'string',
		}),
		defineField({
			name: 'description',
			title: 'Short Description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'body',
			title: 'Content / Notes',
			type: 'richText',
		}),
		defineField({
			name: 'audioUrl',
			title: 'Audio URL',
			type: 'url',
		}),
		defineField({
			name: 'videoUrl',
			title: 'Video URL (YouTube, etc.)',
			type: 'url',
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'featured',
			title: 'Featured on Homepage',
			type: 'boolean',
			initialValue: false,
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
			subtitle: 'preacher',
			media: 'coverImage',
		},
	},
})

