import { Link } from 'react-router-dom'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useSermons } from '@/hooks/useSermons'

export const Sermons = () => {
	const { data, isLoading, isError } = useSermons()

	return (
		<div className='space-y-8'>
			<section className='space-y-3'>
				<h1 className='text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>Sermons</h1>
				<p className='max-w-2xl text-slate-600 sm:text-base'>
					Browse recent messages from Psalms &amp; Hymns parish.
				</p>
			</section>
			<section className='space-y-4'>
				{isLoading && <LoadingSpinner />}
				{isError && (
					<ErrorState message='Unable to load sermons from Sanity; please try again later.' />
				)}
				{!isLoading && !isError && (
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{data?.map((sermon) => (
							<Link
								key={sermon._id}
								to={`/sermons/${sermon.slug}`}
								className='group rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm transition hover:border-rccg-red/50 hover:shadow-md'
							>
								<p className='text-xs text-slate-500'>
									{sermon.date ?? 'Date tbc'}
								</p>
								<h2 className='mt-1 text-base font-semibold text-slate-800 group-hover:text-rccg-red'>
									{sermon.title ?? 'Untitled message'}
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									{sermon.preacher ?? 'Psalms &amp; Hymns Pastor'}
								</p>
								{sermon.description && (
									<p className='mt-2 line-clamp-3 text-xs text-slate-600'>
										{sermon.description}
									</p>
								)}
							</Link>
						))}
						{data && data.length === 0 && (
							<p className='text-sm text-slate-600'>
								No sermons have been published yet. Add sermons in Sanity to see
								them listed here.
							</p>
						)}
					</div>
				)}
			</section>
		</div>
	)
}

