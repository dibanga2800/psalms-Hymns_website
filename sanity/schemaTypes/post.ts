import { defineField, defineType } from 'sanity'

export const post = defineType({
	name: 'post',
	title: 'Blog Post',
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
			name: 'author',
			title: 'Author',
			type: 'string',
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Blog Post', value: 'blogpost' },
					{ title: 'Prophecy', value: 'prophecy' },
					{ title: 'Announcement', value: 'announcement' },
					{ title: 'Testimony', value: 'testimony' },
					{ title: 'Devotional', value: 'devotional' },
					{ title: 'Other', value: 'other' },
				],
			},
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'richText',
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			options: { hotspot: true },
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
			subtitle: 'category',
			media: 'heroImage',
		},
	},
})

