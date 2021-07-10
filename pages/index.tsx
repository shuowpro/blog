import Link from 'next/link'
import { getBlogPostMeta, getBlogPosts } from '../lib/api'
import { getMetaFromBlock, deleteUndefined } from '../lib/utils'

export type Post = { id: string; slug: string; title: string; date: string }

export async function getStaticProps() {
  const posts = await getBlogPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="content">
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <Link
            href={{
              pathname: '/post/[slug]',
              query: { slug: encodeURIComponent(post.title) },
            }}
            key={post.id}
          >
            <a>
              <b>{post.title}</b>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
