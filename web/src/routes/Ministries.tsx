import { PageSEO } from '@/components/common/PageSEO'

interface MinistryCard {
	name: string
	description: string
	imageUrl: string
	focus: string
}

const ministries: MinistryCard[] = [
	{
		name: "Men's Fellowship",
		description:
			'We are a community of men committed to leading in faith, family and purpose.',
		imageUrl: '/men fellowship.png',
		focus: 'Fellowship, discipleship and mentoring for men of all ages.',
	},
	{
		name: "Women's Fellowship",
		description:
			'Daughters of Zion growing together in the Word, prayer and godly relationships.',
		imageUrl: '/women fellowship.png',
		focus: 'Raising women of virtue, strength and influence in every sphere of life.',
	},
	{
		name: 'Choir & Instrumentalists',
		description:
			'Worshippers using their voices and instruments to lead the church in heartfelt praise.',
		imageUrl: '/choir.png',
		focus: 'Leading the congregation into God-centred, Spirit-led worship.',
	},
	{
		name: 'Youth Ministry',
		description:
			'Focused on young people discovering and fulfilling their God-given potential.',
		imageUrl: '/youth ministry.png',
		focus: 'Equipping teenagers and young adults to follow Jesus boldly.',
	},
]

export const Ministries = () => {
	return (
		<div className='space-y-12 sm:space-y-14'>
			<PageSEO
				title='Our Ministries'
				description="Explore the ministries at RCCG Psalms & Hymns Parish — Men's Fellowship, Women's Fellowship, Choir, and Youth Ministry. Get involved and grow in faith in Stoke-on-Trent."
				path='/ministries'
				keywords="church ministries Stoke-on-Trent, men's fellowship Cobridge, women's fellowship RCCG, youth ministry Stoke-on-Trent, choir church Cobridge, get involved Christian church Staffordshire"
			/>
			<section className='space-y-4 text-center sm:text-left'>
				<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
					Get Involved
				</p>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
					Our Ministries
				</h1>
				<p className='mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:mx-0 sm:text-lg'>
					Ministries at Psalms &amp; Hymns Parish exist to help you grow in Christ,
					build meaningful relationships, and serve others with your gifts. Explore
					the different areas you can connect with below.
				</p>
			</section>

			<section
				className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'
				aria-label='Ministry overview'
			>
				{ministries.map((ministry) => (
					<article key={ministry.name} className='pt-3'>
						<div className='mx-auto h-1 w-16 rounded-full bg-rccg-red' aria-hidden />
						<div className='mt-4 flex h-full flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200/80'>
							<div className='aspect-[4/3] overflow-hidden'>
								<img
									src={ministry.imageUrl}
									alt={ministry.name}
									className='h-full w-full object-cover transition duration-500 hover:scale-105'
								/>
							</div>
							<div className='flex flex-1 flex-col p-5'>
								<h2 className='text-base font-semibold uppercase tracking-[0.14em] text-slate-900'>
									{ministry.name}
								</h2>
								<p className='mt-2 text-sm leading-relaxed text-slate-600'>
									{ministry.description}
								</p>
								<p className='mt-3 text-sm leading-relaxed text-slate-500'>
									{ministry.focus}
								</p>
							</div>
						</div>
					</article>
				))}
			</section>
		</div>
	)
}
