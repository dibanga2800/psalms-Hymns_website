import { GraduationCap, Users, BookOpen, Calendar, MessageCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

interface OfferingItem {
	icon: typeof GraduationCap
	title: string
	body: string
}

const offerings: OfferingItem[] = [
	{
		icon: BookOpen,
		title: 'Bible Study Nights',
		body: 'Every Tuesday at 8:00 pm online — an interactive deep-dive into Scripture in a format that\'s relevant, honest, and intellectually engaging.',
	},
	{
		icon: Users,
		title: 'Student Community',
		body: 'A welcoming peer group where you can make lasting friendships with other students who share your faith and values — whether you\'re at uni, college, or a gap year.',
	},
	{
		icon: GraduationCap,
		title: 'Faith & Study Support',
		body: 'We understand the pressures of student life. We offer prayer support, mentoring, and practical guidance to help you thrive academically and spiritually.',
	},
	{
		icon: Calendar,
		title: 'Events & Hangouts',
		body: 'From game nights and prayer retreats to city outreach events — there is always something happening for students at Psalms & Hymns Parish.',
	},
	{
		icon: MessageCircle,
		title: 'Open Conversations',
		body: 'Got doubts? Big questions? Hard experiences? This is a space where honest faith conversations are not just allowed — they\'re encouraged.',
	},
	{
		icon: Star,
		title: 'Leadership Development',
		body: 'We invest in young leaders. Students who are hungry to grow are mentored, discipled, and given real opportunities to serve and lead within the church.',
	},
]

export const Students = () => {
	return (
		<div className='space-y-16 sm:space-y-20'>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg'>
				<div
					className='absolute inset-0 bg-cover bg-center opacity-25'
					style={{ backgroundImage: "url('/youth ministry.png')" }}
				/>
				<div className='absolute inset-0 bg-gradient-to-br from-rccg-maroon/85 to-slate-900/90' />
				<div className='relative z-10 px-6 py-16 text-center sm:px-12 sm:py-24'>
					<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
						Students &amp; Young Adults
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						Your Faith Belongs
						<br />
						<span className='text-rccg-gold'>Here Too</span>
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-100/85 sm:text-base'>
						Whether you are a university student, college student, or young adult navigating
						life&apos;s big questions — you have a home at Psalms &amp; Hymns Parish. We exist
						to help you build a faith that lasts.
					</p>
					<a
						href='#connect'
						className='mt-8 inline-block rounded-full bg-rccg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
					>
						Get Involved
					</a>
				</div>
			</section>

			{/* WHAT WE OFFER */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						What We Offer
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						Built for Student Life
					</h2>
					<p className='mx-auto mt-3 max-w-2xl text-sm text-slate-500'>
						We have built spaces and programmes specifically designed to meet students
						where they are — academically, socially, and spiritually.
					</p>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{offerings.map(({ icon: Icon, title, body }) => (
						<div
							key={title}
							className='flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80'
						>
							<span className='flex h-10 w-10 items-center justify-center rounded-lg bg-rccg-red/10'>
								<Icon className='h-5 w-5 text-rccg-red' aria-hidden />
							</span>
							<h3 className='mt-4 text-sm font-bold text-slate-900'>{title}</h3>
							<p className='mt-1.5 flex-1 text-xs leading-relaxed text-slate-600'>{body}</p>
						</div>
					))}
				</div>
			</section>

			{/* TESTIMONY CALLOUT */}
			<section className='rounded-2xl bg-rccg-red/5 px-6 py-12 ring-1 ring-rccg-red/10'>
				<div className='mx-auto max-w-3xl text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.22em] text-rccg-red'>
						A Word for You
					</p>
					<blockquote className='mt-4 text-lg font-semibold italic leading-relaxed text-slate-800 sm:text-xl'>
						&ldquo;Don&apos;t let anyone look down on you because you are young, but set an
						example for the believers in speech, in conduct, in love, in faith and in purity.&rdquo;
					</blockquote>
					<cite className='mt-3 block text-xs font-semibold tracking-wide text-slate-400'>
						1 Timothy 4:12
					</cite>
				</div>
			</section>

			{/* SCHEDULE SNAPSHOT */}
			<section className='space-y-6'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						When We Meet
					</p>
					<h2 className='mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl'>
						Key Times for Students
					</h2>
				</div>
				<div className='mx-auto grid max-w-3xl gap-4 sm:grid-cols-3'>
					{[
						{ day: 'Sunday', time: '3:00 pm – 5:00 pm', name: 'Sunday Service', note: 'All welcome — great for community' },
						{ day: 'Tuesday', time: '8:00 pm – 9:00 pm', name: 'Bible Study', note: 'Online — perfect for busy schedules' },
						{ day: 'Thursday', time: '7:00 pm – 8:00 pm', name: 'Faith Clinic', note: 'Online — prayer and faith questions' },
					].map((s) => (
						<div key={s.name} className='rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm'>
							<p className='text-[10px] font-bold uppercase tracking-[0.2em] text-rccg-red'>{s.day}</p>
							<p className='mt-1 text-sm font-extrabold text-slate-900'>{s.name}</p>
							<p className='mt-1 text-xs font-semibold text-slate-600'>{s.time}</p>
							<p className='mt-2 text-[11px] text-slate-400'>{s.note}</p>
						</div>
					))}
				</div>
			</section>

			{/* CONNECT CTA */}
			<section id='connect' className='rounded-2xl bg-slate-900 px-6 py-12 text-center text-white shadow-lg'>
				<h2 className='text-xl font-extrabold tracking-tight sm:text-2xl'>
					Ready to Connect?
				</h2>
				<p className='mx-auto mt-2 max-w-lg text-sm text-slate-300'>
					We would love to hear from you. Drop us a message, join us on Sunday, or
					come along to a midweek session. You belong here.
				</p>
				<div className='mt-7 flex flex-wrap justify-center gap-3'>
					<Link
						to='/contact'
						className='rounded-full bg-rccg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
					>
						Get in Touch
					</Link>
					<Link
						to='/prayer-request'
						className='rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:bg-white/10'
					>
						Submit a Prayer Request
					</Link>
				</div>
			</section>
		</div>
	)
}
