import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { fetchSanity } from '@/lib/sanity/client'

type Key = (string | Record<string, unknown>)[]

export const useSanityQuery = <TData>(
	key: Key,
	query: string,
	params?: Record<string, unknown>,
): UseQueryResult<TData> => {
	return useQuery<TData>({
		queryKey: ['sanity', ...key],
		queryFn: () => fetchSanity<TData>(query, params),
	})
}

