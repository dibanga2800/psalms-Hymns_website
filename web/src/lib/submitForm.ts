const SEND_EMAIL_URL = '/api/send-email'

export type FormPayload =
	| { context: 'contact-form'; name: string; email: string; phone: string; message: string }
	| { context: 'prayer-request'; name?: string; contact?: string; request: string }
	| { context: 'membership-form'; name: string; email: string; phone: string; note?: string }

export async function submitForm(payload: FormPayload): Promise<void> {
	const url = `${window.location.origin}${SEND_EMAIL_URL}`

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		const body = await response.text()
		let message = `Request failed with ${response.status}`
		try {
			const json = JSON.parse(body)
			if (typeof json?.error === 'string') message = json.error
		} catch {
			// ignore
		}
		throw new Error(message)
	}
}
