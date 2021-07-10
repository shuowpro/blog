import cache from 'memory-cache'
import { NOTION_BLOG_ID, CACHE_EXPIRE_TIME_IN_MS } from '../site.config'
import { PostMeta, Post } from './types'
import { getMetaFromBlock, isProd } from './utils'

export const getBlogPostMeta = async (): Promise<PostMeta[]> => {
  let postMetas: PostMeta[]
  if (isProd) {
    postMetas = cache.get('postMetas')
  }
  if (!postMetas) {
    const res = await fetch(
      `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
    )
    postMetas = await res.json()
    if (isProd) {
      cache.put('postMetas', postMetas, CACHE_EXPIRE_TIME_IN_MS)
    }
  }
  return postMetas
}

export const getBlogPosts = async (): Promise<Post[]> => {
  let posts: Post[]
  if (isProd) {
    posts = cache.get('posts')
  }
  if (!posts) {
    const postMetas = await getBlogPostMeta()
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
