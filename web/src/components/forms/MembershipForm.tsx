import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

import { submitForm } from '@/lib/submitForm'
import { MathCaptchaField } from './MathCaptchaField'
import { useMathCaptcha } from '@/hooks/useMathCaptcha'

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Valid email is required'),
	phone: z.string().min(7, 'Phone number is required'),
	note: z.string().optional(),
})

type FormState = 'idle' | 'submitting' | 'success'

export const MembershipForm = () => {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [captchaError, setCaptchaError] = useState<string | null>(null)
	const [serverError, setServerError] = useState<string | null>(null)
	const captcha = useMathCaptcha()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		// Honeypot: bots often fill hidden fields — silently reject
		if (String(formData.get('website')).trim()) {
			return
		}

		const values = {
			name: String(formData.get('name') ?? ''),
			email: String(formData.get('email') ?? ''),
			phone: String(formData.get('phone') ?? ''),
			note: String(formData.get('note') ?? ''),
			captcha: String(formData.get('captcha') ?? ''),
		}

		setServerError(null)

		const parsed = schema.safeParse(values)

		if (!parsed.success) {
			const fieldErrors: Record<string, string> = {}
			for (const issue of parsed.error.issues) {
				const field = issue.path[0]
				if (typeof field === 'string' && !fieldErrors[field]) {
					fieldErrors[field] = issue.message
				}
			}
			setErrors(fieldErrors)
			setCaptchaError(null)
			return
		}

		const answer = Number(values.captcha.trim())
		if (!Number.isFinite(answer) || answer !== captcha.solution) {
			setCaptchaError('Please answer the anti-spam question correctly.')
			return
		}

		setErrors({})
		setCaptchaError(null)
		setFormState('submitting')

		try {
			await submitForm({
				context: 'membership-form',
				name: parsed.data.name,
				email: parsed.data.email,
				phone: parsed.data.phone,
				note: parsed.data.note || undefined,
			})
			setFormState('success')
			event.currentTarget.reset()
			captcha.regenerate()
		} catch (error) {
			console.error('[membership] Failed to submit', error)
			setFormState('idle')
			setServerError(
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again later.',
			)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
		>
			<div className='space-y-1'>
				<label
					htmlFor='name'
					className='block text-sm font-medium text-slate-800'
				>
					Full Name
				</label>
				<input
					id='name'
					name='name'
					type='text'
					className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{errors.name && (
					<p className='text-xs text-red-400'>{errors.name}</p>
				)}
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-slate-100'
				>
					Email
				</label>
				<input
					id='email'
					name='email'
					type='email'
					className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{errors.email && (
					<p className='text-xs text-red-400'>{errors.email}</p>
				)}
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='phone'
					className='block text-sm font-medium text-slate-100'
				>
					Phone
				</label>
				<input
					id='phone'
					name='phone'
					type='tel'
					className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{errors.phone && (
					<p className='text-xs text-red-400'>{errors.phone}</p>
				)}
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='note'
					className='block text-sm font-medium text-slate-800'
				>
					How can we support you? (optional)
				</label>
				<textarea
					id='note'
					name='note'
					rows={3}
					className='block w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
			</div>
			{/* Honeypot: hidden from users, bots fill it */}
			<div className='absolute -left-[9999px] top-0' aria-hidden>
				<label htmlFor='website'>Website</label>
				<input id='website' name='website' type='text' tabIndex={-1} autoComplete='off' />
			</div>
			<MathCaptchaField
				a={captcha.a}
				b={captcha.b}
				onRegenerate={captcha.regenerate}
				error={captchaError}
			/>
			<button
				type='submit'
				disabled={formState === 'submitting'}
				className='inline-flex items-center justify-center rounded-full bg-rccg-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rccg-maroon disabled:cursor-not-allowed disabled:opacity-70'
			>
				{formState === 'submitting' ? 'Submitting...' : 'Submit'}
			</button>
			{formState === 'success' && (
				<p className='text-xs text-emerald-400'>
					Thank you for your interest in becoming a member. Our team will follow
					up with you shortly.
				</p>
			)}
			{serverError && (
				<p className='text-xs text-red-400' role='alert'>
					{serverError}
				</p>
			)}
		</form>
	)
}

