import { useServiceTimesPage } from '@/hooks/useServiceTimesPage'
import type { ServiceTime } from '@/lib/types'

const colourClasses = [
	'bg-fuchsia-600',
	'bg-amber-500',
	'bg-sky-600',
	'bg-emerald-600',
	'bg-rose-600',
	'bg-indigo-600',
]

export const ServiceTimes = () => {
	const { data, isLoading, isError } = useServiceTimesPage()
	const defaultServices: ServiceTime[] = [
		{
			name: 'Sunday Service',
			day: 'Sundays',
			time: '3:00pm – 5:00pm',
		},
		{
			name: 'Workers Meeting',
			day: 'Sundays',
			time: '2:30pm – 3:00pm',
			description: 'Held before the main Sunday service.',
		},
		{
			name: 'Bible Study',
			day: 'Tuesdays',
			time: '8:00pm – 9:00pm',
			description: 'Online.',
		},
		{
			name: 'Faith Clinic',
			day: 'Thursdays',
			time: '7:00pm – 8:00pm',
			description: 'Online.',
		},
	]
	const services: ServiceTime[] =
		data?.services && data.services.length > 0
			? data.services
			: defaultServices

	return (
		<div className='space-y-10 lg:space-y-12'>
		{/* HERO – banner with title and subtitle */}
		<section className='relative overflow-hidden rounded-2xl text-white shadow-lg'>
			{/* Background image — uses Sanity heroImageUrl when available, else local choir photo */}
			<div
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: `url('${data?.heroImageUrl ?? '/choir.png'}')` }}
				aria-hidden
			/>
			{/* Gradient overlay */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-rccg-maroon/85 via-slate-900/80 to-slate-900/92'
				aria-hidden
			/>
			{/* Decorative gold glow */}
			<div
				className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rccg-gold/15 blur-3xl'
				aria-hidden
			/>
			<div className='relative z-10 px-6 py-14 text-center sm:px-10 sm:py-20'>
				<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
					Worship With Us
				</p>
				<h1 className='mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
					{data?.title ?? 'Our Service Times'}
				</h1>
				<p className='mx-auto mt-3 max-w-2xl text-sm text-slate-100/85 sm:text-base'>
					{data?.subtitle ?? 'Find a time to worship with us — in-person or online'}
				</p>
			</div>
		</section>

			{/* OUR SERVICES TIME & DAYS – grid of coloured cards */}
			<section className='space-y-4' aria-label='Service schedule'>
				<h2 className='text-center text-lg font-bold text-slate-800 sm:text-xl'>
					Our Services Time &amp; Days
				</h2>
				<p className='text-center text-xs text-slate-500 sm:text-sm'>
					Venues are both in the church and virtually online.
				</p>

				{isLoading && (
					<p className='mt-6 text-center text-sm text-slate-500'>
						Loading service times…
					</p>
				)}
				{isError && !isLoading && (
					<p className='mt-6 text-center text-sm text-amber-700'>
						Unable to load service times from Sanity. Add services in the
						Service Times Page document to see them here.
					</p>
				)}

				<div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{services.map((service, index) => {
						const colour =
							colourClasses[index % colourClasses.length]
						return (
							<div
								key={`${service.name ?? ''}-${service.day ?? ''}-${service.time ?? ''}-${index}`}
								className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
							>
								<div
									className={`${colour} px-4 py-3 text-sm font-bold uppercase tracking-wide text-white`}
								>
									{service.name}
								</div>
								<div className='space-y-1.5 px-4 py-3 text-sm text-slate-700'>
									{service.time && (
										<p>
											<span className='font-semibold text-slate-800'>
												Time:
											</span>{' '}
											{service.time}
										</p>
									)}
									{service.day && (
										<p>
											<span className='font-semibold text-slate-800'>
												Day:
											</span>{' '}
											{service.day}
										</p>
									)}
									{service.description && (
										<p className='mt-1 text-xs leading-snug text-slate-600'>
											{service.description}
										</p>
									)}
									{service.isThanksgiving && (
										<p className='mt-1.5 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800'>
											Thanksgiving Service
										</p>
									)}
								</div>
							</div>
						)
					})}
				</div>

				{!isLoading && services.length === 0 && (
					<p className='mt-6 text-center text-sm text-slate-500'>
						Service times will appear here once they are added in
						Sanity (Service Times Page document).
					</p>
				)}
			</section>
		</div>
	)
}
