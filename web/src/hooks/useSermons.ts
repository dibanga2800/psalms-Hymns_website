import { useSanityQuery } from '@/hooks/useSanityQuery'
import { SERMONS_LIST_QUERY } from '@/lib/sanity/queries'
import type { SermonSummary } from '@/lib/types'

export const useSermons = () => {
	return useSanityQuery<SermonSummary[]>(['sermons'], SERMONS_LIST_QUERY)
}

