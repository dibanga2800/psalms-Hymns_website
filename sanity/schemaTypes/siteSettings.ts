import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'tagline',
			title: 'Tagline / Watch-word',
			type: 'string',
		}),
		defineField({
			name: 'address',
			title: 'Church Address',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'primaryPhone',
			title: 'Primary Phone',
			type: 'string',
		}),
		defineField({
			name: 'secondaryPhone',
			title: 'Secondary Phone',
			type: 'string',
		}),
		defineField({
			name: 'email',
			title: 'Contact Email',
			type: 'string',
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social Links',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'platform',
							title: 'Platform',
							type: 'string',
						}),
						defineField({
							name: 'url',
							title: 'URL',
							type: 'url',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'footerText',
			title: 'Footer Text',
			type: 'string',
		}),
		defineField({
			name: 'headerMenu',
			title: 'Header Menu Items',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
		}),
		defineField({
			name: 'footerMenu',
			title: 'Footer Menu Items',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
		}),
		defineField({
			name: 'seo',
			title: 'Default SEO',
			type: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'tagline',
			media: 'logo',
		},
	},
})

