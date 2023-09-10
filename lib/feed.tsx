import { Feed, FeedOptions } from 'feed'
import { renderToStaticMarkup } from 'react-dom/server'
import { MDXRemote } from 'next-mdx-remote'

import { getPost, getAllPostFileNames, encodeFileNameToSlug } from '~/lib/post'
import { Blog } from '~/components'
import { format } from './time'
import { writeFileSync } from 'fs'
import { join } from 'path'

const PUBLIC_DIR = join(process.cwd(), 'public')

const SITE_URL = 'https://www.suwako.dev'

const feedOptions: FeedOptions = {
  title: '虹色的世界',
  description: '虹色的世界',
  id: SITE_URL,
  link: SITE_URL,
  image: `${SITE_URL}/banner.jpg`,
  favicon: `${SITE_URL}/favicon.ico`,
  language: 'zh-cn',
  copyright: `Copyright © ${format(new Date(), 'yyyy')} Suwako`,
}

export async function generateRssFeed() {
  const postFileNames = await getAllPostFileNames()

  const feed = new Feed(feedOptions)

  await Promise.all(
    postFileNames.map(async (fileName) => {
      const slug = encodeFileNameToSlug(fileName)

      const { frontmatter, source } = await getPost(slug)

      const html = renderToStaticMarkup(<MDXRemote {...source} components={Blog.X} />)

      feed.addItem({
        title: frontmatter.title,
        id: `${SITE_URL}/blog/${slug}`,
        link: `${SITE_URL}/blog/${slug}`,
        description: html,
        date: new Date(frontmatter.date),
      })
    }),
  )

  feed.items.sort((a, b) => b.date.getTime() - a.date.getTime())

  writeFileSync(join(PUBLIC_DIR, 'rss.xml'), feed.rss2())
}
