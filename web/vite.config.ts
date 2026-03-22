import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { formApiDevPlugin } from './vite-plugins/formApiDev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			react(),
			...(mode === 'development' ? [formApiDevPlugin(__dirname)] : []),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@schema': path.resolve(__dirname, '../sanity/schemaTypes'),
			},
		},
	}
})

