import { NotionRenderer } from 'react-notion'
import { getBlogPostMeta, getBlogPost, getOpenGraphImage } from '../../lib/api'
import { Post } from '../../lib/types'
import { clean, dateFormatter, toNotionImageUrl } from '../../lib/utils'
import { NextSeo } from 'next-seo'

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  // Find the metas
  const metas = await getBlogPostMeta()

  // Find the current blogpost by slug
  const currentMeta = metas.find(
    (meta) => encodeURIComponent(meta.title) === slug
  )

  // Should not happened
  if (!currentMeta) {
    return {
      notFound: true,
    }
  }

  const post = await getBlogPost(currentMeta)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: clean(post),
    },
    revalidate: 600,
  }
}

const BlogPost: React.FC<{ post: Post; postViewCount?: number }> = ({
  post,
  postViewCount,
}) => {
  // Two steps of async call, so it could return null.
  if (!post) return null

  return (
    <main className="flex-1">
      <NextSeo
        title={post.title}
        canonical={`https://keiki.dev/post/${encodeURIComponent(post.title)}`}
        openGraph={{
          type: 'article',
          images: [getOpenGraphImage(encodeURIComponent(post.title))],
          article: {
            publishedTime: new Date(post.createdTime).toISOString(),
          },
        }}
      />
      <section className="post-container mt-10">
        <h1 className="text-4xl">{post.title}</h1>
        <time
          className="block mt-4 text-sm text-gray-400"
          dateTime={new Date(post.createdTime).toISOString()}
        >
          {dateFormatter.format(new Date(post.createdTime))}
        </time>
      </section>
      <article className="my-6 post-container">
        <NotionRenderer blockMap={post.block} mapImageUrl={toNotionImageUrl} />
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const metas = await getBlogPostMeta()

  return {
    paths: metas.map((meta) => `/post/${encodeURIComponent(meta.title)}`),
    fallback: 'blocking',
  }
}

export default BlogPost
