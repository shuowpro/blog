import React, { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import type { Post } from '../lib/types'
import { hashCode } from '../lib/utils'

const colors = [
  'bg-red-200 text-red-800',
  'bg-yellow-200 text-yellow-800',
  'bg-green-200 text-green-800',
  'bg-blue-200 text-blue-800',
  'bg-indigo-200 text-indigo-800',
  'bg-purple-200 text-purple-800',
  'bg-pink-200 text-pink-800',
]

export const Tag: FC<{
  tag: string
}> = ({ tag }) => {
  const color = colors[hashCode(tag) % colors.length]

  return (
    <div
      className={clsx(
        'rounded-full px-3 flex items-center text-sm mr-1',
        color
      )}
    >
      {tag}
    </div>
  )
}

export const Tile: FC<{
  post: Post
  className?: string
}> = ({ post, className }) => {
  return (
    <Link
      href={{
        pathname: '/post/[slug]',
        query: { slug: encodeURIComponent(post.title) },
      }}
    >
      <a
        className={clsx(
          'focus group border bg-white rounded-md overflow-hidden flex flex-col',
          'transform transition-transform ease-in-out duration-100 hover:border-gray-400',
          'shadow-sm hover:-translate-y-1 focus:-translate-y-1',
          className
        )}
      >
        <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
          {post.pageCover && (
            <img
              className="absolute w-full h-full object-cover"
              src={post.pageCover}
              alt={post.title}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="p-4 pb-0">
            <div className="font-semibold text-gray-800 group-hover:text-gray-600">
              {post.title}
            </div>
            <div className="text-gray-600">{post.description}</div>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            {post.tags
              .filter((tag) => tag.trim())
              .map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
          </div>
        </div>
      </a>
    </Link>
  )
}

export const Tiles: FC<{
  posts: Post[]
  className?: string
}> = ({ posts, className }) => {
  return (
    <div className="container my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {posts.map((post) => (
          <Tile key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
