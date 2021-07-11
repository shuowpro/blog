import { NotionRenderer } from 'react-notion'
import { getBlogPostMeta, getBlogPosts } from '../../lib/api'
import { Post } from '../../lib/types'

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
    props: { post: JSON.parse(JSON.stringify(post)) },
  }
}

const BlogPost: React.FC<{ post: Post }> = ({ post }) => {
  if (!post) return null
  return (
    <div className="content">
      <h1>{post.title}</h1>
      <NotionRenderer blockMap={post.block} />
    </div>
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
