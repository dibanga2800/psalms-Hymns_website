import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
	sendFormEmailViaGmail,
	validateFormEmailPayload,
} from '../formEmailCore'

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
	const emailTo = process.env.EMAIL_TO?.trim()

	if (!user || !pass) {
		console.error('[send-email] GMAIL_USER or GMAIL_APP_PASSWORD not configured. Set both in Vercel → Settings → Environment Variables, then redeploy.')
		res.status(500).json({ error: 'Email service not configured' })
		return
	}

	const body = getJsonBody(req)
	const payload = validateFormEmailPayload(body)
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

	try {
		await sendFormEmailViaGmail(payload, {
			gmailUser: user,
			gmailAppPassword: pass,
			emailTo,
		})
		res.status(200).json({ success: true })
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err)
		console.error('[send-email] Failed to send:', msg, err)
		res.status(500).json({ error: 'Failed to send email' })
	}
}
