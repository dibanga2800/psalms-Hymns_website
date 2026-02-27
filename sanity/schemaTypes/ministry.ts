import { defineField, defineType } from 'sanity'

export const ministry = defineType({
	name: 'ministry',
	title: 'Ministry',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Name',
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
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'richText',
		}),
		defineField({
			name: 'leader',
			title: 'Leader',
			type: 'string',
		}),
		defineField({
			name: 'meetingSchedule',
			title: 'Meeting Schedule',
			type: 'string',
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'leader',
			media: 'image',
		},
	},
})

