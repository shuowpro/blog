import { NextSeo } from 'next-seo'
import { PostCard } from '@/components/post-card'
import { getAllPostsFrontMatter } from '@/lib'

const Page = async () => {
  const frontMatters = await getAllPostsFrontMatter()

  //   const seoProps = useSeoProps()

  //   if (frontMatters.length <= 0) {
  //     return <Blog.Error routeBlog={false} />
  //   }

  //   const latestPost = frontmatters.shift()!

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
