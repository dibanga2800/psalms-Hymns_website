import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { SiteHeader } from '@/components/layout/SiteHeader'

describe('SiteHeader', () => {
	it('renders the church name in the header', () => {
		render(
			<MemoryRouter>
				<SiteHeader />
			</MemoryRouter>,
		)

		expect(
			screen.getByText(/Psalms & Hymns Parish/i),
		).toBeInTheDocument()
	})
})


