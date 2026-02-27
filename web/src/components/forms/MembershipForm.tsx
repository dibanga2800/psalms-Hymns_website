import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Valid email is required'),
	phone: z.string().min(7, 'Phone number is required'),
	note: z.string().optional(),
})

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export const MembershipForm = () => {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const values = {
			name: String(formData.get('name') ?? ''),
			email: String(formData.get('email') ?? ''),
			phone: String(formData.get('phone') ?? ''),
			note: String(formData.get('note') ?? ''),
		}

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

		setErrors({})
		setFormState('submitting')

		setTimeout(() => {
			console.info('Membership form submitted', parsed.data)
			setFormState('success')
			event.currentTarget.reset()
		}, 600)
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
					className='block text-sm font-medium text-slate-100'
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
		</form>
	)
}

