/**
 * Utilities for adding events to calendar apps (Google Calendar, Apple Calendar, Outlook, etc.)
 */

export interface CalendarEvent {
	title?: string
	startDate?: string
	endDate?: string
	location?: string
	description?: string
	excerpt?: string
}

/** Convert ISO date to Google Calendar format (YYYYMMDDTHHMMSSZ) */
const toGoogleDate = (iso: string): string => {
	const d = new Date(iso)
	return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') + 'Z'
}

/** Convert ISO date to iCal format (YYYYMMDDTHHMMSSZ) */
const toIcsDate = (iso: string): string => {
	const d = new Date(iso)
	return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') + 'Z'
}

/** Escape special chars for iCal text fields */
const escapeIcsText = (text: string): string =>
	text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

/**
 * Build a Google Calendar "Add event" URL.
 * Opens in new tab; user can add to their Google Calendar with one click.
 */
export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
	const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
	const params = new URLSearchParams()

	if (event.title) params.set('text', event.title)

	if (event.startDate) {
		const start = toGoogleDate(event.startDate)
		const end = event.endDate
			? toGoogleDate(event.endDate)
			: toGoogleDate(new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString())
		params.set('dates', `${start}/${end}`)
	}

	if (event.description) params.set('details', event.description)
	if (event.location) params.set('location', event.location)

	return `${base}&${params.toString()}`
}

/**
 * Generate .ics file content for the event.
 * Works with Apple Calendar, Outlook, and most calendar apps.
 */
export const getIcsContent = (event: CalendarEvent): string => {
	const uid = `event-${event.startDate ?? Date.now()}-${Math.random().toString(36).slice(2)}@rccgpsalmshymns`
	const now = toIcsDate(new Date().toISOString())
	const start = event.startDate ? toIcsDate(event.startDate) : now
	const end = event.endDate
		? toIcsDate(event.endDate)
		: toIcsDate(new Date(new Date(event.startDate ?? Date.now()).getTime() + 2 * 60 * 60 * 1000).toISOString())
	const summary = event.title ? escapeIcsText(event.title) : 'Event'
	const description = event.description ? escapeIcsText(event.description) : ''
	const location = event.location ? escapeIcsText(event.location) : ''

	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//RCCG Psalms & Hymns Parish//Events//EN',
		'BEGIN:VEVENT',
		`UID:${uid}`,
		`DTSTAMP:${now}`,
		`DTSTART:${start}`,
		`DTEND:${end}`,
		`SUMMARY:${summary}`,
		description ? `DESCRIPTION:${description}` : '',
		location ? `LOCATION:${location}` : '',
		'END:VEVENT',
		'END:VCALENDAR',
	]
		.filter(Boolean)
		.join('\r\n')
}

/**
 * Trigger download of an .ics file for the event.
 */
export const downloadIcsFile = (event: CalendarEvent, filename?: string): void => {
	const content = getIcsContent(event)
	const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename ?? `${(event.title ?? 'event').replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}
