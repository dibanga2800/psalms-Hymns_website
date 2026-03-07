import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import './index.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('app')

if (!rootElement) {
	throw new Error('Root element #app not found')
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</HelmetProvider>
	</React.StrictMode>,
)

