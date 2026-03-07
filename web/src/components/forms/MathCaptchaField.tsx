interface MathCaptchaFieldProps {
	a: number
	b: number
	error?: string | null
	onRegenerate: () => void
}

export const MathCaptchaField = ({
	a,
	b,
	error,
	onRegenerate,
}: MathCaptchaFieldProps) => (
	<div className='space-y-1'>
		<label
			htmlFor='captcha'
			className='block text-sm font-medium text-slate-800'
		>
			Anti-spam check
		</label>
		<div className='flex flex-wrap items-center gap-2'>
			<p className='text-sm text-slate-600'>
				What is {a} + {b}?
			</p>
			<button
				type='button'
				onClick={onRegenerate}
				className='text-xs font-semibold text-rccg-red underline-offset-2 hover:underline'
				aria-label='Get a new question'
			>
				New question
			</button>
		</div>
		<input
			id='captcha'
			name='captcha'
			type='text'
			inputMode='numeric'
			autoComplete='off'
			className='mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-rccg-red focus:ring-2 focus:ring-rccg-red/20'
		/>
		{error && <p className='text-xs text-red-400'>{error}</p>}
	</div>
)
