import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import {
	sendFormEmailViaGmail,
	validateFormEmailPayload,
} from '../../formEmailCore'

/**
 * In development, handle POST /api/send-email:
 * - If GMAIL_USER + GMAIL_APP_PASSWORD exist in web/.env (and VITE_FORM_MOCK is not true), send real email.
 * - Else if VITE_MOCK_FORM_SUBMIT is not false, return mock JSON (no email).
 * - Else pass through (404) — use VITE_FORM_API_BASE_URL on the client instead.
 */
export const formApiDevPlugin = (envDir: string): Plugin => ({
	name: 'form-api-dev',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			const pathOnly = req.url?.split('?')[0] ?? ''
			if (pathOnly !== '/api/send-email' || req.method !== 'POST') {
				next()
				return
			}

			const env = loadEnv(
				server.config.mode,
				server.config.envDir || envDir,
				'',
			)
			const user = env.GMAIL_USER?.trim()
			const rawPass = env.GMAIL_APP_PASSWORD || env.GMAIL_APP_PASS
			const pass = rawPass?.replace(/\s/g, '')?.trim() || ''
			const forceMock =
				env.VITE_FORM_MOCK === 'true' || env.VITE_FORM_MOCK === '1'
			const mockDisabled =
				env.VITE_MOCK_FORM_SUBMIT === 'false' ||
				env.VITE_MOCK_FORM_SUBMIT === '0'

			const useRealSmtp = Boolean(user && pass && !forceMock)

			const chunks: Buffer[] = []
			req.on('data', (c: Buffer) => chunks.push(c))
			req.on('end', () => {
				void (async () => {
					if (useRealSmtp) {
						try {
							const raw = Buffer.concat(chunks).toString('utf8')
							const json = JSON.parse(raw) as unknown
							const payload = validateFormEmailPayload(json)
							if (!payload) {
								res.statusCode = 400
								res.setHeader('Content-Type', 'application/json')
								res.end(JSON.stringify({ error: 'Invalid request body' }))
								return
							}
							await sendFormEmailViaGmail(payload, {
								gmailUser: user!,
								gmailAppPassword: pass,
								emailTo: env.EMAIL_TO?.trim(),
							})
							console.info(
								'[vite] Form email sent via SMTP (context=%s)',
								payload.context,
							)
							res.setHeader('Content-Type', 'application/json')
							res.statusCode = 200
							res.end(JSON.stringify({ success: true }))
						} catch (e) {
							console.error('[vite] /api/send-email SMTP error:', e)
							res.statusCode = 500
							res.setHeader('Content-Type', 'application/json')
							res.end(JSON.stringify({ error: 'Failed to send email' }))
						}
						return
					}

					if (mockDisabled) {
						next()
						return
					}

					try {
						const raw = Buffer.concat(chunks).toString('utf8')
						const parsed = JSON.parse(raw) as { context?: string }
						console.info(
							'[vite] mock POST /api/send-email context=%s',
							parsed.context ?? '?',
						)
					} catch {
						console.info('[vite] mock POST /api/send-email (body not JSON)')
					}
					res.setHeader('Content-Type', 'application/json')
					res.statusCode = 200
					res.end(JSON.stringify({ success: true, mock: true }))
				})()
			})
		})
	},
})
