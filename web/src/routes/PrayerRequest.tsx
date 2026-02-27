import { PrayerRequestForm } from '@/components/forms/PrayerRequestForm'
import { Heart, Lock, Users } from 'lucide-react'

const promises = [
	{
		icon: Heart,
		title: 'We Will Pray',
		body: 'Every request submitted is brought before God by our dedicated prayer team. You are not praying alone.',
	},
	{
		icon: Lock,
		title: 'Completely Confidential',
		body: 'Your prayer requests are treated with the utmost care and discretion. They will never be shared without your consent.',
	},
	{
		icon: Users,
		title: 'A Community Behind You',
		body: 'You are surrounded by a community that genuinely cares. Whatever you are facing, you do not have to face it alone.',
	},
]

export const PrayerRequest = () => {
	return (
		<div className='space-y-14 sm:space-y-18'>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-maroon text-white shadow-lg'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06),transparent_60%)]' />
				<div className='relative z-10 px-6 py-14 text-center sm:px-12 sm:py-20'>
					<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
						Prayer
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						Cast Your Cares on Him
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base'>
						God hears every prayer. Share what is on your heart — our prayer team will
						stand with you and lift your request before the Lord.
					</p>
					<blockquote className='mx-auto mt-6 max-w-xl text-sm italic text-white/70'>
						&ldquo;Cast all your anxiety on him because he cares for you.&rdquo;
						<br />
						<span className='not-italic font-semibold text-rccg-gold text-xs'>— 1 Peter 5:7</span>
					</blockquote>
				</div>
			</section>

			{/* PROMISES */}
			<section className='grid gap-6 sm:grid-cols-3'>
				{promises.map(({ icon: Icon, title, body }) => (
					<div
						key={title}
						className='flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/80'
					>
						<span className='flex h-11 w-11 items-center justify-center rounded-full bg-rccg-red/10'>
							<Icon className='h-5 w-5 text-rccg-red' aria-hidden />
						</span>
						<h3 className='mt-4 text-sm font-bold text-slate-900'>{title}</h3>
						<p className='mt-2 text-xs leading-relaxed text-slate-500'>{body}</p>
					</div>
				))}
			</section>

			{/* FORM */}
			<section className='mx-auto max-w-2xl space-y-5'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						Submit Your Request
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900'>
						Tell Us What&apos;s on Your Heart
					</h2>
					<p className='mx-auto mt-2 max-w-lg text-sm text-slate-500'>
						Fill in as much or as little as you&apos;re comfortable sharing. Your name and
						contact details are completely optional.
					</p>
				</div>
				<PrayerRequestForm />
			</section>

			{/* ADDITIONAL ENCOURAGEMENT */}
			<section className='rounded-2xl bg-slate-50 px-6 py-10 text-center ring-1 ring-slate-200'>
				<p className='text-sm font-semibold text-slate-700'>
					Prefer to speak with someone directly?
				</p>
				<p className='mt-1 text-sm text-slate-500'>
					Our pastoral team is available to talk, pray, and support you.
				</p>
				<div className='mt-5 flex flex-wrap justify-center gap-3'>
					<a
						href='tel:+447724812795'
						className='rounded-full bg-rccg-red px-6 py-2.5 text-xs font-bold text-white no-underline shadow-sm transition hover:bg-rccg-maroon'
					>
						Call Us
					</a>
					<a
						href='mailto:rccgpsalmshymns@gmail.com'
						className='rounded-full border border-slate-300 px-6 py-2.5 text-xs font-bold text-slate-700 no-underline transition hover:bg-slate-100'
					>
						Email Us
					</a>
				</div>
			</section>
		</div>
	)
}
