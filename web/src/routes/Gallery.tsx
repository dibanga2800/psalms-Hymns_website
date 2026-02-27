import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useGallery } from '@/hooks/useGallery'

export const Gallery = () => {
	const { data: items = [], isLoading, isError } = useGallery()

	return (
		<div className='space-y-8'>
			<section className='space-y-3'>
				<h1 className='text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
					Gallery
				</h1>
				<p className='max-w-2xl text-slate-600 sm:text-base'>
					Photo highlights from services, conferences, and special moments at
					Psalms &amp; Hymns Parish. Images and captions are managed in Sanity so
					they stay up to date.
				</p>
				{isError && (
					<ErrorState message='We were unable to load gallery items. Please try again shortly.' />
				)}
			</section>

			<section className='space-y-4'>
				{isLoading && <LoadingSpinner />}

				{!isLoading && items.length === 0 && !isError && (
					<p className='text-sm text-slate-600'>
						There are no gallery items yet. Once photos are added in Sanity,
						they will appear here automatically.
					</p>
				)}

				{items.length > 0 && (
					<div
						className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
						aria-label='Gallery images'
					>
						{items.map((item) => (
							<figure
								key={item._id}
								className='group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
							>
								{item.imageUrl ? (
									<img
										src={item.imageUrl}
										alt={item.caption ?? item.title ?? 'Gallery image'}
										className='aspect-video w-full object-cover transition duration-500 group-hover:scale-105'
									/>
								) : (
									<div
										className='aspect-video w-full bg-slate-100'
										aria-hidden
									/>
								)}
								{(item.title || item.caption || item.date) && (
									<figcaption className='space-y-1 px-4 py-3'>
										{item.title && (
											<p className='text-sm font-semibold text-slate-900'>
												{item.title}
											</p>
										)}
										{item.caption && (
											<p className='text-xs leading-relaxed text-slate-600'>
												{item.caption}
											</p>
										)}
										{item.date && (
											<p className='text-[11px] text-slate-400'>
												{new Date(item.date).toLocaleDateString('en-GB', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</p>
										)}
									</figcaption>
								)}
							</figure>
						))}
					</div>
				)}
			</section>
		</div>
	)
}

