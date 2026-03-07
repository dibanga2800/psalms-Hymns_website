import { ContactForm } from '@/components/forms/ContactForm'
import { PageSEO } from '@/components/common/PageSEO'

export const Contact = () => {
	return (
		<div className='space-y-8'>
			<PageSEO
				title='Contact Us'
				description='Get in touch with RCCG Psalms & Hymns Parish in Cobridge, Stoke-on-Trent. Find our address at Emery Street, call +44 7724 812795, or send us a message.'
				path='/contact'
				keywords='contact RCCG Stoke-on-Trent, church address Emery Street Cobridge, contact Redeemed Christian Church Stoke-on-Trent, church phone number Staffordshire, RCCG Psalms Hymns contact'
			/>
			<section className='space-y-4'>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl'>
					Contact Us
				</h1>
				<p className='max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>
					Find our location and get in touch with Psalms &amp; Hymns Parish using the
					contact form below.
				</p>
			</section>

			<section className='space-y-4'>
				<div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
					<div className='px-5 pt-5 pb-2'>
						<p className='text-base font-semibold text-slate-800'>
							Visit Psalms &amp; Hymns Parish
						</p>
						<p className='mt-1 text-sm text-slate-600'>
							Emery St, Cobridge, Stoke-on-Trent ST6 2JJ
						</p>
					</div>
					<div className='h-72 w-full md:h-80'>
						<iframe
							title='Church location map'
							src='https://www.google.com/maps?q=RCCG%20Psalms%20and%20Hymns%20Parish%20Emery%20St%2C%20Cobridge%2C%20Stoke-on-Trent%20ST6%202JJ&output=embed'
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
							className='h-full w-full border-0'
						/>
					</div>
				</div>

				<ContactForm />
			</section>
		</div>
	)
}
