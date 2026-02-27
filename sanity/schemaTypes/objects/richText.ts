import { defineArrayMember, defineType } from 'sanity'

export const richText = defineType({
	name: 'richText',
	title: 'Rich Text',
	type: 'array',
	of: [
		defineArrayMember({
			type: 'block',
		}),
		defineArrayMember({
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
	],
})

