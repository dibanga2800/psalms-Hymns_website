import {
	Clock,
	MapPin,
	Smile,
	Coffee,
	Music,
	BookOpen,
	ChevronDown,
	Shirt,
	UserCheck,
	Car,
	Baby,
	MessageCircle,
	Calendar,
	HandHeart,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { PageSEO } from '@/components/common/PageSEO'

interface FaqItem {
	question: string
	answer: string
	icon: typeof Clock
}

const faqs: FaqItem[] = [
	{
		question: 'What should I wear?',
		answer:
			'Come as you are — we want you to feel comfortable. You will find people in everything from casual clothes to smart attire. There is no dress code.',
		icon: Shirt,
	},
	{
		question: 'How long does the service last?',
		answer:
			'Our Sunday service typically runs from 3:00 pm to 5:00 pm — about two hours. It includes praise and worship, announcements, and a sermon.',
		icon: Clock,
	},
	{
		question: 'Will I be put on the spot?',
		answer:
			'Absolutely not. First-time visitors are never singled out or asked to stand up against their will. You are free to simply observe and take it all in.',
		icon: UserCheck,
	},
	{
		question: 'Is there parking?',
		answer:
			'There is street parking available near Emery Street, Cobridge, Stoke-on-Trent ST6 2JJ. We recommend arriving a few minutes early to find a comfortable spot.',
		icon: Car,
	},
	{
		question: 'What about my children?',
		answer:
			"Children are very welcome at our services. Our children's ministry caters for young people during the service. Please speak to any of our welcome team on arrival.",
		icon: Baby,
	},
	{
		question: 'Can I get more information before I come?',
		answer:
			'Yes! Feel free to reach out to us via the contact page or call us on +44 7724 812795. We are happy to answer any questions you have.',
		icon: MessageCircle,
	},
]

const FaqRow = ({ item }: { item: FaqItem }) => {
	const [open, setOpen] = useState(false)
	const Icon = item.icon
	return (
		<div
			className={`overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-300 ${
				open ? 'border-rccg-red/30 shadow-md ring-2 ring-rccg-red/10' : 'border-slate-200/80'
			}`}
		>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				className='flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5'
				aria-expanded={open}
			>
				<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rccg-red/10'>
					<Icon className='h-5 w-5 text-rccg-red' aria-hidden />
				</span>
				<span className='flex-1 text-base font-semibold text-slate-800 sm:text-lg'>
					{item.question}
				</span>
				<ChevronDown
					className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
					aria-hidden
				/>
			</button>
			{open && (
				<div className='border-t border-slate-100 bg-slate-50/50 px-5 pb-5 pt-4 sm:px-6'>
					<p className='text-base leading-relaxed text-slate-600'>{item.answer}</p>
				</div>
			)}
		</div>
	)
}

const expectItems = [
	{
		icon: Smile,
		title: 'A Warm Welcome',
		body: 'From the moment you walk in, our welcome team will greet you with a smile and help you feel at home. No one should feel lost or invisible here.',
		gradient: 'from-amber-500/20 to-orange-500/10',
		iconBg: 'bg-amber-500/15',
		iconColor: 'text-amber-600',
	},
	{
		icon: Music,
		title: 'Spirit-Led Worship',
		body: 'We open every service with heartfelt praise and worship — expect uplifting music, singing, and an atmosphere of genuine encounter with God.',
		gradient: 'from-violet-500/20 to-purple-500/10',
		iconBg: 'bg-violet-500/15',
		iconColor: 'text-violet-600',
	},
	{
		icon: BookOpen,
		title: 'Practical Bible Teaching',
		body: 'Our messages are grounded in Scripture, relevant to everyday life, and delivered in a way that is easy to understand regardless of your background.',
		gradient: 'from-emerald-500/20 to-teal-500/10',
		iconBg: 'bg-emerald-500/15',
		iconColor: 'text-emerald-600',
	},
	{
		icon: Coffee,
		title: 'Fellowship Afterwards',
		body: 'After service we love to connect over refreshments. It is a great time to meet the community, ask questions, and get to know people.',
		gradient: 'from-rose-500/20 to-pink-500/10',
		iconBg: 'bg-rose-500/15',
		iconColor: 'text-rose-600',
	},
	{
		icon: Clock,
		title: 'Service Times',
		body: 'Sunday Service runs from 3:00 pm – 5:00 pm. Doors open from 2:45 pm. We also have midweek Bible Study on Tuesdays at 8:00 pm (online).',
		gradient: 'from-sky-500/20 to-blue-500/10',
		iconBg: 'bg-sky-500/15',
		iconColor: 'text-sky-600',
	},
	{
		icon: MapPin,
		title: 'Where to Find Us',
		body: 'Emery Street, Cobridge, Stoke-on-Trent, ST6 2JJ. Street parking is available nearby. We look forward to seeing you!',
		gradient: 'from-rccg-red/20 to-rccg-maroon/10',
		iconBg: 'bg-rccg-red/15',
		iconColor: 'text-rccg-red',
	},
]

export const FirstTimers = () => {
	return (
		<div className='space-y-16 sm:space-y-24'>
			<PageSEO
				title='First Timers — Plan Your Visit'
				description="Visiting RCCG Psalms & Hymns Parish for the first time? Here's everything you need to know — what to expect, service times, location, and FAQs. You're warmly welcome."
				path='/first-timers'
				keywords='visiting a church for the first time Stoke-on-Trent, new to church Cobridge, first time church visit Staffordshire, welcoming church Stoke-on-Trent, family friendly church visit RCCG'
			/>

			{/* HERO — redesigned with decorative graphics */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-red text-white shadow-xl'>
				{/* Decorative background shapes */}
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl' />
					<div className='absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/10' style={{ width: 'min(90vw, 480px)' }} />
				</div>
				{/* Welcoming hands / heart graphic */}
				<div className='pointer-events-none absolute bottom-0 right-0 flex items-end justify-end opacity-20 sm:opacity-25'>
					<HandHeart className='h-48 w-48 text-white sm:h-64 sm:w-64' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24'>
					<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rccg-gold/20 shadow-lg'>
						<HandHeart className='h-7 w-7 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Welcome
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
						We&apos;re So Glad
						<br className='sm:hidden' />
						<span className='text-rccg-gold'> You&apos;re Here</span>
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg'>
						Whether this is your first time stepping into a church or you&apos;re just new to
						Psalms &amp; Hymns Parish, you are warmly welcomed. Here is everything you need to
						know before your first visit.
					</p>
				</div>
			</section>

			{/* WHAT TO EXPECT — cards with larger icons and gradients */}
			<section className='space-y-10'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						Your First Visit
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						What to Expect
					</h2>
					<p className='mx-auto mt-3 max-w-xl text-base text-slate-500'>
						From arrival to fellowship — here&apos;s a glimpse of your Sunday with us.
					</p>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{expectItems.map(({ icon: Icon, title, body, gradient, iconBg, iconColor }) => (
						<div
							key={title}
							className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-slate-300/80 sm:p-8`}
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

			{/* SCRIPTURE ENCOURAGEMENT — with decorative icon */}
			<section className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-rccg-gold/15 via-amber-50/80 to-rccg-gold/10 px-8 py-12 ring-1 ring-rccg-gold/20 sm:px-12 sm:py-14'>
				<div className='absolute left-6 top-1/2 -translate-y-1/2 opacity-20 sm:left-10'>
					<BookOpen className='h-24 w-24 text-rccg-gold' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative text-center'>
					<blockquote className='mx-auto max-w-2xl text-lg font-medium italic leading-relaxed text-slate-700 sm:text-xl md:text-2xl'>
						&ldquo;Come to me, all you who are weary and burdened, and I will give you rest.&rdquo;
					</blockquote>
					<cite className='mt-4 block text-sm font-bold tracking-wide text-slate-500'>
						Matthew 11:28
					</cite>
				</div>
			</section>

			{/* FAQ — with icons per question */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						Got Questions?
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						Frequently Asked Questions
					</h2>
					<p className='mx-auto mt-3 max-w-lg text-base text-slate-500'>
						Quick answers to the things visitors often ask.
					</p>
				</div>
				<div className='mx-auto max-w-2xl space-y-4'>
					{faqs.map((item) => (
						<FaqRow key={item.question} item={item} />
					))}
				</div>
			</section>

			{/* CTA — with icons on buttons */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
						Ready to Join Us?
					</h2>
					<p className='mx-auto mt-3 max-w-lg text-base text-slate-300 sm:text-lg'>
						We would love to see you this Sunday. If you have any questions first,
						do not hesitate to get in touch.
					</p>
					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link
							to='/service-times'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400 hover:shadow-amber-500/30'
						>
							<Calendar className='h-4.5 w-4.5' aria-hidden />
							Service Times
						</Link>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							<MessageCircle className='h-4.5 w-4.5' aria-hidden />
							Get in Touch
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
