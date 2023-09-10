import matter from 'gray-matter'
import { join } from 'path'
import { readdir, readFile } from 'fs/promises'

import type { FrontMatter, Post, RawFrontMatter } from '@/types'

const BLOG_POSTS_DIR = join(process.cwd(), 'data', 'blog')

// No need to encodeURIComponent() as the slug will be encoded by Next.js
export function encodeFileNameToSlug(fileName: string): string {
  return fileName.replace(/\.md/, '')
}

// No need to decodeURIComponent() as the slug will be decoded by Next.js
export function decodeSlugToFileName(slug: string): string {
  return `${slug}.md`
}

function convertBannerAxis(bannerAxis: string | undefined | null) {
  if (!bannerAxis) return 'center'

  return `${Math.floor(parseFloat(bannerAxis) * 100)}%`
}

export async function getAllAvailablePostSlugs() {
  return (await readdir(BLOG_POSTS_DIR)).map(encodeFileNameToSlug)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fileName = decodeSlugToFileName(slug)
  const source = await readFile(join(BLOG_POSTS_DIR, fileName), 'utf-8')
  const { data } = matter(source)

  const frontmatter = data as RawFrontMatter
  const bannerPosition = `${convertBannerAxis(frontmatter.banner_x)} ${convertBannerAxis(
    frontmatter.banner_y,
  )}`

  const frontMatter = {
    ...frontmatter,
    slug,
    fileName,
    banner_position: bannerPosition,
  } as FrontMatter

  return {
    frontMatter,
    source,
  }
}

export async function getAllPostsFrontMatter() {
  const slugs = await getAllAvailablePostSlugs()

  const frontMatters = (await Promise.all(slugs.map(getPostBySlug))).map(
    ({ frontMatter }) => frontMatter,
  )
  return frontMatters.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
}
