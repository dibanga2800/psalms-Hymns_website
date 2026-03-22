const SEND_EMAIL_PATH = '/api/send-email'

export type FormPayload =
	| { context: 'contact-form'; name: string; email: string; phone: string; message: string }
	| { context: 'prayer-request'; name?: string; contact?: string; request: string }
	| { context: 'membership-form'; name: string; email: string; phone: string; note?: string }

export interface SubmitFormResult {
	/** True when the Vite dev mock answered — no email is sent (only local `npm run dev`). */
	mock: boolean
}

function getSendEmailUrl(): string {
	const base = import.meta.env.VITE_FORM_API_BASE_URL?.trim().replace(/\/$/, '') ?? ''
	if (base) {
		return `${base}${SEND_EMAIL_PATH}`
	}
	return `${window.location.origin}${SEND_EMAIL_PATH}`
}

export async function submitForm(payload: FormPayload): Promise<SubmitFormResult> {
	const url = getSendEmailUrl()

	let response: Response
	try {
		response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})
	} catch (err) {
		const hint =
			import.meta.env.DEV && url.startsWith(window.location.origin)
				? ' Use VITE_FORM_API_BASE_URL for your deployed API, or run `npm run dev:vercel` from the repo root.'
				: ''
		throw new Error(
			err instanceof Error
				? `${err.message}${hint}`
				: `Network error while sending form.${hint}`,
		)
	}

	const body = await response.text()

	if (!response.ok) {
		let message = `Request failed (${response.status})`
		try {
			const json = JSON.parse(body) as { error?: string }
			if (typeof json?.error === 'string') message = json.error
		} catch {
			if (body.includes('<!DOCTYPE') || body.includes('<html')) {
				message =
					response.status === 404 && import.meta.env.DEV
						? 'Form API not found (404). With Vite dev, the mock should handle /api/send-email — restart the dev server. Or set VITE_FORM_API_BASE_URL to your deployed site, or run `npm run dev:vercel` from the repo root.'
						: 'Form endpoint not found. Deploy includes /api/send-email, or set VITE_FORM_API_BASE_URL to your API origin.'
			}
		}
		throw new Error(message)
	}

	let mock = false
	if (body.trim()) {
		try {
			const json = JSON.parse(body) as { mock?: boolean }
			if (json.mock === true) mock = true
		} catch {
			// Real API may return { success: true } without mock field
		}
	}

	if (mock && import.meta.env.DEV) {
		console.info(
			'[submitForm] Response was from the Vite dev mock — no email was sent. Use your live site, VITE_FORM_API_BASE_URL, or `npm run dev:vercel` for real mail.',
		)
	}

	return { mock }
}
