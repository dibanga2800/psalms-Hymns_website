import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import type { GalleryItemSummary } from '@/lib/types'

export interface GalleryLightboxProps {
	items: GalleryItemSummary[]
	openIndex: number | null
	onNavigate: (index: number) => void
	onClose: () => void
}

export const GalleryLightbox = ({
	items,
	openIndex,
	onNavigate,
	onClose,
}: GalleryLightboxProps) => {
	const isOpen = openIndex !== null && items.length > 0
	const activeIndex = openIndex ?? 0
	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const thumbStripRef = useRef<HTMLDivElement>(null)
	const thumbButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
	const [mainImageLoaded, setMainImageLoaded] = useState(false)

	const current = items[activeIndex]
	const imageUrl = current?.imageUrl

	const goPrev = useCallback(() => {
		if (items.length <= 1) return
		onNavigate((activeIndex - 1 + items.length) % items.length)
	}, [activeIndex, items.length, onNavigate])

	const goNext = useCallback(() => {
		if (items.length <= 1) return
		onNavigate((activeIndex + 1) % items.length)
	}, [activeIndex, items.length, onNavigate])

	useEffect(() => {
		setMainImageLoaded(false)
	}, [activeIndex, imageUrl])

	useEffect(() => {
		if (!isOpen) return
		const strip = thumbStripRef.current
		const thumb = thumbButtonRefs.current[activeIndex]
		if (!strip || !thumb) return
		const target =
			thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2
		strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
	}, [activeIndex, isOpen])

	useEffect(() => {
		if (!isOpen) return
		closeButtonRef.current?.focus({ preventScroll: true })

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose()
				return
			}
			if (e.key === 'ArrowLeft') {
				e.preventDefault()
				goPrev()
				return
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault()
				goNext()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = prevOverflow
		}
	}, [isOpen, onClose, goPrev, goNext])

	if (!isOpen || typeof document === 'undefined') {
		return null
	}

	const alt = current?.caption ?? current?.title ?? 'Gallery image'

	return createPortal(
		<div
			className='fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-sm'
			role='dialog'
			aria-modal='true'
			aria-label='Gallery viewer'
			aria-describedby='gallery-lightbox-caption'
			onClick={onClose}
		>
			<div
				className='flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6'
				onClick={(e) => e.stopPropagation()}
			>
				<p className='min-w-0 truncate text-sm font-semibold text-white sm:text-base'>
					{current?.title ?? 'Gallery'}
					{items.length > 1 && (
						<span className='ml-2 font-normal text-white/50'>
							{activeIndex + 1} / {items.length}
						</span>
					)}
				</p>
				<button
					ref={closeButtonRef}
					type='button'
					onClick={onClose}
					className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rccg-gold'
					aria-label='Close gallery'
				>
					<X className='h-5 w-5' aria-hidden />
				</button>
			</div>

			<div className='relative flex min-h-0 flex-1 flex-col'>
				<div
					className='relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-10'
					onClick={onClose}
				>
					{items.length > 1 && (
						<button
							type='button'
							onClick={(e) => {
								e.stopPropagation()
								goPrev()
							}}
							className='absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rccg-gold sm:left-4 sm:h-12 sm:w-12'
							aria-label='Previous image'
						>
							<ChevronLeft className='h-6 w-6' aria-hidden />
						</button>
					)}

					<div
						className='relative flex max-h-[min(70vh,720px)] w-full max-w-5xl items-center justify-center'
						onClick={(e) => e.stopPropagation()}
					>
						{!imageUrl && (
							<p className='text-center text-white/60'>No image available</p>
						)}
						{imageUrl && (
							<>
								{!mainImageLoaded && (
									<div className='absolute inset-0 flex items-center justify-center'>
										<LoadingSpinner />
									</div>
								)}
								<img
									key={imageUrl}
									src={imageUrl}
									alt={alt}
									className={`max-h-[min(70vh,720px)] w-full object-contain transition-opacity duration-300 ${
										mainImageLoaded ? 'opacity-100' : 'opacity-0'
									}`}
									decoding='async'
									onLoad={() => setMainImageLoaded(true)}
								/>
							</>
						)}
					</div>

					{items.length > 1 && (
						<button
							type='button'
							onClick={(e) => {
								e.stopPropagation()
								goNext()
							}}
							className='absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rccg-gold sm:right-4 sm:h-12 sm:w-12'
							aria-label='Next image'
						>
							<ChevronRight className='h-6 w-6' aria-hidden />
						</button>
					)}
				</div>

				<div
					id='gallery-lightbox-caption'
					className='shrink-0 px-4 pb-2 text-center sm:px-6'
					onClick={(e) => e.stopPropagation()}
				>
					{current?.caption && (
						<p className='text-sm text-white/85 sm:text-base'>{current.caption}</p>
					)}
					{current?.date && (
						<p className='mt-1 flex items-center justify-center gap-1.5 text-xs text-white/50 sm:text-sm'>
							<Calendar className='h-3.5 w-3.5 shrink-0' aria-hidden />
							{new Date(current.date).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</p>
					)}
				</div>

				{items.length > 1 && (
					<nav
						ref={thumbStripRef}
						className='flex shrink-0 gap-2 overflow-x-auto overflow-y-hidden px-4 pb-4 pt-1 scroll-smooth sm:px-6'
						style={{ WebkitOverflowScrolling: 'touch' }}
						aria-label='Gallery thumbnails — scroll horizontally'
						onClick={(e) => e.stopPropagation()}
					>
						{items.map((item, index) => {
							const thumbUrl = item.imageUrl
							const selected = index === activeIndex
							return (
								<button
									key={item._id}
									ref={(el) => {
										thumbButtonRefs.current[index] = el
									}}
									type='button'
									onClick={(e) => {
										e.stopPropagation()
										onNavigate(index)
									}}
									className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-32 ${
										selected
											? 'border-rccg-gold ring-2 ring-rccg-gold/40'
											: 'border-transparent opacity-70 hover:opacity-100'
									}`}
									aria-label={`View image ${index + 1} of ${items.length}`}
								>
									{thumbUrl ? (
										<img
											src={thumbUrl}
											alt=''
											className='h-full w-full object-cover'
											loading='lazy'
											decoding='async'
										/>
									) : (
										<div className='flex h-full w-full items-center justify-center bg-slate-800 text-xs text-white/40'>
											—
										</div>
									)}
								</button>
							)
						})}
					</nav>
				)}
			</div>
		</div>,
		document.body,
	)
}
