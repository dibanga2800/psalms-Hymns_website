import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

import { submitForm } from '@/lib/submitForm'
import { DevFormMockSuccessBanner } from './DevFormMockSuccessBanner'
import { MathCaptchaField } from './MathCaptchaField'
import { useMathCaptcha } from '@/hooks/useMathCaptcha'

const schema = z.object({
	name: z.string().optional(),
	contact: z.string().optional(),
	request: z.string().min(10, 'Please enter at least 10 characters'),
})

type FormState = 'idle' | 'submitting' | 'success'

export const PrayerRequestForm = () => {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [captchaError, setCaptchaError] = useState<string | null>(null)
	const [serverError, setServerError] = useState<string | null>(null)
	const [successKind, setSuccessKind] = useState<'real' | 'mock' | null>(null)
	const captcha = useMathCaptcha()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData(form)

		// Honeypot: bots often fill hidden fields
		if (String(formData.get('website')).trim()) return

		const values = {
			name: String(formData.get('name') ?? ''),
			contact: String(formData.get('contact') ?? ''),
			request: String(formData.get('request') ?? ''),
			captcha: String(formData.get('captcha') ?? ''),
		}

		setServerError(null)
		setSuccessKind(null)

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
			const { mock } = await submitForm({
				context: 'prayer-request',
				name: parsed.data.name || undefined,
				contact: parsed.data.contact || undefined,
				request: parsed.data.request,
			})
			setSuccessKind(mock ? 'mock' : 'real')
			setFormState('success')
			form.reset()
			captcha.regenerate()
		} catch (error) {
			console.error('[prayer-request] Failed to submit', error)
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
					Name (optional)
				</label>
				<input
					id='name'
					name='name'
					type='text'
					className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='contact'
					className='block text-sm font-medium text-slate-800'
				>
					Contact (phone or email, optional)
				</label>
				<input
					id='contact'
					name='contact'
					type='text'
					className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='request'
					className='block text-sm font-medium text-slate-800'
				>
					Prayer Request
				</label>
				<textarea
					id='request'
					name='request'
					rows={4}
					className='block w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{errors.request && (
					<p className='text-xs text-red-400'>{errors.request}</p>
				)}
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
				{formState === 'submitting' ? 'Sending...' : 'Submit request'}
			</button>
			{formState === 'success' && successKind === 'real' && (
				<p className='text-xs text-emerald-600'>
					Your request has been sent. Our prayer team will pray along with you.
				</p>
			)}
			{formState === 'success' && successKind === 'mock' && (
				<DevFormMockSuccessBanner />
			)}
			{serverError && (
				<p className='text-xs text-red-400' role='alert'>
					{serverError}
				</p>
			)}
		</form>
	)
}

