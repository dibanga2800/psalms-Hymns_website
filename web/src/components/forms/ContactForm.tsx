import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

import { submitForm } from '@/lib/submitForm'

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Valid email is required'),
	phone: z
		.string()
		.min(7, 'Phone number is required')
		.max(20, 'Phone number looks too long'),
	message: z.string().min(10, 'Please enter at least 10 characters'),
})

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export const ContactForm = () => {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [captchaError, setCaptchaError] = useState<string | null>(null)
	const [captcha, setCaptcha] = useState(() => {
		const a = Math.floor(Math.random() * 5) + 2
		const b = Math.floor(Math.random() * 5) + 2
		return { a, b, solution: a + b }
	})

	const regenerateCaptcha = () => {
		const a = Math.floor(Math.random() * 5) + 2
		const b = Math.floor(Math.random() * 5) + 2
		setCaptcha({ a, b, solution: a + b })
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		if (String(formData.get('website')).trim()) return
		const values = {
			name: String(formData.get('name') ?? ''),
			email: String(formData.get('email') ?? ''),
			phone: String(formData.get('phone') ?? ''),
			message: String(formData.get('message') ?? ''),
			captcha: String(formData.get('captcha') ?? ''),
		}

		setCaptchaError(null)

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
			setFormState('error')
			return
		}

		const answer = Number(values.captcha.trim())
		if (!Number.isFinite(answer) || answer !== captcha.solution) {
			setCaptchaError('Please answer the anti-spam question correctly.')
			setFormState('error')
			return
		}

		setErrors({})
		setCaptchaError(null)
		setFormState('submitting')

		try {
			await submitForm({
				context: 'contact-form',
				name: parsed.data.name,
				email: parsed.data.email,
				phone: parsed.data.phone,
				message: parsed.data.message,
			})
			setFormState('success')
			event.currentTarget.reset()
			regenerateCaptcha()
		} catch (error) {
			console.error('[contact] Failed to submit contact form', error)
			setFormState('error')
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='relative space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
		>
			<div className='absolute -left-[9999px] top-0' aria-hidden>
				<label htmlFor='contact-website'>Website</label>
				<input id='contact-website' name='website' type='text' tabIndex={-1} autoComplete='off' />
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='name'
					className='block text-sm font-medium text-slate-800'
				>
					Name
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
					htmlFor='phone'
					className='block text-sm font-medium text-slate-800'
				>
					Phone number
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
					htmlFor='email'
					className='block text-sm font-medium text-slate-800'
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
					htmlFor='captcha'
					className='block text-sm font-medium text-slate-800'
				>
					Anti-spam check
				</label>
				<p className='text-xs text-slate-500'>
					What is {captcha.a} + {captcha.b}?
				</p>
				<input
					id='captcha'
					name='captcha'
					type='text'
					inputMode='numeric'
					className='mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{captchaError && (
					<p className='text-xs text-red-400'>{captchaError}</p>
				)}
			</div>
			<div className='space-y-1'>
				<label
					htmlFor='message'
					className='block text-sm font-medium text-slate-800'
				>
					Message
				</label>
				<textarea
					id='message'
					name='message'
					rows={4}
					className='block w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
				/>
				{errors.message && (
					<p className='text-xs text-red-400'>{errors.message}</p>
				)}
			</div>
			<button
				type='submit'
				disabled={formState === 'submitting'}
				className='inline-flex items-center justify-center rounded-full bg-rccg-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rccg-maroon disabled:cursor-not-allowed disabled:opacity-70'
			>
				{formState === 'submitting' ? 'Sending...' : 'Send message'}
			</button>
			{formState === 'success' && (
				<p className='text-xs text-emerald-400'>
					Thank you. Your message has been recorded.
				</p>
			)}
			{formState === 'error' && (
				<p className='text-xs text-red-400'>
					Something went wrong. Please try again or contact us directly.
				</p>
			)}
		</form>
	)
}

