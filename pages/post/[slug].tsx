import Image from 'next/image'
import { NotionRenderer } from 'react-notion'
import { getBlogPostMeta, getBlogPosts, getOpenGraphImage } from '../../lib/api'
import { Post } from '../../lib/types'
import { clean, dateFormatter, toNotionImageUrl } from '../../lib/utils'
import { Nav } from '../../components/Nav'
import { Footer } from '../../components/Footer'
import { Tag } from '../../components/Tile'
import { NextSeo } from 'next-seo'

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  // Get all posts again
  const posts = await getBlogPosts()

  if (!posts) return {}

  // Find the current blogpost by slug
  const post = posts.find((post) => encodeURIComponent(post.title) === slug)

  return {
    props: { post: clean(post) },
    revalidate: 600,
  }
}

const BlogPost: React.FC<{ post: Post; postViewCount?: number }> = ({
  post,
  postViewCount,
}) => {
  if (!post) return null
  console.log(post)
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`https://keiki.dev/post/${encodeURIComponent(post.title)}`}
        openGraph={{
          type: 'article',
          images: [getOpenGraphImage(post.title)],
          article: {
            publishedTime: new Date(post.createdTime).toISOString(),
            tags: post.tags,
          },
        }}
      />
      <div className="my-8 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold sm:text-center mb-2">
          {post.title}
        </h1>
        <div className="sm:text-center text-gray-600">
          <time dateTime={new Date(post.createdTime).toISOString()}>
            {dateFormatter.format(new Date(post.createdTime))}
          </time>
          <span className="text-gray-400"> / </span>
          <span>{postViewCount || '...'}</span>
        </div>
        <div className="flex justify-center items-center mt-6">
          {post.tags
            .filter((tag) => tag.trim())
            .map((tag) => (
              <Tag key={tag} tag={tag} isCenter />
            ))}
        </div>
      </div>
      <div className="pb-2/3 sm:pb-1/3 bg-gray-100 relative overflow-hidden mb-12">
        {post.pageCover && (
          <img
            className="absolute w-full h-full object-cover"
            src={post.pageCover}
            alt={post.title}
          />
        )}
      </div>
      <article className="flex-1 my-6 post-container">
        <NotionRenderer blockMap={post.block} mapImageUrl={toNotionImageUrl} />
      </article>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const postMetas = await getBlogPostMeta()
  if (!postMetas) return {}
  return {
    paths: postMetas.map(
      (postMeta) => `/post/${encodeURIComponent(postMeta.title)}`
    ),
    fallback: true,
  }
}

export default BlogPost
