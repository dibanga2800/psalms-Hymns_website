import { Heart, BookOpen, Users, Globe } from 'lucide-react'

interface BeliefItem {
	icon: typeof Heart
	title: string
	body: string
}

const beliefs: BeliefItem[] = [
	{
		icon: BookOpen,
		title: 'The Word of God',
		body: 'We believe the Bible is the inspired, infallible, and authoritative Word of God — the complete rule for faith and practice.',
	},
	{
		icon: Heart,
		title: 'Salvation by Grace',
		body: 'Salvation is by grace alone, through faith alone, in Christ alone. Every person can be born again through repentance and belief in Jesus Christ.',
	},
	{
		icon: Globe,
		title: 'The Holy Trinity',
		body: 'We believe in one God eternally existing in three persons — Father, Son, and Holy Spirit — co-equal and co-eternal.',
	},
	{
		icon: Users,
		title: 'The Church',
		body: 'The local church is God\'s primary instrument for worship, discipleship, and mission. Every believer is called to belong to and serve a local body.',
	},
]

interface ValueItem {
	label: string
	description: string
}

const values: ValueItem[] = [
	{ label: 'Worship', description: 'Everything we do flows from a heart of worship toward God.' },
	{ label: 'Word', description: 'Sound teaching of Scripture grounds every believer in truth.' },
	{ label: 'Prayer', description: 'We are a house of prayer — interceding for our city and the nations.' },
	{ label: 'Community', description: 'We do life together: authentic, caring, and accountable to one another.' },
	{ label: 'Mission', description: 'We are sent people — bearing the Good News to Stoke-on-Trent and beyond.' },
]

export const About = () => {
	return (
		<div className='space-y-16 sm:space-y-20'>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg'>
				<div
					className='absolute inset-0 bg-cover bg-center opacity-30'
					style={{ backgroundImage: "url('/choir.png')" }}
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-rccg-maroon/80 via-rccg-red/70 to-slate-900/90' />
				<div className='relative z-10 px-6 py-16 text-center sm:px-12 sm:py-24'>
					<p className='text-[11px] font-bold uppercase tracking-[0.28em] text-rccg-gold'>
						Who We Are
					</p>
					<h1 className='mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
						A Church Built on
						<br />
						<span className='text-rccg-gold'>Worship &amp; the Word</span>
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-100/90 sm:text-base'>
						RCCG Psalms &amp; Hymns Parish is a vibrant, Spirit-led congregation in Stoke-on-Trent,
						United Kingdom — part of the worldwide family of the Redeemed Christian Church of God.
					</p>
				</div>
			</section>

			{/* OUR STORY */}
			<section className='grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20'>
				<div className='space-y-5'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						Our Story
					</p>
					<h2 className='text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						From Small Beginnings,
						<br />God is Building Something Beautiful
					</h2>
					<p className='text-sm leading-relaxed text-slate-600 sm:text-[15px]'>
						Psalms &amp; Hymns Parish was planted out of a deep conviction to
						bring God&apos;s presence to Humanity through worship. What began as a
						small gathering of believers has grown into a community with a bold
						vision: to see lives transformed and communities renewed through the
						power of the Holy Spirit.
					</p>
					<p className='text-sm leading-relaxed text-slate-600 sm:text-[15px]'>
						We meet in Cobridge, Stoke-on-Trent, and welcome people from every
						background, culture, and walk of life. Whether you are just exploring
						faith or have walked with God for years, there is a place for you here.
					</p>
				</div>

				<div className='space-y-4'>
					<div className='rounded-2xl bg-rccg-red/5 p-6 ring-1 ring-rccg-red/10'>
						<h3 className='text-sm font-bold uppercase tracking-[0.16em] text-rccg-red'>
							Our Mission
						</h3>
						<p className='mt-2 text-sm leading-relaxed text-slate-700'>
							To bring God&apos;s presence to humanity through worship — making disciples
							of Jesus Christ who live out the Kingdom in every area of their lives.
						</p>
					</div>
					<div className='rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200'>
						<h3 className='text-sm font-bold uppercase tracking-[0.16em] text-slate-700'>
							Our Vision
						</h3>
						<p className='mt-2 text-sm leading-relaxed text-slate-600'>
							A church that is known for wholehearted worship, sound biblical teaching,
							radical generosity, and a genuine love for our city and the nations.
						</p>
					</div>
					<div className='rounded-2xl bg-rccg-gold/5 p-6 ring-1 ring-rccg-gold/20'>
						<h3 className='text-sm font-bold uppercase tracking-[0.16em] text-amber-700'>
							Our Watch-word
						</h3>
						<p className='mt-2 text-sm leading-relaxed text-slate-700 italic'>
							&ldquo;Bringing God&apos;s Presence to Humanity Through Worship.&rdquo;
						</p>
					</div>
				</div>
			</section>

			{/* CORE VALUES */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						What Drives Us
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						Our Core Values
					</h2>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
					{values.map((v, i) => (
						<div
							key={v.label}
							className='rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200/80'
						>
							<span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-rccg-red text-xs font-extrabold text-white'>
								{i + 1}
							</span>
							<h3 className='mt-3 text-sm font-bold text-slate-900'>{v.label}</h3>
							<p className='mt-1.5 text-xs leading-relaxed text-slate-500'>{v.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* CORE BELIEFS */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-rccg-red'>
						What We Believe
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
						Our Core Beliefs
					</h2>
					<p className='mx-auto mt-3 max-w-2xl text-sm text-slate-500'>
						We are rooted in historic Christian orthodoxy, the doctrinal foundations of the
						Redeemed Christian Church of God, and a deep love for the Scriptures.
					</p>
				</div>
				<div className='grid gap-6 sm:grid-cols-2'>
					{beliefs.map(({ icon: Icon, title, body }) => (
						<div
							key={title}
							className='flex gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80'
						>
							<span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rccg-red/10'>
								<Icon className='h-4.5 w-4.5 text-rccg-red' aria-hidden />
							</span>
							<div>
								<h3 className='text-sm font-bold text-slate-900'>{title}</h3>
								<p className='mt-1.5 text-xs leading-relaxed text-slate-600'>{body}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* JOIN US CTA */}
			<section className='rounded-2xl bg-rccg-red px-6 py-12 text-center text-white shadow-lg sm:px-10'>
				<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl'>
					Come and Experience It for Yourself
				</h2>
				<p className='mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80'>
					We would love to meet you. Join us this Sunday — every person who walks through
					our doors is a welcome guest and a potential family member.
				</p>
				<div className='mt-7 flex flex-wrap justify-center gap-3'>
					<a
						href='/service-times'
						className='rounded-full bg-rccg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow transition hover:bg-amber-400'
					>
						Service Times
					</a>
					<a
						href='/contact'
						className='rounded-full border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white no-underline shadow transition hover:bg-white/10'
					>
						Get in Touch
					</a>
				</div>
			</section>
		</div>
	)
}
