import { Link } from 'react-router-dom'
import { Users, Crown, Layers, ArrowRight } from 'lucide-react'
import { PageSEO } from '@/components/common/PageSEO'

interface AboutCard {
	icon: typeof Users
	label: string
	description: string
	to: string
}

const cards: AboutCard[] = [
	{
		icon: Users,
		label: 'Who We Are',
		description: 'Our story, mission, vision, core values, and what we believe.',
		to: '/who-we-are',
	},
	{
		icon: Crown,
		label: 'Leadership',
		description: 'Meet the pastors and leaders who serve and shepherd this community.',
		to: '/leadership',
	},
	{
		icon: Layers,
		label: 'Ministries',
		description: 'Explore the ministries and groups that make up our church family.',
		to: '/ministries',
	},
]

export const About = () => {
	return (
		<div className='space-y-14 sm:space-y-20'>
			<PageSEO
				title='About Us'
				description='Get to know RCCG Psalms & Hymns Parish — a Spirit-led congregation in Cobridge, Stoke-on-Trent. Explore who we are, our leadership, and our ministries.'
				path='/about'
				keywords='about RCCG Psalms Hymns Parish, Christian church about page Stoke-on-Trent, about Redeemed Christian Church of God Cobridge'
			/>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg'>
				<div
					className='absolute inset-0 bg-cover bg-center opacity-25'
					style={{ backgroundImage: "url('/choir.png')" }}
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-rccg-maroon/80 via-rccg-red/70 to-slate-900/90' />
				<div className='relative z-10 px-6 py-16 text-center sm:px-12 sm:py-24'>
					<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
						About Us
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						Get to Know
						<br />
						<span className='text-rccg-gold'>Psalms &amp; Hymns Parish</span>
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-100/90 sm:text-lg'>
						A Spirit-led congregation in Stoke-on-Trent, United Kingdom — part of the
						worldwide family of the Redeemed Christian Church of God.
					</p>
				</div>
			</section>

			{/* QUICK LINKS */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						Explore
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						Learn More About Us
					</h2>
				</div>

				<div className='grid gap-6 sm:grid-cols-3'>
					{cards.map(({ icon: Icon, label, description, to }) => (
						<Link
							key={to}
							to={to}
							className='group flex flex-col gap-4 rounded-2xl bg-white p-7 no-underline shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-md hover:ring-rccg-red/30'
						>
							<span className='flex h-11 w-11 items-center justify-center rounded-xl bg-rccg-red/10 transition group-hover:bg-rccg-red/20'>
								<Icon className='h-5 w-5 text-rccg-red' aria-hidden />
							</span>
							<div className='flex-1'>
								<h3 className='text-lg font-bold text-slate-900'>{label}</h3>
								<p className='mt-1.5 text-base leading-relaxed text-slate-500'>{description}</p>
							</div>
							<span className='inline-flex items-center gap-1.5 text-sm font-semibold text-rccg-red'>
								Learn more
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' aria-hidden />
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className='rounded-2xl bg-rccg-red px-6 py-12 text-center text-white shadow-lg sm:px-10'>
				<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl'>
					Come and Be Part of Our Family
				</h2>
				<p className='mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/80'>
					Every person who walks through our doors is a welcome guest and a potential family member.
				</p>
				<div className='mt-7 flex flex-wrap justify-center gap-3'>
					<Link
						to='/service-times'
						className='rounded-full bg-rccg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
					>
						Service Times
					</Link>
					<Link
						to='/contact'
						className='rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline shadow transition hover:bg-white/10'
					>
						Get in Touch
					</Link>
				</div>
			</section>
		</div>
	)
}
