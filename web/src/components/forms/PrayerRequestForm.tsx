import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
	name: z.string().optional(),
	contact: z.string().optional(),
	request: z.string().min(10, 'Please enter at least 10 characters'),
})

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export const PrayerRequestForm = () => {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const values = {
			name: String(formData.get('name') ?? ''),
			contact: String(formData.get('contact') ?? ''),
			request: String(formData.get('request') ?? ''),
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
			console.info('Prayer request submitted', parsed.data)
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
			<button
				type='submit'
				disabled={formState === 'submitting'}
				className='inline-flex items-center justify-center rounded-full bg-rccg-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rccg-maroon disabled:cursor-not-allowed disabled:opacity-70'
			>
				{formState === 'submitting' ? 'Sending...' : 'Submit request'}
			</button>
			{formState === 'success' && (
				<p className='text-xs text-emerald-400'>
					Your request has been recorded. Our prayer team will pray along with
					you.
				</p>
			)}
		</form>
	)
}

