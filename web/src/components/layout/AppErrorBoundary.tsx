import type { ReactNode } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

type AppErrorBoundaryProps = {
	children: ReactNode
}

type AppErrorBoundaryState = {
	hasError: boolean
}

export class AppErrorBoundary extends React.Component<
	AppErrorBoundaryProps,
	AppErrorBoundaryState
> {
	state: AppErrorBoundaryState = {
		hasError: false,
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: unknown, info: unknown) {
		console.error('[AppErrorBoundary] Uncaught error', error, info)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='flex min-h-screen flex-col items-center justify-center bg-rccg-cream px-4 text-center text-slate-800'>
					<h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
						Something went wrong
					</h1>
					<p className='mt-2 max-w-md text-sm text-slate-600'>
						An unexpected error occurred while loading the site. You can refresh
						the page or return to the homepage.
					</p>
					<div className='mt-4 flex flex-wrap justify-center gap-3'>
						<button
							type='button'
							onClick={() => window.location.reload()}
							className='rounded-full bg-rccg-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rccg-maroon'
						>
							Refresh
						</button>
						<Link
							to='/'
							className='rounded-full border-2 border-rccg-red px-4 py-2 text-sm font-semibold text-rccg-red transition hover:bg-rccg-red/10'
						>
							Go to Home
						</Link>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

