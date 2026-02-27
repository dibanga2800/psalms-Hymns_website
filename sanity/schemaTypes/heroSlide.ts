import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
	name: 'heroSlide',
	title: 'Hero Slide',
	type: 'document',
	fields: [
		defineField({
			name: 'monthLabel',
			title: 'Month Label',
			type: 'string',
			description:
				'Short label shown in the pill above the hero title (e.g. "February 2026").',
		}),
		defineField({
			name: 'title',
			title: 'Theme Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'subtitle',
			title: 'Scripture or Tagline',
			type: 'string',
			description:
				'Optional scripture text or short line shown under the theme title.',
		}),
		defineField({
			name: 'image',
			title: 'Background Image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
		}),
		defineField({
			name: 'active',
			title: 'Active',
			type: 'boolean',
			initialValue: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'monthLabel',
			media: 'image',
		},
	},
})

