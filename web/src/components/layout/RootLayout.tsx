import type { ReactNode } from 'react'

import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { WhatsAppChatButton } from './WhatsAppChatButton'

type RootLayoutProps = {
	children: ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<div className='flex min-h-screen flex-col overflow-x-hidden bg-rccg-cream text-slate-800'>
			<SiteHeader />
			<main className='flex-1'>
				<div className='container py-6 sm:py-8 lg:py-10'>{children}</div>
			</main>
			<SiteFooter />
			<WhatsAppChatButton />
		</div>
	)
}

