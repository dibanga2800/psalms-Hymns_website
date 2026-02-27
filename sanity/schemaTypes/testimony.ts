import { defineField, defineType } from 'sanity'

export const testimony = defineType({
	name: 'testimony',
	title: 'Testimony',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'personName',
			title: 'Name',
			type: 'string',
		}),
		defineField({
			name: 'body',
			title: 'Testimony',
			type: 'richText',
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'date',
		}),
		defineField({
			name: 'showOnHomepage',
			title: 'Show on Homepage',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'personName',
		},
	},
})

