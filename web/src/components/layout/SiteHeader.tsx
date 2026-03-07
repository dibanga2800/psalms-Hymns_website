import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, Mail, Facebook, Instagram, Youtube, Menu, X, ChevronDown } from 'lucide-react'

interface SubItem {
	label: string
	to: string
}

interface NavItem {
	label: string
	to?: string
	items?: SubItem[]
}

const navItems: NavItem[] = [
	{
		label: 'About',
		to: '/about',
		items: [
			{ label: 'Who We Are', to: '/who-we-are' },
			{ label: 'Leadership', to: '/leadership' },
			{ label: 'Ministries', to: '/ministries' },
		],
	},
	{ to: '/service-times', label: 'Service Times' },
	{ to: '/events', label: 'Events' },
	{ to: '/posts', label: 'Blog' },
	{
		label: 'Resources',
		items: [
			{ label: 'First Timers', to: '/first-timers' },
			{ label: 'Students', to: '/students' },
			{ label: 'Prayer Request', to: '/prayer-request' },
			{ label: 'Gallery', to: '/gallery' },
		],
	},
	{ to: '/donations', label: 'Giving' },
]

const DesktopDropdown = ({ item }: { item: NavItem }) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleOutside)
		return () => document.removeEventListener('mousedown', handleOutside)
	}, [])

	return (
		<div ref={ref} className='relative'>
			{item.to ? (
				<NavLink
					to={item.to}
					onClick={() => setOpen((v) => !v)}
					className={({ isActive }) =>
						[
							'inline-flex cursor-pointer items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] no-underline transition-colors',
							isActive ? 'text-rccg-gold' : 'text-white/80 hover:text-white',
						].join(' ')
					}
				>
					{item.label}
					<ChevronDown
						className={`h-3 w-3 opacity-80 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
						aria-hidden
					/>
				</NavLink>
			) : (
				<button
					type='button'
					onClick={() => setOpen((v) => !v)}
					className='inline-flex cursor-pointer items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white'
				>
					{item.label}
					<ChevronDown
						className={`h-3 w-3 opacity-80 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
						aria-hidden
					/>
				</button>
			)}

			{open && (
				<div className='absolute left-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl bg-white py-1.5 shadow-2xl ring-1 ring-slate-200/80'>
					{item.items?.map((sub) => (
						<NavLink
							key={sub.to}
							to={sub.to}
							onClick={() => setOpen(false)}
							className={({ isActive }) =>
								[
									'block px-4 py-2.5 text-xs font-medium tracking-wide no-underline transition-colors',
									isActive
										? 'bg-rccg-red/5 text-rccg-red'
										: 'text-slate-700 hover:bg-slate-50 hover:text-rccg-red',
								].join(' ')
							}
						>
							{sub.label}
						</NavLink>
					))}
				</div>
			)}
		</div>
	)
}

export const SiteHeader = () => {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setMobileOpen(false)
	}, [location.pathname])

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={`sticky top-0 z-50 transition-shadow duration-300 ${
				scrolled ? 'shadow-lg' : 'shadow-sm'
			}`}
		>
			{/* Top contact / watchword bar */}
			<div className='bg-rccg-ink text-[12px] text-slate-300'>
				<div className='container flex items-center justify-between py-1.5'>
					<div className='flex items-center gap-3'>
						<span className='hidden items-center gap-2 sm:flex'>
							<span className='font-semibold uppercase tracking-[0.18em] text-slate-400'>
								Our Watch-word
							</span>
							<span className='hidden text-slate-300 md:inline'>
								Bringing God&apos;s Presence to Humanity Through Worship.
							</span>
						</span>
					</div>
					<div className='flex items-center gap-5'>
						<a
							href='tel:+447724812795'
							className='hidden items-center gap-2.5 text-slate-300 transition hover:text-white md:flex'
						>
							<Phone className='h-4 w-4 text-rccg-gold' aria-hidden />
							<span className='text-[13px] font-semibold'>+44 7724 812795</span>
						</a>
						<a
							href='mailto:rccgpsalmshymns@gmail.com'
							className='hidden items-center gap-2 text-[13px] text-slate-300 transition hover:text-white md:flex'
						>
							<Mail className='h-4 w-4 text-rccg-gold' aria-hidden />
							<span>rccgpsalmshymns@gmail.com</span>
						</a>
						<div className='flex items-center gap-3.5' role='group' aria-label='Social links'>
							{[
								{ href: 'https://facebook.com', Icon: Facebook, label: 'Facebook' },
								{ href: 'https://instagram.com', Icon: Instagram, label: 'Instagram' },
								{ href: 'https://youtube.com', Icon: Youtube, label: 'YouTube' },
							].map(({ href, Icon, label }) => (
								<a
									key={label}
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className='text-rccg-gold transition hover:text-white'
									aria-label={label}
								>
									<Icon className='h-4 w-4' aria-hidden />
								</a>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Main navigation bar */}
			<div className='bg-rccg-red'>
				<div className='container flex items-center justify-between py-3 text-white'>
					<Link
						to='/'
						className='flex shrink-0 items-center gap-3 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rccg-red'
						aria-label='Go to homepage'
					>
						<img
							src='/rccg_logo.png'
							alt='RCCG logo'
							className='h-14 w-14 rounded-full bg-white object-contain p-1'
						/>
						<div className='flex flex-col'>
							<span className='text-[11px] font-bold uppercase tracking-[0.18em] text-rccg-gold'>
								The Redeemed Christian Church of God
							</span>
							<span className='text-[15px] font-extrabold leading-tight tracking-tight text-rccg-gold'>
								Psalms &amp; Hymns Parish
							</span>
						</div>
					</Link>

					{/* Desktop links */}
					<nav className='hidden items-center gap-1 lg:flex' aria-label='Main navigation'>
						{navItems.map((item) =>
							item.items ? (
								<DesktopDropdown key={item.label} item={item} />
							) : (
								<NavLink
									key={item.to}
									to={item.to!}
									className={({ isActive }) =>
										[
											'px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] no-underline transition-colors',
											isActive ? 'text-rccg-gold' : 'text-white/80 hover:text-white',
										].join(' ')
									}
								>
									{item.label}
								</NavLink>
							),
						)}

						<Link
							to='/contact'
							className='ml-3 rounded-full bg-rccg-gold px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rccg-maroon no-underline shadow-sm transition hover:bg-accent-500'
						>
							Contact Us
						</Link>
					</nav>

					{/* Mobile toggle */}
					<button
						type='button'
						onClick={() => setMobileOpen((prev) => !prev)}
						className='inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-rccg-maroon lg:hidden'
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
					>
						{mobileOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
					</button>
				</div>
			</div>

			{/* Mobile drawer */}
			<div
				className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
					mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<nav className='container flex flex-col gap-1 py-4' aria-label='Mobile navigation'>
					{navItems.map((item) =>
						item.items ? (
							<div key={item.label} className='rounded-xl bg-slate-50 px-4 py-3'>
								<p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
									{item.label}
								</p>
								<div className='mt-2 space-y-0.5'>
									{item.items.map((sub) => (
										<NavLink
											key={sub.to}
											to={sub.to}
											className={({ isActive }) =>
												[
													'block rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors',
													isActive
														? 'bg-rccg-red/5 text-rccg-red'
														: 'text-slate-700 hover:bg-slate-100 hover:text-rccg-red',
												].join(' ')
											}
										>
											{sub.label}
										</NavLink>
									))}
								</div>
							</div>
						) : (
							<NavLink
								key={item.to}
								to={item.to!}
								className={({ isActive }) =>
									[
										'rounded-lg px-4 py-3 text-sm font-medium no-underline transition-colors',
										isActive
											? 'bg-rccg-red/5 font-bold text-rccg-red'
											: 'text-slate-600 hover:bg-slate-50 hover:text-rccg-red',
									].join(' ')
								}
							>
								{item.label}
							</NavLink>
						),
					)}
					<Link
						to='/contact'
						className='mt-2 rounded-lg bg-rccg-red px-4 py-3 text-center text-sm font-bold text-white no-underline transition hover:bg-rccg-maroon'
					>
						Contact Us
					</Link>
				</nav>
			</div>
		</header>
	)
}
