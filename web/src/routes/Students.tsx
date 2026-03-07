import {
	GraduationCap,
	Users,
	BookOpen,
	Calendar,
	MessageCircle,
	Star,
	Clock,
	MapPin,
	Heart,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageSEO } from '@/components/common/PageSEO'

const offerings = [
	{
		icon: BookOpen,
		title: 'Bible Study Nights',
		body: "Every Tuesday at 8:00 pm online — an interactive deep-dive into Scripture in a format that's relevant, honest, and intellectually engaging.",
		gradient: 'from-violet-500/20 to-purple-500/10',
		iconBg: 'bg-violet-500/15',
		iconColor: 'text-violet-600',
	},
	{
		icon: Users,
		title: 'Student Community',
		body: "A welcoming peer group where you can make lasting friendships with other students who share your faith and values — whether you're at uni, college, or a gap year.",
		gradient: 'from-emerald-500/20 to-teal-500/10',
		iconBg: 'bg-emerald-500/15',
		iconColor: 'text-emerald-600',
	},
	{
		icon: GraduationCap,
		title: 'Faith & Study Support',
		body: 'We understand the pressures of student life. We offer prayer support, mentoring, and practical guidance to help you thrive academically and spiritually.',
		gradient: 'from-amber-500/20 to-orange-500/10',
		iconBg: 'bg-amber-500/15',
		iconColor: 'text-amber-600',
	},
	{
		icon: Calendar,
		title: 'Events & Hangouts',
		body: 'From game nights and prayer retreats to city outreach events — there is always something happening for students at Psalms & Hymns Parish.',
		gradient: 'from-rose-500/20 to-pink-500/10',
		iconBg: 'bg-rose-500/15',
		iconColor: 'text-rose-600',
	},
	{
		icon: MessageCircle,
		title: 'Open Conversations',
		body: "Got doubts? Big questions? Hard experiences? This is a space where honest faith conversations are not just allowed — they're encouraged.",
		gradient: 'from-sky-500/20 to-blue-500/10',
		iconBg: 'bg-sky-500/15',
		iconColor: 'text-sky-600',
	},
	{
		icon: Star,
		title: 'Leadership Development',
		body: 'We invest in young leaders. Students who are hungry to grow are mentored, discipled, and given real opportunities to serve and lead within the church.',
		gradient: 'from-rccg-red/20 to-rccg-maroon/10',
		iconBg: 'bg-rccg-red/15',
		iconColor: 'text-rccg-red',
	},
]

const scheduleItems = [
	{
		day: 'Sunday',
		time: '3:00 pm – 5:00 pm',
		name: 'Sunday Service',
		note: 'All welcome — great for community',
		icon: Users,
		gradient: 'from-rccg-red/15 to-rccg-maroon/5',
		iconBg: 'bg-rccg-red/15',
		iconColor: 'text-rccg-red',
	},
	{
		day: 'Tuesday',
		time: '8:00 pm – 9:00 pm',
		name: 'Bible Study',
		note: 'Online — perfect for busy schedules',
		icon: BookOpen,
		gradient: 'from-violet-500/15 to-purple-500/5',
		iconBg: 'bg-violet-500/15',
		iconColor: 'text-violet-600',
	},
	{
		day: 'Thursday',
		time: '7:00 pm – 8:00 pm',
		name: 'Faith Clinic',
		note: 'Online — prayer and faith questions',
		icon: Heart,
		gradient: 'from-rose-500/15 to-pink-500/5',
		iconBg: 'bg-rose-500/15',
		iconColor: 'text-rose-600',
	},
]

export const Students = () => {
	return (
		<div className='space-y-16 sm:space-y-24'>
			<PageSEO
				title='Students & Young Adults'
				description='RCCG Psalms & Hymns Parish in Stoke-on-Trent welcomes students and young adults. Bible study, community, mentoring and events designed for student life in Cobridge.'
				path='/students'
				keywords='student church Stoke-on-Trent, young adults church Cobridge, university students Christian fellowship Staffordshire, RCCG youth Stoke-on-Trent, Bible study students Cobridge'
			/>

			{/* HERO — redesigned with decorative graphics */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl'>
				<div
					className='absolute inset-0 bg-cover bg-center opacity-20'
					style={{ backgroundImage: "url('/youth ministry.png')" }}
					aria-hidden
				/>
				<div className='absolute inset-0 bg-gradient-to-br from-rccg-maroon/90 via-slate-900/95 to-slate-900' />
				{/* Decorative background shapes */}
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rccg-gold/15 blur-3xl' />
					<div className='absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl' />
				</div>
				{/* Large decorative icon */}
				<div className='pointer-events-none absolute bottom-0 right-0 flex items-end justify-end opacity-15 sm:opacity-20'>
					<GraduationCap className='h-48 w-48 text-white sm:h-64 sm:w-64' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24'>
					<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rccg-gold/20 shadow-lg'>
						<GraduationCap className='h-7 w-7 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Students &amp; Young Adults
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
						Your Faith Belongs
						<br className='sm:hidden' />
						<span className='text-rccg-gold'> Here Too</span>
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-100/90 sm:text-lg'>
						Whether you are a university student, college student, or young adult navigating
						life&apos;s big questions — you have a home at Psalms &amp; Hymns Parish. We exist
						to help you build a faith that lasts.
					</p>
					<Link
						to='#connect'
						className='mt-8 inline-flex items-center gap-2 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400 hover:shadow-amber-500/30'
					>
						Get Involved
						<MapPin className='h-4 w-4' aria-hidden />
					</Link>
				</div>
			</section>

			{/* WHAT WE OFFER — cards with larger icons and gradients */}
			<section className='space-y-10'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						What We Offer
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						Built for Student Life
					</h2>
					<p className='mx-auto mt-3 max-w-xl text-base text-slate-500'>
						Spaces and programmes designed to meet you where you are — academically, socially, and spiritually.
					</p>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{offerings.map(({ icon: Icon, title, body, gradient, iconBg, iconColor }) => (
						<div
							key={title}
							className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-slate-300/80 sm:p-8'
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
								aria-hidden
							/>
							<div className='relative'>
								<span
									className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}
								>
									<Icon className='h-7 w-7' strokeWidth={2} aria-hidden />
								</span>
								<h3 className='mt-5 text-lg font-bold text-slate-900 sm:text-xl'>
									{title}
								</h3>
								<p className='mt-2 text-sm leading-relaxed text-slate-600 sm:text-base'>
									{body}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* SCRIPTURE — with decorative icon */}
			<section className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-rccg-red/10 via-rose-50/80 to-rccg-red/5 px-8 py-12 ring-1 ring-rccg-red/15 sm:px-12 sm:py-14'>
				<div className='absolute left-6 top-1/2 -translate-y-1/2 opacity-15 sm:left-10'>
					<Star className='h-24 w-24 text-rccg-red' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.22em] text-rccg-red'>
						A Word for You
					</p>
					<blockquote className='mt-4 text-lg font-medium italic leading-relaxed text-slate-800 sm:text-xl md:text-2xl'>
						&ldquo;Don&apos;t let anyone look down on you because you are young, but set an
						example for the believers in speech, in conduct, in love, in faith and in purity.&rdquo;
					</blockquote>
					<cite className='mt-4 block text-sm font-bold tracking-wide text-slate-500'>
						1 Timothy 4:12
					</cite>
				</div>
			</section>

			{/* SCHEDULE — cards with icons */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						When We Meet
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						Key Times for Students
					</h2>
					<p className='mx-auto mt-3 max-w-lg text-base text-slate-500'>
						Join us in person or online — we&apos;ve got you covered.
					</p>
				</div>
				<div className='mx-auto grid max-w-4xl gap-6 sm:grid-cols-3'>
					{scheduleItems.map(({ day, time, name, note, icon: Icon, gradient, iconBg, iconColor }) => (
						<div
							key={name}
							className='group relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg'
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
								aria-hidden
							/>
							<div className='relative'>
								<span
									className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-sm`}
								>
									<Icon className='h-6 w-6' strokeWidth={2} aria-hidden />
								</span>
								<p className='mt-4 text-xs font-bold uppercase tracking-[0.2em] text-rccg-red'>
									{day}
								</p>
								<p className='mt-1 text-lg font-extrabold text-slate-900'>{name}</p>
								<p className='mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-600'>
									<Clock className='h-4 w-4 text-slate-400' aria-hidden />
									{time}
								</p>
								<p className='mt-2 text-sm text-slate-500'>{note}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CONNECT CTA — with icons on buttons */}
			<section
				id='connect'
				className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16'
			>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
						Ready to Connect?
					</h2>
					<p className='mx-auto mt-3 max-w-lg text-base text-slate-300 sm:text-lg'>
						We would love to hear from you. Drop us a message, join us on Sunday, or
						come along to a midweek session. You belong here.
					</p>
					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400 hover:shadow-amber-500/30'
						>
							<MessageCircle className='h-4.5 w-4.5' aria-hidden />
							Get in Touch
						</Link>
						<Link
							to='/prayer-request'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							<Heart className='h-4.5 w-4.5' aria-hidden />
							Submit a Prayer Request
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
