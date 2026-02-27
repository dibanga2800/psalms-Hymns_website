import { Link } from 'react-router-dom'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { usePosts } from '@/hooks/usePosts'

export const Posts = () => {
	const { data: posts = [], isLoading, isError } = usePosts()

	return (
		<div className='space-y-8'>
			<section className='space-y-3'>
				<h1 className='text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
					Blog Posts
				</h1>
				<p className='max-w-2xl text-slate-600 sm:text-base'>
					Read updates, devotionals, testimonies and announcements from Psalms
					&amp; Hymns Parish.
				</p>
				{isError && (
					<ErrorState message='Unable to load blog posts from Sanity; please try again later.' />
				)}
			</section>

			<section className='space-y-4'>
				{isLoading && <LoadingSpinner />}

				{!isLoading && !isError && posts.length === 0 && (
					<p className='text-sm text-slate-600'>
						No blog posts have been published yet. Add posts in Sanity to see
						them listed here.
					</p>
				)}

				{posts.length > 0 && (
					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{posts.map((post) => (
							<Link
								key={post._id}
								to={`/posts/${post.slug ?? ''}`}
								className='group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-lg'
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
										className='flex aspect-[16/10] items-center justify-center bg-slate-100'
										aria-hidden
									>
										<span className='text-xs font-medium text-slate-400'>
											No image
										</span>
									</div>
								)}
								<div className='flex flex-1 flex-col p-5'>
									<p className='text-[10px] font-bold uppercase tracking-wider text-rccg-red/80'>
										{post.category ?? 'Blog Post'}
									</p>
									<p className='mt-2 line-clamp-2 text-[15px] font-bold leading-snug text-slate-900 group-hover:text-rccg-red'>
										{post.title}
									</p>
									{post.excerpt && (
										<p className='mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500'>
											{post.excerpt}
										</p>
									)}
									<div className='mt-auto pt-4 text-[11px] text-slate-400'>
										{post.author && (
											<span className='font-semibold text-slate-500'>
												{post.author}
											</span>
										)}
										{post.author && post.date && <span> · </span>}
										{post.date &&
											new Date(post.date).toLocaleDateString('en-GB', {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</section>
		</div>
	)
}

