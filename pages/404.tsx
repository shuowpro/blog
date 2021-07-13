import { clean } from '../lib/utils'
import { getBlogPosts } from '../lib/api'
import { AppContext } from 'next/app'

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
export async function getStaticProps(context: AppContext) {
  const posts = await getBlogPosts()
  if (!posts) return {}
  return {
    props: {
      posts: clean(posts),
    },
  }
}
