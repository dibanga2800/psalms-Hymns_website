import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
	name: 'aboutPage',
	title: 'About Page',
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
			name: 'churchStory',
			title: 'Church Story',
			type: 'richText',
		}),
		defineField({
			name: 'pastor',
			title: 'Parish Pastor',
			type: 'object',
			fields: [
				defineField({
					name: 'name',
					title: 'Name',
					type: 'string',
				}),
				defineField({
					name: 'title',
					title: 'Title / Role',
					type: 'string',
				}),
				defineField({
					name: 'photo',
					title: 'Photo',
					type: 'image',
					options: { hotspot: true },
				}),
				defineField({
					name: 'bio',
					title: 'Bio',
					type: 'richText',
				}),
			],
		}),
		defineField({
			name: 'beliefs',
			title: 'Our Beliefs',
			type: 'richText',
		}),
		defineField({
			name: 'vision',
			title: 'Our Vision',
			type: 'richText',
		}),
		defineField({
			name: 'values',
			title: 'Our Values',
			type: 'richText',
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

