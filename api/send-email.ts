import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

/**
 * Vercel sometimes provides JSON as a string, Buffer, or parsed object depending on
 * runtime and routing. Normalize to a plain object for validation.
 */
function getJsonBody(req: VercelRequest): unknown {
	const raw = req.body as unknown

	if (raw === undefined || raw === null) return null

	if (typeof raw === 'object' && !Buffer.isBuffer(raw)) {
		return raw
	}

	const str =
		typeof raw === 'string'
			? raw
			: Buffer.isBuffer(raw)
				? raw.toString('utf8')
				: String(raw)
	const trimmed = str.trim()
	if (!trimmed) return null
	try {
		return JSON.parse(trimmed) as unknown
	} catch {
		return null
	}
}

function applyCors(req: VercelRequest, res: VercelResponse): void {
	const allowed =
		process.env.FORM_ALLOWED_ORIGINS?.split(',')
			.map((s) => s.trim())
			.filter(Boolean) ?? []
	const origin = req.headers.origin
	if (origin && allowed.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin)
		res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		res.setHeader('Vary', 'Origin')
	}
}

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

type Payload = ContactFormPayload | PrayerRequestPayload | MembershipPayload

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

function getSubject(context: FormContext): string {
	switch (context) {
		case 'contact-form':
			return '[RCCG Psalms & Hymns] New Contact Form'
		case 'prayer-request':
			return '[RCCG Psalms & Hymns] New Prayer Request'
		case 'membership-form':
			return '[RCCG Psalms & Hymns] New Membership Interest'
		default:
			return '[RCCG Psalms & Hymns] Form Submission'
	}
}

function formatEmailBody(payload: Payload): string {
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

function validatePayload(body: unknown): Payload | null {
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

export default async function handler(
	req: VercelRequest,
	res: VercelResponse,
): Promise<void> {
	applyCors(req, res)

	if (req.method === 'OPTIONS') {
		res.status(204).end()
		return
	}

	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST, OPTIONS')
		res.status(405).json({ error: 'Method not allowed' })
		return
	}

	const user = process.env.GMAIL_USER?.trim()
	const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS
	const pass = rawPass?.replace(/\s/g, '')?.trim() || ''
	const to = process.env.EMAIL_TO?.trim() || user

	if (!user || !pass) {
		console.error('[send-email] GMAIL_USER or GMAIL_APP_PASSWORD not configured. Set both in Vercel → Settings → Environment Variables, then redeploy.')
		res.status(500).json({ error: 'Email service not configured' })
		return
	}

	const body = getJsonBody(req)
	const payload = validatePayload(body)
	if (!payload) {
		const bodyType =
			body === null
				? 'null'
				: typeof body === 'object'
					? 'object'
					: typeof body
		const ctx =
			body && typeof body === 'object' && 'context' in body
				? String((body as { context?: unknown }).context)
				: 'missing'
		console.error(
			'[send-email] Invalid request body (type=%s, context=%s)',
			bodyType,
			ctx,
		)
		res.status(400).json({ error: 'Invalid request body' })
		return
	}

	const subject = getSubject(payload.context)
	const text = formatEmailBody(payload)

	const replyTo =
		payload.context === 'contact-form'
			? payload.email
			: payload.context === 'membership-form'
				? payload.email
				: payload.context === 'prayer-request' &&
						payload.contact?.includes('@')
					? payload.contact
					: undefined

	const mailOptions = {
		from: `"RCCG Psalms & Hymns" <${user}>`,
		to: to || 'rccgpsalmshymns@gmail.com',
		subject,
		text,
		replyTo,
	}

	// Try port 587 (STARTTLS) first, then 465 (SSL) - some networks block 587
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
		try {
			await trySend(587, false)
		} catch (err587) {
			console.warn('[send-email] Port 587 failed, trying 465:', err587)
			await trySend(465, true)
		}
		res.status(200).json({ success: true })
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err)
		console.error('[send-email] Failed to send:', msg, err)
		// Don't expose internal errors to client; log full details in Vercel
		res.status(500).json({ error: 'Failed to send email' })
	}
}
