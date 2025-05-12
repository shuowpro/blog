import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPostTitle, getPublishDate } from '../utils'

export async function GET(context) {
  const blog = await getCollection('blog')
  return rss({
    title: '虹色的世界',
    description: '虹色的世界',
    site: context.site,
    items: blog.map((post) => ({
      title: getPostTitle(post),
      pubDate: getPublishDate(post),
      link: `/posts/${getPostTitle(post)}`,
      content: post.rendered?.html,
    })),
  })
}
