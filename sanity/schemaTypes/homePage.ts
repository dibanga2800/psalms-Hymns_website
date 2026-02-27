import { defineField, defineType } from 'sanity'

export const homePage = defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	fields: [
		// Global toggles for each homepage section so editors can turn sections on/off
		defineField({
			name: 'showHeroSection',
			title: 'Show Hero Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Turn the main hero slider on or off. When off, the hero area is hidden even if slides exist.',
		}),
		defineField({
			name: 'showWelcomeSection',
			title: 'Show Welcome Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Toggle the Welcome message section beneath the hero. When off, the welcome block is hidden.',
		}),
		defineField({
			name: 'showProphecySection',
			title: 'Show Prophecy Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Controls the Prophecy image block on the home page. Turn off to temporarily hide without deleting the image.',
		}),
		defineField({
			name: 'showUpcomingEventsSection',
			title: 'Show Upcoming Events Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Controls the Upcoming Events area and calendar preview on the home page.',
		}),
		defineField({
			name: 'showLatestPostsSection',
			title: 'Show Latest Blog Posts Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Controls the Latest Blog Posts strip on the home page that surfaces recent or highlighted blog posts.',
		}),
		defineField({
			name: 'showGallerySection',
			title: 'Show Photo Gallery Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Controls the small photo gallery strip on the home page, powered by selected Gallery Items.',
		}),
		defineField({
			name: 'showYoutubeSection',
			title: 'Show YouTube Section',
			type: 'boolean',
			initialValue: true,
			description:
				'Controls the YouTube highlight section with video/channel links on the home page.',
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		// Welcome section content (used in the Welcome block on the home page)
		defineField({
			name: 'welcomeTitle',
			title: 'Welcome Title',
			type: 'string',
			description:
				'Heading for the welcome section (e.g. "Welcome to RCCG Psalms & Hymns").',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'welcomeMessage',
			title: 'Welcome Message',
			type: 'text',
			rows: 5,
			description:
				'Body text for the welcome section. This appears next to the welcome image on the home page.',
		}),
		defineField({
			name: 'welcomeImage',
			title: 'Welcome Image',
			type: 'image',
			options: { hotspot: true },
			description:
				'Image shown alongside the welcome message (e.g. congregation, pastor, or church exterior).',
		}),
		defineField({
			name: 'heroHeading',
			title: 'Hero Heading',
			type: 'string',
		}),
		defineField({
			name: 'heroSubheading',
			title: 'Hero Subheading',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'watchWord',
			title: 'Watch-word',
			type: 'text',
			rows: 2,
		}),
		defineField({
			name: 'featureCards',
			title: 'Feature Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						}),
						defineField({
							name: 'icon',
							title: 'Icon name',
							type: 'string',
							description:
								'Used in the frontend to map to a specific icon (e.g. clock, users, heart).',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'heroSlides',
			title: 'Hero Slides',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'heroSlide' }] }],
			description:
				'Add up to 5 hero slides. Slides can be re-ordered and individually deactivated. Only the first 5 active slides are rendered on the home page.',
			validation: (rule) =>
				rule
					.max(5)
					.warning('Only the first 5 slides will be displayed on the home page hero.'),
		}),
		defineField({
			name: 'prophecyImage',
			title: 'Prophecy Image',
			type: 'image',
			options: { hotspot: true },
			description:
				'Upload the current prophecy poster/flyer. This appears in the Prophecy section on the home page beside Upcoming Events.',
		}),
		defineField({
			name: 'prophecyCaption',
			title: 'Prophecy Caption',
			type: 'string',
			description:
				'Optional short caption beneath the prophecy image (e.g. "Prophecies for 2026").',
		}),
		defineField({
			name: 'upcomingEvents',
			title: 'Upcoming Events (Homepage)',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'event' }] }],
			description:
				'Select events to feature on the home page Upcoming Events section. The frontend can also fall back to future events automatically if this is left empty.',
		}),
		defineField({
			name: 'homepageGalleryItems',
			title: 'Homepage Gallery Items',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'galleryItem' }] }],
			description:
				'Choose Gallery Items to feature in the Photo Gallery strip on the home page.',
		}),
		defineField({
			name: 'youtubeLinks',
			title: 'YouTube Links (Homepage)',
			type: 'array',
			of: [{ type: 'link' }],
			description:
				'Add labeled links to YouTube videos, playlists or channels to highlight in the YouTube section on the home page.',
		}),
		defineField({
			name: 'highlightedSermon',
			title: 'Highlighted Sermon',
			type: 'reference',
			to: [{ type: 'sermon' }],
		}),
		defineField({
			name: 'highlightedPosts',
			title: 'Highlighted Blog Posts (Homepage)',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'post' }] }],
			description:
				'Pick blog posts to surface in the Latest Blog Posts section on the home page. The frontend can also fall back to most recent posts.',
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
			subtitle: 'watchWord',
		},
	},
})

