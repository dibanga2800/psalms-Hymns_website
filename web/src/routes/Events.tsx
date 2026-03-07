import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight, Clock, MessageCircle } from 'lucide-react'

import { AddToCalendarButton } from '@/components/events/AddToCalendarButton'
import { ErrorState } from '@/components/common/ErrorState'
import { PageSEO } from '@/components/common/PageSEO'
import { useEvents } from '@/hooks/useEvents'
import type { EventSummary } from '@/lib/types'

const splitEvents = (events: EventSummary[]) => {
	const now = new Date()
	const upcoming: EventSummary[] = []
	const past: EventSummary[] = []

	for (const evt of events) {
		if (!evt.startDate) {
			past.push(evt)
			continue
		}
		if (new Date(evt.startDate) >= now) {
			upcoming.push(evt)
		} else {
			past.push(evt)
		}
	}

	// Sort upcoming by date ascending, past by date descending
	upcoming.sort((a, b) => (a.startDate && b.startDate ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime() : 0))
	past.sort((a, b) => (a.startDate && b.startDate ? new Date(b.startDate).getTime() - new Date(a.startDate).getTime() : 0))
	return { upcoming, past }
}

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})

const formatDay = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { day: 'numeric' })

const formatMonth = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()

const formatTime = (iso: string) =>
	new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const CategoryBadge = ({ label }: { label: string }) => (
	<span className='inline-block rounded-full bg-rccg-red/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.18em] text-rccg-red'>
		{label}
	</span>
)

const DateBadge = ({ iso }: { iso: string }) => (
	<div className='flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-rccg-red text-white shadow-sm'>
		<span className='text-[10px] font-bold uppercase tracking-wide opacity-90'>
			{formatMonth(iso)}
		</span>
		<span className='text-xl font-extrabold leading-none'>{formatDay(iso)}</span>
	</div>
)

const SkeletonCard = () => (
	<div className='animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200'>
		<div className='aspect-[16/9] bg-slate-200' />
		<div className='space-y-3 p-5'>
			<div className='h-3 w-1/4 rounded bg-slate-200' />
			<div className='h-4 w-3/4 rounded bg-slate-200' />
			<div className='h-3 w-1/2 rounded bg-slate-200' />
		</div>
	</div>
)

const FeaturedEventCard = ({ evt }: { evt: EventSummary }) => (
	<Link
		to={`/events/${evt.slug ?? ''}`}
		className='group relative flex min-h-[320px] overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl no-underline sm:min-h-[380px]'
	>
		{evt.bannerImageUrl && (
			<img
				src={evt.bannerImageUrl}
				alt={evt.title ?? 'Event'}
				className='absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:opacity-50 group-hover:scale-105'
			/>
		)}
		<div className='absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent' />
		<div className='relative z-10 mt-auto p-6 sm:p-8'>
			{evt.category && <CategoryBadge label={evt.category} />}
			<h3 className='mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl group-hover:text-rccg-gold transition-colors'>
				{evt.title}
			</h3>
			<div className='mt-3 flex flex-wrap items-center gap-4 text-base text-slate-300'>
				{evt.startDate && (
					<span className='flex items-center gap-1.5'>
						<Calendar className='h-4 w-4 text-rccg-gold' aria-hidden />
						{formatDate(evt.startDate)}
					</span>
				)}
				{evt.location && (
					<span className='flex items-center gap-1.5'>
						<MapPin className='h-4 w-4 text-rccg-gold' aria-hidden />
						{evt.location}
					</span>
				)}
			</div>
			{evt.excerpt && (
				<p className='mt-3 line-clamp-2 max-w-2xl text-base text-slate-300/80'>
					{evt.excerpt}
				</p>
			)}
			<div className='mt-5 flex flex-wrap items-center gap-3'>
				<span className='inline-flex items-center gap-1.5 text-sm font-bold text-rccg-gold'>
					View details <ArrowRight className='h-4 w-4' aria-hidden />
				</span>
				<div onClick={(e) => e.stopPropagation()}>
					<AddToCalendarButton event={evt} variant='compactDark' />
				</div>
			</div>
		</div>
	</Link>
)

const UpcomingCard = ({ evt }: { evt: EventSummary }) => (
	<Link
		to={`/events/${evt.slug ?? ''}`}
		className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 no-underline transition hover:-translate-y-1 hover:shadow-lg'
	>
		<div className='aspect-[16/9] overflow-hidden bg-slate-100'>
			{evt.bannerImageUrl ? (
				<img
					src={evt.bannerImageUrl}
					alt={evt.title ?? 'Event'}
					className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
				/>
			) : (
				<div className='flex h-full items-center justify-center bg-rccg-red/5'>
					<Calendar className='h-10 w-10 text-rccg-red/30' aria-hidden />
				</div>
			)}
		</div>
		<div className='flex flex-1 flex-col p-5'>
			{evt.category && <CategoryBadge label={evt.category} />}
			<h3 className='mt-2 text-base font-bold text-slate-900 transition-colors group-hover:text-rccg-red'>
				{evt.title}
			</h3>
			<div className='mt-3 space-y-1.5'>
				{evt.startDate && (
					<p className='flex items-center gap-1.5 text-sm text-slate-500'>
						<Calendar className='h-4 w-4 shrink-0 text-rccg-red/60' aria-hidden />
						{formatDate(evt.startDate)}
						{' · '}
						<Clock className='h-3.5 w-3.5 shrink-0 text-rccg-red/60' aria-hidden />
						{formatTime(evt.startDate)}
					</p>
				)}
				{evt.location && (
					<p className='flex items-center gap-1.5 text-sm text-slate-500'>
						<MapPin className='h-4 w-4 shrink-0 text-rccg-red/60' aria-hidden />
						{evt.location}
					</p>
				)}
			</div>
			{evt.excerpt && (
				<p className='mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500'>
					{evt.excerpt}
				</p>
			)}
			<div className='mt-4 flex flex-wrap items-center gap-3'>
				<span className='inline-flex items-center gap-1 text-sm font-bold text-rccg-red'>
					View details <ArrowRight className='h-3.5 w-3.5' aria-hidden />
				</span>
				<div onClick={(e) => e.stopPropagation()} role='presentation'>
					<AddToCalendarButton event={evt} variant='compact' />
				</div>
			</div>
		</div>
	</Link>
)

export const Events = () => {
	const { data: events = [], isLoading, isError } = useEvents()
	const { upcoming, past } = splitEvents(events)
	const [featured, ...rest] = upcoming

	return (
		<div className='space-y-16 sm:space-y-20'>
			<PageSEO
				title='Events & Programmes'
				description='Upcoming and past events at RCCG Psalms & Hymns Parish in Stoke-on-Trent. Services, conferences, outreach and special programmes. Something is always happening!'
				path='/events'
				keywords='church events Stoke-on-Trent, RCCG events Cobridge, church programmes Staffordshire, Christian conferences Stoke-on-Trent, church outreach Cobridge, upcoming events RCCG'
			/>

			{/* PAGE HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-maroon text-white shadow-xl'>
				<div className='pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rccg-gold/15 blur-3xl' aria-hidden />
				<div className='pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-rccg-red/25 blur-3xl' aria-hidden />
				<div className='pointer-events-none absolute right-0 top-1/2 opacity-10'>
					<Calendar className='h-48 w-48 -translate-y-1/2 text-white' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20'>
					<div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rccg-gold/20'>
						<Calendar className='h-6 w-6 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						What&apos;s On
					</p>
					<h1 className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						Events &amp; Programmes
					</h1>
					<p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-100/85 sm:text-lg'>
						Join us for services, conferences, outreach and special programmes.
						Something is always happening at Psalms &amp; Hymns Parish.
					</p>
				</div>
			</section>

			{isError && (
				<ErrorState message='We were unable to load events. Please try again shortly.' />
			)}

			{/* UPCOMING EVENTS */}
			<section className='space-y-8'>
				<div className='flex items-center gap-4'>
					<div>
						<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
							Don&apos;t Miss Out
						</p>
						<h2 className='mt-0.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
							Upcoming Events
						</h2>
					</div>
				</div>

				{isLoading ? (
					<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						{[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
					</div>
				) : upcoming.length === 0 ? (
					<div className='flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 py-20 text-center'>
						<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/60'>
							<Calendar className='h-7 w-7 text-slate-400' aria-hidden />
						</div>
						<p className='text-lg font-semibold text-slate-600'>
							No upcoming events right now
						</p>
						<p className='max-w-sm text-base text-slate-500'>
							Check back soon — something is always in the works.
						</p>
					</div>
				) : (
					<div className='space-y-5'>
						{featured && <FeaturedEventCard evt={featured} />}
						{rest.length > 0 && (
							<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
								{rest.map((evt) => (
									<UpcomingCard key={evt._id} evt={evt} />
								))}
							</div>
						)}
					</div>
				)}
			</section>

			{/* PAST EVENTS */}
			{(isLoading || past.length > 0) && (
				<section className='space-y-6'>
					<div className='flex items-center gap-3'>
						<span className='h-px flex-1 bg-slate-200' />
						<h2 className='text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400'>
							Past Events
						</h2>
						<span className='h-px flex-1 bg-slate-200' />
					</div>

					{isLoading ? (
						<div className='space-y-3'>
							{[1, 2, 3].map((n) => (
								<div key={n} className='flex animate-pulse items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-slate-200'>
									<div className='h-14 w-12 shrink-0 rounded-xl bg-slate-200' />
									<div className='flex-1 space-y-2'>
										<div className='h-3.5 w-1/2 rounded bg-slate-200' />
										<div className='h-3 w-1/3 rounded bg-slate-200' />
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='space-y-2'>
							{past.map((evt) => (
								<Link
									key={evt._id}
									to={`/events/${evt.slug ?? ''}`}
									className='group flex items-center gap-4 rounded-xl bg-white px-5 py-4 no-underline ring-1 ring-slate-200/80 transition hover:bg-slate-50 hover:ring-slate-300'
								>
									{evt.startDate ? (
										<DateBadge iso={evt.startDate} />
									) : (
										<div className='flex h-14 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100'>
											<Calendar className='h-5 w-5 text-slate-400' aria-hidden />
										</div>
									)}

									<div className='min-w-0 flex-1'>
										<p className='truncate text-base font-bold text-slate-800 transition-colors group-hover:text-rccg-red'>
											{evt.title}
										</p>
										<div className='mt-1 flex flex-wrap items-center gap-3'>
											{evt.startDate && (
												<span className='flex items-center gap-1 text-sm text-slate-500'>
													<Clock className='h-3.5 w-3.5' aria-hidden />
													{formatTime(evt.startDate)}
												</span>
											)}
											{evt.location && (
												<span className='flex items-center gap-1 text-sm text-slate-500'>
													<MapPin className='h-3.5 w-3.5' aria-hidden />
													{evt.location}
												</span>
											)}
											{evt.category && <CategoryBadge label={evt.category} />}
										</div>
									</div>

									<ArrowRight className='h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-rccg-red' aria-hidden />
								</Link>
							))}
						</div>
					)}
				</section>
			)}

			{/* STAY CONNECTED CTA */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-center text-white shadow-xl sm:py-14'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl'>
						Never Miss an Event
					</h2>
					<p className='mx-auto mt-3 max-w-md text-base text-slate-300'>
						Join us on Sunday or get in touch to hear about upcoming programmes,
						conferences and special services.
					</p>
					<div className='mt-7 flex flex-wrap justify-center gap-4'>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400'
						>
							<MessageCircle className='h-4.5 w-4.5' aria-hidden />
							Get in Touch
						</Link>
						<Link
							to='/service-times'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							<Calendar className='h-4.5 w-4.5' aria-hidden />
							Service Times
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
