import { OpenGraphImages } from 'next-seo/lib/types'
import { NOTION_BLOG_ID } from '../site.config'
import { Post, PostMeta } from './types'

export const getBlogPostMeta = async (): Promise<PostMeta[]> => {
  const res = await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  )

  let metas: PostMeta[] = await res.json()

  metas = metas.filter((meta) => meta.isPublished && meta.createdTime)

  metas.sort((m1, m2) => {
    const t1 = Date.parse(m1.createdTime)
    const t2 = Date.parse(m2.createdTime)
    return t2 - t1
  })

  return metas
}

export const getBlogPost = async (meta: PostMeta): Promise<Post> => {
  const res = await fetch(`https://notion-api.splitbee.io/v1/page/${meta.id}`)

  const post = await res.json()

  return {
    ...meta,
    block: post,
  }
}

export const getOpenGraphImage = (title: string): OpenGraphImages => ({
  url: `https://keiki.dev/api/og?title=${encodeURIComponent(title)}`,
  width: 1200,
  height: 630,
})
