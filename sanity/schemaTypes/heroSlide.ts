import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
	name: 'heroSlide',
	title: 'Hero Slide',
	type: 'document',
	fields: [
		defineField({
			name: 'monthLabel',
			title: 'Month / Season Label',
			type: 'string',
			description:
				'Short label shown in the pill above the hero title (e.g. "February 2026" or "Easter 2026").',
		}),
		defineField({
			name: 'title',
			title: 'Theme Title',
			type: 'string',
			description: 'The big headline displayed on the slide (e.g. "My Month of Rejoicing").',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'subtitle',
			title: 'Scripture or Tagline',
			type: 'string',
			description:
				'A scripture verse or short supporting line shown beneath the title.',
		}),
		defineField({
			name: 'ctaText',
			title: 'Button Label',
			type: 'string',
			description:
				'Optional label for the call-to-action button on this slide (e.g. "Join Us Sunday"). Falls back to the default "Plan Your Visit".',
		}),
		defineField({
			name: 'ctaUrl',
			title: 'Button Link',
			type: 'string',
			description:
				'Optional internal path or external URL for the CTA button (e.g. "/service-times" or "https://…").',
		}),
		defineField({
			name: 'accentColor',
			title: 'Accent Colour',
			type: 'string',
			description: 'Optional hex colour used for the month pill and left scripture border on this slide.',
			options: {
				list: [
					{ title: 'RCCG Gold (default)', value: '#c9a84c' },
					{ title: 'White', value: '#ffffff' },
					{ title: 'Soft Teal', value: '#2dd4bf' },
					{ title: 'Amber', value: '#f59e0b' },
					{ title: 'Violet', value: '#a78bfa' },
				],
			},
		}),
		defineField({
			name: 'image',
			title: 'Background Image',
			type: 'image',
			options: { hotspot: true },
			description: 'Full-width background photo for this slide. Use a high-resolution landscape image.',
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			description: 'Lower numbers appear first. Use whole numbers (1, 2, 3…).',
		}),
		defineField({
			name: 'active',
			title: 'Active',
			type: 'boolean',
			initialValue: true,
			description: 'Uncheck to hide this slide without deleting it.',
		}),
	],
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'monthLabel',
			media: 'image',
		},
	},
})
