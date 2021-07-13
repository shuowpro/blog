import { clean } from '../lib/utils'
import { getBlogPosts } from '../lib/api'
import { AppContext } from 'next/app'

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
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
