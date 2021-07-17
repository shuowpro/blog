import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '../lib/api'
import type { Post } from '../lib/types'
import { clean } from '../lib/utils'
import { Tiles } from '../components/Tile'
import { Nav } from '../components/Nav'

export async function getStaticProps() {
  const posts = await getBlogPosts()
  if (!posts) return {}
  return {
    props: {
      posts: clean(posts),
    },
  }
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <>
      <Nav />
      <Tiles posts={posts} />
    </>
  )
}

export default HomePage
