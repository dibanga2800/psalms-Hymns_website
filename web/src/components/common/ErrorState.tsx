type ErrorStateProps = {
	message?: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
	return (
		<div
			role='status'
			className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200'
		>
			{message ?? 'Something went wrong. Please try again.'}
		</div>
	)
}

