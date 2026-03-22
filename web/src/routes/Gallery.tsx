import { useState } from 'react'
import { ImageIcon, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { PageSEO } from '@/components/common/PageSEO'
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox'
import { useGallery } from '@/hooks/useGallery'
import type { GalleryItemSummary } from '@/lib/types'

export const Gallery = () => {
	const { data: items = [], isLoading, isError } = useGallery()
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	return (
		<div className='space-y-16 sm:space-y-24'>
			<PageSEO
				title='Gallery'
				description='Photo gallery from RCCG Psalms & Hymns Parish — worship services, conferences, fellowships and special moments in Cobridge, Stoke-on-Trent.'
				path='/gallery'
				keywords='church gallery Stoke-on-Trent, RCCG Psalms Hymns photos, church photos Cobridge, worship service photos Staffordshire'
			/>

			{/* HERO — redesigned with decorative graphics */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-maroon text-white shadow-xl'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl' />
					<div className='absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/10' style={{ width: 'min(90vw, 480px)' }} />
				</div>
				<div className='pointer-events-none absolute bottom-0 right-0 flex items-end justify-end opacity-20 sm:opacity-25'>
					<ImageIcon className='h-48 w-48 text-white sm:h-64 sm:w-64' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24'>
					<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rccg-gold/20 shadow-lg'>
						<ImageIcon className='h-7 w-7 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Photo Highlights
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
						Our Gallery
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg'>
						Moments from worship services, conferences, fellowships and special
						occasions at Psalms &amp; Hymns Parish.
					</p>
				</div>
			</section>

			{/* GALLERY GRID */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						Moments That Matter
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						Life at Psalms &amp; Hymns
					</h2>
					<p className='mx-auto mt-3 max-w-xl text-base text-slate-500'>
						Services, events, and community — captured for you to enjoy.
					</p>
				</div>

				{isError && (
					<ErrorState message='We were unable to load gallery items. Please try again shortly.' />
				)}

				{isLoading && (
					<div className='flex justify-center py-16'>
						<LoadingSpinner />
					</div>
				)}

				{!isLoading && items.length === 0 && !isError && (
					<div className='flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 text-center'>
						<span className='flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200/80'>
							<ImageIcon className='h-10 w-10 text-slate-400' aria-hidden />
						</span>
						<p className='text-lg font-semibold text-slate-600'>
							No gallery items yet
						</p>
						<p className='max-w-md text-base text-slate-500'>
							Once photos are added in Sanity, they will appear here automatically.
						</p>
					</div>
				)}

				{items.length > 0 && (
					<>
						<div
							className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
							aria-label='Gallery images'
						>
							{items.map((item, index) => (
								<GalleryCard
									key={item._id}
									item={item}
									onOpen={() => setLightboxIndex(index)}
								/>
							))}
						</div>
						<GalleryLightbox
							items={items}
							openIndex={lightboxIndex}
							onNavigate={setLightboxIndex}
							onClose={() => setLightboxIndex(null)}
						/>
					</>
				)}
			</section>

			{/* CTA */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
						Be Part of the Next Photo
					</h2>
					<p className='mx-auto mt-3 max-w-lg text-base text-slate-300 sm:text-lg'>
						Join us for a service or event — we would love to see you there.
					</p>
					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link
							to='/service-times'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400 hover:shadow-amber-500/30'
						>
							<Calendar className='h-4.5 w-4.5' aria-hidden />
							Service Times
						</Link>
						<Link
							to='/events'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							View Events
							<ArrowRight className='h-4.5 w-4.5' aria-hidden />
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

const GalleryCard = ({
	item,
	onOpen,
}: {
	item: GalleryItemSummary
	onOpen: () => void
}) => {
	const label = item.caption ?? item.title ?? 'Open gallery image'

	return (
		<figure className='group relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300/80'>
			<div className='relative aspect-video overflow-hidden bg-slate-100'>
				{item.imageUrl ? (
					<img
						src={item.imageUrl}
						alt=''
						loading='lazy'
						decoding='async'
						className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
					/>
				) : (
					<div className='flex h-full items-center justify-center' aria-hidden>
						<ImageIcon
							className='h-16 w-16 text-slate-300'
							strokeWidth={1.5}
							aria-hidden
						/>
					</div>
				)}
				<div
					className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'
					aria-hidden
				/>
			</div>
			{(item.title || item.caption || item.date) && (
				<figcaption className='pointer-events-none space-y-2 px-5 py-4'>
					{item.title && (
						<p className='text-base font-bold text-slate-900 sm:text-lg'>
							{item.title}
						</p>
					)}
					{item.caption && (
						<p className='text-sm leading-relaxed text-slate-600'>
							{item.caption}
						</p>
					)}
					{item.date && (
						<p className='flex items-center gap-1.5 text-sm text-slate-400'>
							<Calendar className='h-4 w-4 shrink-0 text-rccg-red/60' aria-hidden />
							{new Date(item.date).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</p>
					)}
				</figcaption>
			)}
			<button
				type='button'
				onClick={onOpen}
				className='absolute inset-0 z-[1] cursor-pointer rounded-2xl bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rccg-red'
				aria-label={label}
			/>
		</figure>
	)
}
