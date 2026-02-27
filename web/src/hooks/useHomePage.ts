import { useSanityQuery } from '@/hooks/useSanityQuery'
import { HOME_PAGE_QUERY } from '@/lib/sanity/queries'
import type { HomePage } from '@/lib/types'

export const useHomePage = () => {
	return useSanityQuery<HomePage>(['homePage'], HOME_PAGE_QUERY)
}

