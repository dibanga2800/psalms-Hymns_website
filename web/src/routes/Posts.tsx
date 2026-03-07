import { Link } from 'react-router-dom'
import { BookOpen, Calendar, MessageCircle, FileText } from 'lucide-react'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { PageSEO } from '@/components/common/PageSEO'
import { usePosts } from '@/hooks/usePosts'

export const Posts = () => {
	const { data: posts = [], isLoading, isError } = usePosts()

	return (
		<div className='space-y-16 sm:space-y-20'>
			<PageSEO
				title='Blog'
				description='Read devotionals, testimonies, announcements and updates from RCCG Psalms & Hymns Parish, Stoke-on-Trent. Stay connected with our Christian community in Cobridge.'
				path='/posts'
				keywords='church blog Stoke-on-Trent, RCCG devotionals, church news Cobridge, Christian testimonies Staffordshire, church announcements RCCG Psalms Hymns'
			/>

			{/* HERO */}
			<section className='relative overflow-hidden rounded-2xl bg-rccg-maroon text-white shadow-xl'>
				<div className='pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rccg-gold/15 blur-3xl' aria-hidden />
				<div className='pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-rccg-red/25 blur-3xl' aria-hidden />
				<div className='pointer-events-none absolute right-0 top-1/2 opacity-10'>
					<BookOpen className='h-48 w-48 -translate-y-1/2 text-white' strokeWidth={1.2} aria-hidden />
				</div>
				<div className='relative z-10 flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20'>
					<div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rccg-gold/20'>
						<BookOpen className='h-6 w-6 text-rccg-gold' aria-hidden />
					</div>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-rccg-gold'>
						Stories &amp; Updates
					</p>
					<h1 className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
						Our Blog
					</h1>
					<p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-100/85 sm:text-lg'>
						Devotionals, testimonies, announcements and updates from Psalms &amp; Hymns Parish.
					</p>
				</div>
			</section>

			{isError && (
				<ErrorState message='Unable to load blog posts. Please try again shortly.' />
			)}

			{/* POSTS GRID */}
			<section className='space-y-8'>
				<div className='text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.28em] text-rccg-red'>
						Latest
					</p>
					<h2 className='mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl'>
						Recent Posts
					</h2>
					<p className='mx-auto mt-3 max-w-xl text-base text-slate-500'>
						Stay connected with devotionals, news and stories from our community.
					</p>
				</div>

				{isLoading && <LoadingSpinner />}

				{!isLoading && !isError && posts.length === 0 && (
					<div className='flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 py-20 text-center'>
						<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/60'>
							<FileText className='h-7 w-7 text-slate-400' aria-hidden />
						</div>
						<p className='text-lg font-semibold text-slate-600'>
							No posts yet
						</p>
						<p className='max-w-sm text-base text-slate-500'>
							Check back soon for devotionals, testimonies and updates.
						</p>
					</div>
				)}

				{posts.length > 0 && (
					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{posts.map((post) => (
							<Link
								key={post._id}
								to={`/posts/${post.slug ?? ''}`}
								className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-slate-300/80'
							>
								{post.heroImageUrl ? (
									<div className='aspect-[16/10] overflow-hidden'>
										<img
											src={post.heroImageUrl}
											alt={post.title ?? 'Blog post image'}
											className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
										/>
									</div>
								) : (
									<div
										className='flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50'
										aria-hidden
									>
										<BookOpen className='h-12 w-12 text-slate-300' aria-hidden />
									</div>
								)}
								<div className='flex flex-1 flex-col p-6'>
									<span className='inline-block w-fit rounded-full bg-rccg-red/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-rccg-red'>
										{post.category ?? 'Blog Post'}
									</span>
									<h3 className='mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-rccg-red sm:text-xl'>
										{post.title}
									</h3>
									{post.excerpt && (
										<p className='mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500'>
											{post.excerpt}
										</p>
									)}
									<div className='mt-4 flex items-center gap-2 text-sm text-slate-400'>
										{post.author && (
											<span className='font-semibold text-slate-500'>
												{post.author}
											</span>
										)}
										{post.author && post.date && (
											<span className='text-slate-300'>·</span>
										)}
										{post.date && (
											<span className='flex items-center gap-1.5'>
												<Calendar className='h-3.5 w-3.5 text-slate-400' aria-hidden />
												{new Date(post.date).toLocaleDateString('en-GB', {
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												})}
											</span>
										)}
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</section>

			{/* CTA */}
			<section className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-14 text-center text-white shadow-xl sm:py-16'>
				<div className='pointer-events-none absolute inset-0'>
					<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rccg-gold/10 blur-3xl' />
					<div className='absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rccg-red/20 blur-3xl' />
				</div>
				<div className='relative'>
					<h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl'>
						Stay Connected
					</h2>
					<p className='mx-auto mt-3 max-w-md text-base text-slate-300 sm:text-lg'>
						Get in touch, join us on Sunday, or explore our events. We would love to hear from you.
					</p>
					<div className='mt-7 flex flex-wrap justify-center gap-4'>
						<Link
							to='/contact'
							className='inline-flex items-center gap-2.5 rounded-full bg-rccg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-rccg-maroon no-underline shadow-lg transition hover:bg-amber-400'
						>
							<MessageCircle className='h-4.5 w-4.5' aria-hidden />
							Get in Touch
						</Link>
						<Link
							to='/events'
							className='inline-flex items-center gap-2.5 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white no-underline transition hover:border-white/60 hover:bg-white/10'
						>
							<Calendar className='h-4.5 w-4.5' aria-hidden />
							View Events
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
