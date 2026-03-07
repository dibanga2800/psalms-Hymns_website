const API_BASE =
	import.meta.env.VITE_CONTACT_API_URL ||
	(import.meta.env.PROD ? '/api/send-email' : '/api/send-email')

export type FormPayload =
	| { context: 'contact-form'; name: string; email: string; phone: string; message: string }
	| { context: 'prayer-request'; name?: string; contact?: string; request: string }
	| { context: 'membership-form'; name: string; email: string; phone: string; note?: string }

export async function submitForm(payload: FormPayload): Promise<void> {
	const url = typeof API_BASE === 'string' && API_BASE.startsWith('http')
		? API_BASE
		: `${window.location.origin}${API_BASE.startsWith('/') ? '' : '/'}${API_BASE}`

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
