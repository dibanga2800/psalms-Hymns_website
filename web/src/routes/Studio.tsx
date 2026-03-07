import { Studio } from 'sanity'

import { studioConfig } from '@/lib/studioConfig'

export const StudioPage = () => {
	return (
		<div className='h-screen'>
			<Studio config={studioConfig} />
		</div>
	)
}
