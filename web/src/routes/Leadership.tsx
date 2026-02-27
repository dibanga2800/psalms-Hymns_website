import { Mail, Phone } from 'lucide-react'

interface LeaderProfile {
	name: string
	role: string
	bio: string
	imageUrl: string
	email?: string
	phone?: string
}

const seniorLeadership: LeaderProfile[] = [
	{
		name: 'Pastor Emmanuel Adegorusi',
		role: 'Lead Pastor',
		bio: 'Pastor Emmanuel Adegorusi leads RCCG Psalms & Hymns Parish with a heart for worship, the Word, and community transformation. He carries a passion for seeing people encounter God and live out their God-given purpose. He is supported by a dedicated leadership team committed to the same vision.',
		imageUrl: '/pastor.png',
		email: 'rccgpsalmshymns@gmail.com',
		phone: '+44 7724 812795',
	},
]

const supportLeadership: LeaderProfile[] = [
	{
		name: 'Pastor Chinedu Okanume',
		role: 'Head of Welfare & Outreach',
		bio: 'Pastor Chinedu oversees the church\'s welfare initiatives and coordinates community outreach programmes, ensuring no one in the congregation goes unnoticed or unsupported.',
		imageUrl: '/placeholder-leader.png',
	},
	{
		name: 'Deaconess Titilayo Adegorusi',
		role: 'Women\'s Fellowship Leader',
		bio: 'Deaconess Titilayo leads the Women\'s Fellowship with grace and authority, guiding women in the parish to discover their identity and calling in Christ.',
		imageUrl: '/placeholder-leader.png',
	},
	{
		name: 'Bro David Ibanga',
		role: 'Youth & Students Coordinator',
		bio: 'David brings energy and vision to the youth arm of the church, creating safe spaces where young people can ask questions, grow in faith, and build lasting community.',
		imageUrl: '/placeholder-leader.png',
	},
	{
		name: 'Minister Dare Akinlawon',
		role: 'Worship Leader',
		bio: 'Minister Dare leads the choir and instrumentalists, stewarding the worship culture of the church with excellence, humility, and a deep love for God\'s presence.',
		imageUrl: '/placeholder-leader.png',
	},
]

const LeaderCard = ({ leader, featured = false }: { leader: LeaderProfile; featured?: boolean }) => (
	<article
		className={[
			'overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80',
			featured ? 'md:flex' : '',
		].join(' ')}
	>
		<div
			className={[
				'shrink-0 overflow-hidden bg-slate-100',
				featured ? 'md:w-64 lg:w-72' : 'aspect-[4/3]',
			].join(' ')}
		>
			<img
				src={leader.imageUrl}
				alt={leader.name}
				onError={(e) => {
					const target = e.currentTarget
					target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=c0392b&color=fff&size=256`
				}}
				className='h-full w-full object-cover object-top'
			/>
		</div>
		<div className={['flex flex-col justify-center p-6', featured ? 'md:p-8' : ''].join(' ')}>
			<p className='text-[10px] font-bold uppercase tracking-[0.22em] text-rccg-red'>
				{leader.role}
			</p>
			<h2 className={['font-extrabold tracking-tight text-slate-900', featured ? 'mt-1.5 text-2xl sm:text-3xl' : 'mt-1 text-base'].join(' ')}>
				{leader.name}
			</h2>
			<p className={['mt-3 leading-relaxed text-slate-600', featured ? 'text-sm sm:text-[15px]' : 'text-xs'].join(' ')}>
				{leader.bio}
			</p>
			{(leader.email || leader.phone) && (
				<div className='mt-4 flex flex-wrap gap-4'>
					{leader.email && (
						<a
							href={`mailto:${leader.email}`}
							className='inline-flex items-center gap-1.5 text-xs font-semibold text-rccg-red no-underline transition hover:underline'
						>
							<Mail className='h-3.5 w-3.5' aria-hidden />
							{leader.email}
						</a>
					)}
					{leader.phone && (
						<a
							href={`tel:${leader.phone.replace(/\s/g, '')}`}
							className='inline-flex items-center gap-1.5 text-xs font-semibold text-rccg-red no-underline transition hover:underline'
						>
							<Phone className='h-3.5 w-3.5' aria-hidden />
							{leader.phone}
						</a>
					)}
				</div>
			)}
		</div>
	</article>
)

export const Leadership = () => {
	return (
		<div className='space-y-16 sm:space-y-20'>

			{/* PAGE HEADER */}
			<section className='space-y-3 text-center'>
				<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-red'>
					Meet the Team
				</p>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
					Our Leadership
				</h1>
				<p className='mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base'>
					Our leaders are servant-leaders — men and women called and equipped by God
					to shepherd, serve, and equip the body of Christ at Psalms &amp; Hymns Parish.
				</p>
			</section>

			{/* SENIOR PASTOR */}
			<section className='space-y-6'>
				<div className='flex items-center gap-3'>
					<span className='h-px flex-1 bg-slate-200' />
					<h2 className='text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400'>
						Senior Leadership
					</h2>
					<span className='h-px flex-1 bg-slate-200' />
				</div>
				{seniorLeadership.map((leader) => (
					<LeaderCard key={leader.name} leader={leader} featured />
				))}
			</section>

			{/* SUPPORT LEADERSHIP */}
			<section className='space-y-6'>
				<div className='flex items-center gap-3'>
					<span className='h-px flex-1 bg-slate-200' />
					<h2 className='text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400'>
						Ministry Leaders
					</h2>
					<span className='h-px flex-1 bg-slate-200' />
				</div>
				<div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
					{supportLeadership.map((leader) => (
						<LeaderCard key={leader.name} leader={leader} />
					))}
				</div>
			</section>

			{/* SCRIPTURE QUOTE */}
			<section className='rounded-2xl bg-slate-50 px-8 py-10 text-center ring-1 ring-slate-200'>
				<blockquote className='mx-auto max-w-2xl text-base font-medium italic leading-relaxed text-slate-700 sm:text-lg'>
					&ldquo;He who is greatest among you shall be your servant.&rdquo;
				</blockquote>
				<cite className='mt-3 block text-xs font-semibold tracking-wide text-slate-400'>
					Matthew 23:11
				</cite>
			</section>

			{/* CONNECT CTA */}
			<section className='rounded-2xl bg-rccg-red px-6 py-12 text-center text-white shadow-lg'>
				<h2 className='text-xl font-extrabold tracking-tight sm:text-2xl'>
					Want to Connect with a Leader?
				</h2>
				<p className='mx-auto mt-2 max-w-lg text-sm text-white/80'>
					Reach out to us — our leaders are accessible and would love to pray with you,
					answer your questions, or simply chat over a cup of tea.
				</p>
				<a
					href='/contact'
					className='mt-6 inline-block rounded-full bg-rccg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
				>
					Contact Us
				</a>
			</section>
		</div>
	)
}
