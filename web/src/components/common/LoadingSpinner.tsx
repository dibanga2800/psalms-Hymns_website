export const LoadingSpinner = () => {
	return (
		<div
			role='status'
			aria-live='polite'
			className='inline-flex items-center gap-2 text-xs text-slate-400'
		>
			<span className='h-3 w-3 animate-spin rounded-full border-2 border-rccg-red border-t-transparent' />
			<span>Loading...</span>
		</div>
	)
}

