import { Link } from 'react-router-dom'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useSermons } from '@/hooks/useSermons'
import { PageSEO } from '@/components/common/PageSEO'

export const Sermons = () => {
	const { data, isLoading, isError } = useSermons()

	return (
		<div className='space-y-10'>
			<PageSEO
				title='Sermons'
				description='Listen to and browse sermons from RCCG Psalms & Hymns Parish in Stoke-on-Trent. Gospel preaching, Bible teaching, and inspiring messages for every believer.'
				path='/sermons'
				keywords='sermons Stoke-on-Trent, church sermons online Cobridge, RCCG sermons, Gospel preaching Stoke-on-Trent, Bible messages RCCG Psalms Hymns, Christian sermons Staffordshire'
			/>
			<section className='space-y-4'>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl'>Sermons</h1>
				<p className='max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
					Browse recent messages from Psalms &amp; Hymns Parish.
				</p>
			</section>
			<section className='space-y-4'>
				{isLoading && <LoadingSpinner />}
				{isError && (
					<ErrorState message='Unable to load sermons from Sanity; please try again later.' />
				)}
				{!isLoading && !isError && (
					<div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
						{data?.map((sermon) => (
							<Link
								key={sermon._id}
								to={`/sermons/${sermon.slug}`}
								className='group rounded-xl border border-slate-200 bg-white p-5 no-underline shadow-sm transition hover:border-rccg-red/50 hover:shadow-md'
							>
								<p className='text-sm text-slate-500'>
									{sermon.date ?? 'Date tbc'}
								</p>
								<h2 className='mt-1.5 text-lg font-semibold text-slate-800 group-hover:text-rccg-red'>
									{sermon.title ?? 'Untitled message'}
								</h2>
								<p className='mt-1 text-sm text-slate-500'>
									{sermon.preacher ?? 'Psalms & Hymns Pastor'}
								</p>
								{sermon.description && (
									<p className='mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600'>
										{sermon.description}
									</p>
								)}
							</Link>
						))}
						{data && data.length === 0 && (
							<p className='text-base text-slate-600'>
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
