/**
 * Shown when submitForm succeeds via the Vite dev mock (no real email).
 */
export const DevFormMockSuccessBanner = () => (
	<div
		className='rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900'
		role='status'
	>
		<p className='font-semibold'>Local dev only — no email was sent</p>
		<p className='mt-1 text-amber-800'>
			<code className='rounded bg-amber-100/80 px-1'>npm run dev</code> returned a fake success
			(no SMTP). Add <code className='rounded bg-amber-100/80 px-1'>GMAIL_USER</code> and{' '}
			<code className='rounded bg-amber-100/80 px-1'>GMAIL_APP_PASSWORD</code> to{' '}
			<code className='rounded bg-amber-100/80 px-1'>web/.env</code> for real mail locally, use
			your <strong>deployed site</strong>, set{' '}
			<code className='rounded bg-amber-100/80 px-1'>VITE_FORM_API_BASE_URL</code>, or run{' '}
			<code className='rounded bg-amber-100/80 px-1'>npm run dev:vercel</code>. If you have Gmail
			in <code className='rounded bg-amber-100/80 px-1'>web/.env</code> but still see this, remove{' '}
			<code className='rounded bg-amber-100/80 px-1'>VITE_FORM_MOCK=true</code> and restart Vite.
		</p>
	</div>
)
