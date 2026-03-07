import { useParams } from 'react-router-dom'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { usePostDetail } from '@/hooks/usePostDetail'

const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className='mb-4 text-base leading-relaxed text-slate-700'>{children}</p>
		),
		h2: ({ children }) => (
			<h2 className='mb-3 mt-6 text-2xl font-semibold text-slate-900'>{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className='mb-2 mt-5 text-xl font-semibold text-slate-900'>{children}</h3>
		),
		h4: ({ children }) => (
			<h4 className='mb-2 mt-4 text-lg font-semibold text-slate-900'>{children}</h4>
		),
	},
	marks: {
		strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
		em: ({ children }) => <em className='italic'>{children}</em>,
	},
	list: {
		bullet: ({ children }) => (
			<ul className='mb-4 ml-5 list-disc space-y-1 text-base leading-relaxed text-slate-700'>
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className='mb-4 ml-5 list-decimal space-y-1 text-base leading-relaxed text-slate-700'>
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li>{children}</li>,
		number: ({ children }) => <li>{children}</li>,
	},
}

export const PostDetail = () => {
	const { slug } = useParams()
	const {
		data: post,
		isLoading,
		isError,
	} = usePostDetail(slug)

	if (!slug) {
		return (
			<ErrorState message='No blog post specified. Please go back and select a post to view.' />
		)
	}

	return (
		<div className='space-y-6'>
			<section className='space-y-3'>
				<h1 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
					{post?.title ?? 'Blog post'}
				</h1>
				{isLoading && <LoadingSpinner />}
				{isError && (
					<ErrorState message='We were unable to load this blog post. Please try again later.' />
				)}
				{!isLoading && !isError && post && (
					<div className='flex flex-wrap items-center gap-2 text-sm text-slate-500 sm:text-base'>
						{post.date && (
							<span>
								{new Date(post.date).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</span>
						)}
						{post.author && (
							<span>
								<span className='mx-1'>·</span>
								By <span className='font-semibold'>{post.author}</span>
							</span>
						)}
						{post.category && (
							<span className='inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600'>
								{post.category}
							</span>
						)}
					</div>
				)}
			</section>

			{!isLoading && !isError && post && (
				<section className='space-y-4 rounded-xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-700 shadow-sm sm:p-7'>
					{post.heroImageUrl && (
						<div className='-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-xl bg-slate-50 sm:-mx-7 sm:-mt-7'>
							<img
								src={post.heroImageUrl}
								alt={post.title ?? 'Blog post image'}
								className='w-full object-contain object-top'
							/>
						</div>
					)}
					{post.body && post.body.length > 0 ? (
						<PortableText value={post.body} components={portableTextComponents} />
					) : post.excerpt ? (
						<p className='text-base'>{post.excerpt}</p>
					) : (
						<p className='text-base text-slate-500'>
							The full content for this blog post has not been added yet.
						</p>
					)}
				</section>
			)}
		</div>
	)
}
