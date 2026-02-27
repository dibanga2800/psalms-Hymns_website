import { useSanityQuery } from '@/hooks/useSanityQuery'
import { POST_DETAIL_QUERY } from '@/lib/sanity/queries'
import type { PostDetail } from '@/lib/types'

export const usePostDetail = (slug: string | undefined) => {
	return useSanityQuery<PostDetail | null>(
		['post', { slug }],
		POST_DETAIL_QUERY,
		slug ? { slug } : undefined,
	)
}

