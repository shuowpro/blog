import type { Metadata } from 'next'
import { PostCard } from '@/components/post-card'
import { getAllPostsFrontMatter } from '@/lib'

export const metadata: Metadata = {
  title: '虹色的世界',
  description: 'Suwako的博客',
  openGraph: {
    images: '/banner.jpg',
  },
}

const Page = async () => {
  const frontMatters = await getAllPostsFrontMatter()

  return (
    <>
      <div className="mt-20 mb-20 mx-0 sm:mx-6 lg:mb-28 lg:mx-8">
        <div className="relative max-w-6xl mx-auto">
          {/* <Blog.Latest frontmatter={latestPost} /> */}
          <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:max-w-none mx-4">
            {frontMatters.map((frontMatter, i) => (
              <PostCard key={frontMatter.slug} frontMatter={frontMatter} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
