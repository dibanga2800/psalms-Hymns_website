import { useSanityQuery } from '@/hooks/useSanityQuery'
import { GALLERY_ITEMS_QUERY } from '@/lib/sanity/queries'
import type { GalleryItemSummary } from '@/lib/types'

export const useGallery = () => {
	return useSanityQuery<GalleryItemSummary[]>(['galleryItems'], GALLERY_ITEMS_QUERY)
}

