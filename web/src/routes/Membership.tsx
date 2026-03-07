import { MembershipForm } from '@/components/forms/MembershipForm'
import { PageSEO } from '@/components/common/PageSEO'

export const Membership = () => {
	return (
		<div className='space-y-8'>
			<PageSEO
				title='Church Membership'
				description='Become a member of RCCG Psalms & Hymns Parish in Cobridge, Stoke-on-Trent. Join our Christian family — a welcoming Pentecostal community for everyone.'
				path='/membership'
				keywords='church membership Stoke-on-Trent, join RCCG Cobridge, become a member Christian church Staffordshire, RCCG membership application'
			/>
			<section className='space-y-4'>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl'>
					Membership
				</h1>
				<p className='max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
					We will love to have you as part of the Psalms &amp; Hymns family.
					Share a few details and our team will contact you.
				</p>
			</section>
			<MembershipForm />
		</div>
	)
}
