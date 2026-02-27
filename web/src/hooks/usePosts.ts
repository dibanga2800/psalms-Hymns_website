import { useSanityQuery } from '@/hooks/useSanityQuery'
import { POSTS_LIST_QUERY } from '@/lib/sanity/queries'
import type { PostSummary } from '@/lib/types'

export const usePosts = () => {
	return useSanityQuery<PostSummary[]>(['posts'], POSTS_LIST_QUERY)
}

