import cache from 'memory-cache'
import { OpenGraphImages } from 'next-seo/lib/types'
import { CACHE_EXPIRE_TIME_IN_MS, NOTION_BLOG_ID } from '../site.config'
import { Post, PostMeta } from './types'
import { getMetaFromBlock, isProd } from './utils'

export const getBlogPostMeta = async (): Promise<PostMeta[] | undefined> => {
  let postMetas: PostMeta[] | undefined = undefined
  if (isProd) {
    postMetas = cache.get('postMetas')
  }
  if (!postMetas) {
    const res = await fetch(
      `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
    )
    postMetas = await res.json()
    postMetas = postMetas?.filter((postMetas) => postMetas.isPublished)
    if (isProd) {
      cache.put('postMetas', postMetas, CACHE_EXPIRE_TIME_IN_MS)
    }
  }
  return postMetas
}

export const getBlogPosts = async (): Promise<Post[] | undefined> => {
  let posts: Post[] | undefined = undefined
  if (isProd) {
    posts = cache.get('posts')
  }
  if (!posts) {
    const postMetas = await getBlogPostMeta()
    if (!postMetas) return undefined
    posts = await Promise.all(
      postMetas.map((postMeta) => {
        return fetch(`https://notion-api.splitbee.io/v1/page/${postMeta.id}`)
          .then((res) => res.json())
          .then((res) => {
            return {
              ...postMeta,
              block: res,
              ...getMetaFromBlock(res, postMeta.id),
            }
          })
      })
    )
    if (isProd) {
      cache.put('posts', posts, CACHE_EXPIRE_TIME_IN_MS)
    }
  }
  return posts
}

export const getOpenGraphImage = (title: string): OpenGraphImages => ({
  url: `https://keiki.dev/api/og?title=${encodeURIComponent(title)}`,
  width: 1200,
  height: 630,
})
