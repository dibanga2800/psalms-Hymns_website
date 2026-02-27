import { defineField, defineType } from 'sanity'

export const galleryItem = defineType({
	name: 'galleryItem',
	title: 'Gallery Item',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string',
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Anniversary', value: 'anniversary' },
					{ title: 'Women of Hope', value: 'women' },
					{ title: 'Men of Hope', value: 'men' },
					{ title: 'Youth', value: 'youth' },
					{ title: 'Children', value: 'children' },
					{ title: 'Other', value: 'other' },
				],
			},
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'date',
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
			media: 'image',
		},
	},
})

