import React, { FC } from 'react'
import Link from 'next/link'
import type { PostMeta } from '../lib/types'
import { dateFormatter } from '../lib/utils'

export const PostLinks: FC<{
  posts: PostMeta[]
  className?: string
}> = ({ posts, className }) => {
  return (
    <ul className={className}>
      {posts.map((post) => (
        <PostLink key={post.id} meta={post} />
      ))}
    </ul>
  )
}

export const PostLink: FC<{
  meta: PostMeta
}> = ({ meta }) => {
  return (
    <li className="my-10">
      <time
        className="text-gray-400 block"
        dateTime={new Date(meta.createdTime).toISOString()}
      >
        {dateFormatter.format(new Date(meta.createdTime))}
      </time>
      <Link
        href={{
          pathname: '/post/[slug]',
          query: { slug: encodeURIComponent(meta.title) },
        }}
      >
        <a className="block text-2xl mt-2">{meta.title}</a>
      </Link>
    </li>
  )
}
