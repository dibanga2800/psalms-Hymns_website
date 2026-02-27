import { useSanityQuery } from '@/hooks/useSanityQuery'
import { EVENT_DETAIL_QUERY, EVENTS_LIST_QUERY } from '@/lib/sanity/queries'
import type { EventDetail, EventSummary } from '@/lib/types'

export const useEvents = () => {
	return useSanityQuery<EventSummary[]>(['events'], EVENTS_LIST_QUERY)
}

export const useEventDetail = (slug?: string) => {
	return useSanityQuery<EventDetail | null>(['event', { slug }], EVENT_DETAIL_QUERY, {
		slug,
	})
}

