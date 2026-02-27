import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-01-01'
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

if (!projectId || !dataset) {
	console.warn(
		'[sanity] VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET is not set. The site will show static fallbacks until Sanity is configured.',
	)
}

export const sanityClient =
	projectId && dataset
		? createClient({
				projectId,
				dataset,
				apiVersion,
				useCdn,
			})
		: null

export const isSanityConfigured = Boolean(sanityClient)

export const fetchSanity = async <T>(
	query: string,
	params?: Record<string, unknown>,
): Promise<T> => {
	if (!sanityClient) {
		throw new Error('Sanity is not configured.')
	}

	if (params) {
		return sanityClient.fetch<T>(query, params)
	}

	return sanityClient.fetch<T>(query)
}

