import { Link } from 'react-router-dom'

export const NotFound = () => {
	return (
		<div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center'>
			<p className='text-sm font-semibold uppercase tracking-[0.25em] text-rccg-red'>
				404
			</p>
			<h1 className='text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
				Page not found
			</h1>
			<p className='max-w-md text-slate-600 sm:text-base'>
				The page you are looking for may have been moved or is not yet
				published. Please check the URL or return to the homepage.
			</p>
			<div className='flex flex-wrap justify-center gap-3 pt-2'>
				<Link
					to='/'
					className='rounded-full bg-rccg-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rccg-maroon'
				>
					Back to Home
				</Link>
				<Link
					to='/contact'
					className='rounded-full border-2 border-rccg-red px-4 py-2 text-sm font-semibold text-rccg-red transition hover:bg-rccg-red/10'
				>
					Contact Us
				</Link>
			</div>
		</div>
	)
}

