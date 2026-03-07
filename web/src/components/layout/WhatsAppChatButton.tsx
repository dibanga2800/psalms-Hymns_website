import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '447724812795'

export const WhatsAppChatButton = () => {
	const defaultMessage =
		"Hello, I'd like to attend service at Psalms & Hymns Parish."
	const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
		defaultMessage,
	)}`

	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600'
			aria-label='Chat with Psalms & Hymns Parish on WhatsApp'
		>
			<MessageCircle className='h-9 w-9' aria-hidden />
		</a>
	)
}

