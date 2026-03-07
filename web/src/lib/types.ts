export interface SiteMenuItem {
	label: string
	path: string
	order?: number
}

export interface SiteSettings {
	title?: string
	tagline?: string
	address?: string
	primaryPhone?: string
	secondaryPhone?: string
	email?: string
	headerMenu?: SiteMenuItem[]
	footerMenu?: SiteMenuItem[]
}

export interface HomeFeatureCard {
	title?: string
	description?: string
	icon?: string
}

export interface HomeHeroSlide {
	_id?: string
	monthLabel?: string
	title?: string
	subtitle?: string
	imageUrl?: string
	ctaText?: string
	ctaUrl?: string
	accentColor?: string
	order?: number
	active?: boolean
}

export interface EventSummary {
	_id: string
	title?: string
	slug?: string
	startDate?: string
	endDate?: string
	location?: string
	category?: string
	excerpt?: string
	bannerImageUrl?: string
}

export interface EventDetail extends EventSummary {
	registrationLink?: string
}

export interface GalleryItemSummary {
	_id: string
	title?: string
	slug?: string
	imageUrl?: string
	caption?: string
	category?: string
	date?: string
}

export interface SanityLink {
	label?: string
	href?: string
	isExternal?: boolean
}

export interface HomePage {
	showHeroSection?: boolean
	showWelcomeSection?: boolean
	showProphecySection?: boolean
	showUpcomingEventsSection?: boolean
	showLatestPostsSection?: boolean
	showGallerySection?: boolean
	showYoutubeSection?: boolean
	title?: string
	welcomeTitle?: string
	welcomeMessageText?: string
	welcomeImageUrl?: string
	heroHeading?: string
	heroSubheading?: string
	watchWord?: string
	featureCards?: HomeFeatureCard[]
	heroSlides?: HomeHeroSlide[]
	prophecyImageUrl?: string
	prophecyCaption?: string
	upcomingEvents?: EventSummary[]
	homepageGalleryItems?: GalleryItemSummary[]
	youtubeLinks?: SanityLink[]
	highlightedPosts?: PostSummary[]
	highlightedSermon?: {
		_id: string
		title?: string
		date?: string
		preacher?: string
	}
}

export interface SermonSummary {
	_id: string
	slug?: string
	title?: string
	date?: string
	preacher?: string
	description?: string
}

export interface PostSummary {
	_id: string
	slug?: string
	title?: string
	date?: string
	author?: string
	category?: string
	excerpt?: string
	heroImageUrl?: string
}

// PortableText body for blog posts – kept generic so we don't depend
// on Sanity's runtime types in the frontend.
export interface PostDetail extends PostSummary {
	// Array of Portable Text blocks (rich text + images)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any[]
}

export interface ServiceTime {
	name?: string
	description?: string
	day?: string
	time?: string
	isThanksgiving?: boolean
}

export interface ServiceTimesPage {
	title?: string
	subtitle?: string
	heroImageUrl?: string
	services?: ServiceTime[]
}

