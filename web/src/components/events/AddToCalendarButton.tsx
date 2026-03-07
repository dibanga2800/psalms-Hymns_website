import { useEffect, useRef, useState } from 'react'
import { CalendarPlus, ChevronDown, Download } from 'lucide-react'

import { downloadIcsFile, getGoogleCalendarUrl } from '@/lib/calendarUtils'
import type { EventSummary } from '@/lib/types'

interface AddToCalendarButtonProps {
	event: EventSummary
	variant?: 'default' | 'compact' | 'compactDark'
	className?: string
}

export const AddToCalendarButton = ({
	event,
	variant = 'default',
	className = '',
}: AddToCalendarButtonProps) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleOutside)
		return () => document.removeEventListener('mousedown', handleOutside)
	}, [])

	if (!event.startDate || new Date(event.startDate).getTime() < Date.now()) {
		return null
	}

	const googleUrl = getGoogleCalendarUrl(event)

	const handleDownloadIcs = () => {
		downloadIcsFile(event)
		setOpen(false)
	}

	const baseClasses =
		'inline-flex items-center justify-center gap-2 rounded-full font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rccg-red focus-visible:ring-offset-2'

	const isCompact = variant === 'compact' || variant === 'compactDark'

	const variantClasses =
		variant === 'compactDark'
			? 'bg-white/15 px-3 py-2 text-xs text-white hover:bg-white/25'
			: isCompact
				? 'bg-slate-100 px-3 py-2 text-xs text-slate-700 hover:bg-slate-200'
				: 'bg-rccg-red px-5 py-3 text-sm text-white shadow-sm hover:bg-rccg-maroon'

	return (
		<div ref={ref} className={`relative ${className}`} onClick={(e) => e.stopPropagation()}>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				className={`${baseClasses} ${variantClasses}`}
				aria-expanded={open}
				aria-haspopup='true'
				aria-label='Add to calendar'
			>
				<CalendarPlus className={isCompact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden />
				{!isCompact && <span>Add to Calendar</span>}
				<ChevronDown
					className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
					aria-hidden
				/>
			</button>

			{open && (
				<div
					className='absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl bg-white py-1.5 shadow-xl ring-1 ring-slate-200'
					role='menu'
				>
					<a
						href={googleUrl}
						target='_blank'
						rel='noopener noreferrer'
						role='menuitem'
						className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 no-underline transition hover:bg-slate-50'
						onClick={() => setOpen(false)}
					>
						<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100'>
							<CalendarPlus className='h-4 w-4 text-slate-600' aria-hidden />
						</span>
						<span>Google Calendar</span>
					</a>
					<button
						type='button'
						role='menuitem'
						onClick={handleDownloadIcs}
						className='flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50'
					>
						<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100'>
							<Download className='h-4 w-4 text-slate-600' aria-hidden />
						</span>
						<span>Apple / Outlook (.ics)</span>
					</button>
				</div>
			)}
		</div>
	)
}
