/**
 * Shared by api/send-email (Vercel) and Vite dev middleware.
 * Keep in sync with form payload shapes in web/src/lib/submitForm.ts
 */
import nodemailer from 'nodemailer'

const CONTEXTS = ['contact-form', 'prayer-request', 'membership-form'] as const
type FormContext = (typeof CONTEXTS)[number]

interface ContactFormPayload {
	context: 'contact-form'
	name: string
	email: string
	phone: string
	message: string
}

interface PrayerRequestPayload {
	context: 'prayer-request'
	name?: string
	contact?: string
	request: string
}

interface MembershipPayload {
	context: 'membership-form'
	name: string
	email: string
	phone: string
	note?: string
}

export type FormEmailPayload =
	| ContactFormPayload
	| PrayerRequestPayload
	| MembershipPayload

function formatContactEmail(data: ContactFormPayload): string {
	return `
New Contact Form Submission
===========================

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
`.trim()
}

function formatPrayerRequestEmail(data: PrayerRequestPayload): string {
	const lines: string[] = ['New Prayer Request', '==================', '']
	if (data.name) lines.push(`Name: ${data.name}`)
	if (data.contact) lines.push(`Contact: ${data.contact}`)
	if (data.name || data.contact) lines.push('')
	lines.push('Request:', data.request)
	return lines.join('\n')
}

function formatMembershipEmail(data: MembershipPayload): string {
	const noteSection = data.note ? `\n\nHow we can support: ${data.note}` : ''
	return `
New Membership Interest
=======================

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}${noteSection}
`.trim()
}

/** Safe fragment for email display name / subject (no CR/LF/quotes). */
function safeHeaderFragment(value: string, maxLen: number): string {
	return value
		.replace(/[\r\n"]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, maxLen)
}

function getSubject(payload: FormEmailPayload): string {
	switch (payload.context) {
		case 'contact-form':
			return `[RCCG Psalms & Hymns] Contact from ${safeHeaderFragment(payload.name, 48)} (${safeHeaderFragment(payload.email, 64)})`
		case 'prayer-request':
			return '[RCCG Psalms & Hymns] New Prayer Request'
		case 'membership-form':
			return `[RCCG Psalms & Hymns] Membership: ${safeHeaderFragment(payload.name, 48)} (${safeHeaderFragment(payload.email, 64)})`
		default:
			return '[RCCG Psalms & Hymns] Form Submission'
	}
}

/**
 * Inbox "From" shows the visitor; SMTP still uses your Gmail login (required by Gmail).
 * Reply / Reply-All uses replyTo → goes to the visitor.
 */
function getFromHeader(payload: FormEmailPayload, mailboxUser: string): string {
	const church = 'RCCG Psalms & Hymns'
	switch (payload.context) {
		case 'contact-form':
			return `"${safeHeaderFragment(payload.name, 50)} (${safeHeaderFragment(payload.email, 90)})" <${mailboxUser}>`
		case 'membership-form':
			return `"${safeHeaderFragment(payload.name, 50)} (${safeHeaderFragment(payload.email, 90)})" <${mailboxUser}>`
		case 'prayer-request': {
			const bits: string[] = []
			if (payload.name) bits.push(safeHeaderFragment(payload.name, 50))
			if (payload.contact?.includes('@')) {
				bits.push(`(${safeHeaderFragment(payload.contact, 90)})`)
			} else if (payload.contact) {
				bits.push(`(${safeHeaderFragment(payload.contact, 40)})`)
			}
			const label = bits.length > 0 ? bits.join(' ') : 'Prayer request'
			return `"${label} — ${church}" <${mailboxUser}>`
		}
		default:
			return `"${church}" <${mailboxUser}>`
	}
}

function formatEmailBody(payload: FormEmailPayload): string {
	switch (payload.context) {
		case 'contact-form':
			return formatContactEmail(payload)
		case 'prayer-request':
			return formatPrayerRequestEmail(payload)
		case 'membership-form':
			return formatMembershipEmail(payload)
		default:
			return JSON.stringify(payload, null, 2)
	}
}

export function validateFormEmailPayload(body: unknown): FormEmailPayload | null {
	if (!body || typeof body !== 'object') return null
	const obj = body as Record<string, unknown>

	const context = obj.context
	if (typeof context !== 'string' || !CONTEXTS.includes(context as FormContext)) {
		return null
	}

	if (context === 'contact-form') {
		if (
			typeof obj.name === 'string' &&
			typeof obj.email === 'string' &&
			typeof obj.phone === 'string' &&
			typeof obj.message === 'string'
		) {
			return {
				context: 'contact-form',
				name: obj.name.trim(),
				email: obj.email.trim(),
				phone: obj.phone.trim(),
				message: obj.message.trim(),
			}
		}
		return null
	}

	if (context === 'prayer-request') {
		if (typeof obj.request === 'string' && obj.request.trim().length >= 10) {
			return {
				context: 'prayer-request',
				name: typeof obj.name === 'string' ? obj.name.trim() : undefined,
				contact: typeof obj.contact === 'string' ? obj.contact.trim() : undefined,
				request: obj.request.trim(),
			}
		}
		return null
	}

	if (context === 'membership-form') {
		if (
			typeof obj.name === 'string' &&
			typeof obj.email === 'string' &&
			typeof obj.phone === 'string'
		) {
			return {
				context: 'membership-form',
				name: obj.name.trim(),
				email: obj.email.trim(),
				phone: obj.phone.trim(),
				note: typeof obj.note === 'string' ? obj.note.trim() : undefined,
			}
		}
		return null
	}

	return null
}

export interface GmailSmtpEnv {
	gmailUser: string
	gmailAppPassword: string
	emailTo?: string
}

export async function sendFormEmailViaGmail(
	payload: FormEmailPayload,
	env: GmailSmtpEnv,
): Promise<void> {
	const user = env.gmailUser.trim()
	const pass = env.gmailAppPassword.replace(/\s/g, '').trim()
	const to = env.emailTo?.trim() || user

	const subject = getSubject(payload)
	const text = formatEmailBody(payload)

	const replyTo =
		payload.context === 'contact-form'
			? payload.email
			: payload.context === 'membership-form'
				? payload.email
				: payload.context === 'prayer-request' && payload.contact?.includes('@')
					? payload.contact
					: undefined

	const mailOptions = {
		from: getFromHeader(payload, user),
		to: to || 'rccgpsalmshymns@gmail.com',
		subject,
		text,
		replyTo,
	}

	const trySend = async (port: number, secure: boolean) => {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port,
			secure,
			auth: { user, pass },
		})
		await transporter.verify()
		await transporter.sendMail(mailOptions)
	}

	try {
		await trySend(587, false)
	} catch (err587) {
		console.warn('[formEmailCore] Port 587 failed, trying 465:', err587)
		await trySend(465, true)
	}
}
