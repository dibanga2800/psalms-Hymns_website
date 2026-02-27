import { useSanityQuery } from '@/hooks/useSanityQuery'
import { SERVICE_TIMES_PAGE_QUERY } from '@/lib/sanity/queries'
import type { ServiceTimesPage } from '@/lib/types'

export const useServiceTimesPage = () => {
	return useSanityQuery<ServiceTimesPage>(
		['serviceTimesPage'],
		SERVICE_TIMES_PAGE_QUERY,
	)
}

