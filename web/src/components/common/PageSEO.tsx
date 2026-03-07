import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'RCCG Psalms & Hymns Parish'
const SITE_URL = 'https://rccgpsalmshymns.org.uk'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

const BASE_KEYWORDS =
	'RCCG Psalms and Hymns Parish Stoke-on-Trent, Redeemed Christian Church of God Cobridge, RCCG Church in Stoke-on-Trent, Christian Church Cobridge Stoke-on-Trent, Pentecostal Church Stoke-on-Trent, Redeemed Christian Church of God Stoke-on-Trent, Church near Emery Street Stoke-on-Trent, Bible believing church Stoke-on-Trent, Sunday worship service Stoke-on-Trent, Christian fellowship Cobridge, African church Stoke-on-Trent, Prayer and worship church Stoke-on-Trent, Holy Ghost service RCCG Stoke-on-Trent, Family friendly church Stoke-on-Trent, Gospel preaching church Cobridge, Worship and praise church Stoke-on-Trent, Redeemed Christian Church near me Stoke-on-Trent, Midweek service RCCG Stoke-on-Trent, Christian community church Cobridge, RCCG parish in Staffordshire'

interface PageSEOProps {
	title: string
	description: string
	path?: string
	keywords?: string
	ogImage?: string
}

export const PageSEO = ({
	title,
	description,
	path = '',
	keywords,
	ogImage = DEFAULT_OG_IMAGE,
}: PageSEOProps) => {
	const fullTitle = `${title} | ${SITE_NAME}`
	const canonical = `${SITE_URL}${path}`
	const combinedKeywords = keywords
		? `${keywords}, ${BASE_KEYWORDS}`
		: BASE_KEYWORDS

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={combinedKeywords} />
			<link rel='canonical' href={canonical} />

			{/* Open Graph */}
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={description} />
			<meta property='og:url' content={canonical} />
			<meta property='og:image' content={ogImage} />
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content={SITE_NAME} />

			{/* Twitter / X */}
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={ogImage} />
			<meta name='twitter:card' content='summary_large_image' />
		</Helmet>
	)
}
