import { Link, useParams } from 'react-router-dom'
import { Calendar, MapPin, Clock, Tag, ArrowLeft, ArrowRight, Users } from 'lucide-react'

import { AddToCalendarButton } from '@/components/events/AddToCalendarButton'
import { useEventDetail } from '@/hooks/useEvents'

const formatFullDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

const formatTime = (iso: string) =>
	new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const InfoRow = ({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof Calendar
	label: string
	value: string
}) => (
	<div className='flex items-start gap-3'>
		<span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rccg-red/10'>
			<Icon className='h-4.5 w-4.5 text-rccg-red' aria-hidden />
		</span>
		<div>
			<p className='text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400'>{label}</p>
			<p className='mt-0.5 text-base font-semibold text-slate-800'>{value}</p>
		</div>
	</div>
)

export const EventDetail = () => {
	const { slug } = useParams()
	const { data, isLoading, isError } = useEventDetail(slug)

	if (isLoading) {
		return (
			<div className='space-y-6 animate-pulse'>
				<div className='h-8 w-1/3 rounded-lg bg-slate-200' />
				<div className='aspect-[21/9] w-full rounded-2xl bg-slate-200' />
				<div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
					<div className='space-y-3'>
						<div className='h-4 w-3/4 rounded bg-slate-200' />
						<div className='h-4 w-1/2 rounded bg-slate-200' />
					</div>
					<div className='h-48 rounded-2xl bg-slate-200' />
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex flex-col items-center gap-4 rounded-2xl bg-amber-50 py-16 text-center ring-1 ring-amber-200'>
				<p className='text-base font-semibold text-amber-700'>
					Unable to load this event. Please try again shortly.
				</p>
				<Link
					to='/events'
					className='inline-flex items-center gap-1.5 text-base font-bold text-rccg-red no-underline hover:underline'
				>
					<ArrowLeft className='h-4 w-4' aria-hidden />
					Back to Events
				</Link>
			</div>
		)
	}

	if (!data) {
		return (
			<div className='flex flex-col items-center gap-4 rounded-2xl bg-slate-50 py-16 text-center ring-1 ring-slate-200'>
				<p className='text-base text-slate-500'>
					This event could not be found. It may have been removed.
				</p>
				<Link
					to='/events'
					className='inline-flex items-center gap-1.5 text-base font-bold text-rccg-red no-underline hover:underline'
				>
					<ArrowLeft className='h-4 w-4' aria-hidden />
					Back to Events
				</Link>
			</div>
		)
	}

	const isPast = data.startDate
		? new Date(data.startDate).getTime() < Date.now()
		: false

	return (
		<div className='space-y-10 sm:space-y-12'>

			{/* BACK LINK */}
			<Link
				to='/events'
				className='inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 no-underline transition hover:text-rccg-red'
			>
				<ArrowLeft className='h-4 w-4' aria-hidden />
				All Events
			</Link>

			{/* HERO BANNER */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl'>
				{data.bannerImageUrl && (
					<img
						src={data.bannerImageUrl}
						alt={data.title ?? 'Event banner'}
						className='absolute inset-0 h-full w-full object-cover opacity-35'
					/>
				)}
				<div className='absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent' />
				<div className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rccg-gold/10 blur-3xl' aria-hidden />

				<div className='relative z-10 px-6 py-16 sm:px-10 sm:py-20'>
					<div className='flex flex-wrap items-center gap-3'>
						{data.category && (
							<span className='inline-block rounded-full bg-rccg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white'>
								{data.category}
							</span>
						)}
						{isPast && (
							<span className='inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-300'>
								Past Event
							</span>
						)}
					</div>
					<h1 className='mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl'>
						{data.title}
					</h1>
					{data.excerpt && (
						<p className='mt-4 max-w-2xl text-base leading-relaxed text-slate-200/80 sm:text-lg'>
							{data.excerpt}
						</p>
					)}
					{data.startDate && (
						<p className='mt-5 flex items-center gap-2 text-base text-rccg-gold'>
							<Calendar className='h-4.5 w-4.5' aria-hidden />
							{formatFullDate(data.startDate)} · {formatTime(data.startDate)}
						</p>
					)}
				</div>
			</section>

			{/* MAIN CONTENT + SIDEBAR */}
			<section className='grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]'>

				{/* LEFT — event details / body */}
				<div className='space-y-6'>
					<div className='grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2'>
						{data.startDate && (
							<InfoRow
								icon={Calendar}
								label='Date'
								value={formatFullDate(data.startDate)}
							/>
						)}
						{data.startDate && (
							<InfoRow
								icon={Clock}
								label='Time'
								value={
									data.endDate
										? `${formatTime(data.startDate)} – ${formatTime(data.endDate)}`
										: formatTime(data.startDate)
								}
							/>
						)}
						{data.location && (
							<InfoRow icon={MapPin} label='Location' value={data.location} />
						)}
						{data.category && (
							<InfoRow icon={Tag} label='Category' value={data.category} />
						)}
					</div>

					{!isPast && data.startDate && (
						<AddToCalendarButton event={data} />
					)}

					{data.excerpt && (
						<div className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200'>
							<h2 className='text-sm font-bold uppercase tracking-[0.16em] text-slate-500'>
								About This Event
							</h2>
							<p className='mt-3 text-base leading-relaxed text-slate-600'>
								{data.excerpt}
							</p>
						</div>
					)}
				</div>

				{/* RIGHT — sidebar */}
				<aside className='space-y-5'>

					{/* CTA card */}
					<div className={`overflow-hidden rounded-2xl shadow-md ${isPast ? 'bg-slate-50 ring-1 ring-slate-200' : 'bg-rccg-maroon text-white'}`}>
						<div className='px-6 py-6'>
							<Users className={`h-7 w-7 ${isPast ? 'text-slate-400' : 'text-rccg-gold'}`} aria-hidden />
							<h3 className={`mt-3 text-lg font-extrabold ${isPast ? 'text-slate-800' : 'text-white'}`}>
								{isPast ? 'This event has passed' : "You're Invited"}
							</h3>
							<p className={`mt-2 text-base leading-relaxed ${isPast ? 'text-slate-500' : 'text-white/75'}`}>
								{isPast
									? 'Thank you for being part of our programmes. Stay connected for upcoming events and special services.'
									: "We'd love to have you join us. Bring family, friends, and colleagues to be part of what God is doing."}
							</p>

							{data.registrationLink && !isPast && (
								<a
									href={data.registrationLink}
									target='_blank'
									rel='noopener noreferrer'
									className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rccg-gold py-3 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
								>
									Register Now
									<ArrowRight className='h-4 w-4' aria-hidden />
								</a>
							)}

							{isPast && (
								<Link
									to='/events'
									className='mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rccg-red no-underline hover:underline'
								>
									See upcoming events
									<ArrowRight className='h-3.5 w-3.5' aria-hidden />
								</Link>
							)}
						</div>
					</div>

					{/* Contact card */}
					<div className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
						<h3 className='text-base font-bold text-slate-800'>Need more info?</h3>
						<p className='mt-1.5 text-sm leading-relaxed text-slate-500'>
							Reach out to the church office for details about this or any upcoming programme.
						</p>
						<Link
							to='/contact'
							className='mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rccg-red no-underline transition hover:underline'
						>
							Contact us <ArrowRight className='h-3.5 w-3.5' aria-hidden />
						</Link>
					</div>

					{/* Service times nudge */}
					<div className='rounded-2xl bg-rccg-red/5 p-5 ring-1 ring-rccg-red/10'>
						<p className='text-sm font-semibold text-rccg-red'>
							Join us every Sunday
						</p>
						<p className='mt-1 text-sm text-slate-600'>
							Sunday Service · 3:00 pm – 5:00 pm
						</p>
						<Link
							to='/service-times'
							className='mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-rccg-red no-underline hover:underline'
						>
							All service times <ArrowRight className='h-3.5 w-3.5' aria-hidden />
						</Link>
					</div>
				</aside>
			</section>
		</div>
	)
}
