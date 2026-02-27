import { type SchemaTypeDefinition } from 'sanity'

import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { serviceTimesPage } from './serviceTimesPage'
import { donationsPage } from './donationsPage'
import { contactPage } from './contactPage'
import { ministriesPage } from './ministriesPage'
import { membershipPage } from './membershipPage'
import { galleryPage } from './galleryPage'

import { ministry } from './ministry'
import { sermon } from './sermon'
import { event } from './event'
import { post } from './post'
import { galleryItem } from './galleryItem'
import { heroSlide } from './heroSlide'
import { testimony } from './testimony'
import { menuItem } from './menuItem'

import { seo } from './objects/seo'
import { richText } from './objects/richText'
import { link } from './objects/link'

export const schemaTypes: SchemaTypeDefinition[] = [
	// Singletons
	siteSettings,
	homePage,
	aboutPage,
	serviceTimesPage,
	donationsPage,
	contactPage,
	ministriesPage,
	membershipPage,
	galleryPage,

	// Collections
	ministry,
	sermon,
	event,
	post,
	galleryItem,
	heroSlide,
	testimony,
	menuItem,

	// Objects
	seo,
	richText,
	link,
]

