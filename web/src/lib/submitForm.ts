const SEND_EMAIL_PATH = '/api/send-email'

export type FormPayload =
	| { context: 'contact-form'; name: string; email: string; phone: string; message: string }
	| { context: 'prayer-request'; name?: string; contact?: string; request: string }
	| { context: 'membership-form'; name: string; email: string; phone: string; note?: string }

function getSendEmailUrl(): string {
	const base = import.meta.env.VITE_FORM_API_BASE_URL?.trim().replace(/\/$/, '') ?? ''
	if (base) {
		return `${base}${SEND_EMAIL_PATH}`
	}
	return `${window.location.origin}${SEND_EMAIL_PATH}`
}

export async function submitForm(payload: FormPayload): Promise<void> {
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
				? ' No /api route in Vite dev: set VITE_MOCK_FORM_SUBMIT=true in web/.env or run `vercel dev` from the repo root.'
				: ''
		throw new Error(
			err instanceof Error
				? `${err.message}${hint}`
				: `Network error while sending form.${hint}`,
		)
	}

	if (!response.ok) {
		const body = await response.text()
		let message = `Request failed (${response.status})`
		try {
			const json = JSON.parse(body) as { error?: string }
			if (typeof json?.error === 'string') message = json.error
		} catch {
			if (body.includes('<!DOCTYPE') || body.includes('<html')) {
				message =
					'Form endpoint not found. Deploy includes /api/send-email, or set VITE_FORM_API_BASE_URL to your API origin.'
			}
		}
		throw new Error(message)
	}
}
