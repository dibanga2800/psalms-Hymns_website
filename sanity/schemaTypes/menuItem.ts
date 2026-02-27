import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
	name: 'menuItem',
	title: 'Menu Item',
	type: 'document',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'path',
			title: 'Path',
			type: 'string',
			description: 'Relative path, e.g. /sermons or /about',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'order',
			title: 'Order',
			type: 'number',
		}),
		defineField({
			name: 'showInHeader',
			title: 'Show in header',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'showInFooter',
			title: 'Show in footer',
			type: 'boolean',
			initialValue: true,
		}),
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'path',
		},
	},
})

