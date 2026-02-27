import { defineField, defineType } from 'sanity'

export const event = defineType({
	name: 'event',
	title: 'Event',
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
			name: 'startDate',
			title: 'Start Date & Time',
			type: 'datetime',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'endDate',
			title: 'End Date & Time',
			type: 'datetime',
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'string',
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Service', value: 'service' },
					{ title: 'Prayer', value: 'prayer' },
					{ title: 'Conference', value: 'conference' },
					{ title: 'Special', value: 'special' },
					{ title: 'Other', value: 'other' },
				],
			},
		}),
		defineField({
			name: 'excerpt',
			title: 'Short Description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'body',
			title: 'Details',
			type: 'richText',
		}),
		defineField({
			name: 'bannerImage',
			title: 'Banner Image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'registrationLink',
			title: 'Registration Link',
			type: 'url',
		}),
		defineField({
			name: 'showOnHomepage',
			title: 'Show on Homepage',
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
			subtitle: 'location',
			media: 'bannerImage',
		},
	},
})

