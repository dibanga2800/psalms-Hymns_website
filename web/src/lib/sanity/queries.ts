export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0]{
  title,
  tagline,
  address,
  primaryPhone,
  secondaryPhone,
  email,
  "headerMenu": headerMenu[]->{
    label,
    path,
    order
  },
  "footerMenu": footerMenu[]->{
    label,
    path,
    order
  }
}
`

export const HOME_PAGE_QUERY = `
*[_type == "homePage"][0]{
  showHeroSection,
  showWelcomeSection,
  showProphecySection,
  showUpcomingEventsSection,
  showLatestPostsSection,
  showGallerySection,
  showYoutubeSection,
  title,
  welcomeTitle,
  "welcomeMessageText": coalesce(welcomeMessage, ""),
  "welcomeImageUrl": welcomeImage.asset->url,
  heroHeading,
  heroSubheading,
  watchWord,
  featureCards[]{
    title,
    description,
    icon
  },
  "heroSlides": heroSlides[]->{
    _id,
    monthLabel,
    title,
    subtitle,
    ctaText,
    ctaUrl,
    accentColor,
    "imageUrl": image.asset->url,
    order,
    active
  },
  "prophecyImageUrl": prophecyImage.asset->url,
  prophecyCaption,
  "upcomingEvents": select(
    count(upcomingEvents) > 0 => upcomingEvents[]->{
      _id,
      title,
      "slug": slug.current,
      startDate,
      endDate,
      location,
      category,
      excerpt,
      "bannerImageUrl": bannerImage.asset->url
    },
    *[_type == "event" && startDate >= now() && (showOnHomepage == true || !defined(showOnHomepage))] | order(startDate asc)[0...4]{
      _id,
      title,
      "slug": slug.current,
      startDate,
      endDate,
      location,
      category,
      excerpt,
      "bannerImageUrl": bannerImage.asset->url
    }
  ),
  "homepageGalleryItems": homepageGalleryItems[]->{
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    caption,
    category,
    date
  },
  "youtubeLinks": youtubeLinks[]{
    label,
    href,
    isExternal
  },
  "highlightedPosts": select(
    count(highlightedPosts) > 0 => highlightedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      date,
      author,
      category,
      excerpt,
      "heroImageUrl": heroImage.asset->url
    },
    *[_type == "post"] | order(date desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      date,
      author,
      category,
      excerpt,
      "heroImageUrl": heroImage.asset->url
    }
  ),
  "highlightedSermon": highlightedSermon->{
    _id,
    title,
    date,
    preacher,
    coverImage
  }
}
`

export const POSTS_LIST_QUERY = `
*[_type == "post"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  date,
  author,
  category,
  excerpt,
  "heroImageUrl": heroImage.asset->url
}
`

export const POST_DETAIL_QUERY = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  author,
  category,
  excerpt,
  "heroImageUrl": heroImage.asset->url,
  body
}
`

export const UPCOMING_EVENTS_QUERY = `
*[_type == "event" && startDate >= now()] | order(startDate asc)[0...4]{
  _id,
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  category,
  excerpt,
  "bannerImageUrl": bannerImage.asset->url
}
`

export const EVENTS_LIST_QUERY = `
*[_type == "event"] | order(startDate desc){
  _id,
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  category,
  excerpt,
  "bannerImageUrl": bannerImage.asset->url
}
`

export const EVENT_DETAIL_QUERY = `
*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  category,
  excerpt,
  "bannerImageUrl": bannerImage.asset->url,
  registrationLink
}
`

export const SERMONS_LIST_QUERY = `
*[_type == "sermon"] | order(date desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  date,
  preacher,
  description,
  coverImage
}
`

export const SERMON_DETAIL_QUERY = `
*[_type == "sermon" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  preacher,
  description,
  coverImage
}
`

export const SERVICE_TIMES_PAGE_QUERY = `
*[_type == "serviceTimesPage"][0]{
  title,
  subtitle,
  "heroImageUrl": heroImage.asset->url,
  services[]{
    name,
    description,
    day,
    time,
    isThanksgiving
  }
}
`

export const GALLERY_ITEMS_QUERY = `
*[_type == "galleryItem"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  caption,
  category,
  date
}
`

