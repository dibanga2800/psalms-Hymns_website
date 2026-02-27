import { Clock, MapPin, Smile, Coffee, Music, BookOpen, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface FaqItem {
	question: string
	answer: string
}

const faqs: FaqItem[] = [
	{
		question: 'What should I wear?',
		answer: 'Come as you are — we want you to feel comfortable. You will find people in everything from casual clothes to smart attire. There is no dress code.',
	},
	{
		question: 'How long does the service last?',
		answer: 'Our Sunday service typically runs from 3:00 pm to 5:00 pm — about two hours. It includes praise and worship, announcements, and a sermon.',
	},
	{
		question: 'Will I be put on the spot?',
		answer: 'Absolutely not. First-time visitors are never singled out or asked to stand up against their will. You are free to simply observe and take it all in.',
	},
	{
		question: 'Is there parking?',
		answer: 'There is street parking available near Emery Street, Cobridge, Stoke-on-Trent ST6 2JJ. We recommend arriving a few minutes early to find a comfortable spot.',
	},
	{
		question: 'What about my children?',
		answer: 'Children are very welcome at our services. Our children\'s ministry caters for young people during the service. Please speak to any of our welcome team on arrival.',
	},
	{
		question: 'Can I get more information before I come?',
		answer: 'Yes! Feel free to reach out to us via the contact page or call us on +44 7724 812795. We are happy to answer any questions you have.',
	},
]

const FaqRow = ({ item }: { item: FaqItem }) => {
	const [open, setOpen] = useState(false)
	return (
		<div className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				className='flex w-full items-center justify-between px-5 py-4 text-left'
				aria-expanded={open}
			>
				<span className='text-sm font-semibold text-slate-800'>{item.question}</span>
				<ChevronDown
					className={`ml-4 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
					aria-hidden
				/>
			</button>
			{open && (
				<div className='border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600'>
					{item.answer}
				</div>
			)}
		</div>
	)
}

export const FirstTimers = () => {
	return (
		<div className='space-y-16 sm:space-y-20'>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-red text-white shadow-lg'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]' />
				<div className='relative z-10 px-6 py-14 text-center sm:px-12 sm:py-20'>
					<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
						Welcome
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						We&apos;re So Glad You&apos;re Here
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base'>
						Whether this is your first time stepping into a church or you&apos;re just new to
						Psalms &amp; Hymns Parish, you are warmly welcomed. Here is everything you need to
						know before your first visit.
					</p>
				</div>
			</section>

			{/* WHAT TO EXPECT */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						Your First Visit
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						What to Expect
					</h2>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{[
						{
							icon: Smile,
							title: 'A Warm Welcome',
							body: 'From the moment you walk in, our welcome team will greet you with a smile and help you feel at home. No one should feel lost or invisible here.',
						},
						{
							icon: Music,
							title: 'Spirit-Led Worship',
							body: 'We open every service with heartfelt praise and worship — expect uplifting music, singing, and an atmosphere of genuine encounter with God.',
						},
						{
							icon: BookOpen,
							title: 'Practical Bible Teaching',
							body: 'Our messages are grounded in Scripture, relevant to everyday life, and delivered in a way that is easy to understand regardless of your background.',
						},
						{
							icon: Coffee,
							title: 'Fellowship Afterwards',
							body: 'After service we love to connect over refreshments. It is a great time to meet the community, ask questions, and get to know people.',
						},
						{
							icon: Clock,
							title: 'Service Times',
							body: 'Sunday Service runs from 3:00 pm – 5:00 pm. Doors open from 2:45 pm. We also have midweek Bible Study on Tuesdays at 8:00 pm (online).',
						},
						{
							icon: MapPin,
							title: 'Where to Find Us',
							body: 'Emery Street, Cobridge, Stoke-on-Trent, ST6 2JJ. Street parking is available nearby. We look forward to seeing you!',
						},
					].map(({ icon: Icon, title, body }) => (
						<div key={title} className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80'>
							<span className='flex h-10 w-10 items-center justify-center rounded-lg bg-rccg-red/10'>
								<Icon className='h-5 w-5 text-rccg-red' aria-hidden />
							</span>
							<h3 className='mt-4 text-sm font-bold text-slate-900'>{title}</h3>
							<p className='mt-1.5 text-xs leading-relaxed text-slate-600'>{body}</p>
						</div>
					))}
				</div>
			</section>

			{/* SCRIPTURE ENCOURAGEMENT */}
			<section className='rounded-2xl bg-rccg-gold/10 px-8 py-10 text-center ring-1 ring-rccg-gold/20'>
				<blockquote className='mx-auto max-w-2xl text-base font-medium italic leading-relaxed text-slate-700 sm:text-lg'>
					&ldquo;Come to me, all you who are weary and burdened, and I will give you rest.&rdquo;
				</blockquote>
				<cite className='mt-3 block text-xs font-semibold tracking-wide text-slate-400'>
					Matthew 11:28
				</cite>
			</section>

			{/* FAQ */}
			<section className='space-y-6'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						Got Questions?
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						Frequently Asked Questions
					</h2>
				</div>
				<div className='mx-auto max-w-2xl space-y-3'>
					{faqs.map((item) => (
						<FaqRow key={item.question} item={item} />
					))}
				</div>
			</section>

			{/* CTA */}
			<section className='rounded-2xl bg-slate-900 px-6 py-12 text-center text-white shadow-lg'>
				<h2 className='text-xl font-extrabold tracking-tight sm:text-2xl'>
					Ready to Join Us?
				</h2>
				<p className='mx-auto mt-2 max-w-lg text-sm text-slate-300'>
					We would love to see you this Sunday. If you have any questions first,
					do not hesitate to get in touch.
				</p>
				<div className='mt-7 flex flex-wrap justify-center gap-3'>
					<Link
						to='/service-times'
						className='rounded-full bg-rccg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
					>
						Service Times
					</Link>
					<Link
						to='/contact'
						className='rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:bg-white/10'
					>
						Get in Touch
					</Link>
				</div>
			</section>
		</div>
	)
}
