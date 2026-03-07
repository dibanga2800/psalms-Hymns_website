import { PrayerRequestForm } from '@/components/forms/PrayerRequestForm'
import { Heart, Lock, Users, Phone, Mail, HandHeart } from 'lucide-react'
import { PageSEO } from '@/components/common/PageSEO'

const promises = [
	{
		icon: Heart,
		title: 'We Will Pray',
		body: 'Every request submitted is brought before God by our dedicated prayer team. You are not praying alone.',
		gradient: 'from-rose-500/20 to-pink-500/10',
		iconBg: 'bg-rose-500/15',
		iconColor: 'text-rose-600',
	},
	{
		icon: Lock,
		title: 'Completely Confidential',
		body: 'Your prayer requests are treated with the utmost care and discretion. They will never be shared without your consent.',
		gradient: 'from-violet-500/20 to-purple-500/10',
		iconBg: 'bg-violet-500/15',
		iconColor: 'text-violet-600',
	},
	{
		icon: Users,
		title: 'A Community Behind You',
		body: 'You are surrounded by a community that genuinely cares. Whatever you are facing, you do not have to face it alone.',
		gradient: 'from-emerald-500/20 to-teal-500/10',
		iconBg: 'bg-emerald-500/15',
		iconColor: 'text-emerald-600',
	},
]

export const PrayerRequest = () => {
	return (
		<div className='space-y-16 sm:space-y-24'>
			<PageSEO
				title='Prayer Request'
				description='Submit a prayer request to RCCG Psalms & Hymns Parish in Stoke-on-Trent. Our prayer team will intercede for you. All requests are confidential.'
				path='/prayer-request'
				keywords='prayer request Stoke-on-Trent, prayer support church Cobridge, submit prayer RCCG, intercessory prayer Staffordshire, prayer and worship church Stoke-on-Trent, Holy Ghost prayer service RCCG'
			/>

			{/* HERO — redesigned with decorative graphics */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-maroon text-white shadow-xl'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl' />
					<div className='absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/10' style={{ width: 'min(90vw, 480px)' }} />
				</div>
				<div className='pointer-events-none absolute bottom-0 right-0 flex items-end justify-end opacity-20 sm:opacity-25'>
					<Heart className='h-48 w-48 text-white sm:h-64 sm:w-64' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24'>
					<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rccg-gold/20 shadow-lg'>
						<HandHeart className='h-7 w-7 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Prayer
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
						Cast Your Cares
						<br className='sm:hidden' />
						<span className='text-rccg-gold'> on Him</span>
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg'>
						God hears every prayer. Share what is on your heart — our prayer team will
						stand with you and lift your request before the Lord.
					</p>
					<blockquote className='mx-auto mt-8 max-w-xl rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-base italic text-white/90 sm:text-lg'>
						&ldquo;Cast all your anxiety on him because he cares for you.&rdquo;
						<cite className='mt-2 block not-italic font-semibold text-rccg-gold text-sm'>
							— 1 Peter 5:7
						</cite>
					</blockquote>
				</div>
			</section>

			{/* PROMISES — cards with larger icons and gradients */}
			<section className='space-y-10'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						Our Commitment
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						You Are Not Alone
					</h2>
					<p className='mx-auto mt-3 max-w-xl text-base text-slate-500'>
						Every request is treated with care, confidentiality, and the support of our community.
					</p>
				</div>
				<div className='grid gap-6 sm:grid-cols-3'>
					{promises.map(({ icon: Icon, title, body, gradient, iconBg, iconColor }) => (
						<div
							key={title}
							className={`group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-slate-300/80 sm:p-8`}
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
								aria-hidden
							/>
							<span
								className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}
							>
								<Icon className='h-7 w-7' strokeWidth={2} aria-hidden />
							</span>
							<h3 className='relative mt-5 text-lg font-bold text-slate-900 sm:text-xl'>
								{title}
							</h3>
							<p className='relative mt-2 text-sm leading-relaxed text-slate-600 sm:text-base'>
								{body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* FORM */}
			<section className='mx-auto max-w-2xl space-y-8'>
				<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white px-6 py-8 text-center ring-1 ring-slate-200/80 sm:px-10 sm:py-10'>
					<div className='absolute left-6 top-1/2 -translate-y-1/2 opacity-15 sm:left-10'>
						<Heart className='h-20 w-20 text-rccg-red' strokeWidth={1.5} aria-hidden />
					</div>
					<div className='relative'>
						<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
							Submit Your Request
						</p>
						<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
							Tell Us What&apos;s on Your Heart
						</h2>
						<p className='mx-auto mt-3 max-w-lg text-base text-slate-500'>
							Fill in as much or as little as you&apos;re comfortable sharing. Your name and
							contact details are completely optional.
						</p>
					</div>
				</div>
				<PrayerRequestForm />
			</section>

			{/* ADDITIONAL ENCOURAGEMENT — with icons and decorative background */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-14'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<p className='text-base font-semibold text-white sm:text-lg'>
						Prefer to speak with someone directly?
					</p>
					<p className='mt-1 text-base text-slate-300'>
						Our pastoral team is available to talk, pray, and support you.
					</p>
					<div className='mt-6 flex flex-wrap justify-center gap-4'>
						<a
							href='tel:+447724812795'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400 hover:shadow-amber-500/30'
						>
							<Phone className='h-4.5 w-4.5' aria-hidden />
							Call Us
						</a>
						<a
							href='mailto:rccgpsalmshymns@gmail.com'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							<Mail className='h-4.5 w-4.5' aria-hidden />
							Email Us
						</a>
					</div>
				</div>
			</section>
		</div>
	)
}
