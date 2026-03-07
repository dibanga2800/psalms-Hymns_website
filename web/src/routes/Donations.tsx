import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	CreditCard, Building2, Heart, Gift, CheckCircle2,
	Lock, ArrowRight, Globe, Mic2, ShieldCheck, Users,
} from 'lucide-react'

import { MathCaptchaField } from '@/components/forms/MathCaptchaField'
import { PageSEO } from '@/components/common/PageSEO'
import { useMathCaptcha } from '@/hooks/useMathCaptcha'

type GivingCategory = 'tithe' | 'offering' | 'building' | 'missions'
type Frequency = 'one-off' | 'monthly'
type FormState = 'idle' | 'submitting' | 'success'

interface CategoryOption {
	id: GivingCategory
	label: string
	description: string
	icon: typeof Heart
	colour: string
}

const categories: CategoryOption[] = [
	{
		id: 'tithe',
		label: 'Tithe',
		description: 'Honour God with the first tenth of your income.',
		icon: Gift,
		colour: 'bg-violet-600',
	},
	{
		id: 'offering',
		label: 'Offering',
		description: 'A freewill gift to support the work of the church.',
		icon: Heart,
		colour: 'bg-rccg-red',
	},
	{
		id: 'building',
		label: 'Building Fund',
		description: 'Invest in a permanent home for the parish.',
		icon: Building2,
		colour: 'bg-amber-500',
	},
	{
		id: 'missions',
		label: 'Missions',
		description: 'Support outreach locally and across the nations.',
		icon: Globe,
		colour: 'bg-emerald-600',
	},
]

const presetAmounts = [5, 10, 20, 50, 100, 200]

const impactItems = [
	{
		icon: Mic2,
		label: 'Worship & Ministry',
		body: 'Sunday services, midweek programmes, and ministry activities.',
		pct: 45,
		colour: 'bg-rccg-red',
	},
	{
		icon: Building2,
		label: 'Building Fund',
		body: 'Working towards a permanent home for the parish.',
		pct: 30,
		colour: 'bg-amber-500',
	},
	{
		icon: Users,
		label: 'Community Outreach',
		body: 'Welfare, feeding programmes, and local evangelism.',
		pct: 15,
		colour: 'bg-emerald-600',
	},
	{
		icon: Globe,
		label: 'Missions & Planting',
		body: 'Supporting the Gospel locally and across nations.',
		pct: 10,
		colour: 'bg-violet-600',
	},
]

export const Donations = () => {
	const [selectedCategory, setSelectedCategory] = useState<GivingCategory>('tithe')
	const [amount, setAmount] = useState<string>('')
	const [customAmount, setCustomAmount] = useState<string>('')
	const [frequency, setFrequency] = useState<Frequency>('one-off')
	const [formState, setFormState] = useState<FormState>('idle')
	const [captchaError, setCaptchaError] = useState<string | null>(null)
	const captcha = useMathCaptcha()

	const displayAmount = amount === 'custom' ? customAmount : amount
	const activeCat = categories.find((c) => c.id === selectedCategory)!

	const handlePreset = (val: number) => {
		setAmount(String(val))
		setCustomAmount('')
	}

	const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount('custom')
		setCustomAmount(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!displayAmount || Number(displayAmount) <= 0) return

		const formData = new FormData(e.currentTarget)
		if (String(formData.get('website')).trim()) return

		const answer = Number(String(formData.get('captcha') ?? '').trim())
		if (!Number.isFinite(answer) || answer !== captcha.solution) {
			setCaptchaError('Please answer the anti-spam question correctly.')
			return
		}

		setCaptchaError(null)
		setFormState('submitting')
		// TODO: replace with Stripe / PayPal SDK call
		setTimeout(() => {
			setFormState('success')
			captcha.regenerate()
		}, 1200)
	}

	const handleReset = () => {
		setAmount('')
		setCustomAmount('')
		setFrequency('one-off')
		setSelectedCategory('tithe')
		setFormState('idle')
		setCaptchaError(null)
		captcha.regenerate()
	}

	return (
		<div className='space-y-20 sm:space-y-24'>
			<PageSEO
				title='Give & Donations'
				description='Support the work of RCCG Psalms & Hymns Parish in Stoke-on-Trent through tithes, offerings, building fund and missions giving. Give online or by bank transfer.'
				path='/donations'
				keywords='church donations Stoke-on-Trent, tithe RCCG Cobridge, church giving Staffordshire, support RCCG Psalms Hymns, building fund church Stoke-on-Trent, church offering online'
			/>

			{/* ── HERO ──────────────────────────────────────────── */}
			<section className='relative overflow-hidden rounded-3xl bg-rccg-maroon text-white shadow-xl'>
				<div className='pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rccg-gold/20 blur-3xl' aria-hidden />
				<div className='pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-rccg-red/30 blur-3xl' aria-hidden />

				<div className='relative z-10 grid gap-0 lg:grid-cols-2'>
					{/* Left — copy */}
					<div className='flex flex-col justify-center px-8 py-16 sm:px-12 sm:py-20 lg:py-24'>
					<p className='text-[11px] font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Giving &amp; Donations
					</p>
					<h1 className='mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]'>
						Give Cheerfully,
						<br />
						<span className='text-rccg-gold'>Give Generously</span>
					</h1>
					<p className='mt-5 max-w-md text-base leading-relaxed text-slate-100/80 sm:text-lg'>
						Everything we have comes from God. Giving is an act of worship — a
						declaration that He is first in our lives. Thank you for partnering
						with us to advance the Kingdom.
					</p>
					<blockquote className='mt-6 border-l-2 border-rccg-gold/50 pl-4 text-base italic text-white/70'>
						&ldquo;God loves a cheerful giver.&rdquo;
						<cite className='mt-1 block not-italic text-sm font-semibold text-rccg-gold'>
							2 Corinthians 9:7
						</cite>
					</blockquote>

						{/* Quick trust signals */}
						<div className='mt-8 flex flex-wrap gap-4'>
							{[
								{ icon: ShieldCheck, label: 'Secure giving' },
								{ icon: Lock, label: 'Encrypted' },
								{ icon: CheckCircle2, label: 'Registered charity' },
							].map(({ icon: Icon, label }) => (
								<span key={label} className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80'>
									<Icon className='h-3.5 w-3.5 text-rccg-gold' aria-hidden />
									{label}
								</span>
							))}
						</div>
					</div>

					{/* Right — giving summary / stats */}
					<div className='flex flex-col justify-center gap-4 border-t border-white/10 px-8 py-10 sm:px-12 lg:border-l lg:border-t-0 lg:py-24'>
						<p className='text-[11px] font-bold uppercase tracking-[0.22em] text-rccg-gold/80'>
							Your gift funds
						</p>
						{impactItems.map((item) => (
							<div key={item.label} className='space-y-1.5'>
								<div className='flex items-center justify-between text-xs'>
									<span className='font-semibold text-white/90'>{item.label}</span>
									<span className='font-bold text-rccg-gold'>{item.pct}%</span>
								</div>
								<div className='h-1.5 w-full overflow-hidden rounded-full bg-white/10'>
									<div
										className={`h-full rounded-full ${item.colour}`}
										style={{ width: `${item.pct}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── MAIN CONTENT: FORM + SIDEBAR ──────────────────── */}
			<section className='grid gap-10 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]'>

				{/* LEFT — Giving form */}
				<div className='space-y-6'>
					<div>
						<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
							Make a Gift
						</p>
						<h2 className='mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
							Give Online
						</h2>
					</div>

					{formState === 'success' ? (
						<div className='flex flex-col items-center gap-6 rounded-2xl bg-emerald-50 px-8 py-16 text-center ring-1 ring-emerald-200'>
							<CheckCircle2 className='h-14 w-14 text-emerald-500' aria-hidden />
							<div>
								<h3 className='text-2xl font-extrabold text-slate-900'>Thank You!</h3>
								<p className='mt-2 max-w-sm text-base text-slate-600'>
									Thank you for your generosity. Please complete your gift of{' '}
									<span className='font-bold text-rccg-red'>£{displayAmount}</span>
									{frequency === 'monthly' ? ' per month ' : ' '}
									via bank transfer using the details in the sidebar. May God bless and multiply it back to you.
								</p>
							</div>
							<button
								type='button'
								onClick={handleReset}
								className='rounded-full border-2 border-slate-300 px-7 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100'
							>
								Give Again
							</button>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className='space-y-7 rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 sm:p-8'
						>
							{/* Step 1 — Category */}
							<fieldset className='space-y-3'>
								<legend className='flex items-center gap-2 text-sm font-bold text-slate-800'>
									<span className='flex h-5 w-5 items-center justify-center rounded-full bg-rccg-red text-[10px] font-extrabold text-white'>1</span>
									Giving Category
								</legend>
								<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
									{categories.map(({ id, label, icon: Icon, colour }) => (
										<button
											key={id}
											type='button'
											onClick={() => setSelectedCategory(id)}
											className={[
												'group flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-4 text-center transition',
												selectedCategory === id
													? 'border-rccg-red bg-rccg-red/5'
													: 'border-slate-100 bg-slate-50 hover:border-rccg-red/30',
											].join(' ')}
										>
											<span className={`flex h-8 w-8 items-center justify-center rounded-lg ${selectedCategory === id ? colour : 'bg-slate-200 group-hover:bg-slate-300'} transition`}>
												<Icon className='h-4 w-4 text-white' aria-hidden />
											</span>
											<span className={`text-[11px] font-bold ${selectedCategory === id ? 'text-rccg-red' : 'text-slate-600'}`}>
												{label}
											</span>
										</button>
									))}
								</div>
								<p className='text-xs text-slate-500'>{activeCat.description}</p>
							</fieldset>

							<hr className='border-slate-100' />

							{/* Step 2 — Frequency */}
							<fieldset className='space-y-3'>
								<legend className='flex items-center gap-2 text-sm font-bold text-slate-800'>
									<span className='flex h-5 w-5 items-center justify-center rounded-full bg-rccg-red text-[10px] font-extrabold text-white'>2</span>
									Frequency
								</legend>
								<div className='flex gap-3'>
									{(['one-off', 'monthly'] as const).map((f) => (
										<button
											key={f}
											type='button'
											onClick={() => setFrequency(f)}
											className={[
												'flex-1 rounded-xl border-2 py-3 text-sm font-bold transition',
												frequency === f
													? 'border-rccg-red bg-rccg-red text-white shadow-sm'
													: 'border-slate-100 bg-slate-50 text-slate-600 hover:border-rccg-red/40',
											].join(' ')}
										>
											{f === 'one-off' ? 'One-off Gift' : 'Give Monthly'}
										</button>
									))}
								</div>
								{frequency === 'monthly' && (
									<p className='text-[11px] text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2 ring-1 ring-emerald-100'>
										Monthly giving helps us plan and sustain our programmes. Thank you for your commitment!
									</p>
								)}
							</fieldset>

							<hr className='border-slate-100' />

							{/* Step 3 — Amount */}
							<fieldset className='space-y-3'>
								<legend className='flex items-center gap-2 text-sm font-bold text-slate-800'>
									<span className='flex h-5 w-5 items-center justify-center rounded-full bg-rccg-red text-[10px] font-extrabold text-white'>3</span>
									Amount
								</legend>
								<div className='grid grid-cols-3 gap-2 sm:grid-cols-6'>
									{presetAmounts.map((val) => (
										<button
											key={val}
											type='button'
											onClick={() => handlePreset(val)}
											className={[
												'rounded-xl border-2 py-3 text-sm font-bold transition',
												amount === String(val)
													? 'border-rccg-red bg-rccg-red text-white shadow-sm'
													: 'border-slate-100 bg-slate-50 text-slate-700 hover:border-rccg-red/40 hover:text-rccg-red',
											].join(' ')}
										>
											£{val}
										</button>
									))}
								</div>
								<div className='relative'>
									<span className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400'>
										£
									</span>
									<input
										type='number'
										min='1'
										placeholder='Enter another amount'
										value={customAmount}
										onChange={handleCustomChange}
										className='block w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-3 pl-8 pr-4 text-sm text-slate-800 outline-none transition focus:border-rccg-red focus:bg-white focus:ring-2 focus:ring-rccg-red/15'
									/>
								</div>
							</fieldset>

							<hr className='border-slate-100' />

							{/* Payment note */}
							<div className='flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4'>
								<CreditCard className='h-6 w-6 shrink-0 text-slate-400' aria-hidden />
								<div>
									<p className='text-sm font-semibold text-slate-700'>Complete via bank transfer</p>
									<p className='mt-0.5 text-sm text-slate-500'>
										Use the bank details in the sidebar to complete your gift. Online card payment is coming soon.
									</p>
								</div>
							</div>

							{/* Honeypot: hidden from users, bots fill it */}
							<div className='absolute -left-[9999px] top-0' aria-hidden>
								<label htmlFor='donations-website'>Website</label>
								<input id='donations-website' name='website' type='text' tabIndex={-1} autoComplete='off' />
							</div>

							<MathCaptchaField
								a={captcha.a}
								b={captcha.b}
								onRegenerate={captcha.regenerate}
								error={captchaError}
							/>

							{/* CTA */}
							<button
								type='submit'
								disabled={!displayAmount || Number(displayAmount) <= 0 || formState === 'submitting'}
								className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-rccg-red py-4 text-sm font-bold text-white shadow-md transition hover:bg-rccg-maroon disabled:cursor-not-allowed disabled:opacity-40'
							>
								{formState === 'submitting' ? (
									<span className='flex items-center gap-2'>
										<span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
										Processing…
									</span>
								) : (
									<>
										Give {displayAmount ? `£${displayAmount}` : 'Now'}
										{frequency === 'monthly' && ' / month'}
										<ArrowRight className='h-4 w-4' aria-hidden />
									</>
								)}
							</button>
							<p className='flex items-center justify-center gap-1.5 text-[11px] text-slate-400'>
								<Lock className='h-3 w-3' aria-hidden />
								Secure &amp; encrypted — your details are safe
							</p>
						</form>
					)}
				</div>

				{/* RIGHT — Sidebar: bank transfer + impact */}
				<aside className='space-y-6'>

					{/* Bank Transfer */}
					<div className='rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200'>
						<div className='flex items-center gap-3'>
							<span className='flex h-9 w-9 items-center justify-center rounded-lg bg-rccg-red/10'>
								<Building2 className='h-4.5 w-4.5 text-rccg-red' aria-hidden />
							</span>
							<h3 className='text-base font-bold text-slate-900'>Bank Transfer</h3>
						</div>
						<p className='mt-3 text-sm leading-relaxed text-slate-500'>
							Give directly via bank transfer. Use your name and giving category as the payment reference.
						</p>
						<dl className='mt-4 space-y-3'>
							{[
								{ label: 'Account Name', value: 'RCCG Psalms & Hymns Parish' },
								{ label: 'Sort Code', value: 'XX-XX-XX' },
								{ label: 'Account No.', value: 'XXXXXXXX' },
								{ label: 'Reference', value: 'Name + Category' },
							].map(({ label, value }) => (
								<div key={label} className='flex items-start justify-between gap-3 border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0'>
									<dt className='font-semibold text-slate-600'>{label}</dt>
									<dd className='text-right font-medium text-slate-800'>{value}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* What your gift does */}
					<div className='rounded-2xl bg-rccg-maroon p-6 text-white shadow-md'>
						<p className='text-[10px] font-bold uppercase tracking-[0.22em] text-rccg-gold'>
							Your Impact
						</p>
						<h3 className='mt-1 text-base font-extrabold'>
							Every pound makes a difference
						</h3>
						<ul className='mt-4 space-y-3'>
							{impactItems.map(({ icon: Icon, label, body, colour }) => (
								<li key={label} className='flex gap-3'>
									<span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${colour}`}>
										<Icon className='h-3.5 w-3.5 text-white' aria-hidden />
									</span>
									<div>
										<p className='text-sm font-bold text-white'>{label}</p>
										<p className='text-sm leading-relaxed text-white/65'>{body}</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* Need help */}
					<div className='rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200'>
						<p className='text-base font-semibold text-slate-800'>Questions about giving?</p>
						<p className='mt-1 text-sm text-slate-500'>
							Our team is happy to help with tithes, offerings, or the building fund.
						</p>
						<Link
							to='/contact'
							className='mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rccg-red no-underline transition hover:underline'
						>
							Contact us <ArrowRight className='h-3.5 w-3.5' aria-hidden />
						</Link>
					</div>
				</aside>
			</section>
		</div>
	)
}
