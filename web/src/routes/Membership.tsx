import { MembershipForm } from '@/components/forms/MembershipForm'

export const Membership = () => {
	return (
		<div className='space-y-8'>
			<section className='space-y-3'>
				<h1 className='text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
					Membership
				</h1>
				<p className='max-w-2xl text-slate-600 sm:text-base'>
					We will love to have you as part of the Psalms &amp; Hymns family.
					Share a few details and our team will contact you.
				</p>
			</section>
			<MembershipForm />
		</div>
	)
}

