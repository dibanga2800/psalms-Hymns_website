import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Dev-only: Vite has no /api routes; mock accepts POSTs so forms can be tested locally. */
const mockFormApiPlugin = (enabled: boolean): Plugin => {
	if (!enabled) {
		return { name: 'form-api-mock-off' }
	}
	return {
		name: 'form-api-mock',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const pathOnly = req.url?.split('?')[0] ?? ''
				if (pathOnly !== '/api/send-email' || req.method !== 'POST') {
					next()
					return
				}
				const chunks: Buffer[] = []
				req.on('data', (c: Buffer) => chunks.push(c))
				req.on('end', () => {
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
				})
			})
		},
	}
}

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname, '')
	const mockForms =
		env.VITE_MOCK_FORM_SUBMIT === 'true' || env.VITE_MOCK_FORM_SUBMIT === '1'

	return {
		plugins: [react(), mockFormApiPlugin(mockForms)],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@schema': path.resolve(__dirname, '../sanity/schemaTypes'),
			},
		},
	}
})

