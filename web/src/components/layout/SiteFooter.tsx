import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Phone, Mail, Radio, PlayCircle, Tv2 } from 'lucide-react'

const usefulLinks = [
	{ to: '/about', label: 'About Psalms & Hymns' },
	{ to: '/who-we-are', label: 'Who We Are' },
	{ to: '/service-times', label: 'Service Time' },
	{ to: '/donations', label: 'Donations' },
	{ to: '/gallery', label: 'Gallery' },
	{ to: '/contact', label: 'Contact Us' },
]

export const SiteFooter = () => {
	const year = new Date().getFullYear()

	return (
		<footer className='border-t border-white/10 bg-rccg-ink text-white'>
			<div className='container py-10'>
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
					{/* Church address + contact + Watch Live button */}
					<div className='space-y-3'>
						<h2 className='text-base font-bold text-white'>
							Church Address
						</h2>
						<p className='text-sm text-slate-300'>
							Christ Church,
							<br />
							10 Emery Street,
							<br />
							Cobridge, Stoke-On-Trent, ST6 2JJ.
						</p>
						<p className='mt-1 text-sm text-slate-300'>
							Service Time: <span className='font-semibold'>3:00pm – 5:00pm</span>
						</p>
						<div className='mt-1 flex flex-col gap-1 text-sm text-slate-300'>
							<span className='flex items-center gap-2'>
								<Phone className='h-4 w-4 shrink-0' aria-hidden />
								<span>07724 812795</span>
							</span>
							<span className='flex min-w-0 items-center gap-2'>
								<Mail className='h-4 w-4 shrink-0' aria-hidden />
								<span className='break-all'>rccgpsalmshymns@gmail.com</span>
							</span>
						</div>
						<a
							href='https://www.youtube.com/@rccglive/streams'
							target='_blank'
							rel='noopener noreferrer'
							className='mt-4 inline-flex items-center gap-2 rounded-full bg-rccg-gold px-4 py-2 text-xs font-bold text-rccg-ink shadow-sm transition hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rccg-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-rccg-ink'
						>
							<Tv2 className='h-4 w-4' aria-hidden />
							<span>Watch Live RCCG TV</span>
						</a>
					</div>

					{/* Live Radio – embedded audio player card */}
					<div className='space-y-5'>
						<h2 className='text-base font-bold text-white'>RCCG Live Radio</h2>
						<div className='w-full max-w-full rounded-xl border border-white/10 bg-gradient-to-br from-rccg-ink via-rccg-ink to-slate-900 p-4 text-xs text-slate-200 shadow-md'>
							<div className='flex items-center justify-between gap-5'>
								<div className='flex items-center gap-3'>
									<div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 shadow-inner'>
										<Radio className='h-5 w-5 text-slate-100' aria-hidden />
									</div>
									<div className='space-y-0.5'>
										<p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200'>
											RCCG RADIO
										</p>
										<p className='text-[11px] text-slate-300'>
											Listen live to RCCG programmes.
										</p>
									</div>
								</div>
								<div className='flex items-end gap-1 pr-1'>
									<PlayCircle className='h-8 w-8 text-emerald-400' aria-hidden />
									<div className='flex items-end gap-0.5'>
										<span className='h-3 w-0.5 rounded-full bg-emerald-400/80 animate-bounce' style={{ animationDelay: '0ms' }} />
										<span className='h-4 w-0.5 rounded-full bg-emerald-400/70 animate-bounce' style={{ animationDelay: '150ms' }} />
										<span className='h-5 w-0.5 rounded-full bg-emerald-400/60 animate-bounce' style={{ animationDelay: '300ms' }} />
									</div>
								</div>
							</div>
							<div className='mt-3'>
								<iframe
									title='RCCG Radio Live Player'
									src='https://mixlr.com/rccg-radio/embed'
									width='100%'
									height='120'
									className='w-full rounded-md border border-slate-700 bg-slate-900'
									frameBorder='0'
									allow='autoplay'
								/>
							</div>
							<p className='mt-2 text-[11px] text-slate-400'>
								If the embedded player does not start, open the full stream{' '}
								<a
									href='https://myrccgradio.mixlr.com/'
									target='_blank'
									rel='noopener noreferrer'
									className='font-semibold text-rccg-gold hover:text-accent-500'
								>
									here
								</a>
								.
							</p>
						</div>
					</div>

					{/* Social Handles */}
					<div className='space-y-3 pl-0 md:pl-3'>
						<h2 className='text-base font-bold text-white'>
							Social Handles
						</h2>
						<div className='flex gap-3' role='group' aria-label='Social links'>
							<a
								href='https://www.facebook.com/psalmshymns01'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-400 hover:text-white'
								aria-label='Facebook'
							>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-400 hover:text-white'
								aria-label='Instagram'
							>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='https://www.youtube.com/@PsalmsHymnsRCCG'
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-400 hover:text-white'
								aria-label='YouTube'
							>
								<Youtube className='h-5 w-5' />
							</a>
						</div>
					</div>

					{/* Useful Links */}
					<div className='space-y-3'>
						<h2 className='text-base font-bold text-white'>
							Useful Links
						</h2>
						<ul className='space-y-2 text-sm'>
							{usefulLinks.map((item) => (
								<li key={item.to}>
									<Link
										to={item.to}
										className='text-slate-300 hover:text-white'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className='border-t border-white/10'>
				<div className='container flex flex-col items-center justify-between gap-3 py-4 text-center text-xs text-slate-400 sm:flex-row'>
					<p>
						© {year} RCCG Psalms &amp; Hymns Parish. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
