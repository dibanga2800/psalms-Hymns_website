import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
	ArrowRight,
	Banknote,
	BookOpen,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Clock,
	Cross,
	Heart,
	ImageIcon,
	MapPin,
	Mic2,
	Pause,
	Play,
	Users,
} from 'lucide-react'

import { useHomePage } from '@/hooks/useHomePage'
import type {
	EventSummary,
	GalleryItemSummary,
	HomeHeroSlide,
	PostSummary,
	SanityLink,
} from '@/lib/types'

interface LocalHomeSlide {
	id: number
	month: string
	title: string
	scripture: string
	subtitle: string
}

interface FeatureCard {
	icon: LucideIcon
	title: string
	description: string
	href: string
	linkText: string
	borderColor: string
	iconColor: string
	iconBg: string
}

interface ValuePillar {
	icon: LucideIcon
	label: string
}

const localSlides: LocalHomeSlide[] = [
	{
		id: 1,
		month: 'February 2026',
		title: 'My Month of Rejoicing',
		scripture: '"Rejoice in the Lord always." – Philippians 4:4',
		subtitle: 'Monthly theme – replace from Sanity when ready.',
	},
	{
		id: 2,
		month: 'Placeholder Month',
		title: 'My Month of Victory',
		scripture: '"Thanks be to God, who gives us the victory…" – 1 Cor 15:57',
		subtitle: 'Use this slide for a second monthly theme.',
	},
	{
		id: 3,
		month: 'Placeholder Month',
		title: 'My Month of Restoration',
		scripture: '"I will restore to you the years…" – Joel 2:25',
		subtitle: 'Use this slide for another seasonal emphasis.',
	},
	{
		id: 4,
		month: 'Placeholder Month',
		title: 'My Month of Breakthrough',
		scripture: '"Is anything too hard for the LORD?" – Genesis 18:14',
		subtitle: 'Update copy, colours and imagery from Sanity later.',
	},
	{
		id: 5,
		month: 'Placeholder Month',
		title: 'My Month of Divine Help',
		scripture: '"God is our refuge and strength…" – Psalm 46:1',
		subtitle: 'Fifth slide – content fully CMS-driven in future.',
	},
]

const featureCards: FeatureCard[] = [
	{
		icon: Clock,
		title: 'Service Times',
		description: 'Sundays 3:00 pm – 5:00 pm',
		href: '/service-times',
		linkText: 'View schedule',
		borderColor: 'border-rose-500',
		iconColor: 'text-rose-600',
		iconBg: 'bg-rose-50',
	},
	{
		icon: Heart,
		title: 'Prayer Request',
		description: 'Let our prayer team stand with you in faith.',
		href: '/contact',
		linkText: 'Send request',
		borderColor: 'border-violet-500',
		iconColor: 'text-violet-600',
		iconBg: 'bg-violet-50',
	},
	{
		icon: Users,
		title: 'Ministries',
		description: 'Serve, connect, and grow with fellow believers.',
		href: '/ministries',
		linkText: 'Explore',
		borderColor: 'border-emerald-500',
		iconColor: 'text-emerald-600',
		iconBg: 'bg-emerald-50',
	},
	{
		icon: Banknote,
		title: 'Give & Support',
		description: 'Support the work of ministry and building projects.',
		href: '/donations',
		linkText: 'Give now',
		borderColor: 'border-amber-500',
		iconColor: 'text-amber-600',
		iconBg: 'bg-amber-50',
	},
]

const valuePillars: ValuePillar[] = [
	{ icon: BookOpen, label: 'Sound Teaching' },
	{ icon: Mic2, label: 'Passionate Worship' },
	{ icon: Heart, label: 'Fervent Prayer' },
	{ icon: Users, label: 'Community Love' },
	{ icon: Cross, label: 'Gospel Mission' },
]

const ministries = [
	{
		name: "Men's Fellowship",
		description: 'Men committed to leading in faith, family and purpose.',
		imageUrl: '/men fellowship.png',
		href: '/ministries',
	},
	{
		name: "Women's Fellowship",
		description: 'Daughters of Zion growing in the Word and godly fellowship.',
		imageUrl: '/women fellowship.png',
		href: '/ministries',
	},
	{
		name: 'Choir & Instrumentalists',
		description: 'Voices and instruments lifting praise to God.',
		imageUrl: '/choir.png',
		href: '/ministries',
	},
	{
		name: 'Youth Ministry',
		description: 'Young people discovering their full God-given potential.',
		imageUrl: '/youth ministry.png',
		href: '/ministries',
	},
]

const SLIDE_INTERVAL_MS = 7000
const TRANSITION_DURATION_MS = 800

export const Home = () => {
	const { data, isLoading, isError } = useHomePage()

	const [activeIndex, setActiveIndex] = useState(0)
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const [isPaused, setIsPaused] = useState(false)
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const heroSlidesFromCms: (HomeHeroSlide | null | undefined)[] = data?.heroSlides ?? []
	const activeHeroSlides: HomeHeroSlide[] = heroSlidesFromCms.filter(
		(slide): slide is HomeHeroSlide => !!slide && !!slide.imageUrl && (slide.active ?? true),
	)

	const totalSlides = activeHeroSlides.length > 0 ? activeHeroSlides.length : localSlides.length
	const hasCmsSlides = activeHeroSlides.length > 0

	const getSlideData = (index: number) => {
		if (hasCmsSlides) {
			const cms = activeHeroSlides[index % activeHeroSlides.length]
			return {
				month: cms?.monthLabel ?? '',
				title: cms?.title ?? '',
				scripture: cms?.subtitle ?? '',
				imageUrl: cms?.imageUrl,
			}
		}
		const local = localSlides[index % localSlides.length]
		return {
			month: local.month,
			title: local.title,
			scripture: local.scripture,
			imageUrl: undefined,
		}
	}

	const goToSlide = useCallback(
		(nextIndex: number) => {
			if (nextIndex === activeIndex) return
			setPrevIndex(activeIndex)
			setActiveIndex(nextIndex)
			setTimeout(() => setPrevIndex(null), TRANSITION_DURATION_MS)
		},
		[activeIndex],
	)

	const startTimer = useCallback(() => {
		if (totalSlides <= 1 || isPaused) return
		if (timerRef.current) clearInterval(timerRef.current)
		timerRef.current = setInterval(() => {
			setActiveIndex((prev) => {
				const next = (prev + 1) % totalSlides
				setPrevIndex(prev)
				setTimeout(() => setPrevIndex(null), TRANSITION_DURATION_MS)
				return next
			})
		}, SLIDE_INTERVAL_MS)
	}, [totalSlides, isPaused])

	useEffect(() => {
		startTimer()
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [startTimer])

	const handleNext = () => {
		goToSlide((activeIndex + 1) % totalSlides)
		startTimer()
	}

	const handlePrev = () => {
		goToSlide((activeIndex - 1 + totalSlides) % totalSlides)
		startTimer()
	}

	const handleDotClick = (index: number) => {
		goToSlide(index)
		startTimer()
	}

	const togglePause = () => {
		setIsPaused((prev) => !prev)
		if (!isPaused && timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}

	const heading = data?.heroHeading ?? 'Hope in Christ. Hope for All.'
	const currentSlide = getSlideData(activeIndex)
	const events: EventSummary[] = data?.upcomingEvents ?? []
	const posts: PostSummary[] = data?.highlightedPosts ?? []
	const galleryItems: GalleryItemSummary[] = data?.homepageGalleryItems ?? []
	const youtubeLinks: SanityLink[] = data?.youtubeLinks ?? []

	const showHero = data?.showHeroSection ?? true
	const showWelcome = data?.showWelcomeSection ?? true
	const showEvents = data?.showUpcomingEventsSection ?? true
	const showPosts = data?.showLatestPostsSection ?? true
	const showGallery = data?.showGallerySection ?? true
	const showYoutube = data?.showYoutubeSection ?? true

	const welcomeTitle = data?.welcomeTitle ?? 'Welcome to Psalms & Hymns Parish'
	const welcomeMessage =
		data?.welcomeMessageText ??
		"Psalms & Hymns Parish is a parish of the Redeemed Christian Church of God (RCCG). We are a church for everyone, irrespective of race, class, age, gender and background. Since our inception we have continually benefited from God's unending favour and grace."
	const welcomeImageUrl = data?.welcomeImageUrl ?? '/pstor.jpeg'

	const getYouTubeEmbedUrl = (url?: string) => {
		if (!url) return null
		try {
			const parsed = new URL(url)
			const host = parsed.hostname.toLowerCase()
			if (host.includes('youtu.be')) {
				const id = parsed.pathname.replace('/', '')
				return id ? `https://www.youtube.com/embed/${id}` : null
			}
			if (host.includes('youtube.com')) {
				const id = parsed.searchParams.get('v')
				if (id) return `https://www.youtube.com/embed/${id}`
				if (parsed.pathname.startsWith('/embed/')) return parsed.toString()
			}
			return null
		} catch {
			return null
		}
	}

	const fullBleed = 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen'
	const negateTopPadding = '-mt-6 sm:-mt-8 lg:-mt-10'

	const sectionEyebrow = 'text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'
	const sectionHeading = 'mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl'

	return (
		<div>

			{/* ═══════════════════════════════════════════════
			    HERO SLIDER
			    ═══════════════════════════════════════════════ */}
			{showHero && (
				<section
					className={`${fullBleed} ${negateTopPadding} overflow-hidden bg-rccg-ink`}
					aria-label='Hero'
				>
					{/* Background image layers */}
					{totalSlides > 0 &&
						Array.from({ length: totalSlides }).map((_, i) => {
							const slide = getSlideData(i)
							const imgUrl = slide.imageUrl ?? `/images/hero-placeholder-${(i % 3) + 1}.jpg`
							const isActive = i === activeIndex
							const isLeaving = i === prevIndex
							return (
								<div
									key={hasCmsSlides ? activeHeroSlides[i]?._id ?? i : i}
									className={`absolute inset-0 bg-cover bg-center transition-opacity ${
										isActive
											? 'opacity-100 duration-[1200ms]'
											: isLeaving
											? 'opacity-0 duration-[1200ms]'
											: 'opacity-0 duration-0'
									}`}
									style={{
										backgroundImage: `url('${imgUrl}')`,
										transform: isActive ? 'scale(1.04)' : 'scale(1)',
										transition: `opacity ${TRANSITION_DURATION_MS}ms ease, transform 8s ease-out`,
									}}
									aria-hidden={!isActive}
								/>
							)
						})}

					{/* Gradient overlays */}
					<div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-rccg-ink/90 via-rccg-ink/50 to-rccg-ink/10' />
					<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-rccg-ink/70 via-transparent to-transparent' />

					{/* Hero content */}
					<div className='relative z-10 flex min-h-[72vh] flex-col justify-center'>
						<div className='container'>
							<div className='max-w-2xl space-y-6'>
								{currentSlide.month && (
									<span className='inline-flex items-center gap-2 rounded-full bg-rccg-red/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white shadow-sm'>
										{currentSlide.month}
									</span>
								)}
								<h1
									className='text-4xl font-extrabold leading-[1.08] text-white drop-shadow-sm sm:text-5xl md:text-[3.75rem]'
									aria-live='polite'
								>
									{currentSlide.title}
								</h1>
								{currentSlide.scripture && (
									<p className='max-w-xl border-l-[3px] border-rccg-gold pl-4 text-sm italic leading-relaxed text-white/85 sm:text-base'>
										{currentSlide.scripture}
									</p>
								)}
								<p className='max-w-lg text-sm leading-relaxed text-white/60 sm:text-[15px]'>
									{heading}
								</p>
								<div className='flex flex-wrap gap-3 pt-2'>
									<Link
										to='/service-times'
										className='inline-flex items-center gap-2 rounded-full bg-rccg-red px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-rccg-maroon hover:shadow-xl'
									>
										Plan Your Visit
										<ArrowRight className='h-4 w-4' aria-hidden />
									</Link>
									<Link
										to='/contact'
										className='inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20'
									>
										Request Prayer
									</Link>
								</div>
								{isLoading && <p className='text-xs text-white/40'>Loading…</p>}
								{isError && (
									<p className='text-xs text-amber-300/80'>
										Unable to load live content — showing defaults.
									</p>
								)}
							</div>

							{/* Slide controls */}
							{totalSlides > 1 && (
								<div className='mt-14 flex items-center justify-between'>
									<div className='flex items-center gap-3'>
										{Array.from({ length: totalSlides }).map((_, i) => (
											<button
												key={i}
												type='button'
												onClick={() => handleDotClick(i)}
												className={`h-0.5 rounded-full transition-all duration-500 ${
													i === activeIndex
														? 'w-10 bg-rccg-gold'
														: 'w-5 bg-white/25 hover:bg-white/50'
												}`}
												aria-label={`Go to slide ${i + 1}`}
												aria-current={i === activeIndex ? 'true' : undefined}
											/>
										))}
										<span className='ml-2 text-[11px] font-medium tabular-nums text-white/35'>
											{String(activeIndex + 1).padStart(2, '0')} /{' '}
											{String(totalSlides).padStart(2, '0')}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<button
											type='button'
											onClick={togglePause}
											className='flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/50 hover:text-white'
											aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
										>
											{isPaused ? (
												<Play className='h-3.5 w-3.5' aria-hidden />
											) : (
												<Pause className='h-3.5 w-3.5' aria-hidden />
											)}
										</button>
										<button
											type='button'
											onClick={handlePrev}
											className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/15'
											aria-label='Previous slide'
										>
											<ChevronLeft className='h-4 w-4' aria-hidden />
										</button>
										<button
											type='button'
											onClick={handleNext}
											className='flex h-10 w-10 items-center justify-center rounded-full bg-rccg-gold text-white transition hover:bg-accent-600'
											aria-label='Next slide'
										>
											<ChevronRight className='h-4 w-4' aria-hidden />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* ═══════════════════════════════════════════════
			    QUICK LINKS STRIP
			    ═══════════════════════════════════════════════ */}
			{showHero && (
				<section
					className={`${fullBleed} bg-white shadow-md`}
					aria-label='Quick links'
				>
					<div className='container'>
						<div className='grid grid-cols-2 lg:grid-cols-4'>
							{featureCards.map((card) => {
								const Icon = card.icon
								return (
									<Link
										key={card.title}
										to={card.href}
										className={`group flex items-center gap-4 border-l-4 px-5 py-6 transition hover:bg-slate-50 sm:px-7 sm:py-8 ${card.borderColor}`}
									>
										<div
											className={`shrink-0 ${card.iconBg} flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105`}
										>
											<Icon className={`h-6 w-6 ${card.iconColor}`} aria-hidden />
										</div>
										<div className='min-w-0'>
											<p className='text-sm font-bold uppercase tracking-[0.16em] text-slate-800'>
												{card.title}
											</p>
											<p className='mt-1.5 text-sm leading-relaxed text-slate-600'>
												{card.description}
											</p>
											<span
												className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${card.iconColor}`}
											>
												{card.linkText}
												<ArrowRight className='h-3.5 w-3.5 transition group-hover:translate-x-0.5' aria-hidden />
											</span>
										</div>
									</Link>
								)
							})}
						</div>
					</div>
				</section>
			)}

			{/* ═══════════════════════════════════════════════
			    WELCOME / ABOUT OUR PARISH
			    ═══════════════════════════════════════════════ */}
			{showWelcome && (
				<section
					className={`${fullBleed} bg-rccg-cream py-16 sm:py-20 lg:py-28`}
					aria-labelledby='welcome-heading'
				>
					<div className='container'>
						<div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
							{/* Image side */}
							<div className='relative order-last lg:order-first'>
								<div
									className='absolute -left-4 -top-4 h-full w-full rounded-3xl bg-rccg-red/8 lg:-left-6 lg:-top-6'
									aria-hidden
								/>
								<div
									className='absolute -bottom-4 -right-4 h-2/3 w-2/3 rounded-3xl bg-rccg-gold/10 lg:-bottom-6 lg:-right-6'
									aria-hidden
								/>
								<img
									src={welcomeImageUrl}
									alt='Pastor of RCCG Psalms & Hymns Parish'
									className='relative aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-2xl'
								/>
							</div>

							{/* Text side */}
							<div className='space-y-5'>
								<p className={sectionEyebrow}>About Our Parish</p>
								<h2
									id='welcome-heading'
									className='text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]'
								>
									{welcomeTitle}
								</h2>
								<p className='text-[15px] leading-relaxed text-slate-600'>{welcomeMessage}</p>
								<p className='text-[15px] leading-relaxed text-slate-600'>
									The Redeemed Christian Church of God was established in 1952 and currently
									attracts membership of over 3.5 million people across the United Kingdom, the
									United States, Nigeria, and over 30 nations worldwide.
								</p>
								<div className='flex flex-wrap gap-3 pt-2'>
									<Link
										to='/about'
										className='inline-flex items-center gap-2 rounded-full bg-rccg-red px-7 py-3 text-sm font-bold text-white shadow transition hover:bg-rccg-maroon'
									>
										Learn more about us
										<ArrowRight className='h-4 w-4' aria-hidden />
									</Link>
									<Link
										to='/service-times'
										className='inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-rccg-red hover:text-rccg-red'
									>
										Service times
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* ═══════════════════════════════════════════════
			    OUR MISSION + UPCOMING EVENTS
			    ═══════════════════════════════════════════════ */}
			<section
				className={`${fullBleed} bg-white py-16 sm:py-20`}
				aria-label='Our mission and upcoming events'
			>
				<div className='container'>
					<div className='grid gap-10 lg:grid-cols-5 lg:gap-14'>

						{/* Mission / Who We Are */}
						<div className='lg:col-span-2'>
							<p className={sectionEyebrow}>Who We Are</p>
							<h2 className={sectionHeading}>Our Mission &amp; Vision</h2>
							<p className='mt-4 text-base leading-relaxed text-slate-600 sm:text-[17px]'>
								At Psalms &amp; Hymns Parish, our desire is to build a Christ-centred community
								where people encounter God, grow in the Word, and are equipped to impact their
								families, workplaces, and the nations.
							</p>

							{/* Value pillars */}
							<div className='mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2'>
								{valuePillars.map(({ icon: Icon, label }) => (
									<div
										key={label}
										className='flex items-center gap-3 rounded-xl border border-slate-100 bg-rccg-cream/70 px-4 py-3.5 shadow-sm'
									>
										<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rccg-red/10'>
											<Icon className='h-4 w-4 text-rccg-red' aria-hidden />
										</span>
										<span className='text-sm font-semibold text-slate-700'>{label}</span>
									</div>
								))}
							</div>

							<Link
								to='/about'
								className='mt-7 inline-flex items-center gap-2 text-base font-bold text-rccg-red transition hover:text-rccg-maroon'
							>
								Our full story
								<ArrowRight className='h-4 w-4' aria-hidden />
							</Link>
						</div>

						{/* Upcoming Events */}
						{showEvents && (
							<div className='lg:col-span-3'>
								<div className='flex items-end justify-between'>
									<div>
										<p className={sectionEyebrow}>What&apos;s Coming Up</p>
										<h2 className={sectionHeading}>Upcoming Events</h2>
									</div>
									<Link
										to='/events'
										className='hidden items-center gap-1 text-xs font-semibold text-rccg-red transition hover:text-rccg-maroon sm:inline-flex'
									>
										View all
										<ArrowRight className='h-3.5 w-3.5' aria-hidden />
									</Link>
								</div>

								<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
									{events.length > 0 ? (
										<ul className='divide-y divide-slate-100'>
											{events.map((evt) => (
												<li key={evt._id}>
													<Link
														to={`/events/${evt.slug ?? ''}`}
														className='group flex gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6'
													>
														{evt.bannerImageUrl ? (
															<img
																src={evt.bannerImageUrl}
																alt={evt.title ?? 'Event'}
																className='h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24'
															/>
														) : (
															<div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-rccg-red/6 sm:h-24 sm:w-24'>
																<Calendar className='h-7 w-7 text-rccg-red/40' aria-hidden />
															</div>
														)}
														<div className='min-w-0 flex-1'>
															<p className='font-semibold text-slate-900 group-hover:text-rccg-red sm:text-[15px]'>
																{evt.title}
															</p>
															{evt.startDate && (
																<p className='mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500'>
																	<Calendar className='h-3 w-3' aria-hidden />
																	{new Date(evt.startDate).toLocaleDateString('en-GB', {
																		weekday: 'short',
																		day: 'numeric',
																		month: 'short',
																		year: 'numeric',
																	})}
																	{evt.endDate &&
																		` – ${new Date(evt.endDate).toLocaleDateString('en-GB', {
																			day: 'numeric',
																			month: 'short',
																		})}`}
																</p>
															)}
															{evt.location && (
																<p className='mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500'>
																	<MapPin className='h-3 w-3' aria-hidden />
																	{evt.location}
																</p>
															)}
															{evt.excerpt && (
																<p className='mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500'>
																	{evt.excerpt}
																</p>
															)}
														</div>
													</Link>
												</li>
											))}
										</ul>
									) : (
										<div className='flex flex-col items-center justify-center px-6 py-14 text-center'>
											<div className='flex h-14 w-14 items-center justify-center rounded-full bg-slate-100'>
												<Calendar className='h-7 w-7 text-slate-400' aria-hidden />
											</div>
											<p className='mt-4 text-sm font-medium text-slate-600'>
												No upcoming events right now
											</p>
											<p className='mt-1 text-xs text-slate-400'>Check back soon — more are being planned.</p>
											<Link
												to='/events'
												className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rccg-red hover:text-rccg-maroon'
											>
												Browse past events →
											</Link>
										</div>
									)}

									<div className='border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6'>
										<Link
											to='/events'
											className='inline-flex items-center gap-1 text-xs font-semibold text-rccg-red transition hover:text-rccg-maroon'
										>
											View full events calendar
											<ArrowRight className='h-3.5 w-3.5' aria-hidden />
										</Link>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* ═══════════════════════════════════════════════
			    SCRIPTURE BAND
			    ═══════════════════════════════════════════════ */}
			<section
				className={`${fullBleed} bg-rccg-red py-12 sm:py-14`}
				aria-label='Scripture'
			>
				<div className='container text-center'>
					<p className='mx-auto max-w-3xl text-base font-medium italic leading-relaxed text-white/90 sm:text-lg sm:leading-loose'>
						&ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and
						not to harm you, plans to give you hope and a future.&rdquo;
					</p>
					<p className='mt-3 text-[11px] font-bold uppercase tracking-[0.28em] text-white/60'>
						Jeremiah 29:11
					</p>
				</div>
			</section>

			{/* ═══════════════════════════════════════════════
			    OUR MINISTRIES  (clean white section, accent-bar cards)
			    ═══════════════════════════════════════════════ */}
			<section
				className={`${fullBleed} bg-white py-16 sm:py-20`}
				aria-label='Our ministries'
			>
				<div className='container'>
					<div className='flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left'>
						<div>
							<p className={sectionEyebrow}>Our Divisions</p>
							<h2 className={sectionHeading}>Our Ministries</h2>
							<p className='mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:mx-0'>
								There is a place for everyone — connect, serve and grow at Psalms &amp; Hymns
								Parish.
							</p>
						</div>
						<Link
							to='/ministries'
							className='mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-rccg-red px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-rccg-maroon sm:mt-0'
						>
							View all ministries
							<ArrowRight className='h-4 w-4' aria-hidden />
						</Link>
					</div>

					<div className='mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
						{ministries.map((ministry) => (
							<Link
								key={ministry.name}
								to={ministry.href}
								className='group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-xl'
							>
								{/* Accent bar */}
								<div className='h-1.5 w-full bg-rccg-red' aria-hidden />
								{/* Image */}
								<div className='aspect-[4/3] overflow-hidden'>
									{ministry.imageUrl ? (
										<img
											src={ministry.imageUrl}
											alt={ministry.name}
											className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
										/>
									) : (
										<div className='flex h-full w-full items-center justify-center bg-slate-100' aria-hidden>
											<ImageIcon className='h-10 w-10 text-slate-300' />
										</div>
									)}
								</div>
								{/* Text below image */}
								<div className='flex flex-1 flex-col p-5 text-center'>
									<h3 className='text-sm font-bold uppercase tracking-[0.12em] text-slate-900'>
										{ministry.name}
									</h3>
									<p className='mt-2 text-sm leading-relaxed text-slate-600'>
										{ministry.description}
									</p>
									<span className='mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-rccg-red opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
										Discover more <ArrowRight className='h-3.5 w-3.5' aria-hidden />
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ═══════════════════════════════════════════════
			    LATEST BLOG POSTS
			    ═══════════════════════════════════════════════ */}
			{showPosts && (
				<section
					className={`${fullBleed} bg-rccg-cream py-16 sm:py-20`}
					aria-label='Latest blog posts'
				>
					<div className='container'>
						<div className='flex items-end justify-between'>
							<div>
								<p className={sectionEyebrow}>From the Blog</p>
								<h2 className={sectionHeading}>Latest Blog Posts</h2>
							</div>
							<Link
								to='/posts'
								className='hidden items-center gap-1 text-sm font-semibold text-rccg-red transition hover:text-rccg-maroon sm:inline-flex'
							>
								View all
								<ArrowRight className='h-3.5 w-3.5' aria-hidden />
							</Link>
						</div>

						{posts.length > 0 ? (
							<div className='mt-8 grid gap-6 lg:grid-cols-3'>
								{/* Featured (first) post */}
								{posts[0] && (
									<Link
										to={posts[0].slug ? `/posts/${posts[0].slug}` : '/posts'}
										className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl lg:col-span-2 lg:flex-row'
									>
										<div className='aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-1/2 lg:shrink-0'>
											{posts[0].heroImageUrl ? (
												<img
													src={posts[0].heroImageUrl}
													alt={posts[0].title ?? 'Blog post image'}
													className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
												/>
											) : (
												<div className='flex h-full w-full items-center justify-center bg-slate-100' aria-hidden>
													<ImageIcon className='h-10 w-10 text-slate-300' />
												</div>
											)}
										</div>
										<div className='flex flex-1 flex-col justify-center p-6 sm:p-7'>
											<span className='inline-flex w-fit items-center rounded-full bg-rccg-red/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rccg-red'>
												{posts[0].category ?? 'Blog Post'}
											</span>
											<p className='mt-3 line-clamp-3 text-[17px] font-extrabold leading-snug text-slate-900 group-hover:text-rccg-red sm:text-xl'>
												{posts[0].title}
											</p>
											{posts[0].excerpt && (
												<p className='mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500'>
													{posts[0].excerpt}
												</p>
											)}
											<div className='mt-auto flex items-center gap-2 pt-5 text-[11px] text-slate-400'>
												{posts[0].author && (
													<span className='font-semibold text-slate-500'>{posts[0].author}</span>
												)}
												{posts[0].author && posts[0].date && <span>·</span>}
												{posts[0].date &&
													new Date(posts[0].date).toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'long',
														year: 'numeric',
													})}
											</div>
										</div>
									</Link>
								)}

								{/* Secondary posts */}
								<div className='flex flex-col gap-6'>
									{posts.slice(1, 3).map((post) => (
										<Link
											key={post._id}
											to={post.slug ? `/posts/${post.slug}` : '/posts'}
											className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl sm:flex-row lg:flex-col'
										>
											{post.heroImageUrl ? (
												<div className='aspect-[16/9] overflow-hidden sm:w-2/5 sm:shrink-0 lg:w-full lg:aspect-[16/8]'>
													<img
														src={post.heroImageUrl}
														alt={post.title ?? 'Blog post image'}
														className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
													/>
												</div>
											) : (
												<div className='flex aspect-[16/8] items-center justify-center bg-slate-100' aria-hidden>
													<ImageIcon className='h-8 w-8 text-slate-300' />
												</div>
											)}
											<div className='flex flex-1 flex-col p-4 sm:p-5'>
												<span className='inline-flex w-fit items-center rounded-full bg-rccg-red/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rccg-red'>
													{post.category ?? 'Blog Post'}
												</span>
												<p className='mt-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-rccg-red'>
													{post.title}
												</p>
												<div className='mt-auto pt-3 text-[11px] text-slate-400'>
													{post.author && (
														<span className='font-semibold text-slate-500'>{post.author}</span>
													)}
													{post.author && post.date && <span> · </span>}
													{post.date &&
														new Date(post.date).toLocaleDateString('en-GB', {
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														})}
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						) : (
							<div className='mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm'>
								<BookOpen className='mx-auto h-10 w-10 text-slate-300' aria-hidden />
								<p className='mt-4 text-sm font-medium text-slate-500'>
									No blog posts published yet.
								</p>
								<p className='mt-1 text-xs text-slate-400'>
									New posts will appear here as soon as they are added in Sanity.
								</p>
							</div>
						)}

						<div className='mt-8 text-center sm:hidden'>
							<Link
								to='/posts'
								className='inline-flex items-center gap-1 text-sm font-semibold text-rccg-red transition hover:text-rccg-maroon'
							>
								View all posts
								<ArrowRight className='h-3.5 w-3.5' aria-hidden />
							</Link>
						</div>
					</div>
				</section>
			)}

			{/* ═══════════════════════════════════════════════
			    GALLERY + YOUTUBE
			    ═══════════════════════════════════════════════ */}
			{(showGallery || showYoutube) && (
				<section
					className={`${fullBleed} bg-white py-16 sm:py-20`}
					aria-label='Media'
				>
					<div className='container'>
						<div className='mb-10 text-center'>
							<p className={sectionEyebrow}>Moments &amp; Media</p>
							<h2 className={`${sectionHeading} mt-2`}>Gallery &amp; Watch Online</h2>
						</div>

						<div className='grid gap-10 lg:grid-cols-2'>
							{/* Photo Gallery */}
							{showGallery && (
								<div>
									<p className='mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500'>
										Photo Gallery
									</p>
									{galleryItems.length > 0 ? (
										<div className='grid grid-cols-3 gap-2'>
											{galleryItems.slice(0, 6).map((item, index) => (
												<div
													key={item._id}
													className={`group overflow-hidden rounded-xl ${
														index === 0 ? 'col-span-2 row-span-2' : ''
													}`}
												>
													{item.imageUrl ? (
														<img
															src={item.imageUrl}
															alt={item.caption ?? item.title ?? 'Gallery image'}
															className='aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105'
														/>
													) : (
														<div
															className='flex aspect-square items-center justify-center bg-slate-100'
															aria-hidden
														>
															<ImageIcon className='h-6 w-6 text-slate-300' />
														</div>
													)}
												</div>
											))}
										</div>
									) : (
										<div className='grid grid-cols-3 gap-2'>
											{[1, 2, 3, 4, 5, 6].map((i) => (
												<div
													key={i}
													className={`flex aspect-square items-center justify-center rounded-xl bg-slate-100 ${
														i === 1 ? 'col-span-2 row-span-2' : ''
													}`}
													aria-hidden
												>
													<ImageIcon className='h-6 w-6 text-slate-200' />
												</div>
											))}
										</div>
									)}
									<Link
										to='/gallery'
										className='mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rccg-red hover:text-rccg-maroon'
									>
										View full gallery
										<ArrowRight className='h-3.5 w-3.5' aria-hidden />
									</Link>
								</div>
							)}

							{/* YouTube */}
							{showYoutube && (
								<div className='flex flex-col'>
									<p className='mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500'>
										Watch Online
									</p>
									<div className='flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
										{(() => {
											const primary = youtubeLinks[0]
											const embedUrl = primary?.href
												? getYouTubeEmbedUrl(primary.href)
												: null

											if (!embedUrl) {
												return (
													<div className='flex flex-1 flex-col items-center justify-center gap-4 px-6 py-14 text-center'>
														<div className='flex h-20 w-20 items-center justify-center rounded-full bg-rccg-red/10'>
															<Play className='h-9 w-9 text-rccg-red' aria-hidden />
														</div>
														<p className='text-sm font-medium text-slate-600'>
															Watch our latest messages on YouTube
														</p>
														<a
															href='https://www.youtube.com'
															target='_blank'
															rel='noopener noreferrer'
															className='inline-flex items-center gap-2 rounded-full bg-rccg-red px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-rccg-maroon'
														>
															Go to YouTube
															<ArrowRight className='h-4 w-4' aria-hidden />
														</a>
													</div>
												)
											}

											return (
												<>
													<div className='overflow-hidden rounded-t-2xl'>
														<div className='relative aspect-video w-full'>
															<iframe
																title={primary?.label ?? 'YouTube video'}
																src={`${embedUrl}?rel=0`}
																allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
																allowFullScreen
																className='h-full w-full border-0'
															/>
														</div>
													</div>
													<div className='flex flex-1 flex-col p-5'>
														{primary?.label && (
															<p className='text-sm font-semibold text-slate-900'>
																{primary.label}
															</p>
														)}
														<div className='mt-4 flex flex-wrap items-center gap-3'>
															<a
																href={youtubeLinks[0].href}
																target='_blank'
																rel='noopener noreferrer'
																className='inline-flex items-center gap-2 rounded-full bg-rccg-red px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow transition hover:bg-rccg-maroon'
															>
																Open on YouTube
																<ArrowRight className='h-3.5 w-3.5' aria-hidden />
															</a>
															{youtubeLinks.length > 1 &&
																youtubeLinks.slice(1).map((link) => (
																	<a
																		key={link.href}
																		href={link.href}
																		target='_blank'
																		rel='noopener noreferrer'
																		className='text-xs font-semibold text-rccg-red hover:text-rccg-maroon'
																	>
																		{link.label ?? link.href}
																	</a>
																))}
														</div>
													</div>
												</>
											)
										})()}
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* ═══════════════════════════════════════════════
			    MEMBERSHIP CTA
			    ═══════════════════════════════════════════════ */}
		<section
			className={`${fullBleed} relative overflow-hidden py-24 sm:py-32`}
		>
			{/* Background image */}
			<div
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: "url('/choir.png')" }}
				aria-hidden
			/>
			{/* Multi-stop gradient overlay for rich depth */}
			<div
				className='absolute inset-0 bg-gradient-to-br from-rccg-maroon/95 via-rccg-ink/88 to-slate-900/95'
				aria-hidden
			/>
			{/* Subtle warm glow top-right */}
			<div
				className='pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rccg-gold/10 blur-3xl'
				aria-hidden
			/>
			{/* Subtle red glow bottom-left */}
			<div
				className='pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-rccg-red/20 blur-3xl'
				aria-hidden
			/>

			<div className='container relative z-10 text-center'>
					<span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-gold'>
						Join Us
					</span>
					<h2 className='mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.6rem]'>
						You are welcome here.{' '}
						<span className='text-rccg-gold'>Make this your church family.</span>
					</h2>
					<p className='mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400'>
						Whether you are brand new to faith or looking for a church home, Psalms &amp; Hymns
						Parish is a place to belong, grow and serve.
					</p>
					<div className='mt-9 flex flex-wrap items-center justify-center gap-4'>
						<Link
							to='/membership'
							className='inline-flex items-center gap-2 rounded-full bg-rccg-red px-9 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-rccg-maroon hover:shadow-xl'
						>
							Become a Member
							<ArrowRight className='h-4 w-4' aria-hidden />
						</Link>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold text-white transition hover:bg-white/10'
						>
							Contact the Pastor
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
